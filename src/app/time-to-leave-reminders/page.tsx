import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Get a Reminder When It's Time to Leave for a Meeting | OnTimer",
  description:
    "Learn why leave-time reminders matter and how traffic-aware alerts can help you arrive on time.",
};

export default function TimeToLeaveReminders() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            How to Get a Reminder When It&apos;s Time to{" "}
            <span className="text-green-500">Leave for a Meeting</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            For in-person meetings and appointments, being &quot;reminded about
            the event&quot; is not always enough. What really matters is knowing
            when you need to leave.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHY LEAVE-TIME REMINDERS MATTER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why leave-time reminders matter
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A calendar event tells you when something starts. It does not
              always tell you when to stop what you are doing, get out the door,
              and account for traffic.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY NORMAL REMINDERS FALL SHORT ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why normal reminders fall short
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A standard reminder might tell you the meeting is coming up, but
              it does not always solve the travel problem. That is especially
              true when the event has a location and the drive time changes.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT TO LOOK FOR ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to look for in a leave-time alert
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            A useful leave-time reminder should:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "recognize the event location",
              "account for travel time",
              "help you act before you are already behind",
              "fit naturally into your existing calendar workflow",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW ONTIMER TIME TO LEAVE WORKS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Time To Leave works
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              For calendar events with a location, OnTimer can alert you when it
              is time to leave based on travel time and traffic. Time To Leave is
              a paid feature.
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
                href="/airport-time-to-leave-calculator"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Airport Time-to-Leave Calculator →
              </Link>
            </li>
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
                href="/loud-calendar-alerts-iphone"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Get Loud Calendar Alerts on iPhone →
              </Link>
            </li>
            <li>
              <Link
                href="/stop-missing-calendar-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Stop Missing Zoom, Google Meet, and Other Calendar Meetings →
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
            Know when it is time to head out
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and get more useful reminders from your calendar.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
