import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StudioHeader from "../../editorial/StudioHeader";
import StudioFooter from "../../editorial/StudioFooter";
import styles from "./commerceops.module.css";

const baseUrl = "https://ervinosmani.vercel.app";

export const metadata: Metadata = {
  title: "CommerceOps — Engineering Case Study | Ervin Osmani",
  description:
    "An engineering case study of a locally demonstrated multi-tenant B2B inventory and order management MVP, focusing on transactional stock reservations and tenant authorization.",
  alternates: { canonical: `${baseUrl}/case-studies/commerceops` },
  openGraph: {
    title: "CommerceOps — Engineering Case Study",
    description: "Multi-tenant inventory and order workflows built with Java, Spring Boot, PostgreSQL and React.",
    url: `${baseUrl}/case-studies/commerceops`,
    type: "article",
  },
};

const shots = [
  {
    file: "01-product-catalog.png",
    title: "Product catalog",
    caption: "SKU-based product records, status management and administration controls.",
    alt: "CommerceOps product catalog showing sample SKUs, product states and an administrative form",
  },
  {
    file: "02-warehouse-operations.png",
    title: "Warehouse and inventory operations",
    caption: "Multiple warehouses, stock receipts and adjustments with business references.",
    alt: "CommerceOps warehouse selector and stock operation forms in the administration workspace",
  },
  {
    file: "03-order-management.png",
    title: "Order lifecycle",
    caption: "Draft creation, confirmation, cancellation and fulfillment workflows.",
    alt: "CommerceOps sample orders with draft, cancelled and fulfilled states alongside an order form",
  },
  {
    file: "04-operational-reporting.png",
    title: "Operational reporting",
    caption: "Organization-scoped inventory and order summaries derived from recorded activity.",
    alt: "CommerceOps operational reporting showing stock and order summary information",
  },
  {
    file: "05-audit-timeline.png",
    title: "Activity timeline",
    caption: "Recorded stock movements and order transitions, not a complete change audit.",
    alt: "CommerceOps activity timeline listing recorded order transitions and inventory operations",
  },
];

const designDecisions = [
  {
    number: "01",
    title: "A modular monolith over distributed services",
    body: "A Java/Spring Boot backend groups business responsibilities without introducing premature microservice coordination. React and TypeScript provide a separately built web application.",
  },
  {
    number: "02",
    title: "Stock is a transactional invariant",
    body: "Order confirmation reserves available stock. Cancellation releases active reservations; fulfillment consumes reserved stock. Database transactions and concurrency tests guard against overselling and inconsistent transitions.",
  },
  {
    number: "03",
    title: "Authorization lives on the server",
    body: "Permissions are evaluated against active organization membership. ADMIN mutation controls are visible only where authorized, while VIEWER has a read-only workspace. API tests verify forbidden write attempts remain rejected.",
  },
  {
    number: "04",
    title: "Operational changes leave evidence",
    body: "Inventory movements, order transitions and business references support traceability and idempotent processing. Reporting remains read-only and the activity timeline is explicitly scoped, not presented as a complete audit of every field change.",
  },
];

