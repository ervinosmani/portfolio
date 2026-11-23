"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { site } from "../../content/site";
import { background } from "../../content/experience";
import { spatialProjects, type SpatialProject } from "../../content/spatial-projects";
import styles from "./spatial.module.css";

type VisualStyle = CSSProperties & {
  "--tilt-x"?: string;
  "--tilt-y"?: string;
};

function PreviewVisual({ project }: { project: SpatialProject }) {
  if (project.image) {
    return (
      <div className={styles.previewMedia}>
        {project.id === "confora" || project.id === "blogging-platform" ? (
          <picture>
            <source
              type="image/webp"
              srcSet={project.id === "confora"
                ? "/projects/confora-hero-480.webp 480w, /projects/confora-hero-960.webp 960w"
                : "/blogproject1-480.webp 480w, /blogproject1-960.webp 960w"}
              sizes="(max-width: 640px) 94vw, (max-width: 1100px) 46vw, 28vw"
            />
            <Image
              src={project.image}
              alt={project.imageAlt ?? ""}
              width={940}
              height={610}
              sizes="(max-width: 640px) 94vw, (max-width: 1100px) 46vw, 28vw"
              loading="eager"
              fetchPriority="low"
              unoptimized
            />
          </picture>
        ) : (
          <Image src={project.image} alt={project.imageAlt ?? ""} width={940} height={610}
            sizes="(max-width: 640px) 94vw, (max-width: 1100px) 46vw, 28vw" loading="lazy" />
        )}
        <span className={styles.previewDisclosure}>{project.imageDisclosure}</span>
      </div>
    );
  }

  if (project.id === "aurelia") {
    return (
      <div className={`${styles.previewMedia} ${styles.aureliaVisual}`} aria-label="Conceptual diagram of accounts, transfers and spending insights; not a product screenshot" role="img">
        <div className={styles.syntheticWindow} aria-hidden="true">
          <div className={styles.syntheticTop}><span>FINANCIAL LOGIC</span><span>•••</span></div>
          <div className={styles.syntheticLedger}>
            <span>Accounts</span><span className={styles.syntheticLine}/><span>Transfers</span>
          </div>
          <div className={styles.syntheticFlow}><span>ACCOUNT A</span><b>→</b><span>ACCOUNT B</span></div>
          <div className={styles.syntheticFooter}>Correct transfers · Explicit ownership</div>
        </div>
        <span className={styles.previewDisclosure}>Conceptual illustration · Not a product screenshot</span>
      </div>
    );
  }

  return (
    <div className={`${styles.previewMedia} ${styles.automationVisual}`} role="img" aria-label="Conceptual automation workflow, not private source code or a live system">
      <div className={styles.automationFlow} aria-hidden="true"><span>INPUT</span><i/><span>PROCESS</span><i/><span>OUTPUT</span></div>
      <span className={styles.previewDisclosure}>Conceptual workflow · Private implementation withheld</span>
    </div>
  );
}

function ProjectCard({ project, compact }: { project: SpatialProject; compact?: boolean }) {
  const cardClass = [styles.projectCard, compact ? styles.compact : styles.flagship, styles[project.className]].join(" ");
  return (
    <article className={cardClass}>
      <Link href={project.href} className={styles.projectLink} data-cursor-label="Explore">
        <div className={styles.projectHead}>
          <div><span className={styles.projectCategory}>{project.eyebrow}</span><h3>{project.title}</h3></div>
          <span className={styles.projectArrow} aria-hidden="true">↗</span>
        </div>
        <p className={styles.projectSummary}>{project.description}</p>
        <PreviewVisual project={project} />
        <div className={styles.projectFoot}>
          <span>{project.status}</span>
          <strong>Explore case study <span aria-hidden="true">↗</span></strong>
        </div>
      </Link>
    </article>
  );
}

