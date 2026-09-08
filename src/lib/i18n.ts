export const locales = ["en", "es"] as const;

export type SiteLocale = (typeof locales)[number];

export const defaultLocale: SiteLocale = "en";

const localizedRoutePairs = [
  ["/what-time-should-i-leave", "/es/calculadora-a-que-hora-salir"],
  ["/airport-time-to-leave-calculator", "/es/calculadora-cuando-salir-al-aeropuerto"],
] as const;

export const spanishAirportSlugs = [
  "madrid-barajas-mad",
  "barcelona-el-prat-bcn",
  "mexico-city-mex",
  "bogota-el-dorado-bog",
  "lima-jorge-chavez-lim",
  "santiago-scl",
] as const;

const spanishAirportSlugSet = new Set<string>(spanishAirportSlugs);

const routeAlternates = new Map<string, string>(
  localizedRoutePairs.flatMap(([englishPath, spanishPath]) => [
    [englishPath, spanishPath],
    [spanishPath, englishPath],
  ])
);

export function localeForPathname(pathname: string): SiteLocale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

export function alternateLocalePath(pathname: string): string | null {
  const directAlternate = routeAlternates.get(pathname);
  if (directAlternate) return directAlternate;

  const englishAirportMatch = pathname.match(/^\/airport-time-to-leave\/([^/]+)$/);
  if (englishAirportMatch && spanishAirportSlugSet.has(englishAirportMatch[1])) {
    return `/es/aeropuerto/${englishAirportMatch[1]}`;
  }

  const spanishAirportMatch = pathname.match(/^\/es\/aeropuerto\/([^/]+)$/);
  if (spanishAirportMatch && spanishAirportSlugSet.has(spanishAirportMatch[1])) {
    return `/airport-time-to-leave/${spanishAirportMatch[1]}`;
  }

  return null;
}

export function localizedAlternates(englishPath: string, spanishPath: string) {
  return {
    languages: {
      en: `https://www.ontimer.app${englishPath}`,
      es: `https://www.ontimer.app${spanishPath}`,
      "x-default": `https://www.ontimer.app${englishPath}`,
    },
  };
}
