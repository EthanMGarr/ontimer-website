/// Server-side proxy for Google Places Autocomplete.
///
/// ## Purpose
/// Keeps GOOGLE_MAPS_API_KEY server-side only (never exposed to the client),
/// mirrors the same pattern as /api/travel-time.
///
/// ## Include
/// - Input validation (min chars enforced server-side)
/// - Session token passthrough for billing grouping
/// - Minimal field extraction from Places API response
///
/// ## Don't Include
/// - Place Details lookups (not needed — description string is sufficient for Routes API)
/// - Any caching (autocomplete results are ephemeral / session-scoped)
///
/// ## Lifecycle & Usage
/// Called by PlaceAutocomplete component on debounced keystrokes (≥3 chars).
/// Returns { predictions: AutocompletePrediction[] } — empty array on any failure.

import { NextRequest, NextResponse } from "next/server";

export interface AutocompletePrediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const input = (searchParams.get("input") ?? "").trim();
  const sessiontoken = (searchParams.get("sessiontoken") ?? "").trim();
  const types = searchParams.get("types") ?? "geocode";

  // Enforce minimum chars server-side (client also enforces, but defense-in-depth)
  if (input.length < 3) {
    return NextResponse.json({ predictions: [] });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("[places-autocomplete] GOOGLE_MAPS_API_KEY not set");
    return NextResponse.json({ predictions: [] });
  }

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json"
  );
  url.searchParams.set("input", input);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("types", types);
  url.searchParams.set("language", "en");
  if (sessiontoken) url.searchParams.set("sessiontoken", sessiontoken);

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ predictions: [] });
    }

    const data = (await res.json()) as {
      predictions?: Array<{
        place_id: string;
        description: string;
        structured_formatting?: {
          main_text?: string;
          secondary_text?: string;
        };
      }>;
      status?: string;
    };

    // Treat ZERO_RESULTS as success with empty list; anything else is an error
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      return NextResponse.json({ predictions: [] });
    }

    const predictions: AutocompletePrediction[] = (data.predictions ?? []).map(
      (p) => ({
        placeId: p.place_id,
        description: p.description,
        mainText: p.structured_formatting?.main_text ?? p.description,
        secondaryText: p.structured_formatting?.secondary_text ?? "",
      })
    );

    return NextResponse.json({ predictions });
  } catch {
    // Fail silently — client falls back to manual text entry
    return NextResponse.json({ predictions: [] });
  }
}
