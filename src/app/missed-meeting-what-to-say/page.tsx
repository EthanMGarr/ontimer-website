import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Missed a Meeting? What to Say (Email + Slack Templates)",
  description:
    "Missed a meeting? Use these copy-paste email and Slack apology templates to recover professionally — and learn when to reschedule vs move on.",
  alternates: { canonical: "https://www.ontimer.app/missed-meeting-what-to-say" },
  openGraph: {
    title: "Missed a Meeting? What to Say (Email + Slack Templates)",
    description:
      "Missed a meeting? Use these copy-paste email and Slack apology templates to recover professionally — and learn when to reschedule vs move on.",
    url: "https://www.ontimer.app/missed-meeting-what-to-say",
    type: "article",
  },
};

const faqItems = [
  {
    question: "What should I say when I miss a meeting?",
    answer:
      "Reach out within 15 minutes with a short, honest message. Acknowledge the miss directly, don't over-explain, and offer a next step — either rescheduling or asking for notes. Example: \"I missed our meeting — I'm sorry. Can we reschedule? I'm free [options].\"",
  },
  {
    question: "Should I email or Slack someone I missed a meeting with?",
    answer:
      "Use Slack for internal teammates — it's faster and more conversational. Use email for clients, external contacts, or senior stakeholders where a more formal record is appropriate. When in doubt, match the channel you originally coordinated in.",
  },
  {
    question: "How do you apologize for missing a meeting professionally?",
    answer:
      "Keep it short, honest, and forward-looking. Acknowledge the miss without excuses, express genuine accountability, and immediately propose a path forward. Long explanations read as defensiveness. A two-sentence apology with a reschedule offer is more professional than a paragraph.",
  },
  {
    question: "When should you reschedule vs just apologize?",
    answer:
      "Reschedule when you were a key participant, when there was a specific agenda or decision pending, or when the other person waited for you. Skip rescheduling when the meeting was optional, notes are available, and your presence wasn't required for any decision.",
  },
];

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

