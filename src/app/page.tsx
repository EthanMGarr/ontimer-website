import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "OnTimer — Calendar Alarm App to Never Be Late for Meetings",
  description:
    "OnTimer connects to Google Calendar and Outlook and creates persistent meeting alarms you can't ignore. Free iPhone app.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OnTimer",
  operatingSystem: "iOS",
  applicationCategory: "ProductivityApplication",
  url: "https://ontimer.app",
  downloadUrl:
    "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601",
  description:
    "OnTimer connects to your calendars and creates alarms you can't ignore — so meetings, calls, and appointments don't sneak up on you.",
};

const features = [
  {
    icon: "📅",
    title: "All Your Calendars",
    body: "Connect Google and Microsoft calendars in seconds — including multiple work and personal accounts.\n\nOnTimer automatically monitors your events and prepares alarms for everything on your schedule.",
  },
  {
    icon: "⏰",
    title: "Automatic Alarms",
    body: "Every event becomes an alarm — no manual setup required.\n\nUpcoming meetings, calls, and appointments are always covered.\n\nTime-to-Leave alerts based on location and traffic ensure you know when it's time to head out.",
  },
  {
    icon: "🔔",
    title: "Alerts You Won't Miss",
    body: "Unlike normal calendar notifications, OnTimer alarms stay loud and visible until you dismiss them.\n\nNo silent reminders disappearing into your notification center.",
  },
  {
    icon: "🎛️",
    title: "Control What Matters",
    bullets: [
      "how early alarms fire",
      "which calendars trigger alarms",
      "business hours filtering",
      "recurring event handling",
    ],
    suffix: "OnTimer works the way your schedule actually works.",
  },
];

const comparison = [
  { left: "Easy to swipe away", right: "Persistent alarms" },
  { left: "Passive notification", right: "Loud alarm" },
  { left: "Easy to forget", right: "Hard to miss" },
  { left: "One calendar", right: "Multiple calendars" },
  { left: "Simple reminder", right: "Real meeting alarm" },
  { left: "No travel awareness", right: "Time-to-Leave alerts (location + traffic)" },
];

