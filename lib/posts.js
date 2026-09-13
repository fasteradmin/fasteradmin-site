import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { COLLECTIONS, isValidCollection } from "@/lib/collections";

const BLOG_DIR = path.join(process.cwd(), "content", "learn");

/**
 * Posts are plain markdown files written into content/learn/ by the n8n
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
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      // A Dutch translation needs the same public slug as its English
      // original (so /learn/<slug>/ and /eng/learn/<slug>/ mirror each
      // other) while living in a differently-named file, since two files
      // can't share one name. `slug` in frontmatter overrides the filename
      // for exactly that case; every English post omits it and keeps
      // today's behaviour.
      const slug = data.slug ?? filename.replace(/\.md$/, "");

      if (!data.title || !data.publishedAt) {
        throw new Error(
          `content/learn/${filename} is missing a required frontmatter field. ` +
            `Both "title" and "publishedAt" are mandatory.`,
        );
      }

      // `collection` is optional, but a typo'd one must not fail silently:
      // the post would build fine and simply never appear on any hub page.
      if (data.collection && !isValidCollection(data.collection)) {
        throw new Error(
          `content/learn/${filename} has collection "${data.collection}", ` +
            `which is not in lib/collections.js. Valid slugs: ` +
            `${COLLECTIONS.map((c) => c.slug).join(", ")}.`,
        );
      }

      // json_ld arrives from the SEOforGPT webhook as a JSON string (emitting
      // nested YAML from a workflow is error-prone), but a hand-written post
      // may use a normal YAML object. Accept both.
      let jsonLd = null;
      if (data.json_ld) {
        try {
          jsonLd = typeof data.json_ld === "string" ? JSON.parse(data.json_ld) : data.json_ld;
        } catch {
          throw new Error(
            `content/learn/${filename} has a json_ld field that is not valid JSON.`,
          );
        }
      }

      return {
        slug,
        locale: data.locale ?? "en",
        title: data.title,
        description: data.description ?? data.excerpt ?? "",
        publishedAt: new Date(data.publishedAt),
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
        author: data.author ?? "Joey Tan",
        tags: data.tags ?? [],
        collection: data.collection ?? null,

        // Fields owned by the publishing webhook. The site never edits these:
        // per SEOforGPT's contract, everything that must stay accurate
        // originates from the payload, so there are no parallel SEO controls
        // for someone to maintain and forget.
        status: data.status ?? "published",
        externalId: data.external_id ?? null,
        metaTitle: data.meta_title ?? null,
        keywords: data.keywords ?? [],
        jsonLd,
        // Optional per-post share card, as a site-relative path such as
        // "/img/og-invoice-integrity.png". Omitted on most posts, which then
        // fall back to OG_IMAGE in lib/seo.js. Must be 1200x630.
        image: data.image ?? null,
        readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
        content,
      };
    });
}

/**
 * Published posts only, newest first.
 *
 * Two independent ways a post stays invisible, and both must hold:
 *   - `status: draft` — an explicit draft from the publishing webhook.
 *   - a future `publishedAt` — scheduled, released by the nightly rebuild.
 *
 * Invisible here means invisible everywhere: not listed, no page built, not in
 * the sitemap. With `output: export` there is no runtime route, so a draft is
 * genuinely absent from the deployed site rather than merely noindexed.
 */
export function getPublishedPosts(locale = "en") {
  const now = new Date();
  return readAll()
    .filter((p) => p.locale === locale && p.status !== "draft" && p.publishedAt <= now)
    .sort((a, b) => b.publishedAt - a.publishedAt);
}

/** Every post including drafts. For tooling and idempotency lookups only. */
export function getAllPosts() {
  return readAll();
}

export function getPostSlugs(locale = "en") {
  return getPublishedPosts(locale).map((p) => p.slug);
}

export function getPost(slug, locale = "en") {
  return getPublishedPosts(locale).find((p) => p.slug === slug) ?? null;
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
 * into content/learn/, including a file committed by hand, so no future
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

  const clean = sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      code: ["class"], // syntax-highlight language hints
      th: ["scope"],
      // Anchors on headings, added below. Allowed here so the sanitiser does
      // not strip the ids straight back off.
      h2: ["id"],
      h3: ["id"],
      h4: ["id"],
    },
    // http/https/mailto only. Blocks javascript: and data: URLs, which are the
    // usual way to smuggle script past a tag allowlist.
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    // Anything not on the allowlist loses its tags but keeps its text, so
    // sanitising never silently deletes a paragraph of real content.
    disallowedTagsMode: "discard",
  });

  // Wrap tables so a wide one scrolls inside its own box instead of forcing
  // the whole page sideways. Done after sanitising, so this markup is ours
  // and never something a payload could inject.
  const withTables = clean
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");

  return addHeadingAnchors(withTables);
}

/**
 * Give every H2/H3/H4 a stable id derived from its own text.
 *
 * Answer engines quote a heading plus the passage under it, and a deep link
 * to that passage is what turns a citation into a visit. Without ids there is
 * nothing to link to but the top of the page.
 *
 * Ids come from the heading text rather than a counter, so they stay stable
 * when a post is edited and existing deep links keep working. Duplicates get a
 * numeric suffix, since an id has to be unique for the fragment to resolve.
 */
export function headingSlug(text) {
  return String(text)
    .replace(/<[^>]*>/g, "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function addHeadingAnchors(html) {
  const seen = new Map();

  return html.replace(/<(h[234])>([\s\S]*?)<\/\1>/g, (match, tag, inner) => {
    const base = headingSlug(inner);
    if (!base) return match;

    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    const id = n === 1 ? base : `${base}-${n}`;

    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
}

export function formatDate(date, locale = "en") {
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
