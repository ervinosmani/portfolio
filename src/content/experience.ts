/**
 * Career background shared by the homepage and /resume.
 * Content is restricted to owner-confirmed facts and previously public context.
 * Missing calendar dates and degree awards are intentionally not invented.
 */
export type BackgroundEntry = {
  readonly organization: string;
  readonly role: string;
  readonly description: string;
  readonly period: string | null;
  readonly kind: "experience" | "education-or-training";
};

export const background: readonly BackgroundEntry[] = [
  {
    organization: "Starlabs",
    role: "Full-Stack Web Development Intern",
    description:
      "Completed a three-month web-development internship involving frontend and backend work, including Twig-based templates. Exact calendar dates are not confirmed.",
    period: null,
    kind: "experience",
  },
  {
    organization: "Digital School",
    role: "Programming Assistant Instructor",
    description:
      "Supported hands-on programming and web-development sessions, helping learners understand concepts and work through coding exercises. Exact dates are not confirmed.",
    period: null,
    kind: "experience",
  },
  {
    organization: "Probit Academy",
    role: "Full-Stack Web Developer Training",
    description:
      "Completed a full-stack web development training programme. A physical completion certificate is held; its exact title and issue date are not yet verified.",
    period: null,
    kind: "education-or-training",
  },
  {
    organization: "UBT",
    role: "Computer Science and Engineering Studies",
    description:
      "Completed the stated period of study. The formal degree award and exact credential title are not yet verified and are not claimed here.",
    period: "2020/21–2023/24 (academic years)",
    kind: "education-or-training",
  },
];
