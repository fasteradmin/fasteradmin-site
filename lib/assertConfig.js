import { FORM_ENDPOINT, AVAILABILITY_ENDPOINT, BOOKING_ENDPOINT, TURNSTILE_SITE_KEY } from "@/lib/config";

/**
 * Fail the build rather than ship a site that looks fine and does nothing.
 *
 * NEXT_PUBLIC_ values are inlined at build time. When they are missing the
 * site still builds, still deploys and still renders perfectly — but the
 * booking widget shows "couldn't load the calendar" and the contact form
 * silently falls back to mailto. That shipped once already and was only
 * caught by diffing the deployed bundle by hand.
 *
 * Note these can be overridden by real environment variables, which take
 * precedence over .env files. An empty-but-defined variable in a hosting
 * dashboard will beat .env.production and inline as "" — hence checking the
 * resolved value here, not merely that a file exists.
 *
 * Pulled out of app/(en)/layout.jsx when the Dutch homepage got its own root
 * layout (app/(nl)/layout.jsx): the booking widget it guards now also renders
 * on the Dutch side, at "/" rather than "/eng". A check that only lived in
 * one of the two root layouts would silently stop covering whichever page
 * used the other one — exactly the failure mode this exists to catch, just
 * moved one level up. Call it from every root layout module, not from one.
 */
export function assertConfig() {
  if (process.env.NODE_ENV !== "production") return;

  // Checks the RESOLVED config, not raw env. lib/config.js falls back to
  // literals, so this should now be unreachable — it stays as a backstop in
  // case an override sets one of these to an empty string, which would
  // otherwise sail through and ship a dead form again.
  const missing = Object.entries({
    FORM_ENDPOINT,
    AVAILABILITY_ENDPOINT,
    BOOKING_ENDPOINT,
    TURNSTILE_SITE_KEY,
  })
    .filter(([, v]) => !v || !String(v).trim())
    .map(([k]) => k);

  if (missing.length) {
    throw new Error(
      `Production build aborted. Config resolved empty:\n` +
        missing.map((m) => `  - ${m}`).join("\n") +
        `\n\nlib/config.js provides literal fallbacks, so an empty value here ` +
        `means an environment variable is explicitly overriding it with "". ` +
        `Check the hosting provider's environment variables.`,
    );
  }
}
