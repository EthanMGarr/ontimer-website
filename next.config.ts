import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
