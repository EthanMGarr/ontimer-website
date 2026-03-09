import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Stop Missing Zoom, Google Meet, and Other Calendar Meetings | OnTimer",
  description:
    "Missing virtual meetings is still common. Here is why standard reminders fail and how to make them harder to miss.",
};

export default function StopMissingCalendarMeetings() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            How to Stop Missing Zoom, Google Meet, and Other{" "}
            <span className="text-green-500">Calendar Meetings</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Virtual meetings are easy to underestimate because there is no
            commute. That often makes people even more likely to rely on a weak
            notification and lose track of time.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHY VIRTUAL MEETINGS GET MISSED ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why virtual meetings still get missed
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              People assume they can join &quot;in just a minute,&quot; stay in
              the current task too long, or swipe away a reminder without
              realizing how close the meeting really is.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY NORMAL ALERTS AREN'T ENOUGH ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why normal calendar alerts are not enough
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Standard reminders are often passive and forgettable. They do not
              always create enough interruption to pull you out of focused work.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT HELPS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What helps
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A stronger alert, enough lead time, and a reminder system built
              around real meeting behavior can all help reduce missed Zoom,
              Google Meet, and Teams calls.
            </p>
          </div>
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
              alarms before scheduled meetings so they are harder to miss.
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
                href="/loud-calendar-alerts-iphone"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Get Loud Calendar Alerts on iPhone →
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
            Make virtual meetings harder to miss
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
