import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              On<span className="text-green-500">Timer</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Calendar alarms that actually wake you up. Built for people who can&apos;t afford to be late.
            </p>
            <p className="mt-2 text-xs text-zinc-400">Aberdeen, NJ</p>
            <div className="mt-6">
              <AppStoreButton size="sm" location="footer" />
            </div>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Product
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/features",     label: "Features"     },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/faq",          label: "FAQ"          },
                { href: "/blog",         label: "Blog"         },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Tools */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Tools
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/airport-time-to-leave-calculator", label: "Airport Calculator"         },
                { href: "/airport-theory-calculator",        label: "Airport Theory Calculator"  },
                { href: "/what-time-should-i-leave",         label: "Time to Leave Calculator"   },
                { href: "/wake-up-time-calculator",          label: "Wake-Up Calculator"          },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Support & Legal */}
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
                { href: "https://ontimer.app/OnTimer_Privacy_Policy.html",    label: "Privacy Policy"    },
                { href: "https://ontimer.app/OnTimer_Terms_of_Service.html",  label: "Terms of Service"  },
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
          <Link href="/feed.xml" className="text-xs text-zinc-400 transition-colors hover:text-zinc-400">
            RSS
          </Link>
        </div>

      </div>
    </footer>
  );
}
