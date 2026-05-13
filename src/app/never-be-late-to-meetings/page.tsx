import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AndroidWaitlistButton, AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Never Be Late to Meetings (The Last 5 Minutes Fix)",
  description:
    "Most people know when their meetings are but still run late. Here's why — the last 5 minutes problem, virtual meeting traps, and how to fix it for good.",
  alternates: { canonical: "https://www.ontimer.app/never-be-late-to-meetings" },
  openGraph: {
    title: "How to Never Be Late to Meetings (The Last 5 Minutes Fix)",
    description: "Most people know when their meetings are but still run late. Here's why — the last 5 minutes problem, virtual meeting traps, and how to fix it for good.",
    url: "https://www.ontimer.app/never-be-late-to-meetings",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Never Be Late to Meetings Again",
  description:
    "Most people know when their meetings are but still run late. The problem is the gap between knowing and leaving. Here's why it happens and how to close it.",
  datePublished: "2025-01-01",
  dateModified: "2026-04-20",
  author: { "@type": "Organization", name: "OnTimer" },
  publisher: {
    "@type": "Organization",
    name: "OnTimer",
    url: "https://www.ontimer.app",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why do I keep being late to meetings even though I know about them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Knowing about a meeting and actually stopping to leave are two different cognitive steps. Calendar notifications inform you — they don't interrupt you. The gap between a reminder and the moment you need to leave is where lateness happens. The fix is a departure-time alarm, not a meeting-start reminder.",
      },
    },
    {
      "@type": "Question",
      name: "What is the last 5 minutes problem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The last 5 minutes problem is the tendency to underestimate how long it takes to wrap up a current task and transition to a meeting. You're focused on something, the reminder fires, you think 'just one more minute' — and then you're late. The fix is building a transition buffer into your alarm timing.",
      },
    },
    {
      "@type": "Question",
      name: "Why do I miss Zoom meetings even when I'm at my desk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Virtual meetings are deceptive because there's no commute forcing a transition. You assume you can join 'in just a minute' and stay in your current task too long. A strong alarm that fires 10–15 minutes before creates the transition signal that the lack of commute removes.",
      },
    },
    {
      "@type": "Question",
      name: "How does ADHD time blindness affect meeting punctuality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Time blindness — common with ADHD — makes it genuinely difficult to feel how much time has passed. A reminder that fires and disappears isn't enough to interrupt hyperfocus. Loud, persistent alarms that don't go away until acknowledged are significantly more effective.",
      },
    },
    {
      "@type": "Question",
      name: "Does OnTimer replace my calendar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. OnTimer reads your existing calendar — it doesn't replace it. You keep scheduling events the same way you always have. OnTimer just makes sure an alarm fires before each one.",
      },
    },
    {
      "@type": "Question",
      name: "Is OnTimer free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OnTimer is free to download. The core alarm functionality — calendar sync, automatic alarms, and persistent alerts — is fully available at no cost. Time To Leave alerts (departure-time alerts based on travel time) are a paid feature.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize the alarm timing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You choose how much lead time you want before events — 15 minutes, 30 minutes, an hour, or more. You can also mute alarms for individual events you don't need them for.",
      },
    },
  ],
};

