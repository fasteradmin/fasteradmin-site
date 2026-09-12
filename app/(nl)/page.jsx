import Image from "next/image";
import Button from "@/components/Button";
import Faq from "@/components/Faq";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";
import { headingSlug } from "@/lib/posts";

/**
 * Dutch homepage. Copy is verbatim from
 * outputs/2026-09-12-fasteradmin-website-dutch-copy.md, mapped section by
 * section onto app/(en)/eng/page.jsx (the preserved English original) in the
 * same order the doc uses. Structure, classes and components are otherwise
 * unchanged from that file — see the PR description for the two deviations
 * from a pure copy swap: the hero drops its image (per the doc's own note,
 * "De bon-afbeelding is van de hero verwijderd"), and Pricing gets a third
 * item the English version doesn't have.
 */
export const metadata = pageMetadata({
  path: "/",
  title: "FasterAdmin.com | Het werk gedaan. Zonder er iemand voor aan te nemen.",
  description:
    "We zetten AI in waar iemand iets moet lezen en beslissen, en betrouwbare code voor de rest. Zodat het blijft werken na oplevering.",
  locale: "nl_NL",
  languages: { nl: "/", en: "/eng", "x-default": "/" },
});

const mechanismSteps = [
  {
    n: "01",
    title: "Breng in kaart waar het werk echt heen gaat",
    body: "Niet waar je denkt dat het heen gaat. We lopen aanvragen, overdrachten en goedkeuringen door tot we precies zien waar tijd en nauwkeurigheid verloren gaan.",
  },
  {
    n: "02",
    title: "Ontwerp het systeem vóór je iets nieuws koopt",
    body: "Wat er stuk is, is meestal geen ontbrekende tool. Het zijn twee tools die zijn gekocht om met elkaar te praten en die nooit echt zijn verbonden.",
  },
  {
    n: "03",
    title: "Bouw en verbind wat je al gebruikt",
    body: "Geen nieuwe software om te leren en geen datamigratie. We bouwen in de tools die je al open hebt staan.",
  },
  {
    n: "04",
    title: "Test op echte gevallen, niet op een demo",
    body: "Inclusief de randgevallen die normaal pas na drie maanden opduiken, als er al iets is misgegaan bij een echte klant.",
  },
  {
    n: "05",
    title: "Live op een datum die vastligt, en daarna blijven we",
    body: "Twee tot vier weken nazorg na oplevering, zodat het systeem over een half jaar niet het ding is waar niemand meer eigenaar van is.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      {/* No receipt image on this side — dropped per the copy doc's own
          note. The English hero's two-column grid existed to hold that
          image; without it, this reuses the text-only hero pattern already
          used on /about rather than leaving an empty second column. */}
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <p className="eyebrow text-grey-600">Betrouwbare AI voor de chaos in je backoffice</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">
            Het werk gedaan. Zonder er iemand voor aan te nemen.
          </h1>

          <p className="body-base mt-8 max-w-md text-grey-600">
            We zetten AI in waar iemand iets moet lezen en beslissen, en betrouwbare code voor
            de rest. Zodat het blijft werken na oplevering.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/#section-meeting">Plan 20 minuten met ons</Button>
            <Button href="/#section-proof" variant="outline">
              Zie een systeem dat ving wat een mens over het hoofd zag
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Problem */}
      <section className="bg-surface-alt py-24 lg:py-32">
        <div className="container-site">
          <h2 id="niet-short-op-tools" className="h-section max-w-3xl text-navy">
            Je hebt geen gebrek aan tools. Je hebt gebrek aan mensen.
          </h2>

          <div className="body-base mt-8 max-w-2xl space-y-5 text-grey-600">
            <p>
              Vraag eigenaren van vergelijkbare bedrijven hoe de backoffice draait, en het
              antwoord is bijna altijd een variant op &quot;het is een puinhoop.&quot; Vier op
              de vijf bedrijven die we spraken begonnen met precies dat woord.
            </p>
            <p>
              Er komt een aanvraag binnen via e-mail of WhatsApp. Iemand leest &apos;m en typt
              dezelfde gegevens met de hand over in drie verschillende programma&apos;s. Ergens
              in die stapel zit waarschijnlijk een tool die je al betaalt om precies dit op te
              lossen, alleen staat die nergens mee verbonden. De weekplanning staat in een
              spreadsheet, of zit in het hoofd van één iemand, en wordt alleen bijgewerkt als
              diegene eraan denkt.
            </p>
            <p className="text-navy">
              Dit los je niet op door iemand aan te nemen. De meeste Nederlandse bedrijven van
              jouw omvang krijgen die rol niet ingevuld, en daarom staat automatisering boven
              aan de lijst in plaats van onderaan.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Mechanism */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-grey-600">Vijf stappen, altijd in deze volgorde</p>

            <p className="body-base mt-6 text-grey-600">
              Dit is geen AI-bureau dat je een pitch komt geven. Het AI-gebruik onder het
              Nederlandse mkb verdubbelde het afgelopen jaar naar ongeveer 70%, maar meer dan de
              helft daarvan is iemand die tekst schrijft of een plaatje genereert. Hier gaat AI
              precies daar waar een mens anders iets zou moeten lezen en beslissen. De rest
              draait als gewone, testbare code.
            </p>
          </div>

          <div className="space-y-10 lg:mt-0">
            {mechanismSteps.map((s) => (
              <div key={s.n} className="flex gap-6 sm:gap-8">
                <span className="text-4xl font-bold tracking-[-0.05em] text-brand">{s.n}</span>
                <div className="min-w-0">
                  <h3 id={headingSlug(s.title)} className="text-xl font-medium tracking-[-0.03em] text-navy">{s.title}</h3>
                  <p className="body-base mt-3 text-grey-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Proof (Cupcake leads) */}
      <section className="bg-surface-alt">
        <div className="container-site py-24 lg:py-28">
          <p className="eyebrow text-ink-muted">Bewijs, geen beloftes</p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-navy">
            8+ uur bespaard per week. 3 weken bouwtijd.
          </p>

          {/* Translated from the customer's original English quote, not
              verbatim what he said — flagged in the copy doc and in the PR
              for a native check before this goes live. */}
          <blockquote className="mt-4 max-w-3xl text-2xl font-medium italic leading-tight tracking-[-0.03em] text-navy md:text-[34px]">
            &ldquo;Ik ging niet alleen van 2-3+ uur naar minder dan 1 uur administratie per dag
            (mails beantwoorden, offertes versturen, enzovoort). Belangrijker nog: ik heb niet
            meer de zorg van &apos;heb ik iets gemist of heb ik het goed gedaan?&apos;&rdquo;
          </blockquote>

          <div className="mt-12 flex items-center gap-4">
            <Image
              src="/img/QfOGeqDA89lvkdBlJgLaqQuQY.jpeg"
              alt="Alexander Cordova"
              width={64}
              height={64}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div>
              <p className="text-base font-medium text-navy">Alexander Cordova</p>
              <p className="text-xs font-semibold text-ink-muted">Marketing Specialist, Cupcake STHLM</p>
            </div>
          </div>

          <Button href="/works/email-to-quote-system" className="mt-12">
            Ontdek hoe hij dat deed
          </Button>
        </div>
      </section>

      {/* ------------------------------------------- Proof (MeetPartner, second) */}
      <section id="section-proof" className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-ink-muted">Niet alleen sneller</p>

          <h2 id="factuur-intern-perfect-en-toch-verkeerd" className="h-section mt-4 max-w-2xl text-navy">
            Een factuur kan intern perfect kloppen en toch verkeerd zijn
          </h2>

          <div className="body-base mt-8 max-w-2xl space-y-5 text-ink-muted">
            <p>
              Freelancers in de meetteams van MeetPartner sturen hun eigen weekfactuur in. Eén
              daarvan klopte op zichzelf perfect: de rekensom klopte, de regels telden op, en
              het opgegeven totaal kwam exact overeen met zijn eigen cijfers. Elke controle die
              alleen naar de papieren kijkt, zou hem goedkeuren.
            </p>
            <p>
              Eén ding was het er niet mee eens: de onafhankelijke urenregistratie van
              MeetPartner zelf, die de factuur nergens raakt. Dat vang je alleen door te toetsen
              aan een derde bron, niet aan zichzelf.
            </p>
            <p className="text-navy">
              Dit loopt als een doorlopende, betaalde opdracht, niet als een eenmalige bouw.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Offer ladder */}
      <section className="bg-surface-alt py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Zo beginnen we samen</p>
          <h2 id="vier-stappen-geen-lang-contract" className="h-section mt-4 max-w-2xl text-navy">
            Vier stappen, geen lang contract vooraf
          </h2>

          <ol className="mt-12 max-w-2xl space-y-10">
            <li>
              <p className="text-lg font-medium text-navy">1. Het startgesprek</p>
              <p className="body-base mt-2 text-grey-600">
                20 tot 30 minuten. Jij vertelt ons hoe het werk nu loopt en waar het vastloopt.
                Past het niet, dan weet je dat aan het eind van het gesprek.
              </p>
            </li>
            <li>
              <p className="text-lg font-medium text-navy">2. De betaalde scope</p>
              <p className="body-base mt-2 text-grey-600">
                Eén werksessie van 60 tot 90 minuten. Je loopt weg met een document dat van jou
                is: waar het werk nu echt langsgaat, wat die uren kosten, een rangschikking van
                wat je als eerste moet aanpakken, wat je níet moet automatiseren, en een vaste
                prijs en opleverdatum voor de eerste bouw. Binnen <strong>5 werkdagen</strong> na
                de sessie.
              </p>
            </li>
            <li>
              <p className="text-lg font-medium text-navy">3. De bouw</p>
              <p className="body-base mt-2 text-grey-600">
                Geoffreerd bij de scope en vastgehouden op die prijs tot oplevering, met de
                opleverdatum zwart-op-wit.
              </p>
              <p className="body-base mt-3 text-grey-600">
                Doet het op die datum niet wat de scope beloofde, dan werken we door tot het dat
                wel doet. Zonder meerkosten, zonder nieuwe scope. Het scopedocument is de
                definitie van &quot;af&quot;: dat begrenst de belofte en houdt het weg van
                eindeloos herwerk.
              </p>
              <p className="body-base mt-3 text-grey-600">
                Nog niet klaar voor de hele bouw? Begin met één proces live voor €2.500. Ga je
                door, dan gaat dat bedrag er volledig vanaf (zie Prijzen).
              </p>
            </li>
            <li>
              <p className="text-lg font-medium text-navy">4. Nazorg</p>
              <p className="body-base mt-2 text-grey-600">
                Twee tot vier weken na oplevering, zodat iemand eigenaar blijft van het systeem
                terwijl het inslijt. Daarna een retainer, als je die wilt.
              </p>
            </li>
          </ol>

          <Button href="/#section-meeting" variant="brand" className="mt-12">
            Plan 20 minuten met ons
          </Button>
        </div>
      </section>

      {/* --------------------------------------------------------- Pricing */}
      {/* Three items on this side, not two: the doc adds a middle rung
          between the scope and the full build. The section was already
          plain inline JSX rather than a fixed-slot component, so this is a
          third <div>, not a structural change. */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Prijzen</p>
          <h2 id="geen-tarievenlijst" className="h-section mt-4 max-w-2xl text-navy">
            Geen tarievenlijst. Je weet vooraf waar je aan toe bent.
          </h2>

          <p className="body-base mt-6 max-w-2xl text-grey-600">
            Een organisatiebreed systeem, met koppelingen naar je CRM of ERP, loopt op naar
            €50.000 en meer. Het meeste van wat je nodig hebt is dat niet.
          </p>

          <div className="mt-10 max-w-2xl space-y-8">
            <div>
              <p className="text-lg font-medium text-navy">De scope — €1.500, vast</p>
              <p className="body-base mt-2 text-grey-600">
                Eén werksessie, een document dat volledig van jou is, binnen 5 werkdagen. Het is
                een aparte aankoop: wat je er daarna mee doet, ook bouwen met iemand anders, is
                aan jou.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-navy">
                Nog niet klaar voor de hele bouw? Begin met één proces — €2.500
              </p>
              <p className="body-base mt-2 text-grey-600">
                We zetten één proces live. Echt live, in ongeveer twee weken. Geen demo. Werkt
                het op de afgesproken datum niet zoals beloofd, dan betaal je niet. En omdat dit
                al echt bouwwerk is, gaat de €2.500 er volledig vanaf als je doorgaat met de
                bouw.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-navy">De bouw — meestal €10.000 tot €20.000, vast</p>
              <p className="body-base mt-2 text-grey-600">
                Vastgezet bij de scope en vastgehouden tot oplevering. Het bedrag hangt af van
                wat de scope vindt, niet van gewerkte uren.
              </p>
            </div>
          </div>

          <p className="body-base mt-10 max-w-2xl text-grey-600">
            Het denkwerk (de scope) houd je los. Het eerste stukje bouwen telt mee zodra je
            doorgaat.
          </p>

          <p className="body-base mt-4 max-w-2xl text-grey-600">
            Geen uurtarief. Een vaste prijs met een garantie eraan beantwoordt een andere vraag
            dan een uurtarief: niet hoeveel uur dit kost, maar wat het kost om het op te lossen.
          </p>
        </div>
      </section>

      <Faq locale="nl" />
      <MeetingSection locale="nl" />
      <ContactSection minimal locale="nl" />
    </>
  );
}
