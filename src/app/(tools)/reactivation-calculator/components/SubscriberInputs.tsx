'use client';

import { useState, useEffect } from 'react';
import type { CalculatorState, CalculatorAction, PlanType } from '../types/calculator';

interface SubscriberInputsProps {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}

const PLAN_LABELS: Record<PlanType, string> = {
  monthly: 'Monthly', annual: 'Annual', weekly: 'Weekly', quarterly: 'Quarterly',
};
const PLAN_ORDER: PlanType[] = ['monthly', 'annual', 'weekly', 'quarterly'];

function HowTo({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 6 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ background: 'none', border: 'none', padding: 0, color: '#3A39FF', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
      >
        {open ? '▾' : '▸'} How to find this in RevenueCat
      </button>
      {open && (
        <div style={{ marginTop: 8, padding: '12px 14px', background: '#f8f9fb', borderLeft: '3px solid #ADE6ED', fontSize: 12, color: '#444', lineHeight: 1.7 }}>
          <strong style={{ color: '#1A1A2E' }}>{title}</strong>
          <div style={{ marginTop: 6 }}>{children}</div>
        </div>
      )}
    </div>
  );
}

const TOOLTIP_TEXT = 'Derived rate — your current reactivation rate for this plan, calculated as: avg reactivated per month ÷ avg churned per month. For example, if 20 subscribers reactivate each month from a pool of 100 who churned, your derived rate is 20%. If you haven\'t entered reactivated subscribers yet, this shows the SOSA 2026 benchmark for your category and price tier.';

