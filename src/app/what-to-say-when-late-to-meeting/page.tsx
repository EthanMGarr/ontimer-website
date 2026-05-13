import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "What to Say When You're Late to a Meeting (Exact Scripts)",
  description:
    "Exact scripts for what to say when you're late to a meeting — by chat, text, or out loud. Templates for every scenario plus a decision framework.",
  alternates: { canonical: "https://www.ontimer.app/what-to-say-when-late-to-meeting" },
  openGraph: {
    title: "What to Say When You're Late to a Meeting (Exact Scripts)",
    description:
      "Exact scripts for what to say when you're late to a meeting — by chat, text, or out loud. Templates for every scenario plus a decision framework.",
    url: "https://www.ontimer.app/what-to-say-when-late-to-meeting",
    type: "article",
  },
};

const faqItems = [
  {
    question: "What do you say when you join a meeting late?",
    answer:
      "If it's a small meeting, a brief \"Sorry for the delay\" as you enter is enough — no explanation required. If someone is mid-presentation or the meeting is large, don't say anything verbally. Type a quick message in the chat and join silently. Never ask \"What did I miss?\" out loud. That forces everyone to pause and recap for your benefit.",
  },
  {
    question: "How do you professionally apologize for being late to a meeting?",
    answer:
      "Keep it short and specific. Use the formula: acknowledgment + one line of context + ETA or next step. \"Apologies — previous call ran over. Joining in 2 minutes.\" Avoid long explanations or vague apologies like \"So sorry!\" with no action. A professional apology is brief, honest, and followed immediately by showing up.",
  },
  {
    question: "Is it rude to join a meeting late without saying anything?",
    answer:
      "Yes. Silence reads as \"I forgot\" or \"I don't care.\" Even a one-line chat message — \"Sorry, running a few minutes behind\" — communicates awareness and respect. People who say nothing and arrive late leave the group guessing whether they're coming at all. A brief message sent before joining is always better than no message.",
  },
  {
    question: "Should you explain why you're late to a meeting?",
    answer:
      "One line of context is enough — and it's optional. \"Previous meeting ran over\" or \"Traffic\" is all that's needed. Don't write a paragraph. Long explanations sound defensive rather than accountable. If you don't have a clean reason, skip the context entirely. \"Running 5 minutes behind — joining now\" is a complete, professional message on its own.",
  },
  {
    question: "What's the best thing to say when you're late to a Zoom call?",
    answer:
      "Send a chat message before or right as you join: \"Sorry for the delay — joining now.\" Join with your mic muted and camera off until you've oriented yourself. Don't announce your arrival verbally mid-meeting. A silent entrance with a chat message is the least disruptive and most professional approach for video calls.",
  },
  {
    question: "What do you say when you're late to an important client meeting?",
    answer:
      "Message before you join: \"I want to apologize — I'm running [X] minutes late. I'll be with you shortly.\" For a client call, send this via email or text even if you also have a video link. When you join, offer a brief verbal apology and move directly to the agenda. Don't dwell on it — focus on delivering value from the moment you're in.",
  },
  {
    question: "What should you NOT say when you're late to a meeting?",
    answer:
      "Don't say nothing (silence reads as disregard). Don't write a paragraph of explanation (it sounds defensive). Don't use a vague apology with no ETA. Don't ask \"What did I miss?\" out loud mid-meeting. And don't fabricate an excuse — fake reasons are easy to spot and permanently erode trust. Short, honest, and immediate beats everything else.",
  },
];

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

