export const dynamic = "force-static";

export default function robots() {
  return {
    // /vragen/ bevat tijdelijke klantpagina's achter een code; die pagina's zijn
    // ook noindex, dit houdt crawlers er al bij de poort weg.
    rules: [{ userAgent: "*", allow: "/", disallow: "/vragen/" }],
    sitemap: "https://fasteradmin.com/sitemap.xml",
  };
}
