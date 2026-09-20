import type { Metadata } from "next";
import {
  airportLocations,
  CategoryLink,
  cruiseLocations,
  DirectoryShell,
} from "@/components/CalculatorDirectory";
import { VENUE_PROFILES } from "@/lib/event-time-to-leave";

export const metadata: Metadata = {
  title: "Time Calculators",
  description:
    "Browse OnTimer time calculators for countdowns, airport trips, cruise terminals, wake-up planning, and leave-time planning.",
  alternates: { canonical: "https://www.ontimer.app/time-calculators" },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "OnTimer Time Calculators",
  description:
    "A directory of OnTimer countdown and time-planning calculators for dates, airport trips, cruise terminals, wake-up planning and leave-time planning.",
  url: "https://www.ontimer.app/time-calculators",
};

export default function TimeCalculatorsDirectory() {
  return (
    <div className="site-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <DirectoryShell
        eyebrow="Time calculators"
        title="Find the right calculator for the moment you need to move."
        description="OnTimer calculators help you work backward from the event, trip, flight, boarding window or wake-up time that matters."
      >
        <section className="site-directory-section">
          <div className="site-shell site-directory-grid">
            <div className="site-directory-intro">
              <p>
                Calculator ecosystem
              </p>
              <p>
                Start with a category. Each hub links to the detailed calculators
                inside that system without making the navigation do too much.
              </p>
            </div>
            <div className="site-directory-list">
              <CategoryLink
                href="/venue-time-to-leave-calculators"
                label="Event Venue Leave-Time Calculators"
                description="Choose an upcoming concert or game and calculate when to leave using route time plus venue-specific arrival guidance."
                count={VENUE_PROFILES.length}
              />
              <CategoryLink
                href="/airport-time-calculators"
                label="Airport Guides & Calculators"
                description="Airport-specific leave-time guides and calculators for flights, traffic, parking, terminal movement and TSA planning."
                count={airportLocations.length}
              />
              <CategoryLink
                href="/cruise-terminal-time-calculators"
                label="Cruise Terminal Time Calculators"
                description="Cruise-terminal leave-time calculators built around boarding windows, port access, luggage and terminal logistics."
                count={cruiseLocations.length}
              />
              <CategoryLink
                href="/days-until"
                label="Days Until Calculator"
                description="Count down to any date, then add the event and optional planning milestones to your calendar."
                count={5}
              />
              <CategoryLink
                href="/airport-pickup-time-calculator"
                label="Airport Pickup Time Calculator"
                description="Estimate when an arriving passenger will be ready and when you should leave for pickup."
              />
              <CategoryLink
                href="/wake-up-time-calculator"
                label="Wake-Up Time Calculator"
                description="Work backward from when you need to leave, arrive or start moving."
              />
              <CategoryLink
                href="/what-time-should-i-leave"
                label="Leave-Time Calculator"
                description="Estimate when to head out for everyday events and appointments."
              />
            </div>
          </div>
        </section>
      </DirectoryShell>
    </div>
  );
}
