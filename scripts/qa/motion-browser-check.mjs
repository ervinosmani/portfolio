#!/usr/bin/env node
/** Real Chromium scroll + cursor interaction smoke against the local production build. */
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir, homedir } from 'node:os';
import { setTimeout as delay } from 'node:timers/promises';

const args=Object.fromEntries(process.argv.slice(2).reduce((a,v,i,src)=>{if(i%2===0)a.push([v.replace(/^--/,''),src[i+1]]);return a;},[]));
if(!args.repo||!args.out) throw Error('Usage: node motion-browser-check.mjs --repo <repo> --out <out>');
const repo=resolve(args.repo), out=resolve(args.out);
mkdirSync(out,{recursive:true});mkdirSync(join(out,'screenshots'),{recursive:true});
const evidence=[];const errors=[];
let server,browser,cdp,profile;
const add=(name,pass,data={})=>{const item={name,pass,...data};evidence.push(item);console.log(`${pass?'PASS':'FAIL'} ${name} ${JSON.stringify(data)}`);};
const browserExecutable=()=>{
 const paths=process.platform==='win32' ? [
  join(process.env.PROGRAMFILES||'C:\\Program Files','Google','Chrome','Application','chrome.exe'),
  join(process.env.PROGRAMFILES||'C:\\Program Files','Microsoft','Edge','Application','msedge.exe'),
  join(process.env.PROGRAMFILES||'C:\\Program Files','BraveSoftware','Brave-Browser','Application','brave.exe'),
  join(process.env.LOCALAPPDATA||join(homedir(),'AppData','Local'),'Google','Chrome','Application','chrome.exe')
 ] : ['/usr/bin/chromium','/usr/bin/google-chrome'];
 const p=paths.find(existsSync);if(!p)throw Error('Chromium browser unavailable');return p;
};
const freePort=()=>new Promise((res,rej)=>{const s=createServer();s.once('error',rej);s.listen(0,'127.0.0.1',()=>{const a=s.address();s.close(()=>res(a.port));});});
const ready=async(url)=>{for(let i=0;i<100;i++){try{const r=await fetch(url,{signal:AbortSignal.timeout(1000)});if(r.ok)return;}catch{}await delay(180);}throw Error('Next.js server did not start');};
const devPort=async(file)=>{for(let i=0;i<130;i++){if(existsSync(file)){const t=readFileSync(file,'utf8').trim().split(/\r?\n/);if(/^\d+$/.test(t[0])&&t[1])return{port:+t[0],url:t[1]};}await delay(100);}throw Error('Chromium CDP endpoint unavailable');};
class CDP {
 constructor(url){this.socket=new WebSocket(url);this.id=0;this.pending=new Map();this.ready=new Promise((res,rej)=>{this.socket.addEventListener('open',res);this.socket.addEventListener('error',()=>rej(Error('CDP connection failed')));});this.socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&this.pending.has(m.id)){const x=this.pending.get(m.id);this.pending.delete(m.id);if(m.error){x.reject(Error(m.error.message));}else{x.resolve(m.result||{});}}else if(m.method==='Runtime.exceptionThrown')errors.push(JSON.stringify(m.params||{}).slice(0,360));});}
 async send(method,params={}){await this.ready;return new Promise((res,rej)=>{const id=++this.id;const tm=setTimeout(()=>{this.pending.delete(id);rej(Error('CDP timeout '+method));},20000);this.pending.set(id,{resolve:v=>{clearTimeout(tm);res(v);},reject:e=>{clearTimeout(tm);rej(e);}});this.socket.send(JSON.stringify({id,method,params}));});}
 close(){try{this.socket.close();}catch{}}
}
const evaluate=async(expr)=>{const r=await cdp.send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error('Browser evaluation error '+JSON.stringify(r.exceptionDetails).slice(0,300));return r.result?.value;};
const screenshot=async(name)=>{const v=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});writeFileSync(join(out,'screenshots',name+'.png'),Buffer.from(v.data,'base64'));};
const wait=async(pred,ms=12000)=>{const end=Date.now()+ms;while(Date.now()<end){if(await evaluate(pred).catch(()=>false))return;await delay(130);}throw Error('Browser condition not met: '+pred);};
async function goto(url){await cdp.send('Page.navigate',{url});await wait(`location.href===${JSON.stringify(url)} && document.readyState==='complete' && document.documentElement.getAttribute('data-smooth-anchors')==='ready'`,24000);await delay(280);}
async function viewport(w,h,reduced=false){await cdp.send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:1,mobile:false});await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]});}
try{
 const chrome=browserExecutable(), next=join(repo,'node_modules','next','dist','bin','next');
 if(!existsSync(next))throw Error('Production Next.js binary missing; run the existing build first');
 const port=await freePort();const origin=`http://127.0.0.1:${port}`;
 server=spawn(process.execPath,[next,'start','--hostname','127.0.0.1','--port',String(port)],{cwd:repo,windowsHide:true,stdio:'ignore'});
 await ready(origin+'/');
 profile=join(tmpdir(),'portfolio-motion-'+process.pid+'-'+Date.now());
 browser=spawn(chrome,['--headless=new','--disable-gpu','--disable-extensions','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
 const dp=await devPort(join(profile,'DevToolsActivePort'));
 const list=await (await fetch(`http://127.0.0.1:${dp.port}/json/list`)).json();const page=list.find(x=>x.type==='page'&&x.webSocketDebuggerUrl);
 if(!page)throw Error('No Chromium page debugging target');
 cdp=new CDP(page.webSocketDebuggerUrl);await cdp.ready;await cdp.send('Page.enable');await cdp.send('Runtime.enable');
 for(const w of [320,390,768,1440]){
  await viewport(w,Math.max(720,Math.floor(w*.6)));
  await goto(origin+'/?__motion_check='+w);
  const initial=await evaluate('window.scrollY');
  await evaluate(`document.querySelector('a[href="#work"]')?.click()`);
  await delay(180);const early=await evaluate('window.scrollY');
  await delay(500);const middle=await evaluate('window.scrollY');
  await delay(1800);const done=await evaluate(`(() => {const section=document.getElementById('work');const target=section.getBoundingClientRect().top+scrollY-(parseFloat(getComputedStyle(section).scrollMarginTop)||0);return{y:scrollY,target,hash:location.hash,focus:document.activeElement.id};})()`);
  add('Smooth same-page navigation '+w,w>0&&early>initial&&middle>early+15&&Math.abs(done.y-done.target)<5&&done.hash==='#work'&&done.focus==='work',{early,middle,final:done});
  await screenshot('motion-'+w);
 }
 await viewport(390,844,true);await goto(origin+'/?__motion_check=reduced');
 await evaluate(`document.querySelector('a[href="#work"]')?.click()`);await delay(160);
 const reduced=await evaluate(`(() => {const el=document.getElementById('work');return {y:scrollY,target:el.getBoundingClientRect().top+scrollY-(parseFloat(getComputedStyle(el).scrollMarginTop)||0)};})()`);
 add('Reduced-motion instant movement',Math.abs(reduced.y-reduced.target)<5,reduced);
 await viewport(1440,900,false);await goto(origin+'/?__motion_check=cursor');
 const y=await evaluate(`(() => {const el=document.querySelector('a[href="#work"]');const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
 await cdp.send('Input.dispatchMouseEvent',{type:'mouseMoved',x:y.x,y:y.y,button:'none'});await delay(200);
 const cursor=await evaluate(`(() => {const node=document.querySelector('[data-interactive][data-visible]');return {mode:document.documentElement.getAttribute('data-signature-cursor'),visible:node?.dataset.visible,interactive:node?.dataset.interactive,pointerEvents:node?getComputedStyle(node).pointerEvents:null};})()`);
 add('Desktop decorative cursor',cursor.mode==='active'&&cursor.visible==='true'&&cursor.interactive==='true'&&cursor.pointerEvents==='none',cursor);
 add('No browser exceptions',errors.length===0,{errors});
}catch(e){errors.push(String(e.stack||e));add('Browser QA execution',false,{error:String(e.message||e)});}
finally{
 try{cdp?.close();}catch{}
 if(browser&&!browser.killed)browser.kill();if(server&&!server.killed)server.kill();
 if(profile)try{rmSync(profile,{recursive:true,force:true});}catch{}
 const result={generatedAt:new Date().toISOString(),checks:evidence,errors,passed:evidence.filter(e=>e.pass).length,failed:evidence.filter(e=>!e.pass).length};
 writeFileSync(join(out,'MOTION_QA.json'),JSON.stringify(result,null,2)+'\n');
 writeFileSync(join(out,'MOTION_QA.md'),['# Motion & Cursor — Chromium QA','',`Pass ${result.passed}, fail ${result.failed}`,'',...evidence.map(e=>`- ${e.pass?'PASS':'FAIL'}: ${e.name} — ${JSON.stringify(e).slice(0,400)}`),'',...errors.map(e=>`- ERROR: ${e}`),''].join('\n'));
}
if(evidence.some(x=>!x.pass)||errors.length)process.exitCode=2;
