import { getPublishedPosts } from "@/lib/posts";

const BASE = "https://fasteradmin.com";

const routes = [
  "/",
  "/about",
  "/works",
  "/works/email-to-quote-system",
  "/blog",
  "/contact",
  "/terms-of-service-policy",
  "/privacy-policy-policy",
];

export const dynamic = "force-static";

// next.config.mjs sets trailingSlash: true, so /about serves a 301 to /about/.
// A sitemap listing the un-slashed form advertises URLs that redirect, which
// wastes crawl budget and muddies which URL is canonical.
const withSlash = (route) => (route.endsWith("/") ? route : `${route}/`);

export default function sitemap() {
  const staticEntries = routes.map((route) => ({
    url: `${BASE}${withSlash(route)}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  // Only published posts appear. A future-dated post is excluded here for the
  // same reason it is not built as a page: until its date passes it does not
  // exist on the site, and listing it would advertise a 404.
  const postEntries = getPublishedPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}/`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
