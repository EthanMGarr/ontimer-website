import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import { KTVUAirportActions, KTVUAppStoreAction } from "./KTVUActions";
import "./ktvu.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-ktvu-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ktvu-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "When Should I Leave for SFO, OAK or SJC?",
  description:
    "Free Bay Area airport calculators for SFO, OAK and SJC, plus OnTimer Time To Fly alarms for iPhone.",
  alternates: { canonical: "https://www.ontimer.app/KTVU" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "What time do I actually need to leave for the airport?",
    description:
      "Calculate when to leave for SFO, OAK or SJC, then make that time ring on your iPhone with OnTimer.",
    url: "https://www.ontimer.app/KTVU",
    siteName: "OnTimer",
    type: "website",
    images: [
      {
        url: "https://www.ontimer.app/images/homepage2/time-to-fly.png",
        width: 853,
        height: 1844,
        alt: "OnTimer Time To Fly controls on iPhone",
      },
    ],
  },
};

const factors = [
  ["Traffic", "Your starting point and the drive to the airport"],
  ["Airport time", "Security, bags, parking or drop-off, and terminal logistics"],
  ["Your flight", "Domestic or international timing and your departure time"],
] as const;

export default function KTVULandingPage() {
  return (
    <div className={`${display.variable} ${body.variable} ktvu-page`}>
      <section className="ktvu-hero" aria-labelledby="ktvu-title">
        <div className="ktvu-shell">
          <div className="ktvu-hero-copy">
            <p className="ktvu-kicker">Welcome, KTVU viewers</p>
            <h1 id="ktvu-title">What time do I actually need to leave for the airport?</h1>
            <p className="ktvu-lede">
              The familiar two-hour rule tells you when to arrive. It does not
              tell you when to walk out the door. Choose your Bay Area airport
              for a free, personalized leave-time calculation.
            </p>
          </div>

          <KTVUAirportActions />

          <p className="ktvu-calculator-note">
            Free calculators. No account required. Need another airport?{" "}
            <Link href="/airport-time-to-leave-calculator?utm_source=ktvu&utm_medium=tv&utm_campaign=holiday_travel_2026&utm_content=all_airports">
              Browse all airports
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="ktvu-factors" aria-labelledby="ktvu-factors-title">
        <div className="ktvu-shell">
          <div className="ktvu-section-heading">
            <p className="ktvu-kicker">Why the answer changes</p>
            <h2 id="ktvu-factors-title">Getting there on time is more than a two-hour rule.</h2>
          </div>
          <div className="ktvu-factor-grid">
            {factors.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ktvu-app" aria-labelledby="ktvu-app-title">
        <div className="ktvu-shell ktvu-app-grid">
          <div className="ktvu-app-copy">
            <p className="ktvu-kicker">Make your leave time ring</p>
            <h2 id="ktvu-app-title">Let your iPhone tell you when it is time to go.</h2>
            <p>
              OnTimer&apos;s Time To Fly finds flights already on your calendar,
              works backward from the flight and your trip to the airport, and
              sets a real alarm for your leave time.
            </p>
            <p className="ktvu-free-note">
              OnTimer is free for iPhone. The free plan sets your initial
              airport departure estimate. OnTimer Pro can update it when
              traffic changes.
            </p>
            <KTVUAppStoreAction />
          </div>

          <div className="ktvu-app-visual" aria-label="OnTimer Time To Fly on iPhone">
            <div className="ktvu-visual-ring" />
            <Image
              src="/images/homepage2/time-to-fly.png"
              alt="OnTimer Time To Fly screen showing airport leave-time controls"
              width={853}
              height={1844}
              sizes="(max-width: 719px) 64vw, 20rem"
              priority
            />
          </div>
        </div>
      </section>

      <section className="ktvu-closing" aria-label="OnTimer summary">
        <div className="ktvu-shell">
          <p>Airlines tell you when to arrive.</p>
          <strong>OnTimer tells you when to leave.</strong>
        </div>
      </section>
    </div>
  );
}
