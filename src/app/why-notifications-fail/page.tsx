import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Why Notifications Fail (And Persistent Alarms Work Better)",
  description:
    "Most notifications fail because they require attention at exactly the moment people are distracted. Learn why persistent alarms work better for meetings, medication reminders, flights, and other critical timing moments.",
  alternates: { canonical: "https://www.ontimer.app/why-notifications-fail" },
  openGraph: {
    title: "Why Notifications Fail (And Persistent Alarms Work Better)",
    description:
      "Most notifications fail because they require attention at exactly the moment people are distracted. Learn why persistent alarms work better for critical timing moments.",
    url: "https://www.ontimer.app/why-notifications-fail",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Notifications Fail (And Persistent Alarms Work Better)",
    description:
      "Most notifications fail because they require attention at exactly the moment people are distracted. Learn why persistent alarms work better for critical timing moments.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Notifications Fail (And Persistent Alarms Work Better)",
  description:
    "Most notifications fail because they require attention at exactly the moment people are distracted. Persistent alarms interrupt regardless of what you are doing — and that difference determines whether you make it to the meeting, catch the flight, or take the medication on time.",
  url: "https://www.ontimer.app/why-notifications-fail",
  author: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
  publisher: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
};

const faqItems = [
  {
    question: "Why do phone notifications fail to get my attention?",
    answer:
      "Notifications are passive by design — they appear briefly and disappear automatically, whether or not you saw them or acted on them. When you're focused on something else, your brain is trained to filter them out. This is called notification fatigue or alert fatigue: the more notifications you receive, the less any individual one registers. Notifications inform. They don't interrupt.",
  },
  {
    question: "What is the difference between a notification and an alarm?",
    answer:
      "A notification appears and disappears on its own — no action required to clear it. An alarm stays active until you explicitly dismiss it. Your morning alarm clock doesn't stop because you happened to notice it. It stops because you make it stop. For critical timing moments, that behavioral difference is what determines whether you actually act.",
  },
  {
    question: "Why do I see a reminder and still miss the meeting?",
    answer:
      "The reminder fired at the right time, but you were in the middle of something. You thought 'I'll join in a minute' — and then the notification disappeared, and the urgency went with it. This is the Last 5 Minutes Problem: the execution gap between receiving a reminder and actually acting before the window closes. Notifications don't survive this gap. Alarms do.",
  },
  {
    question: "What is notification fatigue?",
    answer:
      "Notification fatigue is the gradual process of your brain learning to filter out alerts because there are too many of them. The average smartphone user receives dozens of notifications per day. Over time, banners and badges lose their ability to interrupt — they become ambient noise. This is why adding more reminders rarely helps: you need a different kind of alert, not more of the same kind.",
  },
  {
    question: "How do persistent alarms work differently from notifications?",
    answer:
      "Persistent alarms require an active response before they stop. They stay on your screen, they continue sounding, and they don't tolerate being ignored. This creates an unavoidable interruption — which is exactly what's needed in the final minutes before a meeting, a flight departure, or a medication dose. OnTimer uses this mechanism for every calendar event it monitors.",
  },
  {
    question: "Does this apply to ADHD and time blindness?",
    answer:
      "Yes, and more acutely. For people with ADHD or time blindness, hyperfocus makes the passage of time nearly invisible. A notification that appeared 12 minutes ago might feel like it appeared 2 minutes ago. A persistent alarm that is still demanding dismissal 12 minutes later makes the time gap impossible to ignore in the same way.",
  },
  {
    question: "What should I use instead of calendar notifications for important events?",
    answer:
      "Use OnTimer. It connects to your Google Calendar and Microsoft Outlook and turns every event into a persistent alarm on iPhone — not a notification. The alarm stays on your screen until you dismiss it, fires for every event automatically, and works across meetings, medication reminders, flights, and any other calendar event where the timing window closing has real consequences.",
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
      name: "Why Notifications Fail",
      item: "https://ontimer.app/why-notifications-fail",
    },
  ],
};

const comparisonRows = [
  { dimension: "Disappears automatically", notification: true, alarm: false },
  { dimension: "Requires active dismissal", notification: false, alarm: true },
  { dimension: "Can be ignored without interaction", notification: true, alarm: false },
  { dimension: "Stays on lock screen", notification: false, alarm: true },
  { dimension: "Survives deep focus / hyperfocus", notification: false, alarm: true },
  { dimension: "Works when phone face-down", notification: false, alarm: true },
  { dimension: "Competes with other alerts", notification: true, alarm: false },
  { dimension: "Registers during context switching", notification: false, alarm: true },
];

