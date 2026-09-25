import type { EventRecord, VenueProfile } from "./event-time-to-leave";

function eventStatusUrl(status: EventRecord["status"]): string {
  if (status === "cancelled") return "https://schema.org/EventCancelled";
  if (status === "postponed") return "https://schema.org/EventPostponed";
  if (status === "rescheduled") return "https://schema.org/EventRescheduled";
  return "https://schema.org/EventScheduled";
}

export function eventPageDescription(event: EventRecord, venue: VenueProfile): string {
  return `Going to ${event.title} at ${venue.name}? Calculate when to leave using route time, venue arrival guidance, parking or transit, and timing buffers.`;
}

export function buildEventStructuredData(event: EventRecord, venue: VenueProfile, canonical: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.title}${event.subtitle ? ` — ${event.subtitle}` : ""}`,
    description: eventPageDescription(event, venue),
    startDate: event.startDateTime,
    ...(event.endDateTime ? { endDate: event.endDateTime } : {}),
    eventStatus: eventStatusUrl(event.status),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: canonical,
    ...(event.imageUrls?.length ? { image: event.imageUrls } : {}),
    ...(event.performers?.length ? {
      performer: event.performers.map((performer) => ({
        "@type": performer.schemaType,
        name: performer.name,
        ...(performer.url ? { url: performer.url } : {}),
      })),
    } : {}),
    ...(event.organizerName ? {
      organizer: { "@type": "Organization", name: event.organizerName },
    } : {}),
    ...(event.offer ? {
      offers: {
        "@type": "Offer",
        url: event.offer.url,
        ...(event.offer.validFrom ? { validFrom: event.offer.validFrom } : {}),
      },
    } : {}),
    location: {
      "@type": "Place",
      name: venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: venue.streetAddress,
        addressLocality: venue.city,
        addressRegion: venue.state,
        postalCode: venue.postalCode,
        addressCountry: venue.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: venue.coordinates.latitude, longitude: venue.coordinates.longitude },
    },
  };
}
