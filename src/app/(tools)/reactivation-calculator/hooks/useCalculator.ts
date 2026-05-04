import { useMemo } from 'react';
import {
  SOSA_CATEGORY_DATA,
  SOSA_PRICE_TIERS,
  PRICE_TIER_THRESHOLDS,
  HOLD_PERIOD_MONTHS,
} from '../data/sosa2026';
import type { CalculatorState, CalcResults, PlanType, PlanValues } from '../types/calculator';

const PLANS: PlanType[] = ['monthly', 'annual', 'weekly', 'quarterly'];

export type PriceTier = 'low' | 'mid' | 'high';

export function getPriceTier(plan: PlanType, price: number): PriceTier {
  const effectivePrice = plan === 'quarterly' ? price * 4 : price;
  const thresholds = plan === 'quarterly' ? PRICE_TIER_THRESHOLDS.annual : PRICE_TIER_THRESHOLDS[plan];
  if (effectivePrice < thresholds.low) return 'low';
  if (effectivePrice > thresholds.high) return 'high';
  return 'mid';
}

function getCategoryRate(category: string, plan: PlanType): number {
  const data = SOSA_CATEGORY_DATA[category] ?? SOSA_CATEGORY_DATA['All Categories'];
  return plan === 'quarterly' ? data.monthly : data[plan];
}

function getPriceTierMultiplier(plan: PlanType, price: number | null): number {
  if (price === null) return 1;
  const tier = getPriceTier(plan, price);
  const tierKey = plan === 'quarterly' ? 'monthly' : plan;
  const rates = SOSA_PRICE_TIERS[tierKey as keyof typeof SOSA_PRICE_TIERS];
  return rates[tier] / rates['mid'];
}

function zeroPlan(): Record<PlanType, number> {
  return { monthly: 0, annual: 0, weekly: 0, quarterly: 0 };
}

interface BenchmarkResult {
  adjustedBenchmark: number;
  blendedCategoryBenchmark: number;
  blendedPriceTierMultiplier: number;
  weights: Record<PlanType, number>;
}

/**
 * Blended, price-tier-adjusted SOSA 2026 reactivation benchmark weighted by the user's plan mix.
 * Returns null when no plans have both a price and active subscribers > 0.
 *
 * Verification example:
 *   Health & Fitness, 4000 monthly ($12.99 mid) + 1000 annual ($49.99 mid)
 *   → blendedCategoryBenchmark = 0.80×0.124 + 0.20×0.048 = 0.1088 (10.88%)
 *   → blendedPriceTierMultiplier = 1.0, adjustedBenchmark = 10.88%
 */
export function calculateAdjustedBenchmark(inputs: {
  category: string;
  prices: PlanValues<number | null>;
  activeSubscribers: PlanValues<number>;
}): BenchmarkResult | null {
  // Step 1 — qualifying plan weights (price > 0 AND active subscribers > 0)
  const qualifying = PLANS.filter(
    (p) => (inputs.prices[p] ?? 0) > 0 && (inputs.activeSubscribers[p] ?? 0) > 0
  );
  const totalActive = qualifying.reduce((s, p) => s + (inputs.activeSubscribers[p] ?? 0), 0);
  if (totalActive === 0) return null;

  const weights: Record<PlanType, number> = { monthly: 0, annual: 0, weekly: 0, quarterly: 0 };
  for (const p of qualifying) {
    weights[p] = (inputs.activeSubscribers[p] ?? 0) / totalActive;
  }

  // Step 2 — category rates (quarterly proxied to monthly — no SOSA quarterly data)
  const catData = SOSA_CATEGORY_DATA[inputs.category] ?? SOSA_CATEGORY_DATA['All Categories'];
  const categoryRatesWithQuarterly = {
    monthly:   catData.monthly,
    annual:    catData.annual,
    weekly:    catData.weekly,
    quarterly: catData.monthly,
  };

  // Step 3 — blended category benchmark
  const blendedCategoryBenchmark = PLANS.reduce(
    (s, p) => s + weights[p] * categoryRatesWithQuarterly[p],
    0
  );

  // Step 4 — price tier multipliers per plan
  const priceTierMultipliers: Record<PlanType, number> = { monthly: 1, annual: 1, weekly: 1, quarterly: 1 };
  for (const p of PLANS) {
    priceTierMultipliers[p] = getPriceTierMultiplier(p, inputs.prices[p] ?? null);
  }

  // Step 5 — blended price tier multiplier
  const blendedPriceTierMultiplier = PLANS.reduce(
    (s, p) => s + weights[p] * priceTierMultipliers[p],
    0
  );

  // Step 6 — adjusted benchmark
  const adjustedBenchmark = blendedCategoryBenchmark * blendedPriceTierMultiplier;

  // Step 7 — scenario rates (for logging)
  const scenarios = {
    conservative: adjustedBenchmark * 0.80,
    realistic:    adjustedBenchmark,
    optimistic:   adjustedBenchmark * 1.20,
  };

  console.group('Benchmark Calculation');
  console.log('Plan weights:', weights);
  console.log('Category rates:', categoryRatesWithQuarterly);
  console.log('Blended category benchmark:', (blendedCategoryBenchmark * 100).toFixed(2) + '%');
  console.log('Price tier multipliers per plan:', priceTierMultipliers);
  console.log('Blended price tier multiplier:', blendedPriceTierMultiplier.toFixed(4));
  console.log('Adjusted benchmark:', (adjustedBenchmark * 100).toFixed(2) + '%');
  console.log('Scenarios:', {
    conservative: (scenarios.conservative * 100).toFixed(2) + '%',
    realistic:    (scenarios.realistic * 100).toFixed(2) + '%',
    optimistic:   (scenarios.optimistic * 100).toFixed(2) + '%',
  });
  console.groupEnd();

  return { adjustedBenchmark, blendedCategoryBenchmark, blendedPriceTierMultiplier, weights };
}

