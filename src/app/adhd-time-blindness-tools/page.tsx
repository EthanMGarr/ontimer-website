import type { Metadata } from "next";
import Link from "next/link";
import { AndroidWaitlistButton, AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/adhd-time-blindness-tools" },
  title: "ADHD Time Blindness: Tools That Actually Help You Stay On Time",
  description:
    "Struggling with ADHD time blindness? Learn how alarms, reminders, and calendar tools can help you stay on schedule.",
};

const faqItems = [
  {
    question: "Why do people with ADHD miss meetings despite setting reminders?",
    answer:
      "ADHD impairs time perception — known as time blindness. People see the reminder, intend to act, get absorbed in the current task, and the moment passes without them noticing. It isn't a memory problem or a willpower failure; it's a neurological difficulty perceiving how quickly time is moving.",
  },
  {
    question: "What tools actually help with ADHD time blindness?",
    answer:
      "Tools that work best for ADHD time blindness are those that interrupt rather than just notify: persistent alarms that stay on screen and require active dismissal, visual timers that make time concrete, and external cues that break hyperfocus. Standard calendar notifications — which disappear whether you act or not — are not effective for most people with ADHD.",
  },
  {
    question: "What is the best meeting reminder app for ADHD?",
    answer:
      "The best reminder app for ADHD is one that fires a persistent, hard-to-dismiss alarm — not a passive notification banner. An app that connects to your calendar and requires active dismissal interrupts hyperfocus in a way that a standard push notification cannot.",
  },
];

const timeBlindnessTools = [
  {
    name: "Visual timers",
    description:
      "Physical or digital timers that show time passing visually. Help make the passage of time concrete and harder to ignore. Limitation: they only work if you're actively looking at them.",
  },
  {
    name: "Time blocking",
    description:
      "Structuring your day into explicit time blocks so you always know what should be happening. Limitation: it doesn't alert you when a block is about to start — you still have to notice.",
  },
  {
    name: "Alarm-based calendar apps",
    description:
      "Apps that turn calendar events into persistent alarms — not just notifications — so meetings can't be ignored. The alarm requires a response; it doesn't wait for you to notice it.",
  },
  {
    name: "External cues",
    description:
      "Sounds, vibrations, or visual alerts that interrupt you and bring your attention back to time-sensitive tasks. The key word is interrupt — not remind.",
  },
];

const whyRemindersFailAdhd = [
  "you think you have more time than you do — and genuinely believe it",
  "the notification fires, you see it, and you keep working anyway",
  "hyperfocus makes it impossible to sense that a deadline is close",
  "when you set three alarms, they all blur into background noise",
  "there is nothing forcing you to stop — you have to choose to interrupt yourself, and you don't",
];

const howOntimperHelps = [
  "Connects to Google Calendar and Outlook — no manual entry required",
  "Fires a loud alarm before every meeting — not a notification, an alarm",
  "Alarm stays on screen until you dismiss it — it does not go away on its own",
  "Responds to schedule changes automatically — no updating alarms by hand",
  "Fires early enough to actually prepare — not at the moment the meeting starts",
];

