import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";

/**
 * Dutch /about. Free, fluent translation (not word-for-word) reviewed and
 * approved in outputs/2026-09-13-fasteradmin-about-page-dutch.md — see that
 * file for the register notes and the two open questions it flagged:
 *
 *  - "Plan 20 minuten met ons" is reused on every button here for consistency
 *    with the rest of the site, even where the English copy uses a shorter
 *    label on the first button.
 *  - "Praktijkvoorbeelden" (our work page) still links to the English /works
 *    page — there is no Dutch /works yet.
 */
export const metadata = pageMetadata({
  path: "/about",
  title: "Over ons | FasterAdmin.com",
  description:
    "FasterAdmin bouwt de operationele systemen waarmee een bedrijf van 20 tot 50 medewerkers meer werk aankan zonder ervoor aan te nemen.",
  locale: "nl_NL",
  languages: { nl: "/about", en: "/eng/about", "x-default": "/about" },
});

const team = [
  { name: "Joey Tan", role: "Oprichter", img: "cikrWotQJls4kqizrkcGapqI25k.png" },
  { name: "Sarah de Bree", role: "Automations Engineer", img: "Tkeu4Z25LmXvGufjWDp2YIp6PuY.png" },
  { name: "Dennis van der Molen", role: "Automations Engineer", img: "wBiVNcycdYsmtEfv9F6zAl06eF4.png" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <p className="eyebrow text-grey-600">Wie dit bouwt</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">
            FasterAdmin bouwt de operationele systemen waarmee een bedrijf van 20 tot 50
            medewerkers meer werk aankan zonder ervoor aan te nemen.
          </h1>

          <div className="body-base mt-10 max-w-2xl space-y-5 text-grey-600">
            <p>
              We zijn met z&rsquo;n drieën, in Amsterdam. Geen onderaannemers, geen
              uitbestede bouw. Dezelfde mensen die je scope opstellen, bouwen het, testen
              het en blijven betrokken tijdens de nazorg na oplevering.
            </p>
          </div>

          <Button href="/#section-meeting" className="mt-10">
            Plan 20 minuten met ons
          </Button>
        </div>

        <Image
          src="/img/S8xogGWl7nZ0sT4esjnF1QeUkWg.png"
          alt="Het team van FasterAdmin aan het werk"
          width={1200}
          height={673}
          className="h-auto w-full"
        />
      </section>

      <section className="bg-surface-alt py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Het team</p>

          <div className="body-base mt-8 max-w-2xl space-y-5 text-grey-600">
            <p>
              Joey Tan, oprichter, deed op grote schaal Meta-advertising voor D2C-merken van
              meerdere miljoenen euro&rsquo;s, werkte daarna als Marketing Director bij een
              attributieplatform, en bouwt sindsdien zelf de n8n-, Airtable- en
              Supabase-systemen. De meeste automatiseringsbureaus zijn maar de helft van dat
              verhaal: mensen die het bedrijfsprobleem begrijpen en de bouw uitbesteden, of
              bouwers die een specificatie uitvoeren zonder hem ter discussie te stellen.
            </p>
            <p>
              Sarah de Bree en Dennis van der Molen zijn de Automations Engineers die bouwen
              en testen wat er in de scope staat. De mensen die je aan de telefoon krijgt,
              zijn dezelfde mensen die de workflow schrijven.
            </p>
            <p>
              Wat we voor andere bedrijven hebben gebouwd, staat op onze{" "}
              <Link href="/works" className="text-brand hover:underline">
                praktijkvoorbeelden
              </Link>
              -pagina, dat herhalen we hier niet.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.name}>
                <Image
                  src={`/img/${m.img}`}
                  alt={m.name}
                  width={800}
                  height={800}
                  className="h-auto w-full rounded-[var(--radius-card)] object-cover"
                />
                <p className="mt-4 text-lg font-medium text-navy">{m.name}</p>
                <p className="text-sm text-grey-600">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Zo begint het</p>

          <div className="body-base mt-8 max-w-2xl space-y-5 text-grey-600">
            <p>
              Een kort gesprek om te horen hoe het werk nu loopt. Een betaalde scope, één
              werksessie, die in kaart brengt waar tijd en geld nu echt naartoe gaan. Daarna
              een bouw, geoffreerd en met een opleverdatum zwart-op-wit, waar we aan
              vastblijven tot en met de nazorg na oplevering.
            </p>
          </div>

          <Button href="/#section-meeting" variant="brand" className="mt-10">
            Plan 20 minuten met ons
          </Button>
        </div>
      </section>

      <MeetingSection locale="nl" />
      <ContactSection minimal locale="nl" />
    </>
  );
}
