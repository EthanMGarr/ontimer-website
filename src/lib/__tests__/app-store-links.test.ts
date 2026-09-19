import assert from "node:assert/strict";
import {
  APP_STORE_PROVIDER_TOKEN,
  appStoreCampaignToken,
  appStoreCampaignUrl,
  appStoreUrlFor,
  SAVED_CALENDAR_APP_STORE_URL,
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
assert.equal(appStoreCampaignToken({ location: "footer" }), null);

const campaignUrl = new URL(appStoreCampaignUrl("web_leave_result"));
assert.equal(campaignUrl.searchParams.get("pt"), "118607861");
assert.equal(campaignUrl.searchParams.get("ct"), "web_leave_result");
assert.equal(campaignUrl.searchParams.get("mt"), "8");
assert.match(SAVED_CALENDAR_APP_STORE_URL, /ct=web_saved_calendar_event/);
assert.equal(appStoreUrlFor({ location: "footer" }).campaignToken, null);

console.log("App Store campaign link tests passed.");
