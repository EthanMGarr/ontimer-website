import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/android" },
};

export default function AndroidLayout({ children }: { children: React.ReactNode }) {
  return children;
}
