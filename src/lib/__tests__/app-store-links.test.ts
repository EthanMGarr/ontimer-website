import assert from "node:assert/strict";
import { appStoreQrUrl,
  APP_STORE_PROVIDER_TOKEN,
  APP_STORE_PRODUCT_PAGE_URLS,
  appStoreCampaignToken,
  appStoreCampaignUrl,
  appStoreUrlFor,
  SAVED_CALENDAR_APP_STORE_URL,
  SMART_APP_BANNER_APP_STORE_URL,
} from "../app-store-links";

assert.equal(APP_STORE_PROVIDER_TOKEN, "118607861");
assert.equal(appStoreCampaignToken({
  calculatorType: "leave_time",
  location: "leave_calculator_result",
  ctaVariant: "post_calendar_automatic_alert",
}), "web_leave_post_calendar");
assert.equal(appStoreCampaignToken({
  calculatorType: "airport_leave_time",
  location: "airport_ewr_result",
  ctaVariant: "result_automatic_alert",
}), "web_airport_result");
assert.equal(appStoreCampaignToken({ location: "wakeup_calculator_final_cta" }), "web_wake_content");
assert.equal(appStoreCampaignToken({
  calculatorType: "cruise_leave_time",
  location: "cruise_result",
  ctaVariant: "result_app_primary_v1",
}), "web_cruise_result_ap1");
assert.equal(appStoreCampaignToken({
  calculatorType: "days_until",
  location: "days_until_result",
  ctaVariant: "result_app_primary_v1",
}), "web_until_result_ap1");
assert.equal(appStoreCampaignToken({ location: "footer" }), null);
assert.equal(appStoreCampaignToken({ productPage: "meeting_alarm" }), "web_cpp_meeting");
assert.equal(appStoreCampaignToken({ productPage: "never_be_late" }), "web_cpp_never_late");
assert.equal(appStoreCampaignToken({ productPage: "time_to_leave" }), "web_cpp_leave");

for (const calculatorType of ["leave_time", "airport_leave_time", "wake_up", "cruise_leave_time", "days_until"]) {
  const token = appStoreCampaignToken({ calculatorType, ctaVariant: "result_app_primary_v1" });
  assert.ok(token && token.length <= 30, `${calculatorType} treatment token must fit Apple's 30-character limit`);
}

const campaignUrl = new URL(appStoreCampaignUrl("web_leave_result"));
assert.equal(campaignUrl.searchParams.get("pt"), "118607861");
assert.equal(campaignUrl.searchParams.get("ct"), "web_leave_result");
assert.equal(campaignUrl.searchParams.get("mt"), "8");
assert.match(SAVED_CALENDAR_APP_STORE_URL, /ct=web_saved_calendar_event/);
const smartBannerUrl = new URL(SMART_APP_BANNER_APP_STORE_URL);
assert.equal(smartBannerUrl.origin + smartBannerUrl.pathname, "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601");
assert.equal(smartBannerUrl.searchParams.get("pt"), APP_STORE_PROVIDER_TOKEN);
assert.equal(smartBannerUrl.searchParams.get("ct"), "web_smart_banner");
assert.equal(smartBannerUrl.searchParams.get("mt"), "8");
assert.equal(appStoreUrlFor({ location: "footer" }).campaignToken, null);

for (const productPage of ["meeting_alarm", "never_be_late", "time_to_leave"] as const) {
  const productPageUrl = new URL(appStoreUrlFor({ productPage }).url);
  const expectedUrl = new URL(APP_STORE_PRODUCT_PAGE_URLS[productPage]);
  assert.equal(productPageUrl.searchParams.get("ppid"), expectedUrl.searchParams.get("ppid"));
  assert.equal(productPageUrl.searchParams.get("pt"), APP_STORE_PROVIDER_TOKEN);
  assert.ok(productPageUrl.searchParams.get("ct")?.startsWith("web_cpp_"));
  assert.equal(productPageUrl.searchParams.get("mt"), "8");
}

const leaveCalculatorUrl = new URL(appStoreUrlFor({ location: "leave_calculator_conversion" }).url);
assert.equal(
  leaveCalculatorUrl.searchParams.get("ppid"),
  new URL(APP_STORE_PRODUCT_PAGE_URLS.time_to_leave).searchParams.get("ppid"),
);
assert.equal(leaveCalculatorUrl.searchParams.get("ct"), "web_leave_content");

const siteQrUrl = new URL(appStoreQrUrl({ location: "homepage_hero" }));
assert.equal(siteQrUrl.searchParams.get("ct"), "web_qr_site");
assert.equal(siteQrUrl.searchParams.get("pt"), APP_STORE_PROVIDER_TOKEN);
assert.equal(new URL(appStoreQrUrl({ location: "airport_lax_result" })).searchParams.get("ct"), "web_qr_airport");
assert.equal(new URL(appStoreQrUrl({ location: "leave_calculator_result" })).searchParams.get("ct"), "web_qr_leave");
assert.equal(
  new URL(appStoreQrUrl({ productPage: "meeting_alarm" })).searchParams.get("ppid"),
  new URL(APP_STORE_PRODUCT_PAGE_URLS.meeting_alarm).searchParams.get("ppid"),
);
assert.equal(
  new URL(appStoreQrUrl({ productPage: "never_be_late" })).searchParams.get("ct"),
  "web_qr_cpp_never_late",
);

console.log("App Store campaign link tests passed.");
