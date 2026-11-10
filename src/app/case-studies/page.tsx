
import type { Metadata } from "next";
import Link from "next/link";
import ProjectMedia from "../redesign/ProjectMedia";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
  title: "Engineering Case Studies | Ervin Osmani",
  description:
    "Explore the technical decisions, implementations and workflows behind selected web development projects by Ervin Osmani.",
  alternates: {
    canonical: "https://ervinosmani.vercel.app/case-studies",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Engineering Case Studies | Ervin Osmani",
    description:
      "Explore the implementation and technical decisions behind selected web development projects.",
    url: "https://ervinosmani.vercel.app/case-studies",
    type: "website",
  },
};

type Note = {
  number: string;
  label: string;
  title: string;
  body: string;
};

type Study = {
  id: string;
  number: string;
  category: string;
  title: string;
  accent: string;
  description: string;
  tags: string[];
  visual: "blog" | "job" | "confora";
  notes: Note[];
  links: {
    label: string;
    href: string;
  }[];
  evidence: string;
};

const studies: Study[] = [
  {
    id: "blogging-platform",
    number: "01",
    category: "BACKEND / CONTENT MANAGEMENT",
    title: "BLOGGING",
    accent: "PLATFORM.",
    description:
      "A Laravel API for publishing workflows, content management and reader interactions.",
    tags: [
      "Laravel",
      "PHP",
      "Sanctum",
      "REST API",
      "Database models",
    ],
    visual: "blog",
    notes: [
      {
        number: "01",
        label: "THE PROBLEM",
        title: "Content needs structure.",
        body:
          "A publishing application needs consistent ways to manage posts, categories, drafts and published content. The project organizes these responsibilities through a Laravel backend.",
      },
      {
        number: "02",
        label: "IMPLEMENTATION",
        title: "Routes with clear purposes.",
        body:
          "The API includes endpoints for authentication, posts, categories, comments, likes and publishing. Laravel Sanctum protects selected authenticated routes.",
      },
      {
        number: "03",
        label: "DATA FLOW",
        title: "Controllers and models.",
        body:
          "Requests pass through Laravel routes and controllers to Eloquent models. The backend handles content states, searching and paginated results.",
      },
      {
        number: "04",
        label: "ENGINEERING REVIEW",
        title: "Security beyond login.",
        body:
          "Before production use, resource authorization, administrative endpoints, tests and deployment settings require review. Authentication alone does not enforce ownership permissions.",
      },
    ],
    links: [
      {
        label: "View repository",
        href:
          "https://github.com/ervinosmani/blogging-platform",
      },
      {
        label: "Explore API routes",
        href:
          "https://github.com/ervinosmani/blogging-platform/blob/main/routes/api.php",
      },
    ],
    evidence:
      "The repository contains the backend implementation. The architecture graphic is an illustration, not a screenshot of a running administration panel.",
  },
  {
    id: "vue-job-finder",
    number: "02",
    category: "FRONTEND / JOB DISCOVERY",
    title: "VUE JOB",
    accent: "FINDER.",
    description:
      "A Vue application for browsing opportunities with search, filters, job details and saved listings.",
    tags: [
      "Vue 3",
      "TypeScript",
      "Pinia",
      "Firebase Auth",
      "Axios",
    ],
    visual: "job",
    notes: [
      {
        number: "01",
        label: "USER EXPERIENCE",
        title: "Finding relevant listings.",
        body:
          "The application supports job discovery through title search and filters for attributes such as category, experience and location.",
      },
      {
        number: "02",
        label: "FRONTEND LOGIC",
        title: "Reactive results.",
        body:
          "Vue computed state supports matching results and pagination. Vue Router manages navigation, while Pinia organizes shared application state.",
      },
      {
        number: "03",
        label: "ACCOUNT FLOW",
        title: "Sign-in and saved jobs.",
        body:
          "Firebase Authentication handles account access. Saved listings are stored in the browser using localStorage rather than synchronized across devices.",
      },
      {
        number: "04",
        label: "DATA SOURCE",
        title: "A separate sample API.",
        body:
          "Axios retrieves job information from a separate JSON Server-based API. This is a portfolio project, not an active recruitment platform.",
      },
    ],
    links: [
      {
        label: "Frontend repository",
        href:
          "https://github.com/ervinosmani/vue-job-finder",
      },
      {
        label: "Sample jobs API",
        href:
          "https://github.com/ervinosmani/vue-job-api",
      },
    ],
    evidence:
      "The project image shows the Vue Job Finder interface when the local screenshot is available. The repositories provide access to the actual implementation.",
  },
  {
    id: "confora",
    number: "03",
    category: "MULTILINGUAL / BUSINESS WEBSITE",
    title: "CONFORA",
    accent: "TRANSPORT.",
    description:
      "A multilingual website preview presenting transport and logistics services for a Swiss and European audience.",
    tags: [
      "Multilingual UX",
      "Transport & logistics",
      "Service discovery",
    ],
    visual: "confora",
    notes: [
      {
        number: "01",
        label: "PURPOSE",
        title: "Clear service discovery.",
        body:
          "The website introduces the company and organizes information about transport services, the European network and contact options.",
      },
      {
        number: "02",
        label: "INFORMATION DESIGN",
        title: "A useful visitor journey.",
        body:
          "Visitors can explore the service offering, learn about the company and move toward the appropriate contact information.",
      },
      {
        number: "03",
        label: "LANGUAGES",
        title: "Designed for multiple markets.",
        body:
          "The public preview includes English, German, French and Italian language versions to support a wider audience.",
      },
      {
        number: "04",
        label: "CURRENT SCOPE",
        title: "A website preview.",
        body:
          "The linked website is a public preview. Some operational details still require verification, and shipment tracking or backend logistics integrations are not presented as implemented.",
      },
    ],
    links: [
      {
        label: "Website preview",
        href: "https://confora.netlify.app/en",
      },
      {
        label: "German version",
        href: "https://confora.netlify.app/de",
      },
    ],
    evidence:
      "The visual is artwork published on the Confora website, not an independently verified photograph of company vehicles. The links lead to the public website preview.",
  },
];

