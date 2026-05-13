"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import { APP_STORE_URL } from "@/lib/constants";

interface AppStoreQRPopoverProps {
  children: ReactNode;
  placement?: "below" | "above";
  location?: string;
}

function track(event: string, location: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, {
    page_path: window.location.pathname,
    button_location: location,
  });
}

export function AppStoreQRPopover({
  children,
  placement = "below",
  location = "qr_popover",
}: AppStoreQRPopoverProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsDesktop(!isMobile);
  }, []);

  useEffect(() => {
    if (!open) return;
    track("qr_code_visible", location);

    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, location]);

  // Before hydration or on mobile — render children transparently
  if (!mounted || !isDesktop) {
    return <>{children}</>;
  }

  const popoverPosition =
    placement === "above"
      ? "bottom-full mb-2"
      : "top-full mt-2";

  return (
    <div ref={containerRef} className="relative inline-block">
      <div
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
        className="cursor-pointer"
      >
        {children}
      </div>

      {open && (
        <div
          className={`absolute right-0 z-50 w-56 rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-2xl ${popoverPosition}`}
        >
          {/* Arrow indicator */}
          {placement === "below" && (
            <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 rounded-sm border-l border-t border-zinc-700 bg-zinc-900" />
          )}
          {placement === "above" && (
            <div className="absolute -bottom-1.5 right-4 h-3 w-3 rotate-45 rounded-sm border-b border-r border-zinc-700 bg-zinc-900" />
          )}

          <div className="flex flex-col items-center gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("qr_code_click", location)}
              className="rounded-lg bg-white p-2 transition-opacity hover:opacity-90"
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
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-200">
                Scan to download OnTimer
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">
                Point your iPhone camera at this code
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
