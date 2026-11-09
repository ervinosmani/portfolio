
"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import styles from "./redesign.module.css";
import ProjectsSection from "./ProjectsSection";

const expertise = [
  {
    no: "01",
    symbol: "</>",
    name: "Frontend",
    text: "Responsive interfaces with clear interaction and component structure.",
    tools: "JavaScript · React · Next.js · Vue · Tailwind CSS",
  },
  {
    no: "02",
    symbol: "{ }",
    name: "Backend & data",
    text: "Application logic, REST APIs, data models and authenticated flows.",
    tools: "PHP · Laravel · SQL · Firebase · REST APIs",
  },
  {
    no: "03",
    symbol: "↝",
    name: "Automation",
    text: "Practical scripts and repeatable processes with Python.",
    tools: "Python · Scripting · Workflow design · Git",
  },
] as const;

const experience = [
  [
    "01",
    "Web Development Intern",
    "Starlabs",
    "Worked with web development projects in a professional team environment.",
  ],
  [
    "02",
    "Assistant Instructor",
    "Digital School",
    "Supported practical development sessions and helped students work through technical exercises.",
  ],
  [
    "03",
    "Full-Stack Development Program",
    "Probit Academy",
    "Training in frontend, backend and application development fundamentals.",
  ],
  [
    "04",
    "Computer Science",
    "UBT — studies in progress",
    "Continuing to develop foundations in programming and problem solving.",
  ],
] as const;

