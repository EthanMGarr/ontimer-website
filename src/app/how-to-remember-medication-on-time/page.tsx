/// Anchor SEO page — How to Remember Your Medication (The Last 5 Minutes Fix).
///
/// ## Purpose
/// Drives high-intent medication reminder search traffic to OnTimer via content + embedded tool.
///
/// ## Include
/// - Full article copy per spec
/// - MedicationScheduleGenerator tool
/// - Multiple AppStoreButton CTAs with analytics
/// - FAQ, disclaimer, related guides
///
/// ## Don't Include
/// - Medical advice or dosage logic

import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, AppStoreCTA } from "@/components/CTAButton";
import MedicationScheduleGenerator from "./MedicationScheduleGenerator";

export const metadata: Metadata = {
  title: "How to Remember Your Medication (The Last 5 Minutes Fix)",
  description:
    "If you keep missing your medication, the problem isn't forgetting — it's what happens in the moment. Set up a system that actually works.",
  alternates: { canonical: "https://www.ontimer.app/how-to-remember-medication-on-time" },
  openGraph: {
    title: "How to Remember Your Medication (The Last 5 Minutes Fix)",
    description:
      "If you keep missing your medication, the problem isn't forgetting — it's what happens in the moment. Set up a system that actually works.",
    url: "https://www.ontimer.app/how-to-remember-medication-on-time",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Medication Schedule Generator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "A free tool to generate a personalized medication schedule and download it as a calendar file.",
  url: "https://www.ontimer.app/how-to-remember-medication-on-time",
  author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
};

const faqItems = [
  {
    question: "Why do I forget to take my medication even with reminders?",
    answer:
      "Most people don't forget entirely — they see the reminder, think 'I'll take it in a minute,' get distracted, and miss the dose. The problem is what happens after the reminder fires, not the reminder itself. A single notification is easy to dismiss and forget seconds later.",
  },
  {
    question: "What is the best way to remember medication daily?",
    answer:
      "The most reliable system combines calendar events (so your medication fits into your day) with a high-salience alert that interrupts you in the moment. Adding your medication to your calendar as a recurring event gives it structure. OnTimer pairs with your calendar to make those moments impossible to ignore.",
  },
  {
    question: "Are medication reminder apps effective?",
    answer:
      "They can be — but most fail at the critical moment. A standard notification is too easy to swipe away or defer. The best reminder systems combine visibility (calendar integration) with interruption (an alert that demands acknowledgment). The goal is not just to remind you, but to make sure you act.",
  },
  {
    question: "How do I set medication reminders on iPhone?",
    answer:
      "The quickest method: add a recurring calendar event for each dose time using the built-in Calendar app or the schedule generator on this page. For more reliable interruption, pair it with OnTimer — which turns calendar events into persistent, hard-to-ignore alarms.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
    {
      "@type": "ListItem",
      position: 2,
      name: "How to Remember Your Medication",
      item: "https://www.ontimer.app/how-to-remember-medication-on-time",
    },
  ],
};

function ArticleCTA({ location }: { location: string }) {
  return (
    <div className="my-8 flex justify-center">
      <AppStoreButton size="md" location={location} />
    </div>
  );
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">How to Remember Your Medication</span>
          </nav>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            How to Remember Your Medication (The Last 5 Minutes Fix)
            <span className="text-zinc-400"> (Even If You Keep Missing It)</span>
          </h1>

          {/* Direct Answer Box */}
          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">
              Direct Answer
            </p>
            <p className="text-zinc-200 leading-relaxed">
              If you keep missing your medication, the problem usually isn&apos;t forgetting — it&apos;s
              what happens in the moment. Most people see a reminder, think &ldquo;I&apos;ll take it
              in a minute,&rdquo; get distracted, and never follow through.
            </p>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              The fix isn&apos;t more reminders. It&apos;s a system that interrupts you at the exact
              moment you&apos;re about to miss it.
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="border-t border-zinc-800 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <MedicationScheduleGenerator />
        </div>
      </section>

      {/* Section 1: Real Reason */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Real Reason You Miss Medication
          </h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>You probably don&apos;t miss your medication because you don&apos;t care.</p>
            <p>You miss it because of what happens right after the reminder.</p>
            <p>
              You see a notification. You register it. You fully intend to act on it. But instead of
              taking it immediately, you think: <em className="text-zinc-200">&ldquo;I&apos;ll do it in a minute.&rdquo;</em>
            </p>
            <p>Then something small happens — a message, a task, a conversation. And just like that, the moment is gone.</p>
            <p>This is where most systems fail. Not because they didn&apos;t remind you — but because they didn&apos;t interrupt you.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Why Reminders Fail */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Medication Reminders Don&apos;t Work
          </h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>Most reminder systems rely on a single notification. That works if you&apos;re free, you act immediately, and nothing interrupts you.</p>
            <p>But real life doesn&apos;t work like that.</p>
            <p>Notifications are easy to swipe away, ignore, or forget seconds later. So even though you &ldquo;remembered,&rdquo; you still miss the dose.</p>
          </div>
          <div className="mt-6">
            <Link
              href="/why-medication-reminders-fail"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              Read more: Why medication reminders fail →
            </Link>
          </div>
        </div>
      </section>

      <ArticleCTA location="medication_article_mid" />

      {/* Section 3: Calendar System */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            A Better System: Use Your Calendar
          </h2>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Instead of relying on memory, use your calendar as your system. Your calendar already
            fits your day, already structures your time, and is something you actually check.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { step: "Step 1", text: "Create recurring events for your medication." },
              { step: "Step 2", text: "Label them clearly so you know exactly what to take." },
              { step: "Step 3", text: "Treat them like appointments — not suggestions." },
            ].map(({ step, text }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <span className="text-sm font-bold text-green-500 whitespace-nowrap">{step}</span>
                <p className="text-zinc-300">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/medication-schedule-calendar-setup"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              Read more: How to set up a medication calendar →
            </Link>
          </div>
        </div>
      </section>

      <ArticleCTA location="medication_article_post_calendar" />

      {/* Section 4: Last 5 Minutes Problem */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Last 5 Minutes Problem
          </h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>Your calendar will remind you. But reminders alone are easy to ignore.</p>
            <p>
              If you&apos;ve ever seen a reminder, thought &ldquo;I&apos;ll take it in a minute,&rdquo;
              and then missed it — you&apos;ve experienced the last 5 minutes problem.
            </p>
            <p>That&apos;s where most systems break down.</p>
          </div>
        </div>
      </section>

      {/* Section 5: How OnTimer Helps */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Helps
          </h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>
              OnTimer works with your calendar — but instead of a single notification, it actively
              interrupts you until you act.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "You don't just see the reminder",
                "You don't lose the moment",
                "You're more likely to follow through",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-green-500 font-bold">✓</span>
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-zinc-300">
              If your current reminders aren&apos;t working in the moment, this is what you use instead.
            </p>
          </div>
          <div className="mt-8">
            <AppStoreCTA location="medication_article_ontimer_cta" />
          </div>
        </div>
      </section>

      {/* Special Situations */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Special Situations
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "For ADHD",
                text: "If you struggle with time blindness, the issue isn't remembering — it's acting in the moment.",
                href: "/adhd-medication-timing",
                linkText: "ADHD & medication timing →",
              },
              {
                title: "For Caregivers",
                text: "You can set up a shared calendar for a parent and create a system they can rely on.",
                href: "/help-elderly-parent-remember-medication",
                linkText: "Helping a parent →",
              },
              {
                title: "For Pets",
                text: "Pets won't remind you. A system ensures you don't forget their care.",
                href: "/pet-medication-schedule",
                linkText: "Pet medication reminders →",
              },
            ].map(({ title, text, href, linkText }) => (
              <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{text}</p>
                <Link
                  href={href}
                  className="mt-3 inline-block text-sm text-green-500 hover:text-green-400 transition-colors"
                >
                  {linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t-2 border-zinc-700 bg-zinc-900/50 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> OnTimer is not a medical device and
            does not guarantee medication adherence or outcomes. This tool is for organizational
            purposes only and does not replace medical advice or prescribed treatment schedules.
            Always follow your healthcare provider&apos;s instructions.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-zinc-800 bg-zinc-900"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white">
                  {item.question}
                  <span className="ml-4 shrink-0 text-zinc-500 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related Guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/last-5-minutes-problem", label: "The Last 5 Minutes Problem: Why Reminders Fail at Critical Moments" },
              { href: "/why-medication-reminders-fail", label: "Why Medication Reminders Fail (And What Actually Works)" },
              { href: "/medication-schedule-calendar-setup", label: "How to Set Up a Medication Schedule Using Your Calendar" },
              { href: "/help-elderly-parent-remember-medication", label: "How to Help an Elderly Parent Remember Their Medication" },
              { href: "/adhd-medication-timing", label: "ADHD and Medication Timing: Why the Last 5 Minutes Matters" },
              { href: "/pet-medication-schedule", label: "How to Remember Your Pet's Medication Schedule" },
              { href: "/how-to-set-medication-reminders-iphone", label: "How to Set Medication Reminders on iPhone" },
              { href: "/turn-calendar-events-into-alarms", label: "Turn Calendar Events Into Persistent Alarms" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-green-500 hover:text-green-400 transition-colors text-sm"
                >
                  {label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
