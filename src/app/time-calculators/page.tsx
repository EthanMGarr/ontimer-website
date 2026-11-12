import type { Metadata } from "next";
import {
  airportLocations,
  CategoryLink,
  cruiseLocations,
  DirectoryShell,
} from "@/components/CalculatorDirectory";
import { TrackedToolLink } from "@/components/TrackedToolLink";
import { airportPickupProfiles } from "@/lib/airport-pickup-profiles";
import { VENUE_PROFILES } from "@/lib/event-time-to-leave";

export const metadata: Metadata = {
  title: "Free Planning Tools and Time Calculators",
  description:
    "Browse OnTimer tools for important deadlines, countdowns, airport trips, cruise terminals, wake-up planning, and leave-time planning.",
  alternates: { canonical: "https://www.ontimer.app/time-calculators" },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "OnTimer Planning Tools and Time Calculators",
  description:
    "A directory of OnTimer deadline, countdown, schedule and time-planning tools for dates, airport trips, cruise terminals, wake-up planning and leave-time planning.",
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
        eyebrow="Free planning tools"
        title="Find the calculator you need."
        description="Start with OnTimer's most-used calculators, then jump straight to a clear group below."
      >
        <section className="site-directory-section site-directory-section--featured-tools site-directory-section--tint" id="popular-tools">
          <div className="site-shell site-directory-grid">
            <div className="site-directory-intro">
              <h2>Most popular</h2>
            </div>
            <div className="site-featured-tool-list">
              <TrackedToolLink href="/what-time-should-i-leave" surface="tool_hub" group="featured" position={1}>
                <strong>Time-to-Leave</strong><span>What time should I leave?</span>
              </TrackedToolLink>
              <TrackedToolLink href="/airport-time-to-leave-calculator" surface="tool_hub" group="featured" position={2}>
                <strong>Airport Time-to-Leave</strong><span>When should I leave for my flight?</span>
              </TrackedToolLink>
              <TrackedToolLink href="/wake-up-time-calculator" surface="tool_hub" group="featured" position={3}>
                <strong>Wake-Up Time</strong><span>When should I wake up?</span>
              </TrackedToolLink>
            </div>
          </div>
        </section>

        <nav className="site-tool-bucket-index" aria-labelledby="tool-buckets-title">
          <div className="site-shell site-tool-bucket-index__inner">
            <div className="site-tool-bucket-index__intro">
              <h2 id="tool-buckets-title">Browse by what you need</h2>
            </div>
            <div className="site-tool-bucket-list">
              <TrackedToolLink href="/time-calculators#leave-time" surface="tool_hub" group="bucket_index" position={1}>
                <strong>Leave-time calculators</strong>
                <span>Everyday trips, airports, pickups, cruises and venues</span>
              </TrackedToolLink>
              <TrackedToolLink href="/time-calculators#wake-countdowns" surface="tool_hub" group="bucket_index" position={2}>
                <strong>Wake-up &amp; countdowns</strong>
                <span>Wake-up times and days until an important date</span>
              </TrackedToolLink>
              <TrackedToolLink href="/time-calculators#medication-schedules" surface="tool_hub" group="bucket_index" position={3}>
                <strong>Medication schedules</strong>
                <span>Recurring calendar plans for you, someone you support or a pet</span>
              </TrackedToolLink>
              <TrackedToolLink href="/time-calculators#deadlines" surface="tool_hub" group="bucket_index" position={4}>
                <strong>Deadlines &amp; due dates</strong>
                <span>Estimated tax dates and advance calendar reminders</span>
              </TrackedToolLink>
            </div>
          </div>
        </nav>

        <section className="site-directory-section" id="leave-time">
          <div className="site-shell site-directory-grid">
            <div className="site-directory-intro">
              <h2>Leave-time calculators</h2>
              <p>Find when to leave for an everyday trip, flight, airport pickup, cruise or event.</p>
            </div>
            <div className="site-directory-list">
              <CategoryLink href="/what-time-should-i-leave" label="Time-to-Leave Calculator" description="Estimate when to head out for everyday events and appointments." analytics={{ surface: "tool_hub", group: "leave_time", position: 1 }} />
              <CategoryLink href="/airport-time-to-leave-calculator" label="Airport Time-to-Leave Calculator" description="Calculate a personalized leave time for any airport and flight." analytics={{ surface: "tool_hub", group: "leave_time", position: 2 }} />
              <CategoryLink href="/airport-time-calculators" label="Airport Guides & Calculators" description="Airport-specific leave-time guides and calculators for flights, traffic, parking, terminal movement and TSA planning." count={airportLocations.length} analytics={{ surface: "tool_hub", group: "leave_time", position: 3 }} />
              <CategoryLink href="/airport-pickup-calculators" label="Airport Pickup Calculators" description="Choose a reviewed airport for local curb, waiting-lot, terminal and road guidance, or continue to the general pickup calculator." count={airportPickupProfiles.length} analytics={{ surface: "tool_hub", group: "leave_time", position: 4 }} />
              <CategoryLink href="/cruise-terminal-time-calculators" label="Cruise Terminal Time Calculators" description="Cruise-terminal leave-time calculators built around boarding windows, port access, luggage and terminal logistics." count={cruiseLocations.length} analytics={{ surface: "tool_hub", group: "leave_time", position: 5 }} />
              <CategoryLink href="/venue-time-to-leave-calculators" label="Event Venue Leave-Time Calculators" description="Choose an upcoming concert or game and calculate when to leave using route time plus venue-specific arrival guidance." count={VENUE_PROFILES.length} analytics={{ surface: "tool_hub", group: "leave_time", position: 6 }} />
            </div>
          </div>
        </section>

        <section className="site-directory-section site-directory-section--tint" id="wake-countdowns">
          <div className="site-shell site-directory-grid">
            <div className="site-directory-intro">
              <h2>Wake-up &amp; countdowns</h2>
              <p>Work backward to a wake-up time or count forward to an important date.</p>
            </div>
            <div className="site-directory-list">
              <CategoryLink href="/wake-up-time-calculator" label="Wake-Up Time Calculator" description="Calculate when to set your alarm based on your arrival time, route, morning routine and extra buffer." analytics={{ surface: "tool_hub", group: "wake_countdowns", position: 1 }} />
              <CategoryLink href="/days-until" label="Days Until Calculator" description="Count down to any date, then add the event and optional planning milestones to your calendar." count={5} analytics={{ surface: "tool_hub", group: "wake_countdowns", position: 2 }} />
            </div>
          </div>
        </section>

        <section className="site-directory-section" id="medication-schedules">
          <div className="site-shell site-directory-grid">
            <div className="site-directory-intro">
              <h2>Medication schedules</h2>
              <p>Create a recurring, calendar-ready medication plan for yourself, someone you support or a pet.</p>
            </div>
            <div className="site-directory-list">
              <CategoryLink href="/medication-schedule" label="Personal Medication Schedule" description="Build a private recurring schedule and add it to your calendar." analytics={{ surface: "tool_hub", group: "medication_schedules", position: 1 }} />
              <CategoryLink href="/caregiver-medication-schedule" label="Caregiver Medication Schedule" description="Prepare and share a clear schedule for someone you support." analytics={{ surface: "tool_hub", group: "medication_schedules", position: 2 }} />
              <CategoryLink href="/veterinary-medication-schedule" label="Pet Medication Schedule" description="Organize recurring pet doses in a calendar-ready plan." analytics={{ surface: "tool_hub", group: "medication_schedules", position: 3 }} />
            </div>
          </div>
        </section>

        <section className="site-directory-section site-directory-section--tint" id="deadlines">
          <div className="site-shell site-directory-grid">
            <div className="site-directory-intro">
              <h2>Deadlines &amp; due dates</h2>
              <p>Find an estimated tax deadline and add advance reminders to your calendar.</p>
            </div>
            <div className="site-directory-list">
              <CategoryLink href="/2026-estimated-tax-payment-dates" label="Final 2026 Estimated Tax Payment" description="January 15, 2027 is the remaining standard payment deadline. Download five advance calendar reminders." analytics={{ surface: "tool_hub", group: "deadlines", position: 1 }} />
              <CategoryLink href="/estimated-tax-payment-dates" label="2027 Estimated Tax Due Dates" description="See all four projected payment dates and download the complete advance-reminder schedule." analytics={{ surface: "tool_hub", group: "deadlines", position: 2 }} />
            </div>
          </div>
        </section>
      </DirectoryShell>
    </div>
  );
}
