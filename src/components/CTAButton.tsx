"use client";

import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601";

interface CTAButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  className?: string;
  location?: string;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

function trackAppStoreClick(location: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "app_store_click", {
    page_path: window.location.pathname,
    button_location: location,
  });
}

export function AppStoreButton({
  size = "md",
  variant = "primary",
  className = "",
  location = "cta",
}: CTAButtonProps) {
  const base = "inline-flex items-center gap-2.5 rounded-full font-semibold transition-colors";
  const variants = {
    primary: "bg-green-500 text-black hover:bg-green-400",
    outline:
      "border border-green-500 text-green-500 hover:bg-green-500 hover:text-black",
  };

  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${sizeClasses[size]} ${className}`}
      onClick={() => trackAppStoreClick(location)}
    >
      <AppleIcon className="h-4 w-4" />
      Download on the App Store
    </a>
  );
}

export function AndroidWaitlistButton({
  size = "md",
  className = "",
}: CTAButtonProps) {
  return (
    <Link
      href="/android"
      className={`inline-flex items-center gap-2.5 rounded-full border border-green-500 font-semibold text-green-500 transition-colors hover:bg-green-500 hover:text-black ${sizeClasses[size]} ${className}`}
    >
      Join Android Waitlist
    </Link>
  );
}

function AppleIcon({ className = "h-5 w-5" }: { className?: string }) {
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
