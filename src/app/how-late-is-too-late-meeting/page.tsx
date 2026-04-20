import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How Late Is Too Late to Join a Meeting?",
  description:
    "Use these time thresholds and context rules to decide whether to join a meeting late, skip it entirely, or reschedule — and what to do in each case.",
  alternates: { canonical: "https://www.ontimer.app/how-late-is-too-late-meeting" },
  openGraph: {
    title: "How Late Is Too Late to Join a Meeting?",
    description:
      "Use these time thresholds and context rules to decide whether to join a meeting late, skip it entirely, or reschedule — and what to do in each case.",
    url: "https://www.ontimer.app/how-late-is-too-late-meeting",
    type: "article",
  },
};

const faqItems = [
  {
    question: "Is it better to join a meeting late or not at all?",
    answer:
      "In most cases, joining late is better than not showing up — as long as you enter without disrupting and the meeting isn't nearly over. The exception: if less than 5 minutes remain, or all decisions have been finalized without you, it's better to skip and follow up with a message.",
  },
  {
    question: "How many minutes late is too late for a Zoom meeting?",
    answer:
      "There's no universal threshold, but a practical rule: don't join if the meeting has less than a third of its time remaining. For a 30-minute meeting, joining 20+ minutes late offers little value and risks disrupting the close. For a 60-minute meeting, joining 15 minutes late still leaves substantial time.",
  },
  {
    question: "What should you do if you arrive too late to a meeting?",
    answer:
      "If you arrive after most of the content has been covered, send a message: \"I was unable to join in time — can someone share notes or any action items assigned to me?\" Follow up on anything you were responsible for and don't pretend the meeting didn't happen.",
  },
  {
    question: "When is it okay to skip a meeting entirely?",
    answer:
      "Skip when: the meeting ends in less than 5 minutes, all decisions have already been finalized, you weren't a required participant and notes exist, or joining would create more disruption than value. Always send a message explaining your absence and asking for notes or action items.",
  },
];

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

