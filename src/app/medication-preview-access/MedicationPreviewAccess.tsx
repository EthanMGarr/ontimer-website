"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

const ALLOWED_DESTINATIONS = new Set(["/provider-medication-schedule", "/medication-schedule"]);

export default function MedicationPreviewAccess() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/medication-preview-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) {
        setError(result.error || "Unable to unlock this preview.");
        return;
      }
      const requested = searchParams.get("next") || "/provider-medication-schedule";
      const destination = ALLOWED_DESTINATIONS.has(requested) ? requested : "/provider-medication-schedule";
      window.location.assign(`${destination}${window.location.hash}`);
    } catch {
      setError("Unable to unlock this preview. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-5 py-16">
      <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-400">Private preview</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Medication schedule tool</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">Enter the shared password to continue. This early version is available only to invited reviewers.</p>
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="preview-password" className="text-sm font-semibold text-zinc-300">Password</label>
          <input id="preview-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required autoFocus className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-3 text-base text-white outline-2 outline-transparent focus-visible:border-green-500 focus-visible:outline-green-500" />
          {error && <p role="alert" className="mt-3 text-sm font-medium text-red-300">{error}</p>}
          <button type="submit" disabled={submitting || !password} className="mt-5 w-full whitespace-nowrap rounded-full bg-green-500 px-5 py-3.5 text-sm font-bold text-black hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400">{submitting ? "Unlocking…" : "Continue"}</button>
        </form>
      </div>
    </section>
  );
}
