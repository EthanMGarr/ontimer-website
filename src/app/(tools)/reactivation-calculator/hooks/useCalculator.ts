import { useMemo } from 'react';
import {
  SOSA_CATEGORY_DATA,
  SOSA_PRICE_TIERS,
  PRICE_TIER_THRESHOLDS,
  HOLD_PERIOD_MONTHS,
} from '../data/sosa2026';
import type { CalculatorState, CalcResults, PlanType } from '../types/calculator';

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

export function calculateResults(state: CalculatorState): CalcResults {
  const { category, prices, activeSubscribers, avgChurnedPerMonth, avgReactivatedPerMonth, campaignTargetRate } = state;

  const benchmarkRate    = zeroPlan();
  const effectiveRate    = zeroPlan();
  const churnedPool      = zeroPlan();
  const organicReactivations  = zeroPlan();
  const organicRevenue        = zeroPlan();
  const additionalReactivations = zeroPlan();
  const additionalRevenue       = zeroPlan();

  for (const plan of PLANS) {
    const price = prices[plan];
    if (price === null) continue;

    // Benchmark = category base rate × price tier multiplier (no geo)
    benchmarkRate[plan] = getCategoryRate(category || 'All Categories', plan)
      * getPriceTierMultiplier(plan, price);

    // Effective rate: derive from user's own data if both fields entered, else SOSA benchmark
    const churned     = avgChurnedPerMonth[plan] ?? 0;
    const reactivated = avgReactivatedPerMonth[plan] ?? 0;
    effectiveRate[plan] = (reactivated > 0 && churned > 0)
      ? reactivated / churned
      : benchmarkRate[plan];

    // Churned pool over 12 months from absolute monthly average
    churnedPool[plan] = churned * 12;

    // Organic reactivations & revenue
    organicReactivations[plan] = Math.round(churnedPool[plan] * effectiveRate[plan]);
    organicRevenue[plan] = plan === 'annual'
      ? organicReactivations[plan] * price
      : organicReactivations[plan] * price * HOLD_PERIOD_MONTHS[plan];

    // Campaign uplift
    const incrementalRate = Math.max(0, campaignTargetRate - effectiveRate[plan]);
    additionalReactivations[plan] = Math.round(churnedPool[plan] * incrementalRate);
    additionalRevenue[plan] = plan === 'annual'
      ? additionalReactivations[plan] * price
      : additionalReactivations[plan] * price * HOLD_PERIOD_MONTHS[plan];
  }

  const totalChurnedPool            = PLANS.reduce((s, p) => s + churnedPool[p], 0);
  const totalOrganicReactivations   = PLANS.reduce((s, p) => s + organicReactivations[p], 0);
  const totalOrganicRevenue         = PLANS.reduce((s, p) => s + organicRevenue[p], 0);
  const totalAdditionalReactivations = PLANS.reduce((s, p) => s + additionalReactivations[p], 0);
  const totalAdditionalRevenue       = PLANS.reduce((s, p) => s + additionalRevenue[p], 0);

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
  };
}

export function useCalculator(state: CalculatorState): CalcResults {
  return useMemo(() => calculateResults(state), [state]);
}