function InfoTooltip() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    function dismiss() { setVisible(false); }
    document.addEventListener('click', dismiss);
    return () => document.removeEventListener('click', dismiss);
  }, [visible]);

  return (
    <>
      <style>{`@keyframes tipFadeIn { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <span style={{ position: 'relative', display: 'inline-block', marginLeft: 5 }}>
        <span
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onClick={(e) => { e.stopPropagation(); setVisible((v) => !v); }}
          style={{ cursor: 'help', fontSize: 11, color: '#999', userSelect: 'none', verticalAlign: 'middle', lineHeight: 1 }}
        >
          ⓘ
        </span>
        {visible && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: 8,
            zIndex: 200,
            width: 280,
            padding: '12px 14px',
            background: '#1A1A2E',
            color: '#fff',
            fontSize: 12,
            lineHeight: 1.6,
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            animation: 'tipFadeIn 130ms ease',
            pointerEvents: 'none',
          }}>
            {TOOLTIP_TEXT}
          </div>
        )}
      </span>
    </>
  );
}

function IntInput({
  value, onChange, placeholder,
}: { value: number; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="number"
      min="0"
      step="1"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? '0'}
      style={{
        width: '100%',
        padding: '10px 12px',
        background: '#FFF1D4',
        border: '1.5px solid #e0c870',
        borderRadius: 0,
        fontSize: 15,
        fontFamily: 'monospace',
        color: '#1A1A2E',
        boxSizing: 'border-box',
      }}
    />
  );
}

export default function SubscriberInputs({ state, dispatch }: SubscriberInputsProps) {
  const { prices, activeSubscribers, avgChurnedPerMonth, avgReactivatedPerMonth } = state;
  const activePlans = PLAN_ORDER.filter((p) => prices[p] !== null && (prices[p] as number) > 0);

  function setSubs(plan: PlanType, raw: string) {
    const v = parseInt(raw, 10);
    dispatch({ type: 'SET_ACTIVE_SUBSCRIBERS', payload: { [plan]: isNaN(v) ? 0 : v } });
  }
  function setChurned(plan: PlanType, raw: string) {
    const v = parseInt(raw, 10);
    dispatch({ type: 'SET_AVG_CHURNED', payload: { [plan]: isNaN(v) ? 0 : v } });
  }
  function setReactivated(plan: PlanType, raw: string) {
    const v = parseInt(raw, 10);
    dispatch({ type: 'SET_AVG_REACTIVATED', payload: { [plan]: isNaN(v) ? 0 : v } });
  }

  function derivedRateLabel(plan: PlanType): { text: string; fromData: boolean } {
    const c = avgChurnedPerMonth[plan] ?? 0;
    const r = avgReactivatedPerMonth[plan] ?? 0;
    if (c > 0 && r > 0) {
      return { text: `Your current reactivation rate: ${((r / c) * 100).toFixed(1)}%`, fromData: true };
    }
    // show benchmark
    const { SOSA_CATEGORY_DATA, SOSA_PRICE_TIERS, PRICE_TIER_THRESHOLDS } = require('../data/sosa2026');
    const catData = SOSA_CATEGORY_DATA[state.category] ?? SOSA_CATEGORY_DATA['All Categories'];
    const baseRate = plan === 'quarterly' ? catData.monthly : catData[plan] ?? catData.monthly;
    const price = prices[plan];
    let tierMult = 1;
    if (price) {
      const effectivePrice = plan === 'quarterly' ? price * 4 : price;
      const thresholds = plan === 'quarterly' ? PRICE_TIER_THRESHOLDS.annual : PRICE_TIER_THRESHOLDS[plan];
      const tier = effectivePrice < thresholds.low ? 'low' : effectivePrice > thresholds.high ? 'high' : 'mid';
      const tierKey = plan === 'quarterly' ? 'monthly' : plan;
      const rates = SOSA_PRICE_TIERS[tierKey];
      tierMult = rates[tier] / rates['mid'];
    }
    const bench = baseRate * tierMult;
    return { text: `Using SOSA 2026 benchmark: ${(bench * 100).toFixed(1)}%`, fromData: false };
  }

  if (activePlans.length === 0) {
    return <p style={{ color: '#d97706', fontSize: 14 }}>Go back and enter at least one plan price to unlock this section.</p>;
  }

  const colWidth = `${Math.floor(80 / activePlans.length)}%`;

  return (
    <div>
      {/* Tip box */}
      <div style={{ padding: '14px 18px', background: '#ADE6ED', marginBottom: 32, borderLeft: '4px solid #3A39FF' }}>
        <p style={{ margin: 0, fontSize: 13, color: '#1A1A2E', lineHeight: 1.6 }}>
          <strong>Tip:</strong> For all inputs below, we recommend using a 3-month average for accuracy.
          In RevenueCat, set your chart date range to <strong>Last 90 days</strong> with a <strong>monthly view</strong>,
          then average the three months shown.
        </p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 480 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px 0 12px', fontWeight: 700, color: '#1A1A2E', borderBottom: '2px solid #e5e7eb', width: '30%' }} />
              {activePlans.map((p) => (
                <th key={p} style={{ textAlign: 'center', padding: '8px 12px 12px', fontWeight: 700, color: '#3A39FF', borderBottom: '2px solid #e5e7eb', width: colWidth }}>
                  {PLAN_LABELS[p]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

            {/* Active subscribers */}
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '16px 0', verticalAlign: 'top' }}>
                <div style={{ fontWeight: 600, color: '#1A1A2E' }}>Active subscribers</div>
                <HowTo title="Active subscribers — how to find this">
                  Go to <strong>RevenueCat → Charts → Active Subscriptions</strong>. Set the date range to <strong>Last 90 days</strong>, view by month.
                  To break down by plan duration, click <strong>Segment by → Product Duration</strong> (Monthly / Annual / Weekly / Quarterly).
                  Take the most recent month&apos;s figure for each plan type.
                </HowTo>
              </td>
              {activePlans.map((p) => (
                <td key={p} style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                  <IntInput value={activeSubscribers[p]} onChange={(v) => setSubs(p, v)} />
                </td>
              ))}
            </tr>

            {/* Avg churned */}
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '16px 0', verticalAlign: 'top' }}>
                <div style={{ fontWeight: 600, color: '#1A1A2E' }}>Avg churned / month</div>
                <HowTo title="Churned subscribers — how to find this">
                  Go to <strong>RevenueCat → Charts → Active Subscriptions Movement</strong>. Set date range to <strong>Last 90 days</strong>, view by month.
                  To break down by plan duration, click <strong>Segment by → Product Duration</strong>.
                  Look at the <strong>Churned</strong> row. Take the last 3 months, add them up, divide by 3.
                  Enter that average here.
                </HowTo>
              </td>
              {activePlans.map((p) => (
                <td key={p} style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                  <IntInput value={avgChurnedPerMonth[p]} onChange={(v) => setChurned(p, v)} />
                </td>
              ))}
            </tr>

            {/* Avg reactivated */}
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '16px 0', verticalAlign: 'top' }}>
                <div style={{ fontWeight: 600, color: '#1A1A2E' }}>Avg reactivated / month</div>
                <HowTo title="Reactivated subscribers — how to find this">
                  Go to <strong>RevenueCat → Charts → Active Subscriptions Movement</strong>. Set date range to <strong>Last 90 days</strong>, view by month.
                  To break down by plan duration, click <strong>Filter by → Product Duration</strong> and select the relevant plan type.
                  Look at the <strong>Reactivated</strong> row. Take the last 3 months, add them up, divide by 3.
                  <br /><br />
                  <em>Note: reactivations use <strong>Filter</strong>, not Segment — this is different from the churn step above.</em>
                </HowTo>
              </td>
              {activePlans.map((p) => (
                <td key={p} style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                  <IntInput value={avgReactivatedPerMonth[p]} onChange={(v) => setReactivated(p, v)} />
                </td>
              ))}
            </tr>

            {/* Derived reactivation rate */}
            <tr>
              <td style={{ padding: '12px 0', verticalAlign: 'top' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center' }}>
                  Derived rate<InfoTooltip />
                </div>
              </td>
              {activePlans.map((p) => {
                const { text, fromData } = derivedRateLabel(p);
                return (
                  <td key={p} style={{ padding: '12px 12px', verticalAlign: 'top' }}>
                    <div style={{
                      padding: '8px 10px',
                      background: '#ADE6ED',
                      fontSize: 12,
                      fontFamily: 'monospace',
                      color: '#1A1A2E',
                      fontWeight: fromData ? 700 : 400,
                    }}>
                      {text}
                    </div>
                  </td>
                );
              })}
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