const criticalMoments = [
  {
    title: "Meetings & calls",
    body: "You have the reminder. The notification fires. You're in the middle of a sentence. It disappears before you finish. You miss the meeting.",
  },
  {
    title: "Flight departures",
    body: "Most missed flights don't happen because people forgot the flight. They happen in the final execution window — when a notification is not enough to force you out the door.",
  },
  {
    title: "Medication timing",
    body: "You see the reminder. You think 'in a minute.' That minute turns into an hour. A persistent alarm makes 'in a minute' much harder to sustain.",
  },
  {
    title: "Appointments & pickups",
    body: "Doctor's visits, school pickups, client meetings. Any event where being five minutes late has real consequences — and where a disappearing notification isn't a reliable enough signal.",
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">Why Notifications Fail</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Notification fatigue · Alert blindness · Execution gap
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            Why Notifications Fail<br className="hidden sm:block" />
            <span className="text-zinc-400"> (And Persistent Alarms Work Better)</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Notifications require attention at exactly the moment people are least likely to have it.
            Persistent alarms interrupt regardless. That distinction determines whether you make it to the
            meeting, catch the flight, or take the medication on time.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AppStoreCTA location="why_notif_fail_hero" />
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
              <strong className="text-white">Notifications fail because they are passive — they appear and disappear whether or not you act on them.</strong>{" "}
              When you are focused on something else, they fade without registering. Persistent alarms work
              differently: they stay on your screen and demand a response before stopping. For{" "}
              <strong className="text-white">critical timing moments</strong> — meetings, flights, medication,
              appointments — the interruption is not an annoyance. It is the entire point.
            </p>
          </div>
        </div>
      </section>

      {/* Notifications vs Alarms — Core Distinction */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Notifications Inform. Alarms Interrupt.
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            This is the core distinction — and it is not subtle. It determines whether you actually act or just
            acknowledge that you should.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Notification</p>
              <h3 className="text-xl font-black text-white mb-3">Requires your attention</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                A notification appears at the top of your screen and then disappears — automatically,
                silently, unconditionally. It does not know whether you saw it. It does not care whether you
                acted. Its job is done the moment it appears.
              </p>
              <p className="mt-4 text-xs text-zinc-500">
                If you are focused on something else when it fires: it is gone before you surface.
              </p>
            </div>
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3">Alarm</p>
              <h3 className="text-xl font-black text-white mb-3">Interrupts regardless</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                An alarm stays. It does not disappear because you are busy. It does not silently clear
                itself from your lock screen. It stays there — loud, visible, persistent — until you
                explicitly tell it to stop.
              </p>
              <p className="mt-4 text-xs text-green-500/70">
                Used by: OnTimer (turns your Google &amp; Outlook events into this)
              </p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900">
              <div className="px-5 py-4 text-sm font-semibold text-zinc-400">Behavior</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-zinc-400">Notification</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-green-500">Alarm</div>
            </div>
            {comparisonRows.map(({ dimension, notification, alarm }) => (
              <div key={dimension} className="grid grid-cols-3 border-b border-zinc-800 last:border-0">
                <div className="px-5 py-4 text-sm text-zinc-300">{dimension}</div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm text-center">
                  <span className={notification ? "text-white font-medium" : "text-zinc-600"}>
                    {notification ? "✓" : "✗"}
                  </span>
                </div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm text-center">
                  <span className={alarm ? "text-green-500 font-medium" : "text-zinc-600"}>
                    {alarm ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Psychology Section */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Your Brain Tunes Notifications Out
          </h2>
          <div className="mt-6 space-y-5 text-zinc-400 leading-relaxed">
            <p>
              <strong className="text-white">Notification fatigue</strong> is real and measurable. The
              average smartphone user receives dozens of alerts per day — from messaging apps, email,
              social media, news, and calendar reminders all competing for the same attention budget.
            </p>
            <p>
              Your brain adapts. Over time, the appearance of a notification banner stops triggering a
              genuine interrupt response. You see it, you register it abstractly, and you continue what
              you were doing — because the notification itself does not demand anything more.
            </p>
            <p>
              <strong className="text-white">Alert fatigue</strong> compounds this: the more you see
              alerts you do not act on immediately, the more your brain deprioritizes future alerts from the
              same source. Calendar reminders become wallpaper.
            </p>
            <p>
              <strong className="text-white">Attention fragmentation</strong> makes it worse during
              focused work. When you are in flow — writing, coding, on a call — your attentional filters
              are calibrated to suppress irrelevant input. A notification banner is exactly the kind of
              stimulus those filters are designed to suppress.
            </p>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 mt-4">
              <p className="text-sm font-semibold text-white mb-2">The result:</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The reminder fires at the right time. You were in the middle of something. The banner
                appeared. You registered it abstractly. It disappeared. You never actually transitioned.
                This is why people miss meetings they knew about — the notification worked perfectly and
                still failed.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/last-5-minutes-problem" className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
              The Last 5 Minutes Problem: the execution gap explained →
            </Link>
          </div>
        </div>
      </section>

      {/* ADHD / Time Blindness */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            ADHD, Time Blindness, and Context Switching
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              For people with ADHD or time blindness, notification failure is not just common — it is
              structural. <strong className="text-white">Time blindness</strong> makes the passage of
              time during focused activity invisible. You checked the clock 15 minutes ago and it felt
              like 3 minutes. The notification that fired 10 minutes ago may as well have never happened.
            </p>
            <p>
              <strong className="text-white">Context switching</strong> adds another layer: even when
              a notification does register, transitioning from one task to the meeting or appointment
              requires effort that a disappearing banner does not support. The notification says "now."
              The brain says "one more minute." The notification is already gone.
            </p>
            <p>
              Persistent alarms change the dynamic. They are still there 10 minutes later. They are
              still demanding a response. They cannot be accidentally ignored — they can only be
              deliberately dismissed. For people who miss the standard signal, that persistence is not
              optional. It is the mechanism.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/adhd-time-blindness-tools" className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
              ADHD time blindness tools →
            </Link>
          </div>
        </div>
      </section>

      {/* Critical Timing Moments */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Where Notification Failure Has Real Consequences
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            In low-stakes situations, a missed notification is a minor inconvenience. In{" "}
            <strong className="text-white">critical timing moments</strong>, it is a missed meeting,
            a missed flight, a skipped medication dose, or an appointment you cannot reschedule.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {criticalMoments.map((moment) => (
              <div key={moment.title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="font-bold text-white mb-2">{moment.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{moment.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-3">
            <Link href="/what-time-should-i-leave" className="block text-sm text-green-500 hover:text-green-400 transition-colors">
              → What time should I leave? Free departure time calculator
            </Link>
            <Link href="/how-to-remember-medication-on-time" className="block text-sm text-green-500 hover:text-green-400 transition-colors">
              → How to remember medication on time
            </Link>
          </div>
        </div>
      </section>

      {/* OnTimer Solution */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Persistent Calendar Alarms for Every Critical Moment
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              <strong className="text-white">OnTimer</strong> connects to your Google Calendar and
              Microsoft Outlook and turns every event into a{" "}
              <Link href="/persistent-calendar-reminders" className="text-green-500 hover:text-green-400">
                persistent alarm on iPhone
              </Link>
              . Not a notification. An alarm — the kind that stays on your screen and demands dismissal.
            </p>
            <p>
              When your meeting starts in 10 minutes, the alarm fires. It does not disappear after 5
              seconds. It does not silently clear itself while you are focused. It waits — loud,
              visible, persistent — until you acknowledge it. That is what closes the execution gap
              that notifications cannot.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                heading: "Google Calendar",
                body: "Personal accounts and Workspace. Every event gets a persistent alarm automatically — no per-event setup.",
              },
              {
                heading: "Microsoft Outlook / 365",
                body: "Work calendars, Teams meetings, personal Outlook events. Multiple accounts supported simultaneously.",
              },
              {
                heading: "No manual configuration",
                body: "Your calendar is the source of truth. OnTimer reads your schedule and fires alarms for every event.",
              },
              {
                heading: "Works for every critical moment",
                body: "Meetings, flights, medication, appointments. Any calendar event where the timing window matters.",
              },
            ].map(({ heading, body }) => (
              <div key={heading} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-semibold text-white mb-1">{heading}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <AppStoreCTA location="why_notif_fail_solution" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · iPhone · Google Calendar &amp; Microsoft 365 / Outlook</p>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="border-t border-zinc-800 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
            <h2 className="text-2xl font-black text-white">
              Stop relying on reminders that can be ignored.
            </h2>
            <p className="mt-3 text-zinc-400">
              OnTimer turns your Google Calendar and Outlook events into persistent alarms —
              the kind that close the execution gap instead of falling into it.
            </p>
            <div className="mt-6">
              <AppStoreCTA location="why_notif_fail_midpage" />
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
              { href: "/last-5-minutes-problem", label: "The Last 5 Minutes Problem: Why Notifications Fail When You Need Them" },
              { href: "/persistent-calendar-reminders", label: "How to Make Calendar Reminders Persistent" },
              { href: "/turn-calendar-events-into-alarms", label: "How to Turn Calendar Events Into Real Alarms" },
              { href: "/calendar-notifications-vs-alarms", label: "Calendar Notifications vs Alarms: The Full Breakdown" },
              { href: "/best-calendar-alarm-app", label: "Best Calendar Alarm App for Google & Outlook" },
              { href: "/adhd-time-blindness-tools", label: "ADHD Time Blindness Tools" },
              { href: "/what-time-should-i-leave", label: "What Time Should I Leave? Free Calculator" },
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
            Notifications inform. Alarms interrupt.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and turn your calendar events into persistent alarms that actually
            get your attention when it matters.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="why_notif_fail_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
