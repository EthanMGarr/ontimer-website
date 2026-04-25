import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Apologize for Missing a Meeting (Templates + Rules)",
  description:
    "The right way to apologize for missing a meeting — with exact email and Slack templates, a step-by-step recovery framework, and rules for every context.",
  alternates: {
    canonical: "https://www.ontimer.app/how-to-apologize-for-missing-a-meeting",
  },
  openGraph: {
    title: "How to Apologize for Missing a Meeting (Templates + Rules)",
    description:
      "The right way to apologize for missing a meeting — with exact email and Slack templates, a step-by-step recovery framework, and rules for every context.",
    url: "https://www.ontimer.app/how-to-apologize-for-missing-a-meeting",
    type: "article",
  },
};

const faqItems = [
  {
    question: "What do you say when you miss a meeting?",
    answer:
      "Send a short, direct message as soon as you realize you missed it. Acknowledge the miss, take responsibility without over-explaining, and propose a next step — reschedule or ask for notes. Example: \"I missed our meeting — I'm sorry. That was on me. Can we reschedule? I'm free [options].\" How fast you reach out matters more than how perfectly you phrase it.",
  },
  {
    question: "How do you professionally apologize for missing a meeting?",
    answer:
      "Keep it brief, honest, and forward-looking. Use the formula: acknowledge + take responsibility + propose next step. Avoid long explanations — they read as excuses. A professional apology ends with an action, not just regret. \"I missed our meeting today — I apologize. I'd like to reschedule at your convenience.\" is complete and professional.",
  },
  {
    question: "Should you email or message when you miss a meeting?",
    answer:
      "Match the channel to the relationship. For colleagues and teammates, Slack or a quick text is appropriate and faster. For clients, managers, or external contacts, email is more professional and creates a written record. When in doubt, use the same channel you originally used to coordinate the meeting.",
  },
  {
    question: "How do you apologize to a client for missing a meeting?",
    answer:
      "Be more formal and more immediate. Email them directly: acknowledge the miss, express genuine accountability, and offer two reschedule options. Don't ask them to find time — propose specific slots. \"I sincerely apologize for missing our meeting. I'd like to reschedule — I'm available [Day] at [Time] or [Day] at [Time]. Please let me know what works.\"",
  },
  {
    question: "Is it okay to miss a meeting without notice?",
    answer:
      "No. Even if the miss was unavoidable, saying nothing makes it worse. A no-show with no communication signals that you either forgot or don't care. A message sent immediately — even after the fact — shows awareness and respect. A delayed apology is better than no apology.",
  },
  {
    question: "How late can you be before it counts as missing a meeting?",
    answer:
      "Generally, if you join before the meeting ends and significant time remains, you've arrived late — not missed it. If you arrive after the meeting has concluded, or after all decisions were finalized without you, it counts as a miss. The practical threshold is around 50% of the meeting's duration: missing more than half is functionally a no-show.",
  },
  {
    question: "What's the difference between apologizing for being late vs. missing a meeting?",
    answer:
      "Being late means you showed up — the apology is brief and delivered as you join. Missing a meeting means you didn't show at all — the apology requires a message, a next step, and often a reschedule offer. The tone is also different: lateness is a mild inconvenience; a full miss, especially without notice, carries more weight and needs more direct accountability.",
  },
];

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

