import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how OnTimer automatically connects to your calendar, creates smart alarms, and makes sure you're never late again.",
  alternates: { canonical: "https://www.ontimer.app/how-it-works" },
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
    title: "Connect your calendars",
    description:
      "Connect Google Calendar, Apple Calendar, or Outlook Calendar. OnTimer uses read-only calendar access, never modifies your events, and never asks you to rebuild your schedule. It simply reads upcoming events to know when your alarms should fire.",
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
    <div className="site-page">
      <section className="site-hero">
        <div className="site-shell site-hero__content site-hero__content--center">
          <p className="site-kicker">How OnTimer works</p>
          <h1 className="site-title">Simple by design. Powerful by default.</h1>
          <p className="site-lede">
            OnTimer does the work so you don't have to. Here's exactly how it
            turns your calendar into a punctuality machine.
          </p>
        </div>
      </section>

      <section className="site-context">
        <div className="site-shell site-shell--reading">
          <p className="site-kicker">What this fixes</p>
          <p>
            The problem with most reminder systems is not that people forget
            about meetings. It&apos;s that they fail to{" "}
            <em>switch modes at the right time</em> — to stop what they&apos;re
            doing, wrap up, and leave. A quiet notification that fires and
            disappears doesn&apos;t create that switch.
          </p>
          <p>
            OnTimer replaces passive notifications with real alarms — timed to
            when you need to leave, not when the meeting starts. Here&apos;s
            exactly how it works:
          </p>
        </div>
      </section>

      <section className="site-flow" aria-label="How OnTimer works">
        <div className="site-shell">
          <div className="site-flow__list">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`site-feature ${i % 2 !== 0 ? "site-feature--reverse" : ""}`}
              >
                <div className="site-feature__visual">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    width={1242}
                    height={2688}
                    sizes="(max-width: 959px) 72vw, 272px"
                    className="site-feature__screen"
                  />
                </div>

                <div className="site-feature__copy">
                  <span className="site-feature__number">Step {step.number}</span>
                  <h2>{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-final">
        <div className="site-shell site-shell--reading">
          <h2>Still have questions?</h2>
          <p>
            Check out our FAQ for answers to the most common questions about
            OnTimer.
          </p>
          <div className="site-actions site-actions--center">
            <Link href="/faq" className="site-secondary-action">
              Read the FAQ
            </Link>
            <Homepage2DownloadCTA location="how_it_works_final" />
          </div>
        </div>
      </section>
    </div>
  );
}
