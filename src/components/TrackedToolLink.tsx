"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackToolNavigationClick } from "@/lib/analytics";

export function TrackedToolLink({
  href,
  className,
  surface,
  group,
  position,
  children,
}: {
  href: string;
  className?: string;
  surface: string;
  group: string;
  position: number;
  children: ReactNode;
}) {
  const handleClick = () => trackToolNavigationClick(surface, group, href, position);

  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
