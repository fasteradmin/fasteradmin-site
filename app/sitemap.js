import { getPublishedPosts } from "@/lib/posts";
import { getPopulatedCollections } from "@/lib/collections";
import { SITE_URL as BASE } from "@/lib/seo";

const routes = [
  "/",
  // The whole site (except /learn's dynamic post/topic pages, added below)
  // got its Dutch pass on 2026-09-13: Dutch takes the root path, English
  // moved under /eng.
  "/eng",
  "/eng/about",
  "/eng/contact",
  "/eng/works",
  "/eng/works/email-to-quote-system",
  "/eng/learn",
  "/eng/terms-of-service-policy",
  "/eng/privacy-policy-policy",
  "/about",
  "/contact",
  "/works",
  "/works/email-to-quote-system",
  "/learn",
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

  // Only published posts appear, per locale. A future-dated post is excluded
  // here for the same reason it is not built as a page: until its date
  // passes it does not exist on the site, and listing it would advertise a 404.
  const postEntries = ["en", "nl"].flatMap((locale) =>
    getPublishedPosts(locale).map((post) => ({
      url: `${BASE}${locale === "en" ? "/eng" : ""}/learn/${post.slug}/`,
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  );

  // Only hubs that have posts. A collection with nothing in it has no page,
  // so listing it would advertise a 404.
  const topicEntries = ["en", "nl"].flatMap((locale) =>
    getPopulatedCollections(getPublishedPosts(locale), locale).map((c) => ({
      url: `${BASE}${locale === "en" ? "/eng" : ""}/learn/topic/${c.slug}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...topicEntries, ...postEntries];
}
