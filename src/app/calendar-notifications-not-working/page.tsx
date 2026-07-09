import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Calendar Notifications Not Working? 10 Fixes for iPhone, Google & Apple Calendar",
  description:
    "Calendar notifications not working? Learn how to fix missing, delayed, or silent reminders on Google Calendar, Apple Calendar, and Outlook Calendar with this step-by-step troubleshooting guide.",
  alternates: { canonical: "https://www.ontimer.app/calendar-notifications-not-working" },
  openGraph: {
    title: "Calendar Notifications Not Working? 10 Fixes for iPhone, Google & Apple Calendar",
    description:
      "Fix missing, delayed, or silent calendar reminders on Google Calendar, Apple Calendar, and Outlook Calendar with this step-by-step troubleshooting guide.",
    url: "https://www.ontimer.app/calendar-notifications-not-working",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendar Notifications Not Working? 10 Fixes",
    description:
      "Calendar notifications not working? Fix missing, delayed, or silent reminders on Google Calendar, Apple Calendar, and Outlook Calendar.",
  },
};

const diagnostics = [
  { label: "Notifications never appear", href: "#notifications-enabled" },
  { label: "Notifications are silent", href: "#focus-mode" },
  { label: "Notifications appear late", href: "#scheduled-summary" },
  { label: "Some events notify but others don't", href: "#event-reminder" },
  { label: "Google Calendar notifications stopped working", href: "#background-refresh" },
  { label: "Apple Calendar notifications stopped working", href: "#default-alert-times" },
  { label: "Outlook calendar notifications stopped working", href: "#calendar-sync" },
  { label: "Recurring reminders stopped working", href: "#force-sync" },
];

