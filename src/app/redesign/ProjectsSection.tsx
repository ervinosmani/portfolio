
import Link from "next/link";
import ProjectMedia from "./ProjectMedia";
import styles from "./redesign.module.css";

type Project = {
  id: "blogging" | "jobfinder" | "python" | "confora";
  number: string;
  eyebrow: string;
  name: string;
  description: string;
  focus: string;
  stack: string[];
  notes: string[];
  caseStudy: string | null;
  source: string | null;
  live: string | null;
};

const projects: Project[] = [
  {
    id: "blogging",
    number: "01",
    eyebrow: "LARAVEL / REST API",
    name: "Blogging Platform",
    description:
      "A publishing API for managing accounts, articles, categories and reader interactions.",
    focus:
      "Laravel controllers, Sanctum authentication and database-backed content workflows.",
    stack: ["Laravel", "PHP", "Sanctum", "REST API"],
    notes: [
      "The public repository includes routes and controllers for posts, comments, categories, publishing and likes.",
      "Production use would require authorization tests and deployment hardening. The visual is an editorial illustration, not a running UI.",
    ],
    caseStudy: "/case-studies#blogging-platform",
    source: "https://github.com/ervinosmani/blogging-platform",
    live: null,
  },
  {
    id: "jobfinder",
    number: "02",
    eyebrow: "VUE / JOB DISCOVERY",
    name: "Vue Job Finder",
    description:
      "A job browsing application with reactive search, filters, job details and saved listings.",
    focus:
      "Vue 3 and TypeScript, Pinia state, Firebase Authentication and a sample jobs API.",
    stack: ["Vue 3", "TypeScript", "Pinia", "Firebase"],
    notes: [
      "Search, filters and pagination make listings easier to explore, with routing to individual job views.",
      "The screenshot comes from the project interface. Saved jobs use browser storage; listings come from a separate JSON Server API.",
    ],
    caseStudy: "/case-studies#vue-job-finder",
    source: "https://github.com/ervinosmani/vue-job-finder",
    live: null,
  },
  {
    id: "python",
    number: "03",
    eyebrow: "PYTHON / PRIVATE WORK",
    name: "Python Automation",
    description:
      "Private Python scripting and workflow experiments focused on repetitive tasks and practical process improvement.",
    focus:
      "Organizing steps, handling inputs and reviewing results in repeatable workflows.",
    stack: ["Python", "Scripting", "Automation"],
    notes: [
      "Work in this area includes private experiments rather than a published software product.",
      "Source code, internal workflow details and business outcomes are intentionally not disclosed.",
    ],
    caseStudy: null,
    source: null,
    live: null,
  },
  {
    id: "confora",
    number: "04",
    eyebrow: "MULTILINGUAL / TRANSPORT WEBSITE",
    name: "Confora Transport",
    description:
      "A public website preview presenting transport and logistics services for a Swiss and European audience.",
    focus:
      "Service discovery, multilingual navigation and a clear path from company information to contact.",
    stack: ["Web Experience", "EN / DE / FR / IT", "Logistics"],
    notes: [
      "The preview presents services, the European network, company information and contact options in four languages.",
      "The website imagery is illustrative; fleet specifications and some operational details are still awaiting verification.",
    ],
    caseStudy: "/case-studies#confora",
    source: null,
    live: "https://confora.netlify.app/en",
  },
];

function ConceptVisual({
  kind,
}: {
  kind: "blogging" | "python";
}) {
  if (kind === "blogging") {
    return (
      <div className={styles.editorMock} aria-hidden="true">
        <div>
          <strong>folio.</strong>
          <span>Overview</span>
          <span>Articles</span>
          <span>Categories</span>
        </div>

        <div>
          <small>CONTENT STUDIO</small>
          <h4>Your content, organized.</h4>

          <section>
            <span>Articles</span>
            <span>Categories</span>
          </section>

          <p />
          <p />
          <p />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pythonMock} aria-hidden="true">
      <span>WORKFLOW / PRIVATE</span>

      <div>
        <b>INPUT</b>
        <i>→</i>
        <b>PYTHON</b>
        <i>→</i>
        <b>OUTPUT</b>
      </div>

      <small>
        repeatable / structured / reviewed
      </small>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-heading"
    >
      <div className={styles.sectionIntro}>
        <div>
          <p className={styles.sectionLabel}>
            01 — THE WORK
          </p>

          <h2 id="projects-heading">
            Selected work<span>.</span>
          </h2>
        </div>

        <p>
          Real projects. Clear thinking.
          <br />
          <strong>
            A closer look at the work behind the interface.
          </strong>
        </p>
      </div>

      <div className={styles.workList}>
        {projects.map((project) => (
          <article
            key={project.id}
            className={`${styles.project} ${
              project.number === "01"
                ? ""
                : styles[`project${project.number}`]
            }`}
            aria-labelledby={`project-${project.id}`}
          >
            <div className={styles.projectVisual}>
              <div className={styles.visualTop}>
                <span>{project.eyebrow}</span>
                <span>WORK / {project.number}</span>
              </div>

              {project.id === "blogging" && (
                <ConceptVisual kind="blogging" />
              )}

              {project.id === "python" && (
                <ConceptVisual kind="python" />
              )}

              {project.id === "jobfinder" && (
                <ProjectMedia kind="jobfinder" />
              )}

              {project.id === "confora" && (
                <ProjectMedia kind="confora" />
              )}

              {(project.id === "blogging" ||
                project.id === "python") && (
                <p className={styles.visualNote}>
                  {project.id === "blogging"
                    ? "Editorial illustration · Not a product screenshot"
                    : "Conceptual workflow · Private work"}
                </p>
              )}
            </div>

            <div className={styles.projectInfo}>
              <div className={styles.projectNumber}>
                <span>{project.number}</span>
                <span>{project.eyebrow}</span>
              </div>

              <h3 id={`project-${project.id}`}>
                {project.name}
              </h3>

              <p className={styles.projectDescription}>
                {project.description}
              </p>

              <div className={styles.projectFocus}>
                <b>THE WORK</b>
                <p>{project.focus}</p>
              </div>

              <div className={styles.tags}>
                {project.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <details className={styles.notes}>
                <summary>
                  Explore engineering notes
                  <span aria-hidden="true">+</span>
                </summary>

                <div>
                  {project.notes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
              </details>

              <div className={styles.projectLinks}>
                {project.caseStudy && (
                  <Link href={project.caseStudy}>
                    Read case study ↗
                  </Link>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live preview ↗
                  </a>
                )}

                {project.source && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source code ↗
                  </a>
                )}

                {!project.caseStudy &&
                  !project.live &&
                  !project.source && (
                    <span>
                      Private work · No public repository
                    </span>
                  )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <a
        className={styles.githubMore}
        href="https://github.com/ervinosmani?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>MORE BEHIND THE SCENES</span>

        <strong>
          Explore additional projects on GitHub
        </strong>

        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
