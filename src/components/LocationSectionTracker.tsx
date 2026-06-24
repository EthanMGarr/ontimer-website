"use client";

import { useEffect } from "react";

interface LocationSectionTrackerProps {
  locationCode: string;
}

export default function LocationSectionTracker({
  locationCode,
}: LocationSectionTrackerProps) {
  useEffect(() => {
    const tracked = new Set<string>();
    const sections = document.querySelectorAll<HTMLElement>("[data-location-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = (entry.target as HTMLElement).dataset.locationSection;
          if (!section || tracked.has(section)) continue;
          tracked.add(section);
          window.gtag?.("event", "location_section_viewed", {
            page_path: window.location.pathname,
            location_code: locationCode,
            section_name: section,
          });
        }
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [locationCode]);

  return null;
}
