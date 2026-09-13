/**
 * Topic collections: the hub half of a hub-and-spoke blog.
 *
 * A post opts into one collection via `collection: <slug>` in its frontmatter.
 * Each collection gets a hub page at /learn/topic/<slug>/ that gathers its posts.
 *
 * Why this exists before there is much content: `collection` is a frontmatter
 * contract. Posts written before the contract exists have to be retrofitted by
 * hand, and the cost grows with every post. The mechanism is cheap now and
 * expensive later, so it goes in first.
 *
 * The taxonomy below is deliberately small and derived from what has actually
 * been written, not from a guess about where the blog is going. It is expected
 * to change once the positioning work lands — renaming a collection means
 * editing the title here and the `collection` value in the posts that use it.
 *
 * A collection with no published posts does not render anywhere: no hub page,
 * no entry in "Browse by topic", nothing in the sitemap. An empty topic grid
 * reads as broken, so the site simply does not show one until there is
 * something behind it.
 *
 * title/description are per-locale (2026-09-13, alongside the Dutch learn
 * pages) — a slug is the one thing that must not change across locales,
 * since it is both the taxonomy key posts declare and the hub's URL segment.
 */

export const COLLECTIONS = [
  {
    slug: "reliability",
    title: {
      en: "When automation quietly fails",
      nl: "Wanneer automatisering stil faalt",
    },
    description: {
      en: "Workflows that report success while doing nothing useful, and how to tell the difference before it costs you.",
      nl: "Workflows die succes rapporteren terwijl ze niets bruikbaars doen, en hoe je het verschil ziet voordat het je iets kost.",
    },
  },
  {
    slug: "finance-ops",
    title: {
      en: "Invoicing and finance operations",
      nl: "Facturatie en financiële operaties",
    },
    description: {
      en: "Quotes, invoices, reconciliation and the manual checking that grows with headcount.",
      nl: "Offertes, facturen, afstemming en de handmatige controle die meegroeit met het aantal medewerkers.",
    },
  },
  {
    slug: "buying-automation",
    title: {
      en: "Buying automation",
      nl: "Automatisering inkopen",
    },
    description: {
      en: "What to ask a provider, what a scope should contain, and how to judge whether a build will survive contact with reality.",
      nl: "Wat je een leverancier moet vragen, wat een scope moet bevatten, en hoe je beoordeelt of een bouwwerk de praktijk overleeft.",
    },
  },
];

const BY_SLUG = new Map(COLLECTIONS.map((c) => [c.slug, c]));

function localize(c, locale) {
  return {
    slug: c.slug,
    title: c.title[locale] ?? c.title.en,
    description: c.description[locale] ?? c.description.en,
  };
}

export function getCollection(slug, locale = "en") {
  const c = BY_SLUG.get(slug);
  return c ? localize(c, locale) : null;
}

export function isValidCollection(slug) {
  return BY_SLUG.has(slug);
}

/**
 * Collections that actually have published posts, each with its posts attached.
 * Ordered by the registry above, not by post count, so the navigation is stable.
 *
 * `posts` is expected to already be locale-filtered (i.e. the result of
 * `getPublishedPosts(locale)`) — this function only resolves title/description
 * for that same `locale`, it does not filter posts by it.
 */
export function getPopulatedCollections(posts, locale = "en") {
  return COLLECTIONS.map((c) => ({
    ...localize(c, locale),
    posts: posts.filter((p) => p.collection === c.slug),
  })).filter((c) => c.posts.length > 0);
}
