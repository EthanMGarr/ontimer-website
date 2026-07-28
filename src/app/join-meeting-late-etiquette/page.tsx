import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Joining a Meeting Late? Etiquette Rules No One Tells You",
  description:
    "What to do with your camera, mic, and apology when you join a meeting already in progress — Zoom, Teams, and in-person etiquette covered.",
  alternates: { canonical: "https://www.ontimer.app/join-meeting-late-etiquette" },
  openGraph: {
    title: "Joining a Meeting Late? Etiquette Rules No One Tells You",
    description:
      "What to do with your camera, mic, and apology when you join a meeting already in progress — Zoom, Teams, and in-person etiquette covered.",
    url: "https://www.ontimer.app/join-meeting-late-etiquette",
    type: "article",
  },
};

const faqItems = [
  {
    question: "Should you apologize when joining a meeting late?",
    answer:
      "Briefly, yes — but not verbally mid-presentation. A short chat message (\"Sorry for the delay\") is enough for most meetings. For a small meeting where everyone noticed, a quick verbal apology at the first natural pause is appropriate. Don't interrupt to apologize.",
  },
  {
    question: "Should your camera be on or off when you join late?",
    answer:
      "Join with your camera off initially, orient yourself for 10–15 seconds, then turn it on. Turning on a camera mid-thought while unprepared creates a distraction. Being ready before appearing on screen is more professional than rushing to be visible.",
  },
  {
    question: "Is it rude to join a Zoom meeting late?",
    answer:
      "It depends on context and how you handle it. Joining a few minutes late without disruption is generally acceptable. Joining late and then asking for a recap out loud, or unmuting immediately to comment, is rude. The etiquette is: enter quietly, catch up privately, contribute when there's a natural opening.",
  },
  {
    question: "What do you do when you join a meeting and don't know what's being discussed?",
    answer:
      "Stay quiet and observe for 1–2 minutes before contributing. Check the chat history for context clues. If you need to ask, do it privately via direct message or wait until a break. Never ask \"What did I miss?\" out loud in the middle of a presentation.",
  },
];

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

