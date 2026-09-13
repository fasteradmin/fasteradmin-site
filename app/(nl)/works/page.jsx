import Image from "next/image";
import Link from "next/link";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";
import { headingSlug } from "@/lib/posts";

export const metadata = pageMetadata({
  path: "/works",
  title: "Praktijkvoorbeelden | FasterAdmin.com",
  description:
    "Stop met gokken wat automatisering kan doen. Dit zijn de echte bouwprojecten: de workflow, de tools die we verbonden en de tijd die we uit de week haalden.",
  locale: "nl_NL",
  languages: { nl: "/works", en: "/eng/works", "x-default": "/works" },
});

// Case studies are data, not markup. Adding one is a new entry here plus a
// page under app/(nl)/works/<slug>/.
const cases = [
  {
    slug: "email-to-quote-system",
    tag: "automatisering",
    client: "Cupcake STHLM",
    title: "Hoe we een bakkerij 40+ uur per maand besparen met automatisering van e-mailbestellingen",
    img: "E3t6xiZKtDSALPz4EIJr6AwxM8.png",
    badge: "Fi1knLppTjSuF6gbXIU0LmembU.png",
  },
];

export default function WorksPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <h1 className="h-display text-navy">Praktijkvoorbeelden</h1>
          <p className="body-base mt-8 max-w-2xl text-grey-600">
            Stop met gokken wat automatisering kan doen. Dit zijn de echte bouwprojecten. Klik
            een praktijkvoorbeeld aan voor de workflow, de tools die we verbonden en de tijd
            die we uit de week haalden.
          </p>
        </div>
      </section>

      <section className="bg-surface-alt py-16 lg:py-24">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-2">
            {cases.map((c) => (
              <Link
                key={c.slug}
                href={`/works/${c.slug}`}
                className="group overflow-hidden rounded-[var(--radius-block)] bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={`/img/${c.img}`}
                    alt={c.client}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  <p className="eyebrow flex items-center gap-2 text-brand">
                    <Image src={`/img/${c.badge}`} alt="" width={20} height={20} />
                    {c.tag}
                  </p>
                  <p className="mt-3 text-lg font-medium text-navy">{c.client}</p>
                  <h2 id={headingSlug(c.title)} className="h-card mt-2 text-navy">{c.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MeetingSection locale="nl" />
      <ContactSection minimal locale="nl" />
    </>
  );
}
