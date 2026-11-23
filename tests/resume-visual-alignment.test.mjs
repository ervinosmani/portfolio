import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(root, "src/app/resume/resume.module.css"), "utf8");
const page = readFileSync(join(root, "src/app/resume/page.tsx"), "utf8");
const publication = readFileSync(join(root, "src/content/resume.ts"), "utf8");

test("career profile uses the portfolio night/mint editorial palette, with quieter reading sections", () => {
  assert.match(css, /Career Edition \/ visual alignment/);
  assert.match(css, /--career-night: #07111b/);
  assert.match(css, /--career-mint: #9df3da/);
  assert.match(css, /\.hero \{[\s\S]*?background: radial-gradient/);
  assert.match(css, /\.additionalProject \{[\s\S]*?linear-gradient/);
  assert.match(css, /\.sectionHeading em \{[\s\S]*?Georgia/);
});

test("career styling remains responsive and preserves a printer-friendly CV view", () => {
  assert.match(css, /@media screen and \(max-width: 390px\)/);
  assert.match(css, /@media screen and \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media print/);
  assert.match(css, /\.main \{ background: #fff !important; color: #111 !important;/);
  assert.match(page, /aria-label="Professional links"/);
});

test("career content and CV publication boundaries remain unchanged", () => {
  assert.match(page, /profile\.experience\.map/);
  assert.match(page, /profile\.education\.map/);
  assert.match(page, /profile\.featured\.map/);
  assert.match(page, /Request my CV/);
  for (const key of ["publicCvApproved", "applicationDownloadsAvailable", "indexingAllowed"]) {
    assert.match(publication, new RegExp(`${key}: false`));
  }
});
