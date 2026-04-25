import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
        destination: "https://ontimer.app/OnTimer_Privacy_Policy.html",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "https://ontimer.app/OnTimer_Terms_of_Service.html",
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
