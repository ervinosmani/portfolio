import type { Metadata } from "next";
import Link from "next/link";
import AureliaInterfaceIllustration from "../../components/AureliaInterfaceIllustration";
import StudioHeader from "../../editorial/StudioHeader";
import StudioFooter from "../../editorial/StudioFooter";
import styles from "./aurelia.module.css";

const canonical = "https://ervinosmani.vercel.app/case-studies/aurelia";

export const metadata: Metadata = {
  title: "Aurelia — Personal Finance Product & Engineering | Ervin Osmani",
  description:
    "An independently developed personal finance application. Explore the product experience, financial correctness, privacy boundaries and real engineering decisions behind Aurelia.",
  alternates: { canonical },
  openGraph: {
    title: "Aurelia — Personal Finance Product & Engineering",
    description:
      "An in-depth case study on building a private financial workspace with accurate transactions, clear interfaces and owner-scoped data.",
    url: canonical,
    type: "article",
  },
  robots: { index: true, follow: true },
};

const experiences = [
  {
    number: "01",
    eyebrow: "THE DAILY PICTURE",
    title: "Understand where you stand.",
    body: "A focused overview brings account balances, income, spending and the next useful action into one place — without asking the user to decode a dashboard.",
    detail: "Overview · account balances · financial context",
  },
  {
    number: "02",
    eyebrow: "FINANCIAL ACTIVITY",
    title: "Record money as it really moves.",
    body: "Income, expenses and transfers have different meanings. The activity journal makes those differences visible, with a correction flow that preserves history.",
    detail: "Transactions · transfers · corrections",
  },
  {
    number: "03",
    eyebrow: "PLANNING",
    title: "Connect plans with reality.",
    body: "Budgets, savings goals and insights belong alongside actual activity, so planning stays connected to the records behind it.",
    detail: "Budgets · goals · analytics",
  },
];

const principles = [
  {
    id: "01", title: "Treat money precisely.",
    body: "Authoritative amounts are represented as integer minor units with explicit currency rules. Balances and reports do not rely on floating-point JavaScript calculations.",
    note: "Correctness over convenient arithmetic",
  },
  {
    id: "02", title: "Preserve the financial story.",
    body: "Corrections are recorded through reversal and replacement rather than silently overwriting the meaning of an earlier transaction.",
    note: "Auditability over hidden edits",
  },
  {
    id: "03", title: "Design around ownership.",
    body: "Authenticated server-side checks and PostgreSQL Row Level Security enforce boundaries between individual accounts, including during protected data exports.",
    note: "Authorization beyond sign-in",
  },
];

function TransferExample() {
  return (
    <div className={styles.transferExample} role="group" aria-label="Illustrative transfer of 240 euros from a savings account to a current account, showing zero new income">
      <div className={styles.transferTop}><span>EXAMPLE / ACCOUNT TRANSFER</span><span>EUR · SYNTHETIC</span></div>
      <div className={styles.transferMovement}>
        <div><small>FROM / SAVINGS</small><strong>−€240.00</strong></div>
        <span className={styles.transferArrow} aria-hidden="true">→</span>
        <div><small>TO / CURRENT</small><strong>+€240.00</strong></div>
      </div>
      <div className={styles.transferResult}><span>NET NEW INCOME</span><strong>€0.00</strong></div>
      <p>Moving money between your own accounts must not inflate income or spending totals.</p>
    </div>
  );
}

