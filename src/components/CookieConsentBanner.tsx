"use client";

import { useEffect, useState } from "react";
import { getCookie, isConsentRequired, recordConsent, CONSENT_COOKIE } from "@/lib/consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const localPreview = process.env.NODE_ENV !== "production"
      && new URLSearchParams(window.location.search).get("consent-preview") === "regulated";
    if (localPreview || (isConsentRequired() && !getCookie(CONSENT_COOKIE))) {
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
      role="region"
      aria-live="polite"
      aria-labelledby="cookie-consent-title"
      className="site-consent"
    >
      <div className="site-consent__inner">
        <div className="site-consent__copy">
          <h2 id="cookie-consent-title">Cookie choices</h2>
          <p>
            We use analytics cookies to understand how visitors use this site.
            You can accept or decline. See our{" "}
            <a href="https://www.ontimer.app/OnTimer_Privacy_Policy.html">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="site-consent__actions">
          <button
            type="button"
            onClick={() => respond("denied")}
            className="site-consent__button site-consent__button--secondary"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => respond("granted")}
            className="site-consent__button site-consent__button--primary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
