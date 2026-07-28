import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
