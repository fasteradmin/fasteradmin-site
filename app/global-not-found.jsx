import "./globals.css";
import Button from "@/components/Button";

/**
 * Next's documented convention for a project with multiple root layouts
 * (app/(nl)/ and app/(en)/ below, each with their own <html>/<body>): a
 * top-level app/not-found.jsx that also declares its own <html>/<body> gets
 * DOUBLE-wrapped in this Next version — the exported 404.html ends up with
 * two nested <html> tags, one of them ambient and empty. app/global-not-found
 * plus `experimental.globalNotFound: true` in next.config.mjs is Next's own
 * fix for that, not a workaround invented here. See
 * https://nextjs.org/docs/app/api-reference/file-conventions/layout#multiple-root-layouts
 *
 * Every real 404 on the site is handled by app/(en)/not-found.jsx and
 * app/(nl)/not-found.jsx, which get the site's normal Nav/Footer chrome
 * around them. This file is the bare fallback beneath both, for a URL that
 * matches neither route group at all — kept visually identical to those (no
 * chrome, since this one has no group layout to borrow one from).
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        {/* This file renders raw <html>, so the normal `export const
            metadata` convention other pages use does not apply — set the
            title by hand rather than ship a blank browser tab. */}
        <title>Page not found | FasterAdmin.com</title>
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <section className="bg-white">
          <div className="container-site flex min-h-screen flex-col justify-center py-24">
            <p className="eyebrow text-brand">404</p>
            <h1 className="h-display mt-4 max-w-2xl text-navy">
              This page went and automated itself away.
            </h1>
            <p className="body-base mt-6 max-w-md text-grey-600">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/">Back to home</Button>
              <Button href="/works" variant="outline">
                See the case studies
              </Button>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
