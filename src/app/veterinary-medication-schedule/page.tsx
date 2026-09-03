import type { Metadata } from "next";
import Link from "next/link";
import ProviderMedicationSchedule from "../provider-medication-schedule/ProviderMedicationSchedule";

export const metadata: Metadata = {
  title: "Pet Medication Schedule Maker for Veterinary Practices",
  description: "Create a calendar-ready pet medication schedule, then send a private link to the pet owner. No account required.",
  alternates: { canonical: "https://www.ontimer.app/veterinary-medication-schedule" },
};

const faqItems = [
  { question: "How can a veterinary practice send a pet medication schedule to an owner?", answer: "Enter the veterinarian’s directions and the intended dose times, review the schedule, then copy or email one private link. The owner can review it and add the calendar file without creating an account." },
  { question: "Does this tool determine pet medication dosage or treatment?", answer: "No. It is an organizational tool for directions already prescribed. It does not determine dosage, treatment, or veterinary timing." },
  { question: "Does the pet owner need a clinic app or account?", answer: "No. The recipient uses the private link to review the schedule and add the resulting calendar file to their calendar." },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Create a pet medication schedule for a pet owner",
  step: [
    { "@type": "HowToStep", name: "Enter veterinarian directions", text: "Enter the medication, directions, intended dose times, start date, and duration." },
    { "@type": "HowToStep", name: "Review the schedule", text: "Review the medication, directions, dose times, and duration before sharing." },
    { "@type": "HowToStep", name: "Send the private link", text: "Send the link so the pet owner can review the schedule and add it to their calendar." },
  ],
};

export default function VeterinaryMedicationSchedulePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <section className="py-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="mb-8 hidden text-sm text-zinc-500 sm:block"><Link href="/" className="hover:text-zinc-300">Home</Link><span className="mx-2">›</span><span className="text-zinc-300">Veterinary medication schedule</span></nav>
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,.8fr)_minmax(30rem,1.2fr)] lg:gap-12">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-400 sm:text-sm">For veterinary practices</p>
              <h1 className="mt-2 min-w-0 text-3xl font-black leading-[1.05] tracking-tight [overflow-wrap:anywhere] sm:mt-3 sm:text-5xl">A pet medication schedule owners can actually use.</h1>
              <p className="mt-3 text-base leading-relaxed text-zinc-300 sm:mt-5 sm:text-lg">Create a clear schedule, review it with the pet owner, then send one link they can add to their calendar.</p>
              <p className="mt-4 hidden text-sm leading-relaxed text-zinc-500 sm:block">No account or clinic-system integration required.</p>
            </div>
            <ProviderMedicationSchedule variant="veterinary" />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="min-w-0 [overflow-wrap:anywhere] text-3xl font-black tracking-tight text-white sm:text-4xl">A simple calendar handoff for pet medication directions</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            <p>Create the schedule from the directions already prescribed, then give the pet owner one private link to review and add it to their calendar.</p>
            <p>Review the medication, directions, dose times, and duration before sharing. This organizational tool does not determine dosage, treatment, or veterinary timing.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Questions veterinary practices ask</h2>
          <div className="mt-7 space-y-3">
            {faqItems.map((item) => <details key={item.question} className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4"><summary className="cursor-pointer font-semibold text-white">{item.question}</summary><p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.answer}</p></details>)}
          </div>
          <div className="mt-10 border-t border-zinc-800 pt-6">
            <h2 className="text-xl font-black text-white">More medication schedule tools</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/pet-medication-schedule" className="text-green-400 hover:text-green-300">Pet medication scheduling guidance →</Link></li>
              <li><Link href="/caregiver-medication-schedule" className="text-green-400 hover:text-green-300">Create a schedule for a family member →</Link></li>
              <li><Link href="/how-to-remember-medication-on-time" className="text-green-400 hover:text-green-300">Create a personal medication schedule →</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
