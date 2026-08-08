import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Analytics, { GtmNoScript } from "@/components/Analytics";
import {
  FORM_ENDPOINT,
  AVAILABILITY_ENDPOINT,
  BOOKING_ENDPOINT,
  TURNSTILE_SITE_KEY,
} from "@/lib/config";

// Fail the build rather than ship a site that looks fine and does nothing.
//
// NEXT_PUBLIC_ values are inlined at build time. When they are missing the
// site still builds, still deploys and still renders perfectly — but the
// booking widget shows "couldn't load the calendar" and the contact form
// silently falls back to mailto. That shipped once already and was only
// caught by diffing the deployed bundle by hand.
//
// Note these can be overridden by real environment variables, which take
// precedence over .env files. An empty-but-defined variable in a hosting
// dashboard will beat .env.production and inline as "" — hence checking the
// resolved value here, not merely that a file exists.
if (process.env.NODE_ENV === "production") {
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

export const metadata = {
  metadataBase: new URL("https://fasteradmin.com"),
  title: "FasterAdmin.com | Get the work done, without the hire you can't make",
  description:
    "We put AI where someone has to read something and decide, and reliable code everywhere else, so it keeps running after go-live.",
  openGraph: {
    title: "FasterAdmin.com | Get the work done, without the hire you can't make",
    description:
      "We put AI where someone has to read something and decide, and reliable code everywhere else, so it keeps running after go-live.",
    url: "https://fasteradmin.com",
    siteName: "Faster Admin",
    type: "website",
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GtmNoScript />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
