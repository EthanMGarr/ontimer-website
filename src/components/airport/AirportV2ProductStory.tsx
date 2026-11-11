import { AppStoreButton } from "@/components/CTAButton";

/* Hallmark · macrostructure: Workbench · genre: modern-minimal · theme: OnTimer locked system
 * audience: anxious iPhone travelers · use: answer now, automate future flights · tone: calm and exact
 * Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4
 */

interface AirportV2ProductStoryProps {
  airportCode: string;
}

export default function AirportV2ProductStory({
  airportCode,
}: AirportV2ProductStoryProps) {
  return (
    <section
      data-location-section="time-to-fly"
      aria-labelledby="time-to-fly-heading"
      className="border-y border-zinc-800 bg-zinc-900/50 py-12 sm:py-16"
    >
      <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-500">
            Time To Fly · free in OnTimer
          </p>
          <h2
            id="time-to-fly-heading"
            className="mt-3 min-w-0 text-3xl font-black leading-tight tracking-tight text-white [overflow-wrap:anywhere] sm:text-4xl"
          >
            Connect your calendar once. OnTimer handles the flights after that.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            Time To Fly automatically finds the flights already on your calendar and sets a persistent alarm for when it is time to leave.
          </p>
          <div className="mt-6">
            <AppStoreButton
              size="lg"
              label="Get OnTimer for iPhone →"
              location="airport_jfk_v2_content"
              analyticsContext={{
                calculator_type: "airport_leave_time",
                cta_variant: "content_time_to_fly",
                intent_cluster: "airport_when_to_leave",
                location_code: airportCode,
              }}
              className="justify-center whitespace-nowrap"
              presentation="text-link"
            />
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              OnTimer is free for iPhone. Works with Google Calendar, Apple Calendar, and Outlook Calendar.
            </p>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 sm:p-6">
          <p className="text-sm font-bold text-white">From the flight you already saved…</p>
          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Calendar</p>
            <p className="mt-1 font-bold text-white">Flight from {airportCode}</p>
          </div>
          <div className="ml-7 h-8 border-l border-dashed border-green-500/60" aria-hidden="true" />
          <div className="rounded-xl border border-green-500/40 bg-green-500/[0.07] p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-green-500">OnTimer</p>
            <p className="mt-1 font-bold text-white">Leave-time alarm created automatically</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">Persistent, so it is harder to miss than a passive notification.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
