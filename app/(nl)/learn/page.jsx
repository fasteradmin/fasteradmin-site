import Link from "next/link";
import { getPublishedPosts, formatDate, headingSlug } from "@/lib/posts";
import { getPopulatedCollections } from "@/lib/collections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/learn",
  title: "Inzichten | FasterAdmin",
  description:
    "Hoe operations in bedrijven van 20 tot 50 medewerkers daadwerkelijk vastlopen, en wat het kost om het op te lossen.",
  locale: "nl_NL",
  languages: { nl: "/learn", en: "/eng/learn", "x-default": "/learn" },
});

export default function BlogIndex() {
  const posts = getPublishedPosts("nl");
  const topics = getPopulatedCollections(posts, "nl");

  return (
    <main>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <p className="eyebrow text-grey-600">Schrijfwerk</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">
            Hoe operations daadwerkelijk vastlopen, en wat het kost om het op te lossen.
          </h1>
          <p className="body-base mt-8 max-w-xl text-grey-600">
            Notities uit het bouwen van systemen binnen groeiende bedrijven. Specifieke
            problemen, wat ze kosten, en wat we eraan hebben gedaan.
          </p>
        </div>
      </section>

      {topics.length > 0 && (
        <section className="bg-white pb-8">
          <div className="container-site">
            <p className="eyebrow text-brand">Bekijk per onderwerp</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/learn/topic/${t.slug}/`}
                  className="group rounded-[var(--radius-card)] border border-line p-6 transition-colors hover:border-brand"
                >
                  <h2 id={headingSlug(t.title)} className="text-lg font-medium tracking-[-0.03em] text-navy group-hover:text-brand">
                    {t.title}
                  </h2>
                  <p className="body-base mt-2 text-grey-600">{t.description}</p>
                  <p className="mt-4 text-xs text-ink-muted">
                    {t.posts.length} {t.posts.length === 1 ? "artikel" : "artikelen"}
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
            <p className="eyebrow mb-6 text-grey-600">Nieuwste</p>
          )}
          {posts.length === 0 ? (
            <p className="body-base text-grey-600">Nog niets gepubliceerd.</p>
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
          )}
        </div>
      </section>
    </main>
  );
}
