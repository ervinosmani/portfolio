import Link from "next/link";
import AureliaInterfaceIllustration from "./AureliaInterfaceIllustration";
import styles from "./AureliaTeaser.module.css";

type Props = { context: "home" | "index" };

/** Reusable, editorial entry point for an intentionally private project. */
export default function AureliaTeaser({ context }: Props) {
  return (
    <section
      id="aurelia"
      className={`${styles.feature} ${context === "home" ? styles.home : styles.index}`}
      aria-labelledby={`aurelia-title-${context}`}
    >
      <div className={styles.copy}>
        <div className={styles.overline}><span className={styles.signal} aria-hidden="true" />FEATURED PROJECT <span>/</span> PERSONAL FINANCE</div>
        <div className={styles.brand}>aurelia<span>.</span></div>
        <h2 id={`aurelia-title-${context}`}>More than a <em>money tracker.</em></h2>
        <p className={styles.description}>
          A privately developed financial workspace where product clarity meets careful
          engineering — from everyday transactions to accurate balances and data ownership.
        </p>
        <div className={styles.tags} aria-label="Project disciplines">
          <span>Product design</span><span>Full-stack development</span><span>Financial domain logic</span>
        </div>
        <Link className={styles.link} href="/case-studies/aurelia">
          Read the Aurelia case study <span aria-hidden="true">↗</span>
        </Link>
        <p className={styles.disclosure}>PRIVATE APPLICATION · PUBLIC ENGINEERING STORY</p>
      </div>
      <div className={styles.visual}>
        <div className={styles.visualLabel}><span>01 / PRODUCT EXPERIENCE</span><span>INTERFACE STUDY</span></div>
        <div className={styles.preview}>
          <AureliaInterfaceIllustration size="compact" />
        </div>
        <p className={styles.caption}>Based on the local Aurelia UI · Recreated with synthetic sample data, not an application screenshot.</p>
      </div>
    </section>
  );
}
