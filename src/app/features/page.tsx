import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Features | OnTimer Calendar Alarm App for iPhone",
  description:
    "OnTimer is built around one job: making calendar events harder to miss. Connect your calendars and get loud, persistent alarms before every meeting.",
};

const features = [
  {
    number: "01",
    eyebrow: "01 — Calendar Connection",
    headline: "Connect the calendars you actually use",
    description:
      "OnTimer works with your existing calendar setup so you do not have to rebuild your schedule somewhere else. Connect Google and Microsoft calendars, including multiple accounts, and OnTimer uses those events to prepare alarms.",
    bullets: [
      "Works with Google and Microsoft calendars",
      "Supports multiple calendar accounts",
      "Uses your existing event schedule",
      "No need to create separate reminders by hand",
    ],
    image: "/images/ConnectsToCalendars.png",
    imageAlt: "OnTimer calendar connection screen",
    flip: false,
  },
  {
    number: "02",
    eyebrow: "02 — Automatic Event Alarms",
    headline: "Prepare alarms automatically",
    description:
      "Once OnTimer is connected, upcoming meetings, calls, and appointments can be turned into alarms automatically based on your settings.",
    bullets: [
      "Alarms created from calendar events",
      "Adjustable lead times",
      "Updates when your schedule changes",
      "Less manual reminder setup",
    ],
    image: "/images/AutomaticAlarms.png",
    imageAlt: "OnTimer automatic alarms screen",
    flip: true,
  },
  {
    number: "03",
    eyebrow: "03 — Persistent Alerts",
    headline: "Get alerts that are harder to ignore",
    description:
      "Standard calendar reminders are easy to miss. OnTimer is designed to create a louder, more persistent signal when it is time to pay attention.",
    bullets: [
      "Loud, visible alerts",
      "Persistent alarm behavior",
      "Event details included in the alert",
      "Better for high-consequence meetings and appointments",
    ],
    image: "/images/CantMissAlerts.png",
    imageAlt: "OnTimer persistent alerts screen",
    flip: false,
  },
  {
    number: "04",
    eyebrow: "04 — Flexible Control",
    headline: "Choose what should trigger alarms",
    description:
      "Different schedules need different rules. OnTimer gives you control over timing and calendar behavior without making setup complicated.",
    bullets: [
      "Choose alarm lead times",
      "Control which calendars matter",
      "Use business-hours filtering",
      "Handle recurring events more cleanly",
    ],
    image: "/images/YoureInControl.png",
    imageAlt: "OnTimer customization screen",
    flip: true,
  },
  {
    number: "05",
    eyebrow: "05 — Time To Leave",
    headline: "Know when it is time to head out",
    description:
      "For calendar events with a location, Time To Leave can alert you when it is time to leave based on travel time and traffic. This is a paid feature.",
    bullets: [
      "Uses event location data",
      "Factors in travel time and traffic",
      "Useful for appointments and in-person meetings",
      "Premium feature",
    ],
    image: "/images/RelaxYourOnTime.png",
    imageAlt: "OnTimer Time To Leave screen",
    flip: false,
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-800 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Features built to help you{" "}
            <span className="text-green-500">show up on time</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            OnTimer is built around one job: making calendar events harder to
            miss.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>

      {/* Feature sections */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-24">
            {features.map((feature) => (
              <div
                key={feature.number}
                className={`flex flex-col items-center gap-12 lg:flex-row ${feature.flip ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Screenshot */}
                <div className="relative flex-shrink-0">
                  <div className="relative h-[520px] w-[240px] overflow-hidden rounded-[2rem] border border-zinc-700 shadow-2xl shadow-green-500/5">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="pointer-events-none absolute -inset-6 rounded-full bg-green-500/5 blur-3xl" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-500">
                    {feature.eyebrow}
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                    {feature.headline}
                  </h2>
                  <p className="mt-4 text-lg text-zinc-400">
                    {feature.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 text-green-500">
                          ✓
                        </span>
                        <span className="text-zinc-300">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-green-500">
            Free Tools
          </p>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="text-5xl">✈️</div>
              <div className="flex-1">
                <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Airport Time-to-Leave Calculator
                </h2>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  Estimate exactly when to leave for the airport based on traffic,
                  security time, bags, and how you&apos;re getting there. Free, no
                  account required.
                </p>
                <Link
                  href="/airport-time-to-leave-calculator"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-500 hover:text-green-400 transition-colors"
                >
                  Try the calculator →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 py-24 text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white">
            Ready to stop missing meetings?
          </h2>
          <p className="mt-4 text-zinc-400">
            Download OnTimer for free and get more reliable alerts from your
            calendar.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
