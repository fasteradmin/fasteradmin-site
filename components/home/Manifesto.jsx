import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import InfoCard from "@/components/home/InfoCard";

/**
 * The opening argument, restyled (2026-09) from one long plain-prose column
 * into four visually distinct beats: a 3-card problem grid, a pull-quote
 * band, a two-column system pitch with expandable detail cards, and a dark
 * "not for everyone" band. Originally built Dutch-only against the
 * art-directed artifact; English copy added afterward, translated back
 * into the site's existing English voice (the Ops Call terminology already
 * used in OfferLadder/Hero) rather than reusing the old ProblemEn.jsx
 * framing, which this replaces on the English homepage too.
 */
const COPY = {
  en: {
    problemEyebrow: "The problem",
    problemCards: [
      {
        heading: "Why does everything get harder as you grow?",
        body: "You've built a good business. Steady clients, enough work, margins that work. And yet: the bigger you get, the more falls through the cracks. A request gets retyped three times.",
      },
      {
        heading: "Already hired people, and it's still a mess?",
        body: "You hired someone for admin, and they're just as buried in it as you were. You bought a tool that was supposed to fix it, and it's sitting there unused.",
      },
      {
        heading: "Keep up or get left behind.",
        body: "Companies like yours go one of two ways. You grow with what's now possible, or you get overtaken by the competitor who did.",
      },
    ],
    stepsButton: "Here's how to fix it",
    quoteKicker: "The manifesto",
    quote: "More people won't fix this.",
    quoteBody: "The instinct is: when it gets busy, hire someone, or work harder yourself. That's exactly what keeps you small. More hands on a process that depends on hands doesn't make it stronger, just more expensive. More of the same doesn't fix this. A different approach does.",
    meetingCta: "Book The Ops Call",
    systemHeading: "You don't need more people. You need a system.",
    systemBody: [
      "You can be the best tradesperson in the region and still stand still. You can have the best people on staff and still stand still. You can own every tool there is and still stand still.",
      "Because almost everything that runs stiff right now comes down to one thing: the work depends on people doing it from memory or by hand. It's not a shortage of tools, you probably have too many. It's the absence of a system that does the work itself, reliably, even when it's busy.",
      "And no, you don't have to do anything technical yourself. That's our job.",
    ],
    infoCards: [
      {
        heading: "Why now?",
        short: "AI adoption among Dutch SMEs roughly doubled this past year to around 70%. But the difference isn't between companies that use AI and companies that don't. It's between companies that build it seriously into their process…",
        full: "AI adoption among Dutch SMEs roughly doubled this past year to around 70%. But the difference isn't between companies that use AI and companies that don't. It's between companies that build it seriously into their process, and companies just playing around with it. The first group is pulling away over the next few years.",
      },
      {
        heading: "What you get",
        short: "Doing the same thing faster is only a delay. You can take on more work without hiring, you're no longer the bottleneck for every question…",
        full: "Doing the same thing faster is only a delay. You can take on more work without hiring, you're no longer the bottleneck for every question, and your evenings are yours again. And you stop having to wonder whether you missed something, because the system catches the error before the customer does.",
      },
    ],
    notForEveryoneHeading: "This isn't for everyone.",
    notForEveryoneSub: "Do you want everything to stay the same?",
    notForEveryoneBody: [
      "Then this isn't for you, and that's fine. But the way you got this far, manually, in your head, in a spreadsheet, isn't the way you grow from here. That way is what's keeping your business small now.",
      "Growth stalls, quality suffers, and you're the one who's still fixing in the evening what didn't get done during the day.",
    ],
  },
  nl: {
    problemEyebrow: "Het probleem",
    problemCards: [
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
    ],
    stepsButton: "Zo los je dit op",
    quoteKicker: "Het manifest",
    quote: "“Meer mensen aannemen lost dit niet op.”",
    quoteBody: "De gedachte is: als het te druk wordt, neem ik iemand aan, of ik werk zelf wat harder. Dat is precies wat je klein houdt. Meer handen op een proces dat aan handen hangt maakt het niet sterker, alleen duurder. Meer van hetzelfde lost het niet op. Een andere aanpak wel.",
    meetingCta: "Plan 20 minuten met ons",
    systemHeading: "Je hebt niet meer mensen nodig. Je hebt een systeem nodig.",
    systemBody: [
      "Je kunt de beste vakman van de regio zijn en toch stilstaan. Je kunt de beste mensen in dienst hebben en toch stilstaan. Je kunt elke tool hebben die er is en toch stilstaan.",
      "Bijna alles wat nu stroef loopt, komt op één ding neer: het werk hangt aan mensen die het uit hun hoofd of met de hand doen. Het ligt niet aan te weinig tools, je hebt er waarschijnlijk te veel. Het ligt eraan dat er geen systeem is dat het werk zelf doet, ook als het druk is.",
      "Je hoeft er zelf niets technisch voor te doen. Dat is ons werk.",
    ],
    infoCards: [
      {
        heading: "Waarom nu automatiseren?",
        short: "Het AI-gebruik in het Nederlandse mkb verdubbelde het afgelopen jaar naar ongeveer 70%. Maar het verschil zit niet tussen bedrijven die AI gebruiken en bedrijven die dat niet doen. Het zit tussen bedrijven die het serieus in hun proces bouwen…",
        full: "Het AI-gebruik in het Nederlandse mkb verdubbelde het afgelopen jaar naar ongeveer 70%. Maar het verschil zit niet tussen bedrijven die AI gebruiken en bedrijven die dat niet doen. Het zit tussen bedrijven die het serieus in hun proces bouwen, en bedrijven die er wat mee spelen. De eerste groep trekt de komende jaren weg.",
      },
      {
        heading: "Wat het je oplevert",
        short: "Sneller hetzelfde doen is alleen uitstel. Je kunt meer werk aan zonder iemand aan te nemen, je bent niet meer degene waar elke vraag…",
        full: "Sneller hetzelfde doen is alleen uitstel. Je kunt meer werk aan zonder iemand aan te nemen, je bent niet meer degene waar elke vraag langskomt, en je avonden zijn weer van jou. En je hoeft je niet meer af te vragen of je iets gemist hebt, het systeem vangt de fout voordat de klant 'm ziet.",
      },
    ],
    notForEveryoneHeading: "Dit is niet voor iedereen.",
    notForEveryoneSub: "Wil je dat alles blijft zoals het is?",
    notForEveryoneBody: [
      "Dan is dit niets voor jou, en dat is prima. Maar de manier van handmatig, in je hoofd, in een spreadsheet, is verouderd. Die manier houdt je bedrijf nu klein.",
      "De groei stokt, de kwaliteit lijdt, je bent degene waar iedereen naartoe komt voor vragen en jij blijft degene die ’s avonds nog rechtzet wat overdag is blijven liggen.",
    ],
  },
};

