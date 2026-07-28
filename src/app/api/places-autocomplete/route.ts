/// Server-side proxy for Google Places Autocomplete.
///
/// ## Purpose
/// Keeps GOOGLE_MAPS_API_KEY server-side only (never exposed to the client),
/// mirrors the same pattern as /api/travel-time.
///
/// ## Include
/// - Input validation (minimum and maximum lengths enforced server-side)
/// - Same-origin request enforcement and rate limiting before Google is called
/// - Per-request Autocomplete (New) requests without session tokens
/// - Validation of supported place type filters
/// - Minimal field extraction from Places API response
///
/// ## Don't Include
/// - Place Details lookups (not needed — description string is sufficient for Routes API)
/// - Any caching (Google Places content caching is restricted)
///
/// ## Lifecycle & Usage
/// Called by PlaceAutocomplete component on debounced keystrokes (≥3 chars).
/// Returns { predictions: AutocompletePrediction[] } — empty array on any failure.

import { NextRequest, NextResponse } from "next/server";
import {
  includedPrimaryTypesFor,
  isAutocompleteInputEligible,
  requestAutocomplete,
} from "@/lib/places-autocomplete";
import { guardGoogleApiRequest } from "@/lib/api-cost-guard";

const AUTOCOMPLETE_RATE_LIMIT = {
  name: "places-autocomplete",
  perIpLimit: 30,
  perIpWindowMs: 10 * 60 * 1000,
  globalLimit: 1_000,
  globalWindowMs: 60 * 60 * 1000,
};

export async function GET(req: NextRequest) {
  const guard = guardGoogleApiRequest(req, AUTOCOMPLETE_RATE_LIMIT);
  if (!guard.allowed) {
    return NextResponse.json(
      { predictions: [], error: guard.reason },
      {
        status: guard.reason === "rate_limited" ? 429 : 403,
        headers: guard.retryAfterSeconds
          ? { "Retry-After": String(guard.retryAfterSeconds) }
          : undefined,
      }
    );
  }

  const { searchParams } = req.nextUrl;
  const input = (searchParams.get("input") ?? "").trim();
  const types = searchParams.get("types") ?? "geocode";

  // Enforce minimum chars server-side (client also enforces, but defense-in-depth)
  if (!isAutocompleteInputEligible(input) || input.length > 160) {
    return NextResponse.json({ predictions: [] });
  }

  const includedPrimaryTypes = includedPrimaryTypesFor(types);
  if (!includedPrimaryTypes) {
    return NextResponse.json(
      { predictions: [], error: "Invalid types parameter" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("[places-autocomplete] GOOGLE_MAPS_API_KEY not set");
    return NextResponse.json({ predictions: [] });
  }

  try {
    const predictions = await requestAutocomplete(
      input,
      includedPrimaryTypes,
      apiKey
    );

    return NextResponse.json({ predictions });
  } catch {
    // Fail silently — client falls back to manual text entry
    return NextResponse.json({ predictions: [] });
  }
}
