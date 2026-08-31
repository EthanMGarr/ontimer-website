"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import { initializeAnalytics } from "@/lib/analytics";

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
    if (initialPathRef.current) {
      initialPathRef.current = false;
      return;
    }
    if (!initializeAnalytics()) return;

    window.gtag("event", "page_view", {
      page_path: pathname + (searchParams.toString() ? `?${searchParams}` : ""),
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  useEffect(() => window.__ontimerStartAnalytics?.(), []);
  return <Suspense fallback={null}><PageViewTracker /></Suspense>;
}
