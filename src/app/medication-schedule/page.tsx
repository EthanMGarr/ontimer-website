import type { Metadata } from "next";
import SharedMedicationSchedule from "./SharedMedicationSchedule";

export const metadata: Metadata = {
  title: "Medication Schedule Maker | OnTimer",
  description: "Review a medication schedule and add every dose to your calendar. No account required.",
  openGraph: {
    title: "Medication Schedule Maker | OnTimer",
    description: "Review a medication schedule and add every dose to your calendar. No account required.",
    url: "https://www.ontimer.app/medication-schedule",
    siteName: "OnTimer",
    type: "website",
    images: [{ url: "https://www.ontimer.app/icon.png", width: 512, height: 512, alt: "OnTimer" }],
  },
  twitter: { card: "summary", title: "Medication Schedule Maker | OnTimer", description: "Review a medication schedule and add every dose to your calendar. No account required.", images: ["https://www.ontimer.app/icon.png"] },
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
