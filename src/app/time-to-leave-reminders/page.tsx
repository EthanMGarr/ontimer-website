import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Get a Reminder When It's Time to Leave for a Meeting | OnTimer",
  description:
    "Learn why leave-time reminders matter and how traffic-aware alerts can help you arrive on time.",
};

const faqItems = [
  {
    question: "How do I get a reminder when it's time to leave for a meeting?",
    answer:
      "Most calendar apps let you set a reminder before the event, but these are time-before-start reminders — not departure reminders. For accurate leave-time alerts, use an app that reads your event location and calculates when you need to leave based on your actual travel time and current traffic conditions.",
  },
  {
    question: "Why does my calendar reminder fire at the wrong time?",
    answer:
      "Standard calendar reminders fire a fixed number of minutes before the event starts — regardless of where you're going or how long it takes to get there. A 15-minute reminder is useless if you need 30 minutes to drive. Traffic-aware departure alerts calculate leave time based on real travel time, not a fixed offset.",
  },
  {
    question: "Does OnTimer tell you when to leave for meetings?",
    answer:
      "Yes. OnTimer's Time To Leave feature reads your event location and calculates when you need to depart based on your transportation mode and live traffic. It fires a departure alert at the right time — not just a fixed number of minutes before the meeting starts. Time To Leave is a Pro feature.",
  },
];

export default function TimeToLeaveReminders() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "OnTimer",
            operatingSystem: "iOS",
            applicationCategory: "ProductivityApplication",
            description: "Calendar alarm app with traffic-aware Time To Leave alerts for in-person meetings and appointments.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            url: "https://www.ontimer.app",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
              { "@type": "ListItem", position: 2, name: "Time To Leave Reminders", item: "https://www.ontimer.app/time-to-leave-reminders" },
            ],
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            How to Get a Reminder When It&apos;s Time to{" "}
            <span className="text-green-500">Leave for a Meeting</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            For in-person meetings and appointments, being &quot;reminded about
            the event&quot; is not always enough. What really matters is knowing
            when you need to leave.
          </p>
          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              Standard calendar reminders fire a fixed number of minutes before the event starts — not when you need to leave. If your drive takes 25 minutes and your reminder fires 15 minutes before the meeting, you&apos;re already late before you&apos;ve left. A traffic-aware departure alert calculates your leave time based on your actual travel duration and current conditions.
            </p>
          </div>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHY LEAVE-TIME REMINDERS MATTER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why leave-time reminders matter
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A calendar event tells you when something starts. It does not
              tell you when to stop what you are doing, gather your things, and
              account for transit time and traffic.
            </p>
            <p>
              Most people either underestimate travel time or forget to factor it in at all — especially for meetings they know the location of and feel comfortable with. The result is leaving on time for where they think they&apos;re going, not for the traffic conditions they&apos;ll actually encounter.
            </p>
            <p>
              A departure alert solves this by working backwards from the meeting time: it calculates when you need to leave and fires the alert at that moment — not at a fixed offset from the meeting start.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY NORMAL REMINDERS FALL SHORT ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why normal calendar reminders fall short for in-person meetings
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                issue: "Fixed time offsets ignore actual travel",
                detail: "A 15-minute reminder is useful for a virtual meeting. For a 30-minute drive, it fires after you're already late.",
              },
              {
                issue: "No traffic awareness",
                detail: "Calendar reminders don't know if there's an accident on your route, a sports event adding 20 minutes, or road construction you forgot about.",
              },
              {
                issue: "No departure calculation",
                detail: "Standard reminders alert you to the meeting. They don't tell you the specific moment you need to walk out the door.",
              },
              {
                issue: "Easy to dismiss under pressure",
                detail: "A passive notification is easy to see, decide 'I have a few more minutes,' and be wrong about.",
              },
            ].map(({ issue, detail }) => (
              <div key={issue} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="font-semibold text-white">{issue}</p>
                <p className="mt-1 text-sm text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO LOOK FOR ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to look for in a leave-time alert
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            A useful departure reminder should:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "recognize the event location from your calendar",
              "calculate travel time based on your transport mode",
              "adjust for live traffic conditions at departure time",
              "fire an alert at the departure moment — not just before the meeting",
              "work automatically without manual entry for each event",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW ONTIMER TIME TO LEAVE WORKS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Time To Leave works
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              For calendar events with a location, OnTimer calculates when you
              need to leave based on your transportation mode (driving, transit, walking) and live traffic at departure time. It fires a departure alarm at the right moment — not a fixed number of minutes before the meeting starts.
            </p>
            <p>
              This means your departure alert adjusts automatically: if traffic is heavier than usual, it fires earlier. If the meeting location is closer than expected, it fires later. The alert is persistent — it stays on screen until you dismiss it, so you can&apos;t swipe it away and lose track.
            </p>
            <p className="text-sm text-zinc-500">
              Time To Leave is a Pro feature. Available on iPhone.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/features"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              See all features →
            </Link>
            <Link
              href="/airport-time-to-leave-calculator"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              Airport leave-time calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-xl border border-zinc-800 bg-zinc-900">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white">
                  {item.question}
                  <span className="ml-4 shrink-0 text-zinc-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
              </details>
            ))}
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
                href="/airport-time-to-leave-calculator"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Airport Time-to-Leave Calculator →
              </Link>
            </li>
            <li>
              <Link
                href="/never-be-late-to-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Never Be Late to Meetings →
              </Link>
            </li>
            <li>
              <Link
                href="/stop-missing-calendar-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Stop Missing Zoom, Google Meet, and Other Calendar Meetings →
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
            Know when it is time to head out
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and get traffic-aware departure alerts from your calendar.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
