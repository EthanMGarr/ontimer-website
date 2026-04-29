import { useMemo } from 'react';
import {
  SOSA_CATEGORY_DATA,
  SOSA_PRICE_TIERS,
  PRICE_TIER_THRESHOLDS,
  SOSA_GEO_DATA,
  HOLD_PERIOD_MONTHS,
} from '../data/sosa2026';
import type { CalculatorState, CalcResults, PlanType } from '../types/calculator';

const PLANS: PlanType[] = ['monthly', 'annual', 'weekly', 'quarterly'];

export type PriceTier = 'low' | 'mid' | 'high';

export function getPriceTier(plan: PlanType, price: number): PriceTier {
  let effectivePrice = price;
  if (plan === 'quarterly') {
    // annualise quarterly price ×4, then use annual thresholds
    effectivePrice = price * 4;
    const { low, high } = PRICE_TIER_THRESHOLDS.annual;
    if (effectivePrice < low) return 'low';
    if (effectivePrice > high) return 'high';
    return 'mid';
  }
  const { low, high } = PRICE_TIER_THRESHOLDS[plan];
  if (price < low) return 'low';
  if (price > high) return 'high';
  return 'mid';
}

// Step 1: category base rate
function getCategoryRate(category: string, plan: PlanType): number {
  const data = SOSA_CATEGORY_DATA[category] ?? SOSA_CATEGORY_DATA['All Categories'];
  if (plan === 'quarterly') return data.monthly; // quarterly uses monthly as proxy
  return data[plan];
}

// Step 2: price tier multiplier vs mid-tier baseline
function getPriceTierMultiplier(plan: PlanType, price: number | null): number {
  if (price === null) return 1;
  const tier = getPriceTier(plan, price);
  const tierKey = plan === 'quarterly' ? 'monthly' : plan;
  const rates = SOSA_PRICE_TIERS[tierKey as keyof typeof SOSA_PRICE_TIERS];
  return rates[tier] / rates['mid'];
}

// Step 3: geography multiplier
function getGeoMultiplier(geoMix: Record<string, number>, plan: PlanType): number {
  let weightedMonthly = 0;
  let weightedAnnual = 0;

  for (const [region, weight] of Object.entries(geoMix)) {
    const geoData = SOSA_GEO_DATA[region];
    if (!geoData) continue;
    weightedMonthly += weight * geoData.monthly;
    weightedAnnual += weight * geoData.annual;
  }

  if (plan === 'annual') return weightedAnnual / 0.052;
  if (plan === 'monthly') return weightedMonthly / 0.201;
  if (plan === 'weekly') return weightedMonthly / 0.090;
  return weightedMonthly / 0.201; // quarterly uses monthly geo proxy
}

function zeroPlan(): Record<PlanType, number> {
  return { monthly: 0, annual: 0, weekly: 0, quarterly: 0 };
}

export function calculateResults(state: CalculatorState): CalcResults {
  const { category, prices, geoMix, activeSubscribers, monthlyChurnRate, actualReactivationRate, campaignTargetRate } = state;

  const benchmarkRate = zeroPlan();
  const effectiveRate = zeroPlan();
  const churnedPool = zeroPlan();
  const organicReactivations = zeroPlan();
  const organicRevenue = zeroPlan();
  const additionalReactivations = zeroPlan();
  const additionalRevenue = zeroPlan();

  for (const plan of PLANS) {
    const price = prices[plan];
    if (price === null) continue;

    // Steps 1-3
    const catRate = getCategoryRate(category || 'All Categories', plan);
    const tierMult = getPriceTierMultiplier(plan, price);
    const geoMult = getGeoMultiplier(geoMix, plan);
    benchmarkRate[plan] = catRate * tierMult * geoMult;

    // Step 4
    effectiveRate[plan] = actualReactivationRate[plan] ?? benchmarkRate[plan];

    // Step 5
    const subs = activeSubscribers[plan] ?? 0;
    const churn = monthlyChurnRate[plan] ?? 0;
    const monthlyChurned = plan === 'quarterly'
      ? subs * (churn / 3)
      : subs * churn;
    churnedPool[plan] = monthlyChurned * 12;

    // Step 6
    organicReactivations[plan] = Math.round(churnedPool[plan] * effectiveRate[plan]);

    // Step 7
    const holdMonths = HOLD_PERIOD_MONTHS[plan];
    if (plan === 'annual') {
      organicRevenue[plan] = organicReactivations[plan] * price;
    } else {
      organicRevenue[plan] = organicReactivations[plan] * price * holdMonths;
    }

    // Step 8
    const incrementalRate = Math.max(0, campaignTargetRate - effectiveRate[plan]);
    additionalReactivations[plan] = Math.round(churnedPool[plan] * incrementalRate);
    if (plan === 'annual') {
      additionalRevenue[plan] = additionalReactivations[plan] * price;
    } else {
      additionalRevenue[plan] = additionalReactivations[plan] * price * holdMonths;
    }
  }

  const totalChurnedPool = PLANS.reduce((s, p) => s + churnedPool[p], 0);
  const totalOrganicReactivations = PLANS.reduce((s, p) => s + organicReactivations[p], 0);
  const totalOrganicRevenue = PLANS.reduce((s, p) => s + organicRevenue[p], 0);
  const totalAdditionalReactivations = PLANS.reduce((s, p) => s + additionalReactivations[p], 0);
  const totalAdditionalRevenue = PLANS.reduce((s, p) => s + additionalRevenue[p], 0);

  return {
    benchmarkRate: benchmarkRate as CalcResults['benchmarkRate'],
    effectiveRate: effectiveRate as CalcResults['effectiveRate'],
    churnedPool: churnedPool as CalcResults['churnedPool'],
    organicReactivations: organicReactivations as CalcResults['organicReactivations'],
    organicRevenue: organicRevenue as CalcResults['organicRevenue'],
    additionalReactivations: additionalReactivations as CalcResults['additionalReactivations'],
    additionalRevenue: additionalRevenue as CalcResults['additionalRevenue'],
    totalChurnedPool,
    totalOrganicReactivations,
    totalOrganicRevenue,
    totalAdditionalReactivations,
    totalAdditionalRevenue,
    totalRecoverable: totalOrganicRevenue + totalAdditionalRevenue,
  };
}

export function useCalculator(state: CalculatorState): CalcResults {
  return useMemo(() => calculateResults(state), [state]);
}
