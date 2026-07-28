import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
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
    ];
  },
};

export default nextConfig;
