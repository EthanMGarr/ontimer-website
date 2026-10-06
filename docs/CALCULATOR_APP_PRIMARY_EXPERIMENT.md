# Calculator App-Primary Experiment

## Decision

Run a two-arm A/B test, not a multivariate test.

- Experiment ID: `calculator_app_primary_v1`
- Control: calendar is the primary result action; OnTimer is secondary.
- Treatment: `Get Automatic Alarms` is the primary result action; calendar remains available as `Add this result to Google Calendar`.
- Split: 50/50 for analytics-eligible non-Android visitors.
- Android: excluded because the iPhone app is not available; retain the established calendar/affiliate experience.

The calculated answer is never gated. This test isolates action hierarchy without mixing in calendar collapsing, delayed reveal, or forced App Store clicks.

## Why A/B, Not Multivariate

The Sep 8–Oct 5, 2026 GA4 baseline contained 1,396 users who generated a calculator result. A 50/50 test receives roughly 698 result users per arm per 28 days; a three-arm test receives only about 465.

The independent baseline was approximately 14 OnTimer CTA users from 1,396 result users, or about 1%. At that rate:

- Detecting a large increase from 1% to 3% requires roughly 770 users per arm, or a little more than one 28-day traffic cycle at the current total rate.
- Detecting a smaller increase from 1% to 2% requires roughly 2,300 users per arm and would take several months.

Do not call a winner from a handful of clicks. Run at least 28 days and through complete weekly traffic cycles; continue longer unless the treatment produces a large, stable lift with healthy guardrails.

## Measurement

Every calculator event in an eligible session receives:

- `experiment_id=calculator_app_primary_v1`
- `experiment_variant=control|app_primary`
- `assignment_method=stable_local_storage`

GA4 receives `experiment_assignment` before the first variant-tagged calculator event in each browser-tab session.

Primary website metric:

- `app_store_outbound_click` users / `calculator_completed` users, by experiment variant.

Supporting metrics:

- `automatic_alert_cta_viewed` users / `calculator_completed` users.
- `automatic_alert_cta_clicked` users / CTA viewers.
- `calendar_handoff_opened` users / `calculator_completed` users.
- Calculator completion and error rates as guardrails.
- Device category, calculator type, and landing/source mix to detect imbalanced assignment.

App Store measurement:

- Treatment links use variant-specific Apple campaign tokens by calculator family.
- Use App Store Connect campaign reporting for product-page views and downloads where Apple makes them available.
- GA4 outbound clicks are not installs. The website still has no deterministic person-level join to install, onboarding, trial, paid conversion, or MRR; report those as campaign/cohort outcomes unless the app adds a privacy-safe referral join.

## GA4 setup

Register event-scoped custom dimensions for `experiment_id`, `experiment_variant`, and `assignment_method`. Build a closed funnel filtered to `experiment_id=calculator_app_primary_v1`, then compare control and app-primary segments.

Run an A/A validation before interpreting lift: confirm approximately even assignment and comparable calculator-completion rates by variant, device, and calculator family. Any material imbalance or missing variant parameters blocks a decision.

Local development can force either UI for QA with `?calculatorCtaVariant=control` or `?calculatorCtaVariant=app_primary`. The override is disabled in production builds.

## Decision rule

Adopt app-primary only when it increases attributed App Store outcomes or produces a large, stable outbound lift without a material decrease in calculator completion and without fatal errors, layout regressions, or misleading claims. Calendar handoff loss is expected, but must be reported rather than hidden.
