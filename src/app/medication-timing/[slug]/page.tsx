import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppStoreButton } from "@/components/CTAButton";
import { MEDICATION_TIMING_PROFILES } from "@/lib/medication-timing-profiles";

interface Props {
  params: Promise<{ slug: string }>;
}

function findProfile(slug: string) {
  return MEDICATION_TIMING_PROFILES.find((profile) => profile.slug === slug);
}

export async function generateStaticParams() {
  return MEDICATION_TIMING_PROFILES.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = findProfile(slug);
  if (!profile) return {};
  const title = `${profile.name} Dosage Timing: When to Take It`;
  const canonical = `https://www.ontimer.app/medication-timing/${profile.slug}`;
  return {
    title,
    description: profile.metaDescription,
    alternates: { canonical },
    openGraph: { title, description: profile.metaDescription },
  };
}

export default async function MedicationTimingPage({ params }: Props) {
  const { slug } = await params;
  const profile = findProfile(slug);
  if (!profile) notFound();

  const canonical = `https://www.ontimer.app/medication-timing/${profile.slug}`;
  const title = `${profile.name} Dosage Timing: When to Take It`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: profile.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: profile.metaDescription,
    author: { "@type": "Organization", name: "OnTimer" },
    publisher: { "@type": "Organization", name: "OnTimer" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
      { "@type": "ListItem", position: 2, name: "Medication Timing", item: "https://www.ontimer.app/medication-timing" },
      { "@type": "ListItem", position: 3, name: profile.name, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="transition-colors hover:text-zinc-300">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/medication-timing" className="transition-colors hover:text-zinc-300">Medication Timing</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">{profile.name}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-widest text-green-500">{profile.category}</p>
          <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            {profile.name} Dosage Timing:
            <span className="text-zinc-400"> When to Take It</span>
          </h1>
          {profile.brandNames && profile.brandNames.length > 0 && profile.brandNames[0] !== profile.name && (
            <p className="mt-3 text-sm text-zinc-500">Generic name: {profile.genericName}. Brand name{profile.brandNames.length > 1 ? "s" : ""}: {profile.brandNames.join(", ")}.</p>
          )}

          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">Direct Answer</p>
            <p className="leading-relaxed text-zinc-200">{profile.directAnswer}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Timing Considerations</h2>
          <p className="mt-3 text-sm text-zinc-500">Typical frequency: {profile.frequency}</p>
          <ul className="mt-6 space-y-4">
            {profile.timingConsiderations.map((point) => (
              <li key={point} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-300">
                <span className="mt-1 text-green-500" aria-hidden="true">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">With or Without Food?</h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">{profile.foodGuidance}</p>

          <h2 className="mt-14 text-3xl font-black tracking-tight text-white sm:text-4xl">A Common Schedule Example</h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">{profile.scheduleExample}</p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            This is an illustrative example, not a prescription — the exact schedule should always come from the prescriber who wrote it.
          </p>

          <h2 className="mt-14 text-3xl font-black tracking-tight text-white sm:text-4xl">Missed a Dose?</h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">{profile.missedDoseNote}</p>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Common Questions</h2>
          <div className="mt-8 space-y-6">
            {profile.faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-semibold text-white">{faq.question}</p>
                <p className="mt-2 leading-relaxed text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              OnTimer&apos;s medication scheduler turns a dose schedule like this one into an actual calendar file — with a persistent alarm for each dose, not just a reminder you can dismiss.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/how-to-remember-medication-on-time" className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white">
                Build a {profile.name} schedule
              </Link>
              <AppStoreButton size="md" location="medication_timing_cta" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-zinc-700 bg-zinc-900/50 py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm leading-relaxed text-zinc-300">
            <strong className="text-white">Disclaimer:</strong> OnTimer is not a medical device and does not provide medical advice. This page describes general, publicly known scheduling and timing conventions only — not dosing amounts or clinical guidance — and does not replace instructions from a prescriber or pharmacist. Always follow your prescription label and your healthcare provider&apos;s instructions.
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/medication-timing", label: "All medication timing guides" },
              { href: "/how-to-remember-medication-on-time", label: "How to Remember to Take Your Medication on Time" },
              { href: "/medication-schedule-calendar-setup", label: "How to Set Up a Medication Calendar" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-green-500 transition-colors hover:text-green-400">{label} →</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
