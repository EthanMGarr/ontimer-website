import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { AppStoreButton } from "@/components/CTAButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Article header */}
      <section className="border-b border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Blog
          </Link>
          <time className="block text-xs font-semibold uppercase tracking-widest text-green-500">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-xl text-zinc-400">{post.description}</p>
        </div>
      </section>

      {/* Article body */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />
        </div>
      </section>

      {/* In-article CTA */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Ready to stop being late?
          </h2>
          <p className="mt-3 text-zinc-400">
            Download OnTimer free and let your calendar work for you.
          </p>
          <div className="mt-6">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
