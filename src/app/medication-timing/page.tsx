import type { Metadata } from "next";
import Link from "next/link";
import { MEDICATION_TIMING_PROFILES } from "@/lib/medication-timing-profiles";

export const metadata: Metadata = {
  title: "Medication Dosage Timing Guides",
  description: "When to take common medications — morning or evening, with or without food, and how missed-dose spacing typically works. General scheduling guidance, not medical advice.",
  alternates: { canonical: "https://www.ontimer.app/medication-timing" },
  openGraph: {
    title: "Medication Dosage Timing Guides",
    description: "When to take common medications — morning or evening, with or without food, and how missed-dose spacing typically works.",
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "OnTimer Medication Timing Guides",
  description: "A directory of medication dosage timing guides covering common prescriptions.",
  url: "https://www.ontimer.app/medication-timing",
};

export default function MedicationTimingDirectory() {
  const categories = Array.from(new Set(MEDICATION_TIMING_PROFILES.map((profile) => profile.category)));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="transition-colors hover:text-zinc-300">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">Medication Timing</span>
          </nav>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Medication Dosage Timing
            <span className="text-zinc-400"> Guides</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            When to take common medications — morning or evening, with or without food, and how spacing between doses typically works. General scheduling conventions only, not medical advice; always follow your own prescription and prescriber&apos;s instructions.
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {categories.map((category) => (
            <div key={category} className="mb-10 last:mb-0">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">{category}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {MEDICATION_TIMING_PROFILES.filter((profile) => profile.category === category).map((profile) => (
                  <Link
                    key={profile.slug}
                    href={`/medication-timing/${profile.slug}`}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-600"
                  >
                    <p className="font-semibold text-white">{profile.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">{profile.frequency}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-sm leading-relaxed text-zinc-400">
            Don&apos;t see your medication? <Link href="/how-to-remember-medication-on-time" className="text-green-500 hover:text-green-400">Build a dose schedule</Link> for any medication directly — the scheduler works for anything, not just the medications listed here.
          </p>
        </div>
      </section>
    </>
  );
}
