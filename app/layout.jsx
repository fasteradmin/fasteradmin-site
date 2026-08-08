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
import { SITE_URL, SITE_NAME, OG_IMAGE, siteSchema } from "@/lib/seo";

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

const TITLE = "FasterAdmin.com | Get the work done, without the hire you can't make";
const DESCRIPTION =
  "We put AI where someone has to read something and decide, and reliable code everywhere else, so it keeps running after go-live.";

// The layout deliberately does NOT set `alternates.canonical`. Next.js would
// inherit that literal value down to every child route, so every page would
// claim the homepage as its canonical — worse than having none at all. Pages
// build their own via pageMetadata() in lib/seo.js.
//
// The openGraph block here is the fallback for any route that somehow ships
// without calling pageMetadata(). Pages that do call it replace this wholesale,
// which is why the helper re-states siteName, locale and images rather than
// leaning on inheritance.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          Organization + WebSite, emitted once per page from the layout so it
          cannot be forgotten on a new route. Kept in <head> rather than <body>
          because some crawlers only parse ld+json found there.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
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