const troubleshootingSteps = [
  {
    id: "notifications-enabled",
    title: "Verify notifications are enabled",
    summary:
      "First, make sure your phone is allowed to show alerts from the calendar app. If this setting is off, event reminders can be configured correctly and still never appear.",
    steps: [
      "Open Settings on your iPhone.",
      "Tap Notifications.",
      "Choose Calendar, Google Calendar, or Outlook.",
      "Turn on Allow Notifications.",
      "Enable Lock Screen, Notification Center, banners, sounds, and badges while testing.",
    ],
    platformNotes: [
      "Apple Calendar: check Settings -> Notifications -> Calendar.",
      "Google Calendar: check Settings -> Notifications -> Google Calendar, then confirm notifications are enabled inside the Google Calendar app.",
      "Outlook: check Settings -> Notifications -> Outlook, then confirm Outlook's in-app notification settings are enabled.",
    ],
  },
  {
    id: "focus-mode",
    title: "Check Focus Mode and Do Not Disturb",
    summary:
      "Focus modes are one of the most common reasons calendar alerts suddenly stop. A Focus can block notifications silently, especially Work, Sleep, Driving, or Do Not Disturb.",
    steps: [
      "Open Settings.",
      "Tap Focus.",
      "Turn off the active Focus temporarily.",
      "If notifications start working, reopen that Focus and add your calendar app under Allowed Apps.",
      "Repeat for any Focus mode that turns on automatically by time, location, driving, or app usage.",
    ],
    platformNotes: [
      "Apple Calendar: allow Calendar through each Focus mode that may be active before events.",
      "Google Calendar: allow Google Calendar specifically. Allowing Apple Calendar does not allow Google Calendar.",
      "Outlook: allow Outlook specifically, especially for work Focus modes.",
    ],
  },
  {
    id: "scheduled-summary",
    title: "Check Scheduled Notification Summary",
    summary:
      "Scheduled Summary can hold notifications and deliver them later in a batch. That is useful for low-priority alerts, but it can make calendar reminders appear late.",
    steps: [
      "Open Settings.",
      "Tap Notifications.",
      "Tap Scheduled Summary.",
      "Remove Calendar, Google Calendar, and Outlook from the summary list.",
      "Create a test event a few minutes from now to confirm the alert arrives immediately.",
    ],
    platformNotes: [
      "Apple Calendar: remove Calendar from Scheduled Summary.",
      "Google Calendar: remove Google Calendar from Scheduled Summary.",
      "Outlook: remove Outlook from Scheduled Summary if work reminders arrive late.",
    ],
  },
  {
    id: "event-reminder",
    title: "Verify the event actually has a reminder",
    summary:
      "Not every calendar event has an alert attached. Imported events, shared calendars, subscribed calendars, and invitations from other people may use different reminder defaults.",
    steps: [
      "Open an event that failed to notify you.",
      "Tap Edit or the edit icon.",
      "Look for Alert, Reminder, or Notification.",
      "If it says None, add a reminder such as 10 minutes before.",
      "Save the event, then test another upcoming event from the same calendar.",
    ],
    platformNotes: [
      "Apple Calendar: open the event -> Edit -> Alert.",
      "Google Calendar: open the event -> edit pencil -> notifications.",
      "Outlook: open the event -> edit -> Reminder.",
    ],
  },
  {
    id: "default-alert-times",
    title: "Check default alert times",
    summary:
      "If new events are being created without reminders, your default alert settings may be missing or set differently than you expect.",
    steps: [
      "Check your calendar app's default reminder settings.",
      "Create a new event and confirm whether an alert is added automatically.",
      "If no alert is added, set a default alert time for events.",
      "Review all-day events separately, since many apps use different defaults for all-day reminders.",
    ],
    platformNotes: [
      "Apple Calendar: Settings -> Calendar -> Default Alert Times. Check Events, All-Day Events, and Birthdays.",
      "Google Calendar: open Google Calendar settings, choose the calendar, then check Event notifications and All-day event notifications.",
      "Outlook: check Outlook calendar settings for default reminders. Work accounts may enforce their own defaults.",
    ],
  },
  {
    id: "calendar-sync",
    title: "Verify calendar synchronization",
    summary:
      "A reminder can only fire if the event has synced to the device or app that is supposed to notify you. Sync issues often look like notification issues.",
    steps: [
      "Open the calendar list in your app.",
      "Make sure the calendar that contains the event is visible and enabled.",
      "Confirm the event appears on the same device where you expect the notification.",
      "If you use multiple accounts, confirm the event is not saved to a hidden or inactive calendar.",
      "Check whether the event appears correctly on the calendar provider's web app.",
    ],
    platformNotes: [
      "Apple Calendar: open Calendar -> Calendars and make sure the relevant iCloud, Google, Exchange, or Outlook calendar is checked.",
      "Google Calendar: open the side menu, check the calendar, then open Settings and confirm Sync is enabled for that calendar.",
      "Outlook: confirm the Microsoft or Exchange account is connected and the calendar is enabled in Outlook's calendar list.",
    ],
  },
  {
    id: "background-refresh",
    title: "Verify Background App Refresh",
    summary:
      "Third-party calendar apps need background access to stay current. If background refresh is disabled, notifications may be delayed or fail after calendar changes.",
    steps: [
      "Open Settings.",
      "Tap General.",
      "Tap Background App Refresh.",
      "Make sure Background App Refresh is on.",
      "Enable it for Google Calendar or Outlook Calendar.",
    ],
    platformNotes: [
      "Apple Calendar: Apple Calendar is built into iOS, but connected accounts still need to sync correctly.",
      "Google Calendar: enable Background App Refresh for Google Calendar.",
      "Outlook: enable Background App Refresh for Outlook, especially if work calendar changes do not alert.",
    ],
  },
  {
    id: "low-power-mode",
    title: "Disable Low Power Mode while testing",
    summary:
      "Low Power Mode reduces background activity. It may not be the root cause, but it can make notification and sync problems harder to diagnose.",
    steps: [
      "Open Settings.",
      "Tap Battery.",
      "Turn off Low Power Mode.",
      "Create a test event three to five minutes from now.",
      "Check whether the notification arrives on time with Low Power Mode off.",
    ],
    platformNotes: [
      "If notifications only work with Low Power Mode off, keep it disabled before important events while you continue troubleshooting.",
      "This is most relevant for Google Calendar and Outlook Calendar because they depend more on app refresh behavior.",
    ],
  },
  {
    id: "force-sync",
    title: "Force a calendar sync",
    summary:
      "If the account is connected but events or reminders are stale, force the calendar to refresh before removing accounts or changing deeper settings.",
    steps: [
      "Open your calendar app.",
      "Refresh the calendar list or main calendar view.",
      "Close and reopen the calendar app.",
      "Create a new test event from another device or web browser.",
      "Confirm the event and its reminder appear on your phone.",
    ],
    platformNotes: [
      "Apple Calendar: open Calendar -> Calendars, then pull down to refresh.",
      "Google Calendar: open Google Calendar, pull down to refresh, then check the calendar's Sync setting.",
      "Outlook: pull down on the calendar view to refresh and confirm the account remains connected.",
    ],
  },
  {
    id: "reconnect-account",
    title: "Remove and reconnect the calendar account if necessary",
    summary:
      "Use this as the last reset step. If a calendar account connection is stale or corrupted, reconnecting it can restore event sync and reminder behavior.",
    steps: [
      "Confirm your calendar data is safely stored in iCloud, Google Calendar, Outlook, Microsoft 365, or Exchange before removing the account.",
      "Remove the affected account from the device or calendar app.",
      "Restart the phone.",
      "Add the account again.",
      "Create a test event with a reminder and confirm it notifies correctly.",
    ],
    platformNotes: [
      "Apple Calendar: Settings -> Calendar -> Accounts, then remove and re-add the affected account.",
      "Google Calendar: sign out and back into the Google account, or remove and re-add the account under iOS Calendar Accounts if Apple Calendar displays your Google events.",
      "Outlook: remove and re-add the Microsoft account in Outlook, or reconnect the Exchange or Microsoft account in iOS settings.",
    ],
  },
];

