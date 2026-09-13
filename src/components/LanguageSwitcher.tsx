"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLocalePath, localeForPathname } from "@/lib/i18n";
import { trackLanguageSwitch } from "@/lib/analytics";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const locale = localeForPathname(pathname);
  const alternatePath = alternateLocalePath(pathname);

  if (!alternatePath) return null;

  const targetLocale = locale === "es" ? "en" : "es";
  const currentLabel = locale === "es" ? "Español" : "English";
  const selectorLabel = locale === "es" ? "Selector de idioma" : "Language selector";

  return (
    <div className={`locale-switcher${compact ? " locale-switcher--compact" : ""}`} role="group" aria-label={selectorLabel}>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M2.8 10h14.4M10 2.5c2 2.1 3 4.6 3 7.5s-1 5.4-3 7.5c-2-2.1-3-4.6-3-7.5s1-5.4 3-7.5Z" />
      </svg>
      <span className="locale-switcher__current" lang={locale} aria-current="true" aria-label={`${currentLabel}, ${locale === "es" ? "idioma actual" : "current language"}`}>
        {locale.toUpperCase()}
      </span>
      <span className="locale-switcher__separator" aria-hidden="true">/</span>
      <Link
        href={alternatePath}
        hrefLang={targetLocale}
        lang={targetLocale}
        onClick={() => trackLanguageSwitch(locale, targetLocale, pathname)}
        className="locale-switcher__link"
        aria-label={targetLocale === "es" ? "Ver esta página en español" : "View this page in English"}
      >
        {targetLocale.toUpperCase()}
      </Link>
    </div>
  );
}
