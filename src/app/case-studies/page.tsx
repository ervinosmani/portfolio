import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StudioHeader from "../editorial/StudioHeader";
import StudioFooter from "../editorial/StudioFooter";
import { flagshipProjects, supportingProjects } from "../../content/projects";
import { spatialProjects } from "../../content/spatial-projects";
import { getFlagshipBrief } from "../../content/case-study-briefs";
import { site } from "../../content/site";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
  title: "Selected Work & Engineering Case Studies | Ervin Osmani",
  description: "Six selected engineering projects: Aurelia, CommerceOps, Confora, Vue Job Finder, Blogging Platform and Python automation. Public evidence and private project boundaries are clearly labeled.",
  alternates: { canonical: "/case-studies" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "The Work — Ervin Osmani",
    description: "Aurelia, CommerceOps and four selected projects. Systems, decisions and evidence behind each one.",
    url: `${site.baseUrl}/case-studies`,
    type: "website",
  },
};

const [aurelia, commerce] = flagshipProjects;
const aureliaBrief = getFlagshipBrief("aurelia");
const commerceBrief = getFlagshipBrief("commerceops");
const additionalWork = spatialProjects.filter((item) => !item.flagship);

function ProjectMedia({ projectId }: { projectId: string }) {
  if (projectId === "confora") return <picture>
    <source type="image/webp" srcSet="/projects/confora-hero-480.webp 480w, /projects/confora-hero-960.webp 960w" sizes="(max-width: 700px) 90vw, 23vw" />
    <Image src="/projects/confora-hero.png" alt="Confora multilingual transport website artwork" width={1000} height={560} sizes="(max-width: 700px) 90vw, 23vw" unoptimized loading="eager" fetchPriority="low" />
  </picture>;
  if (projectId === "vue-job-finder") return <Image src="/projects/job-finder.png" alt="Vue Job Finder application interface" width={900} height={520} sizes="(max-width: 700px) 90vw, 23vw" loading="lazy" />;
  if (projectId === "blogging-platform") return <picture>
    <source type="image/webp" srcSet="/blogproject1-480.webp 480w, /blogproject1-960.webp 960w" sizes="(max-width: 700px) 90vw, 23vw" />
    <Image src="/blogproject1.png" alt="Existing Blogging Platform project media" width={900} height={520} sizes="(max-width: 700px) 90vw, 23vw" unoptimized loading="eager" fetchPriority="low" />
  </picture>;
  return <div className={styles.flowGraphic} aria-label="Conceptual three-stage workflow" role="img"><span>Input</span><b aria-hidden="true">→</b><span>Process</span><b aria-hidden="true">→</b><span>Output</span></div>;
}

