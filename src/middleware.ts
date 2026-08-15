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

const PRIVATE_MEDICATION_ROUTES = new Set([
  "/provider-medication-schedule",
  "/medication-schedule",
]);

function isAuthorizedMedicationPreview(request: NextRequest): boolean {
  const expectedUsername = process.env.MEDICATION_PREVIEW_USERNAME;
  const expectedPassword = process.env.MEDICATION_PREVIEW_PASSWORD;
  if (!expectedUsername || !expectedPassword) return true;
  return request.cookies.get("ontimer_medication_preview")?.value === btoa(`${expectedUsername}:${expectedPassword}`);
}

export function middleware(request: NextRequest) {
  if (PRIVATE_MEDICATION_ROUTES.has(request.nextUrl.pathname) && !isAuthorizedMedicationPreview(request)) {
    const accessUrl = new URL("/medication-preview-access", request.url);
    accessUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(accessUrl, { headers: { "Cache-Control": "private, no-store" } });
  }

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
