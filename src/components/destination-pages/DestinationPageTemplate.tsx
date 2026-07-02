import Link from "next/link";
import LocationSectionTracker from "@/components/LocationSectionTracker";
import { AppStoreCTA } from "@/components/CTAButton";
import type { FaqItem, InternalLinkDefinition } from "@/core/leave-time";
import type { CalculatorExample, ContentModule, SourceLink, WorkedExample } from "@/lib/travel-locations";

export interface DestinationPageModel {
  trackerCode: string;
  jsonLd: Record<string, unknown>[];
  breadcrumbs: InternalLinkDefinition[];
  currentBreadcrumbLabel: string;
  hero: {
    eyebrow: string;
    secondaryLabels: string[];
    titlePrefix: string;
    titleHighlight: string;
    description: string;
  };
  planner: React.ReactNode;
  planningFacts: {
    sectionId: string;
    heading: string;
    intro: string;
    caution: string;
    modules: ContentModule[];
  };
  workedExamples: {
    heading: string;
    intro: string;
    examples: WorkedExample[];
    note: string;
  };
  sources: {
    heading: string;
    body: string[];
    sourceHeading: string;
    sourceIntro: string;
    links: SourceLink[];
  };
  relatedDestinations?: {
    heading: string;
    links: InternalLinkDefinition[];
  };
  faq: {
    heading: string;
    items: FaqItem[];
    ctaLocation: string;
  };
  calculatorExample?: CalculatorExample;
}

export default function DestinationPageTemplate({ model }: { model: DestinationPageModel }) {
  return (
    <>
      <LocationSectionTracker locationCode={model.trackerCode} />
      {model.jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

      <nav aria-label="Breadcrumb" className="border-b border-zinc-800/50 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-2.5 sm:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
            {model.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.href} className="contents">
                <Link href={breadcrumb.href} className="hover:text-zinc-200">
                  {breadcrumb.label}
                </Link>
                <span aria-hidden="true">›</span>
              </li>
            ))}
            <li className="text-zinc-300">{model.currentBreadcrumbLabel}</li>
          </ol>
        </div>
      </nav>

      <section className="relative overflow-hidden pb-5 pt-6 md:pt-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-500">
              {model.hero.eyebrow}
            </p>
            {model.hero.secondaryLabels.map((label) => (
              <p key={label} className="text-xs text-zinc-500">{label}</p>
            ))}
          </div>
          <h1 className="mt-2 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
            {model.hero.titlePrefix}{" "}
            <span className="text-green-500">{model.hero.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">
            {model.hero.description}
          </p>
        </div>
      </section>

      <section
        id="calculator"
        data-location-section="calculator"
        className="border-t border-zinc-800 pb-8 pt-4"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {model.planner}
        </div>
      </section>

      <section
        data-location-section={model.planningFacts.sectionId}
        className="border-t border-zinc-800 bg-zinc-900/50 py-14"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="max-w-3xl text-3xl font-black tracking-tight text-white">
            {model.planningFacts.heading}
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
            {model.planningFacts.intro}
          </p>
          <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
            {model.planningFacts.caution}
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {model.planningFacts.modules.map((module) => (
              <article key={module.title} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-6">
                <h3 className="text-xl font-bold text-white">{module.title}</h3>
                <ul className="mt-5 space-y-4">
                  {module.facts.map((fact) => (
                    <li key={fact} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-green-500" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-location-section="worked-examples" className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            {model.workedExamples.heading}
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
            {model.workedExamples.intro}
          </p>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {model.workedExamples.examples.map((example) => (
              <article key={example.title} className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-sm font-semibold text-green-500">{example.title}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{example.subtitle}</h3>
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Assumptions
                  </p>
                  <ul className="mt-2 space-y-2">
                    {example.assumptions.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-zinc-400">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 border-t border-zinc-800 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Work backward
                  </p>
                  <ol className="mt-2 space-y-2">
                    {example.calculation.map((item) => (
                      <li key={item} className="text-sm text-zinc-300">{item}</li>
                    ))}
                  </ol>
                </div>
                <p className="mt-5 border-t border-zinc-800 pt-5 text-lg font-bold text-white">
                  {example.result}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            {model.workedExamples.note}
          </p>
        </div>
      </section>

      <section
        data-location-section="official-sources"
        className="border-y border-zinc-800 bg-zinc-900/50 py-14"
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-black text-white">
              {model.sources.heading}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-zinc-300">
              {model.sources.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">{model.sources.sourceHeading}</h2>
            <p className="mt-3 text-sm text-zinc-400">
              {model.sources.sourceIntro}
            </p>
            <ul className="mt-5 space-y-3">
              {model.sources.links.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400"
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {model.relatedDestinations && model.relatedDestinations.links.length > 0 && (
        <section data-location-section="related-destinations" className="border-b border-zinc-800 py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-black text-white">{model.relatedDestinations.heading}</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {model.relatedDestinations.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section data-location-section="faq" className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            {model.faq.heading}
          </h2>
          <div className="mt-7 divide-y divide-zinc-800 border-y border-zinc-800">
            {model.faq.items.map(({ question, answer }) => (
              <div key={question} className="py-6">
                <h3 className="text-lg font-bold text-white">{question}</h3>
                <p className="mt-2 leading-relaxed text-zinc-400">{answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <AppStoreCTA location={model.faq.ctaLocation} />
          </div>
        </div>
      </section>
    </>
  );
}