export default function AureliaCaseStudyPage() {
  return (
    <div className={styles.page} id="top">
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <StudioHeader />
      <nav className={styles.contextNav} aria-label="Aurelia case study sections">
        <div className={styles.contextInner}>
          <span className={styles.contextLabel}>AURELIA / CASE STUDY</span>
          <div className={styles.contextLinks}>
            <a href="#product">Product</a>
            <a href="#engineering">Engineering</a>
            <a href="#review">Review</a>
          </div>
          <Link href="/case-studies" className={styles.contextBack}>All work ↗</Link>
        </div>
      </nav>
      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="aurelia-title">
          <div className={styles.container}>
            <div className={styles.heroTop}><span>INDEPENDENT PROJECT / 2026</span><span>FULL-STACK PRODUCT ENGINEERING</span></div>
            <div className={styles.heroHeading}>
              <div>
                <div className={styles.brand}>aurelia<span>.</span></div>
                <h1 id="aurelia-title">A clearer relationship <em>with money.</em></h1>
              </div>
              <div className={styles.heroIntro}>
                <span>THE PROJECT</span>
                <p>A personal finance workspace designed to make everyday decisions easier — and engineered to keep financial records consistent and private.</p>
                <div className={styles.heroLinks}><a href="#product">Explore the case study <span aria-hidden="true">↓</span></a><a href="https://github.com/ervinosmani/aurelia-finance-showcase" target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub (opens in a new tab)">View source on GitHub <span aria-hidden="true">↗</span></a></div>
              </div>
            </div>
            <div className={styles.heroBottom}><span>PRODUCT DESIGN</span><span>FINANCIAL DOMAIN LOGIC</span><span>PRIVACY & OWNERSHIP</span></div>
            <figure className={styles.interfaceFigure}>
              <AureliaInterfaceIllustration />
              <figcaption>Interface reconstruction based on the local Aurelia design. All figures and accounts are synthetic examples; this is not a screenshot of private records.</figcaption>
            </figure>
          </div>
        </section>

        <section id="product" className={styles.product} aria-labelledby="product-title">
          <div className={styles.container}>
            <div className={styles.sectionIntro}><span>01 / THE PRODUCT</span><h2 id="product-title">The interface should make sense <em>before the numbers do.</em></h2></div>
            <div className={styles.contextGrid}>
              <div><span className={styles.miniLabel}>THE CHALLENGE</span><p>Personal finance is full of small decisions. The software has to simplify them without disguising how balances and transactions are calculated.</p></div>
              <div><span className={styles.miniLabel}>THE RESPONSE</span><p>Aurelia connects accounts, activity, spending plans and goals through a consistent private workspace, with the most useful information given priority.</p></div>
            </div>
            <div className={styles.experienceList}>
              {experiences.map((item) => (
                <article className={styles.experienceRow} key={item.number}>
                  <span className={styles.rowNumber}>{item.number}</span>
                  <div><span className={styles.miniLabel}>{item.eyebrow}</span><h3>{item.title}</h3></div>
                  <div><p>{item.body}</p><small>{item.detail}</small></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="engineering" className={styles.engineering} aria-labelledby="engineering-title">
          <div className={styles.container}>
            <div className={styles.sectionIntro}><span>02 / THE ENGINEERING</span><h2 id="engineering-title">A financial interface is only as good as <em>the rules beneath it.</em></h2></div>
            <div className={styles.engineeringGrid}>
              <div className={styles.rules}>
                {principles.map((item) => (
                  <article className={styles.rule} key={item.id}>
                    <span className={styles.ruleNumber}>{item.id}</span>
                    <div><h3>{item.title}</h3><p>{item.body}</p><small>{item.note}</small></div>
                  </article>
                ))}
              </div>
              <TransferExample />
            </div>
          </div>
        </section>

        <section className={styles.architectureSection} aria-labelledby="architecture-title">
          <div className={styles.container}>
            <div className={styles.archHead}><span>03 / ARCHITECTURE</span><h2 id="architecture-title">Purposeful layers. <em>Clear responsibilities.</em></h2></div>
            <div className={styles.architecture} role="group" aria-label="Architecture from React interface to Next.js server and domain rules, to Supabase Authentication and PostgreSQL Row Level Security">
              <div><span>01 / EXPERIENCE</span><h3>React + Next.js</h3><p>Responsive UI, navigation and accessible interaction.</p></div>
              <div><span>02 / APPLICATION</span><h3>TypeScript domain logic</h3><p>Validated workflows, financial invariants and authenticated server operations.</p></div>
              <div><span>03 / DATA & IDENTITY</span><h3>Supabase + PostgreSQL</h3><p>Authentication, ownership checks and database-level RLS.</p></div>
            </div>
            <div className={styles.portability}><b>DATA OWNERSHIP</b><p>Authenticated JSON and CSV exports use owner filters and consistency checks. Two matching reads reduce inconsistent exports, but are not an atomic database snapshot.</p></div>
          </div>
        </section>

        <section id="review" className={styles.review} aria-labelledby="review-title">
          <div className={styles.container}>
            <div className={styles.reviewHeader}><div><span>04 / ENGINEERING REVIEW</span><h2 id="review-title">Verified with evidence. <em>Presented with context.</em></h2></div><p>Testing matters because it catches the kinds of mistakes that a polished interface cannot reveal.</p></div>
            <div className={styles.reviewGrid}>
              <article><span>FINANCIAL CORRECTNESS</span><h3>Protect the calculations.</h3><p>Unit tests cover monetary representation, transfers, transaction corrections and export behavior.</p></article>
              <article><span>ISOLATION & ACCESS</span><h3>Verify user boundaries.</h3><p>Browser checks use separate development accounts to test owner-scoped downloads and reject anonymous access.</p></article>
              <article><span>RECOVERY</span><h3>Test the return path.</h3><p>A synthetic PostgreSQL backup was restored to a separate local database, with financial records and RLS checked afterward.</p></article>
            </div>
            <p className={styles.evidenceFinePrint}>Locally recorded evidence: 168 passing Vitest tests and 14 passing Playwright checks at the V2.8 milestone (21 November 2026), plus TypeScript, ESLint and production build checks. These are internal engineering checks, not an independent audit or production availability claim.</p>
            <div className={styles.currentStatus}><span>THE CURRENT BOUNDARY</span><p>Aurelia remains a private application. A curated source snapshot is publicly available for engineering review, without personal financial records or the original private Git history. It is not a hosted financial service, public demo or banking product. The isolated recovery rehearsal did not cover complete provider-managed Supabase Auth restoration, and hosted release checks have not been completed.</p></div>
          </div>
        </section>
      </main>
      <StudioFooter />
    </div>
  );
}
