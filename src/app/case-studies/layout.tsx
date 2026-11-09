
import type { ReactNode } from "react";
import EditorialShell from "../editorial/EditorialShell";

export default function CaseStudiesLayout({
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
