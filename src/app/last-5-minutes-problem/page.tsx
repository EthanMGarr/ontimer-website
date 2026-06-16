import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "The Last 5 Minutes Problem: Why Notifications Fail",
  description:
    "Most reminders fail in the final moments before action is required. Learn why notifications are easy to ignore — and how persistent calendar alarms solve the \"Last 5 Minutes Problem.\"",
  alternates: { canonical: "https://www.ontimer.app/last-5-minutes-problem" },
  openGraph: {
    title: "The Last 5 Minutes Problem: Why Notifications Fail",
    description:
      "Most reminders fail in the final moments before action is required. Learn why persistent calendar alarms solve the Last 5 Minutes Problem.",
    url: "https://www.ontimer.app/last-5-minutes-problem",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Last 5 Minutes Problem: Why Notifications Fail",
    description:
      "Most reminders fail in the final moments before action is required. Learn why persistent calendar alarms solve the Last 5 Minutes Problem.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Last 5 Minutes Problem: Why Notifications Fail",
  description:
    "The Last 5 Minutes Problem is the gap between knowing about something and actually acting on it in time. Most reminders fail because notifications require attention, while alarms interrupt you and force action.",
  url: "https://www.ontimer.app/last-5-minutes-problem",
  author: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
  publisher: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
  datePublished: "2026-04-01",
  dateModified: "2026-06-01",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/last-5-minutes-problem" },
};

const definedTermJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "The Last 5 Minutes Problem",
  description:
    "The Last 5 Minutes Problem is the execution gap between receiving a reminder and acting on it before a deadline passes. Notifications appear and disappear without forcing action; persistent alarms interrupt and demand a response, closing the gap between awareness and action.",
  inDefinedTermSet: {
    "@type": "DefinedTermSet",
    name: "OnTimer Glossary",
    url: "https://www.ontimer.app/last-5-minutes-problem",
  },
};

const faqItems = [
  {
    question: "What is the Last 5 Minutes Problem?",
    answer:
      "The Last 5 Minutes Problem is the gap between knowing you need to do something and actually doing it in time. You saw the reminder. You intended to act. But something in those final minutes — a distraction, a task that ran long, time blindness — meant you didn't. The reminder fired. It wasn't enough.",
  },
  {
    question: "Why do notifications fail in the last few minutes before an event?",
    answer:
      "Notifications are passive. They appear, inform you, and then disappear — whether or not you acted on them. In the final minutes before a meeting or departure, when you're most likely to be in the middle of something, a passive notification is the easiest thing to tune out. Alarms interrupt. Notifications suggest.",
  },
  {
    question: "Is the Last 5 Minutes Problem related to ADHD or time blindness?",
    answer:
      "It's related, but it affects everyone. People with ADHD or time blindness experience it more severely — the transition between 'now' and 'I need to leave now' doesn't feel urgent until it's too late. But context-switching difficulty and notification fatigue affect anyone with a packed schedule or deep-focus work.",
  },
  {
    question: "How do persistent calendar alarms solve the Last 5 Minutes Problem?",
    answer:
      "Persistent alarms can't be ignored the same way a notification can. They stay on your screen until you dismiss them. They interrupt what you're doing instead of appearing in the background. For high-stakes moments — meetings, flights, medication, appointments — the interruption is the point.",
  },
  {
    question: "What apps help with the Last 5 Minutes Problem?",
    answer:
      "OnTimer is designed specifically for this: it connects to your Google Calendar or Outlook and turns every event into a persistent alarm on iPhone. Instead of a passive notification that disappears, you get an alert that demands a response — designed for the final execution window when reminders need to actually work.",
  },
  {
    question: "Does OnTimer work for medication reminders and airport timing?",
    answer:
      "Yes. OnTimer works for any calendar event where the last 5 minutes matter: meetings, flights, medication doses, appointments. If you can put it in your calendar, OnTimer can turn it into a persistent alarm that fires before the deadline arrives.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ontimer.app" },
    {
      "@type": "ListItem",
      position: 2,
      name: "The Last 5 Minutes Problem",
      item: "https://ontimer.app/last-5-minutes-problem",
    },
  ],
};

