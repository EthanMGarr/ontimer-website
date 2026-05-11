import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Help an Elderly Parent Remember Their Medication | OnTimer",
  description:
    "A practical guide for caregivers: how to set up a medication system for an elderly parent that works reliably without requiring constant supervision.",
  openGraph: {
    title: "How to Help an Elderly Parent Remember Their Medication | OnTimer",
    description:
      "A practical guide for caregivers: set up a medication system for an elderly parent that works reliably.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I help my elderly parent remember medication?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Set up a shared calendar with recurring medication events. Use an app that fires high-salience alarms rather than dismissible notifications. The goal is a system they can follow independently, not one that requires you to check on them constantly.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best medication reminder app for seniors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look for apps with large, clear alerts that require acknowledgment rather than just a swipe to dismiss. OnTimer integrates with your existing calendar and fires persistent alarms that are hard to miss.",
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
            headline: "How to Help an Elderly Parent Remember Their Medication",
            description: "A practical guide for caregivers: how to set up a medication system for an elderly parent that works reliably without requiring constant supervision.",
            author: { "@type": "Organization", name: "OnTimer" },
            publisher: { "@type": "Organization", name: "OnTimer" },
            datePublished: "2026-04-01",
            dateModified: "2026-05-11",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/help-elderly-parent-remember-medication" },
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
              { "@type": "ListItem", position: 3, name: "Helping a Parent", item: "https://www.ontimer.app/help-elderly-parent-remember-medication" },
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
            <span className="text-zinc-300">Helping a Parent</span>
          </nav>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            How to Help an Elderly Parent Remember Their Medication
          </h1>

          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              Set up a shared calendar with recurring medication events. Use an alert system that demands acknowledgment — not just a swipe. The goal is a system your parent can follow independently, so you&apos;re not the reminder.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">The Real Challenge for Caregivers</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>You can&apos;t be there every time. And relying on yourself as the reminder isn&apos;t sustainable.</p>
            <p>The goal isn&apos;t to remind them more often — it&apos;s to build a system they can follow without you. One that fires at the right time and doesn&apos;t let the moment slip.</p>
            <p>Standard phone notifications are too easy to miss, especially if your parent&apos;s phone is on silent, face-down, or across the room.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">How to Set It Up</h2>
          <div className="mt-8 space-y-4">
            {[
              { step: "Step 1", title: "Map out the schedule", text: "List every medication, dose, and time. Confirm with the prescribing doctor if anything is unclear." },
              { step: "Step 2", title: "Create a shared calendar", text: "Use Google Calendar or Apple Calendar. Create a shared calendar your parent can see on their device. Add a recurring event for each dose." },
              { step: "Step 3", title: "Use the schedule generator", text: "Generate a medication schedule at ontimer.app/how-to-remember-medication-on-time and download the .ics file. Import it into their calendar directly." },
              { step: "Step 4", title: "Set up a high-salience alert", text: "A basic notification is often not enough. Pair with an app that fires a full-screen alarm that requires active dismissal." },
              { step: "Step 5", title: "Review weekly", text: "Check in once a week to confirm the system is working. Adjust times if doses are consistently missed." },
            ].map(({ step, title, text }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <span className="text-sm font-bold text-green-500 whitespace-nowrap">{step}</span>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">The Last 5 Minutes Problem — and How to Solve It</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>The most common failure point: your parent sees the reminder, intends to take the medication, and gets distracted before following through.</p>
            <p>This isn&apos;t forgetfulness. It&apos;s the last 5 minutes problem. And standard notifications don&apos;t solve it.</p>
            <p>OnTimer pairs with their calendar and fires a persistent alarm — the kind that stays on screen until dismissed. It doesn&apos;t let the moment pass.</p>
          </div>
          <div className="mt-8">
            <AppStoreButton size="md" location="caregiver_cta" />
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
              { href: "/medication-schedule-calendar-setup", label: "How to Set Up a Medication Calendar" },
              { href: "/why-medication-reminders-fail", label: "Why Medication Reminders Fail" },
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
