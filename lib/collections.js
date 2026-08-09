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
 */

export const COLLECTIONS = [
  {
    slug: "reliability",
    title: "When automation quietly fails",
    description:
      "Workflows that report success while doing nothing useful, and how to tell the difference before it costs you.",
  },
  {
    slug: "finance-ops",
    title: "Invoicing and finance operations",
    description:
      "Quotes, invoices, reconciliation and the manual checking that grows with headcount.",
  },
  {
    slug: "buying-automation",
    title: "Buying automation",
    description:
      "What to ask a provider, what a scope should contain, and how to judge whether a build will survive contact with reality.",
  },
];

const BY_SLUG = new Map(COLLECTIONS.map((c) => [c.slug, c]));

export function getCollection(slug) {
  return BY_SLUG.get(slug) ?? null;
}

export function isValidCollection(slug) {
  return BY_SLUG.has(slug);
}

/**
 * Collections that actually have published posts, each with its posts attached.
 * Ordered by the registry above, not by post count, so the navigation is stable.
 */
export function getPopulatedCollections(posts) {
  return COLLECTIONS.map((c) => ({
    ...c,
    posts: posts.filter((p) => p.collection === c.slug),
  })).filter((c) => c.posts.length > 0);
}
