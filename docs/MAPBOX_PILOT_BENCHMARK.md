# Mapbox Pilot Benchmark

Date: 2026-10-01
Scope: General English and Spanish leave-time calculators only
Status: Local comparison; not deployed

## Decision Summary

The local pilot supports a limited production rollout on the two general calculators, behind the existing server-side kill switch. Mapbox Search Box performed at least as well as Google Places in this small search sample and returned the intended top result more often. Both routing providers completed every tested route, but their estimates differed enough that Mapbox routing should remain limited to the pilot surface while real usage and billing are reviewed. Transit and the airport, cruise, and venue calculator families should remain unchanged.

This is not evidence that either provider's travel time is ground truth. It is evidence that Mapbox is operationally viable, search quality is promising, and route differences need monitoring before wider adoption.

## Method

- Eight U.S. address and point-of-interest queries were sent once to Google Places Autocomplete and once through a complete Mapbox Search Box `/suggest` → `/retrieve` session.
- A top search result passed when it contained the expected place and locality tokens. This is a small deterministic relevance check, not a statistical search-quality study.
- Five driving pairs and one walking pair were sent to both providers using identical coordinates and the same departure time, one hour after the test run.
- Google used Routes `TRAFFIC_AWARE` for driving. Mapbox used the `driving-traffic` profile with `depart_at`; walking used each provider's walking mode.
- The calls ran through the website's guarded local API routes. No provider credential or raw Mapbox session identifier was printed or saved.

## Search Results

| Query | Google top result | Mapbox retrieved result | Intended top result |
| --- | --- | --- | --- |
| 1 World Trade Center | 1 World Trade Center, New York | 1 World Trade Center, New York City | Both |
| Empire State Building | Empire State Building, New York | Empire State Building, 20 West 34th Street, New York City | Both |
| Penn Station New York | No result | Laduree, 421 8th Ave, New York City | Neither |
| Space Needle | Space Needle Loop, Seattle | Space Needle, 400 Broad Street, Seattle | Both |
| 1600 Amphitheatre Parkway | 1600 Amphitheatre Parkway, Mountain View | 1600 Amphitheatre Parkway, Mountain View | Both |
| Wrigley Field | Wrigley Field, Athens, Ohio | Wrigley Field, Chicago | Mapbox |
| PortMiami Terminal A | No result | Cruise Terminal A, Miami | Mapbox |
| Newark Liberty Airport Terminal A | EWR Terminal A, Newark | EWR Terminal A Arrivals, Newark | Both |

Summary: Google passed 5/8; Mapbox passed 7/8; both returned HTTP 200 for all provider calls. The Penn Station miss should be addressed with proximity biasing or a targeted regression before treating either provider as universally reliable for ambiguous transit landmarks.

## Routing Results

| Route | Mode | Google | Mapbox | Mapbox minus Google |
| --- | --- | ---: | ---: | ---: |
| Lower Manhattan → Midtown | Driving | 24 min | 19 min | -5 min (-21%) |
| Brooklyn Borough Hall → JFK | Driving | 45 min | 38 min | -7 min (-16%) |
| Santa Monica Pier → LAX | Driving | 53 min | 37 min | -16 min (-30%) |
| Chicago Loop → O'Hare | Driving | 31 min | 27 min | -4 min (-13%) |
| Miami Beach → PortMiami | Driving | 22 min | 25 min | +3 min (+14%) |
| Flatiron Building → Empire State Building | Walking | 14 min | 12 min | -2 min (-14%) |

Both providers succeeded on 6/6 routes. The mean absolute difference was 6 minutes and the maximum was 16 minutes. Mapbox was shorter on four of five driving routes, so a broader routing migration should not be inferred from this one time-of-day sample.

## Current Published Pricing

Pricing was checked against the providers' official pages on 2026-10-01.

- [Mapbox pricing](https://www.mapbox.com/pricing) lists Directions API requests as free through 100,000 monthly requests, then $2.00 per 1,000 for 100,001–500,000 requests.
- The same Mapbox page lists Search Box `/suggest` and `/retrieve` as session-billed. It displays both introductory preview pricing (500 free sessions, then $3.00 per 1,000 through 100,000) and standard pricing (2,500 free, then $11.50 per 1,000 through 100,000). The Mapbox account must confirm which schedule applies before projecting search cost.
- [Google Maps Platform pricing](https://developers.google.com/maps/billing-and-pricing/pricing) lists 10,000 free monthly Autocomplete Request events, then $2.83 per 1,000 through 100,000; Compute Routes Essentials also has 10,000 free monthly events, then $5.00 per 1,000 through 100,000.
- The current Google implementation is billed per autocomplete request. The Mapbox pilot groups repeated suggestions and the selected retrieval into one Search Box session.

Mapbox therefore nearly eliminates routing expense at the website's current scale if monthly route requests remain below 100,000. Search savings cannot be stated from the projected Google dollar amount alone: they depend on the Google SKU/request breakdown, average Google requests per completed field, completed versus abandoned Mapbox sessions, and whether introductory or standard Mapbox Search Box pricing applies.

## Recommended Rollout

1. Enable the existing Mapbox flag only for the English and Spanish general leave-time calculators.
2. Keep transit on Google and keep the airport, cruise, and venue calculators unchanged.
3. Before deployment, add the server-side token and flag to the production environment, confirm Mapbox's applicable Search Box price schedule, and set provider usage/budget alerts.
4. After deployment, reconcile Search Box sessions and Directions requests in the Mapbox dashboard; application logs are not billing records.
5. Review one week of manual-fallback rate, route complaints, and actual provider charges before expanding the pilot.
6. Treat a wider Mapbox routing migration as a separate decision after a multi-time-window comparison, particularly for airport routes where an optimistic estimate has higher consequences.

## Verification Evidence

- Search: 8 Google calls, 8 Mapbox suggest calls, and 8 Mapbox retrieve calls; zero HTTP failures.
- Routing: 6 Google and 6 Mapbox calls; zero HTTP failures.
- Browser: calculator rendered successfully after the benchmark with no browser exceptions.
- Server: route logs recorded only provider, mode, duration, traffic availability, and status; Mapbox request URLs did not expose entered locations or session identifiers.
