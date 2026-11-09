
import type { ReactNode } from "react";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import EditorialNavigation from "./EditorialNavigation";
import styles from "./EditorialShell.module.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-editorial-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-editorial-heading",
});

type EditorialShellProps = {
  children: ReactNode;
};

export default function EditorialShell({
  children,
}: EditorialShellProps) {
  return (
    <div
      data-editorial-shell
      className={[
        styles.scope,
        dmSans.variable,
        spaceGrotesk.variable,
      ].join(" ")}
    >
      {children}
      <EditorialNavigation />
    </div>
  );
}
