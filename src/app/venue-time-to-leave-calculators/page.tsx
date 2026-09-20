import type { Metadata } from "next";
import { CategoryLink, DirectoryShell } from "@/components/CalculatorDirectory";
import { VENUE_PROFILES } from "@/lib/event-time-to-leave";

const canonical = "https://www.ontimer.app/venue-time-to-leave-calculators";
const title = "Event Venue Leave-Time Calculators";
const description = "Choose an upcoming concert or game at five major New York and New Jersey venues, then calculate a recommended time to leave.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: { title, description, url: canonical },
  twitter: { title, description },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url: canonical,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: VENUE_PROFILES.map((venue, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: venue.name,
      url: `https://www.ontimer.app/venues/${venue.slug}/time-to-leave`,
    })),
  },
};

export default function VenueCalculatorDirectory() {
  return (
    <div className="site-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <DirectoryShell
        eyebrow="Event leave-time calculators"
        title="Know when to leave for the event—not just when it starts."
        description="Choose a venue and an upcoming event. OnTimer combines the route with venue-specific parking, transit, approach, and entry time."
      >
        <section className="site-directory-section">
          <div className="site-shell site-directory-grid">
            <div className="site-directory-intro">
              <p>{VENUE_PROFILES.length} venue calculators</p>
              <p>Each venue guide uses a reviewed local destination profile, so the calculator does not need a paid destination lookup before estimating your trip.</p>
            </div>
            <div className="site-directory-list">
              {VENUE_PROFILES.map((venue) => (
                <CategoryLink
                  key={venue.id}
                  href={`/venues/${venue.slug}/time-to-leave`}
                  label={venue.name}
                  description={`Upcoming events and venue-specific leave-time planning for ${venue.city}, ${venue.state}.`}
                />
              ))}
            </div>
          </div>
        </section>
      </DirectoryShell>
    </div>
  );
}
