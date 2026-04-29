import { getRegion } from '../data/geoMapping';
import type { CalculatorState } from '../types/calculator';

async function proxyFetch(endpoint: string, apiKey: string, params?: Record<string, string>) {
  const res = await fetch('/api/revenuecat-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint, apiKey, params }),
  });
  const data = await res.json();
  if (!res.ok) throw Object.assign(new Error('RC API error'), { status: res.status, data });
  return data;
}

export interface RCFetchResult {
  prefill: Partial<CalculatorState>;
  pulledFields: string[];
  projects: Array<{ id: string; name: string }>;
  error: string | null;
}

export async function fetchRevenueCatData(apiKey: string, projectId: string): Promise<RCFetchResult> {
  const prefill: Partial<CalculatorState> = {};
  const pulledFields: string[] = [];
  let error: string | null = null;

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
  const startTime = twelveMonthsAgo.toISOString().split('T')[0];
  const endTime = new Date().toISOString().split('T')[0];

  // Active subscribers
  try {
    const overview = await proxyFetch(`projects/${projectId}/metrics/overview`, apiKey);
    const activeSubs = overview?.metrics?.find?.((m: { id: string }) => m.id === 'active_subscriptions');
    if (activeSubs?.value != null) {
      prefill.activeSubscribers = {
        monthly: Math.round(activeSubs.value * 0.6),
        annual: Math.round(activeSubs.value * 0.35),
        weekly: Math.round(activeSubs.value * 0.03),
        quarterly: Math.round(activeSubs.value * 0.02),
      };
      pulledFields.push('activeSubscribers');
    }
  } catch { /* fall through to manual */ }

  // Churn rate
  try {
    const churnData = await proxyFetch(`projects/${projectId}/metrics/charts/churn_rate`, apiKey, {
      resolution: 'month',
      start_time: startTime,
      end_time: endTime,
    });
    const values: Array<{ date: string; value: number }> = churnData?.values ?? [];
    const latest = values[values.length - 1];
    if (latest?.value != null) {
      const rate = latest.value;
      prefill.monthlyChurnRate = {
        monthly: rate,
        annual: rate,
        weekly: rate,
        quarterly: rate,
      };
      pulledFields.push('monthlyChurnRate');
    }
  } catch { /* fall through */ }

  // Reactivation rate from Active Subscriptions Movement
  try {
    const movement = await proxyFetch(
      `projects/${projectId}/metrics/charts/active_subscriptions_movement`,
      apiKey,
      { resolution: 'month', start_time: startTime, end_time: endTime }
    );
    const values: Array<{ reactivated?: number; churned?: number }> = movement?.values ?? [];
    const totalReactivated = values.reduce((s, v) => s + (v.reactivated ?? 0), 0);
    const totalChurned = values.reduce((s, v) => s + (v.churned ?? 0), 0);
    if (totalChurned > 0) {
      const rate = totalReactivated / totalChurned;
      prefill.actualReactivationRate = {
        monthly: rate,
        annual: rate,
        weekly: rate,
        quarterly: rate,
      };
      pulledFields.push('actualReactivationRate');
    }
  } catch { /* fall through */ }

  // Geography from revenue by country
  try {
    const revenueData = await proxyFetch(`projects/${projectId}/metrics/charts/revenue`, apiKey, {
      group_by: 'country',
      resolution: 'month',
      start_time: startTime,
      end_time: endTime,
    });

    const regionTotals: Record<string, number> = {};
    let grandTotal = 0;

    const segments: Array<{ segment: string; values: Array<{ value: number }> }> =
      revenueData?.segments ?? [];

    for (const seg of segments) {
      const country = seg.segment?.toUpperCase();
      const region = getRegion(country);
      const total = seg.values?.reduce((s: number, v: { value: number }) => s + (v.value ?? 0), 0) ?? 0;
      regionTotals[region] = (regionTotals[region] ?? 0) + total;
      grandTotal += total;
    }

    if (grandTotal > 0) {
      const geoMix: Record<string, number> = {};
      for (const [region, total] of Object.entries(regionTotals)) {
        geoMix[region] = parseFloat((total / grandTotal).toFixed(4));
      }
      // Fill any missing regions with 0
      const allRegions = ['Asia-Pacific', 'IN / SEA', 'Latin America', 'MEA', 'North America', 'ROW', 'Western Europe'];
      for (const r of allRegions) {
        if (geoMix[r] == null) geoMix[r] = 0;
      }
      prefill.geoMix = geoMix;
      pulledFields.push('geoMix');
    }
  } catch { /* fall through */ }

  return { prefill, pulledFields, projects: [], error };
}

export async function fetchProjects(apiKey: string): Promise<{ projects: Array<{ id: string; name: string }>; error: string | null }> {
  try {
    const data = await proxyFetch('projects', apiKey);
    const items: Array<{ id: string; name: string }> = data?.items ?? [];
    return { projects: items, error: null };
  } catch (err: unknown) {
    const e = err as { status?: number };
    if (e.status === 401) return { projects: [], error: 'Invalid API key — check your RevenueCat project settings' };
    if (e.status === 403) return { projects: [], error: 'Live data requires a RevenueCat Pro plan. You can still use the calculator manually.' };
    return { projects: [], error: 'Could not connect to RevenueCat. Check your API key and try again.' };
  }
}
