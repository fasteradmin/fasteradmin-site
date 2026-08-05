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
};

export default nextConfig;