export default function SpatialExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const portrait = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  function onPortraitPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (motionPaused || event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portrait.current?.style.setProperty("--tilt-x", `${(x * 5).toFixed(2)}deg`);
    portrait.current?.style.setProperty("--tilt-y", `${(-y * 5).toFixed(2)}deg`);
  }

  function onPortraitPointerLeave() {
    portrait.current?.style.setProperty("--tilt-x", "0deg");
    portrait.current?.style.setProperty("--tilt-y", "0deg");
  }

  const flagships = spatialProjects.filter((project) => project.flagship);
  const moreWork = spatialProjects.filter((project) => !project.flagship);

  return (
    <div className={`${styles.page} ${motionPaused ? styles.paused : ""}`} id="top">
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <div className={styles.atmosphere} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.wrap}>
          <Link href="/" className={styles.brand}>
            <span className={styles.monogram}>EO</span>
            <span className={styles.brandName}>Ervin Osmani</span>
          </Link>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <a href="#work">Work</a><a href="#capabilities">Capabilities</a><a href="#experience">Experience</a><a href="#about">About</a>
            <Link href="/resume">Resume</Link><a className={styles.contactNav} href="#contact">Contact ↗</a>
          </nav>
          <button ref={menuButton} className={styles.menuButton} type="button" aria-controls="spatial-preview-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? "Close menu" : "Menu"} <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
        <nav id="spatial-preview-navigation" aria-label="Mobile navigation" className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <Link href="/resume" onClick={() => setMenuOpen(false)}>Resume</Link>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="hero-heading">
          <div className={styles.heroTopline}>
            <span><i aria-hidden="true" /> Software development / Selected work</span>
            <button className={styles.motionButton} onClick={() => setMotionPaused((value) => !value)} type="button" aria-pressed={motionPaused}>{motionPaused ? "Resume motion" : "Pause motion"}</button>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Independent software developer</p>
              <h1 id="hero-heading">Ervin <span>Osmani</span></h1>
              <p className={styles.heroStatement}>Ideas. Systems. <em>Real products.</em></p>
              <p className={styles.heroDescription}>I build practical web applications with thoughtful interfaces, reliable engineering and attention to the details that matter.</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#work" data-cursor-label="Explore">Explore my work <span aria-hidden="true">↗</span></a>
                <Link className={styles.secondaryButton} href="/case-studies">Engineering case studies <span aria-hidden="true">↗</span></Link>
              </div>
              <div className={styles.heroFacts}>
                <div><strong>02</strong><span>Flagship engineering projects</span></div>
                <div><strong>06</strong><span>Selected projects and work</span></div>
              </div>
            </div>
            <div className={styles.portraitSpace} onPointerMove={onPortraitPointerMove} onPointerLeave={onPortraitPointerLeave}>
              <div className={styles.portraitAura} aria-hidden="true" />
              <div className={styles.ghostPanel} aria-hidden="true">Systems / Interfaces / Engineering</div>
              <div className={styles.orbitBack} aria-hidden="true" />
              <div className={styles.portraitFrame} ref={portrait} style={{"--tilt-x":"0deg","--tilt-y":"0deg"} as VisualStyle}>
                <Image src="/E.O.jpg" alt="Portrait of Ervin Osmani" width={1024} height={1536} sizes="(max-width: 640px) 83vw, (max-width: 1100px) 42vw, 460px" priority />
              </div>
              <div className={styles.orbitFront} aria-hidden="true" />
              <div className={styles.eoOrb} aria-hidden="true">EO.</div>
              <div className={styles.floatCard} aria-hidden="true"><span>{"// Focus"}</span><strong>Products</strong><strong>Systems</strong><strong>Interfaces</strong></div>
            </div>
          </div>
        </section>

        <section id="work" className={`${styles.wrap} ${styles.work}`} aria-labelledby="work-heading">
          <div className={styles.sectionOverline}><span>Selected work / Engineering</span><span>06 projects</span></div>
          <div className={styles.workIntro}><div><p className={styles.eyebrow}>Explore the work</p><h2 id="work-heading">Project <em>Universe.</em></h2></div><p>From financial logic and warehouse operations to useful interfaces and automation. Explore any project directly.</p></div>
          <div className={styles.flagshipGrid}>{flagships.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
          <div className={styles.supportGrid}>{moreWork.map((project) => <ProjectCard key={project.id} project={project} compact />)}</div>
          <div className={styles.allWork}><Link href="/case-studies">Explore all selected work <span aria-hidden="true">↗</span></Link></div>
        </section>

        <section id="capabilities" className={styles.capabilities} aria-labelledby="cap-heading"><div className={styles.wrap}>
          <div className={styles.sectionOverline}><span>How I work</span><span>Engineering / 03 disciplines</span></div>
          <div className={styles.capabilityGrid}><div><p className={styles.eyebrow}>Behind the interfaces</p><h2 id="cap-heading">Beautiful is good.<br /><em>Reliable is better.</em></h2></div>
            <div className={styles.capabilityList}>
              <article><span>01 / Frontend</span><h3>Interfaces that make sense.</h3><p>Responsive React and Vue experiences designed around clear user tasks.</p></article>
              <article><span>02 / Backend</span><h3>Systems with clear rules.</h3><p>APIs, data modeling and transaction-aware business workflows.</p></article>
              <article><span>03 / Quality</span><h3>Evidence behind the work.</h3><p>Testing, access boundaries, reliable builds and honest project documentation.</p></article>
            </div>
          </div></div></section>

        <section id="experience" className={styles.experience} aria-labelledby="experience-heading">
          <div className={styles.wrap}>
            <div className={styles.sectionOverline}><span>Professional background</span><span>Experience / Education</span></div>
            <div className={styles.backgroundGrid}>
              <div className={styles.backgroundLead}>
                <p className={styles.eyebrow}>The path behind the projects</p>
                <h2 id="experience-heading">Learning, teaching, <em>building.</em></h2>
                <p>Experience and training that inform the work. Exact dates and career chronology are reserved for the verified CV.</p>
              </div>
              <div className={styles.backgroundEntries}>
                {background.map((entry, index) => (
                  <article key={entry.organization} className={styles.backgroundEntry}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <div>
                      <p className={styles.backgroundCategory}>{entry.kind === "experience" ? "Experience" : "Education / Training"}</p>
                      <h3>{entry.organization}</h3>
                      <p className={styles.backgroundRole}>{entry.role}</p>
                      <p>{entry.description}</p>
                    </div>
                  </article>
                ))}
                <Link href="/resume" className={styles.backgroundMore}>Explore career profile <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className={`${styles.wrap} ${styles.about}`} aria-labelledby="about-heading"><div>
          <p className={styles.eyebrow}>The person behind the projects</p><h2 id="about-heading">Curiosity, built <em>into practice.</em></h2></div>
          <div><p>I&apos;m Ervin, a software developer interested in building useful applications, solving real engineering problems and making technology easier to work with.</p>
            <p>This portfolio highlights public source, private engineering case studies and selected website work. Each project states what can be verified.</p>
            <Link href="/resume">Explore my background <span aria-hidden="true">↗</span></Link>
          </div></section>

        <section id="contact" className={styles.contact} aria-labelledby="contact-heading"><div className={styles.wrap}>
          <p className={styles.eyebrow}>Have a project or a role in mind?</p><h2 id="contact-heading">Let&apos;s build <em>something useful.</em></h2>
          <div className={styles.contactActions}><a className={styles.primaryButton} href={`mailto:${site.email}`}>Get in touch <span aria-hidden="true">↗</span></a><a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
        </div></section>
      </main>
      <footer className={styles.footer}><div className={styles.wrap}><Link href="/">EO / Ervin Osmani</Link><span>Practical work. Considered engineering.</span><a href="#top">Back to top ↑</a></div></footer>
    </div>
  );
}
