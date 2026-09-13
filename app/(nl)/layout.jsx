import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Analytics, { GtmNoScript } from "@/components/Analytics";
import SmoothScroll from "@/components/SmoothScroll";
import { assertConfig } from "@/lib/assertConfig";
import { SITE_URL, SITE_NAME, OG_IMAGE, siteSchema } from "@/lib/seo";

/**
 * Dutch root layout. Next.js supports multiple root layouts via route
 * groups — each group with its own <html>/<body> — as the way to run
 * per-locale layouts in a project with `output: "export"`, where middleware
 * and next.config's built-in i18n routing are both unavailable (they need a
 * request-time server). This group and app/(en)/ are siblings; there is no
 * shared top-level app/layout.jsx, and app/not-found.jsx exists solely as
 * the fallback Next requires for that setup (see the comment there).
 *
 * Otherwise kept structurally identical to app/(en)/layout.jsx apart from
 * lang and locale copy — see lib/assertConfig.js for why the config guard is
 * called from both rather than kept in only one.
 */
assertConfig();

const TITLE = "FasterAdmin.com | Het werk gedaan. Zonder er iemand voor aan te nemen.";
const DESCRIPTION =
  "We zetten AI in waar iemand iets moet lezen en beslissen, en betrouwbare code voor de rest. Zodat het blijft werken na oplevering.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "nl_NL",
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
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema("nl")) }}
        />
      </head>
      <body>
        <GtmNoScript />
        <SmoothScroll />
        <Nav locale="nl" />
        <main>{children}</main>
        <Footer locale="nl" />
        <Analytics />
      </body>
    </html>
  );
}
