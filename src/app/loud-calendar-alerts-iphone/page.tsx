import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Loud Calendar Alerts on iPhone (Step-by-Step Fix)",
  description:
    "Looking for louder iPhone calendar alerts? Here is why normal reminders get missed and what to use instead.",
  alternates: { canonical: "https://www.ontimer.app/loud-calendar-alerts-iphone" },
  openGraph: {
    title: "Loud Calendar Alerts on iPhone (Step-by-Step Fix)",
    description: "Looking for louder iPhone calendar alerts? Here is why normal reminders get missed and what to use instead.",
    url: "https://www.ontimer.app/loud-calendar-alerts-iphone",
  },
};

const faqItems = [
  {
    question: "How do I make iPhone calendar alerts louder?",
    answer:
      "Go to Settings → Sounds & Haptics and increase the Ringtone/Alerts volume slider. Also check Settings → Calendar → Default Alert Times to set earlier reminders. Note that the ringer switch must be on for calendar alert sounds to play — but alarms from a dedicated alarm app will play even on silent.",
  },
  {
    question: "Why are my iPhone calendar alerts so quiet?",
    answer:
      "Calendar alerts use the ringtone/alerts volume, which is separate from the media volume. If the ringer switch is set to silent, calendar alerts will be muted entirely. Focus mode can also silently suppress them. Check Settings → Sounds & Haptics and your Focus settings.",
  },
  {
    question: "What is the loudest calendar alert for iPhone?",
    answer:
      "The loudest option is using a dedicated alarm app rather than a standard calendar notification. Alarm apps can bypass the ringer/silent switch (with the right permissions) and fire a persistent, full-volume alert that stays on screen until dismissed — unlike calendar notifications, which disappear on their own.",
  },
];

export default function LoudCalendarAlertsIphone() {
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
            description: "Calendar alarm app for iPhone that fires loud, persistent alarms before meetings — harder to miss than standard calendar notifications.",
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
              { "@type": "ListItem", position: 2, name: "Loud Calendar Alerts iPhone", item: "https://www.ontimer.app/loud-calendar-alerts-iphone" },
            ],
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            How to Get Loud Calendar Alerts on{" "}
            <span className="text-green-500">iPhone</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            If you rely on calendar alerts on your iPhone, you have probably experienced
            this: the reminder appears, you notice it for a second, and then the
            meeting still sneaks up on you.
          </p>
          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              The issue isn&apos;t just volume — it&apos;s that calendar notifications are passive. They appear briefly and disappear whether or not you act. To get alerts that are genuinely hard to miss, you need a persistent alarm that stays on screen and requires active dismissal. Volume is secondary; persistence is what actually prevents missed meetings.
            </p>
          </div>
          <div className="mt-8">
            <AppStoreCTA />
          </div>
        </div>
      </section>

      {/* ── WHY REMINDERS GET MISSED ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why iPhone calendar reminders get missed
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                cause: "They disappear automatically",
                detail: "Standard calendar notification banners vanish after a few seconds — whether or not you saw them or acted on them.",
              },
              {
                cause: "The ringer switch mutes them",
                detail: "Calendar alert sounds are controlled by the ringer switch. If your phone is on silent, the alert fires silently with no audio cue.",
              },
              {
                cause: "Focus mode blocks them",
                detail: "iPhone Focus modes can suppress calendar notifications entirely without any indication. If you activated Work Focus or Sleep Focus and forgot to configure it, alerts disappear silently.",
              },
              {
                cause: "Notification blindness",
                detail: "Your brain learns to auto-dismiss notification banners through habit. Calendar alerts competing with Slack, email, and news often get cleared without registering.",
              },
            ].map(({ cause, detail }) => (
              <div key={cause} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="font-semibold text-white">{cause}</p>
                <p className="mt-1 text-sm text-zinc-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES AN ALERT LOUD ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What makes a calendar alert actually &quot;loud&quot;
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A better alert is not just louder in volume. Loudness has three dimensions:
            </p>
          </div>
          <div className="mt-6 space-y-3">
            {[
              { trait: "Persistence", desc: "It stays on screen until you actively dismiss it — it doesn't vanish after 4 seconds." },
              { trait: "Interruption", desc: "It demands your attention regardless of what you're doing — not a banner you can ignore from the corner of your eye." },
              { trait: "Volume", desc: "It plays at alarm-level volume, not notification-level volume. Some apps can bypass the ringer/silent switch with appropriate permissions." },
            ].map(({ trait, desc }) => (
              <div key={trait} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <span className="mt-0.5 text-green-500 font-bold shrink-0">{trait}</span>
                <p className="text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SETTINGS FIXES ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Settings to check on iPhone
          </h2>
          <div className="mt-6 space-y-4">
            {[
              { step: "1. Turn on the ringer switch", detail: "The physical switch on the left side of your iPhone controls alert sounds. If it shows orange, your alerts are muted." },
              { step: "2. Check alert volume", detail: "Settings → Sounds & Haptics → Ringtone and Alerts. This controls calendar notification volume — separate from media volume." },
              { step: "3. Verify notification permissions", detail: "Settings → Notifications → Calendar → make sure Alerts is on and set to Banner or Alert style." },
              { step: "4. Check Focus mode", detail: "Settings → Focus → select your active Focus → ensure Calendar or your calendar app is in the allowed apps list." },
              { step: "5. Set alerts to \"Alert\" not \"Banner\"", detail: "In notification settings, Banner style disappears automatically. Alert style stays until you dismiss it — a slightly more persistent option within the native system." },
            ].map(({ step, detail }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <span className="text-sm font-bold text-green-500 whitespace-nowrap">{step}</span>
                <p className="text-sm text-zinc-400">{detail}</p>
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
              OnTimer connects to your calendar and creates loud, persistent
              alarms before meetings and events — harder to miss than
              standard calendar notifications by design.
            </p>
            <p>
              The alarm stays on screen until you dismiss it. It doesn&apos;t disappear after a few seconds. For people who keep missing meetings despite having reminders set, the persistence is the critical difference.
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
              href="/why-calendar-reminders-fail"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              Why calendar reminders fail →
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
                href="/why-calendar-reminders-fail"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Why Calendar Reminders Fail →
              </Link>
            </li>
            <li>
              <Link
                href="/time-to-leave-reminders"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Get a Reminder When It&apos;s Time to Leave for a Meeting →
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
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Turn your calendar into a real alarm
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
