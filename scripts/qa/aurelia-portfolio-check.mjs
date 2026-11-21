import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve(process.argv[2] || ".");
const load = (path) => {
  const target = join(root, path);
  assert.ok(existsSync(target), `Missing portfolio source: ${path}`);
  return readFileSync(target, "utf8");
};

const page = load("src/app/case-studies/aurelia/page.tsx");
const pageCss = load("src/app/case-studies/aurelia/aurelia.module.css");
const teaser = load("src/app/components/AureliaTeaser.tsx");
const teaserCss = load("src/app/components/AureliaTeaser.module.css");
const illustration = load("src/app/components/AureliaInterfaceIllustration.tsx");
const illustrationCss = load("src/app/components/AureliaInterfaceIllustration.module.css");
const index = load("src/app/case-studies/page.tsx");
const home = load("src/app/redesign/ProjectsSection.tsx");
const sitemap = load("src/app/sitemap.ts");
const documentation = load("docs/AURELIA_PORTFOLIO_CASE_STUDY.md");

const containsAll = (content, patterns, label) => {
  for (const pattern of patterns) assert.match(content, pattern, `${label}: ${pattern}`);
};

containsAll(page, [
  /export const metadata/, /alternates: \{ canonical \}/, /robots: \{ index: true, follow: true \}/,
  /The interface should make sense/, /integer minor units/, /reversal and replacement/,
  /Row Level Security/, /NET NEW INCOME/, /€0\.00/, /168 passing Vitest/,
  /14 passing Playwright/, /not an atomic database snapshot/i,
  /not a hosted financial service/i, /synthetic examples/i,
], "Case study");
containsAll(teaser, [
  /PRIVATE APPLICATION/, /Read the Aurelia case study/,
  /synthetic sample data/i, /AureliaInterfaceIllustration/,
], "Featured preview");
containsAll(illustration, [
  /All values are invented examples/, /Not a screenshot/,
  /TOTAL TRACKED BALANCE · SAMPLE/, /INCOME · SAMPLE/, /SPENDING · SAMPLE/,
], "Synthetic product illustration");
containsAll(home, [/<AureliaTeaser context="home"/], "Homepage integration");
containsAll(index, [/<AureliaTeaser context="index"/, /href="#aurelia"/, /<strong>05<\/strong>/], "Case-study index");
containsAll(sitemap, [/case-studies\/aurelia/], "Sitemap");
containsAll(documentation, [/synthetic/, /not a screenshot/i, /No public Aurelia deployment/], "Editorial documentation");

const cssClasses = (tsx, css, label) => {
  const referenced = [...tsx.matchAll(/styles\.([A-Za-z][A-Za-z0-9]*)/g)].map(match => match[1]);
  assert.ok(referenced.length > 4, `${label}: unexpectedly few style references`);
  for (const name of new Set(referenced)) {
    assert.ok(new RegExp(`\\.${name}(?![A-Za-z0-9_-])`).test(css), `${label}: missing CSS class ${name}`);
  }
};
cssClasses(page, pageCss, "Case study");
cssClasses(teaser, teaserCss, "Teaser");
cssClasses(illustration, illustrationCss, "Product illustration");
for (const [label, css] of [["Page",pageCss],["Teaser",teaserCss],["Illustration",illustrationCss]]) {
  assert.match(css, /prefers-reduced-motion/, `${label}: missing reduced motion support`);
}
assert.match(pageCss, /focus-visible/);
assert.match(teaserCss, /focus-visible/);

for (const [label, source] of [["Case study",page],["Teaser",teaser],["Illustration",illustration]]) {
  assert.doesNotMatch(source, /service[_-]?role|SUPABASE_SERVICE_ROLE|DATABASE_URL|postgres:\/\/|NEXT_PUBLIC_SUPABASE_URL|(?<![a-z])password\s*[:=]/i, `${label}: possible private material`);
  assert.doesNotMatch(source, /Live demo|View live application|Buy now|production-ready SaaS/i, `${label}: unapproved public/production claim`);
  assert.doesNotMatch(source, /8 export datasets|8 owner-scoped export|168<\/strong>|14<\/strong>/, `${label}: decorative test metrics in hero`);
}
console.log("PASS: V2 Aurelia presentation and navigation contract.");
console.log("PASS: Relevant financial design decisions and limitations.");
console.log("PASS: Synthetic illustration clearly disclosed, no private demo links.");
console.log("PASS: CSS module references, focus and reduced-motion rules (static).");
console.log("PASS: Technical verification is secondary, not a hero metric.");
console.log("SUCCESS: Aurelia portfolio V2 static QA passed. Browser visual QA still required.");
