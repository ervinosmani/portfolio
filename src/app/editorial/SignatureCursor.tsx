"use client";

import { useEffect, useRef } from "react";
import styles from "./SignatureCursor.module.css";

/** Decorative enhancement: no hit testing, no extra React rerenders on move. */
export default function SignatureCursor() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    const label = labelRef.current;
    if (!node || !label) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const noMotionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;
    let frame = 0;
    let position = { x: 0, y: 0 };
    let destination = { x: 0, y: 0 };
    let lastLabel = "";

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const animate = () => {
      const dx = destination.x - position.x;
      const dy = destination.y - position.y;
      position.x += dx * 0.21;
      position.y += dy * 0.21;
      node.style.transform = `translate3d(${position.x}px,${position.y}px,0) translate(-50%,-50%)`;
      if (Math.abs(dx) + Math.abs(dy) > 0.45) frame = requestAnimationFrame(animate);
      else frame = 0;
    };

    const hide = () => {
      stop();
      node.dataset.visible = "false";
      node.dataset.interactive = "false";
      node.dataset.pressed = "false";
      document.documentElement.removeAttribute("data-signature-cursor");
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const editable = event.target instanceof Element
        ? event.target.closest("input, textarea, select, [contenteditable='true']")
        : null;
      if (editable) { hide(); return; }
      destination = { x: event.clientX, y: event.clientY };
      if (node.dataset.visible !== "true") {
        position = { ...destination };
        node.style.transform = `translate3d(${position.x}px,${position.y}px,0) translate(-50%,-50%)`;
        node.dataset.visible = "true";
        document.documentElement.setAttribute("data-signature-cursor", "active");
      }
      const hovered = event.target instanceof Element
        ? event.target.closest<HTMLElement>("a, button, [role='button'], [data-cursor-label]")
        : null;
      node.dataset.interactive = hovered ? "true" : "false";
      const nextLabel = hovered?.dataset.cursorLabel?.slice(0, 12).toUpperCase() ?? "";
      if (lastLabel !== nextLabel) {
        label.textContent = nextLabel;
        node.dataset.hasLabel = nextLabel ? "true" : "false";
        lastLabel = nextLabel;
      }
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const onDown = () => { node.dataset.pressed = "true"; };
    const onUp = () => { node.dataset.pressed = "false"; };

    const sync = () => {
      const shouldEnable = finePointer.matches && noMotionPreference.matches && !reducedMotion.matches;
      if (enabled === shouldEnable) return;
      enabled = shouldEnable;
      if (enabled) {
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });
        document.addEventListener("pointerleave", hide);
        window.addEventListener("blur", hide);
      } else {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
        hide();
      }
    };

    finePointer.addEventListener("change", sync);
    noMotionPreference.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    sync();
    return () => {
      if (enabled) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
      }
      finePointer.removeEventListener("change", sync);
      noMotionPreference.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      hide();
    };
  }, []);

  return (
    <div className={styles.cursor} ref={nodeRef} data-visible="false" data-interactive="false" data-pressed="false" data-has-label="false" aria-hidden="true">
      <span className={styles.core} />
      <span className={styles.label} ref={labelRef} />
    </div>
  );
}
