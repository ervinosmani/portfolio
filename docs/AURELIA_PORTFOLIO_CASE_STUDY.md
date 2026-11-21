# Aurelia — Public Engineering Case Study

## Positioning

**Project:** A privately developed, multi-user personal finance application.

**Public presentation:** `https://ervinosmani.vercel.app/case-studies/aurelia` after separate portfolio deployment approval.

**Audience:** Recruiters, engineering managers, software engineers and product reviewers.

**Primary message:** Aurelia combines a carefully designed financial workflow with explicit domain correctness and individual data ownership. It is not a bank, financial adviser, public SaaS or live hosted demo.

## Editorial approach

Present the product in the following order:

1. What problem the interface solves for an individual tracking their finances.
2. How the daily experience connects balances, transactions, planning and context.
3. Why authoritative money values, transfer invariants and correction history matter.
4. Where frontend, server-side domain logic, authentication and PostgreSQL RLS fit.
5. What was verified locally, and what remains outside the verified scope.

Avoid using test counts as decorative hero metrics. The locally observed counts (168 Vitest tests and 14 Playwright checks at V2.8) appear only as supporting evidence in the final review section. There are no public live-demo or source-code buttons for the private Aurelia application.

## Visual integrity and privacy

The prominent interface image is **a React/CSS reconstruction informed by the local Aurelia UI**, not a capture of the live application and not a screenshot. All amounts, account labels and balances in it are invented illustrative examples. This disclosure appears in visible captions and accessibility text.

The page contains no genuine personal balances, transactions, names, e-mail addresses, authentication data, Supabase URLs, session keys, PostgreSQL connection strings or project exports.

A genuine screenshot may replace the reconstruction in a later release **only** when it has been captured from a separate synthetic account, redacted pixel-by-pixel if needed, reviewed at all viewport sizes and explicitly authorized for portfolio publishing. No screenshot is required for this release.

## Grounded engineering evidence

The copy reflects results reported and verified in the Aurelia project through the V2.8 milestone on 21 November 2026:

- Exact integer minor-unit money rules and explicit transfer/correction handling.
- Owner-scoped RLS and authenticated data exports with two-pass consistency checks.
- 168 passing Vitest tests and 14 Playwright browser checks.
- Successful TypeScript, ESLint and optimized Next.js build checks.
- Successful isolated PostgreSQL backup/restore rehearsal using synthetic data and the Aurelia application schema.

Important boundaries:

- No public Aurelia deployment or demo is claimed.
- No full Supabase Auth provider-managed disaster recovery is claimed.
- Two matching export passes do **not** equal an atomic database snapshot.
- Test numbers do not establish independent penetration-testing or production availability.

## Website changes

The existing portfolio homepage and engineering index already contain V1 Aurelia entry points. V2 revises their **reusable feature component** without altering original portfolio project records, GitHub links or the other case studies.

### Modified V1 files

- `src/app/case-studies/aurelia/page.tsx`
- `src/app/case-studies/aurelia/aurelia.module.css`
- `src/app/components/AureliaTeaser.tsx`
- `src/app/components/AureliaTeaser.module.css`
- `scripts/qa/aurelia-portfolio-check.mjs`
- `docs/AURELIA_PORTFOLIO_CASE_STUDY.md`

### New V2 files

- `src/app/components/AureliaInterfaceIllustration.tsx`
- `src/app/components/AureliaInterfaceIllustration.module.css`

The V1 navigation patch, `src/app/sitemap.ts`, and the existing CommerceOps pages remain unchanged.

## Review checklist before a portfolio commit

1. Run `node scripts/qa/aurelia-portfolio-check.mjs .`.
2. Run `npm run build` from the portfolio repository.
3. Inspect `/`, `/case-studies`, and `/case-studies/aurelia` with the Next.js local server.
4. Inspect at 360px, 390px, 768px and 1440px and 200% browser zoom. Ensure there is no horizontal overflow.
5. Test keyboard navigation, focus outlines and reduced-motion settings.
6. Confirm no real personal financial records or misleading live links are visible.
7. Review wording and spelling, and confirm all other project cards remain unchanged.
8. Verify Git diff and stage only the eight approved V2 files, after approval.

**Release boundary:** The package installs locally only. It does not modify the Aurelia financial repository, change environment variables, install dependencies, commit, push, merge or deploy. The user's prior explicit approval remains required for public portfolio deployment.
