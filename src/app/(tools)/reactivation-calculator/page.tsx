'use client';

import { useReducer, useRef, useEffect } from 'react';
import type { CalculatorState, CalculatorAction } from './types/calculator';
import { DEFAULT_GEO_MIX } from './data/sosa2026';
import { useCalculator } from './hooks/useCalculator';
import { fetchProjects, fetchRevenueCatData } from './hooks/useRevenueCatAPI';
import ConnectPanel from './components/ConnectPanel';
import CategoryPricing from './components/CategoryPricing';
import GeographyMixer from './components/GeographyMixer';
import SubscriberInputs from './components/SubscriberInputs';
import ResultsPanel from './components/ResultsPanel';

// ── State ────────────────────────────────────────────────────────────────────

const initialState: CalculatorState = {
  apiKey: '',
  projectId: null,
  availableProjects: [],
  connectionStatus: 'idle',
  connectionError: '',
  apiPulledFields: [],
  category: '',
  prices: { monthly: null, annual: null, weekly: null, quarterly: null },
  geoMix: { ...DEFAULT_GEO_MIX },
  activeSubscribers: { monthly: 0, annual: 0, weekly: 0, quarterly: 0 },
  monthlyChurnRate: { monthly: 0, annual: 0, weekly: 0, quarterly: 0 },
  actualReactivationRate: { monthly: null, annual: null, weekly: null, quarterly: null },
  campaignTargetRate: 0.35,
  activeSection: 1,
};

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SET_API_KEY': return { ...state, apiKey: action.payload };
    case 'SET_CONNECTION_STATUS': return { ...state, connectionStatus: action.payload };
    case 'SET_CONNECTION_ERROR': return { ...state, connectionError: action.payload };
    case 'SET_PROJECTS': return { ...state, availableProjects: action.payload };
    case 'SET_PROJECT_ID': return { ...state, projectId: action.payload };
    case 'SET_API_PULLED_FIELDS': return { ...state, apiPulledFields: action.payload };
    case 'SET_CATEGORY': return { ...state, category: action.payload };
    case 'SET_PRICE': return { ...state, prices: { ...state.prices, [action.payload.plan]: action.payload.value } };
    case 'SET_GEO_MIX': return { ...state, geoMix: action.payload };
    case 'SET_GEO_REGION': return { ...state, geoMix: { ...state.geoMix, [action.payload.region]: action.payload.value } };
    case 'SET_ACTIVE_SUBSCRIBERS': return { ...state, activeSubscribers: { ...state.activeSubscribers, ...action.payload } };
    case 'SET_MONTHLY_CHURN': return { ...state, monthlyChurnRate: { ...state.monthlyChurnRate, ...action.payload } };
    case 'SET_ACTUAL_REACTIVATION': return { ...state, actualReactivationRate: { ...state.actualReactivationRate, ...action.payload } };
    case 'SET_CAMPAIGN_TARGET': return { ...state, campaignTargetRate: action.payload };
    case 'SET_ACTIVE_SECTION': return { ...state, activeSection: action.payload };
    case 'PREFILL_FROM_API': return { ...state, ...action.payload };
    default: return state;
  }
}

// ── Progress indicator ────────────────────────────────────────────────────────

const SECTIONS = [
  { n: 1, label: 'Connect' },
  { n: 2, label: 'Your App' },
  { n: 3, label: 'Your Numbers' },
  { n: 4, label: 'Your Opportunity' },
] as const;

