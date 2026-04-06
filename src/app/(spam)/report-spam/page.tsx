"use client";

import { useState, useRef, useCallback } from "react";
import Script from "next/script";

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
  // Format as datetime-local compatible value
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReportSpamPage() {
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
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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
      // When opening for the first time, pre-select "Today"
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

      const res = await fetch("/api/spam-report", { method: "POST", body });
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
    const lookupUrl = phoneDigits
      ? `https://directory.youmail.com/phone/${phoneDigits}`
      : "https://www.youmail.com/features/reverse-phone-number-lookup/";

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        style={{ background: "linear-gradient(160deg, #eef2fb 0%, #dde8f8 100%)" }}>
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Report submitted</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            Thank you for helping protect others. Your report has been recorded.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={lookupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all text-center block"
              style={{ background: "#2563eb" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1d4ed8")}
              onMouseLeave={e => (e.currentTarget.style.background = "#2563eb")}
            >
              See what else we know about this number
            </a>
            <button
              onClick={handleReset}
              className="w-full py-3 px-6 rounded-xl font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
            >
              Report another number
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Form ────────────────────────────────────────────────────────────────

  return (
    <>
      {siteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      )}

      <div className="min-h-screen flex flex-col"
        style={{ background: "linear-gradient(160deg, #eef2fb 0%, #dde8f8 100%)" }}>

        {/* ── Hero ── */}
        <section className="flex flex-col items-center text-center pt-16 pb-10 px-4">
          {/* Shield icon */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            National Spam<br />Reporting Center
          </h1>

          <p className="text-xl font-semibold text-blue-600 mb-3">
            Report spam phone numbers in seconds
          </p>

          <p className="text-base text-gray-500 max-w-md mb-4 leading-relaxed">
            Help protect millions by reporting suspicious calls, texts, and scam numbers
          </p>

          <p className="text-sm text-gray-400">
            A telecommunications industry initiative powered by YouMail
          </p>
        </section>

        {/* ── Form Card ── */}
        <section className="flex justify-center px-4 pb-16">
          <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 sm:p-10">

            {/* Phone Number */}
            <div className="mb-5">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(555) 555-5555"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-base outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                style={{ fontSize: "1rem" }}
              />
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm font-medium text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Share an image
              </label>
              <p className="text-xs text-gray-400 mb-3">
                Upload a JPG, PNG, or PDF showing the number that contacted you (text message, call log, email, etc.)
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
              >
                {file ? (
                  <>
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-600">{file.name}</span>
                    <span className="text-xs text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB — click to change
                    </span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-500">Click to upload</span>
                    <span className="text-xs text-gray-400">JPG, PNG, PDF — max 10 MB</span>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Optional: More Info Toggle */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleToggleDetails}
                className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${showDetails ? "rotate-90" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Provide More Info About the Call
              </button>
            </div>

            {/* Expandable Details */}
            {showDetails && (
              <div className="mb-6 space-y-6 pt-1">

                {/* How did you encounter this number */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">How did you encounter this phone number</p>
                  <div className="grid grid-cols-1 gap-2">
                    {ENCOUNTER_OPTIONS.map(opt => (
                      <label key={opt.value}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                          encounterType === opt.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}>
                        <input
                          type="radio"
                          name="encounter_type"
                          value={opt.value}
                          checked={encounterType === opt.value}
                          onChange={() => setEncounterType(opt.value)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* When did this happen */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">When did this happen?</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {WHEN_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleWhenOption(opt.value, opt.daysAgo)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          whenOption === opt.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                        }`}
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
                          className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          Specify exact date and time
                        </button>
                      )}
                      {showExactTime && (
                        <input
                          type="datetime-local"
                          value={occurredAt}
                          onChange={e => setOccurredAt(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Tell us about the call */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Tell us about the call</p>
                  <div className="grid grid-cols-1 gap-2">
                    {CATEGORY_OPTIONS.map(opt => (
                      <label key={opt.value}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                          category === opt.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}>
                        <input
                          type="radio"
                          name="category"
                          value={opt.value}
                          checked={category === opt.value}
                          onChange={() => setCategory(opt.value)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Divider before CTA */}
            <div className="h-px bg-gray-100 mb-6" />

            {/* Error message */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Captcha */}
            {siteKey && (
              <div className="mb-5 flex justify-center">
                <div
                  className="cf-turnstile"
                  data-sitekey={siteKey}
                  data-theme="light"
                />
              </div>
            )}

            {/* Helper text */}
            <p className="text-xs text-center text-gray-400 mb-4">
              No account required. Reporting takes seconds.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl font-bold text-white text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: loading ? "#93c5fd" : "#2563eb" }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#1d4ed8"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#2563eb"; }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Submitting…
                </span>
              ) : (
                "Submit Spam Report"
              )}
            </button>

            {/* Footer trust line */}
            <p className="text-xs text-center text-gray-400 mt-5">
              🔒 Your report is confidential and protected
            </p>
          </form>
        </section>
      </div>
    </>
  );
}
