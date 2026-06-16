import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";
import { WhyNotificationsFailGraphic } from "@/components/WhyNotificationsFailGraphic";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/why-calendar-notifications-fail" },
  title: "Why Calendar Notifications Fail (And What Actually Works)",
  description:
    "You set the reminder. You still missed the meeting. Calendar notifications fail because they're passive — they inform without interrupting. Here's the full breakdown and what to use instead.",
  openGraph: {
    title: "Why Calendar Notifications Fail (And What Actually Works)",
    description:
      "You set the reminder. You still missed the meeting. Calendar notifications fail because they're passive — they inform without interrupting.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Calendar Notifications Fail (And What Actually Works)",
    description:
      "You set the reminder. You still missed the meeting. Calendar notifications fail because they're passive — they inform without interrupting.",
  },
};

const faqItems = [
  {
    question: "Why do my calendar notifications keep failing?",
    answer:
      "Calendar notifications fail for two reasons: system-level issues (Focus mode blocking alerts, permissions reset by an OS update, background restrictions) and behavioral issues (notifications disappear before you act, you see them and defer, or attention fatigue makes you stop registering them). System issues are fixable. Behavioral issues require a different alert type — an alarm, not a notification.",
  },
  {
    question: "Why did I miss a meeting even though I set a reminder?",
    answer:
      "Because a notification only has to inform you — it doesn't have to make you act. You can see a calendar notification, consciously register the meeting time, decide to finish what you're doing first, and then look up five minutes later to find the notification gone and the meeting started. The reminder worked exactly as designed. The design just wasn't built to handle the gap between knowing and acting.",
  },
  {
    question: "Why are Google Calendar notifications unreliable on iPhone?",
    answer:
      "Google Calendar notifications on iPhone pass through Apple's notification delivery system, which can be affected by Focus mode, background app restrictions, and OS-level delivery delays. Additionally, the notifications themselves are passive — they appear and disappear regardless of whether you've acted on them. Even when delivered perfectly, they can be missed.",
  },
  {
    question: "What's the difference between a calendar notification and an alarm?",
    answer:
      "A notification informs. An alarm interrupts. A calendar notification appears on your screen for a few seconds and disappears whether or not you act on it. A calendar alarm — like the one OnTimer fires — occupies your full screen, plays audio, and continues until you explicitly dismiss or snooze it. You cannot ignore it without making an active decision.",
  },
  {
    question: "What should I use instead of calendar notifications for important events?",
    answer:
      "Use persistent alarms instead of notifications for any time-critical event. OnTimer connects to Google Calendar and Outlook and fires a persistent alarm before each event — it stays on your screen and continues alerting until you respond. Unlike a passive notification, it requires acknowledgment.",
  },
  {
    question: "Why does notification fatigue cause missed reminders?",
    answer:
      "The average smartphone delivers dozens of notifications per day. Over time, the brain habituates — it classifies banner alerts as low-priority background noise and stops fully processing them. A calendar reminder looks identical to a news alert or social media notification. After enough exposure, your brain stops treating it as requiring immediate action.",
  },
  {
    question: "Can I make calendar reminders impossible to miss on iPhone?",
    answer:
      "Not with standard calendar notifications — they're passive by design. The closest equivalent to an impossible-to-miss alert is an alarm: it continues making noise until you explicitly dismiss it. OnTimer turns your Google Calendar and Outlook events into persistent alarms that fire automatically before each event and stay on screen until dismissed.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Calendar Notifications Fail (And What Actually Works)",
  description:
    "You set the reminder. You still missed the meeting. Calendar notifications fail because they're passive — they inform without interrupting. Here's the full breakdown and what to use instead.",
  author: { "@type": "Organization", name: "OnTimer" },
  publisher: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
  url: "https://www.ontimer.app/why-calendar-notifications-fail",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/why-calendar-notifications-fail" },
  datePublished: "2026-04-01",
  dateModified: "2026-06-01",
};

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
      name: "Why Calendar Notifications Fail",
      item: "https://ontimer.app/why-calendar-notifications-fail",
    },
  ],
};

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
            <span className="text-zinc-300">Why Calendar Notifications Fail</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Google Calendar · iPhone · Outlook
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            Why Calendar Notifications Fail
            <br />
            <span className="text-green-500">(And What Actually Works)</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            You set the reminder. You might have even seen it. You still missed the meeting.
            You&apos;re not imagining it — this is how calendar notifications are designed to behave.
            Here&apos;s why the design fails you, and what to use instead.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <AppStoreCTA location="why_calendar_notifications_fail_hero" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Works with Google Calendar &amp; Microsoft 365 / Outlook</p>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-white">Calendar notifications fail because they are passive.</strong>{" "}
              A notification requires you to see it, read it, and act on it at exactly the right moment — the
              instant it appears. In the real world, that rarely happens. You might dismiss it without
              thinking, miss it during a focused session, or see it and tell yourself you&apos;ll act in a
              minute. The notification has already disappeared. Nothing interrupts you again.
            </p>
          </div>
        </div>
      </section>

      {/* Framework Graphic */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-4 text-sm text-zinc-500 leading-relaxed">
            Most reminder failures happen after the notification is seen — not before. The graphic below maps the behavioral gap that passive alerts cannot close.
          </p>
          <WhyNotificationsFailGraphic
            priority
            caption="Standard notifications inform. Interruptive alarms close the gap between awareness and action."
          />
        </div>
      </section>

      {/* You Saw It. You Still Missed It. */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            You Saw the Reminder. You Still Missed It.
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Most people assume that a missed reminder means a broken reminder. The notification never
              fired, the settings were wrong, the app had a bug. These things do happen.
            </p>
            <p>
              But more often, the reminder worked perfectly. The notification appeared. You saw it — or
              half-saw it — while you were in the middle of something else. You registered the meeting
              time. You made a mental note to leave in five minutes. And then you didn&apos;t, because the
              notification was gone, nothing else interrupted you, and your attention returned to whatever
              had it before.
            </p>
            <p>
              This isn&apos;t forgetting. It&apos;s the system failing to account for the gap between
              knowing and acting. Notifications are designed to inform you. They are not designed to change
              your behavior.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/calendar-notifications-not-working"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              Calendar notifications not working at all? Start here →
            </Link>
          </div>
        </div>
      </section>

      {/* Notification Fatigue */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Notification Fatigue: When Your Brain Stops Listening
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The average smartphone delivers dozens of alerts per day — messages, news, social media,
              email, app updates, promotional offers. Your brain processes all of them through the same
              channel: a banner that appears at the top of your screen for a few seconds.
            </p>
            <p>
              Over time, the brain habituates. It learns that most banner notifications require no
              immediate action. It begins classifying them as background noise — registering their
              presence without fully processing their content.
            </p>
            <p>
              A calendar reminder looks identical to a news alert or a social media like. It appears in
              the same place, in the same format, with the same visual weight. Your brain has been trained
              to treat it accordingly.
            </p>
            <p>
              This is <strong className="text-white">alert fatigue</strong> — and it makes calendar
              notifications inherently unreliable for time-critical events, even when they fire correctly
              and you technically &ldquo;see&rdquo; them.
            </p>
          </div>
        </div>
      </section>

      {/* Lock Screen Blindness */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Lock Screen Blindness
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Your lock screen lights up. You pick up your phone. What you see instead of a message is a
              calendar notification about a meeting in fifteen minutes.
            </p>
            <p>
              You process it the same way you process every other lock screen notification that wasn&apos;t
              urgent: you acknowledge it, set the phone back down, and continue what you were doing.
              Fifteen minutes later, you&apos;re still at your desk.
            </p>
            <p>
              Lock screen blindness isn&apos;t carelessness. It&apos;s an efficient filtering mechanism
              that works against you when the notification genuinely requires immediate action. Your brain
              optimizes for speed — &ldquo;I&apos;ll deal with it in a minute&rdquo; is faster than
              stopping right now.
            </p>
          </div>
        </div>
      </section>

      {/* The I'll Do It in a Minute Trap */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The &ldquo;I&apos;ll Do It in a Minute&rdquo; Trap
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              This is the most common — and most dangerous — way reminders fail. You see the notification.
              You consciously read it. You understand you have a meeting soon. You decide to finish the
              sentence you&apos;re writing, or the task you&apos;re in the middle of, before getting up.
            </p>
            <p>
              The notification disappears. No second alert fires. You return to your task with full focus.
              Somewhere in the next fifteen minutes, the meeting starts without you.
            </p>
            <p>
              This is <strong className="text-white">active deferral</strong> — you made a conscious
              decision to act later, and the system had no mechanism to follow through. A notification
              cannot reschedule itself. Once dismissed or faded, it is gone.
            </p>
            <p>
              The only alert that prevents active deferral is one that can&apos;t be passively ignored —
              that continues demanding a response until you make an active decision to dismiss or snooze it.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/last-5-minutes-problem"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              The Last 5 Minutes Problem: the execution gap between knowing and acting →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Standard Reminders Are Passive */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Standard Reminders Are Passive by Design
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Google Calendar, Apple Calendar, and Outlook use the operating system&apos;s standard
              notification pipeline. This pipeline was designed to be low-interruption — to inform users
              without disrupting what they&apos;re doing.
            </p>
            <p>
              That design philosophy is appropriate for most app notifications. If a news app fires a
              banner while you&apos;re in a meeting, you want it to fade quietly. If a social media app
              sends a like notification, you want to register it and move on.
            </p>
            <p>
              Calendar events are different. A meeting has a hard start time. The cost of ignoring the
              notification isn&apos;t mild inconvenience — it&apos;s a missed meeting, a missed flight, a
              professional embarrassment, or an appointment you cannot reschedule.
            </p>
            <p>
              But the notification doesn&apos;t know any of this. It fires once, waits a few seconds, and
              disappears — whether or not you acted, whether or not you even noticed it. The system treats
              your calendar event the same way it treats every other alert.
            </p>
          </div>
        </div>
      </section>

      {/* Why Alarms Work Differently */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Alarms Work Differently
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Alarms don&apos;t ask for your attention. They take it.
            </p>
            <p>
              A phone alarm occupies your full screen, plays audio, and continues until you explicitly
              dismiss or snooze it. It cannot be passively ignored — doing nothing has the same result as
              when your morning alarm goes off. The sound keeps going.
            </p>
            <p>
              You don&apos;t wake up in the morning because you happened to notice a notification about
              sleeping. You wake up because something won&apos;t stop demanding acknowledgment. That forced
              interaction is what makes alarms effective for time-critical events.
            </p>
            <p>
              The same principle applies to calendar events. A persistent alarm before a meeting requires
              you to make an active decision — dismiss or snooze — before it stops. That decision moment is
              where the behavioral change happens.
            </p>
          </div>
        </div>
      </section>

      {/* Notifications vs Alarms Comparison Table */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Notifications vs Alarms: The Real Difference
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            The distinction isn&apos;t about volume or visibility. It&apos;s about whether a response is
            required.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-900">
              <div className="px-6 py-4 text-sm font-semibold text-zinc-400">Calendar Notification</div>
              <div className="border-l border-zinc-800 px-6 py-4 text-sm font-semibold text-green-500">Persistent Alarm</div>
            </div>
            {[
              ["Fires once and disappears", "Continues until explicitly dismissed"],
              ["Passive — no response required", "Interruptive — demands a response"],
              ["4–8 seconds on screen", "Stays until you act"],
              ["Can be missed without consequence", "Cannot be passively ignored"],
              ["Competes with all other alerts", "Takes over screen and audio"],
              ["Easy to defer with no follow-up", "Forces a dismiss-or-snooze decision"],
              ["Blocked silently by Focus mode", "Can bypass Focus for critical events"],
              ["Designed to inform", "Designed to change behavior"],
            ].map(([left, right], i) => (
              <div key={i} className="grid grid-cols-2 border-b border-zinc-800 last:border-0">
                <div className="px-6 py-4 text-sm text-zinc-400">{left}</div>
                <div className="border-l border-zinc-800 px-6 py-4 text-sm font-medium text-white">{right}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/calendar-notifications-vs-alarms"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              Full breakdown: Calendar notifications vs alarms →
            </Link>
          </div>
        </div>
      </section>

      {/* What Persistent Alarms Are */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Persistent Calendar Alarms Are
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A persistent alarm stays on your screen until you respond to it. Unlike a notification banner
              that disappears after a few seconds, a persistent alarm:
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {[
              "Occupies your full screen — not just a banner at the top",
              "Plays audio continuously, not just a brief chime",
              "Requires an explicit dismiss or snooze action before it stops",
              "Cannot be accidentally cleared by swiping away notification center",
              "Continues firing even if your phone is face-down or screen is off",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 text-green-500 font-bold">✓</span>
                <span className="text-sm text-zinc-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            For calendar events — meetings, flights, medication schedules, appointments — this is the alert
            type that actually accounts for how people behave when they&apos;re focused on something else.
          </p>
          <div className="mt-6">
            <Link
              href="/persistent-calendar-reminders"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              How to make calendar reminders persistent →
            </Link>
          </div>
        </div>
      </section>

      {/* How OnTimer Solves This */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Replaces Failing Notifications
          </h2>
          <div className="mt-6 text-zinc-400 leading-relaxed">
            <p>
              OnTimer is a{" "}
              <Link href="/calendar-alarm-app" className="text-green-500 hover:text-green-400">
                calendar alarm app
              </Link>{" "}
              for iPhone. It connects to your Google Calendar and Microsoft 365 / Outlook and, instead of
              relying on the standard notification pipeline, fires a persistent alarm before each event —
              the same type of alert as your morning alarm.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            {[
              {
                title: "Automatic — no setup per event",
                body: "OnTimer reads your calendar and fires alarms automatically. You don't configure reminders individually. Connect your calendar and every upcoming event gets an alarm.",
              },
              {
                title: "Persistent — stays on screen until dismissed",
                body: "The alarm doesn't disappear after 4 seconds. It stays on your screen and continues alerting until you actively dismiss or snooze it.",
              },
              {
                title: "Adjustable lead time",
                body: "Set how far in advance the alarm fires — 5 minutes before, 15 minutes, 30 minutes. Adjust based on your commute or preparation time.",
              },
              {
                title: "Works with Google Calendar and Outlook",
                body: "Connect Google and Microsoft accounts — including multiple accounts per provider. OnTimer consolidates them into one alarm stream.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <AppStoreCTA location="why_calendar_notifications_fail_solution" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · iPhone · Google Calendar &amp; Microsoft 365 / Outlook</p>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <h2 className="text-2xl font-black text-white">
              Stop relying on notifications for time-critical events.
            </h2>
            <p className="mt-3 text-zinc-400">
              OnTimer turns your calendar into persistent alarms that stay until you respond.
            </p>
            <div className="mt-6 flex justify-center">
              <AppStoreCTA location="why_calendar_notifications_fail_mid_cta" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
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
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related Guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/calendar-notifications-not-working", label: "Calendar Notifications Not Working? 8 Fixes for iPhone and Google Calendar" },
              { href: "/why-notifications-fail", label: "Why Notifications Fail (And Persistent Alarms Work Better)" },
              { href: "/calendar-notifications-vs-alarms", label: "Calendar Notifications vs Alarms: Why Most Reminders Fail" },
              { href: "/persistent-calendar-reminders", label: "How to Make Calendar Reminders Persistent" },
              { href: "/last-5-minutes-problem", label: "The Last 5 Minutes Problem: Why Notifications Fail at Critical Moments" },
              { href: "/turn-calendar-events-into-alarms", label: "How to Turn Calendar Events Into Real Alarms" },
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail" },
              { href: "/adhd-time-blindness-tools", label: "ADHD Time Blindness Tools" },
              { href: "/best-calendar-alarm-app", label: "Best Calendar Alarm App for Google & Outlook" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-green-500 hover:text-green-400 transition-colors text-sm">
                  {label} →
                </Link>
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
            Notifications inform.
            <br />
            Alarms interrupt.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and replace passive calendar notifications with persistent alarms.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="why_calendar_notifications_fail_final_cta" />
          </div>
          <p className="mt-3 text-sm text-zinc-500">Free · Google Calendar &amp; Microsoft Outlook</p>
        </div>
      </section>
    </>
  );
}
