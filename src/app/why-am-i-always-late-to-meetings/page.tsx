import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Why Am I Always Late to Meetings? (And How to Fix It)",
  description:
    "Chronic meeting lateness has two root causes: behavioral patterns and system failures. Here's how to identify yours — and build a fix that actually works.",
  alternates: { canonical: "https://www.ontimer.app/why-am-i-always-late-to-meetings" },
  openGraph: {
    title: "Why Am I Always Late to Meetings? (And How to Fix It)",
    description:
      "Chronic meeting lateness has two root causes: behavioral patterns and system failures. Here's how to identify yours — and build a fix that actually works.",
    url: "https://www.ontimer.app/why-am-i-always-late-to-meetings",
    type: "article",
  },
};

const faqItems = [
  {
    question: "Why do I keep being late to meetings?",
    answer:
      "Chronic meeting lateness usually comes from one of two sources: behavioral patterns (underestimating time, back-to-back scheduling, no buffer between tasks) or system failures (passive reminders, notification blindness, single-point alerts). Most people have both. Fixing the system is faster than changing behavior.",
  },
  {
    question: "Is it ADHD if I'm always late to meetings?",
    answer:
      "Time blindness — difficulty perceiving how much time has passed and accurately estimating how long tasks take — is a common ADHD trait. But chronic lateness without ADHD is also very common and usually stems from inadequate reminder systems rather than a neurological difference. If lateness affects multiple areas of your life, speaking with a professional is worthwhile.",
  },
  {
    question: "How do I stop being late to meetings?",
    answer:
      "The most reliable fix is layered: set multiple reminders per event (15 minutes and 5 minutes before), add buffer time between calendar blocks, and use a persistent alarm app that requires active dismissal rather than passive notifications that disappear. Behavior changes alone — \"I'll try harder\" — rarely hold against a busy schedule.",
  },
  {
    question: "What is the best app to stop being late to meetings?",
    answer:
      "The best meeting reminder app is one that connects directly to your calendar, fires persistent alarms that require dismissal (not passive notifications), and escalates as the meeting approaches. OnTimer is built specifically for this — it reads your calendar and creates attention-demanding alarms before each meeting.",
  },
];

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

