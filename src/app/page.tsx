import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "OnTimer — Never Be Late Again",
  description:
    "OnTimer connects to your calendar and automatically sets alarms so you always leave on time. Download free on the App Store.",
};

const features = [
  {
    icon: "📅",
    title: "Calendar Connected",
    description:
      "Syncs with your iPhone calendar so it always knows what's next on your schedule.",
    image: "/images/ConnectsToCalendars.png",
  },
  {
    icon: "⏰",
    title: "Automatic Alarms",
    description:
      "Sets smart alarms based on your events — no manual setup needed, ever.",
    image: "/images/AutomaticAlarms.png",
  },
  {
    icon: "🔔",
    title: "Can't-Miss Alerts",
    description:
      "Escalating alerts ensure you'll never sleep through an important commitment.",
    image: "/images/CantMissAlerts.png",
  },
  {
    icon: "🎛️",
    title: "You're In Control",
    description:
      "Customize lead times, snooze settings, and which events get alarms.",
    image: "/images/YoureInControl.png",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OnTimer",
  operatingSystem: "iOS",
  applicationCategory: "ProductivityApplication",
  url: "https://ontimer.app",
  downloadUrl:
    "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601",
  description:
    "OnTimer connects to your calendar and automatically sets alarms based on your events — so you always leave on time, without thinking about it.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center">
            {/* Hero text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Available on the App Store
              </div>
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Never Be{" "}
                <span className="text-green-500">Late Again</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-zinc-400 lg:text-xl">
                OnTimer connects to your calendar and automatically sets alarms
                based on your events — so you always leave on time, without
                thinking about it.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <AppStoreButton size="lg" />
                <AndroidWaitlistButton size="lg" />
              </div>
              <p className="mt-4 text-xs text-zinc-500">
                Free download · iOS 16+ · No subscription required
              </p>
            </div>

            {/* Hero screenshots */}
            <div className="relative flex-shrink-0">
              <div className="relative flex gap-4">
                <div className="relative mt-8 h-[480px] w-[220px] overflow-hidden rounded-[2rem] border border-zinc-700 shadow-2xl shadow-green-500/10">
                  <Image
                    src="/images/NeverBeLateAgain.png"
                    alt="OnTimer — Never Be Late Again"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative h-[480px] w-[220px] overflow-hidden rounded-[2rem] border border-zinc-700 shadow-2xl shadow-green-500/10">
                  <Image
                    src="/images/RelaxYourOnTime.png"
                    alt="OnTimer — Relax, You're On Time"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Glow effect */}
              <div className="pointer-events-none absolute -inset-4 rounded-full bg-green-500/5 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-zinc-800 bg-zinc-900/50 py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { stat: "5★", label: "App Store Rating" },
              { stat: "iOS 16+", label: "Compatible" },
              { stat: "Free", label: "Download" },
              { stat: "0 Setup", label: "Required" },
            ].map((item) => (
              <div key={item.label} className="px-4">
                <p className="text-2xl font-bold text-green-500">{item.stat}</p>
                <p className="text-sm text-zinc-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features overview */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Built for people who{" "}
              <span className="text-green-500">hate being late</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              OnTimer removes every excuse. Your calendar knows where you need
              to be — OnTimer makes sure you get there.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-green-500/40 hover:bg-zinc-800/50"
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/features"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              See all features →
            </Link>
          </div>
        </div>
      </section>

      {/* Screenshots showcase */}
      <section className="overflow-hidden bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Calm, clear, on time
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              A beautiful interface designed to reduce stress, not add to it.
            </p>
          </div>

          <div className="flex justify-center gap-4 overflow-x-auto pb-4">
            {[
              {
                src: "/images/CantMissAlerts.png",
                alt: "Can't-miss alerts",
              },
              {
                src: "/images/ConnectsToCalendars.png",
                alt: "Connects to your calendar",
              },
              {
                src: "/images/AutomaticAlarms.png",
                alt: "Automatic alarms",
              },
              {
                src: "/images/YoureInControl.png",
                alt: "You're in control",
              },
            ].map((shot) => (
              <div
                key={shot.alt}
                className="relative h-[440px] w-[200px] flex-shrink-0 overflow-hidden rounded-[1.75rem] border border-zinc-700 shadow-xl"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works teaser */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Works in{" "}
              <span className="text-green-500">3 simple steps</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Connect your calendar",
                description:
                  "OnTimer reads your upcoming events — meetings, appointments, anything with a time.",
              },
              {
                step: "02",
                title: "We set the alarms",
                description:
                  "Based on your schedule, OnTimer automatically creates alarms with your chosen lead time.",
              },
              {
                step: "03",
                title: "Relax. You're on time.",
                description:
                  "Your alarm goes off. You leave. You arrive on time. No stress, no scrambling.",
              },
            ].map((item) => (
              <div key={item.step} className="relative pl-6">
                <div className="mb-3 text-5xl font-black text-green-500/20">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stop running late. Start today.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer for free and never miss another meeting, flight, or
            appointment.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreButton size="lg" />
            <AndroidWaitlistButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
