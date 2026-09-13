import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";

/**
 * Dutch /about. Copy replaced 2026-09-13 with a shorter, single essay —
 * given verbatim, no longer the team-bio + "how it starts" layout from the
 * previous pass. The team photo grid and the "Zo begint het" section are
 * gone with it: nothing in the new copy corresponds to them, and inventing
 * a place to keep them would just be old content the new text doesn't ask
 * for. MeetingSection/ContactSection stay, matching every other page.
 */
export const metadata = pageMetadata({
  path: "/about",
  title: "Over FasterAdmin",
  description:
    "FasterAdmin bouwt de systemen waarmee een bedrijf meer werk aankan zonder er mensen bij aan te nemen.",
  locale: "nl_NL",
  languages: { nl: "/about", en: "/eng/about", "x-default": "/about" },
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <Reveal as="h1" className="h-display max-w-3xl text-navy">
            Over FasterAdmin
          </Reveal>

          <Reveal className="body-base mt-8 max-w-2xl space-y-5 text-grey-600">
            <p>
              FasterAdmin bouwt de systemen waarmee een bedrijf meer werk aankan zonder er
              mensen bij aan te nemen.
            </p>
            <p>
              We werken met eigenaren van bedrijven van 20 tot 50 man die hun backoffice
              zijn ontgroeid: het werk loopt nog via spreadsheets, mailboxen en het geheugen
              van één of twee mensen, en de eigenaar is er de flessenhals van geworden. Wij
              bouwen het systeem dat die last van het bureau haalt, in de tools die het
              bedrijf al gebruikt.
            </p>
            <p>
              <span className="font-semibold text-navy">Hoe we werken.</span> Elk traject
              wordt in kaart gebracht, gebouwd en getest door de mensen met wie je direct te
              maken hebt. Niets gaat naar het buitenland, niets wordt uitbesteed aan een
              onderaannemer. Degene die je bedrijf begrijpt, is degene die het bouwt. Daarom
              nemen we ook een beperkt aantal trajecten tegelijk aan.
            </p>
            <p>
              <span className="font-semibold text-navy">Waar we onszelf aan houden.</span> Een
              vaste prijs, afgesproken voordat de bouw begint. Een opleverdatum die
              zwart-op-wit staat. En één norm achter allebei: doet het systeem op die datum
              niet wat is afgesproken, dan werken we door tot het dat wel doet, zonder
              meerkosten.
            </p>
            <p>
              <span className="font-semibold text-navy">Gevestigd in Amsterdam.</span> We
              nemen werk aan waar we voor de uitkomst kunnen instaan, en we zijn eerlijk
              wanneer een bouw niet het antwoord is.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <Button href="/#section-meeting">Plan 20 minuten met ons</Button>
          </Reveal>
        </div>
      </section>

      <MeetingSection locale="nl" />
      <ContactSection minimal locale="nl" />
    </>
  );
}
