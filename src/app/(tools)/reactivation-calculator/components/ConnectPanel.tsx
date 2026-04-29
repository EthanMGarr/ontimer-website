'use client';

import { useState } from 'react';
import type { CalculatorState, CalculatorAction } from '../types/calculator';

interface ConnectPanelProps {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  onConnect: (apiKey: string) => Promise<void>;
}

const STATUS_LABELS: Record<string, string> = {
  activeSubscribers: 'Active subscribers',
  monthlyChurnRate: 'Churn rate',
  actualReactivationRate: 'Reactivation rate',
  geoMix: 'Geography mix',
};

const MANUAL_FIELDS = ['pricing', 'category'];
const MANUAL_LABELS: Record<string, string> = {
  pricing: 'Pricing',
  category: 'App category',
};

export default function ConnectPanel({ state, dispatch, onConnect }: ConnectPanelProps) {
  const [localKey, setLocalKey] = useState('');
  const { connectionStatus, connectionError, apiPulledFields, availableProjects, projectId } = state;

  const isConnecting = connectionStatus === 'connecting';
  const isConnected = connectionStatus === 'connected';

  async function handleConnect() {
    if (!localKey.trim()) return;
    dispatch({ type: 'SET_API_KEY', payload: localKey });
    await onConnect(localKey);
  }

  function handleSkip() {
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'manual' });
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: 2 });
  }

  function handleProjectSelect(id: string) {
    dispatch({ type: 'SET_PROJECT_ID', payload: id });
  }

  const allFields = Object.keys(STATUS_LABELS);

  return (
    <div style={{ maxWidth: 640 }}>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#3A39FF', marginBottom: 8 }}>
        Connect your RevenueCat account
      </h2>
      <div style={{ width: 48, height: 3, background: '#FF5B23', marginBottom: 24 }} />

      <p style={{ color: '#1A1A2E', marginBottom: 24, lineHeight: 1.6 }}>
        Enter your RevenueCat Secret API key to auto-fill your subscriber data.
        Your key is only used in your browser session and never stored.
      </p>
      <div style={{ fontSize: 13, color: '#555', marginBottom: 24, lineHeight: 1.7, background: '#f8f9fb', padding: '14px 16px', borderLeft: '3px solid #3A39FF' }}>
        <strong>How to get your Secret API key:</strong><br />
        RevenueCat dashboard → <strong>Apps &amp; providers</strong> → <strong>API keys</strong> → click <strong>+ New secret API key</strong><br />
        <span style={{ fontSize: 12, color: '#888' }}>Note: SDK (public) API keys won&apos;t work — you need a Secret API key, which you may need to create.</span>
      </div>

      {(connectionStatus === 'idle' || connectionStatus === 'error' || connectionStatus === 'connecting') && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <input
            type="password"
            placeholder="sk_live_..."
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
            style={{
              flex: 1,
              minWidth: 220,
              padding: '12px 16px',
              background: '#FFF1D4',
              border: '1.5px solid #e0c870',
              borderRadius: 0,
              fontFamily: 'monospace',
              fontSize: 14,
              color: '#1A1A2E',
              outline: 'none',
            }}
          />
          <button
            onClick={handleConnect}
            disabled={isConnecting || !localKey.trim()}
            style={{
              padding: '12px 24px',
              background: isConnecting ? '#ccc' : '#FF5B23',
              color: '#fff',
              border: 'none',
              borderRadius: 0,
              fontWeight: 700,
              fontSize: 14,
              cursor: isConnecting ? 'default' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {isConnecting ? 'Connecting…' : 'Connect →'}
          </button>
        </div>
      )}

      {connectionStatus === 'error' && (
        <div style={{ padding: '12px 16px', background: '#fff0f0', border: '1px solid #fca5a5', marginBottom: 16, color: '#dc2626', fontSize: 14 }}>
          {connectionError}
        </div>
      )}

      {/* Project selector */}
      {availableProjects.length > 1 && connectionStatus !== 'connected' && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3A39FF', marginBottom: 8 }}>
            Select a project
          </label>
          <select
            value={projectId ?? ''}
            onChange={(e) => handleProjectSelect(e.target.value)}
            style={{
              padding: '10px 14px',
              background: '#FFF1D4',
              border: '1.5px solid #e0c870',
              borderRadius: 0,
              fontSize: 14,
              width: '100%',
              color: '#1A1A2E',
            }}
          >
            <option value="">Choose a project…</option>
            {availableProjects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Status panel after connecting */}
      {isConnected && (
        <div style={{ background: '#f8fffe', border: '1px solid #ADE6ED', padding: '20px 24px', marginBottom: 20 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Data status
          </p>
          {allFields.map((field) => {
            const pulled = apiPulledFields.includes(field);
            return (
              <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 14 }}>
                <span style={{ color: pulled ? '#16a34a' : '#d97706', fontWeight: 700 }}>{pulled ? '✓' : '⚠'}</span>
                <span style={{ color: '#1A1A2E' }}>
                  {STATUS_LABELS[field]}: {pulled ? 'pulled from RevenueCat' : 'enter manually below'}
                </span>
              </div>
            );
          })}
          {MANUAL_FIELDS.map((field) => (
            <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 14 }}>
              <span style={{ color: '#d97706', fontWeight: 700 }}>⚠</span>
              <span style={{ color: '#1A1A2E' }}>{MANUAL_LABELS[field]}: enter manually below</span>
            </div>
          ))}
        </div>
      )}

      {(connectionStatus === 'idle' || connectionStatus === 'error') && (
        <button
          onClick={handleSkip}
          style={{
            background: 'none',
            border: 'none',
            color: '#3A39FF',
            cursor: 'pointer',
            fontSize: 14,
            textDecoration: 'underline',
            padding: 0,
          }}
        >
          Or skip and enter data manually →
        </button>
      )}

      {isConnected && (
        <button
          onClick={() => dispatch({ type: 'SET_ACTIVE_SECTION', payload: 2 })}
          style={{
            padding: '12px 28px',
            background: '#3A39FF',
            color: '#fff',
            border: 'none',
            borderRadius: 0,
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Continue →
        </button>
      )}

      {connectionStatus === 'manual' && (
        <div style={{ padding: '12px 16px', background: '#f0f0ff', border: '1px solid #c7c7ff', fontSize: 14, color: '#3A39FF' }}>
          Manual mode — fill in your numbers below.
        </div>
      )}
    </div>
  );
}
