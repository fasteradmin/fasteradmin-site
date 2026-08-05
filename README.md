# fasteradmin.com

Self-hosted rebuild of fasteradmin.com, migrated off Framer so an AI agent can
edit the site directly from files instead of a visual editor.

**Stack:** Next.js 15 (App Router, static export) + Tailwind CSS v4. No database,
no server, no build-time API calls. `npm run build` emits a fully static `out/`
directory that can be dropped on any host.

## Commands

```bash
npm run dev
```

```bash
npm run build
```

The dev server runs on port 3210. `build` writes the static site to `out/`.

## Layout

| Path | What's there |
|---|---|
| `app/` | One folder per route. `layout.jsx` wraps every page with nav, footer and analytics. |
| `components/` | Shared blocks: `Nav`, `Footer`, `Faq`, `MeetingSection` (Calendly), `ContactSection` (form), `Analytics`, `PolicyPage`. |
| `components/home/` | Homepage-only blocks. `SolutionSystem` renders one "Time Multiplying System". |
| `public/img/` | All imagery, pulled off Framer's CDN. Filenames are the original Framer asset hashes. |
| `public/fonts/` | Inter (300–700) and Open Runde, self-hosted. |
| `app/globals.css` | Design tokens (colours, type scale, radii) as Tailwind theme variables. |

## Editing content

Most copy lives in plain arrays at the top of the relevant page file, not buried
in markup. To change the homepage pain points, edit `painPoints` in
`app/page.jsx`. To change the FAQ, edit `items` in `components/Faq.jsx`.

To add a case study: add an entry to `cases` in `app/works/page.jsx`, then create
`app/works/<slug>/page.jsx`.

## Design tokens

Extracted from the live Framer build, defined in `app/globals.css`:

- Brand blue `#0096f2`, navy `#022848`, near-black `#000a12`, accent orange `#ff9922`
- Greys `#fafafa` → `#1f1f1f`
- Headings are Inter 600 with tight negative tracking (`.h-display`, `.h-section`, `.h-card`)
- Card radius 24px, block radius 40px

## Integrations

| Thing | Where | Status |
|---|---|---|
| Google Tag Manager `GTM-5P7H6PR5` | `components/Analytics.jsx` | Ported |
| GA4 `G-4ZHCZ4427C` | `components/Analytics.jsx` | Ported |
| Meta Pixel `2899552250215243` | `components/Analytics.jsx` | Ported |
| Calendly `joey-fasteradmin/30min` | `components/MeetingSection.jsx` | Ported |
| YouTube embeds | homepage + case study | Ported |
| Contact form | `components/ContactSection.jsx` | **Not connected** — see below |

### Route-change tracking

Framer rendered the site as a single-page app and only fired a pageview on the
initial hard load, so in-site navigation went untracked. `Analytics.jsx` fixes
this: it watches the pathname and re-fires GA4 `page_view`, Meta `PageView` and
a `dataLayer` push on every client-side navigation, while skipping the first
load so nothing double-counts.

### Contact form

Framer's built-in form handler does not exist off-platform, so the form has no
backend yet. Point `NEXT_PUBLIC_FORM_ENDPOINT` at a handler (Formspree, Netlify
Forms, or an n8n webhook — n8n is already in the stack) before launch. Until it
is set, the form refuses to submit and says so rather than silently dropping
leads.

## Deploying

The output is static, so any static host works. Vercel and Netlify both detect
Next.js automatically; with `output: "export"` the publish directory is `out/`.

Do not repoint DNS until the new site is verified, and do not cancel Framer
until DNS has cut over and stuck.

## Known issues carried over deliberately

This was built as a faithful 1:1 rebuild, so several existing defects were
reproduced rather than fixed. They are flagged in code comments and listed in
`REBUILD-NOTES.md`.
