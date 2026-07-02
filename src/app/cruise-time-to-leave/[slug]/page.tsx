import { notFound } from "next/navigation";
import DestinationPageTemplate from "@/components/destination-pages/DestinationPageTemplate";
import {
  buildCruiseMetadata,
  buildCruisePageModel,
  cruiseDestinationType,
} from "@/core/leave-time/plugins/cruise-terminals/website";
import {
  getTravelLocation,
  indexableTravelLocations,
} from "@/lib/travel-locations";

interface CruiseLocationPageProps {
  params: Promise<{ slug: string }>;
}

const indexableCruiseLocations = indexableTravelLocations.filter((location) =>
  cruiseDestinationType.validateDestination(location)
);

export function generateStaticParams() {
  return indexableCruiseLocations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CruiseLocationPageProps) {
  const location = getTravelLocation((await params).slug);
  if (!location || !cruiseDestinationType.validateDestination(location)) {
    return { robots: { index: false, follow: false } };
  }

  return buildCruiseMetadata(location);
}

export default async function CruiseLocationPage({ params }: CruiseLocationPageProps) {
  const location = getTravelLocation((await params).slug);
  if (!location || !cruiseDestinationType.validateDestination(location)) notFound();

  return <DestinationPageTemplate model={buildCruisePageModel(location)} />;
}
