"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { trackToolNavigationClick, trackToolsMenuOpened } from "@/lib/analytics";

const featuredTools = [
  { href: "/what-time-should-i-leave", label: "Time-to-Leave Calculator", note: "When do I need to leave?" },
  { href: "/airport-time-to-leave-calculator", label: "Airport Time-to-Leave", note: "When should I leave for my flight?" },
  { href: "/wake-up-time-calculator", label: "Wake-Up Time Calculator", note: "When should I wake up?" },
  { href: "/days-until", label: "Days Until Calculator", note: "How long until an important date?" },
] as const;

const browseGroups = [
  { href: "/time-calculators#leave-time", label: "Leave-time calculators", note: "Trips, airports, pickups, cruises and venues" },
  { href: "/airport-pickup-time-calculator", label: "Airport Pickup Calculator", note: "When should I leave to pick someone up?" },
  { href: "/airport-pickup-calculators", label: "Airport Pickup Guides", note: "Search 12 airports with reviewed local guidance" },
  { href: "/time-calculators#wake-countdowns", label: "Wake-up & countdowns", note: "Wake-up times and important dates" },
  { href: "/time-calculators#medication-schedules", label: "Medication schedules", note: "Plans for you, someone you support or a pet" },
  { href: "/time-calculators#deadlines", label: "Deadlines & due dates", note: "Estimated tax dates and reminders" },
] as const;

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
          <Image src="/images/ontimer-menu-icon.png" alt="" width={40} height={40} sizes="40px" />
          <span>OnTimer</span>
        </Link>
        <nav className="hp2-nav" aria-label="Main navigation">
          <Link href="/#how-it-works">How it works</Link>
          <button
            ref={toolsButtonRef}
            type="button"
            aria-expanded={toolsOpen}
            aria-controls={toolsId}
            onClick={() => setToolsOpen((current) => {
              if (!current) trackToolsMenuOpened("desktop_menu");
              return !current;
            })}
          >
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
            <section className="hp2-tools-menu__featured">
              <h2>Most-used tools</h2>
              <div className="hp2-tools-menu__featured-grid">
                {featuredTools.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => trackToolNavigationClick("desktop_menu", "featured", link.href, index + 1)}
                  >
                    <strong>{link.label}</strong><span>{link.note}</span>
                  </Link>
                ))}
              </div>
            </section>
            <section className="hp2-tools-menu__browse">
              <h2>Browse by need</h2>
              {browseGroups.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => trackToolNavigationClick("desktop_menu", "browse_by_need", link.href, index + 1)}
                >
                  <strong>{link.label}</strong><span>{link.note}</span>
                </Link>
              ))}
            </section>
            <Link
              href="/time-calculators"
              className="hp2-tools-menu__all"
              onClick={() => trackToolNavigationClick("desktop_menu", "all_tools", "/time-calculators", 1)}
            ><span>All OnTimer tools</span><strong>Browse the complete toolset →</strong></Link>
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
            onClick={() => setMobileToolsOpen((current) => {
              if (!current) trackToolsMenuOpened("mobile_menu");
              return !current;
            })}
          >
            <span>Tools</span>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
          </button>
          {mobileToolsOpen ? (
            <div className="hp2-mobile-tools" id={mobileToolsId}>
              <section>
                <h2>Most-used tools</h2>
                {featuredTools.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      trackToolNavigationClick("mobile_menu", "featured", link.href, index + 1);
                      closeMobileNavigation();
                    }}
                  >{link.label}</Link>
                ))}
              </section>
              <section>
                <h2>Browse by need</h2>
                {browseGroups.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      trackToolNavigationClick("mobile_menu", "browse_by_need", link.href, index + 1);
                      closeMobileNavigation();
                    }}
                  >{link.label}</Link>
                ))}
              </section>
              <Link
                href="/time-calculators"
                className="hp2-mobile-tools__all"
                onClick={() => {
                  trackToolNavigationClick("mobile_menu", "all_tools", "/time-calculators", 1);
                  closeMobileNavigation();
                }}
              >Browse all tools <span aria-hidden="true">→</span></Link>
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
