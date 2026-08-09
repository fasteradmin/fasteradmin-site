import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

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
 * Markdown is rendered at build time and injected via dangerouslySetInnerHTML.
 *
 * This used to be safe on the grounds that posts were only ever authored by us.
 * That stopped being true once a publish endpoint existed: anything holding the
 * publish token — SEOforGPT, an n8n workflow, a leaked credential — can write a
 * post body. `marked` passes raw HTML straight through, so an unsanitised
 * `<script>` in a post body would be stored XSS on the live site.
 *
 * Sanitising here rather than at ingest is deliberate: it covers every path
 * into content/blog/, including a file committed by hand, so no future
 * publishing route can bypass it. It runs at build time, so visitors pay
 * nothing for it.
 */
const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "a", "ul", "ol", "li", "blockquote",
  "strong", "em", "code", "pre", "hr", "br",
  "table", "thead", "tbody", "tr", "th", "td",
  "img", "figure", "figcaption",
];

export function renderMarkdown(md) {
  const html = marked.parse(md, { async: false });

  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      code: ["class"], // syntax-highlight language hints
      th: ["scope"],
    },
    // http/https/mailto only. Blocks javascript: and data: URLs, which are the
    // usual way to smuggle script past a tag allowlist.
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    // Anything not on the allowlist loses its tags but keeps its text, so
    // sanitising never silently deletes a paragraph of real content.
    disallowedTagsMode: "discard",
  });
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
