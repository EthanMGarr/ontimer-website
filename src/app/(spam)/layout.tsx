import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function SpamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        style={{
          backgroundColor: "#eef2fb",
          color: "#111827",
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