export default function HowLateIsTooLateMeeting() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Late Is Too Late to Join a Meeting?",
    description:
      "Use these time thresholds and context rules to decide whether to join a meeting late, skip it entirely, or reschedule — and what to do in each case.",
    author: { "@type": "Organization", name: "OnTimer" },
    datePublished: "2026-04-24",
    dateModified: "2026-04-24",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.ontimer.app/how-late-is-too-late-meeting",
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
            How Late Is{" "}
            <span className="text-green-500">Too Late</span>{" "}
            to Join a Meeting?
          </h1>
          <p className="mt-4 text-sm text-zinc-400">By OnTimer</p>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="leading-relaxed text-zinc-300">
              The general rule: join if you&apos;ll be present for at least a third of the meeting. If a 30-minute
              meeting has 5 minutes left, skip it and follow up with a message. Context matters too — a client call
              warrants joining even very late; an optional standup may not.
            </p>
          </div>

          <nav className="mt-8" aria-label="Table of contents">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">On this page</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#thresholds", label: "Time Thresholds" },
                { href: "#context", label: "Context Factors" },
                { href: "#skip-vs-join", label: "When to Skip vs Join" },
                { href: "#if-you-skip", label: "What to Do If You Skip" },
                { href: "#prevent", label: "How to Avoid This Decision" },
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

      {/* ── TIME THRESHOLDS ── */}
      <section id="thresholds" className="mt-8 border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Time Thresholds
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            These are starting points — context can override any of them.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                threshold: "Under 2 minutes late",
                color: "text-green-500",
                action: "Join immediately",
                detail:
                  "No message needed. Mute yourself and slide in. No one will notice or care.",
              },
              {
                threshold: "2–5 minutes late",
                color: "text-green-400",
                action: "Join — send a quick chat message",
                detail:
                  "Send \"Sorry, running a couple minutes behind\" in the chat as you enter. No verbal apology needed.",
              },
              {
                threshold: "5–10 minutes late",
                color: "text-yellow-500",
                action: "Judgment call",
                detail:
                  "If you're a key participant or it's a short meeting, join and send a pre-message. If you're not presenting and it's a long meeting, send \"Running 10 behind — go ahead without me\" and join when ready.",
              },
              {
                threshold: "10–15 minutes late",
                color: "text-orange-400",
                action: "Consider skipping for short meetings",
                detail:
                  "For a 30-minute meeting: more than half is gone — weigh the value of joining. For a 60-minute meeting: still worth joining. Always send a message regardless.",
              },
              {
                threshold: "15+ minutes late",
                color: "text-red-400",
                action: "Skip short meetings; join long ones",
                detail:
                  "A 30-minute meeting is nearly over. A 90-minute meeting still has most of its time. Evaluate how much is left — not how late you are.",
              },
            ].map(({ threshold, color, action, detail }) => (
              <div key={threshold} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-bold text-white">{threshold}</p>
                  <p className={`text-sm font-semibold ${color} shrink-0`}>{action}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEXT FACTORS ── */}
      <section id="context" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Context Factors
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The same lateness can be fine in one context and a serious problem in another.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                context: "Team standup or internal sync",
                verdict: "Lower threshold — skip if very late",
                detail:
                  "Notes are usually available. Your presence may not be required. If more than half is over, skip and catch up async.",
              },
              {
                context: "Client or external meeting",
                verdict: "Higher threshold — join even if late",
                detail:
                  "Your absence signals disrespect. Join at 10–15 minutes late if there's any time left. Send a message before joining.",
              },
              {
                context: "Presentation or demo you're running",
                verdict: "Join no matter how late",
                detail:
                  "Send a message in advance and propose starting immediately where you would have. Your absence is not an option.",
              },
              {
                context: "Interview",
                verdict: "Treat as critical — message immediately and join",
                detail:
                  "Even 2 minutes late to an interview warrants a message. Join regardless of how late you are and apologize sincerely.",
              },
              {
                context: "All-hands or company-wide meeting",
                verdict: "Join if any time remains",
                detail:
                  "You won't disrupt a large meeting by joining. Attend for the portion you can catch.",
              },
            ].map(({ context, verdict, detail }) => (
              <div key={context}>
                <h3 className="text-lg font-bold text-white">{context}</h3>
                <p className="mt-1 text-sm font-semibold text-green-500">{verdict}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKIP VS JOIN ── */}
      <section id="skip-vs-join" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            When to Skip vs Join
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">Use this as your decision framework.</p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-bold text-red-400">Skip when:</p>
              <ul className="mt-3 space-y-2">
                {[
                  "The meeting ends in less than 5 minutes",
                  "All decisions have already been finalized without you",
                  "Your attendance is not required and notes exist",
                  "Joining would create more disruption than value",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0">—</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-bold text-green-500">Join when:</p>
              <ul className="mt-3 space-y-2">
                {[
                  "You're a named participant or presenter",
                  "Decisions are still in progress that require your input",
                  "It's a client or external stakeholder meeting",
                  "Significant time remains (more than a third of the meeting)",
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

      {/* ── IF YOU SKIP ── */}
      <section id="if-you-skip" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to Do If You Skip
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Deciding not to join doesn&apos;t mean disappearing.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white">1. Message immediately</h3>
              <div className="mt-3 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="font-mono text-sm text-green-400">
                  &quot;I was unable to join in time — can someone share notes or any action items assigned to me?&quot;
                </p>
              </div>
            </div>

            <div>
              <h3 className="mt-4 text-xl font-bold text-white">2. Follow up on action items</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Even if you weren&apos;t there, check for any tasks assigned to you and complete them on time. This
                is the fastest way to show the miss didn&apos;t affect your commitment.
              </p>
            </div>

            <div>
              <h3 className="mt-2 text-xl font-bold text-white">3. Don&apos;t pretend it didn&apos;t happen</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Acknowledge the miss directly with the relevant people. A proactive message is always better than
                being asked about your absence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREVENT ── */}
      <section id="prevent" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Avoid This Decision Entirely
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The best outcome is never having to decide whether it&apos;s too late to join.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            Most people who find themselves in this situation are relying on calendar reminders that fired and
            disappeared while they were focused on something else.{" "}
            <Link href="/why-calendar-reminders-fail" className="text-green-500 transition-colors hover:text-green-400">
              See why calendar reminders fail
            </Link>{" "}
            — and what works instead.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            If you were running late and made it in time:{" "}
            <Link href="/running-late-to-meeting" className="text-green-500 transition-colors hover:text-green-400">
              how to handle joining a meeting late
            </Link>
            . For building a system that prevents lateness altogether:{" "}
            <Link
              href="/how-to-never-be-late-to-meetings"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              how to never be late to meetings
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
              { href: "/join-meeting-late-etiquette", label: "Joining a Meeting Late? Etiquette Rules No One Tells You" },
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
            Never face this choice again.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer fires persistent alarms before your meetings so you always have enough time to join on time —
            no lateness math required.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" location="how-late-too-late-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
