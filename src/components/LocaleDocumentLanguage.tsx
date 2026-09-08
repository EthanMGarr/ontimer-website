"use client";

import { useEffect } from "react";
import type { SiteLocale } from "@/lib/i18n";

export default function LocaleDocumentLanguage({ locale }: { locale: SiteLocale }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [locale]);

  return null;
}
