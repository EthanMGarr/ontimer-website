import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Running Late to a Meeting? What to Do + Copy-Paste Messages",
  description:
    "Running late to a meeting? Use these exact messages and simple rules to handle it professionally — and learn how to stop being late for good.",
  alternates: { canonical: "https://www.ontimer.app/running-late-to-meeting" },
  openGraph: {
    title: "Running Late to a Meeting? What to Do + Copy-Paste Messages",
    description:
      "Running late to a meeting? Use these exact messages and simple rules to handle it professionally — and learn how to stop being late for good.",
    url: "https://www.ontimer.app/running-late-to-meeting",
    type: "article",
  },
};

const faqItems = [
  {
    question: "What should I say if I'm late to a meeting?",
    answer:
      "Send a short, direct message immediately. Something like: \"Running 5 mins behind — joining now.\" Don't wait, don't over-explain, and don't stay silent. A brief acknowledgment is always better than nothing.",
  },
  {
    question: "Is it okay to join a meeting late?",
    answer:
      "Yes, but only if you notify the other participants as soon as you know you'll be late. Join as quickly as possible, don't interrupt, and don't ask for a recap of what you missed mid-meeting.",
  },
  {
    question: "How do you apologize for being late professionally?",
    answer:
      "Keep it short and honest. Say something like: \"Apologies — previous meeting ran over. Joining in 2 mins.\" Avoid long explanations, which sound defensive. A brief, sincere acknowledgment is more professional than over-justifying.",
  },
  {
    question: "What if I completely missed a meeting?",
    answer:
      "Send a message as soon as you realize it: \"Apologies, I missed this — can we reschedule or share notes? I'll make sure I'm on time next time.\" Don't hide from it. Take responsibility and offer a path forward.",
  },
];

const tocItems = [
  { href: "#rules", label: "The 3 Rules" },
  { href: "#messages", label: "Copy-Paste Messages" },
  { href: "#what-not-to-do", label: "What NOT to Do" },
  { href: "#leading-meeting", label: "If You're Leading the Meeting" },
  { href: "#real-problem", label: "The Real Problem" },
  { href: "#how-to-stop", label: "How to Stop Being Late" },
];

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

