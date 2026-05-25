"use client";

import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:grid-cols-8">

          {/* Col 1 — Brand (spans 2 on xl) */}
          <div className="xl:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              On<span className="text-green-500">Timer</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Persistent calendar alarms for critical timing moments. Built for
              people who can&apos;t afford to miss what matters.
            </p>
            <p className="mt-2 text-xs text-zinc-500">Aberdeen, NJ</p>
            <div className="mt-6">
              <AppStoreButton size="sm" location="footer" placement="above" />
            </div>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Product
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/features",               label: "Features"            },
                { href: "/how-it-works",           label: "How It Works"        },
                { href: "/faq",                    label: "FAQ"                 },
                { href: "/blog",                   label: "Blog"                },
                { href: "/android",                label: "Android Waitlist"    },
                { href: "/adhd-time-blindness-tools", label: "ADHD Time Blindness" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Key Concepts */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Key Concepts
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/last-5-minutes-problem",       label: "Last 5 Minutes Problem"   },
                { href: "/why-notifications-fail",       label: "Why Notifications Fail"   },
                { href: "/calendar-notifications-vs-alarms", label: "Notifications vs Alarms" },
                { href: "/why-calendar-reminders-fail",  label: "Why Reminders Fail"       },
                { href: "/best-calendar-alarm-app",      label: "Best Calendar Alarm App"  },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Calendar Alarms */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Calendar Alarms
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/turn-calendar-events-into-alarms", label: "Turn Events Into Alarms" },
                { href: "/persistent-calendar-reminders",    label: "Persistent Reminders"    },
                { href: "/calendar-alarm-app",               label: "Calendar Alarm App"      },
                { href: "/loud-calendar-alerts-iphone",      label: "Loud Calendar Alerts"    },
                { href: "/never-be-late-to-meetings",        label: "Never Be Late"           },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Tools */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Tools
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/airport-time-to-leave-calculator", label: "Airport Calculator"        },
                { href: "/what-time-should-i-leave",         label: "Leave-Time Calculator"     },
                { href: "/wake-up-time-calculator",          label: "Wake-Up Calculator"        },
                { href: "/airport-theory-calculator",        label: "Airport Theory Calculator" },
                { href: "/time-to-leave-reminders",          label: "Time-to-Leave Reminders"   },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 6 — Medication */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Medication
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/how-to-remember-medication-on-time",    label: "Remember Medication"      },
                { href: "/why-medication-reminders-fail",         label: "Why Reminders Fail"       },
                { href: "/how-to-set-medication-reminders-iphone", label: "iPhone Setup Guide"      },
                { href: "/help-elderly-parent-remember-medication", label: "Elderly Parent Guide"   },
                { href: "/adhd-medication-timing",                label: "ADHD Medication Timing"   },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 7 — Support & Legal */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@ontimer.app" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  support@ontimer.app
                </a>
              </li>
              <li>
                <a href="mailto:press@ontimer.app" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  press@ontimer.app
                </a>
              </li>
            </ul>

            <h3 className="mb-5 mt-8 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { href: "https://ontimer.app/OnTimer_Privacy_Policy.html",   label: "Privacy Policy"   },
                { href: "https://ontimer.app/OnTimer_Terms_of_Service.html", label: "Terms of Service" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex items-center justify-between border-t border-zinc-800/60 pt-6">
          <p className="text-xs text-zinc-400">© {new Date().getFullYear()} OnTimer</p>
          <Link href="/feed.xml" className="text-xs text-zinc-400 transition-colors hover:text-zinc-300">
            RSS
          </Link>
        </div>

      </div>
    </footer>
  );
}
