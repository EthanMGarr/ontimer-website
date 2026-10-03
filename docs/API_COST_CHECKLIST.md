# Paid API Cost-Safety Checklist

Use this checklist whenever adding or changing a paid API integration.

## Application Controls

- [ ] Paid API keys remain server-side.
- [ ] Public proxy routes reject requests without same-origin browser provenance.
- [ ] Paid endpoints have per-IP and global rate limits before any upstream call.
- [ ] Inputs have strict minimum, maximum, and enum validation.
- [ ] User actions make at most one paid upstream request unless a retry is explicitly cost-justified.
- [ ] Autocomplete uses a responsive trailing debounce, starts only after four meaningful characters while the field is focused and actively edited, gives pasted complete addresses a slightly longer pause, cancels stale requests immediately on every edit, shows pending feedback, and avoids Place Details calls unless needed.
- [ ] Known structured destinations such as airports, cruise terminals, and curated event venues use the local catalog before paid autocomplete or destination geocoding.
- [ ] Public autocomplete endpoints have a generous hourly per-IP ceiling that preserves normal use while bounding automated typing loops.
- [ ] In-memory serverless caches are described as best-effort only, never as cross-instance cost controls.
- [ ] Failure paths degrade to manual entry rather than multiplying paid requests.
- [ ] Upstream failures are logged with sanitized provider status/reason fields; never log API keys or user-entered locations.
- [ ] Temporary autocomplete diagnostics auto-expire and emit sanitized request health using only input length, route path without query parameters, and a short hash of an ephemeral page-session identifier; never log the raw identifier, IP address, input, place ID, or full referrer.
- [ ] Rate-limit and provenance behavior has automated regression coverage.
- [ ] Provider credentials use documented authenticated endpoints; undocumented free endpoints are not retained as fallback paths.
- [ ] Provider attribution and evidence labels distinguish third-party estimates from official government or operator data.
- [ ] A provider kill switch and a useful providerless fallback are verified.

## Provider Account Controls

- [ ] Confirm the purchased plan, renewal date, request allowance, overage behavior, and cancellation path in the provider account.
- [ ] Enable provider-side request limits or alerts when offered.
- [ ] Review provider usage after deployment and again before the first renewal.
- [ ] Record the service and environment owning each production credential without storing the credential in documentation.

## Event Provider Controls

- [ ] Keep Ticketmaster credentials server-only and expose a provider kill switch that falls back to reviewed records.
- [ ] Use the lower current documented request rate when Ticketmaster's FAQ and API reference disagree, and remain within the 5,000-request daily default.
- [ ] Cache venue/event discovery for a reasonable service period rather than requesting provider data on every page view.
- [ ] Preserve source IDs, source URLs, provider status, and freshness timestamps without logging raw responses or credentials.
- [ ] Maintain a documented process to remove requested Ticketmaster Event Content within 24 hours and to disable or purge provider-backed content if access terminates.
- [ ] Keep provider-backed pages out of the sitemap and non-indexable until commercial-use, storage, attribution, privacy, and legal-review gates are explicitly cleared.
- [ ] Emit one sanitized structured health record for each upstream attempt, including endpoint class, success/failure, latency, and available rate-limit headers; never log the API key or full query string.
- [ ] Treat the structured `quotaUnits` field as an application-side request counter only. Reconcile it with Ticketmaster's provider dashboard because cached fetches and serverless logs cannot prove billable provider usage by themselves.
- [ ] During the five-venue pilot, review provider usage and failures after deployment, after the first full six-hour refresh window, and weekly thereafter. Escalate repeated failures, unexpected request growth, or remaining quota below the operating threshold chosen by the account owner.

## Google Cloud Controls

- [ ] Restrict the API key to only the required APIs.
- [ ] Set low daily or per-minute quotas independently for Places API (New) and Routes API.
- [ ] Do not describe warm-instance counters as durable protection. Use a provider quota as the hard ceiling unless a distributed rate limiter or platform firewall is available; validate shared-IP and multi-region behavior before enforcing a new edge rule.
- [ ] Review Billing Reports grouped by **Service**, then **SKU**, before attributing spend to traffic or SEO.
- [ ] Confirm whether an alert is based on actual or forecasted spend.
- [ ] Remember that a standard budget alert does not stop Google Maps Platform spending.
- [ ] Keep alert thresholds below the true maximum because billing data is delayed.
- [ ] Review quota and billing graphs after every paid-API deployment.
- [ ] Confirm the project that owns the deployed credential by project number; do not assume the active CLI or billing-console project owns the key.

## Mapbox Search and Directions Controls

- [ ] Keep the access token server-side, scope it only to required public APIs, and set provider usage alerts before enabling the pilot.
- [ ] Send user-entered locations, retrieved place identifiers, coordinates, and Search Box session tokens in POST bodies rather than query strings so routine access logs do not retain them in request URLs.
- [ ] Use a distinct UUID-style Search Box session token for each active field, reuse it for `/suggest` and the selected `/retrieve`, and rotate it after selection; do not add ETA parameters that create Matrix API charges.
- [ ] Treat Search Box results as temporary data: use retrieved coordinates only for the immediate route calculation and do not persist them in calendar links, analytics, logs, or application storage.
- [ ] Account for Search Box geography coverage (United States, Canada, and Europe); preserve manual text entry and the one-call Google route fallback for unsupported or unselected locations.
- [ ] Use Mapbox Directions only when both endpoints already have validated coordinates. Do not turn one calculation into two forward-geocoding requests plus a route request.
- [ ] Keep transit on a provider that supports transit routing, and make the Mapbox pilot flag a server-side kill switch.
- [ ] Give every temporary Mapbox production pilot a required server-side expiry timestamp, enforce it in both the rendered provider choice and paid API routes, and fail closed when it is missing or reached.
- [ ] Never retry a failed Mapbox request against Google in the same user action. Fall back to manual travel-time entry so an outage cannot double provider costs.
- [ ] Reconcile Search Box sessions and Directions requests in the Mapbox dashboard after deployment; application request counters are not billing records.
- [ ] Treat Mapbox usage notifications as email alerts only: Mapbox does not provide a customer-configurable spending cap that stops service. Keep the production kill switch off until billing, token isolation, notification thresholds, and a deliberate hard-stop mechanism are reviewed.
- [ ] Do not infer Search Box cost from completed calculations or Directions volume. Audit when sessions are created, rotated, retrieved, and abandoned because browsing and partially completed inputs can consume sessions without producing a route.
- [ ] Do not re-enable Mapbox Search Box after an unexpected usage spike until the provider dashboard has been reconciled and a measurable application-side volume breaker can disable new Mapbox sessions independently of the pilot expiry.

## Incident Response

- [ ] Capture the budget period, threshold type, project scope, service, SKU, daily cost, and request count.
- [ ] If spend is still accelerating, temporarily disable the affected API or set its quota to zero in Google Cloud.
- [ ] When a Mapbox usage alert crosses the approved operating threshold, disable the application kill switch immediately; the alert itself is not a hard cap.
- [ ] Deploy application-side request guards before restoring quota.
- [ ] Verify blocked direct requests do not reach Google.
- [ ] Verify a legitimate same-origin request still works.
- [ ] Record the cause, controls, deployment, and verification in `docs/SITE_CHANGELOG.md`.