const unresolvedIssues = [
  "An iOS notification bug after an update",
  "Google Calendar sync delays",
  "Exchange synchronization issues",
  "A corrupted local calendar database",
];

const faqItems = [
  {
    question: "Why did my calendar notifications stop working?",
    answer:
      "The most common causes are notification permissions, Focus Mode, Scheduled Notification Summary, missing event reminders, sync problems, Background App Refresh, or Low Power Mode. Start by checking system notification permissions, then check the event itself.",
  },
  {
    question: "Why are my iPhone calendar alerts silent?",
    answer:
      "Silent iPhone calendar alerts are usually caused by Focus Mode, Do Not Disturb, notification sound settings, Scheduled Summary, or low notification volume. Check Settings -> Focus and Settings -> Notifications -> Calendar first.",
  },
  {
    question: "Why are Google Calendar notifications delayed?",
    answer:
      "Google Calendar notifications can be delayed when Scheduled Summary is enabled, Background App Refresh is off, Low Power Mode is active, or the calendar has not synced recently. Remove Google Calendar from Scheduled Summary and confirm Sync is enabled for the affected calendar.",
  },
  {
    question: "Why do recurring reminders stop working?",
    answer:
      "Recurring reminders can stop after a series is edited, imported, moved between calendars, or affected by a sync issue. Open the recurring series, confirm the reminder still exists, then force a calendar sync.",
  },
  {
    question: "Why are calendar reminders inconsistent?",
    answer:
      "Inconsistent reminders usually mean different events are coming from different calendars, accounts, or default alert rules. Check the calendar source and reminder setting on a few events that worked and a few that failed.",
  },
  {
    question: "Why do only some events notify?",
    answer:
      "Only some events notify when some events have reminders and others do not, or when events are spread across calendars with different sync and default reminder settings. Shared and subscribed calendars often behave differently from your primary calendar.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Calendar Notifications Not Working? 10 Things to Check",
  description:
    "A step-by-step troubleshooting guide for missing, delayed, or silent calendar notifications on Google Calendar, Apple Calendar, and Outlook Calendar.",
  author: { "@type": "Organization", name: "OnTimer" },
  publisher: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
  url: "https://www.ontimer.app/calendar-notifications-not-working",
  mainEntityOfPage: "https://www.ontimer.app/calendar-notifications-not-working",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ontimer.app" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calendar Notifications Not Working",
      item: "https://ontimer.app/calendar-notifications-not-working",
    },
  ],
};

