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
/// Called by PlaceAutocomplete component on debounced input (at least 4 chars).
/// Returns { predictions: AutocompletePrediction[] } — empty array on any failure.

import { NextRequest, NextResponse } from "next/server";
import {
  includedPrimaryTypesFor,
  isAutocompleteInputEligible,
  requestAutocomplete,
  shouldRequestPaidAutocomplete,
} from "@/lib/places-autocomplete";
import { guardGoogleApiRequest } from "@/lib/api-cost-guard";
import { travelLocations } from "@/lib/travel-locations";

const AUTOCOMPLETE_RATE_LIMIT = {
  name: "places-autocomplete",
  // A normal calculator visit usually needs fewer than 10 lookups across both
  // fields. Keep ample room for retries while bounding automated typing loops.
  perIpLimit: 60,
  perIpWindowMs: 60 * 60 * 1000,
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

  if (types === "airport" || types === "cruise-terminal") {
    const query = input.toLowerCase();
    const localKind = types === "airport" ? "airport" : "cruise-terminal";
    const localPredictions = travelLocations
      .filter((location) => location.kind === localKind)
      .filter((location) => {
        const searchable = [
          location.code,
          location.name,
          location.shortName,
          location.city,
          ...(location.aliases ?? []),
        ];
        return searchable.some((value) => value.toLowerCase().startsWith(query));
      })
      .sort((a, b) => {
        const aExact = a.code.toLowerCase() === query ? 1 : 0;
        const bExact = b.code.toLowerCase() === query ? 1 : 0;
        return bExact - aExact || (b.popularity ?? 0) - (a.popularity ?? 0);
      })
      .slice(0, 6)
      .map((location) => ({
        placeId: `${localKind}-${location.code.toLowerCase()}`,
        description: location.calculatorDestination,
        mainText: `${location.code} · ${location.shortName}`,
        secondaryText: location.city,
      }));

    if (localPredictions.length > 0 || !shouldRequestPaidAutocomplete(input, types)) {
      return NextResponse.json({ predictions: localPredictions });
    }
  }

  // Enforce minimum chars server-side (client also enforces, but defense-in-depth)
  if (!isAutocompleteInputEligible(input) || input.length > 160) {
    return NextResponse.json({ predictions: [] });
  }

  const includedPrimaryTypes = includedPrimaryTypesFor(
    types === "airport" || types === "cruise-terminal" ? "establishment" : types
  );
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
