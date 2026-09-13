import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPosts, formatDate, headingSlug } from "@/lib/posts";
import { getCollection, getPopulatedCollections } from "@/lib/collections";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getPopulatedCollections(getPublishedPosts("nl"), "nl").map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const collection = getCollection(params.slug, "nl");
  if (!collection) return {};

  return pageMetadata({
    path: `/learn/topic/${collection.slug}`,
    languages: {
      nl: `/learn/topic/${collection.slug}`,
      en: `/eng/learn/topic/${collection.slug}`,
      "x-default": `/learn/topic/${collection.slug}`,
    },
    locale: "nl_NL",
    title: `${collection.title} | FasterAdmin`,
    description: collection.description,
  });
}

export default function TopicPage({ params }) {
  const collection = getCollection(params.slug, "nl");
  if (!collection) notFound();

  const posts = getPublishedPosts("nl").filter((p) => p.collection === collection.slug);
  if (posts.length === 0) notFound();

  return (
    <main>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <Link href="/learn/" className="eyebrow text-grey-600 hover:text-brand">
            ← Alle artikelen
          </Link>
          <h1 className="h-display mt-4 max-w-3xl text-navy">{collection.title}</h1>
          <p className="body-base mt-8 max-w-xl text-grey-600">{collection.description}</p>
        </div>
      </section>

      <section className="bg-surface-alt py-20 lg:py-24">
        <div className="container-site">
          <ul className="divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/learn/${post.slug}/`}
                  className="group flex flex-col gap-2 py-8 transition-colors hover:bg-white/60 sm:px-4"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                    <time dateTime={post.publishedAt.toISOString()}>
                      {formatDate(post.publishedAt, "nl")}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes} min leestijd</span>
                  </div>

                  <h2 id={headingSlug(post.title)} className="h-card text-navy group-hover:text-brand">{post.title}</h2>

                  {post.description ? (
                    <p className="body-base max-w-2xl text-grey-600">{post.description}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