export default function HowToApologizeForMissingMeeting() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Apologize for Missing a Meeting (Templates + Rules)",
    description:
      "The right way to apologize for missing a meeting — with exact email and Slack templates, a step-by-step recovery framework, and rules for every context.",
    author: { "@type": "Organization", name: "OnTimer" },
    datePublished: "2026-04-27",
    dateModified: "2026-04-27",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.ontimer.app/how-to-apologize-for-missing-a-meeting",
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
            How to Apologize for{" "}
            <span className="text-green-500">Missing a Meeting</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-400">By OnTimer · Updated April 2026</p>

          {/* ── DIRECT ANSWER BLOCK ── */}
          <div className="mt-6 rounded-xl border border-green-500/30 bg-zinc-900/80 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-500">
              Direct Answer
            </p>
            <p className="leading-relaxed text-zinc-200">
              To apologize for missing a meeting, send a message as soon as you realize the miss — not hours later.
              The formula:{" "}
              <span className="font-semibold text-white">
                acknowledge the miss + take responsibility (no excuses) + propose a next step.
              </span>
            </p>
            <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3">
              <p className="font-mono text-sm text-green-400">
                &quot;I missed our meeting — I&apos;m sorry. That was on me. Can we reschedule? I&apos;m free [Day] at [Time] or [Day] at [Time].&quot;
              </p>
            </div>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Three rules: don&apos;t wait, don&apos;t over-explain, and always end with an action. A missed
              meeting is recoverable. A missed meeting followed by silence is not. Speed matters more than
              perfect phrasing.
            </p>
          </div>

          {/* TOC */}
          <nav className="mt-8" aria-label="Table of contents">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">On this page</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#three-rules", label: "The 3 Rules" },
                { href: "#templates", label: "Copy-Paste Templates" },
                { href: "#client", label: "Apologizing to a Client" },
                { href: "#recovery", label: "Step-by-Step Recovery" },
                { href: "#what-not-to-do", label: "What Not to Do" },
                { href: "#scenario", label: "Real-World Scenario" },
                { href: "#faq", label: "FAQ" },
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

      {/* ── CITABLE BLOCK 1: THE 3 RULES ── */}
      <section id="three-rules" className="mt-8 border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Citable Answer</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The 3 Rules for Apologizing for a Missed Meeting
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            A good apology for a missed meeting follows three rules. These apply regardless of context — colleague,
            manager, or client.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                rule: "Rule 1 — Send it immediately",
                detail:
                  "A delayed apology looks like avoidance. The moment you realize you missed the meeting, send a message. A message that arrives 10 minutes after the meeting ended reads as accountable. A message that arrives 4 hours later reads as damage control. Speed signals that you care.",
              },
              {
                rule: "Rule 2 — Take responsibility without over-explaining",
                detail:
                  "One sentence of acknowledgment is enough: \"I missed our meeting — I'm sorry.\" Don't follow it with a paragraph of context. Long explanations shift the tone from accountability to defensiveness. If you have a genuine reason, one line is sufficient. If you don't, skip it entirely.",
              },
              {
                rule: "Rule 3 — End with a next step",
                detail:
                  "An apology with no proposed action leaves the other person with nothing to work with. Always close with either a reschedule offer, a request for notes, or a confirmation that you'll handle any action items. \"Can we reschedule? I'm free [options]\" turns an apology into a resolution.",
              },
            ].map(({ rule, detail }) => (
              <div key={rule} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-bold text-white">{rule}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section id="templates" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Copy-Paste Templates</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Exact Templates for Every Situation
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">Fill in the brackets. Send immediately.</p>

          <div className="mt-8 space-y-8">
            {/* Email - internal */}
            <div>
              <h3 className="mb-1 text-base font-bold text-white">Email — Internal / Colleague</h3>
              <p className="mb-3 text-xs text-zinc-500">Use when: internal team, casual relationship</p>
              <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="font-mono text-sm leading-relaxed text-green-400">
                  Subject: Apologies — missed our [time] meeting
                  <br /><br />
                  Hi [Name],
                  <br /><br />
                  I missed our meeting today — I&apos;m sorry about that. Completely on me.
                  <br /><br />
                  Would you be open to rescheduling? I&apos;m free [Day] at [Time] or [Day] at [Time].
                  <br /><br />
                  [Your name]
                </p>
              </div>
            </div>

            {/* Email - manager */}
            <div>
              <h3 className="mb-1 text-base font-bold text-white">Email — Manager or Senior Stakeholder</h3>
              <p className="mb-3 text-xs text-zinc-500">Use when: direct report relationship, higher stakes</p>
              <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="font-mono text-sm leading-relaxed text-green-400">
                  Subject: Apologies for missing our meeting
                  <br /><br />
                  Hi [Name],
                  <br /><br />
                  I want to apologize for missing our [time] meeting today. That was unacceptable and I take
                  full responsibility.
                  <br /><br />
                  Are you available to reschedule? I&apos;m free at [options] and will make sure I&apos;m there.
                  <br /><br />
                  [Your name]
                </p>
              </div>
            </div>

            {/* Slack */}
            <div>
              <h3 className="mb-1 text-base font-bold text-white">Slack — Quick Recovery</h3>
              <p className="mb-3 text-xs text-zinc-500">Use when: internal team, fast-moving environment</p>
              <div className="space-y-2">
                {[
                  "\"Hey [Name] — I missed our call today, I'm really sorry. Can we reschedule? Free [options].\"",
                  "\"Apologies for missing standup — catching up on notes now. Anything I need to know?\"",
                  "\"I missed our 1:1 — that's on me. Can we find 30 minutes this week?\"",
                ].map((msg) => (
                  <div key={msg} className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                    <p className="font-mono text-sm text-green-400">{msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* No-reschedule needed */}
            <div>
              <h3 className="mb-1 text-base font-bold text-white">When No Reschedule Is Needed</h3>
              <p className="mb-3 text-xs text-zinc-500">Use when: meeting proceeded without you, notes exist</p>
              <div className="space-y-2">
                {[
                  "\"Sorry I missed this — can someone share notes? I'll follow up on any action items assigned to me.\"",
                  "\"I missed the meeting today — apologies. I've reviewed the notes and I'm up to speed. Let me know if there's anything I should action.\"",
                ].map((msg) => (
                  <div key={msg} className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                    <p className="font-mono text-sm text-green-400">{msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CITABLE BLOCK 2: CLIENT APOLOGY ── */}
      <section id="client" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Citable Answer</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Apologize to a Client for Missing a Meeting
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            Apologizing to a client for a missed meeting requires a higher level of formality and a faster response
            than an internal miss. The client relationship is at stake — how you handle this matters.
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            Key differences from internal apologies: email is always preferred over Slack, you should propose
            specific reschedule slots (don&apos;t make them find the time), and a brief verbal acknowledgment at
            the start of the rescheduled meeting is expected.
          </p>

          <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Client email template</p>
            <p className="font-mono text-sm leading-relaxed text-green-400">
              Subject: Apologies for missing our meeting today
              <br /><br />
              Hi [Name],
              <br /><br />
              I want to sincerely apologize for missing our scheduled meeting at [time] today. I understand your
              time is valuable, and this was entirely my mistake.
              <br /><br />
              I&apos;d like to make it right. I&apos;m available [Day] at [Time] or [Day] at [Time] — please let
              me know which works better for you, or suggest a time that does.
              <br /><br />
              Thank you for your understanding.
              <br />
              [Your name]
            </p>
          </div>

          <p className="mt-6 leading-relaxed text-zinc-400">
            At the start of the rescheduled call, say one sentence: &quot;Again, I apologize for missing our
            last meeting.&quot; Then move directly to the agenda. Don&apos;t dwell on it — demonstrating value
            in the rescheduled meeting recovers trust faster than more apologizing.
          </p>
        </div>
      </section>

      {/* ── CITABLE BLOCK 3: STEP-BY-STEP RECOVERY ── */}
      <section id="recovery" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Citable Answer</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Step-by-Step Recovery After Missing a Meeting
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            Follow these steps in order. Each one matters.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                step: "Step 1 — Send a message immediately",
                detail:
                  "As soon as you realize you missed it. Don't draft and redraft — send something short and honest within minutes. Speed signals accountability. A 5-minute response is better than a polished message 2 hours later.",
              },
              {
                step: "Step 2 — Acknowledge it directly",
                detail:
                  "Lead with the miss. Don't bury it in pleasantries or background context. \"I missed our meeting — I'm sorry\" is more effective than a paragraph that eventually gets to the point.",
              },
              {
                step: "Step 3 — Take responsibility without excuses",
                detail:
                  "One line of context is the maximum. \"My previous meeting ran over\" is acceptable. A paragraph explaining your morning is not. If you don't have a clean reason, say nothing — \"That was on me\" is complete on its own.",
              },
              {
                step: "Step 4 — Propose a next step",
                detail:
                  "Either offer to reschedule (with specific times) or ask for notes and commit to handling any action items. Give the other person something to act on. An apology with no resolution leaves them with nothing.",
              },
              {
                step: "Step 5 — Follow through",
                detail:
                  "If you rescheduled, be 10 minutes early. Know the agenda. If you asked for notes, read them and handle your action items before the next interaction. The fastest way to recover trust is to show the miss was an anomaly — not a pattern.",
              },
            ].map(({ step, detail }) => (
              <div key={step} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-bold text-white">{step}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITABLE BLOCK 4: WHAT NOT TO DO ── */}
      <section id="what-not-to-do" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Citable Answer</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Not to Do When You Miss a Meeting
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            These responses make the situation worse.
          </p>

          <div className="mt-8 space-y-5">
            {[
              {
                label: "Say nothing",
                detail:
                  "Silence reads as \"I don't care\" or \"I forgot entirely.\" Even a delayed, imperfect apology is better than no message at all. Silence leaves the other person guessing and forces them to follow up — which makes you look worse.",
              },
              {
                label: "Write a paragraph of explanation",
                detail:
                  "Long apologies feel like justifications. The more you explain, the more defensive you sound. A two-sentence apology with a next step is more professional than a five-sentence one with a detailed excuse.",
              },
              {
                label: "Use a vague non-apology",
                detail:
                  "\"So sorry, things have just been so crazy lately!\" is not an apology. It's noise. It acknowledges nothing specifically, takes no responsibility, and offers no resolution. Be direct: name the miss, own it, propose an action.",
              },
              {
                label: "Fabricate an excuse",
                detail:
                  "Invented emergencies are transparent. If discovered, the cover story becomes a much larger trust problem than the original miss. \"I lost track of time\" is more credible than an implausible story.",
              },
              {
                label: "Wait to be asked about it",
                detail:
                  "Waiting for the other person to bring it up signals that you hope it goes unnoticed. It won&apos;t. Reaching out first always recovers more trust than being chased down.",
              },
            ].map(({ label, detail }) => (
              <div key={label} className="flex gap-4">
                <span className="mt-0.5 flex-shrink-0 text-sm font-bold text-red-400">✕</span>
                <div>
                  <p className="font-bold text-white">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL-WORLD SCENARIO ── */}
      <section id="scenario" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Real-World Scenario</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Wrong Way vs. What Actually Works
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            It&apos;s 3:22pm. Your calendar shows a meeting that started at 3:00 and ended at 3:30.
            You completely missed it. You just noticed.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-red-500/20 bg-zinc-900 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-400">Wrong approach</p>
              <ul className="space-y-2">
                {[
                  "Spend 20 minutes drafting and deleting messages.",
                  "Send at 5:30pm: \"Oh gosh I am SO sorry, today has been absolutely insane, I had back-to-back calls all morning and then something came up and I completely forgot, I feel terrible, I'm so sorry, can we maybe find time next week?\"",
                  "No specific reschedule times offered. No action proposed.",
                  "The other person has moved on and now needs to respond to this wall of text.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0 text-red-400">✕</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-green-500/20 bg-zinc-900 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-500">Right approach</p>
              <ul className="space-y-2">
                {[
                  "At 3:22pm — 8 minutes after the meeting ended — send one message.",
                  "\"Hi [Name] — I missed our 3pm meeting today. I'm sorry, that was on me. Can we reschedule? I'm free tomorrow at 2pm or Friday at 10am.\"",
                  "Done. Message sent in under 60 seconds.",
                  "The other person has a clear apology, two specific times to choose from, and nothing to decode.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0 text-green-400">✓</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-zinc-400">
            The second message takes less time to write and creates a better impression. Brevity signals
            confidence. Speed signals awareness. A next step signals professionalism.
          </p>
        </div>
      </section>

      {/* ── PREVENTION BRIDGE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Stop Having to Apologize
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            Writing a good apology is a useful skill. Not needing it is better.
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            Most missed meetings trace back to the same root cause: a calendar reminder fired once, you
            were in focus mode or on another call, and it disappeared. No retry. No escalation.{" "}
            <Link
              href="/why-calendar-reminders-fail"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              Calendar notifications are designed to be unobtrusive
            </Link>{" "}
            — which makes them unreliable for anything that actually matters.
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            OnTimer connects to your calendar and fires persistent, attention-demanding alarms before meetings
            — alarms that don&apos;t disappear until you respond. It&apos;s the difference between a reminder you
            can sleep through and one that won&apos;t let you.
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Also read:{" "}
            <Link
              href="/missed-meeting-what-to-say"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              missed a meeting — what to say
            </Link>
            {" "}—{" "}
            <Link
              href="/how-to-never-be-late-to-meetings"
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
      <section id="faq" className="border-t border-zinc-800 py-20">
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

      {/* ── RELATED RESOURCES ── */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related Resources</h2>
          <ul className="space-y-3">
            {[
              {
                href: "/missed-meeting-what-to-say",
                label: "Missed a meeting — email and Slack templates",
              },
              {
                href: "/running-late-to-meeting",
                label: "Running late to a meeting — exact scripts",
              },
              {
                href: "/slept-through-meeting-what-to-do",
                label: "Slept through a meeting — recovery steps",
              },
              {
                href: "/why-calendar-reminders-fail",
                label: "Why calendar reminders fail",
              },
              {
                href: "/how-to-never-be-late-to-meetings",
                label: "How to never be late to meetings — the full system",
              },
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
            Stop missing meetings.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer connects to your calendar and fires persistent alarms before your meetings — so you never
            have to write another apology.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" location="apologize-missing-meeting-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
