# Rebuild notes — 2026-08-05

Faithful 1:1 rebuild of the Framer site. Copy was reproduced verbatim and no
content problems were fixed in this pass, per the agreed scope. This file
records what was found along the way so the follow-up pass has a worklist.

## Scope built

Core pages only: `/`, `/about`, `/works`, `/works/email-to-quote-system`,
`/contact`, `/404`, `/terms-of-service-policy`, `/privacy-policy-policy`.

## Deliberately not rebuilt

These live URLs exist on Framer and were left out. If DNS cuts over without
them, they 404.

| URL | Why |
|---|---|
| `/voice-assistant-restv2` | Confirmed stale 2026-07-19. Dutch restaurant pitch, not current positioning. |
| `/voice-assistant` | Voice-assistant funnel, out of agreed scope. |
| `/voice-assistant-beautyv1` | Per-vertical clinic landing page, out of scope. |
| `/voice-assistant-book-meeting` | Booking page for the above. |
| `/articles` + 4 article pages | All leftover brand/web-design content, off current positioning. |
| `/image-library` | Framer internal page, no reason to exist. |

Decide before cutover whether any of these need rebuilding or a redirect. The
voice-assistant pages matter most: if any outreach still links to them, they
need to keep resolving.

## Defects reproduced verbatim — fix these next

1. **Homepage FAQ is web-design agency copy.** All four answers talk about brand
   identity, naming, UX/UI and "no developer needed for content updates" on a
   page that sells automation. The question "What do I need to get started?" is
   answered with "Yes — that's part of our process," which does not even parse as
   an answer. `components/Faq.jsx`.

2. **Terms of Service names another company.** Opens with "By working with Noora
   or using our website" — leftover from the purchased template.
   `app/terms-of-service-policy/page.jsx`.

3. **Privacy policy points users at a third party's email.** Section 6 tells
   users to email `legal@noora.studio` to exercise data rights. This is a real
   GDPR exposure, not just a typo: the stated controller contact is not
   reachable by Faster Admin. Highest-priority fix on this list.
   `app/privacy-policy-policy/page.jsx`.

4. **Privacy policy misdescribes the actual tracking.** It names Google
   Analytics/Plausible and Framer, but the site actually runs GTM, GA4 and a
   Meta Pixel. Meta Pixel is advertising tracking and is not disclosed at all,
   while the policy says "We don't use your data to... retarget."

5. **"Relieve 1 single pain" section body is template copy.** Reads "we deliver
   branding, design, and web development that aligns with your goals" — wrong
   service line. `app/page.jsx`.

6. **No cookie consent banner of your own.** The only banner on the live site
   comes from the Calendly embed. Given the Meta Pixel and GA4 fire on load,
   an EU business running ad tracking needs its own consent gate.

## Things that changed by necessity

- **Contact form has no backend.** Framer hosted the handler. Set
  `NEXT_PUBLIC_FORM_ENDPOINT` before launch.
- **Route-change tracking added.** The Framer SPA only fired a pageview on hard
  load. This was the analytics limitation that motivated the rebuild, so it is
  fixed rather than reproduced.
- **Animations not reproduced.** Framer's scroll-reveal and word-by-word text
  animations were dropped. Content and layout match; motion does not.
- **Footer year is dynamic** rather than hardcoded to 2026.

## Bugs found and fixed after the first pass (2026-08-05, later)

1. **Horizontal overflow on mobile.** The before/after diagrams are 2109px
   wide. Grid and flex children default to `min-width: auto`, so they refused
   to shrink and pushed the whole page into horizontal scroll on phones. Fixed
   in `globals.css` with a global `max-width: 100%` on media plus `min-width: 0`
   on section and container children. Verified: body width now equals viewport
   width at 375px on every page.

2. **Six wrong images.** The first pass assigned images by download order. The
   hero showed a background photo, Sarah's headshot rendered as a diagram, and
   the Cupcake logo was swapped with the before/after artwork. Re-derived by
   querying each image's real position and neighbouring text on the live page.
   The current mapping is measured, not guessed.

3. **Missing favicon.** `layout.jsx` referenced `/favicon.png`, which did not
   exist, producing a 404 on every page. Added.

4. **Duplicate Meta Pixel init.** The browser reports "Duplicate Pixel ID". The
   snippet now guards against initialising twice, but the likely second source
   is the GTM container firing the same pixel as a tag. **Check the GTM
   container** — if the pixel is configured in both places, every PageView and
   Lead is counted twice. Not something the code can fix on its own.

## Gotcha that looks like a bug but isn't

Running `npm run build` while `npm run dev` is up clobbers the shared `.next/`
directory. The dev page then 404s `main-app.js` and `layout.css`, React never
hydrates, and the site renders as unstyled serif HTML with a dead menu. This
cost real debugging time once already. Stop dev, then restart it. Do not try to
fix it with `distDir` — that relocates the static export out of `out/` and
quietly breaks deploys.

## Verification done

- All 8 routes build and return the right status (404 route returns 404).
- Every referenced image resolves to a local file; nothing still points at
  Framer's CDN.
- Every image was matched to its position on the live page rather than assigned
  by guess, after an initial pass got several wrong.
- Calendly embed, both YouTube embeds and the FAQ accordion confirmed working
  in-browser.

- Mobile (375px) verified against the **production export**, not just the dev
  server: no horizontal overflow on any page, the nav menu toggles open and
  shut, and the FAQ accordion expands. React hydration confirmed working in the
  built artifact.

Not verified: cross-browser rendering beyond Chromium, and real form submission
(no endpoint configured yet, so only the mailto fallback path has been exercised).

## Next up, in the order agreed with Joey

Baseline first, then the rest.

1. **Booking:** replace the Calendly embed with a Google Calendar Appointment
   Schedule routed to Joey's own calendar. Needs the booking page URL from
   Google Calendar; the swap itself is one component,
   `components/MeetingSection.jsx`.
2. **Voice + WhatsApp assistant page:** one general page replacing the four
   voice-assistant URLs. Design to be a combination of
   `/voice-assistant-sc-gentle-clinics` (minus the Gentle Clinics
   personalisation — logo, appointment times, client-specific detail) and
   `/voice-assistant-beautyv1`.
3. **Dutch + English across the whole site.** Wanted eventually, deliberately
   deferred so the baseline lands first. Worth planning the routing (`/nl`,
   `/en`) before writing content, since retrofitting i18n is more expensive
   than building for it.
