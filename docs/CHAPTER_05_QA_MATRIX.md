# Portfolio Career Edition — Quality & Release Gates

## Current state

Chapter 05 improves route continuity, social preview identity, a useful 404 page,
content-source regression tests, and CI preparation. None of these source-level
checks constitute a manual accessibility audit or a performance measurement.
The review-stage resume is deliberately noindex and the final application CVs
are not published. No source package may independently approve those facts.

## Automated quality gates

- `node --test tests/portfolio-quality.test.mjs` — content integrity,
  project evidence, route semantics, and resume publication boundary.
- `npx tsc --noEmit` — TypeScript type checking.
- ESLint on migrated TypeScript and JSX files — issues in changed code.
- `npm run build` — optimized production build, including generated route output.
- `git diff --check` and exact changed-path/hash validation.
- GitHub Actions workflow is prepared but has **not run remotely** until an
  owner-approved push occurs. It is not evidence of current GitHub CI success.

## Mandatory manual browser checks before any commit or release

Use a production build served locally or a deliberately approved preview,
not an unexamined dev-server screenshot. Inspect `/`, `/case-studies`, both
flagship routes, `/resume`, `/redesign` (redirect), both retired preview
routes (`/atelier-preview` and `/spatial-preview`, expected HTTP 404),
and an unknown path (404). Do not declare a check passed
until its actual outcome is recorded.

| Area | Exact acceptance criterion |
| --- | --- |
| Viewports | 320, 360/390, 768, 1024 and 1440 CSS px: no clipped text, overlays or unexpected horizontal overflow |
| Keyboard | Skip link, all navigation, mobile disclosure, Escape restoration, focus indicators and browser Back work |
| Pointer | Native cursor remains usable, project hover is supplemental, no lost selection/clicks |
| Touch | Decorative cursor absent; controls operable with visible tap feedback |
| Motion | `prefers-reduced-motion: reduce` hides cursor/reveals and preserves all content |
| Zoom | 200% and 400% browser zoom retain reading order and functional navigation |
| Accessibility | axe checks plus manual screen-reader landmarks, headings, images, contrast, 44px preferred touch targets |
| Media | Aurelia illustrations explicitly synthetic; CommerceOps sample media not misrepresented as public SaaS |
| CV | No unapproved download CTA, no sensitive personal details, career dates awaiting owner approval |
| SEO | Canonicals and OG cards accurate; sitemap lists canonical public work only; draft routes noindex |
| Performance | Measured Lighthouse mobile/desktop with recorded environment and Core Web Vitals where field data exists |
| Links | All internal/outbound/contact links manually checked, including redirect and 404 actions |

## Hard release blockers

1. Owner has **not** approved final dates, roles, education, training,
   client publication permissions, and public contact fields.
2. ATS PDF, branded PDF, and DOCX remain review drafts, not deployable files.
3. Manual responsive/accessibility/link/performance checks are pending.
4. The legacy unverified `public/Ervin_Osmani.pdf` must remain absent from the
   local release candidate after the scoped retirement fix. Verify HTTP 404 in
   local production mode; the *deployed* URL can only change after an approved
   release. Final CV documents remain unpublished until factual approval.
5. There are no local chapter commits yet. Do not push, fast-forward, merge,
   or claim Vercel success without completed checks and explicit approval.

## Final release verification

Record the exact SHA of the eventual source commit, relevant workflow run ID,
GitHub status, both Vercel project deployments, HTTP headers and download
behavior, desktop and mobile screenshot evidence, link audit, and rollback plan.
