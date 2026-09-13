"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const toolGroups = [
  { title: "Know when to leave", links: [
    { href: "/what-time-should-i-leave", label: "Time-to-Leave Calculator", note: "Plan any appointment or arrival" },
    { href: "/wake-up-time-calculator", label: "Wake-Up Time Calculator", note: "Work backward from when you must leave" },
  ] },
  { title: "Prepare for travel", links: [
    { href: "/airport-time-to-leave-calculator", label: "Airport Time-to-Leave Calculator", note: "Choose your airport and get a personalized leave time" },
    { href: "/cruise-terminal-time-calculators", label: "Cruise Time-to-Leave Calculator", note: "Choose your port and plan around boarding" },
  ] },
  { title: "Build a medication schedule", links: [
    { href: "/medication-schedule", label: "Personal Medication Schedule", note: "Create a clear calendar-ready plan" },
    { href: "/caregiver-medication-schedule", label: "Caregiver Medication Schedule", note: "Prepare and share a private schedule" },
    { href: "/veterinary-medication-schedule", label: "Pet Medication Schedule", note: "Keep recurring pet doses organized" },
  ] },
];

export function Homepage2Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const pathname = usePathname();
  const toolsId = useId();
  const mobileNavId = useId();
  const mobileToolsId = useId();
  const toolsButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeMobileNavigation = useCallback(() => {
    setMobileOpen(false);
    setMobileToolsOpen(false);
  }, []);

  useEffect(() => {
    setToolsOpen(false);
    closeMobileNavigation();
  }, [closeMobileNavigation, pathname]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToolsOpen(false);
        closeMobileNavigation();
      }
    };
    const dismissMenus = (event: MouseEvent) => {
      const target = event.target as Node;
      const menu = document.getElementById(toolsId);
      if (toolsOpen && !toolsButtonRef.current?.contains(target) && !menu?.contains(target)) setToolsOpen(false);
      if (mobileOpen && !headerRef.current?.contains(target)) closeMobileNavigation();
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("mousedown", dismissMenus);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("mousedown", dismissMenus);
    };
  }, [closeMobileNavigation, mobileOpen, toolsId, toolsOpen]);

  return (
    <header className="hp2-header" ref={headerRef}>
      <div className="hp2-header__bar">
        <Link href="/" className="hp2-brand" aria-label="OnTimer home">
          <Image src="/images/ontimer_1024x1024.png" alt="" width={40} height={40} priority />
          <span>OnTimer</span>
        </Link>
        <nav className="hp2-nav" aria-label="Main navigation">
          <Link href="/#how-it-works">How it works</Link>
          <button ref={toolsButtonRef} type="button" aria-expanded={toolsOpen} aria-controls={toolsId} onClick={() => setToolsOpen((current) => !current)}>
            Tools <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
          </button>
          <Link href="/why-calendar-notifications-fail">Learn</Link>
        </nav>
        <div className="hp2-header__action">
          <LanguageSwitcher compact />
          <div className="hp2-header__download"><Homepage2DownloadCTA location="homepage_header" compact /></div>
        </div>
        <button
          type="button"
          className={`hp2-mobile-toggle ${mobileOpen ? "hp2-mobile-toggle--open" : ""}`}
          aria-expanded={mobileOpen}
          aria-controls={mobileNavId}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => {
            setMobileOpen((current) => !current);
            setMobileToolsOpen(false);
          }}
        ><span /><span /></button>
      </div>
      {toolsOpen ? (
        <div className="hp2-tools-menu" id={toolsId}>
          <div className="hp2-tools-menu__inner">
            {toolGroups.map((group) => (
              <section key={group.title}>
                <h2>{group.title}</h2>
                {group.links.map((link) => <Link key={link.href} href={link.href}><strong>{link.label}</strong><span>{link.note}</span></Link>)}
              </section>
            ))}
            <Link href="/time-calculators" className="hp2-tools-menu__all"><span>All OnTimer tools</span><strong>Browse the complete toolset →</strong></Link>
          </div>
        </div>
      ) : null}
      {mobileOpen ? (
        <nav className="hp2-mobile-nav" id={mobileNavId} aria-label="Mobile navigation">
          <Link href="/#how-it-works" onClick={closeMobileNavigation}>How it works</Link>
          <button
            type="button"
            className="hp2-mobile-nav__tools"
            aria-expanded={mobileToolsOpen}
            aria-controls={mobileToolsId}
            onClick={() => setMobileToolsOpen((current) => !current)}
          >
            <span>Tools</span>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
          </button>
          {mobileToolsOpen ? (
            <div className="hp2-mobile-tools" id={mobileToolsId}>
              {toolGroups.map((group) => (
                <section key={group.title}>
                  <h2>{group.title}</h2>
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href} onClick={closeMobileNavigation}>{link.label}</Link>
                  ))}
                </section>
              ))}
              <Link href="/time-calculators" className="hp2-mobile-tools__all" onClick={closeMobileNavigation}>Browse all tools <span aria-hidden="true">→</span></Link>
            </div>
          ) : null}
          <Link href="/why-calendar-notifications-fail" onClick={closeMobileNavigation}>Learn</Link>
          <div className="hp2-mobile-nav__action">
            <Homepage2DownloadCTA location="homepage_mobile_menu" compact />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
