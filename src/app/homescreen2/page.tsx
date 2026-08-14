import type { Metadata } from "next";
import Link from "next/link";
import {
  HOMESCREEN2_HERO_VERSION,
  HomeHeroExperiment,
  type HomeHeroVersion,
} from "@/components/HomeHeroExperiment";
import { HomepagePreviewCTA } from "@/components/HomepagePreviewCTA";

export const metadata: Metadata = {
  title: "OnTimer Homepage Hero V2",
  description:
    "Experimental OnTimer homepage hero showing how existing calendar events automatically become persistent alarms.",
  alternates: { canonical: "https://www.ontimer.app/homescreen2" },
  robots: {
    index: false,
    follow: false,
  },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
      {children}
    </p>
  );
}

function resolveHeroVersion(hero: string | string[] | undefined): HomeHeroVersion {
  const requested = Array.isArray(hero) ? hero[0] : hero;

  if (
    requested === "animation-v2" ||
    requested === "live" ||
    requested === "v1" ||
    requested === "v2"
  ) {
    return requested;
  }

  return HOMESCREEN2_HERO_VERSION;
}

export default async function Homescreen2({
  searchParams,
}: {
  searchParams?: Promise<{ hero?: string | string[] }>;
}) {
  const params = await searchParams;
  const heroVersion = resolveHeroVersion(params?.hero);

  return (
    <section className="overflow-hidden border-b border-zinc-900 bg-black">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:grid-cols-[0.98fr_1.02fr] lg:gap-16 lg:py-20">
        <div className="text-center lg:text-left">
          <SectionLabel>Automatic calendar alarms for iPhone</SectionLabel>
          <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Never be late again.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl lg:mx-0">
            Connect Google Calendar, Apple Calendar, or Outlook Calendar once. OnTimer
            automatically turns upcoming events into alarms that stay visible
            until you respond, without rebuilding your schedule.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <HomepagePreviewCTA location="homescreen2_hero" />
          </div>

          <div className="mt-5 flex flex-col items-center gap-2 text-sm text-zinc-500 sm:flex-row sm:justify-center lg:justify-start">
            <span>iPhone today.</span>
            <Link
              href="/android"
              className="font-semibold text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Android? Join the waitlist.
            </Link>
          </div>
        </div>

        <HomeHeroExperiment version={heroVersion} />
      </div>
    </section>
  );
}
