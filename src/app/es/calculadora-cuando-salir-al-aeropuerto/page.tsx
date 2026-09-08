import type { Metadata } from "next";
import Link from "next/link";
import AirportCalculator from "@/app/airport-time-to-leave-calculator/AirportCalculator";
import { AppStoreButton } from "@/components/CTAButton";
import type { AirportAutocompleteOption } from "@/lib/airport-autocomplete";
import { localizedAlternates } from "@/lib/i18n";
import { indexableTravelLocations } from "@/lib/travel-locations";

const englishPath = "/airport-time-to-leave-calculator";
const spanishPath = "/es/calculadora-cuando-salir-al-aeropuerto";
const canonical = `https://www.ontimer.app${spanishPath}`;

const airportOptions: AirportAutocompleteOption[] = indexableTravelLocations
  .filter((location) => location.kind === "airport")
  .map((location) => ({
    code: location.code,
    name: location.name,
    city: location.city,
    aliases: [location.shortName, ...(location.aliases ?? [])],
    planningJurisdiction: location.airport.planningJurisdiction ?? "us",
  }));

export const metadata: Metadata = {
  title: "¿Cuándo debo salir hacia el aeropuerto? Calculadora",
  description: "Calcula a qué hora salir hacia el aeropuerto según tu vuelo, trayecto, tráfico, seguridad, equipaje, aparcamiento y acceso a la terminal.",
  alternates: { canonical, ...localizedAlternates(englishPath, spanishPath) },
  openGraph: {
    title: "¿Cuándo debo salir hacia el aeropuerto?",
    description: "Calcula una hora de salida personalizada para llegar al aeropuerto con margen.",
    url: canonical,
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
  twitter: {
    title: "¿Cuándo debo salir hacia el aeropuerto?",
    description: "Calcula una hora de salida personalizada para llegar al aeropuerto con margen.",
  },
};

const faqItems = [
  {
    question: "¿Cuándo debería salir hacia el aeropuerto?",
    answer: "Depende de la hora del vuelo, el trayecto, el tráfico previsto, el control de seguridad, el equipaje, el aparcamiento y el acceso a la terminal. La calculadora combina estos datos para trabajar hacia atrás desde la salida del vuelo.",
  },
  {
    question: "¿Con cuánta antelación debo llegar?",
    answer: "Como punto de partida habitual, muchas personas planifican llegar unas dos horas antes de un vuelo nacional y tres horas antes de uno internacional. Los plazos de tu aerolínea y los requisitos del aeropuerto siempre tienen prioridad.",
  },
  {
    question: "¿La calculadora sirve para aeropuertos fuera de Estados Unidos?",
    answer: "Sí. Puedes buscar aeropuertos por nombre o código IATA. Para aeropuertos internacionales, la calculadora utiliza términos generales de seguridad y oculta opciones exclusivas de Estados Unidos.",
  },
  {
    question: "¿Incluye el tráfico y el transporte público?",
    answer: "Puedes calcular el trayecto en coche o transporte público. Cuando hay datos disponibles, OnTimer usa una estimación para la hora prevista; también puedes introducir el tiempo manualmente.",
  },
  {
    question: "¿OnTimer garantiza que llegaré a tiempo?",
    answer: "No. Es una estimación para ayudarte a planificar. El tráfico, la seguridad y las operaciones del aeropuerto pueden cambiar. Comprueba siempre el vuelo, los plazos de la aerolínea y las condiciones actuales antes de salir.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calculadora de hora de salida hacia el aeropuerto",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    inLanguage: "es",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Calculadora gratuita para saber a qué hora salir hacia el aeropuerto según el vuelo, el trayecto y los tiempos dentro del aeropuerto.",
    url: canonical,
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
      { "@type": "ListItem", position: 1, name: "OnTimer", item: `https://www.ontimer.app${spanishPath}` },
      { "@type": "ListItem", position: 2, name: "Calculadora para el aeropuerto", item: canonical },
    ],
  },
];

export default function SpanishAirportCalculatorPage() {
  return (
    <>
      {structuredData.map((item, index) => (
        <script key={`${item["@type"]}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <nav aria-label="Migas de pan" className="border-b border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 py-2.5 text-xs text-zinc-400 sm:px-6">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/es/calculadora-a-que-hora-salir" className="hover:text-white">OnTimer</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-zinc-300">Calculadora para el aeropuerto</li>
          </ol>
        </div>
      </nav>

      <section className="relative overflow-hidden pb-6 pt-8 md:pb-8 md:pt-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-500 sm:text-sm">Planificador gratuito · Sin registro</p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">¿A qué hora debo salir para <span className="text-green-500">llegar a mi vuelo?</span></h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">Introduce la hora del vuelo, el punto de partida y el aeropuerto. OnTimer calcula una hora de salida con el trayecto, la seguridad, el equipaje, el aparcamiento y el acceso a la terminal.</p>
        </div>
      </section>

      <section id="calculadora" className="border-t border-zinc-800 pb-10 pt-5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <AirportCalculator
            genericRedesign
            airportOptions={airportOptions}
            locale="es"
            planningJurisdiction="international"
            shortHaulLabel="Nacional"
            longHaulLabel="Internacional"
            securityLabel="Seguridad del aeropuerto"
          />
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Calcula todo el trayecto, no solo la llegada</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>La conocida recomendación de llegar con dos o tres horas de antelación solo cubre el tiempo dentro del aeropuerto. Aún tienes que restar el viaje desde tu ubicación, el aparcamiento o traslado, y un margen para cambios inesperados.</p>
            <p>Dos personas en el mismo vuelo pueden necesitar horas de salida distintas. Una puede llegar en tren sin equipaje facturado; otra puede conducir durante la hora punta y aparcar lejos de la terminal. Esta calculadora adapta la estimación a esos datos.</p>
          </div>
          <aside className="mt-8 border-l-2 border-green-500/60 pl-4 text-sm leading-relaxed text-zinc-400">
            <p className="font-semibold text-zinc-200">Es una estimación, no una garantía</p>
            <p className="mt-2">Los plazos de facturación, entrega de equipaje y embarque de tu aerolínea siempre tienen prioridad. Comprueba el vuelo y las condiciones del aeropuerto y de la ruta antes de salir.</p>
          </aside>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">Preguntas frecuentes</h2>
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

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Guarda la hora de salida. Recibe una alarma cuando toque salir.</h2>
          <p className="mt-4 text-zinc-400">OnTimer crea alarmas automáticas y persistentes para los eventos de tu calendario.</p>
          <div className="mt-8"><AppStoreButton label="Descargar OnTimer gratis" size="lg" location="es_airport_calculator_final" analyticsContext={{ content_language: "es", locale: "es" }} /></div>
        </div>
      </section>
    </>
  );
}
