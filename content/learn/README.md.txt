Blog content directory
======================

One markdown file per post. The filename is the URL slug:
`content/learn/invoice-reconciliation.md` becomes `/learn/invoice-reconciliation/`.

This file has a `.txt` extension on purpose so the build skips it — only
`.md` files are read.

FRONTMATTER
-----------

    ---
    title: "Required. Used as the H1 and the schema headline."
    description: "Required in practice. Meta description and the blog index blurb."
    publishedAt: 2026-08-12
    updatedAt: 2026-08-14        # optional
    author: "Joey Tan"           # optional, defaults to Joey Tan
    tags: ["operations", "invoicing"]   # optional
    ---

`title` and `publishedAt` are mandatory. A file missing either one fails the
build loudly rather than shipping a broken page.

SCHEDULING
----------

`publishedAt` IS the schedule. A post dated in the future is invisible
everywhere — not listed, not built as a page, not in the sitemap. A build
running on or after that date publishes it.

So the pipeline can commit a month of posts at once, each dated a few days
apart, and they release themselves. Netlify needs a nightly scheduled build
for this to work; without one, posts only appear when something else
triggers a build.

WRITING FOR ANSWER ENGINES
--------------------------

- Make H2s questions a buyer would actually type, and answer them in the
  first paragraph underneath. That pairing is what gets lifted into an AI
  answer.
- One idea per section. A section that needs the previous one to make sense
  cannot be quoted on its own.
- Concrete nouns and real numbers beat adjectives.
- Every post links to the Ops Call or the scope at least once.

VOICE
-----

memory/SOUL.md in the brain repo is the spec. No em dashes, no Oxford
commas, no hype words, lead with the insight. Never invent a metric or a
quote.
