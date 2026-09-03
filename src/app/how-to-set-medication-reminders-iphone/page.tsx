/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4 */
import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/how-to-set-medication-reminders-iphone" },
  title: "How to Set Medication Reminders on iPhone",
  description:
    "Step-by-step guide to setting up medication reminders on iPhone using the Calendar app, Health app, and OnTimer for persistent alarms that actually work.",
  openGraph: {
    title: "How to Set Medication Reminders on iPhone",
    description:
      "Step-by-step guide to setting up medication reminders on iPhone — plus how to make them impossible to ignore.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I set a daily medication reminder on iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open the Calendar app → tap + to create a new event → set the time → enable Alert → set it to 'At time of event' → set Repeat to 'Every Day'. Or use the Health app's Medications feature (iOS 16+) for a dedicated medication reminder flow.",
      },
    },
    {
      "@type": "Question",
      name: "Can Siri remind me to take my medication on iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — say 'Hey Siri, remind me to take my medication every day at 8am.' This creates a recurring Reminders notification. For stronger interruption, pair with OnTimer which fires a persistent calendar-linked alarm.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best medication reminder app for iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Built-in options (Calendar, Health app, Reminders) work for basic needs. For users who miss notifications despite reminders, OnTimer fires calendar-linked alarms that stay on screen until dismissed — solving the 'I'll do it in a minute' problem.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
    { "@type": "ListItem", position: 2, name: "Medication Reminders", item: "https://www.ontimer.app/how-to-remember-medication-on-time" },
    { "@type": "ListItem", position: 3, name: "iPhone Setup", item: "https://www.ontimer.app/how-to-set-medication-reminders-iphone" },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How to Set Medication Reminders on iPhone",
            description: "Step-by-step guide to setting up medication reminders on iPhone using the Calendar app, Health app, and OnTimer.",
            author: { "@type": "Organization", name: "OnTimer" },
            publisher: { "@type": "Organization", name: "OnTimer" },
            datePublished: "2026-04-01",
            dateModified: "2026-05-11",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/how-to-set-medication-reminders-iphone" },
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
            <span className="text-zinc-300">iPhone Setup</span>
          </nav>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            How to Set Medication Reminders on iPhone
          </h1>

          <div className="mt-8 border-l-2 border-green-500 pl-5 sm:pl-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500">Fastest setup</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
              Create the whole medication schedule here.
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-zinc-300">
              Enter the dose times once, review every event, and download one calendar-ready schedule. There is no account and no need to create each recurring event by hand.
            </p>
            <Link
              href="/how-to-remember-medication-on-time"
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-green-500 px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-green-400"
            >
              Create my medication schedule
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Already have a schedule in your calendar? OnTimer can turn those events into persistent alarms on iPhone.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Alternative: Set It Up Manually in Calendar</h2>
          <p className="mt-4 text-zinc-400">Best for: a single simple dose you prefer to enter yourself.</p>
          <div className="mt-6 space-y-3">
            {[
              "Open the Calendar app",
              "Tap + (top right) to create a new event",
              "Enter your medication name as the event title",
              "Set the start time to your dose time",
              "Tap Alert → choose 'At time of event'",
              "Tap Repeat → choose 'Every Day'",
              "Tap Add to save",
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-500">
                  {i + 1}
                </span>
                <p className="text-zinc-300 text-sm">{step}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Or use the{" "}
            <Link href="/how-to-remember-medication-on-time" className="text-green-500 hover:text-green-400">
              medication schedule maker
            </Link>{" "}
            to download a .ics file and import it directly — no manual entry needed.
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Alternative: Health App Medications (iOS 16+)</h2>
          <p className="mt-4 text-zinc-400">Best for: users who want a dedicated medication log.</p>
          <div className="mt-6 space-y-3">
            {[
              "Open the Health app",
              "Tap Browse → Medications",
              "Tap 'Add a Medication'",
              "Enter the medication name and dosage",
              "Set your frequency and dose times",
              "Enable reminders in the notification settings",
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-zinc-300">
                  {i + 1}
                </span>
                <p className="text-zinc-300 text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Alternative: Siri</h2>
          <p className="mt-4 text-zinc-400">Best for: quick setup. Creates a Reminders notification.</p>
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-300 font-mono">
              &ldquo;Hey Siri, remind me to take my Lisinopril every day at 8am.&rdquo;
            </p>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            This creates a recurring Reminders notification. It works — but it&apos;s still a notification, which means it&apos;s still easy to dismiss and forget.
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">When iPhone Reminders Aren&apos;t Enough</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>All three options above fire a notification. And notifications are easy to ignore.</p>
            <p>You see it. You think &ldquo;one minute.&rdquo; You get pulled into something else. The moment passes.</p>
            <p>This is the last 5 minutes problem — and it happens to most people at some point, even with reminders set up correctly.</p>
            <p>OnTimer works differently: it pairs with your existing calendar and fires a persistent, full-screen alarm that stays until you dismiss it. It doesn&apos;t disappear into the notification tray.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link
              href="/how-to-remember-medication-on-time"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
            >
              Create a medication schedule
            </Link>
            <AppStoreButton size="md" location="iphone_medication_reminders_cta" />
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
              { href: "/why-medication-reminders-fail", label: "Why Medication Reminders Fail" },
              { href: "/medication-schedule-calendar-setup", label: "How to Set Up a Medication Calendar" },
              { href: "/adhd-medication-timing", label: "ADHD and Medication Timing" },
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
