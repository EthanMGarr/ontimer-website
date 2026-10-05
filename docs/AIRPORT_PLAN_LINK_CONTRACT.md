# Airport Plan Link Contract

This document defines the version 1 URL contract shared by the OnTimer website and iOS app. The app may parse these links from calendar-event descriptions to recognize an airport plan and recalculate its leave time with live traffic.

## Compatibility Rules

- `v=1` is required. Readers must ignore versions they do not support.
- Query parameter names and enum values are case-sensitive. IATA values are uppercase.
- Times are UTC ISO 8601 timestamps with seconds and a `Z` suffix, for example `2026-10-12T14:59:00Z`. Offset timestamps and fractional seconds are not part of v1.
- Readers ignore unknown or invalid parameters silently. Writers must not add undocumented parameters to v1.
- The calendar description uses three blocks separated by blank lines: the OnTimer attribution, the recalculation link, and the automatic-alarm message.
- Departure links are labeled `Recalculate Leave Time: <url>` in English or `Recalcular hora de salida: <url>` in Spanish. Pickup links are labeled `Recalculate Pickup Time: <url>`. Readers should recognize the canonical URL and its `v=1` and `k` values rather than relying only on mutable presentation copy.
- The English attribution is `Calculated by OnTimer - Never be late`. Calculators emit this block before the recalculation link.

## Departure Link

```text
https://www.ontimer.app/airport-time-to-leave-calculator?v=1&k=dep&a=<IATA>&dep=<UTC ISO>&ft=<dom|intl>&bag=<0|1>&m=<parking|rideshare|dropoff|transit>
```

Spanish departure pages use this path with the same query parameters:

```text
https://www.ontimer.app/es/calculadora-cuando-salir-al-aeropuerto?v=1&k=dep&...
```

| Parameter | Meaning |
| --- | --- |
| `v` | Contract version; always `1` |
| `k` | Plan kind; `dep` |
| `a` | Three-letter IATA code, when known |
| `an` | Airport name fallback; used only when `a` is unavailable |
| `dep` | Scheduled flight departure time in UTC |
| `ft` | `dom` for domestic or `intl` for international |
| `bag` | `1` when checking a bag; otherwise `0` |
| `m` | Airport arrival mode |

## Pickup Link

```text
https://www.ontimer.app/airport-pickup-time-calculator?v=1&k=pick&a=<IATA>&land=<UTC ISO>&ft=<dom|intl>&bag=<0|1>&meet=<inside|curb>
```

| Parameter | Meaning |
| --- | --- |
| `v` | Contract version; always `1` |
| `k` | Plan kind; `pick` |
| `a` | Three-letter IATA code, when known |
| `an` | Airport name fallback; used only when `a` is unavailable |
| `land` | Scheduled landing time in UTC |
| `ft` | `dom` for domestic or `intl` for international |
| `bag` | `1` when the arriving passenger is checking a bag; otherwise `0` |
| `meet` | `inside` or `curb` |

## Privacy Boundary

These links contain only the airport plan inputs above. They must never contain an origin or home address, current-location coordinates, pickup relationship, TSA PreCheck or CLEAR selection, manual travel time, manual security time, or buffer override.

## Website Behavior

When a supported v1 link opens, the calculator prefills valid matching fields and converts the UTC timestamp to the visitor's local date and time. It does not calculate until the visitor supplies an origin and chooses Calculate.

All airport departure calculators emit departure links, including generic, airport-specific, and Spanish pages. All airport pickup calculators emit pickup links. The generic calculator for each family accepts its matching links; the pickup calculator also continues to accept its legacy `?airport=` query.