export function calculateResults(state: CalculatorState): CalcResults {
  const { category, prices, activeSubscribers, avgChurnedPerMonth, avgReactivatedPerMonth, campaignTargetRate } = state;

  const benchmarkRate             = zeroPlan();
  const effectiveRate             = zeroPlan();
  const churnedPool               = zeroPlan();
  const organicReactivations      = zeroPlan();
  const organicRevenue            = zeroPlan();
  const additionalReactivations   = zeroPlan();
  const additionalRevenue         = zeroPlan();

  for (const plan of PLANS) {
    const price = prices[plan];
    if (price === null) continue;

    benchmarkRate[plan] = getCategoryRate(category || 'All Categories', plan)
      * getPriceTierMultiplier(plan, price);

    const churned     = avgChurnedPerMonth[plan] ?? 0;
    const reactivated = avgReactivatedPerMonth[plan] ?? 0;
    effectiveRate[plan] = (reactivated > 0 && churned > 0)
      ? reactivated / churned
      : benchmarkRate[plan];

    churnedPool[plan] = churned * 12;

    organicReactivations[plan] = Math.round(churnedPool[plan] * effectiveRate[plan]);
    organicRevenue[plan] = plan === 'annual'
      ? organicReactivations[plan] * price
      : organicReactivations[plan] * price * HOLD_PERIOD_MONTHS[plan];

    const incrementalRate = Math.max(0, campaignTargetRate - effectiveRate[plan]);
    additionalReactivations[plan] = Math.round(churnedPool[plan] * incrementalRate);
    additionalRevenue[plan] = plan === 'annual'
      ? additionalReactivations[plan] * price
      : additionalReactivations[plan] * price * HOLD_PERIOD_MONTHS[plan];
  }

  const totalChurnedPool             = PLANS.reduce((s, p) => s + churnedPool[p], 0);
  const totalOrganicReactivations    = PLANS.reduce((s, p) => s + organicReactivations[p], 0);
  const totalOrganicRevenue          = PLANS.reduce((s, p) => s + organicRevenue[p], 0);
  const totalAdditionalReactivations = PLANS.reduce((s, p) => s + additionalReactivations[p], 0);
  const totalAdditionalRevenue       = PLANS.reduce((s, p) => s + additionalRevenue[p], 0);

  // Adjusted benchmark + components
  const benchmarkResult = calculateAdjustedBenchmark({ category, prices, activeSubscribers });
  const adjustedBenchmark        = benchmarkResult?.adjustedBenchmark        ?? null;
  const blendedCategoryBenchmark = benchmarkResult?.blendedCategoryBenchmark ?? null;
  const blendedPriceTierMultiplier = benchmarkResult?.blendedPriceTierMultiplier ?? null;
  const weights                  = benchmarkResult?.weights ?? { monthly: 0, annual: 0, weekly: 0, quarterly: 0 };

  // Current blended reactivation rate — only plans with price + churned + reactivated all > 0
  const plansWithFullData = PLANS.filter(
    (p) => (avgChurnedPerMonth[p] ?? 0) > 0 && (avgReactivatedPerMonth[p] ?? 0) > 0 && (prices[p] ?? 0) > 0
  );
  const totalWeightWithData = plansWithFullData.reduce((s, p) => s + weights[p], 0);
  const currentBlendedRate = totalWeightWithData > 0
    ? plansWithFullData.reduce(
        (s, p) => s + (weights[p] / totalWeightWithData) * ((avgReactivatedPerMonth[p] ?? 0) / (avgChurnedPerMonth[p] ?? 1)),
        0
      )
    : null;

  return {
    benchmarkRate:    benchmarkRate    as CalcResults['benchmarkRate'],
    effectiveRate:    effectiveRate    as CalcResults['effectiveRate'],
    churnedPool:      churnedPool      as CalcResults['churnedPool'],
    organicReactivations:   organicReactivations   as CalcResults['organicReactivations'],
    organicRevenue:         organicRevenue         as CalcResults['organicRevenue'],
    additionalReactivations: additionalReactivations as CalcResults['additionalReactivations'],
    additionalRevenue:       additionalRevenue       as CalcResults['additionalRevenue'],
    totalChurnedPool,
    totalOrganicReactivations,
    totalOrganicRevenue,
    totalAdditionalReactivations,
    totalAdditionalRevenue,
    totalRecoverable: totalOrganicRevenue + totalAdditionalRevenue,
    adjustedBenchmark,
    blendedCategoryBenchmark,
    blendedPriceTierMultiplier,
    currentBlendedRate,
  };
}

export function useCalculator(state: CalculatorState): CalcResults {
  return useMemo(() => calculateResults(state), [state]);
}
