import Link from "next/link";
import { getPublishedPosts, formatDate } from "@/lib/posts";
import { getPopulatedCollections } from "@/lib/collections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/learn",
  title: "Learn | FasterAdmin",
  description:
    "How operations actually break in 20 to 50 person companies, and what it costs to fix.",
});

export default function BlogIndex() {
  const posts = getPublishedPosts();
  const topics = getPopulatedCollections(posts);

  return (
    <main>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <p className="eyebrow text-grey-600">Writing</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">
            How operations actually break, and what it costs to fix.
          </h1>
          <p className="body-base mt-8 max-w-xl text-grey-600">
            Notes from building systems inside growing companies. Specific problems,
            what they cost, and what we did about them.
          </p>
        </div>
      </section>

      {/*
        Browse by topic. Renders only when at least one collection has posts,
        and only shows collections that do. A grid of empty topics reads as a
        half-built site, so with little content this section simply is not there.
      */}
      {topics.length > 0 && (
        <section className="bg-white pb-8">
          <div className="container-site">
            <p className="eyebrow text-brand">Browse by topic</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/learn/topic/${t.slug}/`}
                  className="group rounded-[var(--radius-card)] border border-line p-6 transition-colors hover:border-brand"
                >
                  <h2 className="text-lg font-medium tracking-[-0.03em] text-navy group-hover:text-brand">
                    {t.title}
                  </h2>
                  <p className="body-base mt-2 text-grey-600">{t.description}</p>
                  <p className="mt-4 text-xs text-ink-muted">
                    {t.posts.length} {t.posts.length === 1 ? "article" : "articles"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-surface-alt py-20 lg:py-24">
        <div className="container-site">
          {topics.length > 0 && (
            <p className="eyebrow mb-6 text-grey-600">Latest</p>
          )}
          {posts.length === 0 ? (
            <p className="body-base text-grey-600">Nothing published yet.</p>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/learn/${post.slug}/`}
                    className="group flex flex-col gap-2 py-8 transition-colors hover:bg-white/60 sm:px-4"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                      <time dateTime={post.publishedAt.toISOString()}>
                        {formatDate(post.publishedAt)}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingMinutes} min read</span>
                    </div>

                    <h2 className="h-card text-navy group-hover:text-brand">{post.title}</h2>

                    {post.description ? (
                      <p className="body-base max-w-2xl text-grey-600">{post.description}</p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
