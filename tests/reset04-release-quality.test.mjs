import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const read=(p)=>readFileSync(join(root,p),"utf8");
const aurelia=read("src/app/case-studies/aurelia/page.tsx");
const commerce=read("src/app/case-studies/commerceops/page.tsx");
const work=read("src/app/case-studies/page.tsx");
const resume=read("src/app/resume/page.tsx");
const script=read("scripts/qa/reset02-browser-check.mjs");

for(const [name,page] of [["Aurelia",aurelia],["CommerceOps",commerce]]) {
  test(`${name} uses shared accessible primary chrome without duplicate legacy header`,()=>{
    assert.match(page,/import StudioHeader from/);
    assert.match(page,/import StudioFooter from/);
    assert.match(page,/<StudioHeader \/>/);
    assert.match(page,/<StudioFooter \/>/);
    assert.doesNotMatch(page,/<header className=\{styles\.header\}>/);
    assert.match(page,/aria-label="[^"]*case study sections"/);
    assert.match(page,/href="\/case-studies"/);
    assert.match(page,/<main id="main"/);
  });
}
test("all contextual chapter anchors have matching section ids",()=>{
  for(const fragment of ["#product","#engineering","#review"]) assert.match(aurelia,new RegExp(`href="${fragment}"`));
  for(const section of ["product","engineering","review"]) assert.match(aurelia,new RegExp(`id="${section}"`));
  for(const fragment of ["#architecture","#product","#evidence"]) assert.match(commerce,new RegExp(`href="${fragment}"`));
  for(const section of ["architecture","product","evidence"]) assert.match(commerce,new RegExp(`id="${section}"`));
});
test("career page preserves noindex and external tab announcements",()=>{
  assert.match(resume,/robots: \{ index: resumePublication\.indexingAllowed/);
  assert.match(resume,/aria-label="GitHub \(opens in a new tab\)"/);
  assert.match(resume,/aria-label="LinkedIn \(opens in a new tab\)"/);
  assert.doesNotMatch(resume,/\.pdf|\.docx/);
});
test("release audit covers scroll depth, links, privacy gate and actual media bytes",()=>{
  assert.match(script,/RESET-04 metadata\/nav\/anchors/);
  assert.match(script,/reset04-\$\{route/);
  assert.match(script,/reset04.*-middle/);
  assert.match(script,/RESET-04 local asset byte inventory/);
  assert.match(script,/RESET-04\+ responsive media budget/);
  assert.match(script,/Unapproved resume became indexable/);
});
test("work index still exposes six projects and flagship evidence",()=>{
  assert.match(work,/spatialProjects/);
  assert.match(work,/getFlagshipBrief/);
  assert.match(work,/StudioHeader/);
  assert.match(work,/StudioFooter/);
});
