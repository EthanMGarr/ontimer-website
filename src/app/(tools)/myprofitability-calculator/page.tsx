"use client";

import { useState, useMemo, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Inputs {
  practiceArea: string;
  geography: string;
  rackRate: number;
  realization: number;
  billableHours: number;
  originations: number;
  originationCredit: number;
  portability: number;
  role: string;
  leverage: number;
  profitMargin: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PRACTICE_AREAS = [
  "Corporate / M&A",
  "Private Equity",
  "Litigation",
  "Intellectual Property",
  "Real Estate",
  "Tax",
  "Employment / Labor",
  "Regulatory / Government Affairs",
  "Restructuring / Bankruptcy",
  "Finance / Capital Markets",
  "Technology / Data Privacy",
  "Healthcare",
  "Family / Trusts & Estates",
];

const GEOGRAPHIES = [
  "New York",
  "Washington D.C.",
  "Los Angeles",
  "San Francisco",
  "Chicago",
  "Boston",
  "Houston",
  "Dallas",
  "Miami",
  "Atlanta",
  "Seattle",
  "Denver",
  "Philadelphia",
  "Minneapolis",
  "Other Major Market",
];

const ROLES = ["Equity Partner", "Non-Equity Partner", "Counsel"];

const DEFAULT_INPUTS: Inputs = {
  practiceArea: "Corporate / M&A",
  geography: "New York",
  rackRate: 1050,
  realization: 85,
  billableHours: 1800,
  originations: 2_000_000,
  originationCredit: 60,
  portability: 70,
  role: "Equity Partner",
  leverage: 2.0,
  profitMargin: 40,
};

// ─── Calculation Logic ────────────────────────────────────────────────────────

// Practice area demand multiplier applied to comp range
const PRACTICE_MULTIPLIER: Record<string, number> = {
  "Private Equity":               1.15,
  "Corporate / M&A":              1.15,
  "Restructuring / Bankruptcy":   1.08,
  "Finance / Capital Markets":    1.08,
  "Intellectual Property":        1.08,
  "Technology / Data Privacy":    1.04,
  "Litigation":                   1.0,
  "Real Estate":                  1.0,
  "Tax":                          1.0,
  "Regulatory / Government Affairs": 1.0,
  "Healthcare":                   0.96,
  "Employment / Labor":           0.92,
  "Family / Trusts & Estates":    0.92,
};

// Geography cost-of-market multiplier applied to comp range
const GEO_MULTIPLIER: Record<string, number> = {
  "New York":          1.15,
  "San Francisco":     1.15,
  "Washington D.C.":   1.08,
  "Los Angeles":       1.08,
  "Boston":            1.08,
  "Chicago":           1.0,
  "Houston":           1.0,
  "Seattle":           1.0,
  "Dallas":            0.97,
  "Miami":             0.97,
  "Atlanta":           0.95,
  "Denver":            0.95,
  "Philadelphia":      0.95,
  "Minneapolis":       0.95,
  "Other Major Market": 0.95,
};

function calculate(inputs: Inputs) {
  const {
    practiceArea,
    geography,
    rackRate,
    realization,
    billableHours,
    originations,
    originationCredit,
    portability,
    role,
    leverage,
    profitMargin,
  } = inputs;

  const billingRevenue = billableHours * rackRate * (realization / 100);
  const originationRevenue = originations * (originationCredit / 100);
  const effectiveRevenue = billingRevenue + originationRevenue;

  const portabilityFactor = 0.7 + 0.3 * (portability / 100);
  const leverageFactor = 1 + (leverage - 1) * 0.25;
  const adjustedRevenue = effectiveRevenue * portabilityFactor * leverageFactor;

  const profitContribution = adjustedRevenue * (profitMargin / 100);

  let compLow = profitContribution * 0.25;
  let compHigh = profitContribution * 0.4;

  if (portability > 70) compHigh *= 1.12;
  if (role === "Equity Partner") {
    compLow *= 1.08;
    compHigh *= 1.15;
  }
  if (realization < 75) {
    compLow *= 0.92;
    compHigh *= 0.92;
  }
  if (originations > 3_000_000) compHigh *= 1.1;

  // Apply practice area and geography multipliers
  const practiceMult = PRACTICE_MULTIPLIER[practiceArea] ?? 1.0;
  const geoMult = GEO_MULTIPLIER[geography] ?? 1.0;
  compLow  *= practiceMult * geoMult;
  compHigh *= practiceMult * geoMult;

  let tier: "Top 10%" | "Above Average" | "Average" | "Below Average";
  if (profitContribution >= 3_000_000) tier = "Top 10%";
  else if (profitContribution >= 1_500_000) tier = "Above Average";
  else if (profitContribution >= 750_000) tier = "Average";
  else tier = "Below Average";

  const midComp = (compLow + compHigh) / 2;
  let negotiationInsight = "";
  let negotiationLabel: "Likely Underpaid" | "Fairly Valued" | "Outperforming Market";

  if (portability >= 70 && originations >= 2_000_000) {
    negotiationLabel = "Outperforming Market";
    negotiationInsight =
      "Your portable book of business is your most powerful negotiating asset. Firms competing for lawyers at your level will price that mobility aggressively — you have real leverage here.";
  } else if (profitContribution > midComp * 3.2) {
    negotiationLabel = "Likely Underpaid";
    negotiationInsight =
      "The gap between what you generate and what the market would pay is material. Lawyers with your production profile routinely command compensation well above where most firms anchor initial offers.";
  } else if (profitContribution > midComp * 2.5) {
    negotiationLabel = "Likely Underpaid";
    negotiationInsight =
      "Your economic contribution appears to outpace your likely compensation. That's not unusual — most partners don't fully understand their market value until they're actively in a search.";
  } else if (tier === "Top 10%" || tier === "Above Average") {
    negotiationLabel = "Outperforming Market";
    negotiationInsight =
      "Lawyers generating at this level have options most partners don't. Whether you're looking to move or simply want leverage in your current compensation conversation, the numbers support a strong position.";
  } else {
    negotiationLabel = "Fairly Valued";
    negotiationInsight =
      "Your compensation appears reasonably aligned with market expectations for your profile. The opportunity, if any, is in growing originations or improving realization — both would move the needle meaningfully.";
  }

  return { profitContribution, compLow, compHigh, tier, negotiationLabel, negotiationInsight };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

function fmtFull(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}

const TIER_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Top 10%": { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e" },
  "Above Average": { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  "Average": { bg: "#fefce8", text: "#a16207", dot: "#eab308" },
  "Below Average": { bg: "#fef2f2", text: "#b91c1c", dot: "#ef4444" },
};

const NEGOTIATION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Likely Underpaid": { bg: "#fffbeb", text: "#92400e", border: "#fcd34d" },
  "Fairly Valued": { bg: "#f0fdf4", text: "#166534", border: "#86efac" },
  "Outperforming Market": { bg: "#eff6ff", text: "#1e3a8a", border: "#93c5fd" },
};

// ─── Slider + Type-in Component ───────────────────────────────────────────────

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayFormat: (v: number) => string;
  /** Parse a user-typed string back to a number. Return null if invalid. */
  parseTyped: (s: string) => number | null;
  /** Placeholder shown in the type-in field */
  typedPlaceholder: string;
  onChange: (v: number) => void;
  sublabel?: string;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  displayFormat,
  parseTyped,
  typedPlaceholder,
  onChange,
  sublabel,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const [typedValue, setTypedValue] = useState("");
  const [editing, setEditing] = useState(false);

  const commitTyped = useCallback(
    (raw: string) => {
      const parsed = parseTyped(raw);
      if (parsed !== null) {
        const clamped = Math.min(max, Math.max(min, parsed));
        // round to nearest step
        const stepped = Math.round((clamped - min) / step) * step + min;
        onChange(stepped);
      }
      setEditing(false);
      setTypedValue("");
    },
    [parseTyped, min, max, step, onChange]
  );

  return (
    <div style={{ marginBottom: 22 }}>
      {/* Label row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", letterSpacing: "0.01em" }}>
            {label}
          </label>
          {sublabel && (
            <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 6 }}>{sublabel}</span>
          )}
        </div>

        {/* Editable value badge */}
        {editing ? (
          <input
            autoFocus
            type="text"
            defaultValue={typedPlaceholder ? "" : String(value)}
            placeholder={typedPlaceholder}
            onChange={(e) => setTypedValue(e.target.value)}
            onBlur={(e) => commitTyped(e.target.value || typedValue)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitTyped((e.target as HTMLInputElement).value);
              if (e.key === "Escape") { setEditing(false); setTypedValue(""); }
            }}
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#111827",
              background: "#fff",
              border: "1.5px solid #6366f1",
              borderRadius: 8,
              padding: "3px 10px",
              width: 90,
              textAlign: "right",
              outline: "none",
              boxShadow: "0 0 0 3px rgba(99,102,241,0.12)",
            }}
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            title="Click to type a value"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#111827",
              background: "#f3f4f6",
              border: "1.5px solid transparent",
              borderRadius: 8,
              padding: "3px 10px",
              minWidth: 80,
              textAlign: "right",
              cursor: "text",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            {displayFormat(value)}
            <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 400 }}>✏️</span>
          </button>
        )}
      </div>

      {/* Slider track */}
      <div style={{ position: "relative", height: 24, display: "flex", alignItems: "center" }}>
        {/* Track background — pointer-events:none so the input below receives all events */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 6,
            borderRadius: 99,
            background: "#e5e7eb",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              borderRadius: 99,
            }}
          />
        </div>

        {/* The actual range input — sits on top, fully transparent */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            margin: 0,
            opacity: 0,
            cursor: "pointer",
            height: 24,
            zIndex: 2,
          }}
        />

        {/* Thumb dot — pointer-events:none */}
        <div
          style={{
            position: "absolute",
            left: `calc(${pct}% - 10px)`,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            border: "2.5px solid #6366f1",
            boxShadow: "0 1px 4px rgba(99,102,241,0.3)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>

      {/* Min/max labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
        <span style={{ fontSize: 10, color: "#d1d5db" }}>{displayFormat(min)}</span>
        <span style={{ fontSize: 10, color: "#d1d5db" }}>{displayFormat(max)}</span>
      </div>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "24px 28px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.04)",
        border: "1px solid #f1f1f5",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0, letterSpacing: "-0.01em" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 7 }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 10,
          border: "1.5px solid #e5e7eb",
          fontSize: 14,
          fontWeight: 500,
          color: "#111827",
          background: "#f9fafb",
          outline: "none",
          cursor: "pointer",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: 36,
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Results Panel ────────────────────────────────────────────────────────────

function ResultsPanel({ results, inputs }: { results: ReturnType<typeof calculate>; inputs: Inputs }) {
  const tierColors = TIER_COLORS[results.tier];
  const negColors = NEGOTIATION_COLORS[results.negotiationLabel];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        border: "1px solid #f1f1f5",
      }}
    >
      {/* Hero compensation range */}
      <div
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          padding: "24px 24px 20px",
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.7)",
            margin: "0 0 4px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Market Value Estimate
        </p>
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          {fmt(results.compLow)}
          <span style={{ fontSize: 22, fontWeight: 700, opacity: 0.8 }}> – </span>
          {fmt(results.compHigh)}
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", margin: "6px 0 0" }}>
          Estimated annual compensation range
        </p>
      </div>

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Profitability score */}
        <div
          style={{
            background: tierColors.bg,
            borderRadius: 12,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: tierColors.text,
                margin: 0,
                opacity: 0.7,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Profitability Score
            </p>
            <p
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: tierColors.text,
                margin: "2px 0 0",
                letterSpacing: "-0.02em",
              }}
            >
              {results.tier}
            </p>
          </div>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: tierColors.dot,
              boxShadow: `0 0 0 4px ${tierColors.bg}, 0 0 0 6px ${tierColors.dot}44`,
            }}
          />
        </div>

        {/* Profit contribution */}
        <div style={{ background: "#f9fafb", borderRadius: 12, padding: "14px 16px" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#6b7280",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Est. Annual Profit Contribution
          </p>
          <p
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#111827",
              margin: "4px 0 0",
              letterSpacing: "-0.02em",
            }}
          >
            {fmtFull(results.profitContribution)}
          </p>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "3px 0 0" }}>to your firm</p>
        </div>

        {/* Negotiation insight */}
        <div
          style={{
            background: negColors.bg,
            border: `1.5px solid ${negColors.border}`,
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 13 }}>
              {results.negotiationLabel === "Likely Underpaid"
                ? "💡"
                : results.negotiationLabel === "Outperforming Market"
                ? "🔥"
                : "✅"}
            </span>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: negColors.text,
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {results.negotiationLabel}
            </p>
          </div>
          <p style={{ fontSize: 13, color: negColors.text, margin: 0, lineHeight: 1.6, opacity: 0.85 }}>
            {results.negotiationInsight}
          </p>
        </div>

        {/* Profile summary */}
        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 14 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#9ca3af",
              margin: "0 0 10px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Your Profile
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              { label: "Practice Area", value: inputs.practiceArea },
              { label: "Market", value: inputs.geography },
              { label: "Role", value: inputs.role },
              { label: "Rack Rate", value: `$${inputs.rackRate.toLocaleString()}/hr` },
              { label: "Realization", value: `${inputs.realization}%` },
              { label: "Originations", value: fmt(inputs.originations) },
              { label: "Book Portability", value: `${inputs.portability}%` },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontSize: 10,
            color: "#c4c4cc",
            lineHeight: 1.5,
            margin: 0,
            borderTop: "1px solid #f3f4f6",
            paddingTop: 12,
          }}
        >
          This tool provides directional market estimates, not financial advice. Compensation varies
          based on firm size, platform, and individual performance factors not captured here.
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProfitabilityCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS);
  // Results are null until the user clicks Calculate
  const [committedInputs, setCommittedInputs] = useState<Inputs | null>(null);
  const [hasChanged, setHasChanged] = useState(false);

  const set = useCallback(
    (key: keyof Inputs) =>
      (v: number | string) => {
        setInputs((prev) => ({ ...prev, [key]: v }));
        setHasChanged(true);
      },
    []
  );

  const handleCalculate = () => {
    setCommittedInputs({ ...inputs });
    setHasChanged(false);
  };

  const results = useMemo(
    () => (committedInputs ? calculate(committedInputs) : null),
    [committedInputs]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f0f0ff 0%, #f8f9fb 40%, #f0fdf4 100%)",
        fontFamily:
          "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        paddingBottom: 60,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e9eaf0",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          ⚖️
        </div>
        <div>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111827",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            MyProfitability Calculator
          </h1>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, marginTop: 1 }}>
            Law Firm Partner Market Value &amp; Compensation Tool
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 0" }}>
        <div
          className="calc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* ── Left Column: Inputs ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <Section title="Your Practice" icon="🏛️">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Dropdown
                  label="Practice Area"
                  value={inputs.practiceArea}
                  options={PRACTICE_AREAS}
                  onChange={set("practiceArea") as (v: string) => void}
                />
                <Dropdown
                  label="Geography"
                  value={inputs.geography}
                  options={GEOGRAPHIES}
                  onChange={set("geography") as (v: string) => void}
                />
              </div>
              <Dropdown
                label="Role"
                value={inputs.role}
                options={ROLES}
                onChange={set("role") as (v: string) => void}
              />
            </Section>

            <Section title="Your Economics" icon="📊">
              <Slider
                label="Rack Rate"
                sublabel="hourly billing rate"
                value={inputs.rackRate}
                min={300}
                max={2000}
                step={25}
                displayFormat={(v) => `$${v.toLocaleString()}/hr`}
                parseTyped={(s) => {
                  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
                  return isNaN(n) ? null : n;
                }}
                typedPlaceholder="e.g. 1050"
                onChange={set("rackRate") as (v: number) => void}
              />
              <Slider
                label="Average Realization Rate"
                sublabel="collected vs. billed"
                value={inputs.realization}
                min={60}
                max={100}
                step={1}
                displayFormat={(v) => `${v}%`}
                parseTyped={(s) => {
                  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
                  return isNaN(n) ? null : n;
                }}
                typedPlaceholder="e.g. 85"
                onChange={set("realization") as (v: number) => void}
              />
              <Slider
                label="Billable Hours"
                sublabel="annual"
                value={inputs.billableHours}
                min={1200}
                max={2400}
                step={50}
                displayFormat={(v) => `${v.toLocaleString()} hrs`}
                parseTyped={(s) => {
                  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
                  return isNaN(n) ? null : n;
                }}
                typedPlaceholder="e.g. 1800"
                onChange={set("billableHours") as (v: number) => void}
              />
            </Section>

            <Section title="Your Book of Business" icon="💼">
              <Slider
                label="Annual Originations"
                sublabel="business generated"
                value={inputs.originations}
                min={0}
                max={20_000_000}
                step={100_000}
                displayFormat={(v) => fmt(v)}
                parseTyped={(s) => {
                  // Accept "2M", "500K", or plain numbers
                  const clean = s.trim().toLowerCase();
                  if (clean.endsWith("m")) {
                    const n = parseFloat(clean);
                    return isNaN(n) ? null : n * 1_000_000;
                  }
                  if (clean.endsWith("k")) {
                    const n = parseFloat(clean);
                    return isNaN(n) ? null : n * 1_000;
                  }
                  const n = parseFloat(clean.replace(/[^0-9.]/g, ""));
                  return isNaN(n) ? null : n;
                }}
                typedPlaceholder="e.g. 2M or 500K"
                onChange={set("originations") as (v: number) => void}
              />
              <Slider
                label="Origination Credit %"
                sublabel="credit you receive for originated work"
                value={inputs.originationCredit}
                min={0}
                max={100}
                step={5}
                displayFormat={(v) => `${v}%`}
                parseTyped={(s) => {
                  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
                  return isNaN(n) ? null : n;
                }}
                typedPlaceholder="e.g. 60"
                onChange={set("originationCredit") as (v: number) => void}
              />
              <Slider
                label="Portability of Book"
                sublabel="estimated % that follows you if you move"
                value={inputs.portability}
                min={0}
                max={100}
                step={5}
                displayFormat={(v) => `${v}%`}
                parseTyped={(s) => {
                  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
                  return isNaN(n) ? null : n;
                }}
                typedPlaceholder="e.g. 70"
                onChange={set("portability") as (v: number) => void}
              />
            </Section>

            <Section title="Firm Context" icon="🏢">
              <Slider
                label="Associate Leverage Ratio"
                sublabel="associates per partner"
                value={inputs.leverage}
                min={0.5}
                max={5.0}
                step={0.1}
                displayFormat={(v) => `${v.toFixed(1)}x`}
                parseTyped={(s) => {
                  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
                  return isNaN(n) ? null : n;
                }}
                typedPlaceholder="e.g. 2.0"
                onChange={set("leverage") as (v: number) => void}
              />
              <Slider
                label="Estimated Firm Profit Margin"
                sublabel="profit per revenue dollar"
                value={inputs.profitMargin}
                min={20}
                max={60}
                step={1}
                displayFormat={(v) => `${v}%`}
                parseTyped={(s) => {
                  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
                  return isNaN(n) ? null : n;
                }}
                typedPlaceholder="e.g. 40"
                onChange={set("profitMargin") as (v: number) => void}
              />
            </Section>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: "-0.01em",
                color: "#fff",
                background: hasChanged || !committedInputs
                  ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                  : "#d1d5db",
                boxShadow: hasChanged || !committedInputs
                  ? "0 4px 20px rgba(99,102,241,0.4)"
                  : "none",
                transition: "all 0.2s ease",
                transform: hasChanged || !committedInputs ? "translateY(0)" : "none",
              }}
            >
              {committedInputs && !hasChanged
                ? "✓ Results Up to Date"
                : committedInputs
                ? "↻ Update Results"
                : "Calculate My Market Value →"}
            </button>
          </div>

          {/* ── Right Column: Results ── */}
          <div style={{ position: "sticky", top: 24 }}>
            {results ? (
              <ResultsPanel results={results} inputs={committedInputs!} />
            ) : (
              /* Placeholder before first calculate */
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "48px 32px",
                  textAlign: "center",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
                  border: "1px solid #f1f1f5",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>⚖️</div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#374151", margin: "0 0 8px" }}>
                  Ready to see your market value?
                </p>
                <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6, margin: "0 0 24px" }}>
                  Adjust the inputs on the left to match your profile, then click the button below to
                  see how the market would value someone like you.
                </p>
                <button
                  onClick={handleCalculate}
                  style={{
                    padding: "12px 24px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                  }}
                >
                  Calculate My Market Value →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        input[type=range] {
          -webkit-appearance: none;
          appearance: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
        }
        input[type=range]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border: none;
          background: transparent;
        }
        select:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        @media (max-width: 780px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
