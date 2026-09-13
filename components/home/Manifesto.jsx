import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import InfoCard from "@/components/home/InfoCard";

/**
 * The opening argument, restyled (2026-09) from one long plain-prose column
 * into four visually distinct beats: a 3-card problem grid, a pull-quote
 * band, a two-column system pitch with expandable detail cards, and a dark
 * "not for everyone" band. Dutch-only, same as the copy it replaced — the
 * English homepage keeps ProblemEn.jsx unchanged.
 */
const PROBLEM_CARDS = [
  {
    heading: "Waarom kost alles meer moeite naarmate je groeit?",
    body: "Je hebt een goed bedrijf opgebouwd. Vaste klanten, genoeg werk, marges die kloppen. En toch: hoe groter je wordt, hoe meer er blijft hangen. Een aanvraag wordt drie keer overgetypt.",
  },
  {
    heading: "Al mensen aangenomen, toch is het een zooitje?",
    body: "Je hebt iemand aangenomen voor de administratie, en die loopt nu net zo hard achter de feiten aan. Je hebt een tool gekocht die het zou oplossen, en die staat erbij.",
  },
  {
    heading: "Meegaan of achterblijven.",
    body: "Bedrijven zoals dat van jou gaan één van twee kanten op. Je groeit mee met wat er nu mogelijk is, of je wordt ingehaald door de concurrent die dat wél deed.",
  },
];

export default function Manifesto() {
  return (
    <>
      {/* 01 — problem */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-site">
          <Reveal as="p" className="eyebrow text-grey-600">
            Het probleem
          </Reveal>
          <div className="mt-10 grid gap-11 md:grid-cols-3">
            {PROBLEM_CARDS.map((c, i) => (
              <Reveal key={c.heading} style={{ transitionDelay: `${i * 80}ms` }}>
                <h4 className="text-[17.5px] font-medium leading-snug tracking-[-0.01em] text-navy">
                  {c.heading}
                </h4>
                <p className="mt-3 text-[14.5px] leading-relaxed text-grey-600">{c.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Button href="#section-steps">Zo los je dit op</Button>
          </Reveal>
        </div>
      </section>

      {/* 02 — manifest quote */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className="container-site">
          <Reveal
            className="rounded-3xl bg-navy px-6 py-14 sm:px-14"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(14,42,68,1) 0%, rgba(22,52,79,1) 55%, rgba(10,111,209,.35) 100%)",
            }}
          >
            <p className="eyebrow text-white/60">Het manifest</p>
            <blockquote className="mt-4 max-w-3xl text-[28px] font-medium italic leading-tight tracking-[-0.02em] text-white sm:text-[40px]">
              &ldquo;Meer mensen aannemen lost dit niet op.&rdquo;
            </blockquote>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
              De gedachte is: als het te druk wordt, neem ik iemand aan, of ik werk zelf wat
              harder. Dat is precies wat je klein houdt. Meer handen op een proces dat aan
              handen hangt maakt het niet sterker, alleen duurder. Meer van hetzelfde lost het
              niet op. Een andere aanpak wel.
            </p>
            <div className="mt-8">
              <Button href="/#section-meeting" variant="white">
                Plan 20 minuten met ons
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — systeem, geen mensen */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className="container-site grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <h3 className="h-section text-navy">
              Je hebt niet meer mensen nodig. Je hebt een systeem nodig.
            </h3>
            <div className="body-base mt-5 space-y-4 text-grey-600">
              <p>
                Je kunt de beste vakman van de regio zijn en toch stilstaan. Je kunt de beste
                mensen in dienst hebben en toch stilstaan. Je kunt elke tool hebben die er is
                en toch stilstaan.
              </p>
              <p>
                Bijna alles wat nu stroef loopt, komt op één ding neer: het werk hangt aan
                mensen die het uit hun hoofd of met de hand doen. Het ligt niet aan te weinig
                tools, je hebt er waarschijnlijk te veel. Het ligt eraan dat er geen systeem
                is dat het werk zelf doet, ook als het druk is.
              </p>
              <p>Je hoeft er zelf niets technisch voor te doen. Dat is ons werk.</p>
            </div>
            <div className="mt-8">
              <Button href="/#section-meeting">Plan 20 minuten met ons</Button>
            </div>
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            <InfoCard
              heading="Waarom nu automatiseren?"
              short="Het AI-gebruik in het Nederlandse mkb verdubbelde het afgelopen jaar naar ongeveer 70%. Maar het verschil zit niet tussen bedrijven die AI gebruiken en bedrijven die dat niet doen. Het zit tussen bedrijven die het serieus in hun proces bouwen…"
              full="Het AI-gebruik in het Nederlandse mkb verdubbelde het afgelopen jaar naar ongeveer 70%. Maar het verschil zit niet tussen bedrijven die AI gebruiken en bedrijven die dat niet doen. Het zit tussen bedrijven die het serieus in hun proces bouwen, en bedrijven die er wat mee spelen. De eerste groep trekt de komende jaren weg."
            />
            <InfoCard
              heading="Wat het je oplevert"
              short="Sneller hetzelfde doen is alleen uitstel. Je kunt meer werk aan zonder iemand aan te nemen, je bent niet meer degene waar elke vraag…"
              full="Sneller hetzelfde doen is alleen uitstel. Je kunt meer werk aan zonder iemand aan te nemen, je bent niet meer degene waar elke vraag langskomt, en je avonden zijn weer van jou. En je hoeft je niet meer af te vragen of je iets gemist hebt, het systeem vangt de fout voordat de klant 'm ziet."
            />
          </Reveal>
        </div>
      </section>

      {/* 04 — niet voor iedereen */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="h-section text-white">Dit is niet voor iedereen.</h3>
            <p className="mt-3 text-lg text-white/70">Wil je dat alles blijft zoals het is?</p>
          </Reveal>
          <Reveal className="space-y-4 text-[15px] leading-relaxed text-white/80">
            <p>
              Dan is dit niets voor jou, en dat is prima. Maar de manier van handmatig, in je
              hoofd, in een spreadsheet, is verouderd. Die manier houdt je bedrijf nu klein.
            </p>
            <p>
              De groei stokt, de kwaliteit lijdt, je bent degene waar iedereen naartoe komt
              voor vragen en jij blijft degene die &rsquo;s avonds nog rechtzet wat overdag is
              blijven liggen.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
