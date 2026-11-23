import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const smooth = read("src/app/editorial/SmoothAnchorNavigation.tsx");
const cursor = read("src/app/editorial/SignatureCursor.tsx");
const cursorCSS = read("src/app/editorial/SignatureCursor.module.css");
const layout = read("src/app/layout.tsx");
const globalCSS = read("src/app/globals.css");
const home = read("src/app/spatial-preview/SpatialExperience.tsx");

test("single global enhancement without route-level duplication", () => {
  assert.match(layout, /<SmoothAnchorNavigation\s*\/>/);
  assert.match(layout, /<SignatureCursor\s*\/>/);
  assert.doesNotMatch(home, /<SmoothAnchorNavigation/);
});
test("smooth navigation only intercepts same-document fragment links", () => {
  assert.match(smooth, /requested\.origin !== current\.origin/);
  assert.match(smooth, /requested\.pathname !== current\.pathname/);
  assert.match(smooth, /requested\.search !== current\.search/);
  assert.match(smooth, /event\.preventDefault\(\)/);
  assert.match(smooth, /window\.history\.pushState/);
  assert.match(smooth, /window\.requestAnimationFrame/);
  assert.match(smooth, /window\.getComputedStyle\(target\)\.scrollMarginTop/);
});
test("native Skip to content, reduced motion and manual scrolling remain accessible", () => {
  assert.match(smooth, /link\.hash === "#main"/);
  assert.match(smooth, /prefers-reduced-motion: reduce/);
  assert.match(smooth, /wheel/);
  assert.match(smooth, /touchstart/);
  assert.match(smooth, /popstate/);
  assert.match(smooth, /focus\(\{ preventScroll: true \}\)/);
  assert.match(globalCSS, /scroll-margin-top: 92px/);
});
test("cursor remains decorative and pointer-events none", () => {
  assert.match(cursor, /aria-hidden="true"/);
  assert.match(cursorCSS, /pointer-events: none/);
  assert.match(cursor, /requestAnimationFrame/);
  assert.match(cursor, /data-signature-cursor/);
  assert.doesNotMatch(cursor, /addEventListener\("click"/);
});
test("cursor is disabled for touch or reduced-motion and leaves text selection alone", () => {
  assert.match(cursor, /hover: hover/);
  assert.match(cursor, /pointer: fine/);
  assert.match(cursor, /prefers-reduced-motion: reduce/);
  assert.match(cursor, /event\.pointerType !== "mouse"/);
  assert.match(globalCSS, /\[contenteditable="true"\]/);
});
test("original portrait, private CV and external navigation remain unaffected", () => {
  assert.match(home, /src="\/E\.O\.jpg"/);
  assert.match(home, /target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(smooth, /preventDefault\(\)[\s\S]*mailto:/);
  assert.doesNotMatch(layout, /\.pdf|\.docx/);
});
