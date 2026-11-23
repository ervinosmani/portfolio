import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const navigation = read("src/app/editorial/SmoothAnchorNavigation.tsx");
const homeProjects = read("src/content/spatial-projects.ts");
const work = read("src/app/case-studies/page.tsx");
const resume = read("src/app/resume/page.tsx");
const privacy = read("src/content/resume.ts");

test("history navigation cancels custom animation instead of overriding scroll restoration", () => {
  assert.match(navigation, /const onHistory = \(\) => cancel\(\)/);
  assert.match(navigation, /addEventListener\("popstate", onHistory\)/);
  assert.match(navigation, /addEventListener\("pagehide", cancel\)/);
  assert.doesNotMatch(navigation, /onHistory[\s\S]{0,200}scrollToFragment\(/);
  assert.match(navigation, /scrollToFragment\(requested\.hash, true\)/);
});

test("project descriptions include actual purpose and scoped technology evidence", () => {
  for (const term of ["Laravel", "Vue-based", "Spring Boot", "PostgreSQL", "multilingual", "private implementations"]) {
    assert.ok(homeProjects.includes(term), `Missing project detail: ${term}`);
  }
  assert.match(work, /registered\.technologies\.join/);
  assert.match(work, /registered\.contribution/);
});

test("career page is visitor-facing without opening unapproved CV downloads", () => {
  assert.doesNotMatch(resume, /FACTUAL PREVIEW \/ CV APPROVAL PENDING/);
  assert.doesNotMatch(resume, /The application CV is awaiting final approval/);
  assert.match(resume, /Request my CV/);
  for (const flag of ["publicCvApproved", "applicationDownloadsAvailable", "indexingAllowed"]) {
    assert.match(privacy, new RegExp(`${flag}: false`));
  }
  assert.doesNotMatch(resume, /href=["']\/resume\/[^"']+\.(pdf|docx)/i);
});
