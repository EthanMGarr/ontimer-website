import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "OnTimer Blog",
  description:
    "Guides and tools to help you never miss meetings, appointments, or important events.",
  openGraph: {
    title: "OnTimer Blog",
    description: "Guides and tools to help you never miss meetings, appointments, or important events.",
    type: "website",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface GuideEntry {
  href: string;
  title: string;
  description: string;
  date?: string;
}

// ── Section 1: Running Late or Missed a Meeting ──────────────────────────────
const urgentGuides: GuideEntry[] = [
  {
    href: "/how-to-apologize-for-missing-a-meeting",
    title: "How to Apologize for Missing a Meeting (Templates + Rules)",
    description:
      "The formula, exact email and Slack templates, and a step-by-step recovery framework — for every context from colleague to client.",
    date: "2026-04-27",
  },
  {
    href: "/running-late-to-meeting",
    title: "Running Late to a Meeting? Here's Exactly What to Do (and What Not to Say)",
    description:
      "You're late right now. Here's exactly what to say — and what not to say — to handle it professionally.",
    date: "2026-04-20",
  },
  {
    href: "/missed-meeting-what-to-say",
    title: "Missed a Meeting? What to Say (Email + Slack Templates)",
    description:
      "Copy-paste apology messages for email and Slack — and how to decide when to reschedule vs recover.",
    date: "2026-04-21",
  },
  {
    href: "/slept-through-meeting-what-to-do",
    title: "Slept Through a Meeting? Here's What to Do Next",
    description:
      "Don't panic. Here's exactly what to say and how to recover professionally when you oversleep a meeting.",
    date: "2026-04-22",
  },
  {
    href: "/join-meeting-late-etiquette",
    title: "Joining a Meeting Late? Etiquette Rules No One Tells You",
    description:
      "What to do with your camera, mic, and apology when you join a meeting already in progress.",
    date: "2026-04-23",
  },
  {
    href: "/how-late-is-too-late-meeting",
    title: "How Late Is Too Late to Join a Meeting?",
    description:
      "2 minutes? Fine. 10 minutes? Maybe not. Here's exactly when you should join, skip, or reschedule.",
    date: "2026-04-24",
  },
];

// ── Section 2: When Notifications Fail ───────────────────────────────────────
const notificationFailureGuides: GuideEntry[] = [
  {
    href: "/why-calendar-notifications-fail",
    title: "Why Calendar Notifications Fail (And What Actually Works)",
    description:
      "You set the reminder. You still missed the meeting. Calendar notifications fail because they're passive — they inform without interrupting. Here's the full breakdown and what to use instead.",
    date: "2026-05-26",
  },
  {
    href: "/calendar-notifications-not-working",
    title: "Calendar Notifications Not Working? Why Reminders Fail — and What Fixes It",
    description:
      "Reminders fail two ways: technical failures (Focus mode, permissions, background restrictions) and silent behavioral failures (notifications that fire correctly but you still miss). Both covered here.",
    date: "2026-05-26",
  },
  {
    href: "/persistent-calendar-reminders",
    title: "How to Make Calendar Reminders Persistent",
    description:
      "Standard reminders vanish after a few seconds whether you act or not. A persistent reminder stays on your screen until you dismiss it. Here's what that means and how to set it up.",
    date: "2026-05-08",
  },
  {
    href: "/calendar-notifications-vs-alarms",
    title: "Calendar Notifications vs Alarms: Why Most Reminders Fail",
    description:
      "Notifications inform. Alarms interrupt. Understanding this difference explains why most calendar reminders fail — and what to use instead for Google and Outlook calendars.",
    date: "2026-05-08",
  },
  {
    href: "/adhd-time-blindness-tools",
    title: "ADHD Time Blindness Tools",
    description:
      "Time blindness makes passive notifications structurally unreliable. Here are the tools and strategies that actually interrupt hyperfocus — and why persistent alarms are the core fix.",
    date: "2026-05-08",
  },
];

// ── Section 3: Calendar Alarm Guides ─────────────────────────────────────────
const calendarAlarmGuides: GuideEntry[] = [
  {
    href: "/turn-calendar-events-into-alarms",
    title: "How to Turn Calendar Events Into Real Alarms",
    description:
      "Google Calendar and Outlook send notifications. Notifications disappear. OnTimer turns every event in your calendar into a persistent alarm — automatically, for both Google and Outlook.",
    date: "2026-05-08",
  },
  {
    href: "/persistent-calendar-reminders",
    title: "How to Make Calendar Reminders Persistent",
    description:
      "Standard reminders vanish after a few seconds whether you act or not. A persistent reminder stays on your screen until you dismiss it. Here's what that means and how to set it up.",
    date: "2026-05-08",
  },
  {
    href: "/calendar-alarm-app",
    title: "Best Calendar Alarm App for Google & Outlook Calendars",
    description:
      "OnTimer connects to your Google Calendar and Microsoft 365 / Outlook calendar and fires a persistent alarm for every event — not a notification that disappears.",
    date: "2026-05-08",
  },
  {
    href: "/calendar-notifications-vs-alarms",
    title: "Calendar Notifications vs Alarms: Why Most Reminders Fail",
    description:
      "Notifications inform. Alarms interrupt. Understanding this difference explains why most calendar reminders fail — and what to use instead for Google and Outlook calendars.",
    date: "2026-05-08",
  },
];

// ── Section 4: Medication Reminders ──────────────────────────────────────────
const medicationGuides: GuideEntry[] = [
  {
    href: "/how-to-remember-medication-on-time",
    title: "How to Remember to Take Your Medication on Time (Even If You Keep Missing It)",
    description:
      "Most people miss medication not because they forget — but because of what happens after the reminder fires. Set up a system that closes the gap. Includes a free schedule generator.",
    date: "2026-05-07",
  },
  {
    href: "/why-medication-reminders-fail",
    title: "Why Medication Reminders Fail (And What Actually Works)",
    description:
      "A single notification is easy to defer. Here's why standard reminders break down in the last 5 minutes — and what to use instead.",
    date: "2026-05-07",
  },
  {
    href: "/medication-schedule-calendar-setup",
    title: "How to Set Up a Medication Schedule Using Your Calendar",
    description:
      "Your calendar is already the system you use. Here's how to add medication to it — step by step — and download a ready-made schedule file.",
    date: "2026-05-07",
  },
  {
    href: "/how-to-set-medication-reminders-iphone",
    title: "How to Set Medication Reminders on iPhone",
    description:
      "Calendar app, Health app, Siri — all the iPhone options explained, plus what to do when notifications still aren't enough.",
    date: "2026-05-07",
  },
  {
    href: "/adhd-medication-timing",
    title: "ADHD and Medication Timing: Why the Last 5 Minutes Matters",
    description:
      "Time blindness makes deferring a reminder effortless. Here's why ADHD makes standard alerts fail — and what actually interrupts the pattern.",
    date: "2026-05-07",
  },
  {
    href: "/help-elderly-parent-remember-medication",
    title: "How to Help an Elderly Parent Remember Their Medication",
    description:
      "A caregiver's guide to setting up a medication system that works independently — without requiring you to be the reminder.",
    date: "2026-05-07",
  },
  {
    href: "/pet-medication-schedule",
    title: "How to Remember Your Pet's Medication Schedule",
    description:
      "Pets won't remind you. Here's how to set up recurring calendar events for flea prevention, heartworm, prescriptions, and more.",
    date: "2026-05-07",
  },
];

// ── Section 5: Never Be Late Again ───────────────────────────────────────────
const systemGuides: GuideEntry[] = [
  {
    href: "/what-to-say-when-late-to-meeting",
    title: "What to Say When You're Late to a Meeting (Exact Scripts)",
    description:
      "Exact scripts for what to say when you're late to a meeting — by chat, text, or out loud. Templates for every scenario plus a decision framework.",
    date: "2026-04-26",
  },
  {
    href: "/why-am-i-always-late-to-meetings",
    title: "Why Am I Always Late to Meetings? (And How to Fix It)",
    description:
      "If you're always late, it's not a discipline problem. Here's what's actually going wrong — and how to fix it.",
    date: "2026-04-25",
  },
  {
    href: "/alarm-didnt-go-off-late-for-work",
    title: "Alarm Didn't Go Off? How to Build a Fail-Safe Meeting Reminder System",
    description: "Learn why phone alarms fail and how to build a reliable reminder system.",
  },
  {
    href: "/missed-appointment-fee-how-to-prevent-no-shows",
    title: "Missed Appointment Fee? How to Prevent Costly No-Shows",
    description: "Avoid expensive no-show charges with a stronger reminder workflow.",
  },
  {
    href: "/calendar-notifications-not-working",
    title: "Calendar Notifications Not Working? 8 Fixes for iPhone and Google Calendar",
    description: "Troubleshoot broken reminders and make sure your alerts fire reliably.",
  },
  {
    href: "/how-to-never-miss-a-meeting",
    title: "How to Never Miss a Meeting Again",
    description: "A simple reminder system that ensures meetings and calls never slip through the cracks.",
  },
  {
    href: "/why-calendar-reminders-fail",
    title: "Why Calendar Reminders Fail",
    description: "Understand the hidden reasons calendar alerts fail and how to prevent it.",
  },
  {
    href: "/adhd-time-blindness-tools",
    title: "ADHD Time Blindness Tools",
    description: "Tools and strategies for managing time blindness and staying on schedule.",
  },
  {
    href: "/calendar-reminders-not-working",
    title: "Calendar Reminders Not Working",
    description: "Why calendar reminders fail to get your attention and what works better.",
  },
  {
    href: "/never-be-late-to-meetings",
    title: "How to Never Be Late to Meetings",
    description: "A practical system for consistently arriving on time.",
  },
];

function GuideCard({ href, title, description, date }: GuideEntry) {
  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-green-500/40">
      {date && (
        <time className="text-xs font-semibold uppercase tracking-widest text-green-500">
          {formatDate(date)}
        </time>
      )}
      <h3
        className={`${date ? "mt-2" : ""} text-lg font-bold text-white transition-colors group-hover:text-green-400`}
      >
        <Link href={href}>{title}</Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      <Link
        href={href}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-500 transition-colors hover:text-green-400"
      >
        Read more →
      </Link>
    </article>
  );
}

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-zinc-800 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            On<span className="text-green-500">Timer</span> Blog
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Guides and tools to help you never miss meetings, appointments, or important events.
          </p>
          <p className="mt-3 text-base text-zinc-500">
            Running late? Missed a meeting?{" "}
            <span className="text-zinc-400">
              These guides show you exactly what to say — and how to make sure it never happens again.
            </span>
          </p>
        </div>
      </section>

      {/* ── Section 1: Running Late or Missed a Meeting ── */}
      <section className="border-b border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-black text-white">
            Running Late or Missed a Meeting?
          </h2>
          <div className="space-y-4">
            {urgentGuides.map((guide, index) => {
              if (index === 0) {
                return (
                  <div key={guide.href}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">
                      Start Here
                    </p>
                    <GuideCard {...guide} />
                  </div>
                );
              }
              return <GuideCard key={guide.href} {...guide} />;
            })}
          </div>
        </div>
      </section>

      {/* ── Section 2: When Notifications Fail ── */}
      <section className="border-b border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Authority Cluster</p>
          <h2 className="mb-2 text-2xl font-black text-white">When Notifications Fail</h2>
          <p className="mb-8 text-sm text-zinc-500">
            Why calendar reminders fail silently — and what to use instead when the settings are correct but
            you still miss events.
          </p>
          <div className="space-y-4">
            {notificationFailureGuides.map((guide, index) => {
              if (index === 0) {
                return (
                  <div key={guide.href}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Start Here</p>
                    <GuideCard {...guide} />
                  </div>
                );
              }
              return <GuideCard key={guide.href} {...guide} />;
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: Calendar Alarm Guides ── */}
      <section className="border-b border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">New</p>
          <h2 className="mb-2 text-2xl font-black text-white">Calendar Alarm Guides</h2>
          <p className="mb-8 text-sm text-zinc-500">
            Turn Google Calendar and Outlook events into persistent alarms — not notifications that disappear.
          </p>
          <div className="space-y-4">
            {calendarAlarmGuides.map((guide, index) => {
              if (index === 0) {
                return (
                  <div key={guide.href}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">Start Here</p>
                    <GuideCard {...guide} />
                  </div>
                );
              }
              return <GuideCard key={guide.href} {...guide} />;
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4: Medication Reminders ── */}
      <section className="border-b border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-black text-white">Medication Reminders</h2>
          <div className="space-y-4">
            {medicationGuides.map((guide, index) => {
              if (index === 0) {
                return (
                  <div key={guide.href}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-500">
                      Start Here
                    </p>
                    <GuideCard {...guide} />
                  </div>
                );
              }
              return <GuideCard key={guide.href} {...guide} />;
            })}
          </div>
        </div>
      </section>

      {/* ── Section 5: Never Be Late Again ── */}
      <section className="border-b border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-black text-white">Never Be Late Again</h2>
          <div className="space-y-4">
            {systemGuides.map((guide) => (
              <GuideCard key={guide.href} {...guide} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Markdown Posts ── */}
      {posts.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-colors hover:border-green-500/40"
                >
                  <time className="text-xs font-semibold uppercase tracking-widest text-green-500">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-3 text-2xl font-black text-white transition-colors group-hover:text-green-400">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="mt-3 leading-relaxed text-zinc-400">{post.description}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-500 transition-colors hover:text-green-400"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
