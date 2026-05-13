import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Best Reminder Apps That Repeat Every 5–10 Minutes (iPhone)",
  description:
    "Looking for an app that sends frequent or persistent reminders? Compare the best options and find a solution that actually gets your attention.",
  alternates: {
    canonical: "https://www.ontimer.app/best-reminder-app-for-frequent-reminders",
  },
  openGraph: {
    title: "Best Reminder Apps That Repeat Every 5–10 Minutes (iPhone)",
    description:
      "Looking for an app that sends frequent or persistent reminders? Compare the best options and find a solution that actually gets your attention.",
    url: "https://www.ontimer.app/best-reminder-app-for-frequent-reminders",
  },
  twitter: {
    title: "Best Reminder Apps That Repeat Every 5–10 Minutes (iPhone)",
    description:
      "Looking for an app that sends frequent or persistent reminders? Compare the best options and find a solution that actually gets your attention.",
  },
};

const faqItems = [
  {
    question: "What app can remind me every 10 minutes?",
    answer:
      "Most standard reminder apps don't support true repeating intervals. The most reliable approach is a combination: use an alarm app for fixed-interval repetition, or use OnTimer for persistent alerts tied to calendar events that stay on screen until dismissed. For medication or habit reminders, dedicated apps like Medisafe (for medication) support repeating schedules. For meeting and event reminders, OnTimer's persistent alarm system is the most reliable option on iPhone.",
  },
  {
    question: "How do I set a repeating reminder on iPhone?",
    answer:
      "In Apple Reminders, you can set a reminder to repeat daily, weekly, monthly, or yearly — but not at custom intervals like every 10 minutes. For repeating alarms at short intervals, use the Clock app and set multiple alarms manually. For event-based reminders, OnTimer connects to your calendar and fires a persistent alarm at a set lead time before each event.",
  },
  {
    question: "Why do I keep ignoring reminders even when I see them?",
    answer:
      "Because standard notifications don't require a response. They appear, you register them mentally, and you go back to what you were doing — intending to act in a minute. That minute never comes. The fix isn't more reminders — it's a different kind of alert. Alarms that stay on screen and demand dismissal are much harder to passively ignore.",
  },
  {
    question: "What is the difference between a reminder and an alarm?",
    answer:
      "A reminder is a passive notification: it appears briefly, you can swipe it away, and it disappears. An alarm is persistent: it keeps alerting you, stays visible on screen, and requires active acknowledgment before it stops. For anything that actually matters, alarms work better. Reminders inform you — alarms interrupt you.",
  },
  {
    question: "Do persistent reminders work on iPhone in the background?",
    answer:
      "Yes, with caveats. iOS Notification scheduled alerts will fire even when the app is in the background — but they can be blocked by Do Not Disturb, Focus modes, or notification settings. True alarm-style interruption typically requires the app to have notification permissions set to time-sensitive or critical alert level. OnTimer requests these permissions during setup so alerts cut through Focus modes.",
  },
  {
    question: "What's the best reminder app for people with ADHD?",
    answer:
      "People with ADHD often struggle with passive notifications because they're easy to dismiss and don't interrupt hyperfocus. The most effective tools for ADHD are alarm-based: persistent, loud, and hard to ignore without active dismissal. OnTimer is designed around this principle for calendar events. For general habits and tasks, dedicated ADHD apps like Due (iOS) use escalating reminders that repeat until acknowledged.",
  },
  {
    question: "Is OnTimer a reminder app?",
    answer:
      "OnTimer is a calendar alarm app, not a general reminder app. It connects to Google Calendar and Outlook and fires persistent alarms before events — not passive notifications. If you need reminders for calendar events, appointments, or meetings that you genuinely cannot miss, OnTimer is designed for that use case.",
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

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Reminder Apps for Frequent or Persistent Alerts",
  description:
    "A guide to reminder apps that support frequent intervals or persistent alerts, including why most standard apps fail and what actually works.",
  datePublished: "2026-05-01",
  dateModified: "2026-05-13",
  author: { "@type": "Organization", name: "OnTimer" },
  publisher: {
    "@type": "Organization",
    name: "OnTimer",
    url: "https://www.ontimer.app",
  },
};

const appComparisons = [
  {
    name: "iPhone Reminders",
    repeating: "Daily / weekly / monthly only",
    persistent: "No — swipe to dismiss",
    verdict: "Not built for frequent intervals",
  },
  {
    name: "Clock (Alarm app)",
    repeating: "Manual — set each alarm separately",
    persistent: "Yes — rings until dismissed",
    verdict: "Reliable, but no context or automation",
  },
  {
    name: "Google Calendar / Outlook",
    repeating: "No repeating interval support",
    persistent: "No — standard notification",
    verdict: "Designed for one-time reminders only",
  },
  {
    name: "Due (iOS)",
    repeating: "Yes — escalating repeats",
    persistent: "Yes — nags until dismissed",
    verdict: "Strong for personal tasks; no calendar sync",
  },
  {
    name: "OnTimer",
    repeating: "Set lead time per event; fires before every calendar event",
    persistent: "Yes — stays on screen until dismissed",
    verdict: "Best for calendar-based events you can't miss",
  },
];

const whatToLookFor = [
  {
    title: "Repeating intervals",
    description:
      "The app must support short-cycle repeats — every 5, 10, or 15 minutes — not just daily or weekly.",
  },
  {
    title: "Persistent alerts",
    description:
      "Notifications that disappear after a few seconds don't work. The alert needs to stay on screen until you act.",
  },
  {
    title: "Alarm-style interruption",
    description:
      "Passive notifications are informational. You need an alarm — something that actively demands your attention.",
  },
  {
    title: "Background reliability",
    description:
      "The alert must fire even when your phone is locked or the app is backgrounded. Many reminder apps fail here.",
  },
];

export default function BestReminderAppForFrequentRemindersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.13),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Best Reminder Apps for{" "}
            <span className="text-green-500">Frequent or Persistent Alerts on iPhone</span>
          </h1>

          {/* Direct Answer Block */}
          <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-500 mb-2">
              Direct answer
            </p>
            <p className="text-base leading-relaxed text-zinc-200">
              If you need reminders every 5–10 minutes, most standard apps won&apos;t work reliably.
              The best solutions either repeat every few minutes or use alarms that don&apos;t
              stop until you acknowledge them.
            </p>
          </div>

          <p className="mt-6 text-base leading-relaxed text-zinc-400">
            Most reminder apps are designed for one-time notifications. That works for simple
            tasks, but breaks down when you need frequent or repeated alerts.
          </p>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            If you&apos;ve ever set a reminder, seen it, and still forgotten — you&apos;re
            dealing with a system that isn&apos;t built to interrupt you. That&apos;s the real
            problem.
          </p>
        </div>
      </section>

      {/* ── EVERY 5-10 MINUTES ── */}
      <section className="border-t border-zinc-800 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Apps That Can Remind You Every 5–10 Minutes
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              If you specifically need reminders every 5–10 minutes, your options are
              limited. Most apps don&apos;t support true short-interval repetition.
            </p>
            <p>The closest solutions are:</p>
          </div>
          <ul className="mt-4 space-y-2">
            {[
              "Alarm apps (manual setup, but reliable)",
              "Apps like Due that repeat until dismissed",
              "Systems that use persistent alarms instead of repeating notifications",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            For most people, the goal isn&apos;t just repetition — it&apos;s making sure
            the reminder actually gets your attention.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            For time-based events like meetings or flights, tools like a{" "}
            <Link href="/what-time-should-i-leave" className="text-green-500 hover:text-green-400">
              leave-time calculator
            </Link>{" "}
            or{" "}
            <Link href="/airport-time-to-leave-calculator" className="text-green-500 hover:text-green-400">
              airport timing calculator
            </Link>{" "}
            are often more reliable than repeating reminders.
          </p>
        </div>
      </section>

      {/* ── WHY MOST APPS FAIL ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Most Reminder Apps Fail for Frequent Alerts
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Standard reminder apps — Apple Reminders, Google Tasks, calendar notifications —
              are built around one interaction: the notification appears, you see it, you act.
              That model assumes you will stop what you&apos;re doing the moment the alert fires.
            </p>
            <p>
              In practice, you don&apos;t. You see the notification on the edge of your screen,
              mentally note it, and keep working. A few minutes later it&apos;s gone. The
              intention to act evaporates with it.
            </p>
            <p>
              The specific failures compound when you need frequent alerts:
            </p>
          </div>
          <ul className="mt-6 space-y-4">
            {[
              {
                heading: "Notifications disappear automatically.",
                body: "iOS notification banners vanish after a few seconds. If you don't act immediately, there's nothing left to remind you that you had a reminder.",
              },
              {
                heading: "True repeating intervals aren't supported.",
                body: "Apple Reminders repeats daily, weekly, or monthly — not every 5 or 10 minutes. Building a short-interval repeat requires manually setting multiple alarms, which is impractical to maintain.",
              },
              {
                heading: "Do Not Disturb and Focus modes silently block alerts.",
                body: "iPhone users who rely on Focus modes may never see their reminders at all. Most reminder apps don't have the permissions to cut through these.",
              },
              {
                heading: "The acknowledge-and-delay pattern.",
                body: "You see the reminder. You think you have a few more minutes. You delay. That gap between awareness and action is where things fall apart — especially when the event is in 10 minutes and you're deep in something else.",
              },
            ].map((item) => (
              <li key={item.heading} className="flex items-start gap-3">
                <span className="mt-1.5 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-green-500" />
                <p className="text-zinc-400 leading-relaxed">
                  <span className="font-semibold text-white">{item.heading}</span>{" "}
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHAT TO LOOK FOR ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to Look for in a Frequent Reminder App
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Not all reminder apps are built the same. If you need something that will
            actually get your attention — repeatedly — look for these four traits.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whatToLookFor.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="font-bold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP COMPARISON ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Best Apps for Frequent or Persistent Reminders
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Here&apos;s an honest comparison. Each option has tradeoffs — the right one
            depends on your use case.
          </p>
          <div className="mt-8 space-y-4">
            {appComparisons.map((app) => (
              <div
                key={app.name}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-bold text-white">{app.name}</p>
                  <span
                    className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      app.name === "OnTimer" || app.name === "Due (iOS)"
                        ? "bg-green-950/60 text-green-400"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {app.name === "OnTimer" || app.name === "Due (iOS)"
                      ? "Recommended"
                      : "Limited"}
                  </span>
                </div>
                <div className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
                  <p className="text-zinc-400">
                    <span className="text-zinc-500">Repeating: </span>
                    {app.repeating}
                  </p>
                  <p className="text-zinc-400">
                    <span className="text-zinc-500">Persistent: </span>
                    {app.persistent}
                  </p>
                </div>
                <p className="mt-2 text-sm text-zinc-500 italic">{app.verdict}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            For personal tasks and habits,{" "}
            <strong className="text-zinc-400">Due</strong> is the strongest repeating
            reminder app on iOS. For calendar events — meetings, appointments, anything
            with a fixed time — <strong className="text-zinc-400">OnTimer</strong> is
            designed specifically for persistent, alarm-based alerts.
          </p>
        </div>
      </section>

      {/* ── WHY PERSISTENT ALERTS WORK ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Persistent Alerts Work Better Than Standard Reminders
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The &ldquo;last 5 minutes problem&rdquo; is well-documented: most people know about
              their event. They see the reminder. They still don&apos;t leave in time.
            </p>
            <p>
              The gap isn&apos;t memory. It&apos;s the failure to switch modes — to stop
              what you&apos;re doing and act. Passive notifications don&apos;t create that
              switch. They inform you without interrupting you.
            </p>
            <p>
              Persistent alarms work differently. When an alert stays on your screen and
              keeps making noise until you tap dismiss, you cannot passively absorb it
              and move on. The cognitive process is different: you have to actively
              engage, which breaks the pattern of delay.
            </p>
            <p>
              This is why alarm clocks work better than snooze-able timers for waking
              up, and why the same principle applies to reminders that actually matter.
            </p>
          </div>
          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3 text-zinc-400 leading-relaxed">
            <p>It&apos;s 9:52 AM. You have a meeting at 10:00.</p>
            <p>A notification fires. You see it. You keep working — just one more minute.</p>
            <p className="text-zinc-300">At 10:04, you look up. The meeting already started.</p>
            <p className="mt-2 text-sm text-zinc-500 italic">
              This isn&apos;t a memory problem. It&apos;s what happens when an alert
              doesn&apos;t require a response.
            </p>
          </div>
        </div>
      </section>

      {/* ── BEST OPTION FOR HIGH-STAKES ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Best Option When You Can&apos;t Miss It
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              If the event is in your calendar and missing it has real consequences —
              a job interview, a client meeting, a medical appointment — a standard
              reminder isn&apos;t the right tool.
            </p>
            <p>
              <Link href="/" className="text-green-500 hover:text-green-400">
                OnTimer
              </Link>{" "}
              is built for this. It connects to Google Calendar and Microsoft Outlook,
              reads your upcoming events, and fires a persistent alarm — not a
              notification — at a configurable lead time before each one.
            </p>
            <p>
              The alarm stays on screen until you dismiss it. It doesn&apos;t wait for
              you to notice it. That distinction is the whole point.
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {[
              "Persistent alarm that stays on screen until dismissed — not a notification",
              "Fires before every calendar event automatically — no manual setup per event",
              "Connects to Google Calendar and Microsoft Outlook",
              "Configurable lead time — set how early you want to be interrupted",
              "Works through Focus modes with time-sensitive alert permissions",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CONVERSION ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Stop relying on reminders that disappear
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            OnTimer replaces passive calendar notifications with persistent alarms — timed
            to when you need to leave, not when the event starts. Your calendar events become
            hard-to-ignore alerts that require dismissal.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Alarm stays visible until you dismiss it — it does not disappear on its own",
              "Syncs with Google Calendar and Outlook automatically",
              "Updates when meetings change or get cancelled — no manual alarm management",
              "Fires early enough to actually prepare, not at the moment things start",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <AppStoreButton size="lg" />
            <AndroidWaitlistButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-10 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-zinc-800">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-white">
                  <span className="font-semibold leading-snug">{item.question}</span>
                  <span className="flex-shrink-0 text-lg text-green-500 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related guides</h2>
          <ul className="space-y-3">
            {[
              { href: "/never-be-late-to-meetings", label: "How to Never Be Late to Meetings →" },
              { href: "/adhd-time-blindness-tools", label: "Tools That Help With ADHD Time Blindness →" },
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail →" },
              { href: "/calendar-alarm-app", label: "Calendar Alarm App →" },
              { href: "/meeting-reminder-app", label: "Meeting Reminder App →" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-green-500 transition-colors hover:text-green-400"
                >
                  {link.label}
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
            An alarm that demands your attention.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and replace passive calendar notifications with persistent
            alarms that don&apos;t disappear until you act.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreButton size="lg" />
          </div>
          <p className="mt-6 text-sm text-zinc-400">
            Android coming soon —{" "}
            <Link href="/android" className="text-green-500 hover:text-green-400">
              join the waitlist.
            </Link>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-zinc-800 pt-8 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white">Home</Link>
            <Link href="/features" className="text-zinc-400 hover:text-white">Features</Link>
            <Link href="/faq" className="text-zinc-400 hover:text-white">FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
