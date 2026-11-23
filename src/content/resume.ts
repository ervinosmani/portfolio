import { background } from "./experience";
import { flagshipProjects, supportingProjects } from "./projects";
import { site } from "./site";

/**
 * Publication controls remain explicitly closed until owner sign-off.
 * No PDF/DOCX is imported or exposed from the Next.js public directory.
 */
export const resumePublication = {
  publicCvApproved: false,
  applicationDownloadsAvailable: false,
  indexingAllowed: false,
} as const;

export const resumeProfile = {
  name: site.name,
  title: site.role,
  email: site.email,
  portfolio: site.baseUrl,
  github: site.github,
  linkedin: site.linkedin,
  summary:
    "Full-stack web developer with internship experience using PHP/Twig and a background supporting programming instruction. Selected engineering projects cover personal-finance correctness, operations workflows, accessible interfaces and reliable data handling.",
  experience: background.filter((entry) => entry.kind === "experience"),
  education: background.filter((entry) => entry.kind === "education-or-training"),
  featured: flagshipProjects,
  additional: supportingProjects,
  capabilities: [
    {
      label: "Frontend and user experience",
      items: ["React", "Next.js", "TypeScript", "Vue", "HTML and CSS", "Tailwind CSS"],
    },
    {
      label: "Backend and data",
      items: ["Java", "Spring Boot", "PHP", "Twig", "Laravel", "PostgreSQL", "MySQL", "REST APIs"],
    },
    {
      label: "Engineering practice",
      items: ["Git and GitHub", "Automated testing", "CI checks", "Data access boundaries", "Responsive UI"],
    },
  ],
} as const;
