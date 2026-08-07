"use client";

import { useLayoutEffect } from "react";

export default function ResetScrollOnReload() {
  useLayoutEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (navigation?.type !== "reload") return;

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}
