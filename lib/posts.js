import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Posts are plain markdown files written into content/blog/ by the n8n
 * pipeline. There is no CMS and no runtime fetch — this all runs at build
 * time, which is what keeps the site a pure static export.
 *
 * Date gating is the scheduling mechanism. A post whose `publishedAt` is in
 * the future is invisible to every function here, so it is not listed, not
 * built as a page, and not in the sitemap. A nightly Netlify build releases
 * posts as they come due. That means the pipeline can commit a month of
 * posts at once and they publish themselves.
 */

function readAll() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);

      if (!data.title || !data.publishedAt) {
        throw new Error(
          `content/blog/${filename} is missing a required frontmatter field. ` +
            `Both "title" and "publishedAt" are mandatory.`,
        );
      }

      return {
        slug,
        title: data.title,
        description: data.description ?? "",
        publishedAt: new Date(data.publishedAt),
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
        author: data.author ?? "Joey Tan",
        tags: data.tags ?? [],
        // Optional per-post share card, as a site-relative path such as
        // "/img/og-invoice-integrity.png". Omitted on most posts, which then
        // fall back to OG_IMAGE in lib/seo.js. Must be 1200x630.
        image: data.image ?? null,
        readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
        content,
      };
    });
}

/** Published posts only, newest first. Future-dated posts are excluded. */
export function getPublishedPosts() {
  const now = new Date();
  return readAll()
    .filter((p) => p.publishedAt <= now)
    .sort((a, b) => b.publishedAt - a.publishedAt);
}

export function getPostSlugs() {
  return getPublishedPosts().map((p) => p.slug);
}

export function getPost(slug) {
  return getPublishedPosts().find((p) => p.slug === slug) ?? null;
}

/**
 * Markdown is rendered at build time. The content is authored by our own
 * pipeline, never by a visitor, so there is no untrusted input here.
 */
export function renderMarkdown(md) {
  return marked.parse(md, { async: false });
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