export default function AdhdTimeBlindnessTools() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "ADHD Time Blindness: Tools That Actually Help You Stay On Time",
            description: "Struggling with ADHD time blindness? Learn how alarms, reminders, and calendar tools can help you stay on schedule.",
            author: { "@type": "Organization", name: "OnTimer" },
            publisher: { "@type": "Organization", name: "OnTimer" },
            datePublished: "2026-04-01",
            dateModified: "2026-05-11",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/adhd-time-blindness-tools" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
              { "@type": "ListItem", position: 2, name: "ADHD Time Blindness Tools", item: "https://www.ontimer.app/adhd-time-blindness-tools" },
            ],
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Tools That Help With{" "}
            <span className="text-green-500">ADHD Time Blindness</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            You know about the meeting. You set the reminder. You still ran
            late.
          </p>
          <p className="mt-3 text-base text-zinc-500 leading-relaxed">
            The pattern is almost always the same: you check the time, see that
            you have a few minutes, tell yourself you just need to finish one
            thing — and then it&apos;s too late. That&apos;s not a memory
            problem. It&apos;s a time blindness problem.
          </p>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Time blindness — difficulty perceiving the passage of time — is one
            of the most common challenges for people with ADHD. It makes it easy
            to lose track of meetings, deadlines, and appointments, even when
            reminders are set.
          </p>
          <p className="mt-4 text-base text-zinc-500 leading-relaxed">
            This guide covers the tools that actually help — and why most
            standard advice doesn&apos;t.
          </p>
          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              Standard calendar reminders don&apos;t work well for ADHD time blindness because they require you to notice and react — which doesn&apos;t interrupt hyperfocus. The tools that actually work force interruption: persistent alarms that stay on screen and require active dismissal, making it impossible to drift past the moment without responding.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreCTA />
            <AndroidWaitlistButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHAT IS TIME BLINDNESS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Time Blindness Is
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Time blindness is a term used to describe the difficulty some
              people — particularly those with ADHD — have in accurately
              perceiving how much time has passed or is remaining.
            </p>
            <p>
              It&apos;s not about forgetting that a meeting exists. It&apos;s
              about genuinely losing track of how quickly time is moving.
            </p>
            <p>
              Someone with time blindness might sit down to finish a five-minute
              task before a meeting, then look up and realize thirty minutes
              have passed. The meeting already started.
            </p>
            <p>
              This isn&apos;t a motivation problem. It&apos;s a neurological one
              — and it requires tools that don&apos;t rely solely on self-
              awareness.
            </p>
            <p className="italic text-zinc-300">
              &ldquo;I didn&apos;t forget the meeting. I just didn&apos;t switch
              to it in time.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY PEOPLE WITH ADHD MISS MEETINGS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why People With ADHD Miss Meetings
          </h2>
          <p className="mt-4 text-zinc-400">
            Missing meetings despite using calendar reminders is common with
            ADHD for several reasons:
          </p>
          <ul className="mt-6 space-y-3">
            {whyRemindersFailAdhd.map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Standard calendar reminders were designed for people who need a
            gentle nudge. For people with time blindness, a gentle nudge often
            isn&apos;t enough.
          </p>
        </div>
      </section>

      {/* ── WHY STANDARD REMINDERS FAIL ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Standard Calendar Reminders Often Fail
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Google Calendar and Outlook send notification banners that appear
              briefly on your screen and then disappear.
            </p>
            <p>
              For someone in a state of hyperfocus — common with ADHD — a brief
              notification on the edge of the screen may not break through at
              all.
            </p>
            <p>
              And even if you do see it, a notification doesn&apos;t require
              action. You can glance at it and go right back to what you were
              doing, with the intention of joining in a minute — which never
              comes.
            </p>
            <p>
              Calendar reminders assume you will stop yourself. Time blindness
              means you often won&apos;t.
            </p>
          </div>
        </div>
      </section>

      {/* ── TOOLS THAT HELP ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Tools That Help Manage Time Blindness
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Most advice focuses on awareness. The tools that actually work focus
            on interruption.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            The most effective tools share one trait: they make time visible or
            impossible to ignore.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {timeBlindnessTools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="font-bold text-white">{tool.name}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ALARMS WORK BETTER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Alarm-Based Systems Work Better
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The key difference between a notification and an alarm is that an
              alarm requires a response. It doesn&apos;t wait for you to notice
              it — it demands your attention.
            </p>
            <p>
              For people with ADHD, external interruption is often necessary to
              break out of hyperfocus or a time blindness episode. A persistent
              alarm provides that interruption in a way that a passive
              notification cannot.
            </p>
            <p>
              A{" "}
              <strong className="text-white">calendar alarm app</strong> applies
              this same logic to your meeting schedule — converting passive
              reminders into persistent alarms tied to your actual calendar
              events.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT THIS ACTUALLY LOOKS LIKE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What This Actually Looks Like
          </h2>
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3 text-zinc-400 leading-relaxed">
            <p>It&apos;s 9:52am. You have a meeting at 10:00.</p>
            <p>
              You check the time. Eight minutes. Enough to finish the thing
              you&apos;re in the middle of.
            </p>
            <p>You keep working. At some point you look up. It&apos;s 10:07.</p>
          </div>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Most failures happen in the last 5 minutes before a meeting — not
            because people forgot, but because they thought they had more time
            than they did.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            The problem isn&apos;t the calendar. It&apos;s what happens between
            awareness and action.
          </p>
        </div>
      </section>

      {/* ── HOW ONTIMER HELPS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Helps With Time Awareness
          </h2>
          <div className="mt-4 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Instead of relying on you to notice time, OnTimer takes over the
              moment where things usually break.
            </p>
            <p>
              <Link href="/" className="text-green-500 hover:text-green-400">
                OnTimer
              </Link>{" "}
              connects to Google Calendar and Microsoft Outlook and turns every
              calendar event into a persistent alarm.
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {howOntimperHelps.map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            For people with ADHD or time blindness, this means you no longer
            need to rely on self-interruption or memory. OnTimer interrupts
            you — automatically, on time, every time.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/features" className="text-sm font-semibold text-green-500 hover:text-green-400">
              See all features →
            </Link>
            <Link href="/how-it-works" className="text-sm font-semibold text-green-500 hover:text-green-400">
              How it works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
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

      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related Guides</h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/last-5-minutes-problem"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                The Last 5 Minutes Problem: Why Notifications Fail →
              </Link>
            </li>
            <li>
              <Link
                href="/never-be-late-to-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Never Be Late to Meetings →
              </Link>
            </li>
            <li>
              <Link
                href="/best-calendar-alarm-app"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Best Calendar Alarm App for Google &amp; Outlook →
              </Link>
            </li>
            <li>
              <Link
                href="/persistent-calendar-reminders"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Make Calendar Reminders Persistent →
              </Link>
            </li>
            <li>
              <Link
                href="/turn-calendar-events-into-alarms"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Turn Calendar Events Into Persistent Alarms →
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
            Stop relying on noticing time.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Use a system that interrupts you when it matters.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreCTA />
          </div>
          <p className="mt-6 text-sm text-zinc-400">
            Android coming soon —{" "}
            <Link href="/android" className="text-green-500 hover:text-green-400">
              join the waitlist.
            </Link>
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-zinc-800 pt-8 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white">Home</Link>
            <Link href="/features" className="text-zinc-400 hover:text-white">Features</Link>
            <Link href="/how-it-works" className="text-zinc-400 hover:text-white">How It Works</Link>
          </div>
        </div>
      </section>
    </>
  );
}
