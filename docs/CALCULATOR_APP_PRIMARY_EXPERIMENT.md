# Calculator App-Primary Measured Rollout

## Decision

Run the app-primary result at 100% and evaluate it against the completed historical baseline.

- Experiment ID: `calculator_app_primary_v1`
- Historical baseline: calendar was the primary result action; OnTimer was secondary.
- Rollout: `Get Automatic Alarms` is the primary result action; calendar remains available as `Add this result to Google Calendar`.
- Coverage: all non-Android calculator visitors, regardless of analytics consent. Consent still controls whether GA4 receives measurement.
- Android: excluded because the iPhone app is not available; retain the established calendar/affiliate experience.

The calculated answer is never gated. This test isolates action hierarchy without mixing in calendar collapsing, delayed reveal, or forced App Store clicks.

## Why a Historical Comparison

The Sep 8–Oct 5, 2026 GA4 baseline contained 1,396 users who generated a calculator result, or roughly 50 per day. Splitting that traffic would leave only about 25 daily result users in treatment while installs remain a low-frequency outcome.

The independent baseline was approximately 14 OnTimer CTA users from 1,396 result users, or about 1%. The Apple campaign baseline showed only a small number of result and post-calendar downloads. A 100% rollout accumulates treatment evidence twice as quickly and is appropriate because the answer remains visible and the calendar alternative remains available.

- Use Sep 8–Oct 5 as the fixed 28-day baseline.
- Review direction after 14 complete rollout days.
- Make the primary keep/revert decision after 28 complete rollout days.

This is a before/after measurement, not a causal randomized test. Normalize every outcome by calculator results and report traffic, device, calculator-family, search, and total-install changes that could confound the comparison.

## Measurement

Every calculator event in an eligible session receives:

- `experiment_id=calculator_app_primary_v1`
- `experiment_variant=app_primary`
- `assignment_method=full_rollout`

GA4 receives `experiment_assignment` before the first variant-tagged calculator event in each browser-tab session.

Primary website metric:

- `app_store_outbound_click` users / `calculator_completed` users, by experiment variant.

Supporting metrics:

- `automatic_alert_cta_viewed` users / `calculator_completed` users.
- `automatic_alert_cta_clicked` users / CTA viewers.
- `calendar_handoff_opened` users / `calculator_completed` users.
- Calculator completion and error rates as guardrails.
- Device category, calculator type, and landing/source mix to detect a changed traffic mix versus baseline.

App Store measurement:

- Treatment links use Apple-compliant variant-specific campaign tokens by calculator family, such as `web_airport_result_ap1`. Keep every `ct` token within Apple's 30-character limit.
- App Store Connect attributes impressions, product-page views, downloads, usage, sales, and subscriptions to campaign tokens. A first-time download is credited when it occurs within 24 hours of the campaign-link visit; dashboard metrics appear only after meeting Apple's privacy threshold of five.
- Compare rollout campaign downloads, trial/offer starts, paid conversions, and proceeds with the historical result and post-calendar campaign cohorts in App Store Connect. Report `web_smart_banner` separately and never add it to calculator outcomes. Use RevenueCat for authoritative subscription totals and lifecycle diagnosis, but do not claim that RevenueCat can identify the originating website click unless the app implements a separate attribution/deferred-deep-link integration.
- GA4 outbound clicks are not installs. The website still has no deterministic person-level join to install, onboarding, trial, paid conversion, or MRR; report those as campaign/cohort outcomes unless the app adds a privacy-safe referral join.

## GA4 setup

Use the registered event-scoped custom dimensions for `experiment_id`, `experiment_variant`, and `assignment_method`. Build a closed rollout funnel filtered to `experiment_id=calculator_app_primary_v1`, `experiment_variant=app_primary`, and `assignment_method=full_rollout`. Compare result-normalized outcomes with the fixed Sep 8–Oct 5 baseline and with equivalent weekday/trailing-28-day views.

Confirm the rollout events populate every registered dimension and that the measured result volume reconciles with overall calculator traffic after accounting for consent. Missing dimensions or a material tracking discontinuity blocks the comparison.

Local development can force either UI for QA with `?calculatorCtaVariant=control` or `?calculatorCtaVariant=app_primary`. The override is disabled in production builds.

## Decision rule

Keep app-primary when the 28-day rollout increases attributed App Store outcomes or produces a large, stable outbound lift without a material decrease in calculator completion and without fatal errors, layout regressions, or misleading claims. Calendar handoff loss is expected, but must be reported rather than hidden.