export default function WorkPage() {
  return (
    <div className={styles.page} id="top">
      <a className={styles.skip} href="#main">Skip to content</a>
      <StudioHeader />
      <main id="main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.topline}><span>Selected engineering / Portfolio</span><span>Six projects · Two deep dives</span></div>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.kicker}>The work behind the interface</p>
                <h1>Ideas become <em>systems.</em></h1>
              </div>
              <div className={styles.heroAside}>
                <p>Interfaces make the work visible. Architecture, decisions and testing make it trustworthy.</p>
                <a href="#featured">Explore flagship projects <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <nav aria-label="Jump to a project" className={styles.projectIndex}>
              {spatialProjects.map((project, index) => <a href={`#${project.id}`} key={project.id}><span>0{index + 1}</span>{project.title}<span aria-hidden="true">↗</span></a>)}
            </nav>
          </div>
        </header>

        <section className={styles.featured} id="featured" aria-labelledby="featured-heading">
          <div className={styles.wrap}>
            <div className={styles.sectionIntro}><span>01 / ENGINEERING DEEP DIVES</span><h2 id="featured-heading">Proven through <em>decisions.</em></h2></div>
            <div className={styles.featuredGrid}>
              <article id="aurelia" className={`${styles.flagshipCard} ${styles.aurelia}`}>
                <div className={styles.cardTop}><span>Personal finance · Correctness</span><span>{aurelia.statusLabel}</span></div>
                <h3>{aurelia.title}<span className={styles.indexNum}> / 01</span></h3>
                <p className={styles.cardLead}>{aureliaBrief.lead}</p>
                <div className={styles.aureliaDiagram} role="img" aria-label="Conceptual depiction of account ownership and accurate transfers; not a live application screenshot"><div className={styles.ringOne} /><div className={styles.ringTwo} /><strong>a.</strong><span>ACCOUNT OWNERSHIP / MONEY MOVEMENT</span></div>
                <p className={styles.caption}>Conceptual visual · Full private finance data and application are not published.</p>
                <div className={styles.principles}>{aureliaBrief.decisions.map((item, index) => <p key={item.title}><small>0{index + 1}</small><strong>{item.title}</strong><span>{item.explanation}</span></p>)}</div>
                <div className={styles.cardBottom}><Link href={aurelia.caseStudyUrl}>Read Aurelia case study <span aria-hidden="true">↗</span></Link><a href={aurelia.sourceUrl} target="_blank" rel="noopener noreferrer">Curated source <span className={styles.newTab}>(new tab)</span></a></div>
              </article>
              <article id="commerceops" className={`${styles.flagshipCard} ${styles.commerce}`}>
                <div className={styles.cardTop}><span>Inventory · Warehouse operations</span><span>{commerce.statusLabel}</span></div>
                <h3>{commerce.title}<span className={styles.indexNum}> / 02</span></h3>
                <p className={styles.cardLead}>{commerceBrief.lead}</p>
                <div className={styles.imageFrame}><Image src="/projects/commerceops/02-warehouse-operations.png" width={1038} height={650} alt="CommerceOps warehouse operations interface with demonstration data" sizes="(max-width: 800px) 90vw, 45vw" loading="lazy" /></div>
                <p className={styles.caption}>Real local engineering MVP interface · Sample data · Private repository.</p>
                <div className={styles.principles}>{commerceBrief.decisions.map((item, index) => <p key={item.title}><small>0{index + 1}</small><strong>{item.title}</strong><span>{item.explanation}</span></p>)}</div>
                <div className={styles.cardBottom}><Link href={commerce.caseStudyUrl}>Read CommerceOps case study <span aria-hidden="true">↗</span></Link><span>Locally demonstrated · Not a public SaaS</span></div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.archive} aria-labelledby="archive-title">
          <div className={styles.wrap}>
            <div className={styles.sectionIntro}><span>02 / ADDITIONAL WORK</span><h2 id="archive-title">More applications. <em>Different constraints.</em></h2></div>
            <div className={styles.archiveGrid}>
              {additionalWork.map((project, index) => {
                const registered = supportingProjects.find((item) => item.id === project.id);
                return (
                  <article className={styles.archiveCard} id={project.id} key={project.id}>
                    <div className={styles.archiveTop}><span>0{index + 3} / {project.eyebrow}</span><span aria-hidden="true">↗</span></div>
                    <h3>{project.title}</h3>
                    <p>{registered?.summary ?? project.description}</p>
                    <div className={styles.archiveImage}><ProjectMedia projectId={project.id} /></div>
                    <p className={styles.mediaNote}>{project.imageDisclosure ?? "Illustration only · Private workflow details withheld"}</p>
                    <div className={styles.archiveDetail}>
                      <strong>{project.status}</strong>
                      <p>{registered?.limitation ?? (project.id === "confora" ? "Public transport website preview. Exact contribution and permission remain to be confirmed before final publication." : "Private scripting and workflow exploration. No confidential workflows, code or client data are disclosed.")}</p>
                    </div>
                    <div className={styles.archiveActions}>
                      {project.id === "confora" && <a href="https://confora.netlify.app/en" target="_blank" rel="noopener noreferrer">Public website preview (new tab) ↗</a>}
                      {registered?.sourceUrl && <a href={registered.sourceUrl} target="_blank" rel="noopener noreferrer">View public source (new tab) ↗</a>}
                      {project.id === "private-work" && <a href={`mailto:${site.email}`}>Ask about general workflow experience ↗</a>}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-heading"><div className={styles.wrap}>
          <p className={styles.kicker}>Continue the conversation</p>
          <h2 id="closing-heading">Curious about <em>the decisions?</em></h2>
          <div className={styles.closingLinks}><a href={`mailto:${site.email}`}>Get in touch ↗</a><Link href="/resume">Explore my background ↗</Link><Link href="/">Back to portfolio ↗</Link></div>
        </div></section>
      </main>
      <StudioFooter />
    </div>
  );
}
