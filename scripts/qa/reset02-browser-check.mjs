#!/usr/bin/env node
/**
 * Portfolio Career Edition — Local Browser QA
 * Read-only against the repository. No package installation, commits, or pushes.
 * Requires Node 22+ for the built-in WebSocket client and Chrome/Edge/Brave.
 */
import { spawn, execFileSync } from 'node:child_process';
import { createServer } from 'node:net';
import { createWriteStream, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir, homedir } from 'node:os';
import { setTimeout as pause } from 'node:timers/promises';

function argsOf(argv) {
  const out = {};
  for (let i=0; i<argv.length; i+=2) { if (!argv[i]?.startsWith('--') || !argv[i+1]) throw new Error('Usage: node qa-browser.mjs --repo <path> --out <path>'); out[argv[i].slice(2)] = argv[i+1]; }
  if (!out.repo || !out.out) throw new Error('Missing --repo or --out');
  return out;
}
function assert(condition, message) { if (!condition) throw new Error(message); }
const argv = argsOf(process.argv.slice(2));
const repo = resolve(argv.repo);
const outDir = resolve(argv.out);
mkdirSync(outDir, { recursive: true });
mkdirSync(join(outDir,'screenshots'), { recursive: true });
const results = [];
const issues = [];
const screenshots = [];
const consoleErrors = [];
let nextProcess, browserProcess, cdp, browserCdp, profileDir;
let browserPort;
const startedAt = new Date().toISOString();
function record(name, status, detail = '', data) { const row = {name, status, detail, ...(data ? {data} : {})}; results.push(row); console.log(`${status.padEnd(7)} ${name}${detail ? ': '+detail : ''}`); return row; }
function outputFiles() {
  const report = {title:'Portfolio 2027 — RESET-04 release readiness browser QA', startedAt, finishedAt:new Date().toISOString(), source:'Owner-local production build (automated browser session)', repo, checks:results, issues, consoleErrors, screenshots, limitations:['This is local Chromium laboratory evidence, not real-user Core Web Vitals or an independent remote deployment audit. Offscreen bounds without document scroll are review warnings, not proof of layout failure.','A passing automated test does not establish full WCAG 2.2 AA; screen-reader checks, manual judgment, and CV fact approval remain outstanding.','No private application credentials or user session are tested.']};
  writeFileSync(join(outDir,'QA_REPORT.json'), JSON.stringify(report,null,2)+'\n');
  const lines = [ '# Portfolio Career Edition — Local Browser QA', '', `Run: ${startedAt}`, '', '| Check | Status | Detail |', '| --- | --- | --- |', ...results.map(x=>`| ${x.name.replace(/\|/g,'/')} | ${x.status} | ${String(x.detail).replace(/\|/g,'/').replace(/\n/g,' ')} |`), '', '## Release blockers / warnings', '', ...(issues.length ? issues.map(x=>`- **${x.level}:** ${x.message}`) : ['- No automated blockers detected. Manual and factual approval gates still apply.']), '', '## Scope limitations', '', ...report.limitations.map(x=>`- ${x}`), '', '## Screenshot files', '', ...screenshots.map(x=>`- ${x}`), '' ];
  writeFileSync(join(outDir,'QA_REPORT.md'), lines.join('\n'));
}
async function findFreePort() {
  return await new Promise((resolvePort, reject) => {
    const s = createServer(); s.once('error',reject); s.listen(0,'127.0.0.1',()=>{ const addr=s.address(); const port=addr.port; s.close(()=>resolvePort(port)); });
  });
}
function findBrowser() {
  const pf = process.env.PROGRAMFILES || 'C:\\Program Files';
  const pf86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)';
  const local = process.env.LOCALAPPDATA || join(homedir(),'AppData','Local');
  const candidates = process.platform === 'win32' ? [
    join(pf,'Google','Chrome','Application','chrome.exe'),
    join(pf86,'Google','Chrome','Application','chrome.exe'),
    join(pf,'Microsoft','Edge','Application','msedge.exe'),
    join(pf86,'Microsoft','Edge','Application','msedge.exe'),
    join(pf,'BraveSoftware','Brave-Browser','Application','brave.exe'),
    join(pf86,'BraveSoftware','Brave-Browser','Application','brave.exe'),
    join(local,'Google','Chrome','Application','chrome.exe'),
    join(local,'Microsoft','Edge','Application','msedge.exe'),
    join(local,'BraveSoftware','Brave-Browser','Application','brave.exe')
  ] : ['/usr/bin/chromium','/usr/bin/chromium-browser','/usr/bin/google-chrome','/opt/google/chrome/chrome'];
  return candidates.find(existsSync);
}
async function waitHttp(url, timeoutMs=15000) {
  const end = Date.now()+timeoutMs;
  while(Date.now()<end){try{const response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(1500)}); return response;}catch{} await pause(200);} throw new Error(`Server not responding: ${url}`);
}
async function waitForPortFile(file, timeoutMs=16000) {
  const end=Date.now()+timeoutMs;
  while(Date.now()<end) {if (existsSync(file)) {const t=readFileSync(file,'utf8').trim().split(/\r?\n/); if (t.length>=2 && /^\d+$/.test(t[0])) return {port:+t[0], path:t[1]};} await pause(120);} throw new Error('Headless browser failed to expose DevTools port');
}
class CDP {
  constructor(url) {
    this.socket = new WebSocket(url); this.seq=1; this.pending=new Map(); this.listeners=[];
    this.ready = new Promise((yes,no)=>{
      this.socket.addEventListener('open',()=>yes());
      this.socket.addEventListener('error',()=>no(new Error('Browser debugging socket failed')));
    });
    this.socket.addEventListener('message',(event)=>{
      let data; try { data=JSON.parse(event.data); } catch{return;}
      if(data.id && this.pending.has(data.id)) {
        const x=this.pending.get(data.id);this.pending.delete(data.id);
        if(data.error) x.reject(new Error(`${x.method}: ${data.error.message}`)); else x.resolve(data.result || {});
      } else if(data.method) { for (const cb of this.listeners) {try{ cb(data.method,data.params||{}); }catch{} } }
    });
    this.socket.addEventListener('close',()=>{
      for(const p of this.pending.values()) p.reject(new Error('CDP socket closed'));
      this.pending.clear();
    });
  }
  on(fn){ this.listeners.push(fn); }
  async send(method,params={}) {
    await this.ready; const id=this.seq++;
    return await new Promise((resolve, reject)=>{
      const timeout=setTimeout(()=>{this.pending.delete(id);reject(new Error(`CDP timeout: ${method}`));},12000);
      this.pending.set(id,{method,resolve:x=>{clearTimeout(timeout);resolve(x);},reject:e=>{clearTimeout(timeout);reject(e);}});
      this.socket.send(JSON.stringify({id,method,params}));
    });
  }
  close(){ try{this.socket.close();}catch{} }
}
async function evaluate(expression) {
  const res=await cdp.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(res.exceptionDetails) throw new Error('Browser evaluation failed: '+JSON.stringify(res.exceptionDetails).slice(0,250));
  return res.result?.value;
}
// A same-route Page.navigate can leave the PREVIOUS document at readyState=complete.
// Force a unique URL for each browser navigation, and wait for that exact document.
let navigationSequence=0;
async function navigate(path) {
  const url=new URL(path,`http://127.0.0.1:${port}`);
  url.searchParams.set('__qa_navigation',String(++navigationSequence));
  const target=url.href;
  await cdp.send('Page.navigate',{url:target});
  const deadline=Date.now()+20000;
  let committed=false;
  while(Date.now()<deadline) {
    committed=await evaluate(`location.href === ${JSON.stringify(target)} && document.readyState === 'complete'`).catch(()=>false);
    if(committed) break;
    await pause(120);
  }
  if(!committed) throw new Error(`Navigation did not complete: ${target}`);
  await pause(350);
}
async function setViewport(width, height=900, mobile=false, reduced=false){
  await cdp.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile});
  await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:mobile,maxTouchPoints:1});
  await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value: reduced?'reduce':'no-preference'}]});
}
async function waitForProjectImages() {
  // VISIBILITY-AWARE QA: some project previews intentionally use native loading="lazy".
  // Do not mutate loading/fetchPriority in the app. Activate each image by scrolling
  // it into the viewport, then verify its actual resource and decoder state.
  // A server-side HTTP 200 by itself is not evidence that an <img> has loaded.
  const expected=4;
  const total=await evaluate(`document.querySelectorAll('article img').length`);
  const evidence=[];
  if(total!==expected) {
    record('Project imagery setup','FAIL',`Expected ${expected} image elements; found ${total}`);
  }
  for(let index=0;index<total;index++) {
    await evaluate(`(() => {
      const img=document.querySelectorAll('article img')[${index}];
      img?.scrollIntoView({behavior:'instant',block:'center',inline:'nearest'});
      return !!img;
    })()`);
    // A composited frame is needed for intersection-based lazy image loading.
    await pause(180);
    const end=Date.now()+12000;
    let loaded=false;
    while(Date.now()<end) {
      loaded=await evaluate(`(() => {
        const img=document.querySelectorAll('article img')[${index}];
        return !!img&&img.complete&&img.naturalWidth>0&&!!img.currentSrc;
      })()`);
      if(loaded) break;
      await pause(300);
    }
    const state=await evaluate(`(async () => {
      const img=document.querySelectorAll('article img')[${index}];
      if(!img) return {index:${index},loaded:false,error:'Image node missing'};
      let decodeError=null;
      if(img.complete&&img.naturalWidth>0&&img.decode) {
        try {
          await Promise.race([
            img.decode(),
            new Promise((_,reject)=>setTimeout(()=>reject(new Error('Image decode timed out')),4000))
          ]);
        } catch(e) {decodeError=String(e?.message||e).slice(0,180);}
      }
      const box=img.getBoundingClientRect();
      return {
        index:${index},src:(img.getAttribute('src')||'').slice(0,260),
        currentSrc:(img.currentSrc||'').slice(0,320),loading:img.loading,
        complete:img.complete,naturalWidth:img.naturalWidth,
        visibleAtCheck:box.top<innerHeight&&box.bottom>0,
        decodeError,loaded:img.complete&&img.naturalWidth>0&&!!img.currentSrc&&!decodeError
      };
    })()`);
    if(!state.loaded) {
      state.http=await evaluate(`(async () => {
        const img=document.querySelectorAll('article img')[${index}];
        const url=img?.currentSrc||img?.getAttribute('src')||'';
        if(!url) return {status:null,error:'No source selected'};
        try {
          const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(5500)});
          return {status:response.status,contentType:response.headers.get('content-type'),
            note:'HTTP response does not establish DOM image rendering'};
        } catch(e) {return {error:String(e?.message||e).slice(0,180)};}
      })()`);
    }
    evidence.push(state);
  }
  // QA must leave the viewport at the hero before taking its first screenshot.
  await evaluate(`window.scrollTo({top:0,behavior:'instant'})`);
  await pause(140);
  return evidence;
}
async function checkAutomationInsideCard() {
 return await evaluate(`(() => {
  const root=document.querySelector('[class*="automationVisual"]');
  const parent=root?.getBoundingClientRect();
  const nodes=[...root?.querySelectorAll('span')||[]].filter(x=>['INPUT','PROCESS','OUTPUT'].includes(x.textContent.trim()));
  const items=nodes.map(x=>({text:x.textContent.trim(),left:x.getBoundingClientRect().left,right:x.getBoundingClientRect().right,top:x.getBoundingClientRect().top,bottom:x.getBoundingClientRect().bottom}));
  const caption=root?.querySelector('[class*="previewDisclosure"]')?.getBoundingClientRect();
  return {items,contained:!!parent&&items.length===3&&items.every(x=>x.left>=parent.left-1&&x.right<=parent.right+1&&x.top>=parent.top-1&&x.bottom<=parent.bottom+1),captionClear:!caption||items.every(x=>x.bottom<=caption.top-2)};
 })()`);
}
async function checkAureliaCaptionGeometry() {
 return await evaluate(`(() => {
   const visual=document.querySelector('[class*="aureliaVisual"]');
   const flow=visual?.querySelector('[class*="syntheticFlow"]');
   const footer=visual?.querySelector('[class*="syntheticFooter"]');
   const disclosure=visual?.querySelector('[class*="previewDisclosure"]');
   const frame=visual?.getBoundingClientRect();
   if(!flow||!footer||!disclosure||!frame) return {valid:false,reason:'Diagram content missing'};
   const flowB=flow.getBoundingClientRect(), footerB=footer.getBoundingClientRect(), disclosureB=disclosure.getBoundingClientRect();
   return {valid:flowB.bottom<=footerB.top-3&&footerB.bottom<=disclosureB.top-5&&disclosureB.bottom<=frame.bottom+1,
     flowBottom:Math.round(flowB.bottom),footerTop:Math.round(footerB.top),footerBottom:Math.round(footerB.bottom),
     disclosureTop:Math.round(disclosureB.top),disclosureBottom:Math.round(disclosureB.bottom),frameBottom:Math.round(frame.bottom)};
 })()`);
}
async function screenshot(name){const data=(await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false,fromSurface:true})).data; const rel=`screenshots/${name}.png`;writeFileSync(join(outDir,rel),Buffer.from(data,'base64'));screenshots.push(rel);}
async function snapshot() { return await evaluate(`(() => {
const root = document.documentElement;
const h1 = Array.from(document.querySelectorAll('h1')).map(x=>x.textContent.trim());
const missingNames = Array.from(document.querySelectorAll('a,button')).filter(x => {
 if (!x.getClientRects().length) return false;
 return !(x.getAttribute('aria-label') || x.textContent || '').trim();
}).slice(0,12).map(x=>x.outerHTML.slice(0,170));
const imgs=Array.from(document.querySelectorAll('img'));
const failedImgs=imgs.filter(x=>x.complete && x.naturalWidth===0).map(x=>(x.currentSrc || x.src).slice(0,180)).slice(0,10);
const missingAlts=imgs.filter(x=>!x.hasAttribute('alt')).map(x=>(x.currentSrc || x.src).slice(0,180)).slice(0,10);
const overflow=Array.from(document.body.querySelectorAll('*')).filter(x=>{
  const b=x.getBoundingClientRect(); const style=getComputedStyle(x);
  return style.display!=='none' && style.visibility!=='hidden' && style.position!=='fixed' && b.width>0 && (b.right>innerWidth+3 || b.left < -3) && b.left<innerWidth && b.right>0;
}).slice(0,8).map(x=> ({tag:x.tagName,id:x.id||'',cls:String(x.className).slice(0,100),text:(x.innerText||'').trim().slice(0,90),left:Math.round(x.getBoundingClientRect().left),right:Math.round(x.getBoundingClientRect().right),scrollWidth:x.scrollWidth,clientWidth:x.clientWidth}));
return {url:location.pathname,width:innerWidth,height:innerHeight,scrollWidth:root.scrollWidth,bodyScrollWidth:document.body.scrollWidth,h1,missingNames,failedImgs,missingAlts,overflow,mainCount:document.querySelectorAll('main').length,linkCount:document.querySelectorAll('a[href]').length,htmlLang:root.lang};
})()`); }
async function key(type,key,code,windowsVirtualKeyCode){await cdp.send('Input.dispatchKeyEvent',{type,key,code,windowsVirtualKeyCode});}
async function press(k,code,codeNum){await key('rawKeyDown',k,code,codeNum);await key('keyUp',k,code,codeNum);}
function issue(level,message){issues.push({level,message});}
let port;
async function browserChecks() {
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Log.enable');
  cdp.on((method,params) => {
    if(method==='Runtime.exceptionThrown') consoleErrors.push(`Uncaught: ${(params.exceptionDetails?.text||'').slice(0,180)}`);
    if(method==='Log.entryAdded' && params.entry?.level==='error') consoleErrors.push(`Browser: ${(params.entry.text||'').slice(0,180)}`);
    if(method==='Runtime.consoleAPICalled' && params.type==='error') consoleErrors.push(`Console: ${(params.args||[]).map(x=>x.value||x.description||'').join(' ').slice(0,180)}`);
  });
  for (const width of [320,360,375,390,430,600,601,700,768,820,850,851,1024,1280,1440,1920,2560,3840]) {
    await setViewport(width, width===3840 ? 2160 : width>=1440 ? 1050 : 850, width<800);
    await navigate('/');
    if(width===390) {
      const mediaPolicy=await evaluate(`([...document.querySelectorAll('article img')]).map(img=>({alt:img.alt,loading:img.loading,fetchPriority:img.fetchPriority}))`);
      const byName=(needle)=>mediaPolicy.find(item=>item.alt.includes(needle));
      const confora=byName('Confora');
      const blog=byName('Blogging Platform');
      const catalog=byName('CommerceOps');
      const job=byName('Job Finder');
      // These two known problem images now come directly from the existing public assets,
      // avoiding per-width /_next/image conversion. Others remain optimized/lazy.
      const correct=!!confora&&confora.loading==='eager'&&confora.fetchPriority==='low'
        &&!!blog&&blog.loading==='eager'&&blog.fetchPriority==='low'
        &&!!catalog&&catalog.loading==='lazy'&&!!job&&job.loading==='lazy';
      const direct=await evaluate(`(() => {
        const list=[...document.querySelectorAll('article img')];
        const by=(term)=>list.find(x=>x.alt.includes(term));
        return {confora:by('Confora')?.getAttribute('src')||'',blog:by('Blogging Platform')?.getAttribute('src')||''};
      })()`);
      const responsiveSources=await evaluate(`(() => {
        const list=[...document.querySelectorAll('article img')];
        const by=(term)=>list.find(x=>x.alt.includes(term));
        const elC=by('Confora'), elB=by('Blogging Platform');
        return {confora:elC?.currentSrc||'',blog:elB?.currentSrc||'',pictureCount:document.querySelectorAll('article picture source[type="image/webp"]').length};
      })()`);
      const optimizedWebp=responsiveSources.confora.includes('/projects/confora-hero-')&&responsiveSources.confora.endsWith('.webp')
        &&responsiveSources.blog.includes('/blogproject1-')&&responsiveSources.blog.endsWith('.webp')&&responsiveSources.pictureCount===2;
      record('Responsive WebP project media',optimizedWebp?'PASS':'FAIL',JSON.stringify(responsiveSources));
      record('Original PNG fallback preserved',direct.confora==='/projects/confora-hero.png'&&direct.blog==='/blogproject1.png'?'PASS':'FAIL',JSON.stringify(direct));
      record('Image loading policy for project gallery',correct?'PASS':'FAIL',JSON.stringify(mediaPolicy));
    }
    const mediaStatus = await waitForProjectImages();
    const missing=mediaStatus.filter(x=>!x.loaded);
    record(`Visible project imagery ${width}px`,missing.length?'FAIL':'PASS',
      missing.length?JSON.stringify(missing):`${mediaStatus.length} image elements scrolled into view, loaded and decoded`);
    { // Verify caption clearance at every viewport, including layout breakpoints.
      const label=await checkAureliaCaptionGeometry();
      record(`Aurelia illustration captions ${width}px`,label?.valid?'PASS':'FAIL',JSON.stringify(label));
    }
    const s=await snapshot();
    await screenshot(`home-${width}`);
    if ([320,375,390,430].includes(width)) {
      const diagram=await checkAutomationInsideCard();
      record(`Automation diagram contained ${width}px`,diagram?.contained&&diagram?.captionClear?'PASS':'FAIL',JSON.stringify(diagram));
    }
    const extra=await evaluate(`(() => ({
      hasPhoto: !![...document.images].find(x=>x.getAttribute('src')?.includes('E.O.jpg')||x.currentSrc?.includes('E.O.jpg')),
      projectLinks: [...document.querySelectorAll('article a[href]')].map(x=>x.getAttribute('href')),
      hasActions:!!document.querySelector('a[href="#work"]')&&!!document.querySelector('a[href="/case-studies"]'),
      indexBlocked: !!document.querySelector('meta[name="robots"][content*="noindex"]')
    }))()`);
    const fail=[];
    if(s.scrollWidth > s.width+2) fail.push(`horizontal document overflow ${s.scrollWidth}/${s.width}`);
    if(s.h1.length!==1) fail.push(`h1 count ${s.h1.length}`);
    if(s.missingNames.length) fail.push(`${s.missingNames.length} unnamed visible controls`);
    if(s.failedImgs.length) fail.push(`failed images: ${s.failedImgs.join(',')}`);
    if(s.missingAlts.length) fail.push(`images without alt: ${s.missingAlts.join(',')}`);
    if(s.mainCount!==1) fail.push(`${s.mainCount} main landmarks`);
    if(extra.projectLinks.length!==6) fail.push(`expected six linked projects; found ${extra.projectLinks.length}`);
    if(!extra.hasPhoto) fail.push('Original portrait was not rendered');
    if(!extra.hasActions) fail.push('Recruiter CTAs missing');
    if(extra.indexBlocked) fail.push('Canonical homepage unexpectedly noindex');
    record(`Canonical homepage ${width}px`,fail.length?'FAIL':'PASS',fail.join('; ')||'portrait, six projects, controls, images and overflow checked',{...s,extra});
    if ([320,390,768,1440,2560,3840].includes(width)) {
      await evaluate(`window.scrollTo({top: document.querySelector('#work').getBoundingClientRect().top + window.scrollY - 92, behavior:'instant'})`);
      await pause(190);
      await screenshot(`projects-${width}`);
    }
    if ([390,1440].includes(width)) {
      await evaluate(`window.scrollTo({top:0,behavior:'instant'})`);
      const dims=await cdp.send('Page.getLayoutMetrics');
      const height=Math.min(Math.ceil(dims.cssContentSize?.height||4000),12000);
      const payload=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,fromSurface:true,clip:{x:0,y:0,width,height,scale:1}});
      const name=`screenshots/full-spatial-${width}.png`;
      writeFileSync(join(outDir,name),Buffer.from(payload.data,'base64'));
      screenshots.push(name);
    }
  }
  for (const [w,h] of [[320,568],[390,844],[768,1024],[1440,900],[1920,1080]]) {
    await setViewport(w,h,w<800); await navigate('/');
    await waitForProjectImages();
    await screenshot(`visual-${w}x${h}`);
  }
  await setViewport(390,844,true); await navigate('/');
  const menuBefore=await evaluate(`document.querySelector('button[aria-controls="spatial-preview-navigation"]')?.getAttribute('aria-expanded')==='false'`);
  await evaluate(`document.querySelector('button[aria-controls="spatial-preview-navigation"]')?.click()`);
  await pause(180);
  const menuOpen=await evaluate(`document.querySelector('button[aria-controls="spatial-preview-navigation"]')?.getAttribute('aria-expanded')==='true'`);
  await press('Escape','Escape',27); await pause(150);
  const menuClosed=await evaluate(`(() => {const b=document.querySelector('button[aria-controls="spatial-preview-navigation"]');return b?.getAttribute('aria-expanded')==='false'&&document.activeElement===b;})()`);
  record('Mobile menu, Escape and focus',menuBefore&&menuOpen&&menuClosed?'PASS':'FAIL',JSON.stringify({menuBefore,menuOpen,menuClosed}));
  await setViewport(390,844,true); await navigate('/');
  // React batches updates. A synchronous read immediately after .click() sees stale DOM.
  // Verify the committed state AND the actual computed animation after event-loop turns.
  const motionBefore=await evaluate(`document.querySelector('button[aria-pressed]')?.getAttribute('aria-pressed')`);
  await evaluate(`document.querySelector('button[aria-pressed]')?.click()`);
  let motionPaused;
  for(let attempt=0;attempt<15;attempt++){
    await pause(100);
    motionPaused=await evaluate(`(() => {
      const button=document.querySelector('button[aria-pressed]');
      const orbit=document.querySelector('[class*="orbitFront"]');
      return {pressed:button?.getAttribute('aria-pressed'),label:button?.textContent?.trim(),animationName:orbit?getComputedStyle(orbit).animationName:null};
    })()`);
    if(motionPaused?.pressed==='true'&&motionPaused?.label==='Resume motion'&&motionPaused?.animationName==='none') break;
  }
  const pausedOK=motionBefore==='false'&&motionPaused?.pressed==='true'&&motionPaused?.label==='Resume motion'&&motionPaused?.animationName==='none';
  record('Pause-motion control',pausedOK?'PASS':'FAIL',JSON.stringify({before:motionBefore,after:motionPaused}));
  // Test reversibility, not just an ARIA attribute toggling once.
  await evaluate(`document.querySelector('button[aria-pressed]')?.click()`);
  let motionResumed;
  for(let attempt=0;attempt<15;attempt++){
    await pause(100);
    motionResumed=await evaluate(`(() => {
      const button=document.querySelector('button[aria-pressed]');
      const orbit=document.querySelector('[class*="orbitFront"]');
      return {pressed:button?.getAttribute('aria-pressed'),label:button?.textContent?.trim(),animationName:orbit?getComputedStyle(orbit).animationName:null};
    })()`);
    if(motionResumed?.pressed==='false'&&motionResumed?.label==='Pause motion'&&motionResumed?.animationName!=='none') break;
  }
  record('Resume-motion control',pausedOK&&motionResumed?.pressed==='false'&&motionResumed?.label==='Pause motion'&&!!motionResumed.animationName&&motionResumed.animationName!=='none'?'PASS':'FAIL',JSON.stringify(motionResumed));
  await setViewport(390,844,true,true); await navigate('/');
  const reduced=await evaluate(`matchMedia('(prefers-reduced-motion: reduce)').matches && getComputedStyle(document.querySelector('[class*="orbitFront"]')).animationName==='none'`);
  record('Reduced motion',reduced?'PASS':'FAIL',`Media preference respected: ${reduced}`);
  await setViewport(390,844,true); await navigate('/');
  const zoom=await evaluate(`(() => {document.documentElement.style.fontSize='200%';return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth};})()`);
  record('200% root text stress',zoom.scrollWidth<=zoom.width+2?'PASS':'WARN',JSON.stringify(zoom));
  await setViewport(1440,900,false); await navigate('/');
  await press('Tab','Tab',9); await pause(120);
  const skip=await evaluate(`document.activeElement?.getAttribute('href')==='#main'`);
  record('Keyboard skip link',skip?'PASS':'WARN',`First Tab focused skip link: ${skip}`);
  try {
    await cdp.send('Emulation.setScriptExecutionDisabled',{value:true}); await navigate('/');
    const noJS=await evaluate(`!!document.querySelector('h1')&&document.querySelectorAll('article a[href]').length===6`);
    record('No-JavaScript discovery',noJS?'PASS':'FAIL','Identity and six project links available without JavaScript');
  } catch(e) {record('No-JavaScript discovery','WARN',String(e.message||e).slice(0,150));}
  finally {await cdp.send('Emulation.setScriptExecutionDisabled',{value:false}).catch(()=>{});}
  // RESET-02 route coverage: work index, six anchors, deep studies and CV publication gate.
  for (const width of [320,390,768,1440,3840]) {
    await setViewport(width,width===3840?2160:width>=1440?1000:844,width<800);
    await navigate('/case-studies');
    const media = await waitForProjectImages();
    record(`Work index media ${width}px`,media.length===4&&media.every(x=>x.loaded)?'PASS':'FAIL',JSON.stringify(media.filter(x=>!x.loaded))||'4 public images decoded');
    const info=await evaluate(`(() => ({
      headings:document.querySelectorAll('h1').length,
      main:document.querySelectorAll('main').length,
      ids:['aurelia','commerceops','confora','vue-job-finder','blogging-platform','private-work'].map(id=>!!document.getElementById(id)),
      anchors:document.querySelectorAll('nav[aria-label="Jump to a project"] a').length,
      width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
      missingAlt:[...document.images].some(x=>!x.hasAttribute('alt')),
      robots:!!document.querySelector('meta[name="robots"][content*="noindex"]')
    }))()`);
    const valid=info.headings===1&&info.main===1&&info.ids.every(Boolean)&&info.anchors===6&&info.scrollWidth<=info.width+2&&!info.missingAlt&&!info.robots;
    record(`Work index structure ${width}px`,valid?'PASS':'FAIL',JSON.stringify(info));
    await evaluate('window.scrollTo({top:0,behavior:"instant"})'); await pause(200); await screenshot(`work-${width}`);
    await evaluate('document.querySelector("#featured").scrollIntoView({behavior:"instant"})'); await pause(180); await screenshot(`work-flagships-${width}`);
    if(width===390) {
      const before=await evaluate(`document.querySelector('button[aria-controls="studio-mobile-navigation"]')?.getAttribute('aria-expanded')`);
      await evaluate(`document.querySelector('button[aria-controls="studio-mobile-navigation"]')?.click()`);
      await pause(250);
      const during=await evaluate(`document.querySelector('button[aria-controls="studio-mobile-navigation"]')?.getAttribute('aria-expanded')`);
      await press('Escape','Escape',27); await pause(220);
      const after=await evaluate(`document.querySelector('button[aria-controls="studio-mobile-navigation"]')?.getAttribute('aria-expanded')`);
      record('Shared mobile navigation',before==='false'&&during==='true'&&after==='false'?'PASS':'FAIL',JSON.stringify({before,during,after}));
    }
  }
  for(const path of ['/case-studies/aurelia','/case-studies/commerceops','/resume']) {
    for(const width of (path==='/resume' ? [320,390,768,1440] : [390,1440])) {
      await setViewport(width,width===390?844:950,width<800);
      await navigate(path);
      const state=await snapshot();
      const noindex=await evaluate(`!!document.querySelector('meta[name="robots"][content*="noindex"]')`);
      const errors=[];
      if(state.scrollWidth>state.width+2) errors.push('Horizontal overflow');
      if(state.h1.length!==1||state.mainCount!==1) errors.push('Landmark count');
      if(state.missingAlts.length) errors.push('Missing image alternatives');
      if(path==='/resume'&&!noindex) errors.push('Unapproved resume became indexable');
      record(`${path} ${width}px`,errors.length?'FAIL':'PASS',errors.join('; ')||'Route, heading, alternatives and overflow verified');
      if(path==='/resume') {
        const career=await evaluate(`(() => {
          const names=(selector)=>[...document.querySelectorAll(selector)].map(x=>x.textContent||'');
          const experience=names('[data-career-type="experience"]');
          const education=names('[data-career-type="education"]');
          return {
            experienceCount:experience.length,
            educationCount:education.length,
            hasStarlabs:experience.some(x=>x.includes('Starlabs')&&x.includes('Twig')),
            hasDigitalSchool:experience.some(x=>x.includes('Digital School')&&x.includes('Assistant Instructor')),
            hasUBT:education.some(x=>x.includes('UBT')&&x.includes('2020/21')),
            hasProbit:education.some(x=>x.includes('Probit Academy')),
            downloads:[...document.querySelectorAll('a[href]')].filter(a=>{const href=(a.getAttribute('href')||'').toLowerCase().split('?')[0];return href.endsWith('.pdf')||href.endsWith('.docx');}).map(a=>a.getAttribute('href')),
            noindex:!!document.querySelector('meta[name="robots"][content*="noindex"]')
          };
        })()`);
        const ok=career.experienceCount===2&&career.educationCount===2&&career.hasStarlabs&&career.hasDigitalSchool&&career.hasUBT&&career.hasProbit&&career.downloads.length===0&&career.noindex;
        record(`Resume factual chronology and download gate ${width}px`,ok?'PASS':'FAIL',JSON.stringify(career));
      }
      await screenshot(`route-${path.replace(/\W/g,'-')}-${width}`);
    }
  }

  // RESET-04: visual evidence extends beyond the top viewport.
  // This is a laboratory audit; automated checks do not certify WCAG conformance.
  for(const route of ['/','/case-studies','/case-studies/aurelia','/case-studies/commerceops','/resume']) {
    for(const width of [390,1440]) {
      await setViewport(width,width===390?844:950,width<800);
      await navigate(route);
      const state=await evaluate(`(() => {
        const title=document.title;
        const canonical=document.querySelector('link[rel="canonical"]')?.href||'';
        const description=document.querySelector('meta[name="description"]')?.content||'';
        const robots=document.querySelector('meta[name="robots"]')?.content||'';
        const primary=[...document.querySelectorAll('nav')].filter(n=>n.getAttribute('aria-label')==='Primary navigation').length;
        const contextual=[...document.querySelectorAll('nav')].filter(n=>(n.getAttribute('aria-label')||'').includes('case study sections')).length;
        const footers=[...document.querySelectorAll('nav')].filter(n=>n.getAttribute('aria-label')==='Footer navigation').length;
        const links=[...document.querySelectorAll('a[href]')].filter(a=>a.getClientRects().length).map(a=>a.getAttribute('href')||'');
        const unresolved=links.filter(h=>h.startsWith('#') && h.length>1 && !document.getElementById(decodeURIComponent(h.slice(1))));
        const unsafeExternal=[...document.querySelectorAll('a[target="_blank"]')].filter(a=>!a.rel.includes('noopener')||!a.rel.includes('noreferrer')).map(a=>a.href);
        return {path:location.pathname,title,canonical,description,robots,primary,contextual,footers,unresolved,unsafeExternal,bodyHeight:document.documentElement.scrollHeight,
          viewportWidth:innerWidth,scrollWidth:document.documentElement.scrollWidth};
      })()`);
      const expectedCanonical=`https://ervinosmani.vercel.app${route}`;
      const isCase=route.includes('/case-studies/');
      const noindex=route==='/resume';
      const good=state.canonical===expectedCanonical&&state.title.length>12&&state.description.length>25
        &&state.primary===(route==='/'?0:1)&&state.footers===(route==='/'?0:1)
        &&(!isCase||state.contextual===1)&&state.unresolved.length===0
        &&state.unsafeExternal.length===0&&state.scrollWidth<=state.viewportWidth+2
        &&(noindex?state.robots.toLowerCase().includes('noindex'):!state.robots.toLowerCase().includes('noindex'));
      record(`RESET-04 metadata/nav/anchors ${route} ${width}px`,good?'PASS':'FAIL',JSON.stringify(state));
      if(route==='/resume') {
        const links=await evaluate(`([...document.querySelectorAll('nav[aria-label="Professional links"] a')]).filter(x=>x.textContent.includes('LinkedIn')||x.textContent.includes('GitHub')).map(x=>({name:x.getAttribute('aria-label'),hintDisplay: getComputedStyle(x.querySelector('span[class*="externalHint"]')).display}))`);
        const mobileOkay=width!==390||links.every(x=>x.name?.includes('opens in a new tab')&&x.hintDisplay==='none');
        record(`RESET-04 narrow external link clarity ${width}px`,mobileOkay?'PASS':'FAIL',JSON.stringify(links));
      }
      await evaluate('window.scrollTo({top:Math.round((document.documentElement.scrollHeight-innerHeight)*0.5),behavior:"instant"})');
      await pause(230);
      await screenshot(`reset04-${route.replace(/[^a-z]/g,'-')}-${width}-middle`);
      await evaluate('window.scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"})');
      await pause(230);
      await screenshot(`reset04-${route.replace(/[^a-z]/g,'-')}-${width}-bottom`);
    }
  }
  // Capture factual media transfer sizes from same-origin resource timing where available.
  await setViewport(390,844,true); await navigate('/');
  await waitForProjectImages();
  const transferred=await evaluate(`(() => performance.getEntriesByType('resource').filter(x=>x.name.includes('/projects/')||x.name.includes('E.O.jpg')||x.name.includes('blogproject1.png')||x.name.includes('blogproject1-')).map(x=>({path:new URL(x.name).pathname, transferSize:x.transferSize, encodedBodySize:x.encodedBodySize, decodedBodySize:x.decodedBodySize})))()`);
  record('RESET-04 sampled media resource sizes','PASS',JSON.stringify(transferred),{resources:transferred});
  // The large original Confora file is kept unchanged; flag it as a measured local
  // media budget item rather than inventing a Lighthouse / field CWV score.
  const assetPaths=['public/E.O.jpg','public/projects/confora-hero.png','public/blogproject1.png','public/projects/job-finder.png'];
  const assets=assetPaths.map(rel=>{const full=join(repo,...rel.split('/'));return {path:rel,bytes:existsSync(full)?statSync(full).size:null};});
  const conforaBytes=assets.find(x=>x.path.endsWith('confora-hero.png'))?.bytes;
  record('RESET-04 local asset byte inventory','PASS',JSON.stringify(assets),{assets});
  const variants=[
    'public/projects/confora-hero-480.webp',
    'public/projects/confora-hero-960.webp',
    'public/blogproject1-480.webp',
    'public/blogproject1-960.webp',
  ];
  const sizes=variants.map(rel=>({path:rel,bytes:existsSync(join(repo,...rel.split('/')))?statSync(join(repo,...rel.split('/'))).size:null}));
  const selected=transferred.filter(item=>item.path.endsWith('.webp'));
  const selectedHasBoth=selected.some(item=>item.path.includes('confora-hero-'))&&selected.some(item=>item.path.includes('blogproject1-'));
  const noDirectPng=transferred.every(item=>!item.path.endsWith('confora-hero.png')&&!item.path.endsWith('blogproject1.png'));
  const withinBudget=sizes.every(item=>typeof item.bytes==='number'&&item.bytes>100&&item.bytes<450000);
  record('RESET-04+ responsive media budget',withinBudget&&selectedHasBoth&&noDirectPng?'PASS':'FAIL',
    JSON.stringify({variants:sizes,selected,originalConforaBytes:conforaBytes}),{variants:sizes,selected});

  record('Browser console / exceptions',consoleErrors.length?'FAIL':'PASS',consoleErrors.length?consoleErrors.slice(0,4).join(' | '):'No errors recorded');
}
async function httpChecks(base) {
  const paths=['/','/case-studies','/case-studies/aurelia','/case-studies/commerceops','/resume','/robots.txt','/sitemap.xml','/opengraph-image'];
  for(const p of paths){try{const r=await fetch(base+p,{redirect:'manual',signal:AbortSignal.timeout(15000)});record('HTTP '+p,r.status===200?'PASS':'FAIL',`HTTP ${r.status} / ${(r.headers.get('content-type')||'').slice(0,45)}`);}catch(e){record('HTTP '+p,'FAIL',String(e.message||e));}}
  for(const p of ['/atelier-preview','/spatial-preview']) {
    try { const r=await fetch(base+p,{redirect:'manual',signal:AbortSignal.timeout(15000)}); record('Retired preview '+p,r.status===404?'PASS':'FAIL',`HTTP ${r.status}`); }
    catch(e) { record('Retired preview '+p,'FAIL',String(e.message||e)); }
  }
  try{const r=await fetch(base+'/redesign',{redirect:'manual'});const loc=r.headers.get('location')||'';record('Legacy route redirect',(r.status===308||r.status===307)&&(/\/$/.test(loc)||loc==='/')?'PASS':'FAIL',`HTTP ${r.status} -> ${loc}`);}catch(e){record('Legacy route redirect','FAIL',String(e));}
  try{const r=await fetch(base+'/resume',{redirect:'manual'});const html=await r.text();const noindex=/name=["']robots["'][^>]*noindex|name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) || /noindex/i.test(r.headers.get('x-robots-tag')||'');record('Unapproved resume noindex',noindex?'PASS':'FAIL',`Meta or header noindex: ${noindex}`);}catch(e){record('Unapproved resume noindex','FAIL',String(e));}
  try{const r=await fetch(base+'/Ervin_Osmani.pdf',{redirect:'manual'});if(r.status===200){issue('BLOCKER','The old unverified public CV is still accessible at /Ervin_Osmani.pdf. Retire it safely before final release.');record('Legacy PDF exposure','BLOCK','Old unverified CV served with HTTP 200');}else record('Legacy PDF exposure','PASS',`HTTP ${r.status}`);}catch(e){record('Legacy PDF exposure','WARN',String(e));}
}
async function main() {
  assert(Number(process.versions.node.split('.')[0])>=22,'Node.js 22 or newer is required for dependency-free Chromium automation.');
  assert(existsSync(repo) && existsSync(join(repo,'package.json')) && existsSync(join(repo,'.git')),'Expected existing Git repository not found.');
  assert(existsSync(join(repo,'.next','BUILD_ID')),'Production build missing. Do not rebuild automatically; first run the verified Chapter 05 build.');
  const origin=execFileSync('git',['-C',repo,'remote','get-url','origin'],{encoding:'utf8'}).trim();
  const branch=execFileSync('git',['-C',repo,'branch','--show-current'],{encoding:'utf8'}).trim();
  const head=execFileSync('git',['-C',repo,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
  assert(/^https:\/\/github\.com\/ervinosmani\/portfolio(?:\.git)?$/i.test(origin)|| /^git@github\.com:ervinosmani\/portfolio\.git$/i.test(origin),'Git remote is not the expected repository.');
  assert(branch==='feat/portfolio-career-edition','Unexpected branch. Refusing to test an unrelated working tree.');
  assert(head==='01e529e15643660978035abd204e3f74b9f22b18','Unexpected baseline HEAD. Stop and review local Git history.');
  record('Read-only repository preflight','PASS',`branch ${branch}; HEAD ${head.slice(0,10)}; expected remote`);
  const browser=findBrowser();assert(browser,'Chrome, Edge, or Brave not found in standard installation directories.');
  record('Chromium browser found','PASS',browser);
  port=await findFreePort();const rootUrl=`http://127.0.0.1:${port}`;
  const nodeLog=createWriteStream(join(outDir,'next-server.log'),{flags:'a'});
  nextProcess=spawn(process.execPath,[join(repo,'node_modules','next','dist','bin','next'),'start','--hostname','127.0.0.1','--port',String(port)],{cwd:repo,env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:['ignore','pipe','pipe'],windowsHide:true});
  nextProcess.stdout.pipe(nodeLog);nextProcess.stderr.pipe(nodeLog);
  await waitHttp(rootUrl,20000);
  record('Production server launch','PASS',rootUrl);
  await httpChecks(rootUrl);
  profileDir=join(tmpdir(),`portfolio-qa-chrome-${process.pid}`);mkdirSync(profileDir,{recursive:true});
  const chromeArgs=[`--user-data-dir=${profileDir}`,'--headless=new','--remote-debugging-port=0','--remote-debugging-address=127.0.0.1','--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-extensions','--disable-popup-blocking','--no-proxy-server','--proxy-bypass-list=<-loopback>','about:blank'];
  if(process.platform!=='win32' && typeof process.getuid==='function' && process.getuid()===0) chromeArgs.push('--no-sandbox');
  browserProcess=spawn(browser,chromeArgs,{stdio:'ignore',windowsHide:true});
  const connection=await waitForPortFile(join(profileDir,'DevToolsActivePort'));
  browserPort=connection.port;
  browserCdp=new CDP(`ws://127.0.0.1:${browserPort}${connection.path}`);
  await browserCdp.ready;
  const target=await browserCdp.send('Target.createTarget',{url:'about:blank'});
  let wsUrl;
  for(let k=0;k<40;k++) {const list=await (await fetch(`http://127.0.0.1:${browserPort}/json/list`)).json();wsUrl=list.find(x=>x.id===target.targetId)?.webSocketDebuggerUrl;if(wsUrl)break;await pause(100);}
  assert(wsUrl,'Browser target could not be attached');cdp=new CDP(wsUrl);await cdp.ready;
  record('Browser debug connection','PASS','Isolated headless Chromium session');
  await browserChecks();
}
try {await main();}
catch(e) { console.log('QA stopped: '+String(e.message||e));issue('RUNNER',String(e.message||e));if(!results.some(x=>x.name==='QA runner'))record('QA runner','FAIL',String(e.message||e));}
finally {
  try{await browserCdp?.send('Browser.close');}catch{}
  try{cdp?.close();browserCdp?.close();}catch{}
  try{browserProcess?.kill();}catch{}
  try{nextProcess?.kill();}catch{}
  await pause(300);
  try{if(profileDir)rmSync(profileDir,{recursive:true,force:true,maxRetries:4,retryDelay:200});}catch{}
  outputFiles();
  console.log('REPORT '+join(outDir,'QA_REPORT.md'));
  console.log('SCREENSHOTS '+join(outDir,'screenshots'));
  const failures=results.filter(x=>x.status==='FAIL'||x.status==='BLOCK');
  console.log(`SUMMARY ${results.filter(x=>x.status==='PASS').length} passed, ${failures.length} failures/blockers, ${results.filter(x=>x.status==='WARN').length} warnings.`);
  process.exitCode=failures.length||issues.some(x=>x.level==='RUNNER')?2:0;
}
