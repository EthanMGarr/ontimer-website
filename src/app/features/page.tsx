import type { Metadata } from "next";
import Image from "next/image";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore every feature that makes OnTimer the smartest way to never be late — automatic alarms, calendar sync, smart alerts, and more.",
};

const features = [
  {
    number: "01",
    title: "Calendar Integration",
    headline: "Your calendar already knows your schedule.",
    description:
      "OnTimer connects directly to your native iPhone calendar. It reads every event with a time — meetings, doctor appointments, flights, gym sessions — and builds your alarm schedule automatically. You never have to manually enter an event.",
    bullets: [
      "Reads all calendar events automatically",
      "Works with iCloud, Google Calendar, Outlook, and more",
      "Syncs in real time as your calendar updates",
      "No duplicate data entry, ever",
    ],
    image: "/images/ConnectsToCalendars.png",
    imageAlt: "OnTimer calendar connection screen",
    flip: false,
  },
  {
    number: "02",
    title: "Automatic Alarms",
    headline: "Set it once. Forget about being late forever.",
    description:
      "Once OnTimer knows your events, it creates alarms automatically — no tapping, no scheduling. Choose your default lead time and OnTimer handles the rest. You wake up to exactly the right alarm at exactly the right time.",
    bullets: [
      "Alarms created automatically for every event",
      "Customizable lead times (15 min, 30 min, 1 hour, etc.)",
      "Alarms update when events change",
      "No alarm fatigue — only relevant events get alarms",
    ],
    image: "/images/AutomaticAlarms.png",
    imageAlt: "OnTimer automatic alarms screen",
    flip: true,
  },
  {
    number: "03",
    title: "Can't-Miss Alerts",
    headline: "An alarm that actually works.",
    description:
      "Most alarm apps let you dismiss and forget. OnTimer's alerts are designed to get your attention and keep it. Escalating notifications ensure you know it's time to go — even if you're deep in focus mode.",
    bullets: [
      "Escalating alert system for critical events",
      "Rich notifications with event details",
      "Works with Focus modes and Do Not Disturb",
      "Persistent reminders until you acknowledge",
    ],
    image: "/images/CantMissAlerts.png",
    imageAlt: "OnTimer can't-miss alerts screen",
    flip: false,
  },
  {
    number: "04",
    title: "You're In Control",
    headline: "Smart defaults. Endless customization.",
    description:
      "Every person's schedule is different. OnTimer gives you the controls to make it your own — choose which calendars get alarms, set custom lead times per event type, and snooze with confidence knowing OnTimer has your back.",
    bullets: [
      "Per-calendar alarm settings",
      "Custom lead times per event",
      "Snooze that re-alerts before you're truly late",
      "Mute individual events when needed",
    ],
    image: "/images/YoureInControl.png",
    imageAlt: "OnTimer customization screen",
    flip: true,
  },
  {
    number: "05",
    title: "Relax, You're On Time",
    headline: "Less anxiety. More presence.",
    description:
      "When you know OnTimer has your schedule covered, you stop clock-watching. You can be fully present in whatever you're doing, knowing that an alarm will fire when it's actually time to leave — not a second too early, not a second too late.",
    bullets: [
      "Reduces time-anxiety throughout the day",
      "Clean, distraction-free interface",
      "Quick glance status of upcoming events",
      "Peace of mind built in",
    ],
    image: "/images/RelaxYourOnTime.png",
    imageAlt: "OnTimer relax screen",
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
            Everything you need to{" "}
            <span className="text-green-500">show up on time</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            OnTimer isn't just another alarm app. It's a complete punctuality
            system built around your real life.
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
                    {feature.number} — {feature.title}
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

      {/* CTA */}
      <section className="border-t border-zinc-800 py-24 text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white">
            Ready to stop being late?
          </h2>
          <p className="mt-4 text-zinc-400">
            Download OnTimer for free and be on time to everything.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