const steps = [
  {
    number: "01",
    title: "Connect your calendars",
    body: "Link all of your Google and Microsoft calendars in seconds.",
  },
  {
    number: "02",
    title: "OnTimer creates alarms",
    body: "Every calendar event automatically gets a persistent alarm.",
  },
  {
    number: "03",
    title: "Show up on time",
    body: "When the alarm fires, you know exactly when it's time to join the meeting or leave.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Never Miss a{" "}
                <span className="text-green-500">Meeting Again</span>
              </h1>
              <p className="mt-4 text-xl font-semibold text-zinc-300">
                Calendar reminders aren&apos;t alarms.
              </p>
              <p className="mt-4 max-w-xl text-lg text-zinc-400 lg:text-xl">
                OnTimer connects to your calendars and creates alarms you
                can&apos;t ignore — so meetings, Zoom calls, Teams meetings,
                and appointments don&apos;t sneak up on you.
              </p>

              <div className="mt-8">
                <AppStoreButton size="lg" />
                <p className="mt-3 text-xs text-zinc-500">
                  Free download • Connect your calendars in seconds
                </p>
              </div>

              {/* Calendar logos */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold text-zinc-500">
                  Works with Google &amp; Microsoft calendars
                </p>
                <div className="flex items-center justify-center gap-4 lg:justify-start">
                  <img
                    src="/images/google-calendar-logo-google-calendar.jpg"
                    alt="Google Calendar"
                    className="h-[38px] w-auto"
                  />
                  <img
                    src="/images/outlook-calendar.jpg"
                    alt="Microsoft Outlook"
                    className="h-[38px] w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <div className="relative flex-shrink-0">
              <div className="relative flex gap-4">
                <div className="relative mt-8 h-[480px] w-[220px] overflow-hidden rounded-[2rem] border border-zinc-700 shadow-2xl shadow-green-500/10">
                  <Image
                    src="/images/NeverBeLateAgain.png"
                    alt="OnTimer — Never Miss a Meeting Again"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative h-[480px] w-[220px] overflow-hidden rounded-[2rem] border border-zinc-700 shadow-2xl shadow-green-500/10">
                  <Image
                    src="/images/RelaxYourOnTime.png"
                    alt="OnTimer — Relax, You're On Time"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-4 rounded-full bg-green-500/5 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="border-y border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Calendar reminders aren&apos;t alarms.
          </h2>
          <div className="mt-6 space-y-4 text-left text-zinc-400 leading-relaxed">
            <p>
              Most calendar reminders are easy to ignore.
            </p>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-5 space-y-2 text-zinc-300">
              <p>You glance at the reminder.</p>
              <p>You think &quot;I&apos;ll join in a minute.&quot;</p>
              <p>Then suddenly the meeting started 10 minutes ago.</p>
            </div>
            <p>
              OnTimer fixes this by turning calendar events into real alarms you
              can&apos;t ignore.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECOND CTA ── */}
      <section className="py-12 text-center">
        <div className="mx-auto max-w-sm px-4">
          <p className="mb-4 text-base font-semibold text-white">
            Get alarms you can&apos;t ignore.
          </p>
          <AppStoreButton size="lg" />
        </div>
      </section>

      {/* ── VALUE PROPOSITION ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Built for people who{" "}
            <span className="text-green-500">hate being late.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            OnTimer is a calendar alarm app designed for people who rely on their schedule.
          </p>
          <p className="mt-3 text-lg text-zinc-400 leading-relaxed">
            Your calendar already knows where you need to be and when.
          </p>
          <p className="mt-3 text-lg text-zinc-400 leading-relaxed">
            OnTimer turns those events into alarms you won&apos;t miss — so
            meetings, calls, and appointments never slip by.
          </p>
          <div className="mt-6">
            <p className="font-semibold text-white">No more:</p>
            <ul className="mt-3 space-y-2">
              {[
                "ignoring reminders",
                "losing track of time",
                "realizing a meeting started 10 minutes ago",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-400">
                  <span className="mt-1 flex-shrink-0 text-green-500">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
              >
                <div className="mb-4 text-3xl">{f.icon}</div>
                <h3 className="mb-3 text-xl font-black text-white">
                  {f.title}
                </h3>
                {"body" in f && f.body && (
                  <div className="space-y-3">
                    {f.body.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm text-zinc-400 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {"bullets" in f && f.bullets && (
                  <>
                    <p className="mb-2 text-sm text-zinc-400">Choose:</p>
                    <ul className="mb-4 space-y-1.5">
                      {f.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-zinc-400"
                        >
                          <span className="mt-0.5 flex-shrink-0 text-green-500">
                            ✓
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-zinc-400">{f.suffix}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why OnTimer works when calendar reminders fail
          </h2>
          <p className="mb-2 text-zinc-400">
            Unlike typical reminders, this calendar alarm app creates persistent alarms for your meetings.
          </p>
          <p className="mb-10 text-sm font-semibold text-green-500">
            Calendar reminders aren&apos;t alarms.
          </p>
          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            {/* Header */}
            <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-900">
              <div className="px-6 py-4 text-sm font-semibold text-zinc-400">
                Typical Calendar Reminder
              </div>
              <div className="border-l border-zinc-800 px-6 py-4 text-sm font-semibold text-green-500">
                OnTimer
              </div>
            </div>
            {/* Rows */}
            {comparison.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-b border-zinc-800 last:border-0"
              >
                <div className="px-6 py-4 text-sm text-zinc-500">
                  {row.left}
                </div>
                <div className="border-l border-zinc-800 px-6 py-4 text-sm font-medium text-white">
                  {row.right}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CALENDAR REMINDERS FAIL ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why calendar reminders fail
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>Most calendar apps were designed to show notifications, not alarms.</p>
            <p>That means reminders are easy to ignore.</p>
            <div className="space-y-2 text-zinc-300">
              <p>You swipe the notification away.</p>
              <p>You get distracted.</p>
              <p>You think you&apos;ll join the meeting in a minute.</p>
              <p>And suddenly the meeting already started.</p>
            </div>
            <p>This happens with:</p>
            <ul className="space-y-1 pl-1">
              {["Google Calendar reminders", "Outlook notifications", "phone lock-screen alerts"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-zinc-400">
                  <span className="mt-1 flex-shrink-0 text-zinc-600">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p>They&apos;re helpful — but they&apos;re not designed to make sure you actually show up on time.</p>
            <p className="text-zinc-300">
              OnTimer fixes this by turning calendar events into real alarms that stay visible until you dismiss them — so you actually know when it&apos;s time for your meeting.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-12 text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Works
          </h2>
          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">
                  {parseInt(step.number)}
                </div>
                <div>
                  <h3 className="font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-zinc-400">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              See the full walkthrough →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PERFECT FOR ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Perfect for people who rely on their calendar
          </h2>
          <p className="mt-4 text-zinc-400">
            OnTimer is especially helpful if you:
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "struggle with time blindness or ADHD",
              "run back-to-back Zoom or Teams meetings",
              "manage multiple calendars",
              "work remotely",
              "lead teams or manage clients",
              "forget meetings even when reminders appear",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm text-zinc-300"
              >
                <span className="flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stop missing meetings.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and let your calendar finally keep you on time.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
