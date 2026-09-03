"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_STORE_URL } from "@/lib/constants";
import { AppStoreQRPopover } from "./AppStoreQRPopover";

const popularAirports = [
  { href: "/airport-time-to-leave/newark-ewr", label: "Newark", meta: "EWR" },
  { href: "/airport-time-to-leave/jfk", label: "JFK", meta: "New York" },
  { href: "/airport-time-to-leave/laguardia-lga", label: "LaGuardia", meta: "LGA" },
  { href: "/airport-time-to-leave/los-angeles-lax", label: "LAX", meta: "Los Angeles" },
  { href: "/airport-time-to-leave/atlanta-atl", label: "Atlanta", meta: "ATL" },
  { href: "/airport-time-to-leave/chicago-ohare-ord", label: "Chicago O'Hare", meta: "ORD" },
];

const learnLinks = [
  {
    href: "/why-calendar-notifications-fail",
    label: "Why Notifications Fail",
    description: "Why reminders disappear before you act",
  },
  {
    href: "/last-5-minutes-problem",
    label: "Last 5 Minutes Problem",
    description: "The gap between knowing and moving",
  },
  {
    href: "/calendar-notifications-vs-alarms",
    label: "Notifications vs Alarms",
    description: "Why alarms work differently",
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Guides for staying on time",
  },
];

type OpenMenu = "time-calculators" | "learn" | null;

