import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Never Be Late to Meetings Again | OnTimer",
  description:
    "Stop missing meetings. Learn why calendar reminders fail and how automatic alarms before events ensure you're never late again.",
};

const faqs = [
  {
    q: "Does OnTimer replace my calendar?",
    a: "No. OnTimer reads your existing calendar — it doesn't replace it. You keep scheduling events the same way you always have. OnTimer just makes sure an alarm fires before each one.",
  },
  {
    q: "Does it work with Google Calendar?",
    a: "Yes. OnTimer works with any calendar that syncs to your iPhone's native Calendar app, including Google Calendar, iCloud, Outlook, and Exchange. If it shows up in your iPhone Calendar, OnTimer can use it.",
  },
  {
    q: "Is the app free?",
    a: "Yes. OnTimer is free to download with no subscription required. The core alarm functionality — calendar sync, automatic alarms, and smart alerts — is fully available at no cost.",
  },
  {
    q: "Can I customize the alarm timing?",
    a: "Yes. You choose how much lead time you want before events — 15 minutes, 30 minutes, an hour, or more. You can also set different lead times for different types of events, and mute alarms for individual events you don't need them for.",
  },
];

export default function NeverBeLateToMeetingsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-800 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            How to Never Be Late to{" "}
            <span className="text-green-500">Meetings Again</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            Most people know when their meetings are. They still run late. The
            problem isn&apos;t your calendar — it&apos;s the gap between knowing
            a meeting is coming and actually leaving in time to make it. This
            page explains why that gap exists and how to close it for good.
          </p>
        </div>
      </section>

      {/* Body content */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

        {/* Section 1: Why reminders don't work */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Why Calendar Reminders Don&apos;t Work
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Calendar apps send reminders as notifications — a banner that
              slides in, sits there for a few seconds, and disappears. You might
              glance at it and think <em className="text-zinc-300">&quot;got it, meeting in 30 minutes&quot;</em> and
              then keep doing what you were doing. Thirty minutes later,
              you&apos;re still at your desk when you should already be
              walking out the door.
            </p>
            <p>
              The problem is that reminders are <strong className="text-white">informative</strong>, not{" "}
              <strong className="text-white">imperative</strong>. They tell you something is coming. They
              don&apos;t actually interrupt what you&apos;re doing or create the
              urgency to stop and leave. They&apos;re easy to dismiss with one
              tap and just as easy to mentally file away and forget.
            </p>
            <p>
              There&apos;s also a timing problem. Most people set reminders for
              when a meeting <em className="text-zinc-300">starts</em>, not for when they need to{" "}
              <em className="text-zinc-300">leave</em>. A 2:00 PM meeting reminder at 2:00 PM doesn&apos;t help
              you — you needed to leave at 1:45. By the time the reminder fires,
              you&apos;re already running behind.
            </p>
          </div>
        </section>

        {/* Section 2: What actually works */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
            What Actually Works: Alarms Before Meetings
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              You don&apos;t use a calendar reminder to wake up in the morning.
              You use an alarm — because alarms are loud, persistent, and hard
              to ignore. The same logic applies to meetings.
            </p>
            <p>
              An alarm that fires 20 or 30 minutes before a meeting, timed to
              when you actually need to start wrapping up and heading out, is
              fundamentally different from a notification you can swipe away.
              It creates a clear signal: <strong className="text-white">stop what you&apos;re doing.
              It&apos;s time to go.</strong>
            </p>
            <p>
              The key shift is planning around <strong className="text-white">departure time</strong>, not
              meeting start time. Your alarm should fire when you need to leave
              — accounting for travel, parking, getting settled — not at the
              moment the meeting begins. Once you make that shift, the constant
              low-level anxiety of &quot;wait, when do I need to leave?&quot;
              disappears.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-400">
            <p className="font-semibold text-white">The departure-first rule:</p>
            <p className="mt-1">
              Instead of &quot;my meeting is at 2:00 PM,&quot; think &quot;I
              need to leave at 1:30 PM.&quot; Set your alarm for 1:30. That&apos;s
              the only time that matters.
            </p>
          </div>
        </section>

        {/* Section 3: How OnTimer solves this */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
            How OnTimer Solves This
          </h2>
          <p className="mb-6 text-zinc-400 leading-relaxed">
            Setting manual departure alarms for every meeting is better than
            relying on reminders — but it&apos;s still overhead. You have to
            remember to set them, update them when meetings change, and delete
            them when events get cancelled. OnTimer removes all of that.
          </p>

          <ul className="space-y-4">
            {[
              {
                icon: "📅",
                title: "Connects to your calendar",
                body: "OnTimer reads your iPhone calendar — including Google Calendar, iCloud, Outlook, and others — and sees all your upcoming events automatically. You don't enter anything manually.",
              },
              {
                icon: "⏰",
                title: "Automatically creates alarms before events",
                body: "For every event with a time, OnTimer creates an alarm based on your chosen lead time. A 30-minute lead time means your alarm fires 30 minutes before you need to be there — giving you time to actually leave.",
              },
              {
                icon: "🔄",
                title: "No manual setup, ever",
                body: "When a meeting gets rescheduled, your alarm updates. When it's cancelled, the alarm disappears. You don't have to touch anything.",
              },
              {
                icon: "🔔",
                title: "Persistent, can't-miss alerts",
                body: "OnTimer uses real alarms — not silent notifications. They escalate until you acknowledge them, so you can't sleep through or miss them the way you might a calendar banner.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <span className="flex-shrink-0 text-2xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/features"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              See all features →
            </Link>
            <span className="text-zinc-600">·</span>
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              How it works, step by step →
            </Link>
          </div>
        </section>

        {/* Section 4: Use cases */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Who This Helps Most
          </h2>
          <p className="mb-6 text-zinc-400 leading-relaxed">
            Chronic lateness affects people for different reasons. OnTimer works
            for all of them, because the fix is the same: an automatic alarm
            that fires at the right moment.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Back-to-back meeting days",
                body: "When you're going from one call to the next, it's easy to lose track of time. OnTimer alarms for each transition so you can focus on the current meeting without watching the clock.",
              },
              {
                label: "ADHD and time blindness",
                body: "Time blindness — the difficulty sensing how much time has passed — is common with ADHD. OnTimer's loud, persistent alarms cut through hyperfocus and signal when it's genuinely time to stop.",
              },
              {
                label: "Busy professionals",
                body: "When you're deep in work, a meeting can sneak up fast. OnTimer removes the need to manually track your schedule by making your calendar do the work for you.",
              },
              {
                label: "Remote workers",
                body: "Without a commute to force routine, remote workers often shift meetings later and later. OnTimer keeps you honest about when virtual meetings start — no more rushing to find the Zoom link at 10:03.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="mb-1.5 font-bold text-white">{item.label}</p>
                <p className="text-sm text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Screenshots — full bleed bg */}
      <section className="border-y border-zinc-800 bg-zinc-900/40 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-black tracking-tight text-white sm:text-3xl">
            See OnTimer in action
          </h2>
          <div className="flex justify-center gap-4 overflow-x-auto pb-2">
            {[
              {
                src: "/images/NeverBeLateAgain.png",
                alt: "Never be late again",
              },
              {
                src: "/images/AutomaticAlarms.png",
                alt: "Automatic alarms from your calendar",
              },
              {
                src: "/images/CantMissAlerts.png",
                alt: "Can't-miss persistent alerts",
              },
              {
                src: "/images/RelaxYourOnTime.png",
                alt: "Relax — you're on time",
              },
            ].map((shot) => (
              <div
                key={shot.alt}
                className="relative h-[420px] w-[193px] flex-shrink-0 overflow-hidden rounded-[1.75rem] border border-zinc-700 shadow-xl"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Calculator Callout */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-zinc-400 leading-relaxed">
            Flying somewhere? Use our{" "}
            <Link
              href="/airport-time-to-leave-calculator"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              Airport Time-to-Leave Calculator
            </Link>
            {" "}to figure out when to leave for the airport based on traffic, security time, and your flight type.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="space-y-px">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="border-b border-zinc-800 py-5 last:border-0"
              >
                <p className="font-semibold text-white">{item.q}</p>
                <p className="mt-2 text-zinc-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/faq"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              See all FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.10),transparent)]" />
        <div className="relative mx-auto max-w-xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Stop being late. Start today.
          </h2>
          <p className="mt-4 text-zinc-400">
            OnTimer is free. No subscription. Works with your existing calendar.
            Download it and your next meeting will be the last one you&apos;re
            late to.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreButton size="lg" />
            <AndroidWaitlistButton size="lg" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Free download · iOS 16+ · No subscription required
          </p>
        </div>
      </section>
    </>
  );
}
