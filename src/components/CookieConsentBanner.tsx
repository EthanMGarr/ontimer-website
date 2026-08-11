"use client";

import { useEffect, useState } from "react";
import { getCookie, isConsentRequired, recordConsent, CONSENT_COOKIE } from "@/lib/consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isConsentRequired() && !getCookie(CONSENT_COOKIE)) {
      setVisible(true);
    }
  }, []);

  function respond(value: "granted" | "denied") {
    recordConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-zinc-950/95 px-4 py-4 backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-300">
          We use analytics cookies to understand how visitors use this site.
          You can accept or decline — see our{" "}
          <a href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => respond("denied")}
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-zinc-900"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => respond("granted")}
            className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-green-400"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
