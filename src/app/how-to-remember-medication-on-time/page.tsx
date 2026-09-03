import type { Metadata } from "next";
import Link from "next/link";
import MedicationScheduleGenerator from "./MedicationScheduleGenerator";
import ResetScrollOnReload from "./ResetScrollOnReload";

export const metadata: Metadata = {
  title: "Medication Schedule Maker: Add Doses to Your Calendar",
  description:
    "Create a medication schedule you can add to Apple Calendar, Google Calendar, or Outlook. Review every dose time, then download one calendar file—free, no account required.",
  alternates: { canonical: "https://www.ontimer.app/how-to-remember-medication-on-time" },
  openGraph: {
    title: "Medication Schedule Maker: Add Doses to Your Calendar",
    description:
      "Create a calendar-ready medication schedule, review every dose time, then add it to your calendar.",
    url: "https://www.ontimer.app/how-to-remember-medication-on-time",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Medication Schedule Maker",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "A free organizational tool for creating a calendar-ready medication schedule from directions supplied by the user.",
  url: "https://www.ontimer.app/how-to-remember-medication-on-time",
  author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Create a medication schedule for your calendar",
  description:
    "Enter your prescribed schedule, review the generated dose times, and add the calendar file to a compatible calendar.",
  totalTime: "PT5M",
  step: [
    { "@type": "HowToStep", name: "Enter prescribed details", text: "Enter the medication name, instructions, dose times, and schedule duration exactly as prescribed." },
    { "@type": "HowToStep", name: "Review every event", text: "Review the generated dates and dose times before saving the calendar file." },
    { "@type": "HowToStep", name: "Add it to your calendar", text: "Download one calendar file and import it into Apple Calendar, Google Calendar, Outlook, or another compatible calendar." },
  ],
};

const faqItems = [
  {
    question: "Can I create a medication schedule without an account?",
    answer:
      "Yes. Enter the schedule details, review the events, and download a calendar file without creating an OnTimer account.",
  },
  {
    question: "Which calendars can I use?",
    answer:
      "The schedule downloads as a standard calendar file that can be imported into Apple Calendar, Google Calendar, Microsoft Outlook, and other compatible calendar apps.",
  },
  {
    question: "Does this tool decide when or how much medication to take?",
    answer:
      "No. OnTimer does not determine medication, dosage, or timing. Enter only instructions already provided by your prescription label or healthcare professional, and verify every event before adding it to your calendar.",
  },
  {
    question: "What is the difference between a printable schedule and a calendar schedule?",
    answer:
      "A printable schedule shows a plan on paper. This tool creates calendar events you can review and add to the calendar you already use.",
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
    { "@type": "ListItem", position: 2, name: "Medication Schedule Maker", item: "https://www.ontimer.app/how-to-remember-medication-on-time" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ResetScrollOnReload />

      {/* Hallmark · macrostructure: Workbench · tone: utilitarian · theme: existing OnTimer */}
      <section className="border-b border-zinc-800 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-8 hidden text-sm text-zinc-500 sm:block">
            <Link href="/" className="transition-colors hover:text-zinc-300">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">Medication Schedule Maker</span>
          </nav>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(30rem,1.25fr)] lg:gap-12">
            <div className="min-w-0 lg:pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-500">Free medication schedule maker · No account required</p>
              <h1 className="mt-4 min-w-0 [overflow-wrap:anywhere] text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">Create a medication schedule for your calendar.</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-300 sm:text-xl">Enter your prescribed directions, review every dose time, and add one calendar-ready schedule to the calendar you already use.</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">For organization only. OnTimer does not determine medication, dosage, or timing.</p>
            </div>
            <MedicationScheduleGenerator />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900/50 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["01", "Enter prescribed details", "Add the medication name, instructions, dose times, and duration exactly as you were told."],
              ["02", "Review every event", "Check the generated dates and times before you save anything to your calendar."],
              ["03", "Add one calendar file", "Download a standard calendar file for Apple Calendar, Google Calendar, Outlook, or another compatible app."],
            ].map(([number, title, copy]) => (
              <article key={number} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
                <p className="text-sm font-bold text-green-500">{number}</p>
                <h2 className="mt-5 text-xl font-bold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-500">Calendar-ready, not clinical advice</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">Turn directions you already have into events you can see.</h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-zinc-400">
            <p>A printable schedule shows a plan. This tool makes a calendar-ready schedule that you can import, inspect, and keep alongside the rest of your day.</p>
            <p>Before you use it, check your prescription label or healthcare professional&apos;s instructions. Review every generated dose time before adding the calendar file.</p>
            <Link href="/medication-schedule-calendar-setup" className="inline-block text-sm font-medium text-green-500 transition-colors hover:text-green-400">How to add a medication schedule to your calendar →</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900/50 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-500">After import</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">Use your calendar as the schedule. Use OnTimer as the alarm layer.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-400">Your calendar remains the source of truth for your events. OnTimer can turn calendar events into automatic alarms, so the schedule stays connected to the time system you already use.</p>
          <Link href="/turn-calendar-events-into-alarms" className="mt-6 inline-block text-sm font-medium text-green-500 transition-colors hover:text-green-400">Learn how calendar events become alarms →</Link>
        </div>
      </section>

      <section className="border-b border-zinc-800 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">Making a schedule for someone else?</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Link href="/caregiver-medication-schedule" className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700">
              <p className="text-sm font-semibold text-green-500">For caregivers</p>
              <h3 className="mt-2 text-xl font-bold text-white">Create a family medication schedule</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">Set up a calendar-ready schedule for a parent, partner, or person you support.</p>
            </Link>
            <Link href="/veterinary-medication-schedule" className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700">
              <p className="text-sm font-semibold text-green-500">For veterinary teams</p>
              <h3 className="mt-2 text-xl font-bold text-white">Create a pet medication schedule</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">Give pet owners a clear schedule they can add to the calendar they use every day.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-zinc-700 bg-zinc-900/50 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-sm leading-relaxed text-zinc-300"><strong className="text-white">Important:</strong> OnTimer is an organizational tool, not a medical device. It does not determine medications, dosage, timing, or treatment. Follow your prescription label and healthcare professional&apos;s instructions, and verify the calendar events before relying on them.</p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-xl border border-zinc-800 bg-zinc-900">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white">
                  {item.question}<span className="ml-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <h2 className="text-xl font-black tracking-tight text-white">Related guides</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["/how-to-set-medication-reminders-iphone", "How to set medication reminders on iPhone"],
                ["/why-medication-reminders-fail", "Why medication reminders fail"],
                ["/caregiver-medication-schedule", "Medication schedules for caregivers"],
                ["/veterinary-medication-schedule", "Pet medication schedules for veterinary teams"],
              ].map(([href, label]) => <Link key={href} href={href} className="text-sm text-green-500 transition-colors hover:text-green-400">{label} →</Link>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
