import type { Metadata } from "next";
import Image from "next/image";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how OnTimer automatically connects to your calendar, creates smart alarms, and makes sure you're never late again.",
};

const steps = [
  {
    number: "01",
    title: "Download and open OnTimer",
    description:
      "OnTimer is free on the App Store. Open it and you'll be guided through a quick one-time setup that takes less than two minutes. No account required — it works right off your device.",
    image: "/images/NeverBeLateAgain.png",
    imageAlt: "OnTimer welcome screen",
  },
  {
    number: "02",
    title: "Connect your calendar",
    description:
      "OnTimer requests access to your iPhone calendar. This is a read-only connection — OnTimer never modifies your calendar or syncs your data anywhere. It simply reads upcoming events to know when your alarms should fire.",
    image: "/images/ConnectsToCalendars.png",
    imageAlt: "Calendar connection screen",
  },
  {
    number: "03",
    title: "Choose your lead time",
    description:
      "Tell OnTimer how much advance notice you need. Want 30 minutes before every meeting? Done. Prefer 15 minutes for shorter events and an hour for appointments across town? You can configure that too.",
    image: "/images/YoureInControl.png",
    imageAlt: "Lead time configuration screen",
  },
  {
    number: "04",
    title: "OnTimer creates your alarms",
    description:
      "With your preferences set, OnTimer automatically generates alarms for every relevant event on your calendar. As events are added, changed, or cancelled, your alarms update automatically — with zero effort from you.",
    image: "/images/AutomaticAlarms.png",
    imageAlt: "Automatic alarms screen",
  },
  {
    number: "05",
    title: "Alarm fires. You leave. You're on time.",
    description:
      "When it's time to go, OnTimer fires a clear, can't-miss alert with all the event details. You know exactly where you're going, when you're going, and that you're going to make it. Breathe. You've got this.",
    image: "/images/RelaxYourOnTime.png",
    imageAlt: "Relax, you're on time screen",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-800 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Simple by design.{" "}
            <span className="text-green-500">Powerful by default.</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            OnTimer does the work so you don't have to. Here's exactly how it
            turns your calendar into a punctuality machine.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-20">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`flex flex-col items-center gap-12 lg:flex-row ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Screenshot */}
                <div className="relative flex-shrink-0">
                  <div className="relative h-[500px] w-[230px] overflow-hidden rounded-[2rem] border border-zinc-700 shadow-2xl shadow-green-500/5">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">
                      {parseInt(step.number)}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-widest text-green-500">
                      Step {step.number}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                    {step.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Still have questions?
          </h2>
          <p className="mt-3 text-zinc-400">
            Check out our FAQ for answers to the most common questions about
            OnTimer.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/faq"
              className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              Read the FAQ
            </a>
            <AppStoreButton size="md" />
          </div>
        </div>
      </section>
    </>
  );
}
