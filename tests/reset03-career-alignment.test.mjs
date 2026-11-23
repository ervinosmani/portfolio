import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => readFileSync(join(root, name), "utf8");
const career = read("src/content/experience.ts");
const resume = read("src/content/resume.ts");
const resumePage = read("src/app/resume/page.tsx");
const homepage = read("src/app/spatial-preview/SpatialExperience.tsx");

// This suite protects truthful publication boundaries; it is not owner approval.
test("Starlabs internship and Twig/full-stack scope follow owner confirmation", () => {
  assert.match(career, /Starlabs/);
  assert.match(career, /Full-Stack Web Development Intern/);
  assert.match(career, /three-month web-development internship/);
  assert.match(career, /Twig-based templates/);
});

test("Digital School role is not inflated or assigned invented dates", () => {
  assert.match(career, /Programming Assistant Instructor/);
  assert.match(career, /hands-on programming and web-development sessions/);
  assert.match(career, /Exact dates are not confirmed/);
  assert.doesNotMatch(career, /2024\s*[-–]\s*2025/);
});

test("UBT period is shown without asserting an awarded degree", () => {
  assert.match(career, /2020\/21–2023\/24/);
  assert.match(career, /formal degree award and exact credential title are not yet verified/);
  assert.doesNotMatch(career, /Bachelor of Science|BSc|graduated with/i);
});

test("Probit Academy completion is distinct from credential verification", () => {
  assert.match(career, /Probit Academy/);
  assert.match(career, /Completed a full-stack web development training programme/);
  assert.match(career, /exact title and issue date are not yet verified/);
});

test("Homepage and Resume consume a shared background registry", () => {
  assert.match(homepage, /import \{ background \} from "\.\.\/\.\.\/content\/experience"/);
  assert.match(resume, /import \{ background \} from "\.\/experience"/);
  assert.match(resume, /background\.filter\(\(entry\) => entry\.kind === "experience"\)/);
  assert.match(resume, /background\.filter\(\(entry\) => entry\.kind === "education-or-training"\)/);
});

test("Resume renders accessible career and education sections", () => {
  assert.match(resumePage, /aria-labelledby="experience-title"/);
  assert.match(resumePage, /aria-labelledby="education-title"/);
  assert.match(resumePage, /data-career-type="experience"/);
  assert.match(resumePage, /data-career-type="education"/);
  assert.match(resumePage, /profile\.featured\.map/);
});

test("CV is still strictly gated and noindex", () => {
  assert.match(resume, /publicCvApproved: false/);
  assert.match(resume, /applicationDownloadsAvailable: false/);
  assert.match(resume, /indexingAllowed: false/);
  assert.match(resumePage, /robots: \{ index: resumePublication\.indexingAllowed, follow: false \}/);
  assert.doesNotMatch(resumePage, /href=["']\/resume\/[^"']+\.(pdf|docx)/i);
  assert.ok(!existsSync(join(root, "public/Ervin_Osmani.pdf")));
});

test("No private project data or unsupported career metrics were introduced", () => {
  const material = career + resumePage;
  assert.doesNotMatch(material, /increased by \d+%|\d+ years of experience|managed \d+ people/i);
  assert.doesNotMatch(material, /PRIVATE_REVIEW_v3|\.env|financial account number/i);
});
