import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";
import { productFacts } from "@/lib/product-facts";

export const metadata: Metadata = {
  title: "Features | OnTimer Calendar Alarm App for iPhone",
  description:
    "Automatic calendar alarms with custom sounds, event-level controls, Early Warning, Time To Leave, and Time To Fly for iPhone.",
  alternates: { canonical: "https://www.ontimer.app/features" },
};

const features = [
  {
    number: "01",
    eyebrow: "01 — Calendar Connection",
    headline: "Connect the calendars you actually use",
    description:
      "OnTimer works with your existing calendar setup, so you do not have to rebuild your schedule somewhere else. Connect Google Calendar, Apple Calendar, and Outlook Calendar, including work and school accounts, and OnTimer uses those events to create alarms.",
    bullets: [
      "Works with Google Calendar, Apple Calendar, and Outlook Calendar",
      "Supports multiple calendar accounts",
      "Uses your existing event schedule",
      "No need to create separate reminders by hand",
    ],
    image: "/images/homepage2/calendar-connections-v2.png",
    imageAlt: "OnTimer calendar connection screen",
    flip: false,
  },
  {
    number: "02",
    eyebrow: "02 — Automatic Event Alarms",
    headline: "Turn calendar events into alarms automatically",
    description:
      "Once OnTimer is connected, it automatically creates alarms for upcoming meetings, calls, and appointments based on your settings.",
    bullets: [
      "Alarms created from calendar events",
      "Adjustable lead times",
      "Updates when your schedule changes",
      "Less manual reminder setup",
    ],
    image: "/images/homepage2/persistent-alarm-v4.png",
    imageAlt: "OnTimer automatic alarms screen",
    flip: true,
  },
  {
    number: "03",
    eyebrow: "03 — Sounds and Persistent Alerts",
    headline: "Give important events their own alarm sound",
    description:
      `${productFacts.alarmBehavior.persistent} ${productFacts.customSounds}`,
    bullets: [
      "Choose your default alarm sound",
      "Assign a sound to a specific event",
      "Stays active until dismissed",
      "Event details included in the alert",
    ],
    image: "/images/homepage2/custom-sounds.png",
    imageAlt: "OnTimer custom alarm sound picker",
    flip: false,
  },
  {
    number: "04",
    eyebrow: "04 — Event Cards",
    headline: "Customize alarms for each event",
    description:
      productFacts.eventControls.summary,
    bullets: [
      "Tap the green bell to arm or disarm an event",
      "Choose the event's alarm sound",
      "Adjust its Early Warning",
      "Open the original calendar event",
    ],
    image: "/images/homepage2/event-controls-v2.png",
    imageAlt: "OnTimer Home-screen event card controls",
    flip: true,
  },
  {
    number: "05",
    eyebrow: "05 — Early Warning",
    headline: "Get a lighter heads-up before the main alarm",
    description:
      productFacts.earlyWarning,
    bullets: [
      "Start wrapping up before it is time to move",
      "Choose a default warning time",
      "Override the timing for a specific event",
      "Premium feature",
    ],
    image: "/images/homepage2/early-warning.png",
    imageAlt: "OnTimer Early Warning settings on iPhone",
    flip: false,
  },
  {
    number: "06",
    eyebrow: "06 — Time To Leave",
    headline: "Know when it is really time to head out",
    description: productFacts.timeToLeave,
    bullets: [
      "Uses the location in your calendar event",
      "Accounts for travel time and traffic",
      "Useful for appointments and in-person meetings",
      "Premium feature",
    ],
    image: "/images/homepage2/traffic-adjustments.png",
    imageAlt: "OnTimer traffic-aware Time To Leave settings",
    flip: true,
  },
  {
    number: "07",
    eyebrow: "07 — Time To Fly",
    headline: "Know when to leave for the airport",
    description: productFacts.timeToFly,
    bullets: [
      "Automatically discovers flights in your calendar",
      "Uses airline-recommended airport arrival time",
      "Accounts for the trip to the airport",
      "No separate flight entry in OnTimer",
    ],
    image: "/images/homepage2/time-to-fly.png",
    imageAlt: "OnTimer Time To Fly controls for a flight on iPhone",
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
            One automatic system for knowing when to wrap up, join, leave, or
            head to the airport.
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
                    unoptimized={feature.number === "07"}
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
          <h2>Ready for alarms that keep you on time?</h2>
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
