import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/why-medication-reminders-fail" },
  title: "Why Medication Reminders Fail (And What Actually Works)",
  description:
    "Most medication reminders fail not because you forget — but because of what happens after the alert. Here's why single notifications don't work and what does.",
  openGraph: {
    title: "Why Medication Reminders Fail (And What Actually Works)",
    description:
      "Most medication reminders fail not because you forget — but because of what happens after the alert.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why don't medication reminders work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A single notification is easy to defer. You see it, intend to act, get distracted, and miss the dose. The reminder fired — but it didn't interrupt you at the critical moment.",
      },
    },
    {
      "@type": "Question",
      name: "What actually works for medication adherence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A system that combines calendar structure (recurring events that fit your day) with a high-salience alert that demands acknowledgment. The goal is interruption at the right moment, not just notification.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Why Medication Reminders Fail (And What Actually Works)",
            description: "Most medication reminders fail not because you forget — but because of what happens after the alert.",
            author: { "@type": "Organization", name: "OnTimer" },
            publisher: { "@type": "Organization", name: "OnTimer" },
            datePublished: "2026-04-01",
            dateModified: "2026-05-11",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/why-medication-reminders-fail" },
          }),
        }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/how-to-remember-medication-on-time" className="hover:text-zinc-300 transition-colors">Medication Reminders</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">Why Reminders Fail</span>
          </nav>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            Why Medication Reminders Fail
            <span className="text-zinc-400"> (And What Actually Works)</span>
          </h1>

          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              Medication reminders fail because a single notification is too easy to defer. You see it, intend to act, get distracted for thirty seconds, and the moment is gone. The reminder worked — but it didn&apos;t interrupt you.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">The Notification Problem</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>Your phone shows a notification. You read it. You fully intend to take your medication in just a moment.</p>
            <p>But the notification is already gone — swiped away, buried under the next thing, forgotten.</p>
            <p>This is notification blindness. The more reminders you receive, the less impact each one has. Your brain learns to filter them out.</p>
            <p>And unlike a missed meeting, a missed dose has no immediate, visible consequence. So it&apos;s easy for your brain to deprioritize it — even when you know better.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">The Last 5 Minutes Problem</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>Most missed doses happen not because people forgot entirely, but because of what happens in the 5 minutes after the reminder fires.</p>
            <p>You see it. You register it. You think &ldquo;one minute.&rdquo; Then something small interrupts you — and the window closes.</p>
            <p>No reminder system that fires once and disappears can reliably close that gap.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">What Actually Works</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>The most reliable systems do two things: they fit your medication into the structure of your day (calendar events), and they interrupt you in the moment with something harder to ignore than a push notification.</p>
            <p>Calendar-based scheduling gives your medication a real time slot — not a background ping. And pairing it with an alarm that demands attention closes the last-5-minutes gap.</p>
          </div>
          <div className="mt-6">
            <Link href="/how-to-remember-medication-on-time" className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
              Set up your medication schedule →
            </Link>
          </div>
          <div className="mt-8">
            <AppStoreButton size="md" location="why_reminders_fail_cta" />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            {faqJsonLd.mainEntity.map((item) => (
              <details key={item.name} className="group rounded-xl border border-zinc-800 bg-zinc-900">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white">
                  {item.name}
                  <span className="ml-4 shrink-0 text-zinc-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-zinc-700 bg-zinc-900/50 py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> OnTimer is not a medical device and does not guarantee medication adherence or outcomes. This content is for organizational purposes only and does not replace medical advice or prescribed treatment schedules. Always follow your healthcare provider&apos;s instructions.
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/how-to-remember-medication-on-time", label: "How to Remember to Take Your Medication on Time" },
              { href: "/medication-schedule-calendar-setup", label: "How to Set Up a Medication Schedule Using Your Calendar" },
              { href: "/how-to-set-medication-reminders-iphone", label: "How to Set Medication Reminders on iPhone" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-green-500 hover:text-green-400 transition-colors text-sm">{label} →</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