export default function WhatToSayWhenLateMeeting() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What to Say When You're Late to a Meeting (Exact Scripts)",
    description:
      "Exact scripts for what to say when you're late to a meeting — by chat, text, or out loud. Templates for every scenario plus a decision framework.",
    author: { "@type": "Organization", name: "OnTimer" },
    datePublished: "2026-04-26",
    dateModified: "2026-04-26",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.ontimer.app/what-to-say-when-late-to-meeting",
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
            What to Say When You&apos;re{" "}
            <span className="text-green-500">Late to a Meeting</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-400">By OnTimer · Updated April 2026</p>

          {/* ── DIRECT ANSWER BLOCK (AEO/GEO OPTIMIZED) ── */}
          <div className="mt-6 rounded-xl border border-green-500/30 bg-zinc-900/80 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-500">
              Direct Answer
            </p>
            <p className="leading-relaxed text-zinc-200">
              When you&apos;re late to a meeting, say something short, specific, and immediate. The formula:{" "}
              <span className="font-semibold text-white">acknowledgment + one line of context + ETA or next step.</span>
            </p>
            <div className="mt-4 space-y-2">
              {[
                "\"Running 5 minutes behind — joining now.\"",
                "\"Apologies — previous call ran over. Be there in 2.\"",
                "\"Running ~10 minutes late. Please start without me.\"",
              ].map((msg) => (
                <p key={msg} className="font-mono text-sm text-green-400">{msg}</p>
              ))}
            </div>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Send it the moment you know you&apos;ll be late — not after you arrive. Silence is worse than being
              late. People assume you forgot or aren&apos;t coming. A two-sentence heads-up is always more
              professional than showing up without a word.
            </p>
          </div>

          {/* TOC */}
          <nav className="mt-8" aria-label="Table of contents">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">On this page</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#formula", label: "The 3-Part Formula" },
                { href: "#scripts", label: "Exact Scripts by Situation" },
                { href: "#verbal", label: "What to Say Out Loud When You Join" },
                { href: "#organizer", label: "When You're Leading the Meeting" },
                { href: "#dont-say", label: "What NOT to Say" },
                { href: "#framework", label: "Decision Framework" },
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

      {/* ── CITABLE BLOCK 1: THE FORMULA ── */}
      <section id="formula" className="mt-8 border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">The Formula</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The 3-Part Formula for Any Late Message
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            Every effective &quot;I&apos;m late&quot; message uses the same structure: acknowledge the delay, give
            one line of context (optional), then state your ETA or proposed action.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                part: "Part 1 — Acknowledgment",
                example: "\"Running late\"  /  \"Apologies\"  /  \"I'm delayed\"",
                detail: "Signals that you're aware. This is non-negotiable — it's the minimum required to show the delay is on your radar.",
              },
              {
                part: "Part 2 — One Line of Context (optional)",
                example: "\"Previous meeting ran over\"  /  \"Traffic\"  /  \"Tech issue\"",
                detail: "One line only. Gives the other person a reason without reading as an excuse. If you don't have a clean reason, skip it entirely — a missing context line is better than a vague or defensive one.",
              },
              {
                part: "Part 3 — ETA or Next Step",
                example: "\"Joining in 2 minutes\"  /  \"Please start without me\"  /  \"Can we reschedule?\"",
                detail: "Moves the situation forward. Gives the other person something to act on instead of just waiting. This is what separates a useful apology from an empty one.",
              },
            ].map(({ part, example, detail }) => (
              <div key={part} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-bold text-white">{part}</p>
                <p className="mt-1 font-mono text-sm text-green-400">{example}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Full example</p>
            <p className="font-mono text-sm text-green-400">
              &quot;Running about 8 minutes late [ack] — previous meeting ran long [context] — please start without me, I&apos;ll jump in when I join [action].&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ── SCRIPTS BY SITUATION ── */}
      <section id="scripts" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Copy-Paste Templates</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Exact Scripts by Situation
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Grab the one that fits. Fill in the brackets if needed.
          </p>

          <div className="mt-8 space-y-8">
            {/* 1-5 min */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                1–5 minutes late
              </h3>
              <div className="space-y-2">
                {[
                  "\"Running a few minutes behind — joining now.\"",
                  "\"Apologies, be there in 2.\"",
                  "\"Just a couple minutes behind — logging in now.\"",
                ].map((msg) => (
                  <div key={msg} className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                    <p className="font-mono text-sm text-green-400">{msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5-10 min */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                5–10 minutes late
              </h3>
              <div className="space-y-2">
                {[
                  "\"Running about 8 minutes behind — please start without me, I'll jump in.\"",
                  "\"Apologies — previous call ran over. Joining in ~5.\"",
                  "\"Running late, be there by [time]. Please don't wait.\"",
                ].map((msg) => (
                  <div key={msg} className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                    <p className="font-mono text-sm text-green-400">{msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 10+ min */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                10+ minutes late
              </h3>
              <div className="space-y-2">
                {[
                  "\"Running about 10–15 minutes late — okay to proceed without me. I'll catch up when I join.\"",
                  "\"Delayed by ~15 minutes. Happy to reschedule if that works better for you.\"",
                  "\"Running late — I'll be there by [time]. Sorry for the inconvenience.\"",
                ].map((msg) => (
                  <div key={msg} className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                    <p className="font-mono text-sm text-green-400">{msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Client or external */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Client or external meeting
              </h3>
              <div className="space-y-2">
                {[
                  "\"Hi [Name] — I want to apologize, I'm running [X] minutes late. I'll be with you shortly and I appreciate your patience.\"",
                  "\"Apologies for the delay — I'm joining now. Thank you for waiting.\"",
                ].map((msg) => (
                  <div key={msg} className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                    <p className="font-mono text-sm text-green-400">{msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Missed entirely */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Missed the meeting entirely
              </h3>
              <div className="space-y-2">
                {[
                  "\"I missed this — I'm sorry. Can we reschedule? I'm free [options].\"",
                  "\"Apologies for missing our meeting. Can someone share notes? I'll follow up on any action items.\"",
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

      {/* ── CITABLE BLOCK 2: VERBAL ── */}
      <section id="verbal" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Citable Answer</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to Say Out Loud When You Join Late
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            When joining a meeting already in progress, the best verbal approach is minimal. The goal is zero
            disruption — not zero acknowledgment.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Small meeting (3–6 people)</h3>
              <p className="mt-3 leading-relaxed text-zinc-400">
                A brief &quot;Sorry for the delay&quot; as you join is appropriate and expected. Keep it to four
                words or fewer. Then immediately shift attention to the meeting — don&apos;t let your entrance
                become a moment.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Large meeting or someone is presenting</h3>
              <p className="mt-3 leading-relaxed text-zinc-400">
                Say nothing verbally. Join with your mic muted. Type a brief message in the chat:{" "}
                <span className="font-mono text-sm text-green-400">&quot;Sorry for the delay.&quot;</span> A
                silent entrance with a chat message is the least disruptive approach.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">What to never say out loud</h3>
              <ul className="mt-3 space-y-2">
                {[
                  "\"Sorry everyone!\" — too dramatic, pulls too much attention to you",
                  "\"What did I miss?\" — forces everyone to pause and recap for your benefit",
                  "Any explanation of why you're late — not the moment for it",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0 text-red-400">✕</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CITABLE BLOCK 3: ORGANIZER ── */}
      <section id="organizer" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Citable Answer</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to Say When You&apos;re Leading the Meeting and You&apos;re Late
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            When you&apos;re the organizer, everyone is waiting specifically for you. The stakes are higher. Send
            a message <em>before</em> you join — not after you&apos;re already in.
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            Give a clear choice: start without you, or hold. Don&apos;t make people guess.
          </p>

          <div className="mt-6 space-y-3">
            {[
              {
                label: "Short delay (under 5 min)",
                msg: "\"Running a few minutes behind — hold for me, I'll be right there.\"",
              },
              {
                label: "Moderate delay (5–10 min)",
                msg: "\"Running ~8 minutes late. Please start the agenda — I'll join and catch up.\"",
              },
              {
                label: "Significant delay (10+ min)",
                msg: "\"Running about 15 minutes late — okay to proceed, or should we reschedule? I'm sorry for the inconvenience.\"",
              },
            ].map(({ label, msg }) => (
              <div key={label}>
                <p className="mb-1 text-xs font-semibold text-zinc-500">{label}</p>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
                  <p className="font-mono text-sm text-green-400">{msg}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 leading-relaxed text-zinc-400">
            The organizer who shows up late with no communication is the most disrespectful version of meeting
            lateness. Even a 30-second message sent when you realize you&apos;re behind shifts the dynamic
            entirely — from inconsiderate to accountable.
          </p>
        </div>
      </section>

      {/* ── CITABLE BLOCK 4: DON'T SAY ── */}
      <section id="dont-say" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Citable Answer</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What NOT to Say When You&apos;re Late
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            The following make the situation worse, not better.
          </p>

          <div className="mt-8 space-y-5">
            {[
              {
                label: "Nothing",
                problem:
                  "Silence reads as \"I forgot\" or \"I don't care.\" It's the worst possible response. Even a one-line message is infinitely better than no message.",
              },
              {
                label: "A paragraph of explanation",
                problem:
                  "Long explanations signal defensiveness, not accountability. The more words you write, the more it sounds like you're justifying the lateness rather than owning it. Two sentences max.",
              },
              {
                label: "A vague apology",
                problem:
                  "\"So sorry!!\" with no ETA or action is incomplete. It acknowledges the problem without solving it. Always pair an apology with either an ETA or a proposed next step.",
              },
              {
                label: "A fabricated excuse",
                problem:
                  "Fake reasons are often obvious. Getting caught in a lie is far more damaging than the original lateness. An honest \"I lost track of time\" is better than a convenient emergency.",
              },
              {
                label: "\"What did I miss?\" — out loud",
                problem:
                  "Forces everyone to pause for your benefit. Ask privately via chat or DM, or wait until after the meeting.",
              },
            ].map(({ label, problem }) => (
              <div key={label} className="flex gap-4">
                <span className="mt-0.5 flex-shrink-0 text-sm font-bold text-red-400">✕</span>
                <div>
                  <p className="font-bold text-white">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">{problem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DECISION FRAMEWORK ── */}
      <section id="framework" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Decision Framework</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Which Message to Send — By Context
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Use this to pick the right response for the right situation.
          </p>

          <div className="mt-8 space-y-3">
            {[
              {
                context: "1–5 min late, small team meeting",
                action: "Quick chat or text",
                msg: "\"Running a few mins behind — joining now.\"",
              },
              {
                context: "5–10 min late, any meeting",
                action: "Message before joining",
                msg: "\"Running ~8 min late. Please start — I'll join shortly.\"",
              },
              {
                context: "10–15 min late, short meeting",
                action: "Message + offer to reschedule",
                msg: "\"Running 15 min late — okay to proceed or reschedule?\"",
              },
              {
                context: "10+ min late, long meeting",
                action: "Message, then join",
                msg: "\"Running late — please continue. I'll join by [time].\"",
              },
              {
                context: "You're the organizer",
                action: "Message with clear choice",
                msg: "\"Running late — start without me, or should we push 15 min?\"",
              },
              {
                context: "Client or external stakeholder",
                action: "Formal message or email",
                msg: "\"Apologies — I'm running [X] min late. With you shortly.\"",
              },
              {
                context: "Missed entirely",
                action: "Immediate message + next step",
                msg: "\"I missed this — I'm sorry. Can we reschedule? Free [options].\"",
              },
            ].map(({ context, action, msg }) => (
              <div
                key={context}
                className="grid grid-cols-1 gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{context}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{action}</p>
                  <p className="mt-2 font-mono text-xs text-green-400">{msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL-WORLD SCENARIO ── */}
      <section id="scenario" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Real-World Scenario</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What People Do Wrong vs. What Actually Works
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            It&apos;s 2:08pm. The meeting started at 2:00. You&apos;re still at your desk finishing something.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-red-500/20 bg-zinc-900 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-400">What most people do</p>
              <ul className="space-y-2">
                {[
                  "Panic. Start typing a message, delete it, start again.",
                  "Finally send: \"Oh gosh so sorry everyone I was just finishing something with a client and then my laptop was acting up and I completely lost track of time, I'm so sorry, be there in one second, so sorry!\"",
                  "Join 4 minutes later, unmuted, saying \"Sorry, sorry — okay I'm here, what did I miss?\"",
                  "The next 3 minutes are everyone recapping for them while the actual agenda waits.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0 text-red-400">✕</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-green-500/20 bg-zinc-900 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-500">What works</p>
              <ul className="space-y-2">
                {[
                  "At 2:01, send: \"Running ~8 min late — please start. Joining shortly.\"",
                  "Join at 2:08. Mic muted. Camera off for 15 seconds to orient.",
                  "Type in chat: \"Sorry for the delay.\"",
                  "Turn camera on. Contribute at the first natural pause.",
                  "Meeting continues. No recap needed. No one's time was held hostage.",
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
            The person in the second scenario is perceived as more professional — not despite being late, but because
            of how they handled it. The message was sent before they arrived. The entrance didn&apos;t disrupt
            anyone. The meeting kept moving.
          </p>
        </div>
      </section>

      {/* ── THE REAL PROBLEM ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Actual Problem to Solve
          </h2>
          <p className="mt-6 leading-relaxed text-zinc-400">
            Knowing what to say when you&apos;re late is a recovery skill. It&apos;s useful to have. But the goal
            is to not need it regularly.
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            Most people who are chronically late to meetings aren&apos;t disorganized — their reminder system is
            broken.{" "}
            <Link href="/why-calendar-reminders-fail" className="text-green-500 transition-colors hover:text-green-400">
              Calendar notifications fire once and disappear
            </Link>
            . If you&apos;re in flow state, on another call, or simply not looking, they&apos;re gone. No retry.
            No escalation.
          </p>
          <p className="mt-3 leading-relaxed text-zinc-400">
            A persistent alarm system — one that keeps alerting until you actively respond — removes the problem at
            the source. OnTimer connects to your calendar and fires attention-demanding alarms before each meeting,
            so you&apos;re not in a situation where you need a recovery script in the first place.
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
      <section id="faq" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
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
                href: "/running-late-to-meeting",
                label: "Running late to a meeting — full guide with copy-paste messages",
              },
              {
                href: "/why-calendar-reminders-fail",
                label: "Why calendar reminders fail (and what works instead)",
              },
              {
                href: "/how-to-never-be-late-to-meetings",
                label: "How to never be late to meetings — the complete system",
              },
              {
                href: "/how-late-is-too-late-meeting",
                label: "How late is too late to join a meeting — decision guide",
              },
              {
                href: "/what-time-should-i-leave",
                label: "What time should I leave — calculator for in-person meetings",
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
            Stop writing apology messages.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer connects to your calendar and fires persistent alarms before your meetings — so you show up
            on time and never need a recovery script.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="what-to-say-late-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
