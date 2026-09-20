import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventLeaveCalculator from "./EventLeaveCalculator";
import {
  getEventByFixtureSlug,
  getVenueProfile,
  isEventTimeUsable,
  type EventRecord,
} from "@/lib/event-time-to-leave";
import { getTicketmasterEventById } from "@/lib/ticketmaster-events";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

const EVENT_ROUTE = "/events";

function ticketmasterIdFromSlug(slug: string): string | null {
  const marker = "--tm-";
  const index = slug.lastIndexOf(marker);
  return index >= 0 ? slug.slice(index + marker.length) : null;
}

async function resolveEvent(slug: string): Promise<EventRecord | null> {
  const fixture = getEventByFixtureSlug(slug);
  if (fixture) return fixture;

  const ticketmasterId = ticketmasterIdFromSlug(slug);
  const venue = getVenueProfile("metlife-stadium");
  if (!ticketmasterId || !venue) return null;
  try {
    const event = await getTicketmasterEventById(ticketmasterId, venue);
    return event?.slug === slug ? event : null;
  } catch (error) {
    console.error("[event-page] ticketmaster_lookup_failed", error instanceof Error ? error.message : String(error));
    return null;
  }
}

function formatted(date: string, timezone: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: timezone, ...options }).format(new Date(date));
}

function eventStatusUrl(status: EventRecord["status"]): string {
  if (status === "cancelled") return "https://schema.org/EventCancelled";
  if (status === "postponed") return "https://schema.org/EventPostponed";
  if (status === "rescheduled") return "https://schema.org/EventRescheduled";
  return "https://schema.org/EventScheduled";
}

export async function generateStaticParams() {
  return [{ slug: "ac-dc-power-up-tour-metlife-stadium-september-25-2026" }];
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await resolveEvent(slug);
  const venue = event ? getVenueProfile(event.venueId) : null;
  if (!event || !venue) return { robots: { index: false, follow: false } };
  const canonical = `https://www.ontimer.app${EVENT_ROUTE}/${event.slug}/when-to-leave`;
  const title = `What Time Should I Leave for ${event.title} at ${venue.name}?`;
  const description = `Going to ${event.title} at ${venue.name}? Calculate when to leave using route time, venue arrival guidance, parking or transit, and timing buffers.`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
  };
}

export default async function EventWhenToLeavePage({ params }: EventPageProps) {
  const event = await resolveEvent((await params).slug);
  if (!event) notFound();
  const venue = getVenueProfile(event.venueId);
  if (!venue) notFound();

  const eventDate = formatted(event.startDateTime, event.timezone, {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
  const eventTime = formatted(event.startDateTime, event.timezone, { hour: "numeric", minute: "2-digit" });
  const doorsOpen = event.doorsOpenDateTime
    ? formatted(event.doorsOpenDateTime, event.timezone, { hour: "numeric", minute: "2-digit" })
    : null;
  const parkingOpen = event.parkingOpenDateTime
    ? formatted(event.parkingOpenDateTime, event.timezone, { hour: "numeric", minute: "2-digit" })
    : null;
  const checkedAt = formatted(event.lastVerifiedAt, event.timezone, {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });
  const canonical = `https://www.ontimer.app${EVENT_ROUTE}/${event.slug}/when-to-leave`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.title}${event.subtitle ? ` — ${event.subtitle}` : ""}`,
    startDate: event.startDateTime,
    eventStatus: eventStatusUrl(event.status),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: canonical,
    location: {
      "@type": "Place",
      name: venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "One MetLife Stadium Drive",
        addressLocality: venue.city,
        addressRegion: venue.state,
        postalCode: "07073",
        addressCountry: venue.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: venue.coordinates.latitude, longitude: venue.coordinates.longitude },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="hidden border-b border-zinc-800/50 sm:block">
        <ol className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-3 text-xs text-zinc-500">
          <li><Link href="/" className="whitespace-nowrap hover:text-zinc-300">Home</Link></li>
          <li aria-hidden="true">›</li>
          <li><Link href={`/venues/${venue.slug}/time-to-leave`} className="whitespace-nowrap hover:text-zinc-300">{venue.name}</Link></li>
          <li aria-hidden="true">›</li>
          <li className="truncate text-zinc-400">{event.title}</li>
        </ol>
      </nav>

      <header className="border-b border-zinc-800/60 py-7 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-sm font-bold text-green-500">Free event departure-time calculator</p>
          <h1 className="mt-2 min-w-0 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white [overflow-wrap:anywhere] sm:text-5xl">
            What time should I leave for <span className="text-green-500">{event.title}</span> at {venue.name}?
          </h1>
          <div className="mt-4 grid gap-2 border-y border-zinc-800 py-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <p><span className="block text-xs font-semibold text-zinc-500">Event</span><strong className="text-zinc-100">{event.title}{event.subtitle ? ` — ${event.subtitle}` : ""}</strong></p>
            <p><span className="block text-xs font-semibold text-zinc-500">Venue</span><strong className="text-zinc-100">{venue.name}</strong></p>
            <p><span className="block text-xs font-semibold text-zinc-500">Date</span><strong className="text-zinc-100">{eventDate}</strong></p>
            <p><span className="block text-xs font-semibold text-zinc-500">Scheduled start</span><strong className="text-zinc-100">{eventTime}</strong></p>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
            <strong className="text-zinc-200">Event times can change.</strong> Always confirm the event date, start time, venue, and entry information with the event organizer or venue before you leave.
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Schedule last checked {checkedAt}. Source: <a href={event.source.url} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap font-semibold text-green-500 underline underline-offset-2">{event.source.label} ↗</a>
          </p>
        </div>
      </header>

      <main>
        <section className="py-7 sm:py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {isEventTimeUsable(event) && event.status === "scheduled" ? (
              <EventLeaveCalculator event={event} venue={venue} />
            ) : (
              <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-5 text-sm text-amber-200">
                A precise leave time is unavailable because this event’s schedule is not currently confirmed. Check the official event source before planning your trip.
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-zinc-800 bg-zinc-900/50 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="max-w-3xl text-3xl font-black text-white">What changes the leave time at {venue.name}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
              The calculator separates route time from the event-day steps that happen after you reach the property.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {venue.insights.map((insight) => (
                <p key={insight} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 text-sm leading-relaxed text-zinc-300">{insight}</p>
              ))}
            </div>
            <div className="mt-7 rounded-xl border border-zinc-800 p-5">
              <h3 className="text-lg font-bold text-white">Known event-day times</h3>
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                <div><dt className="text-zinc-500">Parking lots open</dt><dd className="mt-1 font-bold text-zinc-200">{parkingOpen || "Confirm with venue"}</dd></div>
                <div><dt className="text-zinc-500">Doors open</dt><dd className="mt-1 font-bold text-zinc-200">{doorsOpen || "Confirm with venue"}</dd></div>
                <div><dt className="text-zinc-500">Scheduled start</dt><dd className="mt-1 font-bold text-zinc-200">{eventTime}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-800 py-12">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black text-white">Official planning sources</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">Venue guidance was reviewed on {venue.reviewedAt}. Re-check event-specific instructions before leaving.</p>
              <ul className="mt-5 space-y-3">
                {[event.source, ...venue.sources].map((source) => (
                  <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">{source.label} ↗</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">More events at {venue.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">Use the venue hub to review upcoming events and the timing factors that apply to this destination.</p>
              <Link href={`/venues/${venue.slug}/time-to-leave`} className="mt-5 inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-zinc-700 px-5 text-sm font-bold text-zinc-200 hover:border-zinc-500 hover:text-white">Open venue guide</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
