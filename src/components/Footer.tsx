import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight">
              On<span className="text-green-500">Timer</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-zinc-400">
              OnTimer connects to your calendar and creates loud, persistent
              alarms before meetings and events.
            </p>
            <div className="mt-4 space-y-1 text-sm text-zinc-500">
              <p>© {new Date().getFullYear()} Breakout Growth Labs LLC</p>
              <a
                href="mailto:support@ontimer.app"
                className="block transition-colors hover:text-zinc-300"
              >
                support@ontimer.app
              </a>
              <p>Aberdeen, NJ</p>
            </div>
            <AppStoreButton size="md" location="footer" className="mt-5" />
          </div>

          {/* Product links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Product
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/features", label: "Features" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/faq", label: "FAQ" },
                { href: "/blog", label: "Blog" },
                { href: "/android", label: "Android Waitlist" },
                { href: "/meeting-reminder-app", label: "Meeting Reminder App" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/how-to-never-be-late-to-meetings", label: "How to Never Be Late to Meetings" },
                { href: "/loud-calendar-alerts-iphone", label: "Loud Calendar Alerts on iPhone" },
                { href: "/time-to-leave-reminders", label: "Time To Leave Reminders" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Get in Touch
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:support@ontimer.app"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  support@ontimer.app
                </a>
              </li>
              <li>
                <a
                  href="mailto:press@ontimer.app"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  press@ontimer.app
                </a>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                {
                  href: "https://ontimer.app/OnTimer_Privacy_Policy.html",
                  label: "Privacy Policy",
                },
                {
                  href: "https://ontimer.app/OnTimer_Terms_of_Service.html",
                  label: "Terms of Service",
                },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center">
          <Link
            href="/feed.xml"
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            RSS Feed
          </Link>
        </div>
      </div>
    </footer>
  );
}
