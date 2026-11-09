
"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ProjectMedia.module.css";

type MediaKind = "jobfinder" | "confora";

type MediaConfig = {
  src: string;
  alt: string;
  title: string;
  label: string;
};

const media: Record<MediaKind, MediaConfig> = {
  jobfinder: {
    src: "/projects/job-finder.png",
    alt: "Screenshot of the Vue Job Finder application interface",
    title: "Vue Job Finder",
    label: "Project interface screenshot",
  },
  confora: {
    src: "/projects/confora-hero.png",
    alt: "Confora website's published hero artwork showing a transport truck in a mountain setting",
    title: "Confora Transport",
    label: "Visual published on the Confora website",
  },
};

export default function ProjectMedia({
  kind,
}: {
  kind: MediaKind;
}) {
  const [status, setStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  const item = media[kind];

  return (
    <figure
      className={`${styles.frame} ${styles[kind]}`}
    >
      <div
        className={styles.browserBar}
        aria-hidden="true"
      >
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>

        <span className={styles.browserName}>
          {item.title}
        </span>

        <span className={styles.browserIcon}>
          ↗
        </span>
      </div>

      <div className={styles.viewport}>
        <div
          className={`${styles.fallback} ${
            status === "ready"
              ? styles.fallbackHidden
              : ""
          }`}
          aria-hidden={status === "ready"}
        >
          {kind === "jobfinder" ? (
            <>
              <small>JOB DISCOVERY / VUE 3</small>

              <strong>
                Find your next opportunity.
              </strong>

              <span>
                SEARCH · FILTER · SAVE
              </span>
            </>
          ) : (
            <>
              <small>
                SWISS PRECISION · EUROPEAN REACH
              </small>

              <strong>CONFORA</strong>

              <span>
                TRANSPORT &amp; LOGISTICS
              </span>
            </>
          )}
        </div>

        {status !== "error" && (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            quality={85}
            className={`${styles.image} ${
              status === "ready"
                ? styles.imageReady
                : ""
            }`}
            onLoad={() => setStatus("ready")}
            onError={() => setStatus("error")}
          />
        )}
      </div>

      <figcaption className={styles.caption}>
        {status === "ready"
          ? item.label
          : "Editorial preview · visual asset not loaded"}
      </figcaption>
    </figure>
  );
}
