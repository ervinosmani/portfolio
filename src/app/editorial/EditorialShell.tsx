import type { ReactNode } from "react";
import EditorialNavigation from "./EditorialNavigation";
import styles from "./EditorialShell.module.css";

type EditorialShellProps = {
  children: ReactNode;
};

/**
 * Shared lightweight typography and focus scope for the current portfolio routes.
 * The new studio header/footer are introduced independently to avoid duplicate
 * navigation until the homepage and individual case studies are migrated.
 */
export default function EditorialShell({ children }: EditorialShellProps) {
  return (
    <div data-editorial-shell className={styles.scope}>
      {children}
      <EditorialNavigation />
    </div>
  );
}
