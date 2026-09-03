import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/adhd-medication-timing" },
  title: "ADHD and Medication Timing: Why the Last 5 Minutes Matters",
  description:
    "ADHD time blindness makes the last 5 minutes after a reminder the most dangerous window for missed doses. Here's how to build a system that closes the gap.",
  openGraph: {
    title: "ADHD and Medication Timing: Why the Last 5 Minutes Matters",
    description:
      "ADHD time blindness makes the last 5 minutes after a reminder the most dangerous window. Here's how to close the gap.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why do people with ADHD forget to take medication?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ADHD impairs time perception (time blindness). People with ADHD often see a reminder, intend to act, get pulled into something else, and completely lose track of the original intention. It's not about caring — it's about how ADHD affects the brain's ability to act in the moment.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best medication reminder for ADHD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Something that interrupts the current task rather than just adding to the queue. A persistent, hard-to-dismiss alarm tied to your calendar is more effective than a standard push notification, because it demands immediate attention rather than allowing deferral.",
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
            headline: "ADHD and Medication Timing: Why the Last 5 Minutes Matters",
            description: "ADHD time blindness makes the last 5 minutes after a reminder the most dangerous window for missed doses. Here's how to build a system that closes the gap.",
            author: { "@type": "Organization", name: "OnTimer" },
            publisher: { "@type": "Organization", name: "OnTimer" },
            datePublished: "2026-04-01",
            dateModified: "2026-05-11",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/adhd-medication-timing" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
              { "@type": "ListItem", position: 2, name: "Medication Reminders", item: "https://www.ontimer.app/how-to-remember-medication-on-time" },
              { "@type": "ListItem", position: 3, name: "ADHD & Timing", item: "https://www.ontimer.app/adhd-medication-timing" },
            ],
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
            <span className="text-zinc-300">ADHD & Timing</span>
          </nav>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            ADHD and Medication Timing:
            <span className="text-zinc-400"> Why the Last 5 Minutes Matters</span>
          </h1>

          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              With ADHD, missing medication isn&apos;t about forgetting — it&apos;s about time blindness. You see the reminder, intend to act, get absorbed in something else, and the window closes. The solution isn&apos;t more reminders. It&apos;s an interruption that demands action right now.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">What Time Blindness Actually Means</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>Time blindness is one of the core features of ADHD. It&apos;s not about not caring about time — it&apos;s about the brain&apos;s inability to accurately perceive it.</p>
            <p>When you&apos;re hyperfocused on a task, five minutes can feel like thirty seconds. A reminder fires. You register it. You fully intend to stop and take your medication &ldquo;in just a second.&rdquo;</p>
            <p>That second passes. You&apos;re still in the task. The moment is gone — and you didn&apos;t even notice it slipping.</p>
            <p>Standard push notifications don&apos;t solve this. They&apos;re designed to be non-disruptive. But for ADHD and medication, you need disruption.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Why &ldquo;I&apos;ll Do It in a Minute&rdquo; Fails</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>For neurotypical people, &ldquo;in a minute&rdquo; might actually mean a minute. For ADHD, it means &ldquo;when I remember again&rdquo; — which often never happens.</p>
            <p>The task at hand recaptures full attention. The medication intention gets overwritten. You don&apos;t remember until hours later, or not at all.</p>
            <p>This is not a willpower failure. It&apos;s how ADHD works.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">What Works Instead</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>The intervention needs to happen at the exact moment — not before, and not with something you can defer. Effective approaches:</p>
          </div>
          <div className="mt-6 space-y-4">
            {[
              { title: "Calendar-based scheduling", text: "Add medication as a real calendar event — not a background notification. Calendar events feel more like commitments." },
              { title: "Physical interruption", text: "Set your medication next to something you always interact with at that time. Visual cues are more powerful than auditory ones when hyperfocused." },
              { title: "High-salience alarms", text: "An alarm that stays on screen and requires dismissal is harder to ignore than a push notification. It interrupts the current task rather than sitting in the notification queue." },
            ].map(({ title, text }) => (
              <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm text-zinc-400">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              OnTimer pairs with your calendar and fires a persistent alarm — designed to interrupt whatever you&apos;re doing until you act. For ADHD, this is the difference between a reminder that gets ignored and one that actually works.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/how-to-remember-medication-on-time" className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">
                Create a medication schedule
              </Link>
              <AppStoreButton size="md" location="adhd_medication_cta" />
            </div>
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
              { href: "/why-medication-reminders-fail", label: "Why Medication Reminders Fail" },
              { href: "/medication-schedule-calendar-setup", label: "How to Set Up a Medication Calendar" },
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
