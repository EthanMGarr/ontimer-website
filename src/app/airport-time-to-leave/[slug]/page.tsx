import { notFound, permanentRedirect } from "next/navigation";
import DestinationPageTemplate from "@/components/destination-pages/DestinationPageTemplate";
import {
  airportDestinationType,
  buildAirportMetadata,
  buildAirportPageModel,
} from "@/core/leave-time/plugins/airports/website";
import {
  getTravelLocation,
  indexableTravelLocations,
} from "@/lib/travel-locations";
import { localizedAlternates } from "@/lib/i18n";
import { isSpanishAirportSlug } from "@/lib/spanish-airports";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

const indexableAirportLocations = indexableTravelLocations.filter((location) =>
  airportDestinationType.validateDestination(location)
);

export function generateStaticParams() {
  return indexableAirportLocations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getTravelLocation(slug);
  if (!location || !airportDestinationType.validateDestination(location)) {
    return { robots: { index: false, follow: false } };
  }

  const metadata = buildAirportMetadata(location);
  if (!isSpanishAirportSlug(slug)) return metadata;

  const englishPath = `/airport-time-to-leave/${slug}`;
  const spanishPath = `/es/aeropuerto/${slug}`;
  return {
    ...metadata,
    alternates: {
      canonical: `https://www.ontimer.app${englishPath}`,
      ...localizedAlternates(englishPath, spanishPath),
    },
    openGraph: {
      ...metadata.openGraph,
      locale: "en_US",
      alternateLocale: ["es_ES"],
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const location = getTravelLocation((await params).slug);
  if (!location) notFound();

  // Cruise-terminal links were previously emitted under the airport route.
  // Preserve those discovered URLs and consolidate them into the canonical route.
  if (location.kind === "cruise-terminal" && location.indexable) {
    permanentRedirect(`/cruise-time-to-leave/${location.slug}`);
  }

  if (!airportDestinationType.validateDestination(location)) notFound();

  return <DestinationPageTemplate model={buildAirportPageModel(location)} />;
}