export default function Manifesto({ locale = "en" }) {
  const t = COPY[locale];
  const meetingHref = locale === "nl" ? "/#section-meeting" : "/eng/#section-meeting";

  return (
    <>
      {/* 01 — problem */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-site">
          <Reveal as="p" className="eyebrow text-grey-600">
            {t.problemEyebrow}
          </Reveal>
          <div className="mt-10 grid gap-11 md:grid-cols-3">
            {t.problemCards.map((c, i) => (
              <Reveal key={c.heading} style={{ transitionDelay: `${i * 80}ms` }}>
                <h4 className="text-[17.5px] font-medium leading-snug tracking-[-0.01em] text-navy">
                  {c.heading}
                </h4>
                <p className="mt-3 text-[14.5px] leading-relaxed text-grey-600">{c.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Button href="#section-steps">{t.stepsButton}</Button>
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
            <p className="eyebrow text-white/60">{t.quoteKicker}</p>
            <blockquote className="mt-4 max-w-3xl text-[28px] font-medium italic leading-tight tracking-[-0.02em] text-white sm:text-[40px]">
              {locale === "en" ? `“${t.quote}”` : t.quote}
            </blockquote>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">{t.quoteBody}</p>
            <div className="mt-8">
              <Button href={meetingHref} variant="white">
                {t.meetingCta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — systeem, geen mensen */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className="container-site grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <h3 className="h-section text-navy">{t.systemHeading}</h3>
            <div className="body-base mt-5 space-y-4 text-grey-600">
              {t.systemBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button href={meetingHref}>{t.meetingCta}</Button>
            </div>
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            {t.infoCards.map((card) => (
              <InfoCard key={card.heading} heading={card.heading} short={card.short} full={card.full} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* 04 — niet voor iedereen */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="h-section text-white">{t.notForEveryoneHeading}</h3>
            <p className="mt-3 text-lg text-white/70">{t.notForEveryoneSub}</p>
          </Reveal>
          <Reveal className="space-y-4 text-[15px] leading-relaxed text-white/80">
            {t.notForEveryoneBody.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
