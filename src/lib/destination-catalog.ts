import { DestinationCatalog } from "@/core/leave-time";
import type { Destination } from "@/core/leave-time";
import { airportDestinationType } from "@/core/leave-time/plugins/airports/website";
import { cruiseDestinationType } from "@/core/leave-time/plugins/cruise-terminals/website";
import {
  travelLocations,
  type TravelLocationProfile,
} from "@/lib/travel-locations";

const destinationTypeDefinitions = [
  {
    buildDestination(profile: TravelLocationProfile): Destination | null {
      return airportDestinationType.validateDestination(profile)
        ? airportDestinationType.buildDestination(profile)
        : null;
    },
  },
  {
    buildDestination(profile: TravelLocationProfile): Destination | null {
      return cruiseDestinationType.validateDestination(profile)
        ? cruiseDestinationType.buildDestination(profile)
        : null;
    },
  },
];

function toDestination(profile: TravelLocationProfile): Destination | null {
  for (const definition of destinationTypeDefinitions) {
    const destination = definition.buildDestination(profile);
    if (destination) return destination;
  }

  return null;
}

export const destinationCatalog = new DestinationCatalog(
  travelLocations
    .map(toDestination)
    .filter((destination): destination is Destination => destination !== null)
);

export const indexableDestinations = destinationCatalog.all();

export function getDestinationBySlug(slug: string): Destination | undefined {
  return indexableDestinations.find((destination) => destination.slug === slug);
}
