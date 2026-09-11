"use client";

import { useEffect, useId, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ANDROID_WAITLIST_URL, APP_STORE_URL } from "@/lib/constants";
import { trackAndroidWaitlistClick, trackAppStoreClick, trackQRCodeClick, trackQRCodeVisible } from "@/lib/analytics";

type DeviceMode = "unknown" | "desktop" | "android" | "ios";

function AppleMark() {
  return <svg viewBox="0 0 814 1000" aria-hidden="true" className="hp2-cta__apple"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.8-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 268.7-317.3 70.6 0 129.4 46.4 173.5 46.4 42.1 0 108.4-49.2 189.3-49.2 30.2 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" /></svg>;
}

export function Homepage2DownloadCTA({ location, compact = false }: { location: string; compact?: boolean }) {
  const [mode, setMode] = useState<DeviceMode>("unknown");
  const [open, setOpen] = useState(false);
  const popoverId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) setMode("android");
    else if (/iPhone|iPad|iPod/i.test(ua) || navigator.maxTouchPoints > 1) setMode("ios");
    else setMode("desktop");
  }, []);

  useEffect(() => {
    if (!open) return;
    trackQRCodeVisible(location);
    const dismiss = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [location, open]);

  if (mode === "android") {
    return <a href={ANDROID_WAITLIST_URL} target="_blank" rel="noopener noreferrer" className={`hp2-cta ${compact ? "hp2-cta--compact" : ""}`} onClick={() => trackAndroidWaitlistClick(location)}>Join the Android waitlist</a>;
  }

  if (mode !== "desktop") {
    return <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={`hp2-cta ${compact ? "hp2-cta--compact" : ""}`} onClick={() => trackAppStoreClick(location)}><AppleMark />{compact ? "Download" : "Download on the App Store"}</a>;
  }

  return (
    <div className="hp2-cta-wrap" ref={rootRef}>
      <button type="button" className={`hp2-cta ${compact ? "hp2-cta--compact" : ""}`} aria-expanded={open} aria-controls={popoverId} onClick={() => setOpen((current) => !current)}>
        <AppleMark />{compact ? "Download" : "Download on the App Store"}
      </button>
      {open ? (
        <div className="hp2-qr" id={popoverId} role="dialog" aria-label="Download OnTimer on iPhone">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hp2-qr__code" aria-label="Open the OnTimer App Store listing" onClick={() => trackQRCodeClick(location)}>
            <QRCodeSVG value={APP_STORE_URL} size={144} level="M" includeMargin />
          </a>
          <div><strong>Scan with your iPhone</strong><span>Or open the App Store listing directly.</span></div>
        </div>
      ) : null}
    </div>
  );
}
