"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";

const toolGroups = [
  { title: "Know when to leave", links: [
    { href: "/what-time-should-i-leave", label: "Leave-time calculator", note: "Plan any appointment or arrival" },
    { href: "/wake-up-time-calculator", label: "Wake-up calculator", note: "Work backward from when you must leave" },
  ] },
  { title: "Prepare for travel", links: [
    { href: "/airport-time-to-leave-calculator", label: "Airport calculator", note: "Get a personalized airport leave time" },
    { href: "/cruise-terminal-time-calculators", label: "Cruise calculator", note: "Plan around boarding and the port" },
  ] },
  { title: "Build a medication schedule", links: [
    { href: "/medication-schedule", label: "Personal schedule", note: "Create a clear calendar-ready plan" },
    { href: "/caregiver-medication-schedule", label: "Caregiver schedule", note: "Prepare and share a private schedule" },
    { href: "/veterinary-medication-schedule", label: "Pet schedule", note: "Keep recurring pet doses organized" },
  ] },
];

export function Homepage2Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const toolsId = useId();
  const toolsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setToolsOpen(false); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setToolsOpen(false); setMobileOpen(false); }
    };
    const dismissTools = (event: MouseEvent) => {
      const target = event.target as Node;
      const menu = document.getElementById(toolsId);
      if (toolsOpen && !toolsButtonRef.current?.contains(target) && !menu?.contains(target)) setToolsOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("mousedown", dismissTools);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("mousedown", dismissTools);
    };
  }, [toolsId, toolsOpen]);

  return (
    <header className="hp2-header">
      <div className="hp2-header__bar">
        <Link href="/homepage2" className="hp2-brand" aria-label="OnTimer home">
          <Image src="/images/homepage2/ontimer-icon-blue.png" alt="" width={40} height={40} priority />
          <span>OnTimer</span>
        </Link>
        <nav className="hp2-nav" aria-label="Main navigation">
          <Link href="/homepage2#how-it-works">How it works</Link>
          <button ref={toolsButtonRef} type="button" aria-expanded={toolsOpen} aria-controls={toolsId} onClick={() => setToolsOpen((current) => !current)}>
            Tools <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
          </button>
          <Link href="/why-calendar-notifications-fail">Learn</Link>
        </nav>
        <div className="hp2-header__action"><Homepage2DownloadCTA location="homepage2_header" compact /></div>
        <button type="button" className="hp2-mobile-toggle" aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} onClick={() => setMobileOpen((current) => !current)}><span /><span /></button>
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
        <nav className="hp2-mobile-nav" aria-label="Mobile navigation">
          <Link href="/homepage2#how-it-works">How it works</Link><Link href="/homepage2#tools">Tools</Link><Link href="/why-calendar-notifications-fail">Learn</Link><Homepage2DownloadCTA location="homepage2_mobile_menu" />
        </nav>
      ) : null}
    </header>
  );
}
