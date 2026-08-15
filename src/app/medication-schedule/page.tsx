import type { Metadata } from "next";
import SharedMedicationSchedule from "./SharedMedicationSchedule";

export const metadata: Metadata = {
  title: "OnTimer — Medication Schedule",
  description: "A private medication schedule link — nothing is stored on our servers.",
  openGraph: {
    title: "OnTimer — Medication Schedule",
    description: "A private medication schedule link — nothing is stored on our servers.",
    url: "https://www.ontimer.app/medication-schedule",
    siteName: "OnTimer",
    type: "website",
    images: [{ url: "https://www.ontimer.app/icon.png", width: 512, height: 512, alt: "OnTimer" }],
  },
  twitter: { card: "summary", title: "OnTimer — Medication Schedule", description: "A private medication schedule link — nothing is stored on our servers.", images: ["https://www.ontimer.app/icon.png"] },
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