export default function RunningLateToMeeting() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Running Late to a Meeting? Here's Exactly What to Do (and What Not to Say)",
    description:
      "Running late to a meeting? Use these exact messages and simple rules to handle it professionally — and learn how to stop being late for good.",
    author: { "@type": "Organization", name: "OnTimer" },
    datePublished: "2026-04-20",
    dateModified: "2026-04-20",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.ontimer.app/running-late-to-meeting",
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-12 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Running Late to a Meeting?{" "}
            <span className="text-green-500">Here&apos;s Exactly What to Do</span>{" "}
            (and What Not to Say)
          </h1>
          <p className="mt-4 text-sm text-zinc-400">By OnTimer</p>

          {/* Featured snippet / AI-extractable summary */}
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-zinc-300 leading-relaxed">
              If you&apos;re running late to a meeting, send a short message immediately — don&apos;t wait. Acknowledge
              it, give minimal context, and join as fast as possible. The three rules: acknowledge quickly, be brief,
              and don&apos;t over-explain.
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="mt-8" aria-label="Table of contents">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              On this page
            </p>
            <ul className="space-y-2 text-sm">
              {tocItems.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-green-500 transition-colors hover:text-green-400"
                  >
                    {label} →
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="pb-4 pt-2">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-zinc-400 leading-relaxed">You&apos;re late.</p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            The meeting already started.
            <br />
            You&apos;re staring at your screen, debating what to say — or whether to say anything at all.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Do you apologize?
            <br />
            Make an excuse?
            <br />
            Jump in quietly and hope no one notices?
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Here&apos;s the truth: being late happens.
            <br />
            What matters is how you handle it in the next 30 seconds.
          </p>
        </div>
      </section>

      {/* ── THE 3 RULES ── */}
      <section
        id="rules"
        className="mt-8 border-t border-zinc-800 bg-zinc-900/50 py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The 3 Rules of Being Late (Without Making It Worse)
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            If you remember nothing else, follow these:
          </p>

          <div className="mt-10 space-y-10">
            {/* Rule 1 */}
            <div>
              <h3 className="text-xl font-bold text-white">
                1. Acknowledge it immediately
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Don&apos;t wait. Don&apos;t ghost.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                Even a 5-minute delay deserves a quick message. Silence is what frustrates people most.
              </p>
              <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Good
                </p>
                <p className="font-mono text-sm text-green-400">
                  &quot;Running 5 mins behind — joining now.&quot;
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div>
              <h3 className="text-xl font-bold text-white">
                2. Be specific (but brief)
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Vague apologies feel careless. Long explanations feel defensive.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                Give just enough context to show awareness — then move on.
              </p>
              <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Good
                </p>
                <p className="font-mono text-sm text-green-400">
                  &quot;Apologies — previous meeting ran over. Joining in 2 mins.&quot;
                </p>
              </div>
            </div>

            {/* Rule 3 */}
            <div>
              <h3 className="text-xl font-bold text-white">
                3. Don&apos;t over-explain
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                No one needs your life story.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                The more you write, the more it sounds like an excuse.
              </p>
              <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Bad
                </p>
                <p className="font-mono text-sm text-red-400">
                  &quot;Sorry I&apos;m late, my last call went long and then I had to grab something and my WiFi was
                  acting weird…&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COPY-PASTE MESSAGES ── */}
      <section id="messages" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Copy-Paste Messages You Can Use Right Now
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            If you&apos;re late right now, just grab one of these:
          </p>

          <div className="mt-8 space-y-8">
            {/* 1–5 minutes */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                1–5 minutes late
              </h3>
              <div className="space-y-2">
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                  <p className="font-mono text-sm text-green-400">
                    &quot;Running a few minutes behind — joining now.&quot;
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                  <p className="font-mono text-sm text-green-400">
                    &quot;Apologies, I&apos;m a couple minutes late — logging in.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* 5–10 minutes */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                5–10 minutes late
              </h3>
              <div className="space-y-2">
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                  <p className="font-mono text-sm text-green-400">
                    &quot;Running about 5–10 mins late — please start without me.&quot;
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                  <p className="font-mono text-sm text-green-400">
                    &quot;Apologies, I&apos;m behind — I&apos;ll join shortly.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* 10+ minutes */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                10+ minutes late
              </h3>
              <div className="space-y-2">
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                  <p className="font-mono text-sm text-green-400">
                    &quot;I&apos;m running ~10 minutes late — okay to proceed without me. I&apos;ll catch up when I
                    join.&quot;
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                  <p className="font-mono text-sm text-green-400">
                    &quot;Apologies, I&apos;m delayed — if needed, we can reschedule.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Missed entirely */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                If you completely missed it
              </h3>
              <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                <p className="font-mono text-sm text-green-400">
                  &quot;Apologies, I missed this — can we reschedule or share notes? I&apos;ll make sure I&apos;m on
                  time next time.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT NOT TO DO ── */}
      <section
        id="what-not-to-do"
        className="border-t border-zinc-800 bg-zinc-900/50 py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What NOT to Do When You&apos;re Late
          </h2>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white">Don&apos;t disappear</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Saying nothing is worse than being late.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                People assume you forgot, don&apos;t care, or aren&apos;t coming.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Don&apos;t lie</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Fake excuses are easy to spot — and they erode trust fast.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                A simple, honest acknowledgment is always better.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Don&apos;t write a paragraph</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Long messages feel like justification, not accountability.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">Short = respectful.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IF YOU'RE LEADING THE MEETING ── */}
      <section id="leading-meeting" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            If You&apos;re Leading the Meeting
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Being late hits differently when you&apos;re the organizer.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            You&apos;re not just joining late — you&apos;re holding everyone else up.
          </p>
          <p className="mt-6 text-zinc-400 leading-relaxed">If you&apos;re running late:</p>
          <ul className="mt-3 space-y-2">
            {[
              "Send a message immediately",
              'Give a clear start expectation ("Start without me" or "I\'ll be there in 5")',
              "If you're significantly late, consider rescheduling",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Example
            </p>
            <p className="font-mono text-sm text-green-400">
              &quot;Running 10 mins behind — please start without me. I&apos;ll join and catch up.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ── THE REAL PROBLEM ── */}
      <section
        id="real-problem"
        className="border-t border-zinc-800 bg-zinc-900/50 py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Real Problem: This Shouldn&apos;t Keep Happening
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Handling lateness well is important.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            But if this is happening often, it&apos;s not a communication problem — it&apos;s a system problem.
          </p>
          <p className="mt-6 text-zinc-400 leading-relaxed">Most people rely on:</p>
          <ul className="mt-3 space-y-2">
            {[
              "Calendar notifications that are easy to miss",
              "Silent reminders that disappear",
              "One-time alerts that don't interrupt focus",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            And when you&apos;re deep in work, those simply don&apos;t work.
          </p>

          <div className="mt-10">
            <h3 className="text-xl font-bold text-white">
              Why Calendar Reminders Fail (And What Works Better)
            </h3>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Calendar notifications are passive.
            </p>
            <p className="mt-3 text-zinc-400 leading-relaxed">They:</p>
            <ul className="mt-2 space-y-1">
              {[
                "Show up once",
                "Make no sound (or a quiet one)",
                "Disappear if you're not looking",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-400">
                  <span className="mt-1 flex-shrink-0">—</span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              That&apos;s why it&apos;s so easy to miss them — especially during focused work.
            </p>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              What actually works is persistent, interruptive alerts that force your attention.{" "}
              <Link
                href="/why-calendar-reminders-fail"
                className="text-green-500 transition-colors hover:text-green-400"
              >
                See why calendar reminders fail and what to do instead
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW TO STOP BEING LATE ── */}
      <section id="how-to-stop" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Stop Being Late (Without Thinking About It)
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Instead of relying on willpower, build a system that:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              "Alerts you before meetings",
              "Keeps alerting you until you respond",
              "Works across all your calendars",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            That&apos;s exactly what OnTimer is designed to do. It connects to your existing calendar and creates
            persistent alerts you can&apos;t ignore, so you don&apos;t end up in this situation in the first place.
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
              href="/blog/calendar-reminders-vs-alarms"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              calendar reminders vs alarms: what actually works
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

      {/* ── BOTTOM LINE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Bottom Line
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">If you&apos;re late:</p>
          <ul className="mt-3 space-y-2">
            {[
              "Acknowledge it quickly",
              "Keep it short",
              "Join as fast as possible",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">But more importantly:</p>
          <p className="mt-3 font-semibold text-white leading-relaxed">
            You shouldn&apos;t need this article more than once.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            If being late is a pattern, fix the system — not just the response.
          </p>
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
                <p className="mt-2 text-zinc-400 leading-relaxed">{item.answer}</p>
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
              {
                href: "/how-to-never-be-late-to-meetings",
                label: "How to Never Be Late to Meetings",
              },
              {
                href: "/why-calendar-reminders-fail",
                label: "Why Calendar Reminders Fail",
              },
              {
                href: "/blog/calendar-reminders-vs-alarms",
                label: "Calendar Reminders vs Alarms: What Actually Works",
              },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-green-500 transition-colors hover:text-green-400"
                >
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
            Never miss a meeting again.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer connects to your calendar and fires persistent alarms you can&apos;t ignore — so you&apos;re always
            on time.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" location="running-late-to-meeting-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
