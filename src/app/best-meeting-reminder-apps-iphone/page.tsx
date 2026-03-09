import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Best Apps to Remind You About Meetings on iPhone | OnTimer",
  description:
    "What to look for in a meeting reminder app on iPhone, including persistent alarms, leave-time alerts, and multi-calendar support.",
};

const comparisonRows = [
  {
    option: "Standard calendar apps",
    persistentAlarms: "Usually no",
    ttl: "Usually limited",
    builtForCalendar: "Yes",
    multiCal: "Varies",
  },
  {
    option: "Basic reminder apps",
    persistentAlarms: "Sometimes",
    ttl: "Usually no",
    builtForCalendar: "Usually no",
    multiCal: "Varies",
  },
  {
    option: "OnTimer",
    persistentAlarms: "Yes",
    ttl: "Yes, paid feature",
    builtForCalendar: "Yes",
    multiCal: "Yes",
    highlight: true,
  },
];

export default function BestMeetingReminderAppsIphone() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Best Apps to Remind You About Meetings on{" "}
            <span className="text-green-500">iPhone</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            The best meeting reminder app is not just the one that puts a date
            on your calendar. It is the one that actually gets your attention
            before it is too late.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHAT TO LOOK FOR ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to look for in a meeting reminder app
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Useful criteria include:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "whether alerts are easy to miss",
              "whether the app is built around calendar events",
              "whether it supports multiple calendars",
              "whether it can help with leave-time planning for in-person events",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Common categories of reminder tools
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Most options fall into three categories:
          </p>

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">Standard calendar apps</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Good for basic scheduling, but reminders are often passive
                notifications.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">Basic reminder apps</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Useful for manual reminders and to-do items, but they are not
                always built around calendar-based meeting workflows.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">OnTimer</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Built specifically to make calendar meetings and events harder
                to miss with loud, persistent alarms. It also supports multiple
                calendars, and for events with a location, offers a paid Time To
                Leave feature based on travel time and traffic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Simple comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] overflow-hidden rounded-2xl border border-zinc-800 text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-400">
                    Option
                  </th>
                  <th className="border-l border-zinc-800 px-4 py-3 text-left font-semibold text-zinc-400">
                    Persistent alarms
                  </th>
                  <th className="border-l border-zinc-800 px-4 py-3 text-left font-semibold text-zinc-400">
                    Time To Leave alerts
                  </th>
                  <th className="border-l border-zinc-800 px-4 py-3 text-left font-semibold text-zinc-400">
                    Built for calendar events
                  </th>
                  <th className="border-l border-zinc-800 px-4 py-3 text-left font-semibold text-zinc-400">
                    Multiple calendars
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-800 last:border-0"
                  >
                    <td
                      className={`px-4 py-4 font-medium ${row.highlight ? "text-green-400" : "text-zinc-300"}`}
                    >
                      {row.option}
                    </td>
                    <td className="border-l border-zinc-800 px-4 py-4 text-zinc-400">
                      {row.persistentAlarms}
                    </td>
                    <td className="border-l border-zinc-800 px-4 py-4 text-zinc-400">
                      {row.ttl}
                    </td>
                    <td className="border-l border-zinc-800 px-4 py-4 text-zinc-400">
                      {row.builtForCalendar}
                    </td>
                    <td className="border-l border-zinc-800 px-4 py-4 text-zinc-400">
                      {row.multiCal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHO ONTIMER IS BEST FOR ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who OnTimer is best for
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            OnTimer is especially useful for people with packed schedules,
            frequent meetings, multiple calendars, or a history of missing
            normal reminders.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/features"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              See all features →
            </Link>
            <Link
              href="/faq"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related guides</h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/how-to-never-be-late-to-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Never Be Late to Meetings →
              </Link>
            </li>
            <li>
              <Link
                href="/loud-calendar-alerts-iphone"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Get Loud Calendar Alerts on iPhone →
              </Link>
            </li>
            <li>
              <Link
                href="/time-to-leave-reminders"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Get a Reminder When It's Time to Leave for a Meeting →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Choose a reminder app that actually gets your attention
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer for iPhone.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
