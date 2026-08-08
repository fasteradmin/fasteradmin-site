import Link from "next/link";
import { getPublishedPosts, formatDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Blog | FasterAdmin",
  description:
    "How operations actually break in 20 to 50 person companies, and what it costs to fix.",
});

export default function BlogIndex() {
  const posts = getPublishedPosts();

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

      <section className="bg-surface-alt py-20 lg:py-24">
        <div className="container-site">
          {posts.length === 0 ? (
            <p className="body-base text-grey-600">Nothing published yet.</p>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}/`}
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
