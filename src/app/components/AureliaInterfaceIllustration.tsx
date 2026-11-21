import styles from "./AureliaInterfaceIllustration.module.css";

type Props = {
  size?: "full" | "compact";
};

/** Public portfolio illustration modelled on Aurelia's local interface.
 * Deliberately synthetic values. This is not a screenshot or a live application.
 */
export default function AureliaInterfaceIllustration({ size = "full" }: Props) {
  return (
    <div
      className={`${styles.frame} ${size === "compact" ? styles.compact : styles.full}`}
      role="img"
      aria-label="Illustration based on the Aurelia personal finance interface: a dark-green sidebar, overview, sample account balance, next step and activity cards. All values are invented examples. Not a screenshot."
    >
      <div className={styles.windowBar} aria-hidden="true">
        <span className={styles.dots}><i /><i /><i /></span>
        <span>AURELIA / PRODUCT INTERFACE STUDY</span>
        <span className={styles.windowTag}>SAMPLE DATA</span>
      </div>
      <div className={styles.app} aria-hidden="true">
        <div className={styles.sidebar}>
          <div className={styles.brand}><span>a</span><strong>aurelia.</strong></div>
          <div className={styles.sidebarLabel}>YOUR PERSONAL SPACE</div>
          <div className={styles.menu}>
            <span className={styles.active}>⌂ <b>Home</b></span>
            <span>↔ <b>Activity</b></span>
            <span>▣ <b>Accounts</b></span>
            <span>◎ <b>Plans</b></span>
            <span>▥ <b>Insights</b></span>
          </div>
          <div className={styles.sideAction}>+ &nbsp; Add transaction <b>↗</b></div>
          <div className={styles.sideFooter}>PRIVATE WORKSPACE · EUR</div>
        </div>
        <div className={styles.content}>
          <div className={styles.topLine}><span>YOUR DAILY OVERVIEW</span><span>PRIVATE · EUR</span></div>
          <div className={styles.heading}>Your money, <em>at a glance.</em></div>
          <p className={styles.subheading}>See where you stand. Record what matters.</p>
          <div className={styles.balanceCard}>
            <span>TOTAL TRACKED BALANCE · SAMPLE</span>
            <strong>€9,460.00</strong>
            <small>Across three example accounts</small>
            <div className={styles.rings}><i /><i /><i /></div>
          </div>
          <div className={styles.nextStep}>
            <span className={styles.nextIcon}>✦</span>
            <div><small>YOUR NEXT STEP</small><strong>Keep your activity organized</strong><span>Review your categories and monthly plan.</span></div>
          </div>
          <div className={styles.cardGrid}>
            <div><small>INCOME · SAMPLE</small><strong>€2,950.00</strong><span>Monthly activity</span></div>
            <div><small>SPENDING · SAMPLE</small><strong>€1,425.00</strong><span>Monthly activity</span></div>
            <div><small>MONTHLY PLAN · SAMPLE</small><strong>On track</strong><span>Illustrative status</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
