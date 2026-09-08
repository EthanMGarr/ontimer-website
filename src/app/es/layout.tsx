import type { Metadata } from "next";
import LocaleDocumentLanguage from "@/components/LocaleDocumentLanguage";

export const metadata: Metadata = {
  openGraph: {
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="es">
      <LocaleDocumentLanguage locale="es" />
      {children}
    </div>
  );
}
