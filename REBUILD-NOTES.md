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

## n8n backend (2026-08-05)

Instance: `https://jcmt.app.n8n.cloud`. The REST API is reachable with
`N8N_API_KEY` from `~/.zshenv`. The key can **create and read** workflows but
returns 403 on `/activate`, and `/projects` and `/folders` are unavailable — so
new workflows land unfiled and inactive, and must be moved into
`Personal/FasterAdmin` and published by hand.

| Workflow | id | Purpose |
|---|---|---|
| FasterAdmin \| Website Contact Form | `l9ZH89g9ngG1wXca` | Contact form → Outlook email to joey@getfasteradmin.com. **Live and verified.** |
| FasterAdmin \| Booking \| Get Availability | `ctywAWP6xmqvctAb` | `POST /webhook/fasteradmin-availability` → bookable slots |
| FasterAdmin \| Booking \| Create Booking | `bM8c48E0XUCKOnYM` | `POST /webhook/fasteradmin-book` → creates the calendar event |

Both booking workflows call Google's `freeBusy` and `events` REST endpoints via
HTTP Request nodes using the predefined `googleCalendarOAuth2Api` credential
(`ALMuHEPOMNHH6hve`), rather than the Google Calendar node. That was deliberate:
it gives exact control over the request and response shape instead of depending
on the node's output-format option.

Booking config (timezone, working hours, slot length, notice period, horizon)
lives in the first Code node of each workflow. Currently: Europe/Amsterdam,
Mon–Fri, 09:00–17:00, 30-minute slots, 4 hours' minimum notice, 14-day horizon.
Slots are built per-day in the local zone so DST transitions stay correct.

`Create Booking` re-checks `freeBusy` for the exact slot immediately before
creating the event and returns HTTP 409 if it was taken in the meantime, so two
visitors picking the same slot seconds apart cannot both book it. The visitor is
added as an attendee with `sendUpdates=all`, so Google sends the invite.

**If `Create Event` returns 403**, the OAuth credential lacks calendar write
scope and needs reconnecting — read-only is enough for availability but not for
booking.

### How the connections actually work

Three separate hops, with different trust levels:

1. **Claude → n8n management API.** `N8N_API_KEY` from `~/.zshenv`, sent as an
   `X-N8N-API-KEY` header. Used only to create and update workflows. The key is
   never written into any file in either repo.
2. **n8n → Google / Microsoft.** Joey's own stored n8n credentials, referenced in
   the workflow JSON **by id and name only** (`ALMuHEPOMNHH6hve` for Google
   Calendar, `xLVIvHjRCSmV7vbR` for Outlook). No OAuth tokens ever appear in the
   workflow definition; n8n injects them at runtime.
3. **Website → n8n webhooks.** **No authentication at all.** This is the weak
   link, see below.

### ⚠️ The webhooks are public and unauthenticated

`allowedOrigins` on the webhook node sets CORS headers, which only constrains
**browsers**. It is not an access control: any `curl` from anywhere can POST to
these URLs, and in fact every test above was done exactly that way. So today:

- anyone who learns `/webhook/fasteradmin-contact` can send mail to Joey's inbox
- anyone who learns `/webhook/fasteradmin-book` can **create events in Joey's
  calendar**, and Google will email an invite to whatever address they supply

The booking one is the one that matters. Before the booking UI goes live it
needs at least one of:

- a shared secret header the site sends and the workflow checks (simplest, but
  the value is visible in the client bundle, so it only stops drive-by abuse)
- a honeypot field plus a minimum time-on-page check (stops most bots)
- rate limiting per IP
- a proper CAPTCHA / Turnstile check verified inside the workflow (strongest)

For a static site with no backend, Turnstile verified server-side in n8n is the
only option that genuinely resists a determined abuser. Everything else raises
the cost without closing the hole.

### Turnstile

Verification runs inside the **contact form** and **create booking** workflows —
not in the availability workflow, which is a read endpoint that the booking UI
calls on page load (Turnstile tokens are single-use, so spending one there would
leave none for the booking itself).

The siteverify call is a real **HTTP Request node**, not code. Doing it inside a
Code node with `this.helpers.httpRequest` / `URLSearchParams` throws in the n8n
sandbox, and because the throw happens before Respond to Webhook, the caller
gets a misleading empty HTTP 200 instead of a rejection. It failed closed on the
calendar write, but reported success. Verified after the fix: a forged token now
returns 403 on both endpoints, and a genuine browser submission still succeeds.

`Check Verification` fails closed — if Cloudflare is unreachable the request is
rejected, because these paths send mail and write to a real calendar.

**On the secret's confidentiality:** pasting it by hand into the node keeps it
out of git and out of the chat transcript, but it does *not* hide it from anyone
holding `N8N_API_KEY`, who can read the workflow JSON. That key already grants
full workflow read/write, so it is strictly more powerful than the Turnstile
secret. If the secret should genuinely be unreadable, it has to live in an n8n
**credential** (whose values the API does not return), not in node code.

### Error handling

All three workflows originally had the same defect: a thrown error in a Code
node aborts the run **before** Respond to Webhook, so n8n answers HTTP 200 with
an empty body. The site checked `res.ok` and would have told visitors their
message was sent or their call was booked when nothing had happened.

Fixed by never throwing on the request path: validation returns a flag, external
calls are set to `onError: continueRegularOutput`, and every branch terminates in
a Respond node. Verified: bad input now returns 400 with a readable message,
a taken slot 409, and calendar failures 502.

Note `responseCode` belongs under `options` on the Respond node, not top level —
set at the top level it is silently ignored and you still get 200.

### Why the existing workflows were not reused directly

- `Create Reservation` writes to **Airtable**, not Google Calendar. Only
  `Check Availability` touches the calendar, so the GHL pair cannot book calls.
- `Google Calendar - Availability Lookup` and `Google Calendar - Schedule Call`
  target the right calendar with lead-shaped inputs, but are **scaffolds**: the
  availability node has no `timeMin`/`timeMax` mapping and the schedule node has
  no `start`/`end` at all, with empty attendee and description expressions. They
  declare inputs that are never wired into the calendar nodes.
- `Get Google Calendar Availability` is the only one with a webhook, and it
  points at the **Salonized - fasteradmin** calendar, not Joey's.

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
