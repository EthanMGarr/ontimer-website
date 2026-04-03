import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ontimer.app"),
  robots: {
    index: false,
    follow: false,
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        style={{
          backgroundColor: "#f8f9fb",
          color: "#1a1a2e",
          minHeight: "100vh",
          WebkitFontSmoothing: "antialiased",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
