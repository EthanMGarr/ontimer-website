import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight">
              On<span className="text-green-500">Timer</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-zinc-400">
              Never be late again. OnTimer connects to your calendar and sets
              automatic alarms so you always leave on time.
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
            >
              <AppleIcon />
              Download on the App Store
            </a>
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
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} OnTimer. All rights reserved.
          </p>
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

function AppleIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 814 1000"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.8-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 268.7-317.3 70.6 0 129.4 46.4 173.5 46.4 42.1 0 108.4-49.2 189.3-49.2 30.2 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}
