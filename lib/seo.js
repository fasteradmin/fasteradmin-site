/**
 * Single source of truth for canonical URLs, OpenGraph and site-level schema.
 *
 * Why this file exists:
 *
 * The base URL used to be written out three separate times — app/layout.jsx,
 * app/blog/[slug]/page.jsx and app/sitemap.js each had their own copy. Nothing
 * was wrong with any of them, which is the problem: three copies drift silently
 * and the symptom (a canonical pointing at a hostname the site does not serve)
 * looks like a content bug rather than a config one.
 *
 * More importantly, canonical tags were opt-in per page. The blog template set
 * one; six of the eight other pages set nothing. A page with no canonical on a
 * domain that answers at both the apex and www is a duplicate-content exposure
 * even when the www redirect is correct, because the redirect only covers the
 * hostnames we know about — not a proxy, a scraper mirror, or a tracking
 * parameter appended to a shared link.
 *
 * `pageMetadata()` makes canonical, OpenGraph and the share image impossible to
 * forget: a page that calls it gets all three, and a page that does not call it
 * shows up immediately in the audit script below. Do not hand-write an
 * `alternates` or `openGraph` block in a page file — extend this instead.
 */

export const SITE_URL = "https://fasteradmin.com";

/** Matches the `siteName` that was already live, not the wordmark. */
export const SITE_NAME = "Faster Admin";

/** Legal/schema name, which differs from the OpenGraph siteName above. */
export const ORG_NAME = "FasterAdmin";

/**
 * Default share card. 1200x630 is the size LinkedIn, Meta and X all accept
 * without recropping; anything smaller than 600x315 gets rendered as a small
 * thumbnail instead of a large card, which is the failure this asset exists to
 * prevent when a blog post is cross-promoted from a video.
 */
export const OG_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "FasterAdmin — get the work done, without the hire you can't make",
};

/**
 * Absolute URL for a site path.
 *
 * next.config.mjs sets `trailingSlash: true`, so /about is served as a 301 to
 * /about/. A canonical pointing at the un-slashed form names a URL that
 * redirects, which is the same defect as having no canonical at all: the tag
 * has to name the URL that actually answers 200.
 */
export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  const slashed = clean.endsWith("/") ? clean : `${clean}/`;
  return `${SITE_URL}${slashed === "//" ? "/" : slashed}`;
}

/**
 * Build a page's metadata object.
 *
 * Next.js shallow-merges metadata between a layout and its pages: a page that
 * declares `openGraph` REPLACES the layout's `openGraph` wholesale rather than
 * merging into it. That is why the image, siteName and locale are re-stated
 * here on every page instead of being inherited from the root layout — relying
 * on inheritance is what silently drops og:image from exactly the pages that
 * bothered to customise their share text.
 *
 * @param {object}  o
 * @param {string}  o.path         Site-relative path, e.g. "/about" or "/".
 * @param {string}  o.title        Full <title>, already suffixed.
 * @param {string} [o.description]
 * @param {object} [o.openGraph]   Extra OG fields (type, publishedTime, ...).
 * @param {object} [o.image]       Override for OG_IMAGE.
 * @param {boolean}[o.noIndex]     Set on pages that must never be indexed.
 */
export function pageMetadata({
  path,
  title,
  description,
  openGraph = {},
  image = OG_IMAGE,
  noIndex = false,
}) {
  const url = absoluteUrl(path);

  const meta = {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: openGraph.title ?? title,
      description: openGraph.description ?? description,
      url,
      images: [image],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: openGraph.title ?? title,
      description: openGraph.description ?? description,
      images: [image.url],
    },
  };

  // A noindex page must not also claim to be canonical for itself — that is a
  // contradictory pair of signals. Drop the canonical rather than emit both.
  if (noIndex) {
    delete meta.alternates;
    meta.robots = { index: false, follow: true };
  }

  return meta;
}

/**
 * Organization + WebSite JSON-LD, rendered once in the root layout.
 *
 * This is the "is this a real business" signal. Classic SEO mostly shrugs at
 * its absence; answer engines do not — without it there is no machine-readable
 * statement tying the brand name, the domain, the logo and the contact point
 * together, so a model has to infer the entity from prose. Both nodes carry
 * stable @ids so the BlogPosting schema on a post can point its publisher at
 * this Organization instead of restating it.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: ORG_NAME,
      alternateName: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/pJFWiP5x9jQeaGSDwZogaYz9Ot8.png`,
        width: 919,
        height: 189,
      },
      image: `${SITE_URL}${OG_IMAGE.url}`,
      description:
        "FasterAdmin builds the operations systems that let a 20 to 50 person company handle more work without hiring for it.",
      email: "joey@getfasteradmin.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amsterdam",
        addressCountry: "NL",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "joey@getfasteradmin.com",
        areaServed: "EU",
        availableLanguage: ["en", "nl"],
      },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
  ],
};
