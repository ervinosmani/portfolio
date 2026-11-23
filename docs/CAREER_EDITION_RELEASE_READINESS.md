# Portfolio Career Edition — Private Release Readiness Record

**Review date:** 2026-11-23
**Status:** LOCAL QA EVIDENCED; PUBLICATION NOT AUTHORIZED
**Repository:** `ervinosmani/portfolio`
**Local feature branch last reported:** `feat/portfolio-career-edition`
**Local HEAD last reported:** `01e529e15643660978035abd204e3f74b9f22b18`

## Evidence received

| Check | Owner-local result | Qualification |
| --- | --- | --- |
| Node regression tests | 43 passed, 0 failed | Seven test files; last run after QA/CI alignment |
| Strict TypeScript | Pass | Owner-local command output |
| ESLint | Pass, zero warnings | `eslint src scripts tests --max-warnings=0` |
| Next.js build | Pass | Next.js 15.5.29; Edge runtime static-generation warning is non-fatal |
| Chromium motion/cursor | 7 passed, 0 failed | Includes 320, 390, 768, 1440px, reduced motion and decorative cursor |
| Chromium responsive | 123 passed, 0 failed, 0 warnings | Owner-local production build; viewports 320–3840px, route and metadata checks |
| Remote GitHub Actions | Not run/verified | No release branch push evidenced |
| Vercel production release | Not run/verified | Current feature work remains unpushed |
| WCAG manual screen reader | Outstanding | Browser automation is not a conformance certification |
| ATS portal import / final career approval | Outstanding | Draft CVs remain private |
| Real-user Core Web Vitals | Not measured | Lab automation must not be confused with field data |

## Reviewed CV candidates

The private review package contains a one-page text-based ATS PDF, a matching editable DOCX, and a one-page branded PDF. PDF text extraction yields the same substantive career statements in both versions. The documents avoid specific unsupported job months, an awarded UBT degree, public CommerceOps availability, invented client metrics, and personal phone/address data.

**Important differences / follow-up:** LinkedIn is intentionally omitted from the drafts because destination verification is outstanding. Both PDFs contain four hyperlink annotations; these are format checks, not live URL reachability checks. The documents are DRAFTs and must not be published or presented as finally approved. Current `/resume` intentionally remains `noindex`, and the legacy PDF should remain inaccessible in the local release candidate.

## Blocking decisions before any publication

1. Confirm that public career wording and contact details are approved; omit facts that cannot be established rather than inventing them.
2. Complete manual keyboard and screen-reader review at 200%/400% zoom, including heading order, accessible names, and focus restoration. Retest any real finding.
3. Inspect Git staging scope for untracked files, secrets, license/permissions, private media, and original portrait preservation. Never stage with `git add .` without review.
4. Decide explicitly whether to remove or retain noindexed historical preview routes. Preserve canonical URLs and inbound links.
5. Authorize a controlled commit only after the gate; keep the feature branch local until authorized push. Confirm GitHub CI and both applicable Vercel projects after release.

## Source provenance

Based on project Master Playbook, source registry snapshot (78 files), prior reviewed private CV drafts, and owner-provided local PowerShell/Chromium outputs. This report is a checkpoint record; it does not claim independent execution of Windows builds, CI, or the live Vercel deployment.
