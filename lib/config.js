/**
 * Public site configuration.
 *
 * Every value here is already public: Next.js inlines NEXT_PUBLIC_ variables
 * into the browser bundle, so all of this ships to every visitor regardless.
 * Writing the values as literals leaks nothing that View Source doesn't.
 *
 * Why literals rather than env vars alone:
 *
 * Four consecutive deploys produced a site that built, deployed and rendered
 * perfectly while the booking widget and contact form were dead, because the
 * env values resolved empty at build time. Each round trip cost a deploy and
 * a manual bundle diff to detect, because nothing failed — the site just
 * quietly did nothing.
 *
 * Environment variables still win when set, so hosting-level overrides and
 * local .env files keep working. These are the floor, not a ceiling: the
 * site cannot build into a broken state just because configuration didn't
 * reach it.
 *
 * Real secrets are NOT here and must never be. The Turnstile secret key lives
 * only in the n8n "Verify Turnstile" node; the n8n API key only in ~/.zshenv.
 */

const N8N = "https://jcmt.app.n8n.cloud/webhook";

export const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT || `${N8N}/fasteradmin-contact`;

export const AVAILABILITY_ENDPOINT =
  process.env.NEXT_PUBLIC_AVAILABILITY_ENDPOINT || `${N8N}/fasteradmin-availability`;

export const BOOKING_ENDPOINT =
  process.env.NEXT_PUBLIC_BOOKING_ENDPOINT || `${N8N}/fasteradmin-book`;

/** Public half of the Turnstile key pair. */
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAEG7UrQD4GCu6M7E";

/**
 * Legacy shared token checked by the n8n abuse gate. Public by construction —
 * it ships in the bundle, so it only ever deterred drive-by requests against a
 * discovered webhook URL. Turnstile is the real protection. Remove this once
 * the n8n gate stops checking it.
 */
export const FA_TOKEN =
  process.env.NEXT_PUBLIC_FA_TOKEN || "KeB_w7j2FRkIvV5CmTxJMpZl1PEAV3Yw";

export const CONTACT_EMAIL = "joey@getfasteradmin.com";
