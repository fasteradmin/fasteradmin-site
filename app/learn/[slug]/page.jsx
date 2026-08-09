import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { getPost, getPostSlugs, renderMarkdown, formatDate } from "@/lib/posts";
import { absoluteUrl, pageMetadata, ORG_ID, OG_IMAGE, SITE_URL } from "@/lib/seo";

/**
 * Only published slugs are returned, so a future-dated post is never built
 * as a page. With `output: export` there is no fallback route, which means
 * an unpublished post genuinely does not exist on the site until a build
 * runs on or after its publishedAt date.
 */
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};

  return pageMetadata({
    path: `/learn/${post.slug}`,
    title: `${post.title} | FasterAdmin`,
    description: post.description,
    // A post may ship its own share card via an `image` field in frontmatter.
    // Most will not, and fall back to the site default rather than to nothing.
    image: post.image
      ? { url: post.image, width: 1200, height: 630, alt: post.title }
      : OG_IMAGE,
    openGraph: {
      type: "article",
      // The share card shows the post's own title, not the "| FasterAdmin"
      // suffixed <title> — the suffix is wasted characters in a link preview.
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
  const post = getPost(params.slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);

  const url = absoluteUrl(`/learn/${post.slug}`);

  // BlogPosting schema. This is the main lever for being quotable by an
  // answer engine: it states plainly who wrote it, when, and what it is about.
  //
  // `publisher` is now a reference to the Organization node emitted by the root
  // layout rather than a second, thinner copy of it. Two Organization objects
  // with the same name and no shared @id read as two entities; one node plus a
  // reference reads as one business that also publishes a blog.
  const schema = {
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
  };

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
              ← All writing
            </Link>

            <h1 className="h-display mt-6 max-w-3xl text-navy">{post.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt.toISOString()}>
                {formatDate(post.publishedAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
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
          <h2 className="h-section max-w-2xl text-navy">
            Want to know what this is costing you?
          </h2>
          <p className="body-base mt-6 max-w-xl text-grey-600">
            Twenty minutes, no pitch. We look at where the work actually goes and tell you
            whether there is anything worth fixing.
          </p>
          <Button href="/#section-meeting" className="mt-10">
            Book The Ops Call — 20 Minutes, No Pitch
          </Button>
        </div>
      </section>
    </main>
  );
}
