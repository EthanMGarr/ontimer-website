"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_STORE_URL } from "@/lib/constants";
import { AppStoreQRPopover } from "./AppStoreQRPopover";

const navGroups = [
  {
    label: "Product",
    href: "/features",
    items: [
      {
        href: "/features",
        label: "Features",
        description: "What OnTimer does",
      },
      {
        href: "/how-it-works",
        label: "How It Works",
        description: "Connect calendars, get alarms",
      },
    ],
  },
  {
    label: "Calculators",
    href: "/what-time-should-i-leave",
    items: [
      {
        href: "/airport-time-to-leave-calculator",
        label: "Airport Time To Leave",
        description: "When to leave for your flight",
      },
      {
        href: "/what-time-should-i-leave",
        label: "What Time Should I Leave",
        description: "Everyday leave-time planning",
      },
      {
        href: "/wake-up-time-calculator",
        label: "Wake-Up Time",
        description: "Work backward from when you leave",
      },
      {
        href: "/airport-theory-calculator",
        label: "Airport Theory",
        description: "How risky is cutting it close?",
      },
    ],
  },
  {
    label: "Learn",
    href: "/why-calendar-notifications-fail",
    items: [
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
    ],
  },
];

function trackNavClick(label: string) {
  if (typeof window === "undefined") return;
  const g = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;
  if (label === "Airport Time To Leave") {
    g("event", "airport_calculator_nav_click", {
      page_path: window.location.pathname,
    });
  }
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="OnTimer home"
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

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  aria-expanded={openGroup === group.label}
                  onFocus={() => setOpenGroup(group.label)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setOpenGroup(null);
                  }}
                >
                  {group.label}
                  <span className="text-xs text-zinc-600" aria-hidden="true">
                    ▾
                  </span>
                </button>

                {openGroup === group.label ? (
                  <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/40">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-xl px-3 py-3 transition-colors hover:bg-zinc-900"
                          onClick={() => {
                            setOpenGroup(null);
                            trackNavClick(item.label);
                          }}
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
            ))}

            <Link
              href="/faq"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              onClick={() => setOpenGroup(null)}
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
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {group.label}
                  </p>
                  <div className="grid gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-xl px-1 py-2 text-sm font-medium text-zinc-300"
                        onClick={() => {
                          setMobileOpen(false);
                          trackNavClick(item.label);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link
                href="/faq"
                className="block rounded-xl px-1 py-2 text-sm font-medium text-zinc-300"
                onClick={() => setMobileOpen(false)}
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