// Technical illustration for the backend-only project.
function BackendVisual() {
  return (
    <div
      className={`${styles.visual} ${styles.blogVisual}`}
      role="img"
      aria-label="Conceptual architecture diagram showing a web interface, Laravel API and database models"
    >
      <span className={styles.visualCaption}>
        SYSTEM / ARCHITECTURE VIEW
      </span>

      <div className={styles.architecture}>
        <div>
          <small>01 / CLIENT</small>
          <strong>WEB UI</strong>
          <span>Requests</span>
        </div>

        <b aria-hidden="true">→</b>

        <div className={styles.primaryNode}>
          <small>02 / SERVER</small>
          <strong>LARAVEL API</strong>
          <span>Routes · Controllers</span>
        </div>

        <b aria-hidden="true">→</b>

        <div>
          <small>03 / DATA</small>
          <strong>MODELS</strong>
          <span>Persistent records</span>
        </div>
      </div>

      <span className={styles.visualFooter}>
        ARCHITECTURE ILLUSTRATION · NOT A PRODUCT SCREENSHOT
      </span>
    </div>
  );
}

// Reuse the same real image components as the homepage.
function StudyVisual({
  kind,
}: {
  kind: Study["visual"];
}) {
  if (kind === "blog") {
    return <BackendVisual />;
  }

  if (kind === "job") {
    return (
      <div
        className={`${styles.visual} ${styles.jobVisual}`}
      >
        <span className={styles.visualCaption}>
          VUE JOB FINDER / PROJECT INTERFACE
        </span>

        <ProjectMedia kind="jobfinder" />

        <span className={styles.visualFooter}>
          PROJECT SCREENSHOT · VUE 3 / TYPESCRIPT
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${styles.visual} ${styles.transportVisual}`}
    >
      <span className={styles.visualCaption}>
        CONFORA / WEBSITE VISUAL
      </span>

      <ProjectMedia kind="confora" />

      <span className={styles.visualFooter}>
        WEBSITE ARTWORK · LIVE PREVIEW LINKED BELOW
      </span>
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <div className={styles.site} id="top">
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link
            className={styles.identity}
            href="/"
            aria-label="Return to Ervin Osmani's portfolio"
          >
            <span className={styles.identityMark}>
              eo<span>↗</span>
            </span>

            <span>
              Ervin Osmani
              <small>Software Developer</small>
            </span>
          </Link>

          <nav
            className={styles.navigation}
            aria-label="Case studies navigation"
          >
            <a href="#blogging-platform">
              Blogging
            </a>

            <a href="#vue-job-finder">
              Job Finder
            </a>

            <a href="#confora">
              Confora
            </a>
          </nav>

          <Link
            className={styles.backButton}
            href="/#projects"
          >
            Back to portfolio ↗
          </Link>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* INTRO */}
        <section
          className={styles.hero}
          aria-labelledby="page-title"
        >
          <p className={styles.eyebrow}>
            ENGINEERING / SELECTED WORK / 2026
          </p>

          <div className={styles.heroInner}>
            <div>
              <h1 id="page-title">
                BEYOND
                <br />
                THE <em>UI.</em>
              </h1>

              <p>
                A closer look at the work behind
                the interface — the problem,
                the implementation and the decisions
                that shape each project.
              </p>
            </div>

            <div
              className={styles.stamp}
              aria-hidden="true"
            >
              <small>THE WORK</small>
              <strong>03</strong>
              <span>PROJECT CASE STUDIES</span>
              <b>↗</b>
            </div>
          </div>

          <div className={styles.heroBottom}>
            <span>
              BUILT. EXPLAINED. REVIEWED.
            </span>

            <a href="#blogging-platform">
              Explore the cases ↓
            </a>
          </div>
        </section>

        {/* CASE STUDIES */}
        {studies.map((study) => (
          <section
            key={study.id}
            id={study.id}
            className={`${styles.study} ${
              study.visual === "job"
                ? styles.studyJob
                : study.visual === "confora"
                  ? styles.studyConfora
                  : styles.studyBlog
            }`}
            aria-labelledby={`${study.id}-title`}
          >
            <div className={styles.shell}>
              <div className={styles.studyTop}>
                <span>
                  CASE STUDY / {study.number}
                </span>

                <span>
                  {study.category}
                </span>
              </div>

              <div className={styles.studyHeading}>
                <div>
                  <p className={styles.eyebrow}>
                    {study.number} — {study.category}
                  </p>

                  <h2 id={`${study.id}-title`}>
                    {study.title}
                    <br />
                    <em>{study.accent}</em>
                  </h2>
                </div>

                <p>{study.description}</p>
              </div>

              <div className={styles.tags}>
                {study.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <StudyVisual kind={study.visual} />

              {/* TECHNICAL BREAKDOWN */}
              <div className={styles.noteGrid}>
                {study.notes.map((note) => (
                  <article key={note.number}>
                    <span>
                      {note.number} / {note.label}
                    </span>

                    <h3>{note.title}</h3>
                    <p>{note.body}</p>
                  </article>
                ))}
              </div>

              {/* REPOSITORY / WEBSITE */}
              <div className={styles.evidence}>
                <div>
                  <span>GO DEEPER</span>

                  <h3>
                    {study.visual === "confora"
                      ? "Explore the website."
                      : "Explore the implementation."}
                  </h3>

                  <p>{study.evidence}</p>
                </div>

                <div className={styles.evidenceLinks}>
                  {study.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* PRIVATE WORK */}
        <section
          className={styles.privateWork}
          id="private-work"
          aria-labelledby="private-title"
        >
          <div className={styles.shell}>
            <div className={styles.studyTop}>
              <span>ADDITIONAL WORK</span>
              <span>PRIVATE / AUTOMATION</span>
            </div>

            <h2 id="private-title">
              BEYOND
              <br />
              <em>PUBLIC CODE.</em>
            </h2>

            <div className={styles.privateCard}>
              <div
                className={styles.privateDiagram}
                aria-hidden="true"
              >
                <span>INPUT</span>
                <b>→</b>
                <span>PYTHON</span>
                <b>→</b>
                <span>OUTPUT</span>
              </div>

              <div>
                <span>PYTHON / AUTOMATION</span>

                <h3>
                  Private automation work
                </h3>

                <p>
                  Private Python scripting and
                  workflow experiments focused on
                  repeatable tasks and practical
                  process improvements.
                  Source code and internal
                  implementation details are
                  not public.
                </p>

                <strong>
                  PRIVATE WORK · GENERAL OVERVIEW
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          className={styles.contact}
          aria-labelledby="contact-title"
        >
          <div className={styles.shell}>
            <p>HAVE A PROJECT IN MIND?</p>

            <div>
              <h2 id="contact-title">
                LET&apos;S BUILD
                <br />
                <em>SOMETHING USEFUL.</em>
              </h2>

              <a
                href="mailto:ervinosmani3@gmail.com"
                aria-label="Email Ervin Osmani"
              >
                ↗
              </a>
            </div>

            <a
              className={styles.email}
              href="mailto:ervinosmani3@gmail.com"
            >
              ervinosmani3@gmail.com
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.shell}>
          <a
            href="#top"
            aria-label="Back to top"
          >
            EO<span>.</span>
          </a>

          <small>
            © {new Date().getFullYear()} Ervin Osmani
            {" · "}Engineering notes.
          </small>

          <nav aria-label="Footer navigation">
            <Link href="/">
              Portfolio ↗
            </Link>

            <a
              href="https://github.com/ervinosmani"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>

            <a href="#top">
              Back to top ↑
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
