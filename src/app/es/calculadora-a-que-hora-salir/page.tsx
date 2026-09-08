import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";
import { localizedAlternates } from "@/lib/i18n";
import LeaveTimeCalculator from "@/app/what-time-should-i-leave/LeaveTimeCalculator";

const englishPath = "/what-time-should-i-leave";
const spanishPath = "/es/calculadora-a-que-hora-salir";
const canonical = `https://www.ontimer.app${spanishPath}`;

export const metadata: Metadata = {
  title: "¿A qué hora debo salir? Calculadora gratuita",
  description: "Calcula a qué hora debes salir según tu hora de llegada, el trayecto, el tráfico y el margen que prefieres. Gratis y sin registro.",
  alternates: { canonical, ...localizedAlternates(englishPath, spanishPath) },
  openGraph: {
    title: "¿A qué hora debo salir? Calculadora gratuita",
    description: "Calcula una hora de salida realista a partir de tu destino, el tráfico y tu hora de llegada.",
    url: canonical,
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
  twitter: {
    title: "¿A qué hora debo salir? Calculadora gratuita",
    description: "Calcula una hora de salida realista a partir de tu destino, el tráfico y tu hora de llegada.",
  },
};

const faqItems = [
  {
    question: "¿Cómo calculo a qué hora debo salir?",
    answer: "Empieza por la hora a la que necesitas llegar. Resta el tiempo de viaje, un margen para imprevistos y el tiempo necesario para aparcar o entrar. El resultado es la última hora razonable para salir.",
  },
  {
    question: "¿Cuánto margen debería añadir?",
    answer: "Diez minutos suelen cubrir retrasos pequeños. Para una cita importante, una entrevista o un viaje con conexiones, puede ser prudente añadir entre 15 y 20 minutos.",
  },
  {
    question: "¿La calculadora tiene en cuenta el tráfico?",
    answer: "Sí. Si indicas el punto de partida y el destino, la calculadora solicita una estimación del trayecto para la hora prevista. También puedes introducir el tiempo de viaje manualmente.",
  },
  {
    question: "¿Puedo guardar la hora de salida en mi calendario?",
    answer: "Sí. El resultado se puede añadir a Google Calendar, Apple Calendar, Outlook y otros calendarios. OnTimer puede convertir después ese evento en una alarma automática.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calculadora de hora de salida",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    inLanguage: "es",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Calculadora gratuita para saber a qué hora salir según la hora de llegada, el trayecto y un margen personal.",
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
];

export default function SpanishLeaveTimeCalculatorPage() {
  return (
    <>
      {structuredData.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <nav aria-label="Migas de pan" className="border-b border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 py-2.5 text-xs text-zinc-400 sm:px-6">
          <ol className="flex items-center gap-1.5">
            <li><Link href={spanishPath} className="hover:text-white">OnTimer</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-zinc-300">Calculadora de hora de salida</li>
          </ol>
        </div>
      </nav>

      <section className="relative overflow-hidden pb-8 pt-10 md:pb-10 md:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-500 sm:text-sm">Calculadora gratuita · Sin registro</p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">¿A qué hora <span className="text-green-500">debo salir?</span></h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">Indica cuándo necesitas llegar. OnTimer calcula una hora de salida realista con el trayecto, el tráfico, el margen que prefieres y el tiempo para aparcar o entrar.</p>
        </div>
      </section>

      <section id="calculadora" className="border-t border-zinc-800 pb-10 pt-5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6"><LeaveTimeCalculator locale="es" /></div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Una respuesta práctica, no una promesa</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>La forma más segura de planificar es trabajar hacia atrás desde la hora de llegada. El tiempo de viaje es solo una parte: también cuentan el aparcamiento, la entrada al edificio y los pequeños retrasos que aparecen justo antes de salir.</p>
            <p>La estimación del tráfico puede cambiar. Comprueba las condiciones actuales antes de salir y sigue siempre cualquier horario o requisito oficial de tu cita, transporte o destino.</p>
          </div>
          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
            <h3 className="font-bold text-white">¿Vas a tomar un vuelo?</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">La planificación para un aeropuerto incluye seguridad, equipaje, aparcamiento y acceso a la terminal.</p>
            <Link href="/es/calculadora-cuando-salir-al-aeropuerto" className="mt-4 inline-flex font-semibold text-green-500 hover:text-green-400">Usar la calculadora para el aeropuerto →</Link>
          </div>
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
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Calcula cuándo salir. Recibe una alarma cuando llegue el momento.</h2>
          <p className="mt-4 text-zinc-400">OnTimer convierte los eventos de tu calendario en alarmas automáticas y persistentes.</p>
          <div className="mt-8"><AppStoreButton label="Descargar OnTimer gratis" size="lg" location="es_leave_calculator_final" analyticsContext={{ content_language: "es", locale: "es" }} /></div>
        </div>
      </section>
    </>
  );
}
