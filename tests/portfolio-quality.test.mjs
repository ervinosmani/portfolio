import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) =>
  readFileSync(path.join(root, relativePath), "utf8");

const home = read("src/app/page.tsx");
const homeExperience = read("src/app/spatial-preview/SpatialExperience.tsx");
const workStyles = read("src/app/case-studies/case-studies.module.css");
const projects = read("src/content/projects.ts");
const resume = read("src/content/resume.ts");
const resumePage = read("src/app/resume/page.tsx");
const index = read("src/app/case-studies/page.tsx");
const sitemap = read("src/app/sitemap.ts");
const cursor = read("src/app/editorial/SignatureCursor.tsx");
const cursorStyles = read("src/app/editorial/SignatureCursor.module.css");

// This suite is a static publication guard, not a substitute for browser QA.
test("canonical homepage adopts the approved spatial experience, with recruiter actions", () => {
  assert.match(home, /SpatialExperience/);
  assert.match(home, /canonical: "\/"/);
  assert.match(home, /index: true/);
  assert.match(homeExperience, /<h1/);
  assert.match(homeExperience, /id="work"/);
  assert.match(homeExperience, /id="experience"/);
  assert.match(homeExperience, /id="contact"/);
  assert.match(homeExperience, /href="\/resume"/);
  assert.match(homeExperience, /mailto:/);
  assert.match(homeExperience, /src="\/E\.O\.jpg"/);
});

test("featured project order and evidence status remain honest", () => {
  assert.ok(projects.indexOf('id: "aurelia"') < projects.indexOf('id: "commerceops"'));
  assert.match(projects, /curated-public-source/);
  assert.match(projects, /private-engineering-project/);
  assert.match(projects, /aurelia-finance-showcase/);
  assert.match(projects, /No public SaaS deployment/);
  assert.doesNotMatch(projects, /sourceUrl:\s*"[^"\n]*commerceops/i);
});

test("canonical case-study routes are preserved", () => {
  assert.match(projects, /\/case-studies\/aurelia/);
  assert.match(projects, /\/case-studies\/commerceops/);
  assert.match(index, /getFlagshipBrief|flagshipBriefs/);
  assert.match(index, /spatialProjects/);
  assert.match(index, /id="confora"|id=\{project\.id\}/);
  assert.match(workStyles, /prefers-reduced-motion/);
  assert.ok(existsSync(path.join(root, "src/app/case-studies/aurelia/page.tsx")));
  assert.ok(existsSync(path.join(root, "src/app/case-studies/commerceops/page.tsx")));
});

test("resume does not claim unapproved publication", () => {
  assert.match(resume, /publicCvApproved:\s*false/);
  assert.match(resume, /applicationDownloadsAvailable:\s*false/);
  assert.match(resume, /indexingAllowed:\s*false/);
  assert.match(resumePage, /robots:\s*\{\s*index:\s*resumePublication\.indexingAllowed/);
  for (const source of [home, resumePage]) {
    assert.doesNotMatch(source, /Ervin_Osmani\.pdf|_REVIEW_DRAFT\.pdf|public\/resume\//);
  }
});

test("temporary preview routes are retired and excluded from the sitemap", () => {
  assert.equal(existsSync(path.join(root, "src/app/atelier-preview/page.tsx")), false);
  assert.equal(existsSync(path.join(root, "src/app/spatial-preview/page.tsx")), false);
  assert.ok(existsSync(path.join(root, "src/app/spatial-preview/SpatialExperience.tsx")));
  assert.doesNotMatch(sitemap, /atelier-preview|spatial-preview|\/redesign|\/resume/);
  assert.match(sitemap, /case-studies\/aurelia/);
  assert.match(sitemap, /case-studies\/commerceops/);
});

test("old redesign route redirects permanently to canonical homepage", () => {
  const legacy = read("src/app/redesign/page.tsx");
  assert.match(legacy, /permanentRedirect\("\/"\)/);
});

test("decorative pointer is never an interaction requirement", () => {
  assert.match(cursor, /prefers-reduced-motion: no-preference/);
  assert.match(cursor, /hover: hover/);
  assert.match(cursorStyles, /pointer-events:\s*none/);
  assert.match(cursorStyles, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(cursorStyles, /cursor:\s*none/);
});

test("custom 404 has semantic heading and useful navigation", () => {
  const missing = read("src/app/not-found.tsx");
  assert.match(missing, /<main/);
  assert.match(missing, /<h1/);
  assert.match(missing, /href="\/"/);
  assert.match(missing, /href="\/case-studies"/);
});

test("social card matches career identity, not a product dashboard", () => {
  const og = read("src/app/opengraph-image.tsx");
  assert.match(og, /Ervin Osmani/);
  assert.match(og, /Software Developer/);
  assert.doesNotMatch(og, /MAKING IDEAS WORK|MAKING/);
});

test("unapproved legacy CV is absent from published assets", () => {
  assert.equal(existsSync(path.join(root, "public/Ervin_Osmani.pdf")), false);
});
