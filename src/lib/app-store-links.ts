import { APP_STORE_URL } from "./constants";

export const APP_STORE_PROVIDER_TOKEN = "118607861";

export type AppStoreProductPage = "meeting_alarm" | "never_be_late" | "time_to_leave";

export const APP_STORE_PRODUCT_PAGE_URLS: Record<AppStoreProductPage, string> = {
  meeting_alarm:
    "https://apps.apple.com/us/app/ontimer-calendar-alarm/id6755317601?ppid=db5af490-8ef3-4ad5-b00d-8138ca9375ba",
  never_be_late:
    "https://apps.apple.com/us/app/ontimer-calendar-alarm/id6755317601?ppid=876671b2-2b17-4487-bae8-b23563f8770d",
  time_to_leave:
    "https://apps.apple.com/us/app/ontimer-calendar-alarm/id6755317601?ppid=cef88b49-1b95-4f06-9bbf-9e27119bc113",
};

export interface AppStoreLinkContext {
  location?: string;
  calculatorType?: string;
  ctaVariant?: string;
  productPage?: AppStoreProductPage;
}

const calculatorProductPageUrl = process.env.NEXT_PUBLIC_APP_STORE_CALCULATOR_PRODUCT_PAGE_URL?.trim();

function calculatorFamily(context: AppStoreLinkContext): "leave" | "airport" | "wake" | "cruise" | "until" | null {
  const value = `${context.calculatorType ?? ""} ${context.location ?? ""}`.toLowerCase();
  if (value.includes("airport")) return "airport";
  if (value.includes("cruise")) return "cruise";
  if (value.includes("days_until") || value.includes("days-until")) return "until";
  if (value.includes("wakeup") || value.includes("wake_up") || value.includes("wake-up")) return "wake";
  if (value.includes("leave_time") || value.includes("leave_calculator")) return "leave";
  return null;
}

function productPageForContext(context: AppStoreLinkContext): AppStoreProductPage | null {
  if (context.productPage) return context.productPage;
  const family = calculatorFamily(context);
  return family === "leave" || family === "airport" || family === "cruise"
    ? "time_to_leave"
    : null;
}

function appStoreBaseUrl(context: AppStoreLinkContext): string {
  const productPage = productPageForContext(context);
  if (!productPage) return APP_STORE_URL;
  if (productPage === "time_to_leave" && calculatorFamily(context) && calculatorProductPageUrl) {
    return calculatorProductPageUrl;
  }
  return APP_STORE_PRODUCT_PAGE_URLS[productPage];
}

export function appStoreCampaignToken(context: AppStoreLinkContext): string | null {
  const family = calculatorFamily(context);
  if (!family) {
    const productPage = productPageForContext(context);
    if (productPage === "meeting_alarm") return "web_cpp_meeting";
    if (productPage === "never_be_late") return "web_cpp_never_late";
    if (productPage === "time_to_leave") return "web_cpp_leave";
    return null;
  }

  if (context.ctaVariant === "post_calendar_automatic_alert") {
    return `web_${family}_post_calendar`;
  }
  if (context.ctaVariant === "result_automatic_alert") {
    return `web_${family}_result`;
  }
  if (context.ctaVariant === "result_app_primary_v1") {
    return `web_${family}_result_ap1`;
  }
  return `web_${family}_content`;
}

export function appStoreCampaignUrl(
  campaignToken: string,
  baseUrl: string = APP_STORE_URL,
): string {
  const url = new URL(baseUrl);
  url.searchParams.set("pt", APP_STORE_PROVIDER_TOKEN);
  url.searchParams.set("ct", campaignToken);
  url.searchParams.set("mt", "8");
  return url.toString();
}

/**
 * QR scans arrive at the App Store without a web referrer, so every website QR code
 * carries its own campaign token to keep desktop-to-phone installs attributable.
 */
export function appStoreQrUrl(context: AppStoreLinkContext): string {
  const family = calculatorFamily(context);
  const productPage = productPageForContext(context);
  const campaignToken = family
    ? `web_qr_${family}`
    : productPage
      ? `web_qr_cpp_${productPage === "meeting_alarm" ? "meeting" : productPage === "never_be_late" ? "never_late" : "leave"}`
      : "web_qr_site";
  return appStoreCampaignUrl(campaignToken, appStoreBaseUrl(context));
}

export function appStoreUrlFor(context: AppStoreLinkContext): {
  url: string;
  campaignToken: string | null;
} {
  const campaignToken = appStoreCampaignToken(context);
  const baseUrl = appStoreBaseUrl(context);
  return {
    url: campaignToken ? appStoreCampaignUrl(campaignToken, baseUrl) : baseUrl,
    campaignToken,
  };
}

export const SAVED_CALENDAR_APP_STORE_URL = appStoreCampaignUrl(
  "web_saved_calendar_event",
  APP_STORE_URL,
);
export const SMART_APP_BANNER_APP_STORE_URL = appStoreCampaignUrl(
  "web_smart_banner",
  APP_STORE_URL,
);
