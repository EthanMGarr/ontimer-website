import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Slept Through a Meeting? Here's What to Do Next",
  description:
    "Slept through a meeting? Don't panic. Here's exactly what to say, how to apologize honestly, and how to rebuild trust — fast.",
  alternates: { canonical: "https://www.ontimer.app/slept-through-meeting-what-to-do" },
  openGraph: {
    title: "Slept Through a Meeting? Here's What to Do Next",
    description:
      "Slept through a meeting? Don't panic. Here's exactly what to say, how to apologize honestly, and how to rebuild trust — fast.",
    url: "https://www.ontimer.app/slept-through-meeting-what-to-do",
    type: "article",
  },
};

const faqItems = [
  {
    question: "What do you say when you sleep through a meeting?",
    answer:
      "Act immediately and be honest. Send a short message: \"I'm so sorry — I slept through our meeting. I feel terrible about it. Can we reschedule?\" Don't fabricate a story. A direct apology recovers more trust than an excuse.",
  },
  {
    question: "How do you apologize for sleeping through a work meeting?",
    answer:
      "Keep it short, honest, and forward-looking. Acknowledge it fully without hedging, express genuine accountability, and immediately propose rescheduling. Don't explain the circumstances unless directly asked — long explanations read as excuses.",
  },
  {
    question: "Can you get fired for sleeping through a meeting?",
    answer:
      "It depends on context — your role, the meeting's importance, your track record, and how you handle the aftermath. A single incident handled professionally and honestly is very rarely a firing offense. A pattern of it, or handling it poorly, is a much bigger risk.",
  },
  {
    question: "How do you make sure you never sleep through a meeting again?",
    answer:
      "Don't rely on a single phone alarm or calendar notification. Use a layered system: multiple alarms set at different times, a persistent alarm app that requires active dismissal, and — for early morning meetings — a physical backup like a second device or a loud clock in another room.",
  },
];

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

