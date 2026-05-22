"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { APP_STORE_URL } from "@/lib/constants";
import {
  trackAppStoreClick,
  trackQRCodeVisible,
  trackQRCodeClick,
} from "@/lib/analytics";

interface AppStoreCTAProps {
  location?: string;
}

function AppleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 814 1000"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.8-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 268.7-317.3 70.6 0 129.4 46.4 173.5 46.4 42.1 0 108.4-49.2 189.3-49.2 30.2 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

export function AppStoreCTA({ location = "cta" }: AppStoreCTAProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsDesktop(!isMobile);
  }, []);

  useEffect(() => {
    if (mounted && isDesktop) {
      trackQRCodeVisible(location);
    }
  }, [mounted, isDesktop, location]);

  // Before hydration, render the mobile button to avoid layout shift
  if (!mounted) {
    return (
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 rounded-full bg-green-500 px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-green-400"
      >
        <AppleIcon className="h-4 w-4" />
        Download on the App Store
      </a>
    );
  }

  if (isDesktop) {
    return (
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
        <div className="flex flex-col items-center gap-3">
          <div
            className="cursor-pointer rounded-xl bg-white p-3 shadow-lg transition-opacity hover:opacity-90"
            onClick={() => trackQRCodeClick(location)}
          >
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scan QR code to download OnTimer"
            >
              <QRCodeSVG
                value={APP_STORE_URL}
                size={128}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                includeMargin={true}
              />
            </a>
          </div>
          <p className="text-sm font-semibold text-zinc-300">
            Scan to Install OnTimer
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3">
          <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
            Open your iPhone camera and point it at the QR code to download.
          </p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-green-500 px-6 py-2.5 text-sm font-semibold text-green-500 transition-colors hover:bg-green-500 hover:text-black"
            onClick={() => trackAppStoreClick(location)}
          >
            <AppleIcon className="h-4 w-4" />
            Open in App Store
          </a>
        </div>
      </div>
    );
  }

  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-full bg-green-500 px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-green-400"
      onClick={() => trackAppStoreClick(location)}
    >
      <AppleIcon className="h-4 w-4" />
      Download on the App Store
    </a>
  );
}
