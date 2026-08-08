import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Analytics, { GtmNoScript } from "@/components/Analytics";

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
  const required = {
    NEXT_PUBLIC_FORM_ENDPOINT: process.env.NEXT_PUBLIC_FORM_ENDPOINT,
    NEXT_PUBLIC_AVAILABILITY_ENDPOINT: process.env.NEXT_PUBLIC_AVAILABILITY_ENDPOINT,
    NEXT_PUBLIC_BOOKING_ENDPOINT: process.env.NEXT_PUBLIC_BOOKING_ENDPOINT,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  };

  const missing = Object.entries(required)
    .filter(([, v]) => !v || !String(v).trim())
    .map(([k]) => k);

  if (missing.length) {
    throw new Error(
      `Production build aborted. These variables resolved empty:\n` +
        missing.map((m) => `  - ${m}`).join("\n") +
        `\n\nThey are defined in .env.production, so an empty value here means ` +
        `something is overriding it — most likely an empty or mistyped entry ` +
        `in the hosting provider's dashboard, which takes precedence over ` +
        `.env files. Remove the dashboard entry or give it the correct value.`,
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