export default function CommerceOpsCaseStudyPage() {
  return (
    <div className={styles.site} id="top">
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <StudioHeader />
      <nav className={styles.contextNav} aria-label="CommerceOps case study sections">
        <div className={styles.contextInner}>
          <span className={styles.contextLabel}>COMMERCEOPS / CASE STUDY</span>
          <div className={styles.contextLinks}>
            <a href="#architecture">Architecture</a>
            <a href="#product">Product</a>
            <a href="#evidence">Evidence</a>
          </div>
          <Link href="/case-studies" className={styles.contextBack}>All work ↗</Link>
        </div>
      </nav>
      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="commerceops-title">
          <div className={styles.shell}>
            <p className={styles.kicker}>01 / FEATURED ENGINEERING PROJECT · 2026</p>
            <h1 id="commerceops-title">COMMERCE<span>OPS.</span></h1>
            <p className={styles.lead}>Inventory integrity, built into the workflow.</p>
            <p className={styles.intro}>A multi-tenant B2B inventory, warehouse and order management platform. Designed as a locally demonstrated engineering MVP around transactional consistency, organization-level permissions and auditable operations.</p>
            <div className={styles.heroLinks}>
              <a href="#product" className={styles.primaryLink}>Explore the product ↓</a>
              <Link href="/case-studies" className={styles.secondaryLink}>Back to selected work ↗</Link>
            </div>
            <div className={styles.tags} aria-label="Technology stack">
              {['Java 25', 'Spring Boot 4', 'PostgreSQL 18', 'React', 'TypeScript', 'Docker', 'Testcontainers'].map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </section>

        <section className={styles.overview} aria-labelledby="problem-heading">
          <div className={styles.shell}>
            <p className={styles.kicker}>THE PROBLEM / OPERATIONS</p>
            <div className={styles.split}>
              <h2 id="problem-heading">Stock cannot be a <em>guess.</em></h2>
              <div>
                <p>Warehouse teams need to know what exists, what is reserved, and what can still be sold. Orders and stock movements must remain consistent even when operations arrive twice or happen concurrently.</p>
                <p>CommerceOps models the product, warehouse, inventory and order lifecycle in one organization-scoped system, with explicit permissions and a record of operational events.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="architecture" className={styles.architectureSection} aria-labelledby="architecture-heading">
          <div className={styles.shell}>
            <p className={styles.kicker}>SYSTEM DESIGN / MODULAR MONOLITH</p>
            <h2 id="architecture-heading">One backend. Clear boundaries.</h2>
            <p className={styles.sectionIntro}>The web and API build independently. The backend owns authorization and transactional business rules; PostgreSQL stores tenant-scoped operational data.</p>
            <div className={styles.diagram} role="img" aria-label="React and TypeScript web application communicates over HTTP with a Spring Boot modular monolith, which persists data in PostgreSQL; GitHub Actions runs automated checks">
              <div className={styles.diagramNode}><small>CLIENT</small><strong>React / TypeScript</strong><span>Web workspace</span></div>
              <span className={styles.diagramArrow} aria-hidden="true">→</span>
              <div className={`${styles.diagramNode} ${styles.diagramPrimary}`}><small>APPLICATION</small><strong>Spring Boot</strong><span>Catalog · Inventory · Orders · Security</span></div>
              <span className={styles.diagramArrow} aria-hidden="true">→</span>
              <div className={styles.diagramNode}><small>DATA</small><strong>PostgreSQL</strong><span>Transactions · Flyway migrations</span></div>
            </div>
            <p className={styles.diagramNote}>Supporting engineering: Docker Compose · JUnit / Testcontainers · Vitest · GitHub Actions. Conceptual architecture diagram, not a deployment topology.</p>
            <div className={styles.decisionGrid}>
              {designDecisions.map(item => (
                <article key={item.number}>
                  <span>{item.number} / DECISION</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="product" className={styles.product} aria-labelledby="product-heading">
          <div className={styles.shell}>
            <p className={styles.kicker}>REAL APPLICATION / LOCAL MVP</p>
            <h2 id="product-heading">The product, in practice.</h2>
            <p className={styles.sectionIntro}>These are real, privacy-reviewed screenshots of the local administrative application, not mockups or a public hosted demo. Sample records are used throughout.</p>
            <div className={styles.gallery}>
              {shots.map((shot, index) => (
                <figure key={shot.file} className={styles.shot}>
                  <div className={styles.shotHeading}><h3><span>{String(index + 1).padStart(2, '0')} /</span> {shot.title}</h3><p>{shot.caption}</p></div>
                  <a href={`/projects/commerceops/${shot.file}`} target="_blank" rel="noopener noreferrer" aria-label={`View full screenshot: ${shot.title} (opens in a new tab)`}>
                    <Image src={`/projects/commerceops/${shot.file}`} alt={shot.alt} width={1400} height={750} sizes="(max-width: 768px) 100vw, 1100px" />
                    <span className={styles.openImage}>View full screenshot ↗</span>
                  </a>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="evidence" className={styles.evidence} aria-labelledby="evidence-heading">
          <div className={styles.shell}>
            <p className={styles.kicker}>TESTED / REVIEWED / DOCUMENTED</p>
            <h2 id="evidence-heading">Engineering evidence.</h2>
            <div className={styles.metrics}>
              <div><strong>251</strong><span>Backend tests in the earlier full local suite</span></div>
              <div><strong>30</strong><span>Frontend tests passed in final CI</span></div>
              <div><strong>3</strong><span>Successful CI workflows on main</span></div>
            </div>
            <div className={styles.evidenceGrid}>
              <article><h3>Authorization and tenant isolation</h3><p>Role-aware workspace behavior was checked with ADMIN and VIEWER accounts. A focused PostgreSQL-backed integration test passed 13/13 checks, including rejected attempts to edit or archive a product.</p></article>
              <article><h3>Database recovery rehearsal</h3><p>A local PostgreSQL backup was restored into a disposable isolated container and checked against recorded tables, Flyway migrations and demo counts. This is not a production recovery drill.</p></article>
              <article><h3>Continuous integration</h3><p>The final GitHub Actions run completed successfully with Java 25 / PostgreSQL Testcontainers and Node 24 lint, tests and build. The repository and its CI evidence were private at the time of documentation.</p></article>
            </div>
            <div className={styles.caveat}>
              <strong>Release boundary</strong>
              <p>This is a locally demonstrated engineering MVP, not a production-ready or publicly deployed SaaS. Public hosting, full onboarding, target-environment recovery drills and representative performance testing remain outside the verified scope.</p>
            </div>
          </div>
        </section>
      </main>
      <StudioFooter />
    </div>
  );
}
