
import type { Metadata } from "next";
import type { ReactNode } from "react";
import EditorialShell from "../editorial/EditorialShell";

export const metadata: Metadata = {
  title: "Ervin Osmani | Software Developer",
  description:
    "Software developer working across web applications, backend development and Python automation. Explore selected projects and experience.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RedesignLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <EditorialShell>
      {children}
    </EditorialShell>
  );
}
