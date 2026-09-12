/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V4 */
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
    <div className="site-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      <section className="site-hero site-hero--compact">
        <div className="site-shell site-hero__content">
          <nav className="site-note" aria-label="Breadcrumb">
            <Link href="/" className="site-inline-link">Home</Link>
            <span className="mx-2">›</span>
            <span>Medication Timing</span>
          </nav>

          <p className="site-kicker site-kicker--spaced">Medication timing guides</p>
          <h1 className="site-title">Medication Dosage Timing Guides</h1>
          <p className="site-lede">
            When to take common medications — morning or evening, with or without food, and how spacing between doses typically works. General scheduling conventions only, not medical advice; always follow your own prescription and prescriber&apos;s instructions.
          </p>
          <div className="site-alpha-nav">
            <p>Already know the directions and dose times?</p>
            <p className="site-note">Skip the guides and turn the instructions you already have into one calendar-ready schedule.</p>
            <Link href="/how-to-remember-medication-on-time" className="site-text-action">
              Create my medication schedule
            </Link>
          </div>
        </div>
      </section>

      <section className="site-directory-section site-directory-section--tint">
        <div className="site-shell site-shell--reading site-directory-groups">
          {categories.map((category) => (
            <div key={category} className="site-letter-group site-letter-group--named">
              <h2>{category}</h2>
              <div className="site-location-grid">
                {MEDICATION_TIMING_PROFILES.filter((profile) => profile.category === category).map((profile) => (
                  <Link
                    key={profile.slug}
                    href={`/medication-timing/${profile.slug}`}
                    className="site-location-link"
                  >
                    <strong>{profile.name}</strong>
                    <span>{profile.frequency}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="site-directory-section">
        <div className="site-shell site-shell--reading">
          <p className="site-lede">
            Don&apos;t see your medication? <Link href="/how-to-remember-medication-on-time" className="site-inline-link">Build a dose schedule</Link> for any medication directly — the scheduler works for anything, not just the medications listed here.
          </p>
        </div>
      </section>
    </div>
  );
}
