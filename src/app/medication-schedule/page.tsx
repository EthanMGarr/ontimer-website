import type { Metadata } from "next";
import SharedMedicationSchedule from "./SharedMedicationSchedule";

export const metadata: Metadata = {
  title: "Add Your Medication Schedule to Your Calendar",
  description: "Review a medication schedule shared with you and add its recurring dose times to your calendar.",
  referrer: "no-referrer",
  robots: { index: false, follow: false, noarchive: true },
};

export default function MedicationSchedulePage() {
  return (
    <section className="bg-zinc-950 py-12 text-white sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SharedMedicationSchedule />
      </div>
    </section>
  );
}

