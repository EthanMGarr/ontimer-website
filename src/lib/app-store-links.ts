import { APP_STORE_URL } from "./constants";

export const APP_STORE_PROVIDER_TOKEN = "118607861";

export interface AppStoreLinkContext {
  location?: string;
  calculatorType?: string;
  ctaVariant?: string;
}

const calculatorProductPageUrl =
  process.env.NEXT_PUBLIC_APP_STORE_CALCULATOR_PRODUCT_PAGE_URL?.trim() || APP_STORE_URL;

function calculatorFamily(context: AppStoreLinkContext): "leave" | "airport" | "wake" | null {
  const value = `${context.calculatorType ?? ""} ${context.location ?? ""}`.toLowerCase();
  if (value.includes("airport")) return "airport";
  if (value.includes("wakeup") || value.includes("wake_up") || value.includes("wake-up")) return "wake";
  if (value.includes("leave_time") || value.includes("leave_calculator")) return "leave";
  return null;
}

export function appStoreCampaignToken(context: AppStoreLinkContext): string | null {
  const family = calculatorFamily(context);
  if (!family) return null;

  if (context.ctaVariant === "post_calendar_automatic_alert") {
    return `web_${family}_post_calendar`;
  }
  if (context.ctaVariant === "result_automatic_alert") {
    return `web_${family}_result`;
  }
  return `web_${family}_content`;
}

export function appStoreCampaignUrl(
  campaignToken: string,
  baseUrl: string = calculatorProductPageUrl,
): string {
  const url = new URL(baseUrl);
  url.searchParams.set("pt", APP_STORE_PROVIDER_TOKEN);
  url.searchParams.set("ct", campaignToken);
  url.searchParams.set("mt", "8");
  return url.toString();
}

export function appStoreUrlFor(context: AppStoreLinkContext): {
  url: string;
  campaignToken: string | null;
} {
  const campaignToken = appStoreCampaignToken(context);
  return {
    url: campaignToken ? appStoreCampaignUrl(campaignToken) : APP_STORE_URL,
    campaignToken,
  };
}

export const SAVED_CALENDAR_APP_STORE_URL = appStoreCampaignUrl("web_saved_calendar_event");
