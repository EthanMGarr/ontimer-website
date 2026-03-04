"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";

export default function AndroidPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Android — Coming Soon
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            OnTimer for{" "}
            <span className="text-green-500">Android</span> is on its way.
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            We&apos;re working hard to bring OnTimer to Android. Drop your email
            below and you&apos;ll be the first to know when it launches.
          </p>

          {/* Waitlist form */}
          <div className="mt-10">
            {submitted ? (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-8 py-10">
                <div className="mb-3 text-4xl">🎉</div>
                <h2 className="text-2xl font-black text-white">
                  You&apos;re on the list!
                </h2>
                <p className="mt-2 text-zinc-400">
                  We&apos;ll email <strong className="text-white">{email}</strong>{" "}
                  as soon as OnTimer for Android is available.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-green-500"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-green-500 px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
                  >
                    Notify Me
                  </button>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  No spam. One email when Android launches.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Features preview */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-black text-white">
            Everything coming to Android
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: "📅",
                title: "Calendar Sync",
                desc: "Full integration with Google Calendar, Samsung Calendar, and more.",
              },
              {
                icon: "⏰",
                title: "Automatic Alarms",
                desc: "Same zero-setup experience — OnTimer creates alarms from your events.",
              },
              {
                icon: "🔔",
                title: "Smart Alerts",
                desc: "Persistent, escalating notifications that cut through Do Not Disturb.",
              },
              {
                icon: "🎛️",
                title: "Full Customization",
                desc: "Choose your lead times, which calendars to track, and snooze behavior.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="mb-3 text-2xl">{f.icon}</div>
                <h3 className="font-bold text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* iOS CTA */}
      <section className="border-t border-zinc-800 py-20 text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white">
            Have an iPhone?
          </h2>
          <p className="mt-3 text-zinc-400">
            OnTimer is available right now on iOS. Start being on time today.
          </p>
          <div className="mt-6">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
