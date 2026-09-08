import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AirportCalculator from "@/app/airport-time-to-leave-calculator/AirportCalculator";
import { AppStoreButton } from "@/components/CTAButton";
import { localizedAlternates, spanishAirportSlugs } from "@/lib/i18n";
import { getTravelLocation } from "@/lib/travel-locations";
import { isSpanishAirportSlug, spanishAirportCopy } from "@/lib/spanish-airports";

interface SpanishAirportPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return spanishAirportSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SpanishAirportPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getTravelLocation(slug);
  if (!isSpanishAirportSlug(slug) || !location || location.kind !== "airport") {
    return { robots: { index: false, follow: false } };
  }

  const copy = spanishAirportCopy[slug];
  const englishPath = `/airport-time-to-leave/${slug}`;
  const spanishPath = `/es/aeropuerto/${slug}`;
  const canonical = `https://www.ontimer.app${spanishPath}`;
  const title = `¿A qué hora salir hacia ${copy.shortName} (${location.code})?`;
  const description = `Calcula cuándo salir hacia ${location.code} desde tu ubicación. Incluye el trayecto, tráfico, terminal, seguridad, equipaje y tiempo dentro del aeropuerto.`;

  return {
    title,
    description,
    alternates: { canonical, ...localizedAlternates(englishPath, spanishPath) },
    openGraph: { title, description, url: canonical, locale: "es_ES", alternateLocale: ["en_US"] },
    twitter: { title, description },
  };
}

export default async function SpanishAirportPage({ params }: SpanishAirportPageProps) {
  const { slug } = await params;
  const location = getTravelLocation(slug);
  if (!isSpanishAirportSlug(slug) || !location || location.kind !== "airport") notFound();

  const copy = spanishAirportCopy[slug];
  const canonical = `https://www.ontimer.app/es/aeropuerto/${slug}`;
  const faqItems = [
    {
      question: `¿A qué hora debo salir hacia ${copy.shortName} (${location.code})?`,
      answer: copy.directAnswer,
    },
    {
      question: `¿Con cuánta antelación debo llegar a ${location.code}?`,
      answer: "Como referencia inicial, planifica unas dos horas antes de un vuelo nacional y tres antes de uno internacional. Sigue siempre cualquier plazo anterior indicado por tu aerolínea y añade el trayecto y el acceso a la terminal.",
    },
    {
      question: `¿Qué detalle local puede añadir tiempo en ${location.code}?`,
      answer: `${copy.terminalAdvice} ${copy.finalLegAdvice}`,
    },
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `Calculadora de hora de salida hacia ${copy.shortName}`,
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      inLanguage: "es",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: copy.directAnswer,
      url: canonical,
      dateModified: location.reviewedOn,
      author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "es",
      mainEntity: faqItems.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Calculadora para el aeropuerto", item: "https://www.ontimer.app/es/calculadora-cuando-salir-al-aeropuerto" },
        { "@type": "ListItem", position: 2, name: location.code, item: canonical },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script key={`${item["@type"]}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <nav aria-label="Migas de pan" className="border-b border-zinc-800/50">
        <ol className="mx-auto flex max-w-5xl items-center gap-1.5 px-4 py-2.5 text-xs text-zinc-400 sm:px-6">
          <li><Link href="/es/calculadora-cuando-salir-al-aeropuerto" className="hover:text-white">Aeropuertos</Link></li>
          <li aria-hidden="true">›</li>
          <li className="text-zinc-300">{location.code}</li>
        </ol>
      </nav>

      <section className="relative overflow-hidden pb-7 pt-9 md:pb-9 md:pt-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-500">Calculadora gratuita · {location.code} · {copy.city}</p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">¿A qué hora debo salir hacia <span className="text-green-500">{copy.shortName} ({location.code})?</span></h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-300">{copy.directAnswer}</p>
          <p className="mt-3 text-xs text-zinc-500">Información revisada el {new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${location.reviewedOn}T12:00:00Z`))}.</p>
        </div>
      </section>

      <section id="calculadora" className="border-t border-zinc-800 pb-10 pt-5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <AirportCalculator
            initialAirport={location.calculatorDestination}
            locationCode={location.code}
            planningJurisdiction="international"
            shortHaulLabel="Nacional"
            longHaulLabel="Internacional"
            securityLabel="Seguridad del aeropuerto"
            locale="es"
            genericRedesign
          />
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">Qué puede añadir tiempo en {location.code}</h2>
          <p className="mt-4 leading-relaxed text-zinc-400">La hora del vuelo no basta. Para obtener una estimación útil hay que planificar el trayecto completo hasta la puerta de embarque.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Acceso al aeropuerto", copy.airportAccess],
              ["Terminal correcta", copy.terminalAdvice],
              ["Transporte público", copy.transitAdvice],
              ["Último tramo hasta la puerta", copy.finalLegAdvice],
            ].map(([heading, body]) => (
              <article key={heading} className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-5">
                <h3 className="font-bold text-white">{heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
              </article>
            ))}
          </div>
          <aside className="mt-8 border-l-2 border-green-500/60 pl-4 text-sm leading-relaxed text-zinc-400">
            <p className="font-semibold text-zinc-200">Comprueba la información antes de salir</p>
            <p className="mt-2">Los horarios, terminales y condiciones pueden cambiar. Confirma el vuelo, la terminal y los plazos de la aerolínea.</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {location.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">{source.label} ↗</a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">Preguntas sobre la hora de salida para {location.code}</h2>
          <div className="mt-8 divide-y divide-zinc-800">
            {faqItems.map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white"><span>{question}</span><span className="text-green-500 transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white">Otros aeropuertos en español</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {spanishAirportSlugs.filter((item) => item !== slug).map((item) => {
              const related = getTravelLocation(item);
              if (!related || related.kind !== "airport") return null;
              return <Link key={item} href={`/es/aeropuerto/${item}`} className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-4 font-semibold text-zinc-300 hover:border-green-800 hover:text-white">{spanishAirportCopy[item].shortName} <span className="text-green-500">{related.code}</span></Link>;
            })}
          </div>
          <div className="mt-10"><AppStoreButton label="Descargar OnTimer gratis" location={`es_airport_${location.code.toLowerCase()}_final`} analyticsContext={{ content_language: "es", locale: "es", location_code: location.code }} /></div>
        </div>
      </section>
    </>
  );
}
