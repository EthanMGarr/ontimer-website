import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Get Loud Calendar Alerts on iPhone | OnTimer",
  description:
    "Looking for louder iPhone calendar alerts? Here is why normal reminders get missed and what to use instead.",
};

export default function LoudCalendarAlertsIphone() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            How to Get Loud Calendar Alerts on{" "}
            <span className="text-green-500">iPhone</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            If you rely on your iPhone calendar, you have probably experienced
            this: the reminder appears, you notice it for a second, and then the
            meeting still sneaks up on you.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHY REMINDERS GET MISSED ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why iPhone calendar reminders get missed
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Standard reminders are often too passive. They blend in with other
              notifications, disappear quickly, and do not always create enough
              urgency to interrupt what you are doing.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES AN ALERT "LOUD" ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What makes an alert feel &quot;loud&quot;
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A better alert is not just louder in volume. It is also more
              persistent, more visible, and harder to dismiss without actually
              reacting to it.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT TO LOOK FOR ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to look for in a better meeting reminder
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            If you need something more reliable, look for:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "stronger alert behavior",
              "enough lead time before the event",
              "support for your real calendar workflow",
              "reminders that are designed for meetings, not just generic tasks",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW ONTIMER HELPS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer helps
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              OnTimer connects to your calendar and creates loud, persistent
              alarms before meetings and events so they are harder to miss than
              standard calendar notifications.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/features"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              See all features →
            </Link>
            <Link
              href="/faq"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related guides</h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/how-to-never-be-late-to-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Never Be Late to Meetings →
              </Link>
            </li>
            <li>
              <Link
                href="/time-to-leave-reminders"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Get a Reminder When It's Time to Leave for a Meeting →
              </Link>
            </li>
            <li>
              <Link
                href="/best-meeting-reminder-apps-iphone"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Best Apps to Remind You About Meetings on iPhone →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Turn your calendar into a real alarm
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer for iPhone.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
