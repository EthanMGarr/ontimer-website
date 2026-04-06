import { useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type EncounterType =
  | "phone_call"
  | "voicemail"
  | "text_sms"
  | "imessage"
  | "rcs"
  | "email"
  | "other";

type Category =
  | "spam_marketing"
  | "scam"
  | "threat_harassment"
  | "unsure";

type WhenOption = "today" | "last_few_days" | "last_week" | "not_sure";

// ─── Constants ─────────────────────────────────────────────────────────────────

const ENCOUNTER_OPTIONS: { value: EncounterType; label: string }[] = [
  { value: "phone_call", label: "Phone call" },
  { value: "voicemail", label: "Voicemail" },
  { value: "text_sms", label: "Text message (SMS)" },
  { value: "imessage", label: "iMessage" },
  { value: "rcs", label: "RCS (WhatsApp, Messenger, etc.)" },
  { value: "email", label: "Email" },
  { value: "other", label: "Other" },
];

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "spam_marketing", label: "It was a spam or marketing call" },
  { value: "scam", label: "Scam attempt" },
  { value: "threat_harassment", label: "Threat or harassment" },
  { value: "unsure", label: "Unsure" },
];

const WHEN_OPTIONS: { value: WhenOption; label: string; daysAgo: number | null }[] = [
  { value: "today", label: "Today", daysAgo: 0 },
  { value: "last_few_days", label: "In the last few days", daysAgo: 3 },
  { value: "last_week", label: "Last week", daysAgo: 7 },
  { value: "not_sure", label: "Not sure", daysAgo: null },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function dateFromDaysAgo(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ─── Widget Component ─────────────────────────────────────────────────────────

export default function SpamReportWidget() {
  // Form state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [encounterType, setEncounterType] = useState<EncounterType | null>(null);
  const [occurredAt, setOccurredAt] = useState("");
  const [whenOption, setWhenOption] = useState<WhenOption | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  // UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [showExactTime, setShowExactTime] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
    setError("");
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && selected.size > 10 * 1024 * 1024) {
      setError("File must be under 10 MB.");
      return;
    }
    setFile(selected);
    setError("");
  }, []);

  const handleWhenOption = useCallback((option: WhenOption, daysAgo: number | null) => {
    setWhenOption(option);
    if (option === "not_sure") {
      setOccurredAt("");
      setShowExactTime(false);
    } else if (daysAgo !== null) {
      setOccurredAt(dateFromDaysAgo(daysAgo));
    }
  }, []);

  const handleToggleDetails = useCallback(() => {
    setShowDetails(v => {
      const opening = !v;
      if (opening && whenOption === null) {
        setWhenOption("today");
        setOccurredAt(dateFromDaysAgo(0));
      }
      return opening;
    });
  }, [whenOption]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber.trim() && !file) {
      setError("Please enter a phone number or upload an image.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const body = new FormData();
      if (phoneNumber.trim()) body.append("phone_number", phoneNumber.trim());
      if (file) body.append("file", file);
      if (encounterType) body.append("encounter_type", encounterType);
      if (occurredAt && whenOption !== "not_sure") body.append("occurred_at", occurredAt);
      if (category) body.append("category", category);

      const res = await fetch("https://www.ontimer.app/api/spam-report", { method: "POST", body });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
      } else {
        setSubmittedPhone(phoneNumber.trim());
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [phoneNumber, file, encounterType, occurredAt, whenOption, category]);

  const handleReset = useCallback(() => {
    setPhoneNumber("");
    setFile(null);
    setShowDetails(false);
    setEncounterType(null);
    setOccurredAt("");
    setWhenOption(null);
    setCategory(null);
    setError("");
    setSubmitted(false);
    setSubmittedPhone("");
    setShowExactTime(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ── Success State ────────────────────────────────────────────────────────────

  if (submitted) {
    const phoneDigits = submittedPhone.replace(/\D/g, "");
    const formattedPhone = phoneDigits.length === 10
      ? `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`
      : phoneDigits;
    const lookupUrl = formattedPhone
      ? `https://directory.youmail.com/phone/${formattedPhone}`
      : "https://directory.youmail.com/";

    return (
      <div style={{ textAlign: "center", padding: "32px 16px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "#dcfce7",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px"
        }}>
          <svg width="32" height="32" fill="none" stroke="#16a34a" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
          Thanks for Reporting!
        </h2>
        <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 28 }}>
          Your report helps us stop spammers &amp; scammers.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href={lookupUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", padding: "12px 24px", borderRadius: 12,
              fontWeight: 600, color: "#fff", background: "#2563eb",
              textDecoration: "none", fontSize: 15,
            }}
          >
            See what others have reported
          </a>
          <button
            onClick={handleReset}
            style={{
              padding: "12px 24px", borderRadius: 12, fontWeight: 600,
              color: "#374151", background: "#fff", border: "1px solid #e5e7eb",
              cursor: "pointer", fontSize: 15,
            }}
          >
            Report another number
          </button>
          <a
            href="https://www.youmail.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block", padding: "12px 24px", borderRadius: 12,
              fontWeight: 600, color: "#374151", background: "#fff",
              border: "1px solid #e5e7eb", textDecoration: "none", fontSize: 15,
            }}
          >
            Get free spam protection
          </a>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit}>

      {/* Phone Number */}
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="sw-phone" style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
          Enter Phone Number
        </label>
        <input
          id="sw-phone"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(555) 555-5555"
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 12,
            border: "1px solid #e5e7eb", fontSize: 16, color: "#111827",
            outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* OR Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>OR</span>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
      </div>

      {/* File Upload */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
          Share an image
        </label>
        <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>
          Upload a JPG, PNG, or PDF showing the number that contacted you (text message, call log, email, etc.)
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 8, padding: "24px 16px", borderRadius: 12,
            border: "2px dashed #e5e7eb", background: "#fff", cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          {file ? (
            <>
              <svg width="24" height="24" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#2563eb" }}>{file.name}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{(file.size / 1024 / 1024).toFixed(2)} MB — click to change</span>
            </>
          ) : (
            <>
              <svg width="24" height="24" fill="none" stroke="#9ca3af" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span style={{ fontSize: 13, color: "#6b7280" }}>Click to upload</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>JPG, PNG, PDF — max 10 MB</span>
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      {/* More Info Toggle */}
      <div style={{ marginBottom: 24 }}>
        <button
          type="button"
          onClick={handleToggleDetails}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 14, fontWeight: 600, color: "#2563eb",
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
        >
          <svg
            width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            style={{ transform: showDetails ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Provide More Info About the Call
        </button>
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Encounter type */}
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 12 }}>
              How did you encounter this phone number
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ENCOUNTER_OPTIONS.map(opt => (
                <label key={opt.value} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  borderRadius: 12, border: `1px solid ${encounterType === opt.value ? "#3b82f6" : "#e5e7eb"}`,
                  background: encounterType === opt.value ? "#eff6ff" : "#fff", cursor: "pointer",
                }}>
                  <input
                    type="radio"
                    name="sw_encounter_type"
                    value={opt.value}
                    checked={encounterType === opt.value}
                    onChange={() => setEncounterType(opt.value)}
                    style={{ accentColor: "#2563eb" }}
                  />
                  <span style={{ fontSize: 14, color: "#374151" }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* When */}
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 12 }}>
              When did this happen?
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              {WHEN_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleWhenOption(opt.value, opt.daysAgo)}
                  style={{
                    padding: "10px 12px", borderRadius: 12, fontSize: 14, fontWeight: 500,
                    border: `1px solid ${whenOption === opt.value ? "#3b82f6" : "#e5e7eb"}`,
                    background: whenOption === opt.value ? "#eff6ff" : "#fff",
                    color: whenOption === opt.value ? "#1d4ed8" : "#4b5563",
                    cursor: "pointer",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {whenOption !== "not_sure" && (
              <>
                {!showExactTime && (
                  <button
                    type="button"
                    onClick={() => setShowExactTime(true)}
                    style={{ fontSize: 12, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    Specify exact date and time
                  </button>
                )}
                {showExactTime && (
                  <input
                    type="datetime-local"
                    value={occurredAt}
                    onChange={e => setOccurredAt(e.target.value)}
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: 12,
                      border: "1px solid #e5e7eb", fontSize: 14, color: "#374151",
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                )}
              </>
            )}
          </div>

          {/* Category */}
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 12 }}>
              Tell us about the call
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CATEGORY_OPTIONS.map(opt => (
                <label key={opt.value} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                  borderRadius: 12, border: `1px solid ${category === opt.value ? "#3b82f6" : "#e5e7eb"}`,
                  background: category === opt.value ? "#eff6ff" : "#fff", cursor: "pointer",
                }}>
                  <input
                    type="radio"
                    name="sw_category"
                    value={opt.value}
                    checked={category === opt.value}
                    onChange={() => setCategory(opt.value)}
                    style={{ accentColor: "#2563eb" }}
                  />
                  <span style={{ fontSize: 14, color: "#374151" }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: "#f3f4f6", marginBottom: 24 }} />

      {/* Error */}
      {error && (
        <div style={{
          marginBottom: 16, padding: "12px 16px", borderRadius: 12,
          border: "1px solid #fecaca", background: "#fef2f2", fontSize: 14, color: "#dc2626",
        }}>
          {error}
        </div>
      )}

      {/* Helper text */}
      <p style={{ fontSize: 12, textAlign: "center", color: "#9ca3af", marginBottom: 16 }}>
        No account required. Reporting takes seconds.
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%", padding: "16px 24px", borderRadius: 12, fontWeight: 700,
          fontSize: 16, color: "#fff", background: loading ? "#93c5fd" : "#2563eb",
          border: "none", cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1, boxSizing: "border-box",
        }}
      >
        {loading ? "Submitting…" : "Submit Spam Report"}
      </button>

      <p style={{ fontSize: 12, textAlign: "center", color: "#9ca3af", marginTop: 16 }}>
        🔒 Your report is confidential and protected
      </p>
    </form>
  );
}
