import type { Metadata } from "next";
import Link from "next/link";
import WakeUpCalculator from "@/app/wake-up-time-calculator/WakeUpCalculator";
import { AppStoreButton } from "@/components/CTAButton";
import { localizedAlternates } from "@/lib/i18n";

const englishPath = "/wake-up-time-calculator";
const spanishPath = "/es/calculadora-hora-de-despertar";
const canonical = `https://www.ontimer.app${spanishPath}`;

export const metadata: Metadata = {
  title: "Calculadora de hora de despertar: ¿a qué hora levantarme?",
  description:
    "Calcula a qué hora despertarte según la hora de llegada, el trayecto, el tiempo para prepararte y un margen para imprevistos.",
  alternates: { canonical, ...localizedAlternates(englishPath, spanishPath) },
  openGraph: {
    title: "Calculadora de hora de despertar",
    description:
      "Trabaja hacia atrás desde la hora de llegada para saber cuándo despertarte y salir sin prisas.",
    url: canonical,
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
  twitter: {
    title: "Calculadora de hora de despertar",
    description:
      "Calcula cuándo despertarte según tu trayecto, tu rutina y la hora de llegada.",
  },
};

const faqItems = [
  {
    question: "¿Cómo calculo a qué hora debo despertarme?",
    answer:
      "Empieza por la hora a la que necesitas llegar. Resta el tiempo de viaje, el tiempo que necesitas para prepararte y un margen para pequeños retrasos. La hora resultante es la última hora razonable para despertarte.",
  },
  {
    question: "¿Cuánto tiempo debería reservar para prepararme?",
    answer:
      "Depende de tu rutina real. Elige el tiempo que normalmente tardas en ducharte, vestirte, desayunar y reunir lo que necesitas, no el tiempo ideal de una mañana sin contratiempos.",
  },
  {
    question: "¿Conviene añadir un margen adicional?",
    answer:
      "Sí. Diez minutos pueden absorber retrasos pequeños como buscar las llaves, preparar una bolsa o encontrar más tráfico de lo previsto. Aumenta el margen cuando llegar tarde tenga consecuencias importantes.",
  },
  {
    question: "¿Qué hago si no conozco el tiempo de viaje?",
    answer:
      "Indica el punto de partida y el destino para solicitar una estimación del trayecto. También puedes introducir manualmente los minutos de viaje.",
  },
  {
    question: "¿OnTimer sustituye la alarma para despertarme?",
    answer:
      "No. Usa tu alarma habitual para despertarte. OnTimer puede convertir el evento de llegada en una alarma automática del calendario y avisarte cuando llegue el momento de actuar o salir.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calculadora de hora de despertar",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    inLanguage: "es",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Calculadora gratuita para saber a qué hora despertarte según la hora de llegada, el trayecto, tu rutina y un margen personal.",
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
      { "@type": "ListItem", position: 1, name: "OnTimer", item: "https://www.ontimer.app" },
      { "@type": "ListItem", position: 2, name: "Calculadora de hora de despertar", item: canonical },
    ],
  },
];

export default function SpanishWakeUpCalculatorPage() {
  return (
    <>
      {structuredData.map((item, index) => (
        <script
          key={`${item["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

      <nav aria-label="Migas de pan" className="border-b border-zinc-800/50">
        <ol className="mx-auto flex max-w-3xl items-center gap-1.5 px-4 py-2.5 text-xs text-zinc-400 sm:px-6">
          <li><Link href={spanishPath} className="hover:text-white">OnTimer</Link></li>
          <li aria-hidden="true">›</li>
          <li className="text-zinc-300">Calculadora de hora de despertar</li>
        </ol>
      </nav>

      <section className="relative overflow-hidden pb-8 pt-10 md:pb-10 md:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-500 sm:text-sm">Calculadora gratuita · Sin registro</p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">¿A qué hora debo <span className="text-green-500">despertarme?</span></h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">Indica cuándo necesitas llegar, cuánto tardas en prepararte y el tiempo de viaje. La calculadora trabaja hacia atrás para darte una hora concreta de despertar.</p>
        </div>
      </section>

      <section id="calculadora" className="border-t border-zinc-800 pb-10 pt-5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6"><WakeUpCalculator locale="es" /></div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Planifica la mañana completa</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>La hora de despertar depende de más que el trayecto. Incluye el tiempo que realmente necesitas para prepararte, desayunar, reunir tus cosas y salir de casa.</p>
            <p>La estimación del tráfico puede cambiar. Comprueba las condiciones actuales antes de salir y sigue cualquier horario oficial de tu cita, vuelo o destino.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link href="/es/calculadora-a-que-hora-salir" className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 hover:border-green-800">
              <h3 className="font-bold text-white">¿Ya estás preparado?</h3>
              <p className="mt-2 text-sm text-zinc-400">Calcula directamente a qué hora debes salir.</p>
            </Link>
            <Link href="/es/calculadora-cuando-salir-al-aeropuerto" className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 hover:border-green-800">
              <h3 className="font-bold text-white">¿Vas a tomar un vuelo?</h3>
              <p className="mt-2 text-sm text-zinc-400">Incluye seguridad, equipaje y acceso a la terminal.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">Preguntas frecuentes</h2>
          <div className="mt-8 divide-y divide-zinc-800">
            {faqItems.map(({ question, answer }, index) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white"><span>{question}</span><span className="text-green-500 transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400" data-nosnippet={index === 0 || undefined}>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Calcula cuándo despertarte. Recibe una alarma cuando llegue el momento de actuar.</h2>
          <p className="mt-4 text-zinc-400">OnTimer convierte los eventos de tu calendario en alarmas automáticas y persistentes. No sustituye tu despertador.</p>
          <div className="mt-8"><AppStoreButton label="Descargar OnTimer gratis" size="lg" location="es_wakeup_calculator_final" analyticsContext={{ content_language: "es", locale: "es" }} /></div>
        </div>
      </section>
    </>
  );
}
