
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./EditorialNavigation.module.css";

export default function EditorialNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    // The redesign homepage handles its own navigation.
    // This handler is only needed on Case Studies.
    if (
      pathname !== "/case-studies" &&
      pathname !== "/case-studies/"
    ) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor =
        event.target.closest<HTMLAnchorElement>("a[href]");

      if (!anchor?.closest("[data-editorial-shell]")) {
        return;
      }

      if (
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")
      ) {
        return;
      }

      const url = new URL(
        anchor.href,
        window.location.href
      );

      // Cross-page and external links use normal navigation.
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search ||
        !url.hash ||
        url.hash === "#main"
      ) {
        return;
      }

      let id: string;

      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }

      const target = document.getElementById(id);

      if (!target) return;

      event.preventDefault();

      const header =
        document.querySelector<HTMLElement>(
          "[data-editorial-shell] header"
        );

      const headerOffset =
        id === "top"
          ? 0
          : (header?.getBoundingClientRect().height ?? 0) +
            12;

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

      const top = Math.min(
        maxScroll,
        Math.max(0, targetPosition)
      );

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.history.pushState(
        null,
        "",
        url.hash
      );

      window.scrollTo({
        top,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  if (
    pathname !== "/case-studies" &&
    pathname !== "/case-studies/"
  ) {
    return null;
  }

  return (
    <>
      <nav
        className={styles.mobileIndex}
        aria-label="Case study shortcuts"
      >
        <a href="#blogging-platform">Blogging</a>
        <a href="#vue-job-finder">Job Finder</a>
        <a href="#confora">Confora</a>

        <Link href="/#projects">
          Portfolio ↗
        </Link>
      </nav>

      <div
        className={styles.mobileSpacer}
        aria-hidden="true"
      />
    </>
  );
}