export default function WhyAmIAlwaysLateMeetings() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why Am I Always Late to Meetings? (And How to Fix It)",
    description:
      "Chronic meeting lateness has two root causes: behavioral patterns and system failures. Here's how to identify yours — and build a fix that actually works.",
    author: { "@type": "Organization", name: "OnTimer" },
    datePublished: "2026-04-25",
    dateModified: "2026-04-25",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.ontimer.app/why-am-i-always-late-to-meetings",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
      { "@type": "ListItem", position: 2, name: "Why Am I Always Late to Meetings", item: "https://www.ontimer.app/why-am-i-always-late-to-meetings" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-12 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Why Am I Always Late to Meetings?{" "}
            <span className="text-green-500">(And How to Fix It)</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-400">By OnTimer</p>

          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="leading-relaxed text-zinc-200">
              Chronic meeting lateness usually has two root causes: behavioral patterns (underestimating time,
              back-to-back scheduling) and system failures (passive reminders, notification blindness). Both are
              fixable — but fixing behavior without fixing your alert system rarely sticks.
            </p>
          </div>

          <nav className="mt-8" aria-label="Table of contents">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">On this page</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#behavioral", label: "Behavioral Causes" },
                { href: "#system", label: "System Causes" },
                { href: "#calendar-failure", label: "Why Your Calendar Fails You" },
                { href: "#fix", label: "How to Actually Fix It" },
                { href: "#the-system", label: "The System That Works" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-green-500 transition-colors hover:text-green-400">
                    {label} →
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── BEHAVIORAL CAUSES ── */}
      <section id="behavioral" className="mt-8 border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Behavioral Causes
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            These are patterns in how you think and plan — not character flaws.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white">1. Optimistic time estimation</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                The planning fallacy — consistently underestimating how long tasks take. If you think you can finish
                something in 10 minutes and it takes 20, you&apos;re starting the walk to your next meeting already
                behind.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                The fix: add 50% to every time estimate until you have data that says otherwise.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">2. Back-to-back scheduling with no buffer</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                A calendar where meetings run from :00 to :00 with nothing in between has zero slack. One meeting
                runs 3 minutes long and every subsequent meeting is late.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                The fix: schedule meetings to end 5–10 minutes before the hour. Block buffer time explicitly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">3. Transition time blindness</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                The minutes between finishing one thing and starting another — standing up, walking, finding the link,
                unmuting — get forgotten in scheduling. You plan for the meeting, not for getting to it.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                The fix: your reminder should fire 10 minutes before the meeting, not 2.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">4. &quot;I&apos;ll remember&quot; overconfidence</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Skipping reminders because you feel confident you won&apos;t forget. The busier your schedule, the
                more this backfires. High-volume, high-confidence schedules are exactly where lateness is born.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SYSTEM CAUSES ── */}
      <section id="system" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            System Causes
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            These have nothing to do with your habits — your tools are failing you.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white">1. Passive, single-point notifications</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                A calendar alert fires once and disappears. If you&apos;re focused on something else, it&apos;s gone
                before you even register it. There is no retry, no escalation, no fallback.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">2. Notification blindness</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Your brain learns to auto-dismiss notification banners. The motion of clearing alerts becomes
                habitual — regardless of content. A calendar alert competes in the same stack as Slack messages,
                emails, and news, and gets cleared on autopilot.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">3. No escalation</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Most calendar apps set one reminder and stop. One miss = no alert. There&apos;s no second warning
                5 minutes later when you still haven&apos;t moved, no escalating urgency.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">4. Silent mode swallowing alerts</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Your phone is on silent. The reminder fires. You never hear it. The notification sits in the stack
                and you find it 20 minutes later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALENDAR FAILURE ── */}
      <section id="calendar-failure" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Your Calendar Fails You
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Calendar apps are built for scheduling — not for guaranteeing you show up.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            They remind you once and move on. There is no built-in mechanism to:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Repeat the alert if you don't respond",
              "Escalate urgency as the meeting approaches",
              "Force your attention away from what you're doing",
              "Work when your phone is silenced or Focus mode is active",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            This is by design. Calendar apps optimize for being unobtrusive. Unobtrusive and reliable are opposites
            when you need to be somewhere.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            <Link
              href="/why-calendar-reminders-fail"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              See the full breakdown of why calendar reminders fail
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── HOW TO FIX IT ── */}
      <section id="fix" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Actually Fix It
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The most effective fixes combine behavioral adjustments with system-level changes.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-400 uppercase tracking-widest text-sm">
                Behavioral fixes
              </h3>
              <div className="space-y-3">
                {[
                  {
                    fix: "Add 10-minute buffers after every meeting",
                    detail: "Block this time explicitly so it can't be scheduled over.",
                  },
                  {
                    fix: "End meetings at :50, not :00",
                    detail:
                      "A meeting from 2:00–2:50 gives you 10 minutes before the next one starts at 3:00.",
                  },
                  {
                    fix: "Use the 5-minute rule",
                    detail:
                      "At 5 minutes remaining in any task, stop and begin the transition — regardless of where you are.",
                  },
                ].map(({ fix, detail }) => (
                  <div key={fix} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <p className="font-semibold text-white">{fix}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
                System fixes
              </h3>
              <div className="space-y-3">
                {[
                  {
                    fix: "Set 2 reminders per event: 15 minutes and 5 minutes before",
                    detail: "Two alerts at different times are much harder to fully miss than one.",
                  },
                  {
                    fix: "Use a persistent alarm app — not calendar notifications",
                    detail:
                      "An app that requires active dismissal can't be swept away with a swipe.",
                  },
                  {
                    fix: "Check Focus mode and notification permissions",
                    detail: "Silent Focus mode blocks calendar alerts without any indication.",
                  },
                ].map(({ fix, detail }) => (
                  <div key={fix} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <p className="font-semibold text-white">{fix}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SYSTEM THAT WORKS ── */}
      <section id="the-system" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The System That Works
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Willpower and calendar hacks get you partway there. But the most reliable fix is removing the human
            element entirely.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            Instead of relying on remembering to check your calendar, a reminder that requires your attention, or a
            notification that disappears — use a system that forces acknowledgment before the meeting starts.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            That means an app that connects directly to your calendar, fires persistent alarms before each meeting,
            and keeps alerting until you respond. Not a passive banner — an alarm.
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Also read:{" "}
            <Link
              href="/how-to-never-be-late-to-meetings"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              the full guide to never being late to meetings
            </Link>
            {" "}—{" "}
            <Link
              href="/running-late-to-meeting"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              what to do when you're already late
            </Link>
          </p>
          <div className="mt-8">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-400"
            >
              Never Be Late Again
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-8">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-bold text-white">{item.question}</h3>
                <p className="mt-2 leading-relaxed text-zinc-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related Guides</h2>
          <ul className="space-y-3">
            {[
              { href: "/running-late-to-meeting", label: "Running Late to a Meeting? Here's Exactly What to Do" },
              { href: "/how-to-never-be-late-to-meetings", label: "How to Never Be Late to Meetings" },
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-green-500 transition-colors hover:text-green-400">
                  {label} →
                </Link>
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
            Fix the system, not the habit.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer connects to your calendar and fires persistent alarms before your meetings — so you stop being
            late without having to think about it.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="why-always-late-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