export default function EditorialPreview() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Update the progress indicator while scrolling.
  useEffect(() => {
    const update = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        scrollableHeight > 0
          ? (window.scrollY / scrollableHeight) * 100
          : 0;

      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Use native browser scrolling instead of a custom animation.
  const navigate = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const target = document.getElementById(id);

    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);

    const header = document.querySelector<HTMLElement>(
      `.${styles.header}`
    );

    const headerOffset =
      id === "top"
        ? 0
        : (header?.getBoundingClientRect().height ?? 0) + 12;

    const targetPosition =
      id === "top"
        ? 0
        : window.scrollY +
          target.getBoundingClientRect().top -
          headerOffset;

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight -
        window.innerHeight
    );

    const top = Math.max(
      0,
      Math.min(maxScroll, targetPosition)
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.history.replaceState(
      null,
      "",
      `#${id}`
    );

    window.scrollTo({
      top,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const sectionLink = (id: string, label: string) => (
    <a
      href={`#${id}`}
      onClick={(event) => navigate(event, id)}
    >
      {label}
    </a>
  );

  return (
    <div className={styles.site} id="top">
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <div
        className={styles.progressTrack}
        aria-hidden="true"
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      {/* NAVIGATION */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a
            className={styles.identity}
            href="#top"
            onClick={(event) => navigate(event, "top")}
            aria-label="Ervin Osmani — back to top"
          >
            <span className={styles.identityMark}>
              eo<span>↗</span>
            </span>

            <span>
              Ervin Osmani
              <small>Software Developer</small>
            </span>
          </a>

          <nav
            className={styles.desktopNav}
            aria-label="Main navigation"
          >
            {sectionLink("projects", "Projects ⁰⁴")}
            {sectionLink("expertise", "Expertise")}
            {sectionLink("experience", "Background")}
            {sectionLink("about", "About")}
          </nav>

          <a
            className={styles.contactButton}
            href="mailto:ervinosmani3@gmail.com"
          >
            Let&apos;s connect <span>↗</span>
          </a>

          <button
            className={styles.mobileToggle}
            aria-expanded={menuOpen}
            aria-controls="editorial-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close ✕" : "Menu ☰"}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="editorial-menu"
            className={styles.mobileNav}
            aria-label="Mobile navigation"
          >
            {sectionLink("projects", "Projects")}
            {sectionLink("expertise", "Expertise")}
            {sectionLink("experience", "Background")}
            {sectionLink("about", "About")}
            {sectionLink("contact", "Contact")}
          </nav>
        )}
      </header>

      <main id="main">
        {/* HERO */}
        <section
          className={styles.hero}
          aria-labelledby="hero-heading"
        >
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              <span className={styles.pulse} />
              FULL-STACK WEB / PYTHON AUTOMATION
            </p>

            <h1 id="hero-heading">
              MAKING
              <br />
              <span className={styles.blue}>
                IDEAS <b>✳</b>
              </span>
              <br />
              <span className={styles.outline}>
                WORK.
              </span>
            </h1>

            <div className={styles.heroBottom}>
              <p>
                I&apos;m <strong>Ervin Osmani</strong>, a
                software developer turning ideas into useful
                applications, clear interfaces and practical
                automations.
              </p>

              <div className={styles.heroActions}>
                <a
                  className={styles.darkButton}
                  href="#projects"
                  onClick={(event) =>
                    navigate(event, "projects")
                  }
                >
                  See selected work ↘
                </a>

                <a
                  className={styles.outlineButton}
                  href="https://github.com/ervinosmani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore GitHub ↗
                </a>
              </div>
            </div>

            <a
              className={styles.scrollCue}
              href="#projects"
              onClick={(event) =>
                navigate(event, "projects")
              }
            >
              — &nbsp; Scroll to explore ↓
            </a>
          </div>

          <div
            className={styles.poster}
            role="img"
            aria-label="Original editorial graphic representing building and shipping software"
          >
            <div className={styles.posterTop}>
              <span>ER/O — DIGITAL CRAFT</span>
              <span>001 — 026</span>
            </div>

            <div className={styles.orbitOne} />
            <div className={styles.orbitTwo} />

            <span
              className={`${styles.sticker} ${styles.stickerOne}`}
            >
              01 / Web apps
            </span>

            <span
              className={`${styles.sticker} ${styles.stickerTwo}`}
            >
              02 / Backend
            </span>

            <span
              className={`${styles.sticker} ${styles.stickerThree}`}
            >
              03 / Automation
            </span>

            <div className={styles.posterCard}>
              <span>BUILD</span>
              <span>↗</span>
              <span>SHIP</span>
            </div>

            <div className={styles.posterFoot}>
              <span>LOGIC + CURIOSITY + EXECUTION</span>
              <strong>✳</strong>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY STRIP */}
        <div className={styles.ribbon}>
          <span>DESIGN-LED DEVELOPMENT</span>
          <i>✳</i>
          <span>FRONTEND &amp; BACKEND</span>
          <i>✳</i>
          <span>PYTHON &amp; WORKFLOWS</span>
          <i>✳</i>
          <span>PROBLEM SOLVING</span>
        </div>

        {/* PROJECTS */}
        <ProjectsSection />

        {/* EXPERTISE */}
        <section
          id="expertise"
          className={styles.skillsSection}
          aria-labelledby="expertise-heading"
        >
          <div className={styles.inner}>
            <div className={styles.sectionIntro}>
              <div>
                <p className={styles.sectionLabel}>
                  02 — THE TOOLKIT
                </p>

                <h2 id="expertise-heading">
                  A stack that
                  <br />
                  <em>makes sense.</em>
                </h2>
              </div>

              <p>
                Different tools, one goal:
                <br />
                <strong>
                  build software people can use.
                </strong>
              </p>
            </div>

            <div className={styles.skillGrid}>
              {expertise.map((item) => (
                <article
                  className={styles.skill}
                  key={item.no}
                >
                  <span>/{item.no}</span>

                  <div className={styles.skillSymbol}>
                    {item.symbol}
                  </div>

                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                  <small>{item.tools}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          className={styles.section}
          aria-labelledby="experience-heading"
        >
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.sectionLabel}>
                03 — THE PATH
              </p>

              <h2 id="experience-heading">
                Experience
                <br />
                &amp; foundations<span>.</span>
              </h2>
            </div>

            <p>
              Hands-on work, teaching
              <br />
              <strong>and continuous learning.</strong>
            </p>
          </div>

          <div className={styles.timeline}>
            {experience.map(
              ([num, title, organization, desc]) => (
                <article key={num}>
                  <span>{num}</span>

                  <div>
                    <h3>{title}</h3>
                    <p>{organization}</p>
                  </div>

                  <p>{desc}</p>
                </article>
              )
            )}
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className={styles.aboutSection}
          aria-labelledby="about-heading"
        >
          <div className={styles.aboutInner}>
            <div
              className={styles.aboutArt}
              aria-hidden="true"
            >
              <small>A NOTE FROM THE DEVELOPER</small>

              <strong>
                EO<span>✳</span>
              </strong>

              <p>
                CURIOUS BY DEFAULT.
                <br />
                ALWAYS BUILDING.
              </p>
            </div>

            <div>
              <p className={styles.sectionLabel}>
                04 — BEHIND THE CODE
              </p>

              <h2 id="about-heading">
                Curiosity is
                <br />
                part of the <em>process.</em>
              </h2>

              <p>
                I enjoy the space between solving a
                technical problem and making the solution
                feel simple to use.
              </p>

              <p>
                My work spans web interfaces, server-side
                applications and private Python automation
                experiments. I value readable code, useful
                decisions and learning from real challenges.
              </p>

              <a
                href="https://rs.linkedin.com/in/ervin-osmani-5880941bb"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find me on LinkedIn ↗
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className={styles.contactSection}
          aria-labelledby="contact-heading"
        >
          <div className={styles.contactInner}>
            <div>
              <p className={styles.sectionLabel}>
                05 — LET&apos;S TALK
              </p>

              <h2 id="contact-heading">
                GOT A GOOD
                <br />
                <em>CHALLENGE?</em>
              </h2>

              <p>
                Open to development opportunities and
                conversations about useful software.
              </p>
            </div>

            <div>
              <a
                className={styles.contactArrow}
                href="mailto:ervinosmani3@gmail.com"
                aria-label="Send Ervin an email"
              >
                ↗
              </a>

              <a
                className={styles.email}
                href="mailto:ervinosmani3@gmail.com"
              >
                ervinosmani3@gmail.com
              </a>

              <small>
                Email is the fastest way to reach me.
              </small>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <a
          href="#top"
          onClick={(event) =>
            navigate(event, "top")
          }
        >
          EO<span>.</span>
        </a>

        <p>
          © {new Date().getFullYear()} Ervin Osmani ·
          Made with intention.
        </p>

        <div>
          <a
            href="https://github.com/ervinosmani"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>

          <a
            href="https://rs.linkedin.com/in/ervin-osmani-5880941bb"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>

          <a
            href="#top"
            onClick={(event) =>
              navigate(event, "top")
            }
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
