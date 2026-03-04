import { AppStoreButton } from "@/components/CTAButton";

const WAITLIST_URL = "https://forms.gle/96FxjQbUokqZcjKE8";

export default function AndroidPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Android — Coming Soon
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            OnTimer for{" "}
            <span className="text-green-500">Android</span> is on its way.
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            We&apos;re working hard to bring OnTimer to Android. Join the
            waitlist and you&apos;ll be the first to know when it launches.
          </p>

          <div className="mt-10">
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-green-400"
            >
              Join the Android Waitlist
            </a>
            <p className="mt-3 text-xs text-zinc-500">
              No spam. One email when Android launches.
            </p>
          </div>
        </div>
      </section>

      {/* Features preview */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-black text-white">
            Everything coming to Android
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: "📅",
                title: "Calendar Sync",
                desc: "Full integration with Google Calendar, Samsung Calendar, and more.",
              },
              {
                icon: "⏰",
                title: "Automatic Alarms",
                desc: "Same zero-setup experience — OnTimer creates alarms from your events.",
              },
              {
                icon: "🔔",
                title: "Smart Alerts",
                desc: "Persistent, escalating notifications that cut through Do Not Disturb.",
              },
              {
                icon: "🎛️",
                title: "Full Customization",
                desc: "Choose your lead times, which calendars to track, and snooze behavior.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="mb-3 text-2xl">{f.icon}</div>
                <h3 className="font-bold text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* iOS CTA */}
      <section className="border-t border-zinc-800 py-20 text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white">
            Have an iPhone?
          </h2>
          <p className="mt-3 text-zinc-400">
            OnTimer is available right now on iOS. Start being on time today.
          </p>
          <div className="mt-6">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
