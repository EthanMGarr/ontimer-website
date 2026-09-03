"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import { initializeAnalytics } from "@/lib/analytics";
import { isAnalyticsFreeMedicationPath } from "@/lib/medication-route-privacy";

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
    __ontimerAnalyticsConfigured?: boolean;
    __ontimerStartAnalytics?: () => void;
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPathRef = useRef(true);

  useEffect(() => {
    if (isAnalyticsFreeMedicationPath(pathname)) {
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "denied", ad_storage: "denied" });
      }
      return;
    }
    window.__ontimerStartAnalytics?.();
    if (initialPathRef.current) {
      initialPathRef.current = false;
      return;
    }
    if (!initializeAnalytics()) return;
    window.gtag("consent", "update", { analytics_storage: "granted" });

    window.gtag("event", "page_view", {
      page_path: pathname + (searchParams.toString() ? `?${searchParams}` : ""),
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  return <Suspense fallback={null}><PageViewTracker /></Suspense>;
}
