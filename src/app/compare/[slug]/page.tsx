import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";
import { comparisons, COMPARISON_REVIEWED_ON, getComparison } from "@/lib/comparisons";

export function generateStaticParams() {
  return comparisons.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};
  return {
    title: `${comparison.title} | Calendar Alarm Comparison`,
    description: comparison.description,
    alternates: { canonical: `https://www.ontimer.app/compare/${comparison.slug}` },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  return (
    <div className="site-page">
      <section className="site-hero site-hero--compact">
        <div className="site-shell site-hero__content site-hero__content--center">
          <p className="site-kicker">Calendar alarm comparison</p>
          <h1 className="site-title">{comparison.title}</h1>
          <p className="site-lede">{comparison.directAnswer}</p>
          <p className="mt-4 text-sm text-zinc-500">Last reviewed {COMPARISON_REVIEWED_ON}</p>
        </div>
      </section>

      <section className="site-flow">
        <div className="site-shell site-shell--reading">
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="site-kicker">Choose OnTimer if</p>
              <p className="mt-3 text-zinc-300 leading-relaxed">{comparison.bestForOnTimer}</p>
            </article>
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="site-kicker">Choose {comparison.competitor} if</p>
              <p className="mt-3 text-zinc-300 leading-relaxed">{comparison.bestForCompetitor}</p>
            </article>
          </div>

          <h2 className="mt-14 text-3xl font-black tracking-tight text-white">Key differences</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-800">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-300">
                <tr>
                  <th className="p-4">What to compare</th>
                  <th className="border-l border-zinc-800 p-4">OnTimer</th>
                  <th className="border-l border-zinc-800 p-4">{comparison.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.differences.map((row) => (
                  <tr key={row.topic} className="border-t border-zinc-800 align-top">
                    <th className="p-4 font-semibold text-white">{row.topic}</th>
                    <td className="border-l border-zinc-800 p-4 text-zinc-300">{row.ontimer}</td>
                    <td className="border-l border-zinc-800 p-4 text-zinc-400">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h2 className="text-xl font-bold text-white">Sources and methodology</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Competitor facts come from the{" "}
              <a href={comparison.sourceUrl} rel="noopener noreferrer" className="text-green-500 hover:text-green-400">
                {comparison.sourceLabel}
              </a>{" "}
              reviewed on {COMPARISON_REVIEWED_ON}. OnTimer facts come from current product documentation.
              Features and pricing can change; check each product before deciding.
            </p>
          </aside>
        </div>
      </section>

      <section className="site-final">
        <div className="site-shell site-shell--reading">
          <h2>Keep your calendar. Add an alarm layer.</h2>
          <p>OnTimer is free for one calendar provider on iPhone.</p>
          <div className="site-actions site-actions--center">
            <Homepage2DownloadCTA location={`compare_${comparison.slug}`} />
          </div>
          <p className="mt-6"><Link href="/compare">← See every comparison</Link></p>
        </div>
      </section>
    </div>
  );
}