export default function MissedMeetingWhatToSay() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Missed a Meeting? What to Say (Email + Slack Templates)",
    description:
      "Missed a meeting? Use these copy-paste email and Slack apology templates to recover professionally — and learn when to reschedule vs move on.",
    author: { "@type": "Organization", name: "OnTimer" },
    datePublished: "2026-04-21",
    dateModified: "2026-04-21",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.ontimer.app/missed-meeting-what-to-say",
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
            Missed a Meeting?{" "}
            <span className="text-green-500">What to Say</span>{" "}
            (Email + Slack Templates)
          </h1>
          <p className="mt-4 text-sm text-zinc-400">By OnTimer</p>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="leading-relaxed text-zinc-300">
              If you missed a meeting, reach out within 15 minutes — don&apos;t wait. Use a short, honest message that
              acknowledges the miss and offers next steps. Don&apos;t over-explain. Below are exact copy-paste
              templates for email and Slack.
            </p>
          </div>

          <nav className="mt-8" aria-label="Table of contents">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">On this page</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#immediate", label: "Immediate Actions" },
                { href: "#email-templates", label: "Email Templates" },
                { href: "#slack-templates", label: "Slack Templates" },
                { href: "#email-vs-slack", label: "Email vs Slack" },
                { href: "#reschedule", label: "When to Reschedule vs Recover" },
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

      {/* ── IMMEDIATE ACTIONS ── */}
      <section id="immediate" className="mt-8 border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Immediate Actions
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Do these in order — before anything else.
          </p>

          <div className="mt-10 space-y-10">
            <div>
              <h3 className="text-xl font-bold text-white">1. Reach out within 15 minutes</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                The longer you wait, the worse it looks. Don&apos;t spend time crafting the perfect message — send
                something short and honest now.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                A quick message 10 minutes after the meeting ended signals awareness. A message 4 hours later signals
                avoidance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">2. Acknowledge it directly</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Don&apos;t bury the lead. Start with the fact that you missed it.
              </p>
              <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Good</p>
                <p className="font-mono text-sm text-green-400">&quot;I missed our meeting — I&apos;m sorry.&quot;</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">3. Offer a path forward</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Don&apos;t just apologize and disappear. Propose next steps immediately.
              </p>
              <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Good</p>
                <p className="font-mono text-sm text-green-400">
                  &quot;Can we reschedule? I&apos;m free [Day] at [Time] or [Day] at [Time].&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMAIL TEMPLATES ── */}
      <section id="email-templates" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Email Templates
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Copy one of these and fill in the brackets.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Short apology — internal team
              </h3>
              <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="font-mono text-sm leading-relaxed text-green-400">
                  Subject: Apologies — missed our [time] meeting
                  <br />
                  <br />
                  Hi [Name],
                  <br />
                  <br />
                  I missed our meeting this morning — I&apos;m sorry about that.
                  <br />
                  <br />
                  Would you be open to rescheduling? I&apos;m available [Day] at [Time] or [Day] at [Time].
                  <br />
                  <br />
                  [Your name]
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Formal apology — client or external
              </h3>
              <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="font-mono text-sm leading-relaxed text-green-400">
                  Subject: Apologies for missing our meeting
                  <br />
                  <br />
                  Hi [Name],
                  <br />
                  <br />
                  I want to apologize for missing our scheduled meeting at [time]. This was entirely my mistake and I
                  understand your time is valuable.
                  <br />
                  <br />
                  I&apos;d like to make it right — are you available to reschedule at your convenience? I&apos;m free
                  [options].
                  <br />
                  <br />
                  Thank you for your understanding.
                  <br />
                  [Your name]
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Missed standup or optional meeting
              </h3>
              <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="font-mono text-sm leading-relaxed text-green-400">
                  Subject: Missed today&apos;s standup
                  <br />
                  <br />
                  Hi team,
                  <br />
                  <br />
                  Sorry I missed standup — I&apos;ll catch up on notes. Any decisions I should know about?
                  <br />
                  <br />
                  [Your name]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLACK TEMPLATES ── */}
      <section id="slack-templates" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Slack Templates
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            For internal teams, Slack is faster. Keep it even shorter than email.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                label: "Quick apology — colleague",
                msg: "Hey [Name] — really sorry I missed our call. Can we reschedule? I'm free [options].",
              },
              {
                label: "After missing a team standup",
                msg: "Sorry I missed standup — I'll catch up on notes. Anything I need to know?",
              },
              {
                label: "Missed a 1:1 with your manager",
                msg: "Hey — I missed our 1:1 today. That was on me. Can we find 30 mins this week?",
              },
              {
                label: "Missed a client-facing call (internal message to cover)",
                msg: "Just realized I missed the [client] call — really sorry. Can someone catch me up on what was covered? I'll follow up with [client] now.",
              },
            ].map(({ label, msg }) => (
              <div key={label}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-zinc-500">{label}</h3>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                  <p className="font-mono text-sm text-green-400">&quot;{msg}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL VS SLACK ── */}
      <section id="email-vs-slack" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Email vs Slack: Which to Use
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">Match the channel to the context.</p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-bold text-white">Use email when:</p>
              <ul className="mt-3 space-y-2">
                {[
                  "It's a formal meeting — client, external contact, or senior stakeholder",
                  "The miss was significant — long meeting, important decisions made",
                  "You want a written record of the apology",
                  "The relationship is primarily email-based",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0">—</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-bold text-white">Use Slack when:</p>
              <ul className="mt-3 space-y-2">
                {[
                  "It's an internal team meeting or standup",
                  "The relationship is casual and fast-moving",
                  "Speed of recovery matters more than formality",
                  "You coordinated the meeting in Slack originally",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0">—</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESCHEDULE VS RECOVER ── */}
      <section id="reschedule" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            When to Reschedule vs Recover
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Not every missed meeting needs to be rescheduled. Use this framework.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-bold text-green-500">Reschedule when:</p>
              <ul className="mt-3 space-y-2">
                {[
                  "The meeting had a specific agenda or decision to make",
                  "You were a key participant — not just a listener",
                  "The other person waited for you and the meeting didn't proceed",
                  "There's unfinished business that can't be handled async",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0">—</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-bold text-white">Recover without rescheduling when:</p>
              <ul className="mt-3 space-y-2">
                {[
                  "It was an optional standup or status update",
                  "Notes or a recording are available and sufficient",
                  "Your presence wasn't required for any decision",
                  "The agenda can be covered asynchronously",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0">—</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO PREVENT IT ── */}
      <section id="prevent" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Prevent It Next Time
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Missing a meeting once is understandable. Missing them regularly is a system problem.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            Most calendar reminders are passive — they fire once, make a quiet sound, and disappear. If you&apos;re
            in focus mode, on a call, or simply not looking, they&apos;re gone.{" "}
            <Link href="/why-calendar-reminders-fail" className="text-green-500 transition-colors hover:text-green-400">
              See why calendar reminders fail
            </Link>
            .
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            What works is persistent, interruptive alerts that force acknowledgment — not ones that vanish while
            you&apos;re heads-down. See the{" "}
            <Link
              href="/how-to-never-be-late-to-meetings"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              full guide to never being late to meetings
            </Link>
            , or if you were running late and made it:{" "}
            <Link
              href="/running-late-to-meeting"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              how to handle being late to a meeting
            </Link>
            .
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
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
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
            Stop missing meetings for good.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer connects to your calendar and fires persistent alarms you can&apos;t ignore — so you never have to
            send another apology.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" location="missed-meeting-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
