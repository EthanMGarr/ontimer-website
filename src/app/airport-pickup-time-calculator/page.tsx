import type { Metadata } from "next";
import Link from "next/link";
import AirportPickupCalculator from "./AirportPickupCalculator";
import "./pickup.css";

export const metadata: Metadata = {
  title: "Airport Pickup Time Calculator: When Should I Leave?",
  description: "Enter a flight’s scheduled arrival, airport-exit time, and your drive time to estimate when the passenger will be ready and when you should leave for pickup.",
  alternates: { canonical: "https://www.ontimer.app/airport-pickup-time-calculator" },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "WebApplication", name: "Airport Pickup Time Calculator", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, url: "https://www.ontimer.app/airport-pickup-time-calculator", description: "Estimate when an arriving passenger will be ready and when the driver should leave for an airport pickup." }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Time Calculators", item: "https://www.ontimer.app/time-calculators" }, { "@type": "ListItem", position: 2, name: "Airport Pickup Time Calculator", item: "https://www.ontimer.app/airport-pickup-time-calculator" }] }] };

export default function AirportPickupPage() {
  return <main className="pickup-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><header className="pickup-hero"><div className="pickup-shell"><nav aria-label="Breadcrumb"><Link href="/time-calculators">Time Calculators</Link><span aria-hidden="true">/</span><span aria-current="page">Airport Pickup</span></nav><p>Airport pickup calculator</p><h1>When should I leave to pick someone up at the airport?</h1><p>Work backward from the scheduled landing time, baggage or immigration, and your drive. No flight-data subscription required.</p></div></header><AirportPickupCalculator /><section className="pickup-guide"><div className="pickup-shell"><h2>A useful estimate, not live flight tracking</h2><p>Scheduled arrival is when the plane is expected at the gate—not when the passenger reaches the curb. Carry-on travelers may move quickly, while checked bags, immigration, a distant gate, or accessibility needs can add meaningful time.</p><p>Use the closest starting estimate, then check the airline or airport before you leave. If you plan to park and meet inside, include time for parking and walking. For curbside pickup, leave that buffer at zero and coordinate once the passenger is outside.</p><h2>Put the leave time where you’ll act on it</h2><p>Add the calculated departure to your calendar. OnTimer can turn that calendar event into an automatic alarm, so the moment to start driving is harder to miss.</p><p>Flying instead of picking someone up? Use the <Link href="/airport-time-to-leave-calculator">airport time-to-leave calculator</Link> to plan when to leave for your own flight.</p></div></section></main>;
}
