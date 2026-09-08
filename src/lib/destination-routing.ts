import type { MetadataRoute } from "next";
import { indexableDestinations } from "@/lib/destination-catalog";
import { localizedAlternates } from "@/lib/i18n";
import { isSpanishAirportSlug } from "@/lib/spanish-airports";

export function getDestinationSitemapRoutes(baseUrl: string): MetadataRoute.Sitemap {
  return indexableDestinations
    .filter((destination) => destination.slug && destination.routeBasePath)
    .map((destination) => {
      const slug = destination.slug!;
      const path = `${destination.routeBasePath}/${slug}`;
      const hasSpanishEquivalent =
        destination.routeBasePath === "/airport-time-to-leave" &&
        isSpanishAirportSlug(slug);

      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        ...(hasSpanishEquivalent
          ? { alternates: localizedAlternates(path, `/es/aeropuerto/${slug}`) }
          : {}),
      };
    });
}
