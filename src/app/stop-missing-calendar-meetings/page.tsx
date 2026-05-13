import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Stop Missing Zoom, Google Meet, and Other Calendar Meetings",
  description:
    "Missing virtual meetings is still common. Here is why standard reminders fail and how to make them harder to miss.",
};

const faqItems = [
  {
    question: "Why do I keep missing virtual meetings?",
    answer:
      "Virtual meetings get missed because there's no travel pressure to force you away from your current task. People assume they can join 'in just a minute,' stay in what they're doing too long, and realize too late that the meeting already started. Standard calendar notifications — which disappear in seconds — don't interrupt focused work.",
  },
  {
    question: "How do I stop missing Zoom and Google Meet calls?",
    answer:
      "Set reminders 10–15 minutes before the meeting — not just at the start time. Use a persistent alarm that requires active dismissal rather than a passive notification banner. Having the alarm fire before you need to be online gives you time to wrap up, find the link, and join on time.",
  },
  {
    question: "What is the best app for virtual meeting reminders?",
    answer:
      "An app that connects directly to your calendar and fires a persistent alarm — not just a banner notification — before each meeting. OnTimer reads your Google Calendar and Outlook events and triggers alarms that stay on screen until you dismiss them, so meetings can't be silently missed.",
  },
];

export default function StopMissingCalendarMeetings() {
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
            description: "Calendar alarm app that fires persistent alarms before meetings so you never miss a Zoom, Google Meet, or Teams call.",
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
              { "@type": "ListItem", position: 2, name: "Stop Missing Calendar Meetings", item: "https://www.ontimer.app/stop-missing-calendar-meetings" },
            ],
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            How to Stop Missing Zoom, Google Meet, and Other{" "}
            <span className="text-green-500">Calendar Meetings</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Virtual meetings are easy to underestimate because there is no
            commute. That often makes people even more likely to rely on a weak
            notification and lose track of time.
          </p>
          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              Virtual meetings get missed because passive calendar alerts disappear whether or not you act — and without travel pressure, it&apos;s easy to stay in your current task too long. The fix is a persistent alarm that fires 10–15 minutes before the meeting and stays on screen until you dismiss it, forcing acknowledgment before the window closes.
            </p>
          </div>
          <div className="mt-8">
            <AppStoreCTA />
          </div>
        </div>
      </section>

      {/* ── WHY VIRTUAL MEETINGS GET MISSED ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why virtual meetings still get missed
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              In-person meetings have a built-in forcing function: the commute. When you have to physically leave to get somewhere, that departure triggers a transition out of your current task.
            </p>
            <p>
              Virtual meetings have no equivalent. The meeting is two clicks away — which means there&apos;s no moment that forces you to stop what you&apos;re doing. People assume they can join &quot;in just a minute,&quot; stay in the current task too long, and realize too late that the call already started.
            </p>
            <p>
              A standard calendar notification doesn&apos;t solve this. It appears for a few seconds, you register it, you think &quot;almost time,&quot; and you keep working. The notification disappears. The moment passes.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY NORMAL ALERTS AREN'T ENOUGH ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why normal calendar alerts are not enough
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Standard calendar reminders were designed to be convenient — not to guarantee attendance. Several properties make them unreliable:
            </p>
          </div>
          <div className="mt-6 space-y-3">
            {[
              { issue: "They disappear automatically", detail: "A notification banner appears for a few seconds and vanishes — whether or not you acted on it." },
              { issue: "They fire too late", detail: "Reminders set at the meeting start time give you zero lead time. By the time you see it, you're already late." },
              { issue: "Focus mode silences them", detail: "iPhone Focus mode and Android Do Not Disturb can suppress calendar alerts with no indication." },
              { issue: "No escalation", detail: "Miss one alert and there's no follow-up. The system assumes one notification was enough." },
            ].map(({ issue, detail }) => (
              <div key={issue} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="font-semibold text-white">{issue}</p>
                <p className="mt-1 text-sm text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT HELPS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What actually helps
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The most effective fixes address both the timing and the delivery mechanism:
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {[
              {
                title: "Set reminders 10–15 minutes early",
                text: "Give yourself enough lead time to wrap up what you're doing, find the meeting link, and join without rushing. A reminder at the exact start time is already too late.",
              },
              {
                title: "Use an alarm, not a notification",
                text: "An alarm requires active dismissal — it stays on screen until you respond. A notification disappears on its own. For virtual meetings, this distinction determines whether you actually stop what you're doing.",
              },
              {
                title: "Use a persistent calendar alarm app",
                text: "A dedicated app that reads your calendar and fires alarms automatically means you don't have to set a manual backup for every meeting. The system runs in the background and interrupts you reliably.",
              },
            ].map(({ title, text }) => (
              <div key={title} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-500">✓</span>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW ONTIMER HELPS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer helps
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              OnTimer connects to your Google Calendar and Microsoft Outlook and creates loud, persistent
              alarms before scheduled meetings so they are harder to miss.
            </p>
            <p>
              Unlike calendar notifications, OnTimer alarms stay on screen and require active dismissal. You can&apos;t swipe them away on autopilot — which is exactly the point.
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
              href="/how-it-works"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              How it works →
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
                href="/never-be-late-to-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Never Be Late to Meetings →
              </Link>
            </li>
            <li>
              <Link
                href="/why-calendar-reminders-fail"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Why Calendar Reminders Fail →
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
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Make virtual meetings harder to miss
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer for iPhone.
          </p>
          <div className="mt-8">
            <AppStoreCTA />
          </div>
        </div>
      </section>
    </>
  );
}
