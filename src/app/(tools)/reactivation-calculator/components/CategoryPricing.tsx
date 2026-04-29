'use client';

import type { CalculatorState, CalculatorAction, PlanType } from '../types/calculator';
import { SOSA_CATEGORIES, SOSA_CATEGORY_DATA } from '../data/sosa2026';
import { getPriceTier, type PriceTier } from '../hooks/useCalculator';

interface CategoryPricingProps {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}

const TIER_COLORS: Record<PriceTier, { bg: string; text: string; label: string }> = {
  low:  { bg: '#fff0e0', text: '#c2410c', label: 'Low' },
  mid:  { bg: '#e0f0ff', text: '#1d4ed8', label: 'Mid' },
  high: { bg: '#e8f5e9', text: '#15803d', label: 'High' },
};

const PLAN_LABELS: Record<PlanType, string> = {
  monthly: 'Monthly',
  annual: 'Annual',
  weekly: 'Weekly',
  quarterly: 'Quarterly',
};

const PLAN_TIER_RANGES: Record<PlanType, string> = {
  monthly: 'Low <$7 · Mid $7–$13.50 · High >$13.50',
  annual: 'Low <$20 · Mid $20–$58 · High >$58',
  weekly: 'Low <$4 · Mid $4–$8 · High >$8',
  quarterly: 'Annualised ×4 → annual thresholds',
};

const PLAN_ORDER: PlanType[] = ['monthly', 'annual', 'weekly', 'quarterly'];

export default function CategoryPricing({ state, dispatch }: CategoryPricingProps) {
  const { category, prices } = state;
  const benchmarkData = category ? SOSA_CATEGORY_DATA[category] : null;

  function handlePrice(plan: PlanType, raw: string) {
    const val = raw === '' ? null : parseFloat(raw);
    dispatch({ type: 'SET_PRICE', payload: { plan, value: isNaN(val as number) ? null : val } });
  }

  const hasAnyPrice = PLAN_ORDER.some((p) => prices[p] !== null && prices[p] !== undefined);

  return (
    <div>
      {/* 2a: Category */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#3A39FF', marginBottom: 16 }}>
          2a. App category
        </h3>
        <select
          value={category}
          onChange={(e) => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
          style={{
            padding: '12px 16px',
            background: '#FFF1D4',
            border: '1.5px solid #e0c870',
            borderRadius: 0,
            fontSize: 15,
            width: '100%',
            maxWidth: 400,
            color: '#1A1A2E',
          }}
        >
          <option value="">Select a category…</option>
          {SOSA_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {benchmarkData && (
          <div style={{
            marginTop: 16,
            padding: '14px 18px',
            background: '#ADE6ED',
            borderLeft: '4px solid #3A39FF',
            maxWidth: 480,
          }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E', marginBottom: 4 }}>
              📊 SOSA 2026 benchmark for {category}
            </p>
            <p style={{ fontSize: 13, color: '#1A1A2E' }}>
              Monthly reactivation: <strong>{(benchmarkData.monthly * 100).toFixed(1)}%</strong>
              &nbsp;·&nbsp;Annual: <strong>{(benchmarkData.annual * 100).toFixed(1)}%</strong>
              &nbsp;·&nbsp;Weekly: <strong>{(benchmarkData.weekly * 100).toFixed(1)}%</strong>
            </p>
          </div>
        )}
      </div>

      {/* 2b: Pricing */}
      <div>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#3A39FF', marginBottom: 8 }}>
          2b. Your pricing
        </h3>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 20, fontStyle: 'italic' }}>
          RevenueCat doesn&apos;t expose pricing via API — enter your prices below. Leave unused plan types blank.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 560 }}>
          {PLAN_ORDER.map((plan) => {
            const price = prices[plan];
            const tier = price !== null && price !== undefined && price > 0 ? getPriceTier(plan, price) : null;
            const tierStyle = tier ? TIER_COLORS[tier] : null;

            return (
              <div key={plan} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E' }}>{PLAN_LABELS[plan]}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 700, color: '#1A1A2E' }}>$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="—"
                    value={price ?? ''}
                    onChange={(e) => handlePrice(plan, e.target.value)}
                    style={{
                      width: 90,
                      padding: '10px 12px',
                      background: '#FFF1D4',
                      border: '1.5px solid #e0c870',
                      borderRadius: 0,
                      fontSize: 15,
                      fontFamily: 'monospace',
                      color: '#1A1A2E',
                    }}
                  />
                  {tierStyle && (
                    <span style={{
                      padding: '3px 8px',
                      background: tierStyle.bg,
                      color: tierStyle.text,
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 2,
                    }}>
                      {tierStyle.label}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{PLAN_TIER_RANGES[plan]}</p>
              </div>
            );
          })}
        </div>

        {!hasAnyPrice && (
          <p style={{ marginTop: 16, color: '#d97706', fontSize: 13 }}>
            ↑ Enter at least one plan price to continue.
          </p>
        )}
      </div>
    </div>
  );
}
