import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Missed Appointment Fee? How to Prevent Costly No-Shows",
  description:
    "Missed an appointment and got charged a fee? Learn how to prevent no-shows with a simple reminder system that ensures you never miss important appointments again.",
  openGraph: {
    title: "Missed Appointment Fee? How to Prevent Costly No-Shows",
    description:
      "Missed an appointment and got charged a fee? Learn how to prevent no-shows with a simple reminder system that ensures you never miss important appointments again.",
    type: "article",
  },
};

const faqItems = [
  {
    question: "Can doctors legally charge missed appointment fees?",
    answer:
      "Yes. Medical offices, therapists, and most service providers are legally permitted to charge a no-show fee if patients fail to cancel within a specified window. The policy must be disclosed in writing, typically during the initial intake process.",
  },
  {
    question: "How much are typical no-show fees?",
    answer:
      "Missed appointment fees typically range from $25 to $200 depending on the provider. Specialists and therapists tend to charge more than general practitioners. Some providers bill the full appointment cost.",
  },
  {
    question: "What's the best way to prevent missing appointments?",
    answer:
      "The most effective approach is a multi-stage reminder system: a calendar alert 24 hours before, a secondary alarm 2 hours before, and a persistent alert 30 minutes before. Each stage catches what the previous one might miss.",
  },
];

