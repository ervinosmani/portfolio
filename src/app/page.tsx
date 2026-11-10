
import type { Metadata } from "next";
import EditorialShell from "./editorial/EditorialShell";
import EditorialPreview from "./redesign/page";

const siteUrl = "https://ervinosmani.vercel.app";

const description =
  "Explore the portfolio of Ervin Osmani, a software developer building web applications, backend APIs and practical automation solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Ervin Osmani | Software Developer",

  description,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Ervin Osmani | Software Developer",
    description,
    url: siteUrl,
    siteName: "Ervin Osmani",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ervin Osmani | Software Developer",
    description,
    images: [`${siteUrl}/opengraph-image`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <EditorialShell>
      <EditorialPreview />
    </EditorialShell>
  );
}
