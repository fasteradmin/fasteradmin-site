import Button from "@/components/Button";
import { pageMetadata } from "@/lib/seo";

// noIndex, and therefore no canonical: a 404 body can be served under any URL,
// so a self-referencing canonical here would invite indexing the very pages
// this page exists to reject.
//
// Not reachable from a link anywhere today — the only route inside app/(nl)/
// is the homepage — but Next needs a not-found.jsx per root layout group
// once notFound() can be called from anywhere in that group, and this one is
// cheap to keep in place before that day rather than add later under
// pressure. Translated as UI copy, same discretion as the nav and footer.
export const metadata = pageMetadata({
  path: "/404",
  title: "Pagina niet gevonden | FasterAdmin.com",
  description: "De pagina die je zoekt bestaat niet of is verplaatst.",
  noIndex: true,
  locale: "nl_NL",
});

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-site flex min-h-[60vh] flex-col justify-center py-24">
        <p className="eyebrow text-brand">404</p>
        <h1 className="h-display mt-4 max-w-2xl text-navy">
          Deze pagina heeft zichzelf geautomatiseerd weg.
        </h1>
        <p className="body-base mt-6 max-w-md text-grey-600">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Terug naar home</Button>
          <Button href="/works" variant="outline">
            Bekijk de cases
          </Button>
        </div>
      </div>
    </section>
  );
}
