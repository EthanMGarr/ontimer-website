import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const createNextConfig = (phase: string): NextConfig => ({
  // Keep the long-running development server isolated from `next build`.
  // Sharing `.next` lets a production build replace files underneath dev,
  // which eventually leaves local review routes returning a 500 response.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    // Public image filenames are stable, so keep this conservative: visitors
    // get repeat-load wins without making replacements stale for long periods.
    minimumCacheTTL: 86_400,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // RFC 8288 Link header — advertise API catalog on every page for agent discovery
        source: "/(.*)",
        headers: [
          {
            key: "Link",
            value: '</.well-known/api-catalog>; rel="api-catalog"',
          },
        ],
      },
      {
        // Spanish routes also update the DOM language before hydration. This
        // header gives crawlers and assistive technology the same signal.
        source: "/es/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "es",
          },
        ],
      },
      {
        // Serve api-catalog with the correct linkset media type (RFC 9727)
        source: "/.well-known/api-catalog",
        headers: [
          {
            key: "Content-Type",
            value: "application/linkset+json",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ontimer.app" }],
        destination: "https://www.ontimer.app/:path*",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "https://www.ontimer.app/OnTimer_Privacy_Policy.html",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "https://www.ontimer.app/OnTimer_Terms_of_Service.html",
        permanent: true,
      },
      {
        source: "/how-to-never-be-late-to-meetings",
        destination: "/never-be-late-to-meetings",
        permanent: true,
      },
      {
        source: "/stop-missing-calendar-meetings",
        destination: "/never-be-late-to-meetings",
        permanent: true,
      },
      {
        source: "/tools",
        destination: "/time-calculators",
        permanent: true,
      },
    ];
  },
});

export default createNextConfig;
