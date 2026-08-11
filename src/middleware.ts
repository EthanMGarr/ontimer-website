import { NextResponse, type NextRequest } from "next/server";

// EU27 + EEA (IS, LI, NO) + UK (GB) + Switzerland (CH, FADP) — the regions
// where prior consent is required before loading non-essential analytics
// cookies (GDPR / UK GDPR / ePrivacy / FADP). US and other visitors are left
// untouched.
const CONSENT_REQUIRED_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
  "IS", "LI", "NO",
  "GB",
  "CH",
]);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const country = request.headers.get("x-vercel-ip-country") ?? "";
  const regulated = CONSENT_REQUIRED_COUNTRIES.has(country.toUpperCase());

  response.cookies.set("ontimer_region", regulated ? "regulated" : "other", {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
};
