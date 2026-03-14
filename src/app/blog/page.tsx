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
            {[
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
            ].map(({ href, title, description }) => (
              <article
                key={href}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-green-500/40"
              >
                <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                  <Link href={href}>{title}</Link>
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{description}</p>
                <Link
                  href={href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-500 hover:text-green-400 transition-colors"
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
                  <h2 className="mt-3 text-2xl font-black text-white group-hover:text-green-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="mt-3 text-zinc-400 leading-relaxed">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-500 hover:text-green-400 transition-colors"
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
