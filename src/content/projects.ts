/**
 * This registry records the publication state of portfolio projects.
 * An existing case study is not evidence of public source or a deployed app.
 */
export type PublicationStatus =
  | "curated-public-source"
  | "private-engineering-project"
  | "public-repository"
  | "public-preview";

export type PortfolioProject = {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly summary: string;
  readonly problem: string;
  readonly contribution: string;
  readonly proof: string;
  readonly limitation: string;
  readonly period: string | null;
  readonly technologies: readonly string[];
  readonly status: PublicationStatus;
  readonly statusLabel: string;
  readonly caseStudyUrl: string;
  readonly sourceUrl?: string;
  readonly liveUrl?: string;
  readonly mediaProvenance: "editorial-graphic" | "existing-public-project-media";
};

export const flagshipProjects: readonly PortfolioProject[] = [
  {
    id: "aurelia",
    title: "Aurelia",
    category: "Personal finance / Application correctness",
    summary:
      "A personal finance workspace built around clear daily decisions, accurate money movement and private user records.",
    problem:
      "Financial activity needs consistent meaning across accounts, transfers and corrections.",
    contribution:
      "Application workflows, financial invariants, ownership boundaries and interface engineering.",
    proof:
      "Curated public source includes checks and synthetic PostgreSQL isolation tests.",
    limitation:
      "The full private application is not a public consumer service.",
    period: "2026",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Testing"],
    status: "curated-public-source",
    statusLabel: "Curated public source",
    caseStudyUrl: "/case-studies/aurelia",
    sourceUrl: "https://github.com/ervinosmani/aurelia-finance-showcase",
    mediaProvenance: "editorial-graphic",
  },
  {
    id: "commerceops",
    title: "CommerceOps",
    category: "Operations / Transactional workflows",
    summary:
      "An inventory and order operations engineering project exploring multi-tenant access, stock reservations and warehouse workflows.",
    problem:
      "Concurrent order decisions must not turn inventory availability into guesswork.",
    contribution:
      "Modular application design, tenant-aware boundaries, transactional inventory rules and verification work.",
    proof:
      "A detailed portfolio case study documents architecture and locally demonstrated MVP behavior; source is private.",
    limitation:
      "No public SaaS deployment or public source repository is claimed.",
    period: null,
    technologies: ["Java", "Spring Boot", "PostgreSQL", "React", "TypeScript"],
    status: "private-engineering-project",
    statusLabel: "Private engineering project",
    caseStudyUrl: "/case-studies/commerceops",
    mediaProvenance: "existing-public-project-media",
  },
];

/** Only repository-backed legacy examples are selected until client permission is confirmed. */
export const supportingProjects: readonly PortfolioProject[] = [
  {
    id: "vue-job-finder",
    title: "Vue Job Finder",
    category: "Frontend / Job discovery",
    summary:
      "A Vue-based job-search interface paired with a separate API project.",
    problem: "Job listings benefit from clear browsing and filtering patterns.",
    contribution: "Frontend application structure and integration with API resources.",
    proof: "The source repositories are publicly linked in the existing case study.",
    limitation: "A continuously available hosted demo is not confirmed.",
    period: null,
    technologies: ["Vue", "JavaScript", "API integration"],
    status: "public-repository",
    statusLabel: "Public repositories",
    caseStudyUrl: "/case-studies#vue-job-finder",
    sourceUrl: "https://github.com/ervinosmani/vue-job-finder",
    mediaProvenance: "editorial-graphic",
  },
  {
    id: "blogging-platform",
    title: "Blogging Platform",
    category: "Backend / Publishing workflows",
    summary:
      "A Laravel backend for content management, authentication and reader interactions.",
    problem: "Publishing needs structured roles, content states and server-side workflows.",
    contribution: "API endpoints, controllers and relational content modeling.",
    proof: "The Laravel source repository is publicly accessible.",
    limitation: "A hosted, interactive administration demo is not confirmed.",
    period: null,
    technologies: ["Laravel", "PHP", "MySQL", "REST API"],
    status: "public-repository",
    statusLabel: "Public source",
    caseStudyUrl: "/case-studies#blogging-platform",
    sourceUrl: "https://github.com/ervinosmani/blogging-platform",
    mediaProvenance: "editorial-graphic",
  },
];

export const getAllProjects = (): readonly PortfolioProject[] => [
  ...flagshipProjects,
  ...supportingProjects,
];
