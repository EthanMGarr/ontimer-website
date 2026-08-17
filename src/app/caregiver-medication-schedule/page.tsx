/* Hallmark · genre: playful · macrostructure: Narrative Workflow · theme: existing OnTimer · enrichment: none · nav: existing · footer: existing */

import type { Metadata } from "next";
import Link from "next/link";
import ProviderMedicationSchedule from "../provider-medication-schedule/ProviderMedicationSchedule";

export const metadata: Metadata = {
  title: "Medication Schedule Maker for Family Caregivers",
  description: "Create a private medication schedule link for a parent or family member to review and add to their calendar.",
  alternates: { canonical: "https://www.ontimer.app/caregiver-medication-schedule" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function CaregiverMedicationSchedulePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="py-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="mb-8 hidden text-sm text-zinc-500 sm:block"><Link href="/" className="hover:text-zinc-300">Home</Link><span className="mx-2">›</span><span className="text-zinc-300">Caregiver medication schedule</span></nav>
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,.8fr)_minmax(30rem,1.2fr)] lg:gap-12">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-400 sm:text-sm">For family caregivers</p>
              <h1 className="mt-2 min-w-0 text-3xl font-black leading-[1.05] tracking-tight [overflow-wrap:anywhere] sm:mt-3 sm:text-5xl">Create a medication schedule for someone you care for.</h1>
              <p className="mt-3 text-base leading-relaxed text-zinc-300 sm:mt-5 sm:text-lg">Create one clear medication schedule a parent or family member can review and add to their calendar.</p>
              <p className="mt-4 hidden text-sm leading-relaxed text-zinc-500 sm:block">No account or personal medical profile needed. You create a private link, then send it by email or text.</p>
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
            <li className="border-t border-zinc-700 pt-4"><span className="text-xs font-semibold text-green-400">01</span><h3 className="mt-2 font-bold text-white">Build it together</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">Enter the medication, instructions, dose times, and duration from the prescription or clinician&apos;s guidance.</p></li>
            <li className="border-t border-zinc-700 pt-4"><span className="text-xs font-semibold text-green-400">02</span><h3 className="mt-2 font-bold text-white">Send one private link</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">Your family member can review the schedule without creating an account.</p></li>
            <li className="border-t border-zinc-700 pt-4"><span className="text-xs font-semibold text-green-400">03</span><h3 className="mt-2 font-bold text-white">Add it to their calendar</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">One calendar file includes every dose time. OnTimer can make those calendar events harder to miss on iPhone.</p></li>
          </ol>
        </div>
      </section>
    </main>
  );
}
