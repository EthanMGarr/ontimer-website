import type { Metadata } from "next";
import Link from "next/link";
import { comparisons, COMPARISON_REVIEWED_ON } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "Compare OnTimer With Calendar and Reminder Apps",
  description:
    "Transparent, source-linked comparisons of OnTimer, Pealo, Due, Fantastical, and Apple Calendar alerts.",
  alternates: { canonical: "https://www.ontimer.app/compare" },
};

export default function ComparePage() {
  return (
    <div className="site-page">
      <section className="site-hero site-hero--compact">
        <div className="site-shell site-hero__content site-hero__content--center">
          <p className="site-kicker">Choose by workflow, not hype</p>
          <h1 className="site-title">Compare calendar alarm and reminder apps</h1>
          <p className="site-lede">
            The best choice depends on whether you want automatic calendar alarms, manual repeating
            reminders, a full calendar replacement, or standard built-in alerts.
          </p>
          <p className="mt-4 text-sm text-zinc-500">Last reviewed {COMPARISON_REVIEWED_ON}</p>
        </div>
      </section>

      <section className="site-flow">
        <div className="site-shell">
          <div className="site-feature-grid">
            {comparisons.map((comparison, index) => (
              <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="site-feature-card">
                <span className="site-feature-card__index">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="text-xl font-bold">{comparison.title}</h2>
                <p>{comparison.directAnswer}</p>
                <span className="site-text-action">Read the comparison →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-context">
        <div className="site-shell site-shell--reading">
          <p className="site-kicker">Methodology</p>
          <h2>How these comparisons are maintained</h2>
          <p>
            We compare the workflow and features described on each product&apos;s official website or
            support documentation. Every detail page links to the source reviewed and states the
            review date. If a competitor does not describe a feature publicly, we say that instead of
            assuming it is unavailable.
          </p>
        </div>
      </section>
    </div>
  );
}
