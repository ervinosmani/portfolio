"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for links to sections in the current document.
 * Regular routes, external URLs and native Skip to content links are untouched.
 * Scroll is cancellable and immediately respects reduced-motion preferences.
 */
export default function SmoothAnchorNavigation() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeFrame = 0;

    const cancel = () => {
      if (activeFrame) window.cancelAnimationFrame(activeFrame);
      activeFrame = 0;
    };

    const focusTarget = (target: HTMLElement) => {
      const suppliedTabindex = target.hasAttribute("tabindex");
      if (!suppliedTabindex) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
      target.focus({ preventScroll: true });
    };

    const scrollToFragment = (fragment: string, updateHistory: boolean) => {
      let id: string;
      try { id = decodeURIComponent(fragment.slice(1)); } catch { return false; }
      if (!id) return false;
      const target = document.getElementById(id);
      if (!target) return false;
      const isTop = id === "top";
      const margin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
      const destination = isTop ? 0 : Math.min(
        Math.max(0, target.getBoundingClientRect().top + window.scrollY - margin),
        Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      );
      cancel();
      if (updateHistory && window.location.hash !== fragment) {
        window.history.pushState(null, "", fragment);
      }
      const start = window.scrollY;
      const distance = destination - start;
      if (reducedMotion.matches || Math.abs(distance) < 2) {
        window.scrollTo(0, destination);
        if (!isTop) focusTarget(target);
        return true;
      }
      // Large moves take longer, while short local jumps remain responsive.
      const duration = Math.min(2100, Math.max(1100, 1050 + Math.abs(distance) * 0.23));
      let startTime: number | null = null;
      const advance = (time: number) => {
        if (startTime === null) startTime = time;
        const fraction = Math.min(1, (time - startTime) / duration);
        const eased = fraction < 0.5
          ? 4 * fraction * fraction * fraction
          : 1 - Math.pow(-2 * fraction + 2, 3) / 2;
        window.scrollTo(0, start + distance * eased);
        if (fraction < 1) activeFrame = window.requestAnimationFrame(advance);
        else {
          activeFrame = 0;
          if (!isTop) focusTarget(target);
        }
      };
      activeFrame = window.requestAnimationFrame(advance);
      return true;
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const element = event.target;
      if (!(element instanceof Element)) return;
      const link = element.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      // A skip link must remain immediate for keyboard/screen-reader users.
      if (link.hash === "#main" || link.textContent?.trim().toLowerCase() === "skip to content") return;
      const requested = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);
      if (requested.origin !== current.origin || requested.pathname !== current.pathname || requested.search !== current.search || !requested.hash) return;
      let targetId: string;
      try { targetId = decodeURIComponent(requested.hash.slice(1)); } catch { return; }
      if (!document.getElementById(targetId)) return;
      event.preventDefault();
      // Mobile menus close in React's click handler: measure positions after that commit.
      cancel();
      activeFrame = window.requestAnimationFrame(() => {
        activeFrame = 0;
        scrollToFragment(requested.hash, true);
      });
    };

    // History traversal is not an explicit anchor click. Leave scroll position
    // restoration to the browser/Next.js instead of animating toward a hash.
    const onHistory = () => cancel();

    document.documentElement.setAttribute("data-smooth-anchors", "ready");
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("pagehide", cancel);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("pointerdown", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    reducedMotion.addEventListener("change", cancel);
    return () => {
      document.documentElement.removeAttribute("data-smooth-anchors");
      cancel();
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("pagehide", cancel);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("keydown", cancel);
      reducedMotion.removeEventListener("change", cancel);
    };
  }, []);
  return null;
}
