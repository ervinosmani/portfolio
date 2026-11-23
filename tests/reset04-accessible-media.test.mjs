import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root,p),"utf8");
const home = read("src/app/spatial-preview/SpatialExperience.tsx");
const header = read("src/app/editorial/StudioHeader.tsx");
const work = read("src/app/case-studies/page.tsx");
const homeCss = read("src/app/spatial-preview/spatial.module.css");
const workCss = read("src/app/case-studies/case-studies.module.css");

test("brand links derive their accessible names from all visible text", () => {
  assert.match(home, /<Link href="\/" className=\{styles\.brand\}>/);
  assert.match(header, /<Link className=\{styles\.identity\} href="\/">/);
  for (const [name, source] of [["home", home], ["shared header", header]]) {
    assert.doesNotMatch(source, /aria-label="EO Ervin Osmani[^"]*Portfolio home"/, name);
    assert.match(source, /<span className=\{styles\.monogram\}>EO<\/span>/, name);
  }
});
test("project card links derive names from visible content", () => {
  assert.match(home, /href=\{project.href\} className=\{styles.projectLink\}/);
  assert.doesNotMatch(home, /aria-label=\{`\$\{project.title\} — Explore the case study`\}/);
});
test("responsive WebP with original PNG fallback is used for Confora and Blogging", () => {
  for (const name of ["confora-hero", "blogproject1"]) {
    for (const width of [480, 960]) {
      assert.match(home, new RegExp(`${name}-${width}\\.webp`));
      assert.match(work, new RegExp(`${name}-${width}\\.webp`));
    }
  }
  assert.match(home, /unoptimized/);
  assert.match(work, /unoptimized/);
  assert.match(homeCss, /\.previewMedia > picture img/);
  assert.match(workCss, /\.archiveImage picture img/);
});