export default function NeverBeLateToMeetingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
            a meeting is coming and actually leaving in time to make it.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

        {/* Direct Answer */}
        <section className="mb-14 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-500">
            Direct Answer
          </p>
          <p className="text-zinc-200 leading-relaxed">
            To never be late to meetings: set your alarm for when you need to{" "}
            <strong className="text-white">leave</strong>, not when the meeting
            starts. Add a 15–20 minute buffer, make the alert impossible to
            ignore, and automate it so you never have to remember to set it. The
            single biggest change is shifting from &quot;meeting starts at
            2:00&quot; to &quot;I need to leave at 1:30.&quot;
          </p>
        </section>

        {/* Section 1: Why people are late */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Why People Are Actually Late to Meetings
          </h2>
          <p className="mb-4 text-zinc-400 leading-relaxed">
            Being late to meetings is rarely about not knowing the schedule. It
            happens for predictable, structural reasons:
          </p>
          <ul className="mb-6 space-y-2">
            {[
              "Underestimating how long it takes to wrap up the current task",
              "Relying on a single quiet notification that disappears",
              "Having back-to-back meetings with no transition buffer",
              "Underestimating travel time or forgetting logistics",
              "Time blindness — genuinely not sensing how quickly time is passing",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The deepest issue is the{" "}
              <strong className="text-white">last 5 minutes problem</strong>:
              you&apos;re focused on something, a reminder fires, you think
              &quot;just one more minute&quot; — and then you&apos;re late. The
              reminder was informative. It wasn&apos;t imperative enough to
              actually interrupt you.
            </p>
            <p>
              Calendar apps send reminders as notifications — a banner that
              slides in and disappears. They&apos;re easy to swipe away and just
              as easy to mentally file away and forget.{" "}
              <Link
                href="/why-calendar-reminders-fail"
                className="text-green-500 hover:text-green-400"
              >
                Why calendar reminders fail
              </Link>{" "}
              comes down to this: they tell you something is coming. They
              don&apos;t actually stop you from doing what you&apos;re doing.
            </p>
          </div>
        </section>

        {/* Section 2: What actually works */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
            What Actually Works: Alarms, Not Reminders
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              You don&apos;t use a calendar reminder to wake up in the morning.
              You use an alarm — because alarms are loud, persistent, and hard
              to ignore. The same logic applies to meetings.
            </p>
            <p>A better system requires:</p>
          </div>
          <ul className="my-4 space-y-2">
            {[
              "More than one reminder — at least a 30-min and a 5-min alert",
              "Stronger transition cues that actually interrupt what you're doing",
              "Enough buffer before the meeting to wrap up and get ready",
              "A leave-time signal for in-person events — accounting for travel",
              "An alarm that stays loud until you acknowledge it",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-400">
            <p className="font-semibold text-white">The departure-first rule:</p>
            <p className="mt-1">
              Instead of &quot;my meeting is at 2:00 PM,&quot; think &quot;I
              need to leave at 1:30 PM.&quot; Set your alarm for 1:30.
              That&apos;s the only time that matters. For virtual meetings,
              &quot;leave at 1:55&quot; means &quot;close this tab, find the
              Zoom link, and have water.&quot;
            </p>
          </div>
        </section>

        {/* Section 3: Virtual meetings */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Why Zoom, Google Meet, and Teams Calls Are Especially Easy to Miss
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Virtual meetings are deceptive. There&apos;s no commute to force a
              transition. People assume they can join &quot;in just a minute,&quot;
              stay in the current task too long, and then scramble for the link
              while the call has already started.
            </p>
            <p>
              The lack of a physical departure is exactly what makes virtual
              meetings easier to miss — not harder. Without the friction of
              &quot;I need to get in the car,&quot; there&apos;s no built-in cue
              to stop what you&apos;re doing. Standard calendar notifications are{" "}
              <Link
                href="/calendar-notifications-not-working"
                className="text-green-500 hover:text-green-400"
              >
                not enough to create that cue
              </Link>
              .
            </p>
            <p>
              The fix is a strong pre-meeting alarm that fires 10–15 minutes
              before every call — enough time to finish the sentence you&apos;re
              writing, find the link, and join composed.
            </p>
          </div>
        </section>

        {/* Section 4: How OnTimer solves this */}
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
            How OnTimer Automates This
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

        {/* Section 5: Who this helps most */}
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
                link: null,
              },
              {
                label: "ADHD and time blindness",
                body: "Time blindness — the difficulty sensing how much time has passed — is common with ADHD. OnTimer's loud, persistent alarms cut through hyperfocus and signal when it's genuinely time to stop.",
                link: { href: "/adhd-time-blindness-tools", label: "ADHD time blindness tools →" },
              },
              {
                label: "Busy professionals",
                body: "When you're deep in work, a meeting can sneak up fast. OnTimer removes the need to manually track your schedule by making your calendar do the work for you.",
                link: null,
              },
              {
                label: "Remote workers",
                body: "Without a commute to force routine, remote workers often shift meetings later and later. OnTimer keeps you honest about when virtual meetings start — no more rushing to find the Zoom link at 10:03.",
                link: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="mb-1.5 font-bold text-white">{item.label}</p>
                <p className="text-sm text-zinc-400">{item.body}</p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-2 inline-block text-xs font-semibold text-green-500 hover:text-green-400"
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Screenshots */}
      <section className="border-y border-zinc-800 bg-zinc-900/40 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-black tracking-tight text-white sm:text-3xl">
            See OnTimer in action
          </h2>
          <div className="flex justify-center gap-4 overflow-x-auto pb-2">
            {[
              { src: "/images/NeverBeLateAgain.png", alt: "Never be late again" },
              { src: "/images/AutomaticAlarms.png", alt: "Automatic alarms from your calendar" },
              { src: "/images/CantMissAlerts.png", alt: "Can't-miss persistent alerts" },
              { src: "/images/RelaxYourOnTime.png", alt: "Relax — you're on time" },
            ].map((shot) => (
              <div
                key={shot.alt}
                className="relative h-[420px] w-[193px] flex-shrink-0 overflow-hidden rounded-[1.75rem] border border-zinc-700 shadow-xl"
              >
                <Image src={shot.src} alt={shot.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport calculator callout */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-zinc-400 leading-relaxed">
            Flying somewhere? Use our{" "}
            <Link
              href="/airport-time-to-leave-calculator"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              Airport Time-to-Leave Calculator
            </Link>{" "}
            to figure out when to leave for the airport based on traffic, security
            time, and your flight type.
          </p>
        </div>
      </section>

      {/* Related guides */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related guides</h2>
          <ul className="space-y-3">
            {[
              {
                href: "/why-calendar-reminders-fail",
                label: "Why Calendar Reminders Fail (and What to Use Instead)",
              },
              {
                href: "/calendar-alarm-app",
                label: "Best Calendar Alarm Apps for iPhone",
              },
              {
                href: "/loud-calendar-alerts-iphone",
                label: "How to Get Loud Calendar Alerts on iPhone",
              },
              {
                href: "/adhd-time-blindness-tools",
                label: "ADHD Time Blindness Tools",
              },
              {
                href: "/time-to-leave-reminders",
                label: "How to Get a Reminder When It's Time to Leave",
              },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-green-500 hover:text-green-400 transition-colors"
                >
                  {label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-px">
            {[
              {
                q: "Why do I keep being late to meetings even though I know about them?",
                a: "Knowing about a meeting and actually stopping to leave are two different steps. Calendar notifications inform you — they don't interrupt you. The gap between a reminder and the moment you need to leave is where lateness happens. The fix is a departure-time alarm, not a meeting-start reminder.",
              },
              {
                q: "What is the last 5 minutes problem?",
                a: "The last 5 minutes problem is the tendency to underestimate how long it takes to wrap up a current task and transition to a meeting. You're focused on something, the reminder fires, you think 'just one more minute' — and then you're late. The fix is building a transition buffer into your alarm timing.",
              },
              {
                q: "Why do I miss Zoom meetings even when I'm at my desk?",
                a: "Virtual meetings are deceptive because there's no commute forcing a transition. You assume you can join 'in just a minute' and stay in your current task too long. A strong alarm that fires 10–15 minutes before creates the transition signal that the lack of commute removes.",
              },
              {
                q: "How does ADHD affect meeting punctuality?",
                a: "Time blindness — common with ADHD — makes it genuinely difficult to feel how much time has passed. A reminder that fires and disappears isn't enough to interrupt hyperfocus. Loud, persistent alarms that don't go away until acknowledged are significantly more effective.",
              },
              {
                q: "Does OnTimer replace my calendar?",
                a: "No. OnTimer reads your existing calendar — it doesn't replace it. You keep scheduling events the same way you always have. OnTimer just makes sure an alarm fires before each one.",
              },
              {
                q: "Is OnTimer free?",
                a: "Yes. OnTimer is free to download. The core alarm functionality — calendar sync, automatic alarms, and persistent alerts — is fully available at no cost. Time To Leave alerts (departure-time alerts based on travel time) are a paid feature.",
              },
              {
                q: "Can I customize the alarm timing?",
                a: "Yes. You choose how much lead time you want before events — 15 minutes, 30 minutes, an hour, or more. You can also mute alarms for individual events you don't need them for.",
              },
            ].map((item) => (
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
            <AppStoreCTA />
            <AndroidWaitlistButton size="lg" />
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Free download · iOS 16+ · No subscription required
          </p>
        </div>
      </section>
    </>
  );
}
