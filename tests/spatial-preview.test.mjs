import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const registry = read("src/content/spatial-projects.ts");
const client = read("src/app/spatial-preview/SpatialExperience.tsx");
const css = read("src/app/spatial-preview/spatial.module.css");

test("the temporary spatial page is removed while its homepage implementation remains", () => {
  assert.equal(existsSync(join(root, "src/app/spatial-preview/page.tsx")), false);
  assert.equal(existsSync(join(root, "src/app/atelier-preview/page.tsx")), false);
  assert.doesNotMatch(read("src/app/sitemap.ts"), /spatial-preview|atelier-preview/);
  assert.match(read("src/app/page.tsx"), /spatial-preview\/SpatialExperience/);
});
test("original portrait is referenced, not modified or replaced", () => {
  assert.match(client, /src="\/E\.O\.jpg"/);
  assert.ok(existsSync(join(root,"public/E.O.jpg")));
  assert.doesNotMatch(client, /original photo|AI-enhanced portrait|generated portrait/i);
});
test("six projects remain discoverable with honest public/private status", () => {
  for (const id of ["aurelia", "commerceops", "confora", "vue-job-finder", "blogging-platform", "private-work"]) {
    assert.match(registry, new RegExp(`id: "${id}"`));
  }
  assert.match(registry, /private-engineering-project|Private source/);
  assert.match(client, /Conceptual illustration/);
  assert.match(registry, /Contribution pending approval/);
  assert.match(client, /spatialProjects\.filter/);
});
test("accessible routes and non-motion fallback remain available", () => {
  assert.match(client, /href="#main"/);
  assert.match(client, /aria-expanded=\{menuOpen\}/);
  assert.match(client, /Escape/);
  assert.match(client, /Pause motion/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /pointer:\s*coarse/);
  assert.match(client, /href="\/resume"/);
  assert.match(client, /mailto:/);
});
test("canonical route reuses approved preview and does not publish unapproved CV", () => {
  assert.doesNotMatch(client, /REVIEW_DRAFT|Ervin_Osmani\.pdf|Download CV/);
  assert.match(read("src/app/page.tsx"), /SpatialExperience/);
  assert.match(read("src/app/page.tsx"), /Software Developer/);
  assert.ok(existsSync(join(root, "src/app/case-studies/aurelia/page.tsx")));
  assert.ok(existsSync(join(root, "src/app/case-studies/commerceops/page.tsx")));
});
