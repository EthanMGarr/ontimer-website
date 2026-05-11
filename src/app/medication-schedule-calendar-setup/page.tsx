import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/medication-schedule-calendar-setup" },
  title: "How to Set Up a Medication Schedule Using Your Calendar",
  description:
    "Use your calendar as a medication system. Step-by-step guide to creating recurring events that keep you on schedule — plus a free ICS schedule generator.",
  openGraph: {
    title: "How to Set Up a Medication Schedule Using Your Calendar",
    description:
      "Use your calendar as a medication system. Step-by-step guide to creating recurring events that keep you on schedule.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I use Google Calendar for medication reminders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Create a recurring event for each dose time and enable notifications. For stronger interruption, pair it with OnTimer, which turns calendar events into hard-to-ignore alarms.",
      },
    },
    {
      "@type": "Question",
      name: "What is the easiest way to set up a medication calendar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the free schedule generator at ontimer.app/how-to-remember-medication-on-time. Enter your medication name, frequency, and start time. Download the .ics file and open it in any calendar app — it creates 30 days of recurring events automatically.",
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
            headline: "How to Set Up a Medication Schedule Using Your Calendar",
            description: "Use your calendar as a medication system. Step-by-step guide to creating recurring events that keep you on schedule.",
            author: { "@type": "Organization", name: "OnTimer" },
            publisher: { "@type": "Organization", name: "OnTimer" },
            datePublished: "2026-04-01",
            dateModified: "2026-05-11",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/medication-schedule-calendar-setup" },
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
            <span className="text-zinc-300">Calendar Setup</span>
          </nav>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            How to Set Up a Medication Schedule Using Your Calendar
          </h1>

          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              Create a recurring calendar event for each dose time. Label it with the medication name. Set a reminder. Treat it like a real appointment. Use the{" "}
              <Link href="/how-to-remember-medication-on-time" className="text-green-400 hover:text-green-300">
                free schedule generator
              </Link>{" "}
              to download a ready-made .ics file in under a minute.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Why Your Calendar Works Better Than a Reminder App</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>Your calendar already structures your time. It&apos;s the system you actually look at. Adding medication to it doesn&apos;t add friction — it fits your existing workflow.</p>
            <p>A dedicated reminder app is one more thing to check. Your calendar is already open.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Step-by-Step Setup</h2>
          <div className="mt-8 space-y-4">
            {[
              { step: "Step 1", title: "Choose your times", text: "Decide when you need to take your medication each day. Space doses evenly — for twice daily, try 8am and 8pm." },
              { step: "Step 2", title: "Create a recurring event", text: "In Google Calendar, Apple Calendar, or Outlook: create an event at your dose time, set it to repeat daily, and give it a clear name (e.g. 'Take Lisinopril')." },
              { step: "Step 3", title: "Add a reminder", text: "Set a notification 0–5 minutes before the event. This is your prompt to act." },
              { step: "Step 4", title: "Treat it like an appointment", text: "Your medication event is a commitment, not a suggestion. Act on it immediately when it fires." },
              { step: "Step 5", title: "Or skip manual setup", text: "Use the free generator on this site to download a ready-made .ics file and import it in one click." },
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
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">When Calendar Reminders Aren&apos;t Enough</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>Calendar events give you structure. But the notification is still just a notification — easy to defer.</p>
            <p>If you find yourself seeing the reminder and still missing doses, the problem is the last 5 minutes. You need something that interrupts you, not just alerts you.</p>
            <p>OnTimer turns your calendar events into persistent alarms that demand attention until you act.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link href="/how-to-remember-medication-on-time" className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">
              Try the schedule generator
            </Link>
            <AppStoreButton size="md" location="medication_calendar_setup_cta" />
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
