import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ontimer.app"),
  title: "National Spam Reporting Center",
  description:
    "Report spam phone numbers in seconds. Help protect millions by reporting suspicious calls, texts, and scam numbers.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function SpamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="min-h-screen"
        style={{
          backgroundColor: "#eef2fb",
          color: "#111827",
          WebkitFontSmoothing: "antialiased",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
