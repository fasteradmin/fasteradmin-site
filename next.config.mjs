/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // NOTE: `next build` and `next dev` share .next/. Running a build while the
  // dev server is up clobbers its chunk manifest — the dev page then 404s
  // main-app.js and layout.css, React never hydrates, and the site renders as
  // unstyled HTML with dead menus and accordions. If that happens, it is not a
  // code bug: stop the dev server, then restart it. Don't "fix" it by setting
  // distDir, which relocates the static export out of out/ and breaks deploys.
  trailingSlash: true,
  images: { unoptimized: true },
  // Needed for app/global-not-found.jsx to be picked up. Without it, Next
  // still builds a top-level app/not-found.jsx, but wraps its output inside
  // an ambient default document rather than treating it as the root — the
  // result is two nested <html> tags in the exported 404.html. This flag is
  // Next's own documented fix for exactly the "multiple root layouts" setup
  // this site now uses (app/(nl)/ and app/(en)/), not a workaround of ours.
  experimental: { globalNotFound: true },
};

export default nextConfig;