function ProgressBar({ activeSection }: { activeSection: number }) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 40px',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'stretch' }}>
        {SECTIONS.map(({ n, label }) => {
          const done = n < activeSection;
          const active = n === activeSection;
          return (
            <div
              key={n}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 0',
                borderBottom: active ? '3px solid #FF5B23' : '3px solid transparent',
                opacity: n > activeSection ? 0.4 : 1,
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: done ? '#16a34a' : active ? '#FF5B23' : '#d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}>
                {done ? '✓' : n}
              </div>
              <span style={{ fontSize: 13, fontWeight: active ? 700 : 400, color: active ? '#FF5B23' : '#1A1A2E' }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({
  n, title, active, children, sectionRef,
}: {
  n: number;
  title: string;
  active: boolean;
  children: React.ReactNode;
  sectionRef?: React.RefObject<HTMLDivElement | null>;
}) {
  if (!active) return null;
  return (
    <div ref={sectionRef} style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{
          width: 36,
          height: 36,
          background: '#3A39FF',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 16,
          flexShrink: 0,
        }}>
          {n}
        </div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 700, color: '#1A1A2E', margin: 0 }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

// ── Section gate logic ────────────────────────────────────────────────────────

function canSeeSection2(state: CalculatorState) {
  return state.connectionStatus === 'connected' || state.connectionStatus === 'manual';
}
function canSeeSection3(state: CalculatorState) {
  const hasCategory = !!state.category;
  const hasPrice = Object.values(state.prices).some((p) => p !== null && (p as number) > 0);
  const geoTotal = Math.round(Object.values(state.geoMix).reduce((s, v) => s + v, 0) * 100);
  return canSeeSection2(state) && hasCategory && hasPrice && geoTotal === 100;
}
function canSeeSection4(state: CalculatorState) {
  const hasAnySubs = Object.values(state.activeSubscribers).some((v) => v > 0);
  const hasAnyChurn = Object.values(state.monthlyChurnRate).some((v) => v > 0);
  return canSeeSection3(state) && hasAnySubs && hasAnyChurn;
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ReactivationCalculatorPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const results = useCalculator(state);

  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec3Ref = useRef<HTMLDivElement>(null);
  const sec4Ref = useRef<HTMLDivElement>(null);

  // Scroll to next section when it becomes active
  useEffect(() => {
    if (state.activeSection === 2) sec2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [state.activeSection]);

  // Auto-advance section when conditions met
  useEffect(() => {
    if (state.activeSection < 2 && canSeeSection2(state)) dispatch({ type: 'SET_ACTIVE_SECTION', payload: 2 });
  }, [state.connectionStatus]);

  useEffect(() => {
    if (state.activeSection < 3 && canSeeSection3(state)) {
      dispatch({ type: 'SET_ACTIVE_SECTION', payload: 3 });
      setTimeout(() => sec3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [state.category, state.prices, state.geoMix]);

  useEffect(() => {
    if (state.activeSection < 4 && canSeeSection4(state)) {
      dispatch({ type: 'SET_ACTIVE_SECTION', payload: 4 });
      setTimeout(() => sec4Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [state.activeSubscribers, state.monthlyChurnRate]);

  async function handleConnect(apiKey: string) {
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' });
    dispatch({ type: 'SET_CONNECTION_ERROR', payload: '' });

    const { projects, error } = await fetchProjects(apiKey);
    if (error) {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' });
      dispatch({ type: 'SET_CONNECTION_ERROR', payload: error });
      return;
    }
    if (projects.length === 0) {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'error' });
      dispatch({ type: 'SET_CONNECTION_ERROR', payload: 'No projects found for this API key.' });
      return;
    }

    dispatch({ type: 'SET_PROJECTS', payload: projects });
    const targetProjectId = projects[0].id;
    dispatch({ type: 'SET_PROJECT_ID', payload: targetProjectId });

    const { prefill, pulledFields } = await fetchRevenueCatData(apiKey, targetProjectId);
    dispatch({ type: 'PREFILL_FROM_API', payload: prefill });
    dispatch({ type: 'SET_API_PULLED_FIELDS', payload: pulledFields });
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' });
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: 2 });
  }

  const show2 = canSeeSection2(state) || state.activeSection >= 2;
  const show3 = canSeeSection3(state) || state.activeSection >= 3;
  const show4 = canSeeSection4(state) || state.activeSection >= 4;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      // Growth Waves palette
      '--butter': '#FFF1D4',
      '--mist': '#ADE6ED',
      '--burnt-rose': '#FF5B23',
      '--indigo': '#3A39FF',
      '--dark': '#1A1A2E',
    } as React.CSSProperties}>

      {/* Load Tiempos + Geist fonts via next/font or link */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;600;700&display=swap');
        /* Hide OnTimer chrome — this page is a standalone embedded calculator */
        body { margin: 0 !important; background: #fff !important; color: #1A1A2E !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        header, footer { display: none !important; }
        main { padding: 0 !important; flex: unset !important; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { opacity: 1; }
      `}</style>

      <ProgressBar activeSection={state.activeSection} />

      {/* Page header */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 40px 0' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#FF5B23', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
          RevenueCat · SOSA 2026
        </p>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          color: '#1A1A2E',
          lineHeight: 1.15,
          marginBottom: 20,
        }}>
          Reactivation Revenue<br />Opportunity Calculator
        </h1>
        <p style={{ fontSize: 18, color: '#444', maxWidth: 600, lineHeight: 1.6, marginBottom: 48 }}>
          How much additional revenue could you recover by actively working to reactivate churned subscribers?
          Benchmarked against RevenueCat&apos;s State of Subscription Apps 2026.
        </p>
        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: 56 }} />
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 80px' }}>

        {/* Section 1: Connect */}
        <Section n={1} title="Connect" active sectionRef={undefined}>
          <ConnectPanel state={state} dispatch={dispatch} onConnect={handleConnect} />
        </Section>

        {/* Section 2: Your App */}
        {show2 && (
          <div ref={sec2Ref}>
            <Section n={2} title="Your App" active>
              <div style={{ marginBottom: 48 }}>
                <CategoryPricing state={state} dispatch={dispatch} />
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', marginBottom: 40 }} />
              <GeographyMixer state={state} dispatch={dispatch} />
            </Section>
          </div>
        )}

        {/* Section 3: Your Numbers */}
        {show3 && (
          <div ref={sec3Ref}>
            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: 56 }} />
            <Section n={3} title="Your Numbers" active>
              <SubscriberInputs state={state} dispatch={dispatch} />
              {canSeeSection3(state) && !canSeeSection4(state) && (
                <div style={{ marginTop: 28, padding: '14px 18px', background: '#f0f0ff', borderLeft: '3px solid #3A39FF', fontSize: 13, color: '#3A39FF' }}>
                  Enter at least one plan&apos;s active subscribers and churn rate to see your results.
                </div>
              )}
            </Section>
          </div>
        )}

        {/* Section 4: Results */}
        {show4 && (
          <div ref={sec4Ref}>
            <hr style={{ border: 'none', borderTop: '2px solid #1A1A2E', marginBottom: 56 }} />
            <Section n={4} title="Your Opportunity" active>
              <ResultsPanel state={state} dispatch={dispatch} results={results} />
            </Section>
          </div>
        )}

      </div>
    </div>
  );
}