export default function SleptThroughMeetingWhatToDo() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Slept Through a Meeting? Here's What to Do Next",
    description:
      "Slept through a meeting? Don't panic. Here's exactly what to say, how to apologize honestly, and how to rebuild trust — fast.",
    author: { "@type": "Organization", name: "OnTimer" },
    datePublished: "2026-04-22",
    dateModified: "2026-04-22",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.ontimer.app/slept-through-meeting-what-to-do",
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
            Slept Through a Meeting?{" "}
            <span className="text-green-500">Here&apos;s What to Do Next</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-400">By OnTimer</p>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="leading-relaxed text-zinc-300">
              If you slept through a meeting, act fast: reach out immediately with a short, honest message. Don&apos;t
              over-explain, don&apos;t fabricate an excuse, and don&apos;t let embarrassment delay your response. A
              quick, direct apology recovers more trust than silence.
            </p>
          </div>

          <nav className="mt-8" aria-label="Table of contents">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">On this page</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#dont-panic", label: "Don't Panic — Act Fast" },
                { href: "#what-to-say", label: "What to Say" },
                { href: "#what-not-to-say", label: "What NOT to Say" },
                { href: "#rebuild-trust", label: "How to Rebuild Trust" },
                { href: "#prevent", label: "How to Prevent It Next Time" },
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

      {/* ── INTRO ── */}
      <section className="pb-4 pt-2">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-zinc-400 leading-relaxed">It happened.</p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            You woke up, looked at the time, and realized the meeting started 40 minutes ago.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            The panic is real. But what you do in the next 5 minutes matters more than what happened.
          </p>
        </div>
      </section>

      {/* ── DON'T PANIC ── */}
      <section id="dont-panic" className="mt-8 border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Don&apos;t Panic — Act Fast
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Sleeping through a meeting is embarrassing. But the damage is manageable if you act quickly.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            Every minute you wait makes the recovery harder. The moment you realize what happened:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Check how long the meeting was — is it still in progress?",
              "Send a message immediately — before doing anything else",
              "Don't spend 10 minutes composing the perfect apology",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            If the meeting is still running, you can still join. Send a quick message and jump in — being late is
            better than not showing up at all.
          </p>
        </div>
      </section>

      {/* ── WHAT TO SAY ── */}
      <section id="what-to-say" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to Say
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Be honest. Short. Direct. Don&apos;t make it a paragraph.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                label: "For a colleague",
                msg: "I'm so sorry — I slept through our meeting. I feel terrible about it. Can we reschedule?",
              },
              {
                label: "For your manager",
                msg: "I owe you an apology — I slept through our [time] meeting. That was unacceptable and I take full responsibility. Are you available to reschedule?",
              },
              {
                label: "For a client",
                msg: "Hi [Name], I want to sincerely apologize — I missed our meeting this morning. I understand that's inexcusable and I'm very sorry for the inconvenience. I'd like to make it right — are you available to reschedule at your convenience?",
              },
              {
                label: "If the meeting is still running",
                msg: "So sorry — I just woke up. Joining now if there's still time.",
              },
            ].map(({ label, msg }) => (
              <div key={label}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">{label}</h3>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                  <p className="font-mono text-sm leading-relaxed text-green-400">&quot;{msg}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT NOT TO SAY ── */}
      <section id="what-not-to-say" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What NOT to Say
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The temptation to soften the blow or shift blame is strong. Resist it.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Don&apos;t fabricate a story</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                "I had a family emergency" or "My alarm app crashed" — if it&apos;s not true, don&apos;t say it.
                People often find out. And getting caught in a lie is far worse than the original miss.
              </p>
              <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Bad</p>
                <p className="font-mono text-sm text-red-400">
                  &quot;My internet went down right before the meeting and I couldn&apos;t reach anyone…&quot;
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Don&apos;t write paragraphs</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Long explanations feel like excuses, not accountability. The more words, the less sincere it sounds.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Don&apos;t wait for them to bring it up</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Silence signals you don&apos;t care. Even if you&apos;re embarrassed, reaching out first always reads
                better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── REBUILD TRUST ── */}
      <section id="rebuild-trust" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Rebuild Trust
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The apology opens the door. These four steps close it.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                step: "1. Own it fully",
                detail:
                  "No hedging. No \"I was having a rough week.\" A clean, direct apology without qualifiers is the fastest way to move past this.",
              },
              {
                step: "2. Follow through on the reschedule",
                detail:
                  "Don't let the rescheduled meeting slip. Be 5–10 minutes early. Know the agenda cold before you arrive.",
              },
              {
                step: "3. Show up prepared",
                detail:
                  "In the rescheduled meeting, demonstrate that your presence was worth rescheduling for. Have notes, questions, and your full attention ready.",
              },
              {
                step: "4. Don't bring it up again after the fact",
                detail:
                  "Once the apology is made and accepted, don't keep referencing it. Continued mentions of the incident keep it alive. Move forward.",
              },
            ].map(({ step, detail }) => (
              <div key={step} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-bold text-white">{step}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-zinc-400 leading-relaxed">
            The fastest way to rebuild trust is to show this was an anomaly, not a pattern.
          </p>
        </div>
      </section>

      {/* ── PREVENT IT ── */}
      <section id="prevent" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Prevent It Next Time
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Sleeping through one meeting is recoverable. Sleeping through meetings regularly is not.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            Most phone alarms and calendar reminders fail at the exact moment you need them — when you&apos;re deeply
            asleep or completely focused. A single passive notification isn&apos;t enough.
          </p>
          <p className="mt-6 text-zinc-400 leading-relaxed">What actually works:</p>
          <ul className="mt-3 space-y-2">
            {[
              "Multiple alarms set at different intervals (30 min before, 15 min, 5 min)",
              "A persistent alarm app that requires active dismissal — not a swipe",
              "For early morning: a second physical device or a loud alarm across the room",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-zinc-400">
            Also read:{" "}
            <Link
              href="/why-calendar-reminders-fail"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              why calendar reminders fail
            </Link>
            {" "}—{" "}
            <Link
              href="/never-be-late-to-meetings"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              how to never be late to meetings
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
              { href: "/missed-meeting-what-to-say", label: "Missed a Meeting? What to Say (Email + Slack Templates)" },
              { href: "/how-to-never-be-late-to-meetings", label: "How to Never Be Late to Meetings" },
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
            Never sleep through a meeting again.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer fires persistent alarms before your meetings — ones that require active dismissal and
            won&apos;t let you roll over and ignore them.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="slept-through-meeting-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
