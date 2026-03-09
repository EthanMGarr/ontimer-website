import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, insights, and strategies for punctuality and time management from the OnTimer team.",
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
            The OnTimer <span className="text-green-500">Blog</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Strategies, insights, and the science of showing up on time.
          </p>
        </div>
      </section>

      {/* Guides */}
      <section className="border-b border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Guides</h2>
          <ul className="space-y-3">
            {[
              { label: "Why Calendar Reminders Fail", href: "/why-calendar-reminders-fail" },
              { label: "ADHD Time Blindness Tools", href: "/adhd-time-blindness-tools" },
              { label: "Calendar Reminders Not Working", href: "/calendar-reminders-not-working" },
              { label: "How to Never Be Late to Meetings", href: "/never-be-late-to-meetings" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-green-500 hover:text-green-400 transition-colors"
                >
                  {label} →
                </Link>
              </li>
            ))}
          </ul>
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
