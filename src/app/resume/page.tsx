import type { Metadata } from "next";
import Link from "next/link";
import StudioHeader from "../editorial/StudioHeader";
import StudioFooter from "../editorial/StudioFooter";
import { resumeProfile, resumePublication } from "../../content/resume";
import styles from "./resume.module.css";

/**
 * Recruiter-readable career profile, not a released application CV.
 * All PDF/DOCX exports remain outside /public until explicit factual approval.
 */
export const metadata: Metadata = {
  title: "Career Profile | Ervin Osmani",
  description:
    "Professional background and selected engineering work: full-stack internship, programming instruction, Aurelia and CommerceOps.",
  alternates: { canonical: "/resume" },
  robots: { index: resumePublication.indexingAllowed, follow: false },
};

export default function ResumePage() {
  const profile = resumeProfile;

  return (
    <>
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <div className={styles.chrome}><StudioHeader /></div>
      <main id="main" className={styles.main} tabIndex={-1}>
        <div className={styles.pageContent} id="career-content">
          <div className={styles.documentMeta}>
            <span>CAREER PROFILE / ENGINEERING EVIDENCE</span>
            <span>PROFESSIONAL EXPERIENCE / SELECTED WORK</span>
          </div>

          <header className={styles.hero}>
            <div>
              <p className={styles.eyebrow}>SOFTWARE DEVELOPMENT / PROFESSIONAL BACKGROUND</p>
              <h1>{profile.name}<span className={styles.accent}>.</span></h1>
              <p className={styles.role}>{profile.title} <span aria-hidden="true">/</span> Full-Stack Web Applications</p>
            </div>
            <p className={styles.heroSummary}>{profile.summary}</p>
          </header>

          <nav className={styles.contacts} aria-label="Professional links">
            <a href={`mailto:${profile.email}`}>Email <span aria-hidden="true">↗</span></a>
            <a href={profile.portfolio}>Portfolio <span aria-hidden="true">↗</span></a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GitHub <span className={styles.externalHint}>(new tab)</span></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">LinkedIn <span className={styles.externalHint}>(new tab)</span></a>
          </nav>

          <section className={styles.section} aria-labelledby="experience-title">
            <div className={styles.sectionHeading}>
              <p>01 / PROFESSIONAL EXPERIENCE</p>
              <h2 id="experience-title">Building, learning, <em>supporting others.</em></h2>
            </div>
            <p className={styles.chronologyNote}>Experience is presented by role and scope. Dates are omitted where a precise timeline has not been confirmed.</p>
            <div className={styles.careerList}>
              {profile.experience.map((item, index) => (
                <article key={item.organization} className={styles.careerItem} data-career-type="experience">
                  <span className={styles.careerIndex}>0{index + 1}</span>
                  <div>
                    <p className={styles.careerOrganization}>{item.organization}</p>
                    <h3>{item.role}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="projects-title">
            <div className={styles.sectionHeading}>
              <p>02 / PRIMARY ENGINEERING WORK</p>
              <h2 id="projects-title">Projects with <em>decisions behind them.</em></h2>
            </div>
            <div className={styles.featuredList}>
              {profile.featured.map((project, index) => (
                <article key={project.id} className={styles.featuredItem}>
                  <div className={styles.itemNumber}>0{index + 1}</div>
                  <div className={styles.itemContent}>
                    <h3><Link href={project.caseStudyUrl}>{project.title}<span aria-hidden="true"> ↗</span></Link></h3>
                    <p className={styles.projectCategory}>{project.category}</p>
                    <p>{project.summary}</p>
                    <dl>
                      <div><dt>Engineering scope</dt><dd>{project.contribution}</dd></div>
                      <div><dt>Evidence</dt><dd>{project.proof}</dd></div>
                      <div><dt>Publication boundary</dt><dd>{project.limitation}</dd></div>
                    </dl>
                    <div className={styles.projectLinks}>
                      <Link href={project.caseStudyUrl}>Read engineering case study <span aria-hidden="true">↗</span></Link>
                      {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">Curated public source (new tab)</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="additional-title">
            <div className={styles.sectionHeading}>
              <p>03 / ADDITIONAL WORK</p>
              <h2 id="additional-title">Selected applications.</h2>
            </div>
            <div className={styles.additionalGrid}>
              {profile.additional.map((project) => (
                <article key={project.id} className={styles.additionalProject}>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <span>{project.statusLabel}</span>
                  <Link href={project.caseStudyUrl}>Project overview <span aria-hidden="true">↗</span></Link>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="skills-title">
            <div className={styles.sectionHeading}>
              <p>04 / TECHNICAL FOCUS</p>
              <h2 id="skills-title">Capabilities, connected to work.</h2>
            </div>
            <div className={styles.skills}>
              {profile.capabilities.map((group) => (
                <div className={styles.skillGroup} key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="education-title">
            <div className={styles.sectionHeading}>
              <p>05 / EDUCATION AND TRAINING</p>
              <h2 id="education-title">Foundations of <em>the practice.</em></h2>
            </div>
            <div className={styles.careerList}>
              {profile.education.map((item, index) => (
                <article key={item.organization} className={styles.careerItem} data-career-type="education">
                  <span className={styles.careerIndex}>0{index + 1}</span>
                  <div>
                    <p className={styles.careerOrganization}>{item.organization}</p>
                    <h3>{item.role}</h3>
                    {item.period && <p className={styles.careerPeriod}>{item.period}</p>}
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.reviewNote} aria-labelledby="document-title">
            <div>
              <p className={styles.eyebrow}>CAREER / CONTACT</p>
              <h2 id="document-title">Interested in working together?</h2>
              <p>
                This page brings together my experience, technical focus and selected engineering
                work. For a current application CV or to discuss a project, get in touch directly.
              </p>
            </div>
            <a href={`mailto:${profile.email}?subject=Resume%20enquiry`}>Request my CV <span aria-hidden="true">↗</span></a>
          </section>
          <p className={styles.printHint}>A printable version is available through your browser. Please contact me for a current application CV.</p>
        </div>
      </main>
      <div className={styles.chrome}><StudioFooter /></div>
    </>
  );
}
