import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Remember Your Pet's Medication Schedule | OnTimer",
  description:
    "Pets can't remind you. Here's how to set up a reliable system for your pet's medication schedule — flea prevention, heartworm, prescriptions, and more.",
  openGraph: {
    title: "How to Remember Your Pet's Medication Schedule | OnTimer",
    description:
      "Pets can't remind you. Here's how to set up a reliable system for your pet's medication schedule.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I remember my pet's monthly medication?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add a recurring calendar event for each medication — monthly for preventatives like heartworm and flea prevention, daily for prescription medications. Use the free schedule generator at ontimer.app/how-to-remember-medication-on-time to create the calendar file automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best way to track pet medications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your calendar. Create recurring events for each medication with the pet's name and medication name in the event title. Pair with an alarm app that ensures you actually act on the reminder rather than deferring it.",
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
            headline: "How to Remember Your Pet's Medication Schedule",
            description: "Pets can't remind you. Here's how to set up a reliable system for your pet's medication schedule — flea prevention, heartworm, prescriptions, and more.",
            author: { "@type": "Organization", name: "OnTimer" },
            publisher: { "@type": "Organization", name: "OnTimer" },
            datePublished: "2026-04-01",
            dateModified: "2026-05-11",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/pet-medication-schedule" },
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
              { "@type": "ListItem", position: 3, name: "Pet Medication", item: "https://www.ontimer.app/pet-medication-schedule" },
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
            <span className="text-zinc-300">Pet Medication</span>
          </nav>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            How to Remember Your Pet&apos;s Medication Schedule
          </h1>

          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              Your pet won&apos;t remind you. Set up recurring calendar events for every medication — daily, weekly, or monthly depending on the prescription. Use the{" "}
              <Link href="/how-to-remember-medication-on-time" className="text-green-400 hover:text-green-300">free schedule generator</Link>{" "}
              to create the file in under a minute.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">The Problem With Pet Medications</h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>Human medication reminders at least have one advantage: you feel the consequence relatively quickly. Miss a dose and you notice.</p>
            <p>With pet medications — especially monthly preventatives like heartworm or flea prevention — you often won&apos;t notice anything for weeks or months. By the time there&apos;s a problem, the missed dose was long forgotten.</p>
            <p>And unlike a child or an elderly parent, your pet absolutely cannot tell you they&apos;re due. The system has to work entirely on your end.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Common Pet Medications to Schedule</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { name: "Flea & tick prevention", freq: "Monthly" },
              { name: "Heartworm prevention", freq: "Monthly" },
              { name: "Daily prescriptions", freq: "Daily" },
              { name: "Joint supplements", freq: "Daily" },
              { name: "Ear or eye drops", freq: "As prescribed" },
              { name: "Dental chews", freq: "Weekly or monthly" },
            ].map(({ name, freq }) => (
              <div key={name} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
                <span className="text-sm text-zinc-300">{name}</span>
                <span className="text-xs text-green-500 font-medium">{freq}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">How to Set It Up</h2>
          <div className="mt-8 space-y-4">
            {[
              { step: "Step 1", text: "List every medication your pet takes, the dose, and the frequency." },
              { step: "Step 2", text: "Create a recurring calendar event for each one. Name it clearly: e.g. 'Buddy – Heartworm pill'." },
              { step: "Step 3", text: "For daily medications, use the schedule generator to download a ready-made .ics file." },
              { step: "Step 4", text: "For monthly medications, create a single recurring event in your calendar app set to monthly." },
              { step: "Step 5", text: "Pair the calendar with an alarm app to ensure you act on the reminder rather than defer it." },
            ].map(({ step, text }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <span className="text-sm font-bold text-green-500 whitespace-nowrap">{step}</span>
                <p className="text-zinc-400 text-sm">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/how-to-remember-medication-on-time" className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">
              Try the schedule generator
            </Link>
            <AppStoreButton size="md" location="pet_medication_cta" />
          </div>
        </div>
      </section>

      <section className="border-t-2 border-zinc-700 bg-zinc-900/50 py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> OnTimer is not a medical device and does not guarantee medication adherence or outcomes. This content is for organizational purposes only and does not replace veterinary advice or prescribed treatment schedules. Always follow your veterinarian&apos;s instructions.
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