const scenarios = [
  {
    title: "Meetings",
    icon: "📅",
    description:
      "You knew about the meeting. The reminder fired 10 minutes ago. You were in the middle of something and thought \"I'll wrap up in two minutes.\" Then the \"Are you joining?\" message arrived.",
  },
  {
    title: "Flights & Airport Timing",
    icon: "✈️",
    description:
      "You knew your flight time. You checked the clock an hour before. But the final calculation — traffic, parking, security — only becomes obvious when it's almost too late to leave.",
  },
  {
    title: "Medication",
    icon: "💊",
    description:
      "The reminder fired. You saw it, thought \"in a moment,\" and then forgot. Forgetting medication isn't usually about not knowing — it's about the passive reminder losing to whatever else is happening.",
  },
  {
    title: "Appointments",
    icon: "🏥",
    description:
      "Doctor's appointments, pickups, scheduled calls. The calendar reminder existed. The execution gap between reminder and action was where the miss happened.",
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">The Last 5 Minutes Problem</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Why reminders fail at the worst possible moment
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            The Last 5 Minutes Problem
          </h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            You knew about the meeting. You had the reminder set. You looked at the clock ten minutes
            ago. Somehow you still ended up late. This isn&rsquo;t a memory problem — it&rsquo;s an
            execution gap. And notifications aren&rsquo;t designed to close it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AppStoreCTA location="last5min_hero" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · iPhone · Google Calendar &amp; Microsoft Outlook</p>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-white">The Last 5 Minutes Problem is the gap between knowing about something and actually acting on it in time.</strong>{" "}
              Most reminders fail because <strong className="text-white">notifications require attention</strong> — they appear and disappear on their own.{" "}
              <strong className="text-white">Alarms interrupt you</strong> and force action. In the final minutes before a meeting, flight, or dose, that difference is everything.
            </p>
          </div>
        </div>
      </section>

      {/* The Core Problem */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why You&rsquo;re Late Even When You Had a Reminder
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The problem isn&rsquo;t that you forgot. You didn&rsquo;t forget. You knew. The meeting
              was on your calendar. The notification fired. You saw it — or thought you did — and
              assumed you&rsquo;d act on it in a moment.
            </p>
            <p>
              The moment never came. Or it came too late. Or the notification was already gone by the
              time it registered.
            </p>
            <p>
              <strong className="text-white">This is the Last 5 Minutes Problem.</strong> It&rsquo;s not
              a scheduling problem. It&rsquo;s not a forgetting problem. It&rsquo;s an{" "}
              <strong className="text-white">execution gap</strong> — the space between receiving a
              reminder and converting it into action before the window closes.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm font-semibold text-zinc-300 mb-3">The execution gap looks like this:</p>
            <ul className="space-y-3">
              {[
                "Reminder fires 10 minutes before the meeting",
                "You're in the middle of finishing a thought, an email, a task",
                "You acknowledge it passively — \"I'll wrap this up\"",
                "Five minutes pass without registering",
                "You look up and the meeting started two minutes ago",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="flex-shrink-0 text-zinc-600 font-mono">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Notifications vs Alarms */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Notifications Inform. Alarms Interrupt.
          </h2>
          <p className="mt-5 text-zinc-400 leading-relaxed">
            This is the core distinction that most calendar apps get wrong — and why the Last 5 Minutes
            Problem persists even for people who always have reminders set.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Notification</p>
              <h3 className="text-xl font-black text-white mb-3">Requires your attention</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>Appears at top of screen briefly</li>
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>Disappears automatically in seconds</li>
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>Easy to miss if you&rsquo;re distracted</li>
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>No response required to clear it</li>
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>Competes with every other app alert</li>
              </ul>
              <p className="mt-4 text-xs text-zinc-600">Used by: Google Calendar, Outlook (native)</p>
            </div>
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3">Alarm</p>
              <h3 className="text-xl font-black text-white mb-3">Interrupts regardless</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Stays on screen until dismissed</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Demands an active response</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Interrupts deep focus and context</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Doesn&rsquo;t tolerate passive acknowledgement</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Works even when you&rsquo;re in another app</li>
              </ul>
              <p className="mt-4 text-xs text-green-500/70">Used by: OnTimer (for Google &amp; Outlook events)</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/calendar-notifications-vs-alarms"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              Deep dive: Calendar notifications vs alarms →
            </Link>
          </div>
        </div>
      </section>

      {/* Where It Shows Up */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Where the Last 5 Minutes Problem Shows Up
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            It&rsquo;s not just meetings. Any high-stakes moment with a hard deadline can fall into the
            execution gap.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {scenarios.map((scenario) => (
              <div key={scenario.title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-3 text-2xl">{scenario.icon}</div>
                <h3 className="font-bold text-white mb-2">{scenario.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{scenario.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-3">
            <Link href="/what-time-should-i-leave" className="block text-green-500 hover:text-green-400 transition-colors text-sm">
              → What time should I leave? Free departure time calculator
            </Link>
            <Link href="/airport-time-to-leave-calculator" className="block text-green-500 hover:text-green-400 transition-colors text-sm">
              → Airport time-to-leave calculator
            </Link>
            <Link href="/how-to-remember-medication-on-time" className="block text-green-500 hover:text-green-400 transition-colors text-sm">
              → How to remember medication on time
            </Link>
          </div>
        </div>
      </section>

      {/* Time Blindness */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Time Blindness Makes It Worse
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              For many people, the Last 5 Minutes Problem is amplified by{" "}
              <strong className="text-white">time blindness</strong> — a tendency to underestimate how
              quickly time passes during focused activity. It&rsquo;s especially common with ADHD, but
              it shows up for anyone doing deep work or context-heavy tasks.
            </p>
            <p>
              You looked at the clock 12 minutes ago and it felt like 2. You were going to wrap up
              before the meeting. From where you sat, there was still time.
            </p>
            <p>
              The solution isn&rsquo;t more reminders. More notifications just train your brain to tune
              them out faster.{" "}
              <strong className="text-white">
                The solution is an alert that interrupts regardless of whether you&rsquo;re paying
                attention.
              </strong>
            </p>
          </div>
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm font-semibold text-white mb-2">The key insight:</p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              A notification requires you to be paying attention at exactly the right moment. An alarm
              forces the right moment to happen. For the Last 5 Minutes Problem, only one of these
              actually works.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Persistent Calendar Alarms: Designed for the Execution Gap
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              <strong className="text-white">OnTimer</strong> is a{" "}
              <Link href="/calendar-alarm-app" className="text-green-500 hover:text-green-400">
                calendar alarm app
              </Link>{" "}
              for iPhone. It connects to your Google Calendar and
              Microsoft Outlook and turns every event into a{" "}
              <Link href="/persistent-calendar-reminders" className="text-green-500 hover:text-green-400">
                persistent alarm
              </Link>{" "}
              — not a notification. An alarm that stays on your screen until you
              dismiss it.
            </p>
            <p>
              When your meeting is in 10 minutes, the alarm fires. It doesn&rsquo;t disappear on its
              own. It doesn&rsquo;t compete quietly with your other notifications. It interrupts — which
              is exactly what the final execution window requires.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900">
              <div className="px-5 py-4 text-sm font-semibold text-zinc-400">Scenario</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-zinc-400">Calendar Notification</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-green-500">OnTimer Alarm</div>
            </div>
            {[
              ["Deep in a task", "Notification disappears unnoticed", "Alarm interrupts until dismissed"],
              ["Phone face-down", "Banner missed entirely", "Alarm fires regardless"],
              ["On another call", "Silently missed", "Alarm queues for pickup"],
              ["Time blindness episode", "10 min felt like 2, notification gone", "Alarm is still there demanding action"],
              ["Distracted environment", "Notification lost in noise", "Alarm demands a response"],
            ].map(([scenario, notification, alarm]) => (
              <div key={scenario} className="grid grid-cols-3 border-b border-zinc-800 last:border-0">
                <div className="px-5 py-4 text-sm text-zinc-300">{scenario}</div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm text-zinc-500">{notification}</div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm font-medium text-white">{alarm}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <AppStoreCTA location="last5min_solution" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · iPhone · Google Calendar &amp; Microsoft Outlook</p>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="border-t border-zinc-800 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
            <h2 className="text-2xl font-black text-white">
              Turn your calendar events into persistent alarms.
            </h2>
            <p className="mt-3 text-zinc-400">
              OnTimer closes the execution gap. Connect your Google Calendar or Outlook and every event
              gets an alarm that won&rsquo;t let you drift past the deadline.
            </p>
            <div className="mt-6">
              <AppStoreCTA location="last5min_midpage" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-xl border border-zinc-800 bg-zinc-900">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white">
                  {item.question}
                  <span className="ml-4 shrink-0 text-zinc-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related Guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/why-calendar-notifications-fail", label: "Why Calendar Notifications Fail (And What Actually Works)" },
              { href: "/calendar-notifications-not-working", label: "Calendar Notifications Not Working? Why Reminders Fail — and What Fixes It" },
              { href: "/why-notifications-fail", label: "Why Notifications Fail (And Persistent Alarms Work Better)" },
              { href: "/turn-calendar-events-into-alarms", label: "How to Turn Calendar Events Into Real Alarms" },
              { href: "/persistent-calendar-reminders", label: "How to Make Calendar Reminders Persistent" },
              { href: "/calendar-notifications-vs-alarms", label: "Calendar Notifications vs Alarms: Why Most Reminders Fail" },
              { href: "/best-calendar-alarm-app", label: "Best Calendar Alarm App for Google & Outlook" },
              { href: "/what-time-should-i-leave", label: "What Time Should I Leave? Free Calculator" },
              { href: "/airport-time-to-leave-calculator", label: "Airport Time-to-Leave Calculator" },
              { href: "/how-to-remember-medication-on-time", label: "How to Remember Medication On Time" },
              { href: "/adhd-time-blindness-tools", label: "ADHD Time Blindness Tools" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-green-500 hover:text-green-400 transition-colors text-sm">{label} →</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stop losing the last 5 minutes.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer turns your Google and Outlook calendar events into persistent alarms — the kind that
            close the execution gap instead of contributing to it.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="last5min_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
