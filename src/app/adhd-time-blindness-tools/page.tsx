import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Best Tools for ADHD Time Blindness | Calendar Alarm Apps and Strategies",
  description:
    "Struggling with ADHD time blindness? Learn how alarms, reminders, and calendar tools can help you stay on schedule.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tools That Help With ADHD Time Blindness",
  description:
    "A guide to tools and strategies for managing ADHD time blindness, including calendar alarm apps.",
  url: "https://www.ontimer.app/adhd-time-blindness-tools",
};

const timeBlindnessTools = [
  {
    name: "Visual timers",
    description:
      "Physical or digital timers that show time passing visually. Help make the passage of time concrete.",
  },
  {
    name: "Time blocking",
    description:
      "Structuring your day into explicit time blocks on your calendar so you always know what should be happening.",
  },
  {
    name: "Alarm-based calendar apps",
    description:
      "Apps that turn calendar events into persistent alarms — not just notifications — so meetings can't be ignored.",
  },
  {
    name: "External cues",
    description:
      "Sounds, vibrations, or visual alerts that interrupt you and bring your attention back to time-sensitive tasks.",
  },
];

const whyRemindersFailAdhd = [
  "ADHD makes it harder to notice the passage of time",
  "notifications disappear too quickly to register",
  "hyperfocus can block out even loud alerts",
  "multiple reminders create noise that gets tuned out",
  "passive alerts require self-interruption, which is harder with ADHD",
];

const howOntimperHelps = [
  "Connects to Google Calendar and Outlook — no manual entry",
  "Fires a persistent alarm before every meeting",
  "Alarm stays on screen until dismissed — can't be ignored",
  "Works automatically based on your existing schedule",
  "Customizable lead time so the alarm fires early enough to prepare",
];

export default function AdhdTimeBlindnessTools() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            Time blindness — difficulty perceiving the passage of time — is one
            of the most common challenges for people with ADHD. It makes it easy
            to lose track of meetings, deadlines, and appointments, even when
            reminders are set.
          </p>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            This guide covers practical tools and strategies that work, and why
            alarm-based calendar apps are especially effective.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreButton size="lg" />
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
          </div>
        </div>
      </section>

      {/* ── TOOLS THAT HELP ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Tools That Help Manage Time Blindness
          </h2>
          <p className="mt-4 text-zinc-400">
            The most effective tools for time blindness share one trait: they
            make time visible or impossible to ignore.
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

      {/* ── HOW ONTIMER HELPS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Helps With Time Awareness
          </h2>
          <div className="mt-4 space-y-4 text-zinc-400 leading-relaxed">
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

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stay On Time With OnTimer
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Stop missing meetings due to time blindness. OnTimer handles the
            interruption so you don&apos;t have to.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreButton size="lg" />
          </div>
          <p className="mt-6 text-sm text-zinc-500">
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
