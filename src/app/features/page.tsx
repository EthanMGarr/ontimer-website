import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";

export const metadata: Metadata = {
  title: "Features | OnTimer Calendar Alarm App for iPhone",
  description:
    "OnTimer is built around one job: making calendar events harder to miss. Connect your calendars and get loud, persistent alarms before every meeting.",
  alternates: { canonical: "https://www.ontimer.app/features" },
};

const features = [
  {
    number: "01",
    eyebrow: "01 — Calendar Connection",
    headline: "Connect the calendars you actually use",
    description:
      "OnTimer works with your existing calendar setup so you do not have to rebuild your schedule somewhere else. Connect Google Calendar, Apple Calendar, and Outlook Calendar, including multiple accounts, and OnTimer uses those events to prepare alarms.",
    bullets: [
      "Works with Google Calendar, Apple Calendar, and Outlook Calendar",
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
    <div className="site-page">
      <section className="site-hero">
        <div className="site-shell site-hero__content site-hero__content--center">
          <p className="site-kicker">OnTimer features</p>
          <h1 className="site-title">Features built to help you show up on time</h1>
          <p className="site-lede">
            OnTimer is built around one job: making calendar events harder to
            miss.
          </p>
          <div className="site-actions site-actions--center">
            <Homepage2DownloadCTA location="features_hero" />
          </div>
        </div>
      </section>

      <section className="site-context">
        <div className="site-shell site-shell--reading">
          <p className="site-kicker">Why this exists</p>
          <p>
            Calendar notifications are passive. They appear, you acknowledge
            them, and then they disappear. Most people see the reminder — and
            still show up late.
          </p>
          <p>
            The problem isn&apos;t forgetting the meeting. It&apos;s the gap
            between knowing you have a meeting and actually stopping what
            you&apos;re doing to leave. OnTimer is built around that gap —{" "}
            <Link
              href="/never-be-late-to-meetings"
            >
              learn why calendar reminders fail and how alarms fix it
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="site-flow" aria-label="OnTimer features">
        <div className="site-shell">
          <div className="site-flow__list">
            {features.map((feature) => (
              <div
                key={feature.number}
                className={`site-feature ${feature.flip ? "site-feature--reverse" : ""}`}
              >
                <div className="site-feature__visual">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    width={1242}
                    height={2688}
                    sizes="(max-width: 959px) 72vw, 272px"
                    className="site-feature__screen"
                  />
                </div>

                <div className="site-feature__copy">
                  <span className="site-feature__number">{feature.eyebrow}</span>
                  <h2>{feature.headline}</h2>
                  <p>{feature.description}</p>
                  <ul className="site-checks">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet}>
                        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" fill="none" /></svg>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-callout">
        <div className="site-shell site-callout__inner">
          <span className="site-callout__index" aria-hidden="true">Free</span>
          <div>
            <p className="site-kicker">Planning tool</p>
            <h2>Airport Time-to-Leave Calculator</h2>
            <p>
              Estimate exactly when to leave for the airport based on traffic,
              security time, bags, and how you&apos;re getting there. Free, no
              account required.
            </p>
            <Link href="/airport-time-to-leave-calculator" className="site-text-action">
              Try the calculator <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="site-final">
        <div className="site-shell site-shell--reading">
          <h2>Ready to stop missing meetings?</h2>
          <p>
            Download OnTimer for free and get more reliable alerts from your
            calendar.
          </p>
          <div className="site-actions site-actions--center">
            <Homepage2DownloadCTA location="features_final" />
          </div>
        </div>
      </section>
    </div>
  );
}
