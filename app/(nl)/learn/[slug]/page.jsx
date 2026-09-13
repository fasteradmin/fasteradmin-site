import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { getPost, getPostSlugs, renderMarkdown, formatDate } from "@/lib/posts";
import { absoluteUrl, pageMetadata, ORG_ID, OG_IMAGE, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return getPostSlugs("nl").map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug, "nl");
  if (!post) return {};

  return pageMetadata({
    path: `/learn/${post.slug}`,
    languages: {
      nl: `/learn/${post.slug}`,
      en: `/eng/learn/${post.slug}`,
      "x-default": `/learn/${post.slug}`,
    },
    locale: "nl_NL",
    title: post.metaTitle ?? `${post.title} | FasterAdmin`,
    description: post.description,
    keywords: post.keywords.length ? post.keywords : undefined,
    image: post.image
      ? { url: post.image, width: 1200, height: 630, alt: post.title }
      : OG_IMAGE,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: (post.updatedAt ?? post.publishedAt).toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
  });
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug, "nl");
  if (!post) notFound();

  const html = renderMarkdown(post.content);

  const url = absoluteUrl(`/learn/${post.slug}`);

  const ourSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt.toISOString(),
    dateModified: (post.updatedAt ?? post.publishedAt).toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": ORG_ID },
    image: `${SITE_URL}${post.image ?? OG_IMAGE.url}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    keywords: post.tags.join(", "),
    inLanguage: "nl",
  };

  const schema = post.jsonLd ?? ourSchema;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article>
        <section className="bg-white">
          <div className="container-site py-16 lg:py-24">
            <Link href="/learn/" className="text-sm text-ink-muted hover:text-brand">
              ← Alle artikelen
            </Link>

            <h1 className="h-display mt-6 max-w-3xl text-navy">{post.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt.toISOString()}>
                {formatDate(post.publishedAt, "nl")}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min leestijd</span>
            </div>
          </div>
        </section>

        <section className="bg-white pb-20 lg:pb-28">
          <div className="container-site">
            <div className="prose-post max-w-2xl" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>
      </article>

      <section className="bg-surface-alt py-20 lg:py-24">
        <div className="container-site">
          <h2 id="what-is-this-costing-you" className="h-section max-w-2xl text-navy">
            Wil je weten wat dit je kost?
          </h2>
          <p className="body-base mt-6 max-w-xl text-grey-600">
            Twintig minuten, geen verkooppraatje. We kijken waar het werk nu echt heen gaat
            en vertellen je of er iets is dat de moeite van het oplossen waard is.
          </p>
          <Button href="/#section-meeting" className="mt-10">
            Plan 20 minuten met ons
          </Button>
        </div>
      </section>
    </main>
  );
}
