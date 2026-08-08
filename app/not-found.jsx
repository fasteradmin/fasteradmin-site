import Button from "@/components/Button";
import { pageMetadata } from "@/lib/seo";

// noIndex, and therefore no canonical: a 404 body can be served under any URL,
// so a self-referencing canonical here would invite indexing the very pages
// this page exists to reject.
export const metadata = pageMetadata({
  path: "/404",
  title: "Page not found | FasterAdmin.com",
  description: "The page you're looking for doesn't exist or has moved.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-site flex min-h-[60vh] flex-col justify-center py-24">
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
  );
}
