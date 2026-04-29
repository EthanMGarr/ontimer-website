'use client';

import type { CalculatorState, CalculatorAction, PlanType } from '../types/calculator';

interface SubscriberInputsProps {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}

const PLAN_LABELS: Record<PlanType, string> = {
  monthly: 'Monthly',
  annual: 'Annual',
  weekly: 'Weekly',
  quarterly: 'Quarterly',
};

const PLAN_ORDER: PlanType[] = ['monthly', 'annual', 'weekly', 'quarterly'];

function InputField({
  label, value, onChange, placeholder, suffix, hint, monospace,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
  hint?: string;
  monospace?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: '#FFF1D4',
            border: '1.5px solid #e0c870',
            borderRadius: 0,
            fontSize: 15,
            fontFamily: monospace ? 'monospace' : 'inherit',
            color: '#1A1A2E',
          }}
        />
        {suffix && <span style={{ fontSize: 13, color: '#666', whiteSpace: 'nowrap' }}>{suffix}</span>}
      </div>
      {hint && <p style={{ fontSize: 11, color: '#888', margin: 0, lineHeight: 1.4 }}>{hint}</p>}
    </div>
  );
}

export default function SubscriberInputs({ state, dispatch }: SubscriberInputsProps) {
  const { prices, activeSubscribers, monthlyChurnRate, actualReactivationRate, apiPulledFields } = state;

  const activePlans = PLAN_ORDER.filter((p) => prices[p] !== null && prices[p] !== undefined);

  function setSubscribers(plan: PlanType, raw: string) {
    const val = raw === '' ? 0 : parseInt(raw, 10);
    dispatch({ type: 'SET_ACTIVE_SUBSCRIBERS', payload: { [plan]: isNaN(val) ? 0 : val } });
  }

  function setChurn(plan: PlanType, raw: string) {
    const val = raw === '' ? 0 : parseFloat(raw) / 100;
    dispatch({ type: 'SET_MONTHLY_CHURN', payload: { [plan]: isNaN(val) ? 0 : val } });
  }

  function setActualRate(plan: PlanType, raw: string) {
    const val = raw === '' ? null : parseFloat(raw) / 100;
    dispatch({ type: 'SET_ACTUAL_REACTIVATION', payload: { [plan]: val === null ? null : isNaN(val) ? null : val } });
  }

  const subsPulled = apiPulledFields.includes('activeSubscribers');
  const churnPulled = apiPulledFields.includes('monthlyChurnRate');
  const reactPulled = apiPulledFields.includes('actualReactivationRate');

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#3A39FF', marginBottom: 8 }}>
        Your numbers
      </h2>
      <div style={{ width: 48, height: 3, background: '#FF5B23', marginBottom: 24 }} />

      {activePlans.length === 0 && (
        <p style={{ color: '#d97706', fontSize: 14 }}>Go back and enter at least one plan price to unlock this section.</p>
      )}

      {activePlans.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 0', fontSize: 13, fontWeight: 700, color: '#1A1A2E', borderBottom: '2px solid #e5e7eb', width: 220 }}></th>
                {activePlans.map((plan) => (
                  <th key={plan} style={{ textAlign: 'center', padding: '8px 12px', fontSize: 13, fontWeight: 700, color: '#3A39FF', borderBottom: '2px solid #e5e7eb' }}>
                    {PLAN_LABELS[plan]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Active subscribers */}
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '16px 0', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E' }}>
                    Active subscribers
                    {subsPulled && <span style={{ marginLeft: 8, color: '#16a34a', fontSize: 11 }}>✓ API</span>}
                  </div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>RevenueCat → Overview → Active Subscriptions</div>
                </td>
                {activePlans.map((plan) => (
                  <td key={plan} style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <InputField
                      label=""
                      value={activeSubscribers[plan] || ''}
                      onChange={(v) => setSubscribers(plan, v)}
                      placeholder="0"
                      monospace
                    />
                  </td>
                ))}
              </tr>

              {/* Monthly churn rate */}
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '16px 0', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E' }}>
                    Monthly churn rate
                    {churnPulled && <span style={{ marginLeft: 8, color: '#16a34a', fontSize: 11 }}>✓ API</span>}
                  </div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>RevenueCat → Charts → Churn Rate</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Annual/quarterly: express as monthly equivalent</div>
                </td>
                {activePlans.map((plan) => (
                  <td key={plan} style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <InputField
                      label=""
                      value={monthlyChurnRate[plan] ? (monthlyChurnRate[plan] * 100).toFixed(1) : ''}
                      onChange={(v) => setChurn(plan, v)}
                      placeholder="e.g. 5.2"
                      suffix="%"
                      monospace
                    />
                  </td>
                ))}
              </tr>

              {/* Actual reactivation rate */}
              <tr>
                <td style={{ padding: '16px 0', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E' }}>
                    Actual reactivation rate
                    {reactPulled && <span style={{ marginLeft: 8, color: '#16a34a', fontSize: 11 }}>✓ API</span>}
                    <span style={{ marginLeft: 8, fontSize: 11, color: '#888', fontStyle: 'italic' }}>optional</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2, lineHeight: 1.4 }}>
                    RevenueCat → Charts → Active Subscriptions Movement → Reactivated ÷ Churned (12mo)
                  </div>
                </td>
                {activePlans.map((plan) => (
                  <td key={plan} style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <InputField
                      label=""
                      value={actualReactivationRate[plan] !== null && actualReactivationRate[plan] !== undefined
                        ? ((actualReactivationRate[plan] as number) * 100).toFixed(1)
                        : ''}
                      onChange={(v) => setActualRate(plan, v)}
                      placeholder="—"
                      suffix="%"
                      monospace
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: 20, padding: '14px 18px', background: '#f0f0ff', borderLeft: '3px solid #3A39FF' }}>
        <p style={{ fontSize: 13, color: '#1A1A2E', margin: 0, lineHeight: 1.6 }}>
          <strong>Reactivation rate:</strong> If blank, we use the SOSA 2026 benchmark for your category, adjusted for your price tier and geography. Enter your actual rate to make the model more accurate.
        </p>
      </div>
    </div>
  );
}
