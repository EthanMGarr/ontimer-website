import type { Metadata } from "next";
import Link from "next/link";
import ProviderMedicationSchedule from "./ProviderMedicationSchedule";

export const metadata: Metadata = {
  title: "Medication Calendar Handoff for Healthcare Providers",
  description: "Create a medication calendar file in your browser, then hand it to a patient by email. No patient-identifying information or server storage required.",
  alternates: { canonical: "https://www.ontimer.app/provider-medication-schedule" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function ProviderMedicationSchedulePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="py-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav className="mb-8 hidden text-sm text-zinc-500 sm:block"><Link href="/" className="hover:text-zinc-300">Home</Link><span className="mx-2">›</span><span className="text-zinc-300">Provider medication schedule</span></nav>
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,.8fr)_minmax(30rem,1.2fr)] lg:gap-12">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-400 sm:text-sm">For healthcare providers</p>
              <h1 className="mt-2 min-w-0 text-3xl font-black leading-[1.05] tracking-tight [overflow-wrap:anywhere] sm:mt-3 sm:text-5xl">A medication schedule your patient can actually use.</h1>
              <p className="mt-3 text-base leading-relaxed text-zinc-300 sm:mt-5 sm:text-lg">Create a clear schedule, review it with your patient, then send one link they can add to their calendar.</p>
              <p className="mt-4 hidden text-sm leading-relaxed text-zinc-500 sm:block">No account, patient name, or portal workflow required.</p>
            </div>
            <ProviderMedicationSchedule />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="min-w-0 [overflow-wrap:anywhere] text-3xl font-black tracking-tight text-white sm:text-4xl">
            A simple calendar handoff, not another system to manage
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            <p>
              Give patients one clear schedule they can add directly to the calendar they already use. Confirm the medication, prescription directions, dose times, and duration together before sending the link.
            </p>
            <p>
              Calendar events make each dose visible in the patient&apos;s day. If a patient wants stronger alerts, they can independently use OnTimer to turn their own calendar events into alarms on iPhone.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