function trackNavClick(label: string) {
  if (typeof window === "undefined") return;
  const g = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  if (label.includes("Airport")) {
    g("event", "airport_calculator_nav_click", {
      page_path: window.location.pathname,
    });
  }
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path d="M4.22 6.03a.75.75 0 0 1 1.06 0L8 8.75l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.09a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path d="M5.47 3.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06L8.69 8 5.47 4.78a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="OnTimer home"
            onClick={closeMenus}
          >
            <Image
              src="/images/ontimer_1024x1024.png"
              alt=""
              width={34}
              height={34}
              className="rounded-xl"
              priority
            />
            <span className="text-xl font-semibold tracking-tight text-white">
              OnTimer
            </span>
          </Link>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Main navigation"
          >
            <Link
              href="/features"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              onClick={closeMenus}
            >
              Product
            </Link>

            <div
              className="relative"
              onMouseEnter={() => {
                setOpenMenu("time-calculators");
              }}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                aria-expanded={openMenu === "time-calculators"}
                onFocus={() => {
                  setOpenMenu("time-calculators");
                }}
                onClick={() =>
                  setOpenMenu((current) =>
                    current === "time-calculators" ? null : "time-calculators"
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Escape") setOpenMenu(null);
                }}
              >
                Time Calculators
                <span className="text-zinc-600" aria-hidden="true">
                  <Chevron />
                </span>
              </button>

              {openMenu === "time-calculators" ? (
                <div className="absolute left-1/2 top-full z-50 w-[42rem] -translate-x-1/2 pt-3">
                  <div className="grid grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
                    <div className="border-r border-zinc-800 p-2">
                      <Link
                        href="/airport-time-to-leave-calculator"
                        className="block rounded-xl px-3 py-3 transition-colors hover:bg-zinc-900"
                        onClick={() => {
                          closeMenus();
                          trackNavClick("When Should I Leave for the Airport");
                        }}
                      >
                        <span className="flex gap-2">
                          <span aria-hidden="true">✈</span>
                          <span>
                            <span className="block text-sm font-semibold text-white">
                              When should I leave for the airport?
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
                              Get a personalized leave time
                            </span>
                          </span>
                        </span>
                      </Link>
                      <Link
                        href="/airport-time-calculators"
                        className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-zinc-900"
                        onClick={() => {
                          closeMenus();
                          trackNavClick("Airport Guides & Calculators");
                        }}
                      >
                        <span className="flex gap-2">
                          <span aria-hidden="true">✈</span>
                          <span>
                            <span className="block text-sm font-semibold text-white">
                              Airport Guides & Calculators
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
                              Popular airport-specific pages
                            </span>
                          </span>
                        </span>
                        <span className="text-zinc-600 transition-colors group-hover:text-emerald-300">
                          <ArrowRight />
                        </span>
                      </Link>
                      <Link
                        href="/cruise-terminal-time-calculators"
                        className="block rounded-xl px-3 py-3 transition-colors hover:bg-zinc-900"
                        onClick={closeMenus}
                      >
                        <span className="flex gap-2">
                          <span aria-hidden="true">🚢</span>
                          <span>
                            <span className="block text-sm font-semibold text-white">
                              Cruise Terminal Time Calculator
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
                              Boarding windows, ports, luggage and parking
                            </span>
                          </span>
                        </span>
                      </Link>
                      <Link
                        href="/wake-up-time-calculator"
                        className="block rounded-xl px-3 py-3 transition-colors hover:bg-zinc-900"
                        onClick={closeMenus}
                      >
                        <span className="flex gap-2">
                          <span aria-hidden="true">⏰</span>
                          <span>
                            <span className="block text-sm font-semibold text-white">
                              Wake-Up Time Calculator
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
                              Work backward from when you need to move
                            </span>
                          </span>
                        </span>
                      </Link>
                      <Link
                        href="/what-time-should-i-leave"
                        className="block rounded-xl px-3 py-3 transition-colors hover:bg-zinc-900"
                        onClick={closeMenus}
                      >
                        <span className="flex gap-2">
                          <span aria-hidden="true">🚗</span>
                          <span>
                            <span className="block text-sm font-semibold text-white">
                              Leave-Time Calculator
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
                              Everyday events, appointments and arrivals
                            </span>
                          </span>
                        </span>
                      </Link>
                      <Link
                        href="/how-to-remember-medication-on-time"
                        className="block rounded-xl px-3 py-3 transition-colors hover:bg-zinc-900"
                        onClick={closeMenus}
                      >
                        <span className="flex gap-2">
                          <span aria-hidden="true">＋</span>
                          <span>
                            <span className="block text-sm font-semibold text-white">
                              Medication Schedule Maker
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
                              Build one calendar-ready dose schedule
                            </span>
                          </span>
                        </span>
                      </Link>
                      <div className="my-1 border-t border-zinc-800" />
                      <Link
                        href="/time-calculators"
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-emerald-300 transition-colors hover:bg-zinc-900"
                        onClick={closeMenus}
                      >
                        Browse All Calculators
                        <ArrowRight />
                      </Link>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Popular Airports
                      </p>
                      <div className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                        {popularAirports.map((location) => (
                          <Link
                            key={location.href}
                            href={location.href}
                            className="group"
                            onClick={() => {
                              closeMenus();
                              trackNavClick(location.label);
                            }}
                          >
                            <span className="block text-sm font-semibold text-white transition-colors group-hover:text-emerald-300">
                              {location.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-zinc-500">
                              {location.meta}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/airport-time-calculators"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
                        onClick={closeMenus}
                      >
                        More Airports
                        <ArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("learn")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                aria-expanded={openMenu === "learn"}
                onFocus={() => setOpenMenu("learn")}
                onClick={() =>
                  setOpenMenu((current) => (current === "learn" ? null : "learn"))
                }
                onKeyDown={(event) => {
                  if (event.key === "Escape") setOpenMenu(null);
                }}
              >
                Learn
                <span className="text-zinc-600" aria-hidden="true">
                  <Chevron />
                </span>
              </button>

              {openMenu === "learn" ? (
                <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/40">
                    {learnLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-3 transition-colors hover:bg-zinc-900"
                        onClick={closeMenus}
                      >
                        <span className="block text-sm font-semibold text-white">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <Link
              href="/faq"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              onClick={closeMenus}
            >
              FAQ
            </Link>
          </nav>

          <AppStoreQRPopover placement="below" location="header_desktop">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 md:block"
            >
              Download
            </a>
          </AppStoreQRPopover>

          <button
            className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-zinc-800 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-zinc-800 py-5 md:hidden">
            <nav className="space-y-6" aria-label="Mobile navigation">
              <Link
                href="/features"
                className="block rounded-xl px-1 py-2 text-sm font-medium text-zinc-300"
                onClick={closeMenus}
              >
                Product
              </Link>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Time Calculators
                </p>
                <div className="grid gap-1">
                  {[
                    ["When to Leave for the Airport", "/airport-time-to-leave-calculator"],
                    ["Airport Guides & Calculators", "/airport-time-calculators"],
                    ["Cruise Terminal Time Calculator", "/cruise-terminal-time-calculators"],
                    ["Wake-Up Time Calculator", "/wake-up-time-calculator"],
                    ["Leave-Time Calculator", "/what-time-should-i-leave"],
                    ["Browse All Calculators", "/time-calculators"],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="rounded-xl px-1 py-2 text-sm font-medium text-zinc-300"
                      onClick={() => {
                        closeMenus();
                        trackNavClick(label);
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Learn
                </p>
                <div className="grid gap-1">
                  {learnLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl px-1 py-2 text-sm font-medium text-zinc-300"
                      onClick={closeMenus}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/faq"
                className="block rounded-xl px-1 py-2 text-sm font-medium text-zinc-300"
                onClick={closeMenus}
              >
                FAQ
              </Link>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-black"
              >
                Download
              </a>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
