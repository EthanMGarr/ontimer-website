"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import { APP_STORE_URL } from "@/lib/constants";
import { appStoreQrUrl } from "@/lib/app-store-links";
import { trackQRCodeVisible, trackQRCodeClick } from "@/lib/analytics";

interface AppStoreQRPopoverProps {
  children: ReactNode;
  placement?: "below" | "above";
  location?: string;
  appStoreUrl?: string;
}

export function AppStoreQRPopover({
  children,
  placement = "below",
  location = "qr_popover",
  appStoreUrl = APP_STORE_URL,
}: AppStoreQRPopoverProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    arrowLeft: 192,
    placement,
  });

  const positionPopover = useCallback(() => {
    const trigger = containerRef.current;
    const popover = popoverRef.current;
    if (!trigger || !popover) return;

    const viewportMargin = 12;
    const gap = 8;
    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const roomBelow = window.innerHeight - triggerRect.bottom - viewportMargin;
    const roomAbove = triggerRect.top - viewportMargin;
    const actualPlacement = placement === "below"
      ? roomBelow >= popoverRect.height || roomBelow >= roomAbove ? "below" : "above"
      : roomAbove >= popoverRect.height || roomAbove >= roomBelow ? "above" : "below";
    const naturalTop = actualPlacement === "below"
      ? triggerRect.bottom + gap
      : triggerRect.top - popoverRect.height - gap;
    const maxLeft = Math.max(viewportMargin, window.innerWidth - popoverRect.width - viewportMargin);
    const left = Math.min(
      Math.max(viewportMargin, triggerRect.right - popoverRect.width),
      maxLeft,
    );
    const maxTop = Math.max(viewportMargin, window.innerHeight - popoverRect.height - viewportMargin);
    const top = Math.min(Math.max(viewportMargin, naturalTop), maxTop);
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const arrowLeft = Math.min(
      Math.max(16, triggerCenter - left),
      popoverRect.width - 16,
    );

    setPosition({ left, top, arrowLeft, placement: actualPlacement });
  }, [placement]);

  useEffect(() => {
    setMounted(true);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsDesktop(!isMobile);
  }, []);

  useEffect(() => {
    if (!open) return;
    trackQRCodeVisible(location);

    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !popoverRef.current?.contains(target)
      ) {
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

  useLayoutEffect(() => {
    if (!open) return;
    positionPopover();
    window.addEventListener("resize", positionPopover);
    window.addEventListener("scroll", positionPopover, true);
    return () => {
      window.removeEventListener("resize", positionPopover);
      window.removeEventListener("scroll", positionPopover, true);
    };
  }, [open, positionPopover]);

  // Before hydration or on mobile — render children transparently
  if (!mounted || !isDesktop) {
    return <>{children}</>;
  }

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

      {open && createPortal(
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Download OnTimer QR code"
          data-app-store-qr-popover
          className="fixed z-[100] w-56 rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-2xl"
          style={{ left: position.left, top: position.top }}
        >
          {/* Arrow indicator */}
          {position.placement === "below" && (
            <div
              className="absolute -top-1.5 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm border-l border-t border-zinc-700 bg-zinc-900"
              style={{ left: position.arrowLeft }}
            />
          )}
          {position.placement === "above" && (
            <div
              className="absolute -bottom-1.5 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm border-b border-r border-zinc-700 bg-zinc-900"
              style={{ left: position.arrowLeft }}
            />
          )}

          <div className="flex flex-col items-center gap-3">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackQRCodeClick(location)}
              className="rounded-lg bg-white p-2 transition-opacity hover:opacity-90"
              aria-label="Scan QR code to download OnTimer"
            >
              <QRCodeSVG
                title="Scan to download OnTimer from the App Store"
                value={appStoreUrl === APP_STORE_URL ? appStoreQrUrl({ location }) : appStoreUrl}
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
        </div>,
        document.body,
      )}
    </div>
  );
}
