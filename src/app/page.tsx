import type { Metadata } from "next";
import SpatialExperience from "./spatial-preview/SpatialExperience";
import { site, siteDescription } from "../content/site";

/** The approved real-portrait experience is now the canonical homepage. */
export const metadata: Metadata = {
  title: `${site.name} | Software Developer — Engineering Portfolio`,
  description: siteDescription,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${site.name} — Software Developer`,
    description: siteDescription,
    url: site.baseUrl,
    type: "website",
  },
};

export default function HomePage() {
  return <SpatialExperience />;
}
