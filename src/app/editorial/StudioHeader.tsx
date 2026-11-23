"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./StudioHeader.module.css";

const navigation = [
  { label: "Work", href: "/case-studies" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Shared accessible navigation for Work and Resume. Deep-dive articles retain their own contextual navigation. */
export default function StudioHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    }
    function onOutsidePointer(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;
      if (!menuRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onOutsidePointer);
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerdown", onOutsidePointer); };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.identity} href="/">
          <span className={styles.monogram}>EO</span>
          <span className={styles.identityCaption}>ERVIN OSMANI<span>SOFTWARE DEVELOPMENT</span></span>
        </Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <button className={styles.toggle} ref={toggleRef} type="button" aria-controls="studio-mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? "Close menu" : "Menu"}<span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
      <nav className={styles.mobileNav} id="studio-mobile-navigation" data-open={open ? "true" : "false"} aria-label="Mobile navigation" ref={menuRef}>
        {navigation.map((item, index) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}><span aria-hidden="true">0{index + 1}</span>{item.label}<span aria-hidden="true">↗</span></Link>)}
      </nav>
    </header>
  );
}
