import Link from "next/link";
import StudioHeader from "./editorial/StudioHeader";
import StudioFooter from "./editorial/StudioFooter";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <StudioHeader />
      <main className={styles.main} id="main" tabIndex={-1}>
        <div className={styles.content}>
          <p className={styles.kicker}>404 / PAGE NOT FOUND</p>
          <h1>Nothing here.<br /><em>Keep exploring.</em></h1>
          <p className={styles.description}>
            This address does not lead to a current portfolio page. The selected work and
            engineering case studies are available below.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/">Back to homepage <span aria-hidden="true">↗</span></Link>
            <Link className={styles.secondary} href="/case-studies">Browse case studies <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </main>
      <StudioFooter />
    </>
  );
}
