import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root,path),"utf8");
const home = read("src/app/spatial-preview/SpatialExperience.tsx");
const work = read("src/app/case-studies/page.tsx");
const nav = read("src/app/editorial/StudioHeader.tsx");
const registry = read("src/content/spatial-projects.ts");
const resume = read("src/content/resume.ts");

test("six project references are discoverable from work and home", () => {
  for (const id of ["aurelia","commerceops","confora","vue-job-finder","blogging-platform","private-work"]) {
    assert.match(registry,new RegExp(`id: "${id}"`));
  }
  assert.match(home,/spatialProjects\.filter/);
  assert.match(work,/spatialProjects\.filter/);
  assert.match(work,/href=\{`#\$\{project\.id\}`\}/);
  assert.match(work,/caseStudyUrl/);
});
test("media provenance remains explicit and confidential examples remain protected", () => {
  assert.match(work,/Conceptual visual/);
  assert.match(work,/Real local engineering MVP interface/);
  assert.match(work,/contribution and permission remain/i);
  assert.match(work,/Private scripting and workflow exploration/);
  assert.match(work, /<picture>/);
  assert.match(work, /confora-hero-480\.webp/);
  assert.match(work, /blogproject1-960\.webp/);
  assert.match(work, /Confora multilingual transport website artwork/);
});
test("the work index has accessible navigation and meaningful media descriptions", () => {
  assert.match(work, /<main id="main"/);
  assert.match(work, /<h1>/);
  assert.match(work, /Skip to content/);
  assert.match(work, /aria-label="Jump to a project"/);
  assert.match(work, /alt="Confora multilingual transport website artwork"/);
  assert.match(work, /alt="Existing Blogging Platform project media"/);
});
test("the shared header supports mobile, escape, focus and resume", () => {
  assert.match(nav, /aria-expanded=\{open\}/);
  assert.match(nav, /Escape/);
  assert.match(nav, /toggleRef\.current\?\.focus/);
  assert.match(nav, /href: "\/resume"/);
  assert.match(nav, /href: "\/#experience"/);
});
test("public CV PDFs remain gated", () => {
  assert.match(resume,/publicCvApproved: false/);
  assert.match(resume,/applicationDownloadsAvailable: false/);
  assert.doesNotMatch(home+work, /Ervin_Osmani\.pdf|REVIEW_DRAFT/);
});
