import { AlarmHeroPreview } from "@/components/AlarmHeroPreview";
import { HeroAnimationV2 as ActiveHeroAnimation } from "@/components/HeroAnimationV2";
import { HeroV2 } from "@/components/HeroV2";
import { LiveHeroAlarmPreview } from "@/components/LiveHeroAlarmPreview";

export type HomeHeroVersion = "animation-v2" | "live" | "v1" | "v2";

// Simple experiment flag. Swapping the ActiveHeroAnimation import above changes
// the /homescreen2 default without touching the live homepage hero.
export const HOMESCREEN2_HERO_VERSION: HomeHeroVersion = "animation-v2";

export function HomeHeroExperiment({
  version = HOMESCREEN2_HERO_VERSION,
}: {
  version?: HomeHeroVersion;
}) {
  if (version === "v1") {
    return <AlarmHeroPreview />;
  }

  if (version === "v2") {
    return <HeroV2 />;
  }

  if (version === "live") {
    return <LiveHeroAlarmPreview />;
  }

  return <ActiveHeroAnimation />;
}
