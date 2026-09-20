import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  METLIFE_STADIUM,
  REVIEWED_EVENT_FIXTURES,
  mergeUpcomingEvents,
  type EventRecord,
} from "@/lib/event-time-to-leave";
import { isTicketmasterConfigured, listTicketmasterEvents } from "@/lib/ticketmaster-events";

const canonical = "https://www.ontimer.app/venues/metlife-stadium/time-to-leave";

export const metadata: Metadata = {
  title: "What Time Should I Leave for MetLife Stadium?",
  description: "Calculate when to leave for an event at MetLife Stadium using route time, parking or transit, venue entry, and a timing buffer.",
  alternates: { canonical },
  robots: { index: false, follow: true },
  openGraph: {
    title: "What Time Should I Leave for MetLife Stadium?",
    description: "Calculate when to leave for an event at MetLife Stadium using route time, parking or transit, venue entry, and a timing buffer.",
    url: canonical,
  },
};

function dateLabel(event: EventRecord): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: event.timezone,
    weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  }).format(new Date(event.startDateTime));
}

export default async function MetLifeVenuePage() {
  let providerEvents: EventRecord[] = [];
  if (isTicketmasterConfigured()) {
    try {
      providerEvents = await listTicketmasterEvents(METLIFE_STADIUM);
    } catch (error) {
      console.error("[venue-page] ticketmaster_list_failed", error instanceof Error ? error.message : String(error));
    }
  }
  const events = mergeUpcomingEvents(REVIEWED_EVENT_FIXTURES, providerEvents);
  if (events.length === 1) {
    redirect(`/events/${events[0].slug}/when-to-leave`);
  }
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: METLIFE_STADIUM.name,
    url: canonical,
    address: {
      "@type": "PostalAddress",
      streetAddress: "One MetLife Stadium Drive",
      addressLocality: METLIFE_STADIUM.city,
      addressRegion: METLIFE_STADIUM.state,
      postalCode: "07073",
      addressCountry: METLIFE_STADIUM.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: METLIFE_STADIUM.coordinates.latitude, longitude: METLIFE_STADIUM.coordinates.longitude },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      <header className="border-b border-zinc-800/60 py-9 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-sm font-bold text-green-500">Event departure planning</p>
          <h1 className="mt-2 min-w-0 max-w-4xl text-4xl font-black tracking-tight text-white [overflow-wrap:anywhere] sm:text-6xl">What time should I leave for MetLife Stadium?</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">Choose an upcoming event, enter where you are leaving from, and get a recommended departure time that accounts for the route, parking or transit, the venue approach, and entry time.</p>
          <p className="mt-3 text-sm text-zinc-500">{METLIFE_STADIUM.address}</p>
        </div>
      </header>

      <main>
        <section className="py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div><h2 className="text-3xl font-black text-white">Upcoming events</h2><p className="mt-2 text-sm text-zinc-400">Select an event to calculate a specific leave time.</p></div>
              <p className="text-xs text-zinc-500">Event data: {isTicketmasterConfigured() ? "Ticketmaster + reviewed source" : "reviewed source fixture"}</p>
            </div>
            {events.length ? (
              <div className="mt-7 divide-y divide-zinc-800 border-y border-zinc-800">
                {events.map((event) => (
                  <article key={event.id} className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-zinc-500">{dateLabel(event)}</p>
                      <h3 className="mt-1 min-w-0 text-xl font-bold text-white [overflow-wrap:anywhere]">{event.title}{event.subtitle ? ` — ${event.subtitle}` : ""}</h3>
                    </div>
                    <Link href={`/events/${event.slug}/when-to-leave`} className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-green-500 px-5 text-sm font-bold text-black hover:bg-green-400 active:bg-green-600">Calculate leave time</Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-400">No supported events currently have a confirmed start time. Check the official venue calendar for the latest schedule.</div>
            )}
          </div>
        </section>

        <section className="border-t border-zinc-800 bg-zinc-900/50 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="max-w-3xl text-3xl font-black text-white">Plan the whole arrival, not only the drive</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {METLIFE_STADIUM.insights.map((insight) => <p key={insight} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 text-sm leading-relaxed text-zinc-300">{insight}</p>)}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-800 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-black text-white">Official sources</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">Venue guidance reviewed {METLIFE_STADIUM.reviewedAt}. Event-day instructions can change, so confirm them before leaving.</p>
            <ul className="mt-5 flex flex-col gap-3">
              {METLIFE_STADIUM.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap font-semibold text-green-500 underline underline-offset-4 hover:text-green-400">{source.label} ↗</a></li>)}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
