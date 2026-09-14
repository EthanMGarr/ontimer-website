import type { Metadata } from "next";
import Link from "next/link";
import AirportPickupCalculator from "./AirportPickupCalculator";
import "./pickup.css";

export const metadata: Metadata = {
  title: "When Should I Leave to Pick Someone Up at the Airport?",
  description: "Find when to leave to pick up your wife, husband, daughter, son, family member, or friend at the airport using landing time, baggage, and traffic.",
  alternates: { canonical: "https://www.ontimer.app/airport-pickup-time-calculator" },
  openGraph: {
    title: "When Should I Leave for an Airport Pickup?",
    description: "Calculate when to leave, when the flight lands, and when your passenger should reach pickup.",
    url: "https://www.ontimer.app/airport-pickup-time-calculator",
    type: "website",
  },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebApplication", name: "Airport Pickup Time Calculator", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, url: "https://www.ontimer.app/airport-pickup-time-calculator", description: "Calculate when to leave to pick someone up at the airport using scheduled landing time, baggage, immigration, traffic, and pickup method." },
  { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Time Calculators", item: "https://www.ontimer.app/time-calculators" }, { "@type": "ListItem", position: 2, name: "Airport Pickup Time Calculator", item: "https://www.ontimer.app/airport-pickup-time-calculator" }] },
] };

export default function AirportPickupPage() {
  return <main className="pickup-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className="pickup-hero"><div className="pickup-shell">
      <nav aria-label="Breadcrumb"><Link href="/time-calculators">Time Calculators</Link><span aria-hidden="true">/</span><span aria-current="page">Airport Pickup</span></nav>
      <p>Airport pickup calculator</p>
      <h1>When should I leave to pick someone up at the airport?</h1>
      <p>Find the right time to leave—not just when the plane lands. We account for the drive, deplaning, baggage, immigration, and where you plan to meet.</p>
    </div></header>
    <AirportPickupCalculator />
    <section className="pickup-guide"><div className="pickup-shell">
      <h2>Picking up family, a friend, or a colleague?</h2>
      <p>Whether you are meeting your wife, girlfriend, husband, boyfriend, daughter, son, parent, cousin, another family member, a friend, or a colleague, the useful question is the same: when will they actually reach the pickup area, and when should you begin driving?</p>
      <p>The relationship is optional because it does not change the timing. Choose it only if you want the saved calendar event to say who you are picking up. One strong calculator answers these closely related questions more completely than a collection of repetitive pages.</p>
      <h2>Why you should not leave when the flight lands</h2>
      <p>Scheduled landing is usually the gate arrival—not the moment your passenger reaches the curb. Getting off the plane and walking to arrivals takes time. Checked baggage and immigration can add considerably more. For curbside pickup, arriving a few minutes after they are ready is often better than circling while they are still inside.</p>
      <h2>Put the moment to leave where you will act on it</h2>
      <p>Add the calculated departure to your calendar. OnTimer can turn that event into an automatic calendar alarm, making the moment to start driving harder to miss.</p>
      <p>Flying instead? Use the <Link href="/airport-time-to-leave-calculator">airport time-to-leave calculator</Link> to plan your own departure.</p>
    </div></section>
  </main>;
}
