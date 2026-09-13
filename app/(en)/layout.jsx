import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Analytics, { GtmNoScript } from "@/components/Analytics";
import { assertConfig } from "@/lib/assertConfig";
import { SITE_URL, SITE_NAME, OG_IMAGE, siteSchema } from "@/lib/seo";

// See lib/assertConfig.js: fails the production build if a NEXT_PUBLIC_ value
// resolved empty, rather than shipping a site that renders fine and does
// nothing. Called from both root layouts now that the booking widget this
// guards renders on both the English and Dutch homepages.
assertConfig();

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
//
// This is now the ENGLISH root layout: it covers /eng plus every page that
// has not had its Dutch pass yet (about, contact, works, learn, the two
// legal pages, 404). Its fallback og:url points at /eng rather than "/",
// because "/" is the Dutch homepage now — see the (nl) route group.
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
    url: `${SITE_URL}/eng`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  // Cropped from the wordmark's chevron. The whole 919x189 wordmark was being
  // served as the favicon, which a browser squashes into a 16px square and
  // renders as an unreadable squiggle. .ico is included because browsers
  // request /favicon.ico at the root regardless of what the tags say.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema("en")) }}
        />
      </head>
      <body>
        <GtmNoScript />
        <Nav locale="en" />
        <main>{children}</main>
        <Footer locale="en" />
        <Analytics />
      </body>
    </html>
  );
}
