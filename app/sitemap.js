const BASE = "https://fasteradmin.com";

const routes = [
  "/",
  "/about",
  "/works",
  "/works/email-to-quote-system",
  "/contact",
  "/terms-of-service-policy",
  "/privacy-policy-policy",
];

export const dynamic = "force-static";

export default function sitemap() {
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
