/* Hallmark · genre: editorial · macrostructure: Split Studio · theme: existing OnTimer · enrichment: none · nav: existing · footer: existing
 * Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V5 · contrast: pass (40–41) · slop: pass (42–45)
 */

import type { Metadata } from "next";
import Link from "next/link";
import ProviderMedicationSchedule from "../provider-medication-schedule/ProviderMedicationSchedule";

export const metadata: Metadata = {
  title: "Medication Schedule Maker for Family Caregivers",
  description: "Create a medication schedule link for a parent or family member to review and add to their calendar.",
  alternates: { canonical: "https://www.ontimer.app/caregiver-medication-schedule" },
};

const faqItems = [
  { question: "How do I set up a medication schedule for a parent?", answer: "Enter the medication directions and dose times already prescribed, review the schedule together, then send one link to the intended person. Your parent or family member can add the resulting calendar file to their own calendar without creating an account." },
  { question: "Does this tool decide medication doses or times?", answer: "No. It organizes the medication, directions, dose times, and duration you enter. Confirm those details against the prescription or with the healthcare provider before sharing or using the schedule." },
  { question: "What happens to the schedule information?", answer: "The tool runs in the browser. Schedule details are placed after the # in the link and are not included in the page request to OnTimer. Anyone with the complete link can read the schedule, so share it only with the intended person." },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Create a medication schedule for a parent or family member",
  step: [
    { "@type": "HowToStep", name: "Enter prescribed details", text: "Enter the medication, directions, dose times, start date, and duration already prescribed." },
    { "@type": "HowToStep", name: "Review the schedule", text: "Review every dose time and confirm it matches the prescription before sharing." },
    { "@type": "HowToStep", name: "Share the calendar-ready schedule", text: "Send the link to the intended person so they can review the schedule and add it to their calendar." },
  ],
};

export default function CaregiverMedicationSchedulePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <section className="py-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="mb-8 hidden text-sm text-zinc-500 sm:block"><Link href="/" className="hover:text-zinc-300">Home</Link><span className="mx-2">›</span><span className="text-zinc-300">Caregiver medication schedule</span></nav>
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,.8fr)_minmax(30rem,1.2fr)] lg:gap-12">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-400 sm:text-sm">For family caregivers</p>
              <h1 className="mt-2 min-w-0 text-3xl font-black leading-[1.05] tracking-tight [overflow-wrap:anywhere] sm:mt-3 sm:text-5xl">A clear medication routine for someone in your care.</h1>
              <p className="mt-3 text-base leading-relaxed text-zinc-300 sm:mt-5 sm:text-lg">Create a schedule together, send one link, and let them add it to the calendar they already use.</p>
              <p className="mt-4 hidden text-sm leading-relaxed text-zinc-500 sm:block">No account or personal medical profile required.</p>
            </div>
            <ProviderMedicationSchedule variant="caregiver" />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-400">A simple handoff</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Help them put the schedule where they already look.</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            <li className="border-t border-zinc-700 pt-4"><span className="text-xs font-semibold text-green-400">01</span><h3 className="mt-2 font-bold text-white">Build it together</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">Enter the medication, prescription directions, dose times, and duration. The schedule is for organization—not a change to their care plan.</p></li>
            <li className="border-t border-zinc-700 pt-4"><span className="text-xs font-semibold text-green-400">02</span><h3 className="mt-2 font-bold text-white">Send one link</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">Your family member can review the schedule without creating an account. Anyone with the complete link can view it.</p></li>
            <li className="border-t border-zinc-700 pt-4"><span className="text-xs font-semibold text-green-400">03</span><h3 className="mt-2 font-bold text-white">Add it to their calendar</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">One calendar file includes every dose time. If they want stronger alerts, they can choose to use OnTimer on their own iPhone.</p></li>
          </ol>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Questions caregivers ask</h2>
          <div className="mt-7 space-y-3">
            {faqItems.map((item) => <details key={item.question} className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4"><summary className="cursor-pointer font-semibold text-white">{item.question}</summary><p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.answer}</p></details>)}
          </div>
          <div className="mt-10 border-t border-zinc-800 pt-6">
            <h2 className="text-xl font-black text-white">More medication schedule tools</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/how-to-remember-medication-on-time" className="text-green-400 hover:text-green-300">Create a personal medication schedule →</Link></li>
              <li><Link href="/veterinary-medication-schedule" className="text-green-400 hover:text-green-300">Create a schedule for a pet owner →</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
