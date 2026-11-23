import Link from "next/link";
import { site } from "../../content/site";
import styles from "./StudioFooter.module.css";

export default function StudioFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div><p className={styles.kicker}>ERVIN OSMANI / SOFTWARE DEVELOPMENT</p><p className={styles.statement}>Real work. <em>Clear thinking.</em></p></div>
          <a className={styles.email} href={`mailto:${site.email}`}>Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link href="/">Home</Link><Link href="/case-studies">Selected work</Link><Link href="/resume">Career profile</Link>
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub (new tab)</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn (new tab)</a>
        </nav>
        <div className={styles.bottom}><span>© {new Date().getFullYear()} Ervin Osmani</span><span>Built with care for useful engineering.</span></div>
      </div>
    </footer>
  );
}