export default function MissedAppointmentFee() {
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
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Missed Appointment Fee?{" "}
            <span className="text-green-500">How to Prevent Costly No-Shows</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-500">By Ethan Garr</p>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Medical offices, therapists, and service providers commonly charge $50–$200 for missed appointments. Often the reason isn&apos;t irresponsibility — it&apos;s a reminder system that failed at the wrong moment.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            The right multi-stage reminder structure makes missing an appointment almost impossible.
          </p>
        </div>
      </section>

      {/* ── WHY FEES ARE INCREASING ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Missed Appointment Fees Are Increasing
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Healthcare and service businesses operate on tight schedules with no-show rates averaging 15–30% across the industry. A single unfilled appointment slot represents direct lost revenue that providers increasingly pass back to patients.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Medical office schedules are booked weeks out — an empty slot can't be refilled the same day",
              "Late cancellations leave providers with dead time that can't be recovered",
              "Offices use no-show fees as a deterrent, not primarily as revenue",
              "Consistent reminder systems on the patient side reduce no-shows by over 50% in most studies",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-zinc-600">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHAT TO DO IF YOU ALREADY MISSED ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What To Do If You Already Missed an Appointment
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            If you&apos;ve already missed an appointment, act quickly. Most offices are more willing to waive fees for patients who respond promptly.
          </p>
          <ol className="mt-8 space-y-5">
            {[
              {
                step: "Contact the office immediately",
                detail: "Call as soon as you realize you missed the appointment. Waiting makes waiver requests less likely to succeed.",
              },
              {
                step: "Explain the circumstances",
                detail: "If there was a genuine reason — a reminder failure, family emergency, or illness — explain it calmly and briefly. Offices have more discretion than the policy suggests.",
              },
              {
                step: "Ask if the fee can be waived",
                detail: "Many providers will waive a first-time no-show fee for long-standing patients. It is worth asking directly.",
              },
              {
                step: "Reschedule immediately",
                detail: "Rescheduling during the same call signals good faith and increases the likelihood of a fee waiver.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-500">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-zinc-200">{item.step}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── REMINDER SYSTEM ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Reminder System That Prevents No-Shows
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            A single reminder is not enough. The most reliable approach is a multi-stage system where each alert serves a different purpose.
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                timing: "24 hours before",
                purpose: "Planning alert",
                detail: "Gives you time to prepare, arrange travel, and reschedule if something has changed. This is when you can cancel without a fee.",
              },
              {
                timing: "2 hours before",
                purpose: "Preparation alert",
                detail: "Triggers getting ready — showering, gathering documents, confirming directions. Reduces last-minute chaos.",
              },
              {
                timing: "30 minutes before",
                purpose: "Departure alert",
                detail: "The signal to leave. This is where most missed appointments happen — people intend to go but lose track of time.",
              },
              {
                timing: "10 minutes before",
                purpose: "Final reminder",
                detail: "A persistent final alert for high-stakes appointments. Hard to miss. Useful for medical, legal, and financial appointments.",
              },
            ].map((item) => (
              <div
                key={item.timing}
                className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-bold text-green-500">{item.timing}</p>
                  <p className="mt-0.5 text-xs text-zinc-600">{item.purpose}</p>
                </div>
                <div className="border-l border-zinc-700 pl-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Using all four stages reduces the probability of a missed appointment to near zero. Even if one or two alerts are missed, the others act as a failsafe.
          </p>
        </div>
      </section>

      {/* ── WHY CALENDAR REMINDERS AREN'T ENOUGH ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Calendar Reminders Often Aren&apos;t Enough
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Calendar apps are built for scheduling, not for guaranteeing you show up. Their notification system has several well-known limitations.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Calendar alerts are passive banners — easy to swipe away without registering the content",
              "Notifications get buried between emails, messages, and social media",
              "Focus mode and Do Not Disturb silently block alerts without any indication",
              "A single alert fires once and disappears — there is no follow-up if you miss it",
              "Most people don't add multiple reminder stages to each appointment",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-zinc-600">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            This is why even organized, responsible people miss appointments. The system isn&apos;t designed to be reliable — it&apos;s designed to be convenient. For important appointments with financial consequences, convenience isn&apos;t enough.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            See also:{" "}
            <Link
              href="/never-be-late-to-meetings"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              How to never be late to meetings
            </Link>
          </p>
        </div>
      </section>

      {/* ── SIMPLE SYSTEM ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            A Simple System That Makes Missing Appointments Almost Impossible
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Combine three independent layers. Each one compensates for the weaknesses of the others.
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                layer: "Calendar reminder",
                desc: "Your baseline. Set it at 24 hours and 2 hours before. Most appointments you won't need anything else.",
              },
              {
                layer: "Secondary phone alarm",
                desc: "Set a separate alarm independent of your calendar system. If the calendar notification fails, this fires on its own.",
              },
              {
                layer: "Persistent alert system",
                desc: "A dedicated app that connects to your calendar and fires persistent, attention-grabbing alarms before appointments. Designed to not be ignored.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="font-bold text-green-500">Layer {i + 1} — {item.layer}</p>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-400 leading-relaxed">
            Many people add a persistent pre-meeting alert system like{" "}
            <Link
              href="/meeting-reminder-app"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              OnTimer
            </Link>{" "}
            so they receive alerts that are difficult to miss — especially for medical appointments, job interviews, and financial consultations where a no-show has real consequences.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            If you need to know exactly when to leave, try the{" "}
            <Link
              href="/what-time-should-i-leave"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              What Time Should I Leave Calculator
            </Link>{" "}
            — it estimates your departure time based on travel duration and your arrival window.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
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

      {/* ── HOW TO NEVER MISS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Never Miss an Appointment Again
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Build the habit of setting up reminders at the time of booking — not the night before.
          </p>
          <ol className="mt-6 space-y-3">
            {[
              "As soon as an appointment is confirmed, add it to your calendar",
              "Set a 24-hour reminder and a 2-hour reminder in the calendar app",
              "Add a separate phone alarm 30 minutes before departure time",
              "Use a persistent alert app for high-stakes appointments",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-0.5 flex-shrink-0 text-sm font-bold text-green-500">
                  {i + 1}.
                </span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-zinc-400 leading-relaxed">
            Many people add a persistent pre-meeting alert system like OnTimer so they receive alerts that are difficult to miss — whether it&apos;s a doctor&apos;s appointment, a job interview, or a therapy session.
          </p>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related Guides</h2>
          <ul className="space-y-3">
            {[
              { href: "/how-to-never-miss-a-meeting", label: "How to Never Miss a Meeting Again" },
              { href: "/calendar-notifications-not-working", label: "Calendar Notifications Not Working? 8 Fixes" },
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

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Never pay a no-show fee again.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Try OnTimer — the meeting reminder system designed to make sure you&apos;re never late again.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" location="missed-appointment-fee" />
          </div>
        </div>
      </section>
    </>
  );
}
