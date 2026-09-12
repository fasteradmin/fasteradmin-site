import Button from "@/components/Button";
import { headingSlug } from "@/lib/posts";

/**
 * The long-form opening manifesto. Dutch-only for now — the English side
 * keeps its shorter "You're not short on tools" problem section unchanged
 * (see ProblemEn.jsx) since no English version of this copy exists yet.
 *
 * Deliberately plain: reuses the same eyebrow/h2/body-base classes as every
 * other section on the site, no new bespoke styling. A visual redesign is
 * coming separately as a restyle, not a rebuild — inventing one-off styling
 * here would just be more for that pass to undo. Each block is data (an
 * array), not hand-laid-out JSX, so restructuring or restyling later is an
 * edit to how the array renders, not a rewrite of the content.
 *
 * Source: outputs/2026-09-12-fasteradmin-SITE-COPY-complete.md, "Openingssectie
 * (manifest)". Verbatim — this replaces the old "Je hebt geen gebrek aan
 * tools" section, which the doc says has folded into it.
 */
const BLOCKS = [
  {
    heading: "Waarom kost alles meer moeite naarmate je groeit?",
    body: "Je hebt een goed bedrijf opgebouwd. Vaste klanten, genoeg werk, marges die kloppen. En toch: hoe groter je wordt, hoe meer er blijft hangen. Een aanvraag die drie keer wordt overgetypt. Een offerte die vijf dagen blijft liggen. Een fout die pas bij de klant boven water komt. Je werkt harder dan ooit, en het voelt alsof je stilstaat.",
  },
  {
    heading: "Je hebt het al geprobeerd.",
    body: "Iemand aangenomen voor de administratie, die nu net zo hard achter de feiten aan loopt. Een tool gekocht die het zou oplossen, en die ongebruikt staat. Zelf de avonden erin gestopt. En toch verandert er structureel niets.\n\nOndertussen roept iedereen iets anders over AI. De één bouwt je een chatbot, de ander een \"agent\", de derde een demo die het op dag één doet en daarna nooit meer. Ruis.",
  },
  {
    heading: "Er is geen tussenweg meer.",
    body: "Bedrijven zoals dat van jou gaan één van twee kanten op. Je groeit mee met wat er nu mogelijk is, of je wordt ingehaald door de concurrent die dat wél doet. Dat klinkt hard, maar het is de eerlijke stand van zaken: automatisering en AI gaan niet meer weg. Je kunt ze negeren. Je kunt ze niet tegenhouden.",
  },
  {
    heading: "Dit is niet voor iedereen.",
    body: "Wil je dat alles blijft zoals het is, dan is dit niets voor jou, en dat is prima. Maar de manier van werken waar jij mee groot bent geworden, handmatig, in je hoofd, in een spreadsheet, is niet meer de manier waarmee je verder groeit. Die manier houdt je bedrijf nu klein. De groei stokt, de kwaliteit lijdt, en jij bent degene die 's avonds nog rechtzet wat overdag is blijven liggen.",
  },
  {
    heading: "Meer mensen aannemen lost dit niet op.",
    body: "De gedachte is: als het te druk wordt, neem ik iemand aan, of ik werk zelf wat harder. Dat is precies wat je klein houdt. Meer handen op een proces dat aan handen hangt, maakt het niet sterker, alleen duurder. Je lost dit niet op door meer, je lost het op door anders.",
  },
  {
    heading: "Je hebt niet meer mensen nodig. Je hebt een systeem nodig.",
    body: "Je kunt de beste vakman van de regio zijn en toch stilstaan. Je kunt de beste mensen in dienst hebben en toch stilstaan. Je kunt elke tool hebben die er is en toch stilstaan.\n\nWant bijna alles wat nu stroef loopt, komt op één ding neer: het werk hangt aan mensen die het uit hun hoofd of met de hand doen. Niet aan een gebrek aan tools, je hebt er waarschijnlijk te veel. Aan een gebrek aan een systeem dat het werk zelf doet, betrouwbaar, ook als het druk is.\n\nEn nee, je hoeft er zelf niets technisch voor te doen. Dat is precies ons werk.",
    cta: true,
  },
  {
    heading: "Waarom nu?",
    body: "Het AI-gebruik in het Nederlandse mkb verdubbelde het afgelopen jaar naar ongeveer 70%. Maar het verschil zit niet tussen bedrijven die AI gebruiken en bedrijven die dat niet doen. Het zit tussen bedrijven die het serieus in hun proces bouwen, en bedrijven die er wat mee spelen. De eerste groep trekt de komende jaren weg.",
  },
  {
    heading: "Wat het je oplevert",
    body: "Niet sneller hetzelfde werk, dat is alleen uitstel. Maar meer werk aankunnen zonder aan te nemen. Een eigenaar die niet meer de flessenhals is voor elke vraag. Je avonden terug. En het belangrijkste: geen \"heb ik iets gemist?\" meer, omdat het systeem het vangt voordat de klant het doet.",
    cta: true,
  },
];

export default function Manifesto() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-site max-w-3xl space-y-16">
        {BLOCKS.map((block) => (
          <div key={block.heading}>
            <h2 id={headingSlug(block.heading)} className="h-section text-navy">
              {block.heading}
            </h2>
            <div className="body-base mt-6 space-y-4 text-grey-600">
              {block.body.split("\n\n").map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {block.cta && (
              <Button href="/#section-meeting" className="mt-8">
                Plan 20 minuten met ons
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
