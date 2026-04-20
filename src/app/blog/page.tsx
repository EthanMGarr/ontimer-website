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

const guides: GuideEntry[] = [
  // ── New articles (dated, newest first) ──────────────────────────────────
  {
    href: "/why-am-i-always-late-to-meetings",
    title: "Why Am I Always Late to Meetings? (And How to Fix It)",
    description:
      "Understand the behavioral and system causes of chronic lateness — and build a setup that fixes it for good.",
    date: "2026-04-25",
  },
  {
    href: "/how-late-is-too-late-meeting",
    title: "How Late Is Too Late to Join a Meeting?",
    description:
      "Use these time thresholds to decide whether to join late, skip entirely, or reschedule — based on context.",
    date: "2026-04-24",
  },
  {
    href: "/join-meeting-late-etiquette",
    title: "Joining a Meeting Late? Etiquette Rules No One Tells You",
    description:
      "What to do with your camera, mic, and apology when you join a meeting already in progress.",
    date: "2026-04-23",
  },
  {
    href: "/slept-through-meeting-what-to-do",
    title: "Slept Through a Meeting? Here's What to Do Next",
    description:
      "Don't panic. Here's exactly what to say and how to recover professionally when you oversleep a meeting.",
    date: "2026-04-22",
  },
  {
    href: "/missed-meeting-what-to-say",
    title: "Missed a Meeting? What to Say (Email + Slack Templates)",
    description:
      "Copy-paste apology messages for email and Slack — and how to decide when to reschedule vs recover.",
    date: "2026-04-21",
  },
  {
    href: "/running-late-to-meeting",
    title: "Running Late to a Meeting? Here's Exactly What to Do (and What Not to Say)",
    description:
      "Running late to a meeting? Use exact messages, simple rules, and learn how to handle it professionally — and prevent it from happening again.",
    date: "2026-04-20",
  },
  // ── Existing articles ────────────────────────────────────────────────────
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

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-800 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            On<span className="text-green-500">Timer</span> Blog
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Guides and tools to help you never miss meetings, appointments, or important events.
          </p>
        </div>
      </section>

      {/* Guides */}
      <section className="border-b border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-black text-white">Guides</h2>
          <div className="space-y-6">
            {guides.map(({ href, title, description, date }) => (
              <article
                key={href}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-green-500/40"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {posts.length === 0 ? (
            <p className="text-center text-zinc-400">
              No posts yet. Check back soon.
            </p>
          ) : (
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
                  <p className="mt-3 leading-relaxed text-zinc-400">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-500 transition-colors hover:text-green-400"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