export default function CalendarNotificationsNotWorking() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="transition-colors hover:text-zinc-300">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">Calendar Notifications Not Working</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Google Calendar · Apple Calendar · Outlook Calendar
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Calendar Notifications Not Working?
            <br />
            <span className="text-green-500">Here&apos;s How to Fix Them</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            If your calendar notifications aren&apos;t working, the problem is usually one of a few common
            issues: notification permissions, Focus Mode, Scheduled Notification Summary, missing event
            reminders, calendar sync problems, Background App Refresh, or battery restrictions. Work through
            the checklist below. Most problems can be fixed in just a few minutes.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-t border-zinc-800 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-base leading-relaxed text-zinc-400">
            The most common causes are disabled notifications, Focus Mode or Do Not Disturb, Scheduled
            Notification Summary, missing event reminders, default alert settings, calendar sync problems,
            Background App Refresh, and battery restrictions.
          </p>
        </div>
      </section>

      {/* Diagnostic */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What best describes your problem?
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Select the closest symptom to jump directly to the most relevant fix.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {diagnostics.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 text-sm font-medium text-zinc-200 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-500/50 hover:bg-zinc-900 hover:text-green-400 hover:shadow-lg hover:shadow-green-950/20 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              >
                <span>{item.label}</span>
                <span className="shrink-0 text-green-500 transition-transform group-hover:translate-x-1">
                  Jump to fix →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting Guide */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Troubleshooting Guide
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Go in order if you are not sure where the problem is. If you already know the symptom, use the
            symptom links above.
          </p>

          <div className="mt-10 space-y-10">
            {troubleshootingSteps.map((step, index) => (
              <section key={step.id} id={step.id} className="scroll-mt-24">
                <div className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-500">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-zinc-400">{step.summary}</p>
                    <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                      <p className="text-sm font-semibold uppercase tracking-widest text-green-500">Steps</p>
                      <ol className="mt-4 space-y-2">
                        {step.steps.map((item, stepIndex) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                            <span className="text-zinc-500">{stepIndex + 1}.</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
                      <p className="text-sm font-semibold text-white">Platform notes</p>
                      <ul className="mt-3 space-y-2">
                        {step.platformNotes.map((note) => (
                          <li key={note} className="text-sm leading-relaxed text-zinc-500">
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* If It Still Is Not Working */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            If Calendar Notifications Still Aren&apos;t Working
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              If you have checked notification permissions, Focus Mode, Scheduled Summary, event reminders,
              default alert times, sync, Background App Refresh, Low Power Mode, and account reconnection,
              the issue may be outside the normal settings path.
            </p>
            <p>At that point, the cause may be one of these deeper problems:</p>
          </div>
          <ul className="mt-6 space-y-3">
            {unresolvedIssues.map((issue) => (
              <li key={issue} className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300">
                {issue}
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-zinc-400">
            For those cases, check the official help documentation for Apple Calendar, Google Calendar, or
            Microsoft Outlook, especially if the issue started immediately after an operating system update,
            account change, or calendar migration.
          </p>
        </div>
      </section>

      {/* OnTimer transition */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-500">After troubleshooting</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Everything working again?
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>Great.</p>
            <p>
              Native calendar notifications are designed to appear once and then disappear. If you see them at
              the right moment, that can be enough.
            </p>
            <p>
              But if you&apos;re driving, in another app, away from your phone, in a meeting, or simply
              distracted, it&apos;s still easy to miss them even when everything is configured correctly.
            </p>
            <p>
              OnTimer doesn&apos;t replace your calendar. It connects to your Apple, Google, or Microsoft
              calendar and turns upcoming events into persistent alarm-style reminders that continue alerting
              you until you acknowledge them.
            </p>
            <p>
              The goal isn&apos;t to fix broken notifications. It&apos;s to make sure you never miss an important
              event once they&apos;re working correctly.
            </p>
          </div>
          <div className="mt-8">
            <AppStoreCTA location="calendar_notifications_not_working_solution" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">iPhone · Apple Calendar · Google Calendar · Outlook Calendar</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Calendar Notification Troubleshooting FAQ
          </h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-xl border border-zinc-800 bg-zinc-900">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white">
                  {item.question}
                  <span className="ml-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related Guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/calendar-notifications-vs-alarms", label: "Calendar notifications vs alarms" },
              { href: "/turn-calendar-events-into-alarms", label: "Turn calendar events into alarms" },
              { href: "/persistent-calendar-reminders", label: "Persistent calendar reminders" },
              { href: "/calendar-alarm-app", label: "Calendar alarm app" },
              { href: "/why-calendar-notifications-fail", label: "Why calendar notifications can still fail after settings are correct" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-green-500 transition-colors hover:text-green-400">
                  {label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Keep your calendar. Add alarms that stay.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer turns existing calendar events into persistent alarms so important moments are harder to miss.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="calendar_notifications_not_working_final_cta" />
          </div>
          <p className="mt-3 text-sm text-zinc-500">iPhone · Apple Calendar · Google Calendar · Outlook Calendar</p>
        </div>
      </section>
    </>
  );
}
