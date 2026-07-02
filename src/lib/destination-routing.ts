import type { MetadataRoute } from "next";
import { indexableDestinations } from "@/lib/destination-catalog";

export function getDestinationSitemapRoutes(baseUrl: string): MetadataRoute.Sitemap {
  return indexableDestinations
    .filter((destination) => destination.slug && destination.routeBasePath)
    .map((destination) => ({
      url: `${baseUrl}${destination.routeBasePath}/${destination.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
}