export default function JoinMeetingLateEtiquette() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Joining a Meeting Late? Etiquette Rules No One Tells You",
    description:
      "What to do with your camera, mic, and apology when you join a meeting already in progress — Zoom, Teams, and in-person etiquette covered.",
    author: { "@type": "Organization", name: "OnTimer" },
    datePublished: "2026-04-23",
    dateModified: "2026-04-23",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.ontimer.app/join-meeting-late-etiquette",
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
            Joining a Meeting Late?{" "}
            <span className="text-green-500">Etiquette Rules No One Tells You</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-400">By OnTimer</p>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="leading-relaxed text-zinc-300">
              When joining a meeting late, enter with your mic muted, camera off until you&apos;ve oriented yourself,
              and don&apos;t announce your arrival verbally — a chat message is enough. Wait for a natural pause before
              contributing. The goal is to minimize disruption, not explain yourself.
            </p>
          </div>

          <nav className="mt-8" aria-label="Table of contents">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">On this page</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#before-joining", label: "Before You Join" },
                { href: "#entering", label: "How to Enter Without Disrupting" },
                { href: "#camera-mic", label: "Camera & Mic Etiquette" },
                { href: "#when-to-speak", label: "When to Speak vs Wait" },
                { href: "#in-person", label: "In-Person Meeting Rules" },
                { href: "#prevent", label: "How to Avoid This Situation" },
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

      {/* ── BEFORE JOINING ── */}
      <section id="before-joining" className="mt-8 border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Before You Join
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Do this before you click the join button — not after you&apos;re already in.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Send a message first (if 5+ minutes late)</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                If you&apos;re noticeably late, a quick message sets expectations before you appear. It shows
                self-awareness and lets the host decide whether to wait or proceed.
              </p>
              <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Example</p>
                <p className="font-mono text-sm text-green-400">
                  &quot;Running 5 behind — joining now. Sorry for the delay.&quot;
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Check the invite for context</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Quickly scan the meeting agenda or any pre-reads so you&apos;re not completely in the dark when you
                join. Even 30 seconds of context helps.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Mute before you join</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Every meeting platform lets you mute before joining. Do it. Joining unmuted mid-presentation is the
                most disruptive possible entrance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO ENTER ── */}
      <section id="entering" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Enter Without Disrupting
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The goal when entering late is zero disruption. Not zero acknowledgment — zero disruption.
          </p>

          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white">Don&apos;t announce &quot;Sorry I&apos;m late!&quot;</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Everyone already knows. Saying it verbally interrupts whoever is speaking and pulls focus to you.
                If acknowledgment is needed, use the chat.
              </p>
              <div className="mt-4 space-y-2">
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Instead of this (verbal)</p>
                  <p className="font-mono text-sm text-red-400">&quot;Oh sorry everyone, sorry I&apos;m late, sorry—&quot;</p>
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Do this (chat)</p>
                  <p className="font-mono text-sm text-green-400">&quot;Sorry for the delay.&quot;</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Read the room before you say anything</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Spend 30–60 seconds listening and observing before you contribute. Is someone mid-presentation? Is
                it an open discussion? Is there a decision in progress? Match the energy, don&apos;t reset it.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">For small meetings: a quick visual acknowledgment</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                In a meeting of 3–5 people, a brief wave to the host when your camera comes on is natural and polite.
                It doesn&apos;t require words.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMERA & MIC ── */}
      <section id="camera-mic" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Camera &amp; Mic Etiquette
          </h2>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white">Camera: off first, then on</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Join with your camera off. Take 10–15 seconds to orient yourself — check who&apos;s speaking, what&apos;s
                on screen, what the discussion is. Then turn your camera on.
              </p>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                A suddenly appearing, disoriented face is more distracting than a brief camera-off entry.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Mic: stay muted until you&apos;re ready to contribute</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Don&apos;t unmute immediately after joining. Background noise, rustling, breathing — all of it is
                amplified when you&apos;re the one who just joined. Unmute only when you have something to say and
                there&apos;s a clear opening.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Never ask &quot;What did I miss?&quot; out loud</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                This forces everyone to pause and recap for your benefit. Check the chat for notes, ask someone
                privately via DM, or catch up after. Your lateness shouldn&apos;t slow the meeting down.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHEN TO SPEAK ── */}
      <section id="when-to-speak" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            When to Speak vs Wait
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The default when joining late is to listen, not speak.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-bold text-white">Wait for a natural pause</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Don't interrupt mid-sentence or mid-presentation",
                  "Watch for the speaker finishing a complete thought",
                  "A short pause after someone stops talking is your signal",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-400">
                    <span className="mt-1 flex-shrink-0">—</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-bold text-green-500">It&apos;s okay to jump in when:</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Someone directly asks for your input",
                  "The group is brainstorming and the energy is open",
                  "You have critical information that affects a decision currently in progress",
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

      {/* ── IN-PERSON ── */}
      <section id="in-person" className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            In-Person Meeting Rules
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The principles are the same as video, but the mechanics differ.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                rule: "Enter quietly",
                detail: "Don't knock. Don't announce yourself. Open the door slowly and close it without a sound.",
              },
              {
                rule: "Take the nearest open seat",
                detail:
                  "Don't walk past people to reach a preferred spot. Sit near the door so your movement is minimal. Never take the \"head\" position if it was occupied by the host.",
              },
              {
                rule: "Make brief eye contact with the host",
                detail:
                  "A small nod to the meeting organizer acknowledges your arrival without requiring verbal interruption. No wave, no mouthed \"sorry.\"",
              },
              {
                rule: "Don't rustle or unpack loudly",
                detail:
                  "Get your notebook and pen out before you sit down — not once you're seated. Rustling papers and clicking pens are distracting.",
              },
            ].map(({ rule, detail }) => (
              <div key={rule}>
                <h3 className="text-lg font-bold text-white">{rule}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVENT ── */}
      <section id="prevent" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Avoid This Situation
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Knowing the etiquette is useful. Not needing it is better.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            Most people who consistently join meetings late aren&apos;t disorganized — they&apos;re relying on a
            reminder system that doesn&apos;t work.{" "}
            <Link href="/why-calendar-reminders-fail" className="text-green-500 transition-colors hover:text-green-400">
              Calendar reminders fail silently
            </Link>{" "}
            — they fire once and disappear, and if you&apos;re focused on something else, they&apos;re gone.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            See the{" "}
            <Link
              href="/running-late-to-meeting"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              full guide on running late to a meeting
            </Link>
            , or{" "}
            <Link
              href="/never-be-late-to-meetings"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              how to build a system that keeps you on time
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
            Arrive before the meeting starts.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer connects to your calendar and fires persistent alarms you can&apos;t ignore — so you show up
            on time, every time.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="join-late-etiquette-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
