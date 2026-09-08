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
  const label = targetLocale === "es" ? "Español" : "English";

  return (
    <Link
      href={alternatePath}
      hrefLang={targetLocale}
      lang={targetLocale}
      onClick={() => trackLanguageSwitch(locale, targetLocale, pathname)}
      className={compact
        ? "text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
        : "inline-flex min-h-10 items-center rounded-full border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"}
      aria-label={targetLocale === "es" ? "Ver esta página en español" : "View this page in English"}
    >
      {label}
    </Link>
  );
}
