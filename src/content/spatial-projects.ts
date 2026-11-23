import { flagshipProjects, supportingProjects } from "./projects";

export type SpatialProject = {
  readonly id: string;
  readonly title: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly href: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly imageDisclosure?: string;
  readonly className: "aurelia" | "commerce" | "confora" | "job" | "blog" | "automation";
  readonly flagship?: true;
  readonly status: string;
};

const aurelia = flagshipProjects.find((project) => project.id === "aurelia");
const commerce = flagshipProjects.find((project) => project.id === "commerceops");
const job = supportingProjects.find((project) => project.id === "vue-job-finder");
const blog = supportingProjects.find((project) => project.id === "blogging-platform");

if (!aurelia || !commerce || !job || !blog) {
  throw new Error("The source-of-truth project registry is incomplete.");
}

/**
 * The six public discovery entries, not six claims of public deployments.
 * A public illustration is not evidence that private product source is published.
 */
export const spatialProjects: readonly SpatialProject[] = [
  {
    id: "aurelia",
    title: aurelia.title,
    eyebrow: "Personal finance / Engineering",
    description: "Accurate money flows. Private-by-design data boundaries.",
    href: aurelia.caseStudyUrl,
    className: "aurelia",
    flagship: true,
    status: "Curated public engineering evidence",
  },
  {
    id: "commerceops",
    title: commerce.title,
    eyebrow: "Inventory / Business operations",
    description: "Tenant-aware workflows, stock integrity and orders.",
    href: commerce.caseStudyUrl,
    image: "/projects/commerceops/01-product-catalog.png",
    imageAlt: "CommerceOps product catalog interface with sample records",
    imageDisclosure: "Real local MVP screenshot with sample data",
    className: "commerce",
    flagship: true,
    status: "Private source · Locally demonstrated MVP",
  },
  {
    id: "confora",
    title: "Confora",
    eyebrow: "Multilingual business website",
    description: "Transport-services website preview for European audiences.",
    href: "/case-studies#confora",
    image: "/projects/confora-hero.png",
    imageAlt: "Confora transport website artwork",
    imageDisclosure: "Website artwork · Contribution permissions under review",
    className: "confora",
    status: "Public website preview · Contribution pending approval",
  },
  {
    id: "vue-job-finder",
    title: job.title,
    eyebrow: "Frontend / Job discovery",
    description: "Search, filters and saved-job experiences.",
    href: job.caseStudyUrl,
    image: "/projects/job-finder.png",
    imageAlt: "Vue Job Finder application interface",
    imageDisclosure: "Existing project interface image",
    className: "job",
    status: "Public source repositories",
  },
  {
    id: "blogging-platform",
    title: blog.title,
    eyebrow: "Backend / Publishing API",
    description: "Content workflows and structured Laravel APIs.",
    href: blog.caseStudyUrl,
    image: "/blogproject1.png",
    imageAlt: "Blogging Platform project interface image",
    imageDisclosure: "Existing project image",
    className: "blog",
    status: "Public source repository",
  },
  {
    id: "private-work",
    title: "Python Automation",
    eyebrow: "Private workflow engineering",
    description: "Practical scripts and reliable repeatable processes.",
    href: "/case-studies#private-work",
    className: "automation",
    status: "Private work · General overview only",
  },
] as const;
