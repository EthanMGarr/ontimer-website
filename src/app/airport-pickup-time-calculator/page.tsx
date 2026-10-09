import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AirportPickupCalculator from "./AirportPickupCalculator";
import AirportPickupPlanPrefill from "@/components/airport/AirportPickupPlanPrefill";
import { airportPickupProfiles, getAirportPickupPath } from "@/lib/airport-pickup-profiles";
import { buildAirportSearchName } from "@/lib/airport-answer-seo";
import { getTravelLocation } from "@/lib/travel-locations";
import "./pickup.css";

export const metadata: Metadata = {
  title: "Find out exactly when to leave for an airport pickup — Free Calculator",
  description: "Calculate exactly when to leave for an airport pickup. This free calculator uses landing time, deplaning, bags, immigration, traffic and your meeting point.",
  alternates: { canonical: "https://www.ontimer.app/airport-pickup-time-calculator" },
  openGraph: {
    title: "Find out exactly when to leave for an airport pickup",
    description: "Calculate exactly when to leave for an airport pickup. This free calculator uses landing time, deplaning, bags, immigration, traffic and your meeting point.",
    url: "https://www.ontimer.app/airport-pickup-time-calculator",
    type: "website",
  },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebApplication", name: "Find out exactly when to leave for an airport pickup", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, url: "https://www.ontimer.app/airport-pickup-time-calculator", description: "Calculate when to leave to pick someone up at the airport using scheduled landing time, baggage, immigration, traffic, and pickup method." },
  { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Time calculators", item: "https://www.ontimer.app/time-calculators" }, { "@type": "ListItem", position: 2, name: "Airport pickup calculators", item: "https://www.ontimer.app/airport-pickup-calculators" }, { "@type": "ListItem", position: 3, name: "Any airport pickup", item: "https://www.ontimer.app/airport-pickup-time-calculator" }] },
] };

export default function AirportPickupPage() {
  return <main className="pickup-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className="pickup-hero"><div className="pickup-shell">
      <nav aria-label="Breadcrumb"><Link href="/airport-pickup-calculators">Airport pickup calculators</Link><span aria-hidden="true">/</span><span aria-current="page">Any airport</span></nav>
      <p>Airport pickup calculator</p>
      <h1>Find out exactly when to leave for an airport pickup</h1>
      <p>Enter the flight and your starting point. This free calculator uses the drive, deplaning, baggage, immigration, and where you plan to meet to give you a specific leave time.</p>
    </div></header>
    <Suspense fallback={<AirportPickupCalculator />}>
      <AirportPickupPlanPrefill />
    </Suspense>
    <section className="pickup-guide"><div className="pickup-shell">
      <h2>Picking up family, a friend, or a colleague?</h2>
      <p>Whether you are meeting your wife, girlfriend, husband, boyfriend, daughter, son, parent, cousin, another family member, a friend, or a colleague, the useful question is the same: when will they actually reach the pickup area, and when should you begin driving?</p>
      <p>The relationship is optional because it does not change the timing. Choose it only if you want the saved calendar event to say who you are picking up. One strong calculator answers these closely related questions more completely than a collection of repetitive pages.</p>
      <h2>Why you should not leave when the flight lands</h2>
      <p>Scheduled landing is usually the gate arrival—not the moment your passenger reaches the curb. Getting off the plane and walking to arrivals takes time. Checked baggage and immigration can add considerably more. For curbside pickup, arriving a few minutes after they are ready is often better than circling while they are still inside.</p>
      <h2>Put the moment to leave where you will act on it</h2>
      <p>Add the calculated departure to your calendar. OnTimer can turn that event into an automatic calendar alarm, making the moment to start driving harder to miss.</p>
      <p>Flying instead? Use the <Link href="/airport-time-to-leave-calculator">airport time-to-leave calculator</Link> to plan your own departure.</p>
      <h2>Popular airport pickup calculators</h2>
      <p>These airport-specific calculators keep the same leave-time workflow and add reviewed local pickup and waiting guidance.</p>
      <div className="pickup-destination-links">
        {airportPickupProfiles.map((profile) => {
          const location = getTravelLocation(profile.slug);
          if (!location || location.kind !== "airport") return null;
          return <Link key={profile.slug} href={getAirportPickupPath(profile.slug)}>Pickup at {buildAirportSearchName(location)}</Link>;
        })}
        <Link href="/airport-pickup-calculators">Browse all airport pickup calculators</Link>
      </div>
    </div></section>
  </main>;
}
