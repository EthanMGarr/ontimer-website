# Google API Cost-Safety Checklist

Use this checklist whenever adding or changing a paid API integration.

## Application Controls

- [ ] Paid API keys remain server-side.
- [ ] Public proxy routes reject requests without same-origin browser provenance.
- [ ] Paid endpoints have per-IP and global rate limits before any upstream call.
- [ ] Inputs have strict minimum, maximum, and enum validation.
- [ ] User actions make at most one paid upstream request unless a retry is explicitly cost-justified.
- [ ] Autocomplete is debounced, starts only after four meaningful characters, cancels stale requests, and avoids Place Details calls unless needed.
- [ ] In-memory serverless caches are described as best-effort only, never as cross-instance cost controls.
- [ ] Failure paths degrade to manual entry rather than multiplying paid requests.
- [ ] Rate-limit and provenance behavior has automated regression coverage.

## Google Cloud Controls

- [ ] Restrict the API key to only the required APIs.
- [ ] Set low daily or per-minute quotas independently for Places API (New) and Routes API.
- [ ] Review Billing Reports grouped by **Service**, then **SKU**, before attributing spend to traffic or SEO.
- [ ] Confirm whether an alert is based on actual or forecasted spend.
- [ ] Remember that a standard budget alert does not stop Google Maps Platform spending.
- [ ] Keep alert thresholds below the true maximum because billing data is delayed.
- [ ] Review quota and billing graphs after every paid-API deployment.

## Incident Response

- [ ] Capture the budget period, threshold type, project scope, service, SKU, daily cost, and request count.
- [ ] If spend is still accelerating, temporarily disable the affected API or set its quota to zero in Google Cloud.
- [ ] Deploy application-side request guards before restoring quota.
- [ ] Verify blocked direct requests do not reach Google.
- [ ] Verify a legitimate same-origin request still works.
- [ ] Record the cause, controls, deployment, and verification in `docs/SITE_CHANGELOG.md`.
