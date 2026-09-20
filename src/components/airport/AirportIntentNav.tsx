"use client";

import Link from "next/link";
import { fireEvent } from "@/lib/analytics";

export type AirportPlanningIntent = "flying" | "pickup" | "dropoff";

interface AirportIntentNavProps {
  slug: string;
  airportCode: string;
  currentIntent: AirportPlanningIntent;
  pickupSupported?: boolean;
}

export default function AirportIntentNav({
  slug,
  airportCode,
  currentIntent,
  pickupSupported = true,
}: AirportIntentNavProps) {
  const items: Array<{ intent: AirportPlanningIntent; label: string; href: string }> = [
    { intent: "flying", label: "Flying", href: `/airport-time-to-leave/${slug}#calculator` },
    {
      intent: "pickup",
      label: "Pick up",
      href: pickupSupported
        ? `/airport-pickup/${slug}#calculator`
        : `/airport-pickup-time-calculator?airport=${encodeURIComponent(airportCode)}#calculator`,
    },
    { intent: "dropoff", label: "Drop off", href: `/airport-time-to-leave/${slug}?intent=dropoff#calculator` },
  ];

  return (
    <nav className="mb-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-3.5" aria-label={`Plan a trip involving ${airportCode}`}>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">What are you planning?</p>
      <div className="grid grid-cols-3 gap-1.5">
        {items.map((item) => (
          <Link
            key={item.intent}
            href={item.href}
            aria-current={currentIntent === item.intent ? "page" : undefined}
            className={`grid min-h-11 place-items-center rounded-full border px-1.5 py-2 text-center text-xs font-bold leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 sm:text-sm ${
              currentIntent === item.intent
                ? "border-green-500 bg-green-500 text-black active:bg-green-600"
                : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white active:bg-zinc-800"
            }`}
            onClick={() => fireEvent("airport_intent_selected", {
              airport_code: airportCode,
              planning_intent: item.intent,
              source_page_type: currentIntent === "pickup" ? "airport_pickup" : "airport_departure",
            })}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
