/**
 * Editorial summaries of the existing, public-facing case-study evidence.
 * These are descriptions of the project's published case studies, not
 * independent certification of production readiness or client outcomes.
 */
export type EngineeringDecision = Readonly<{
  title: string;
  explanation: string;
}>;

export type FlagshipBrief = Readonly<{
  id: "aurelia" | "commerceops";
  eyebrow: string;
  heading: string;
  lead: string;
  decisions: readonly EngineeringDecision[];
  sourceDescription: string;
  mediaDescription: string;
  limitation: string;
}>;

export const flagshipBriefs: readonly FlagshipBrief[] = [
  {
    id: "aurelia",
    eyebrow: "01 / PERSONAL FINANCE · APPLICATION CORRECTNESS",
    heading: "Money should never be a rounding error.",
    lead: "A private personal-finance workspace, designed around understandable financial activity and explicit rules for what the numbers mean.",
    decisions: [
      {
        title: "Exact monetary representation",
        explanation: "Authoritative EUR values use integer minor units instead of floating-point calculations.",
      },
      {
        title: "Protect the ownership boundary",
        explanation: "Server-side ownership checks and PostgreSQL row-level isolation protect user-scoped records.",
      },
      {
        title: "Make corrections traceable",
        explanation: "Reversal-and-replacement semantics preserve the meaning of an earlier financial entry.",
      },
    ],
    sourceDescription: "Curated public source and GitHub Actions checks, including synthetic PostgreSQL owner-isolation tests.",
    mediaDescription: "Editorial illustration; not a screenshot of private financial records.",
    limitation: "The running finance product is private. The curated showcase is not a public consumer finance service.",
  },
  {
    id: "commerceops",
    eyebrow: "02 / WAREHOUSE OPERATIONS · TRANSACTIONAL INTEGRITY",
    heading: "Inventory must hold up under pressure.",
    lead: "An engineering MVP for multi-tenant inventory, orders and warehouse workflows, built to explore correctness when operations overlap.",
    decisions: [
      {
        title: "Protect inventory transitions",
        explanation: "Order confirmation, cancellation and fulfillment rely on explicit reservation and stock rules.",
      },
      {
        title: "Keep tenancy on the server",
        explanation: "Organization membership and role checks govern access to protected operations.",
      },
      {
        title: "Prefer a modular monolith",
        explanation: "A modular Java backend keeps domain responsibilities clear without premature distributed infrastructure.",
      },
    ],
    sourceDescription: "Case-study narrative and prior locally demonstrated test evidence; the repository and independent CI results are not public.",
    mediaDescription: "Existing case-study screenshots with sample operational data.",
    limitation: "Private engineering MVP; no public SaaS deployment or publicly inspectable source is claimed.",
  },
] as const;

export function getFlagshipBrief(id: FlagshipBrief["id"]): FlagshipBrief {
  const match = flagshipBriefs.find((brief) => brief.id === id);
  if (!match) throw new Error(`Unknown flagship case study: ${id}`);
  return match;
}
