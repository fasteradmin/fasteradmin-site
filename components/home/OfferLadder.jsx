import Button from "@/components/Button";

const COPY = {
  en: {
    eyebrow: "How we start working together",
    heading: "Four steps, no long contract up front",
    steps: [
      {
        title: "1. The Ops Call",
        paras: [
          "20 to 30 minutes. No pitch. You walk us through how work moves today and where it gets stuck.",
        ],
      },
      {
        title: "2. The paid scope",
        paras: [
          <>
            One working session, 60 to 90 minutes. You leave owning a document: where work
            actually flows now, what those hours cost, a ranked list of what to fix first,
            what not to automate, and a fixed price and go-live date for the first build.
            Delivered within <strong>5 working days</strong> of the session.
          </>,
        ],
      },
      {
        title: "3. The build",
        paras: [
          "Quoted at the scope and held at that price through delivery, go-live date in writing.",
          "If it doesn't do what the scope said it would by that date, we keep working until it does. No extra charge, no new scope. The scope document is the definition of done: that's what bounds the promise and keeps it from becoming unlimited rework.",
        ],
      },
      {
        title: "4. Hypercare",
        paras: [
          "Two to four weeks after go-live, so someone still owns the system while it beds in. A retainer after that, if you want one.",
        ],
      },
    ],
    cta: "Book The Ops Call — 20 Minutes, No Pitch",
    ctaHref: "/eng/#section-meeting",
  },
  nl: {
    eyebrow: "Zo beginnen we samen",
    heading: "Vier stappen, geen lang contract vooraf",
    steps: [
      {
        title: "1. Het startgesprek",
        paras: [
          "20 tot 30 minuten. Jij vertelt ons hoe het werk nu loopt en waar het vastloopt. Past het niet, dan weet je dat aan het eind van het gesprek.",
        ],
      },
      {
        title: "2. De betaalde scope",
        paras: [
          <>
            Eén werksessie van 60 tot 90 minuten. Je loopt weg met een document dat van jou
            is: waar het werk nu echt langsgaat, wat die uren kosten, een rangschikking van
            wat je als eerste moet aanpakken, wat je níet moet automatiseren, en een vaste
            prijs en opleverdatum voor de eerste bouw. Binnen <strong>5 werkdagen</strong> na
            de sessie.
          </>,
        ],
      },
      {
        title: "3. De bouw",
        paras: [
          "Geoffreerd bij de scope en vastgehouden op die prijs tot oplevering, met de opleverdatum zwart-op-wit.",
          "Doet het op die datum niet wat de scope beloofde, dan werken we door tot het dat wel doet. Zonder meerkosten, zonder nieuwe scope. Het scopedocument is de definitie van “af”: dat begrenst de belofte en houdt het weg van eindeloos herwerk.",
          "Nog niet klaar voor de hele bouw? Begin met één proces live voor €2.500. Ga je door, dan gaat dat bedrag er volledig vanaf (zie Prijzen).",
        ],
      },
      {
        title: "4. Nazorg",
        paras: [
          "Twee tot vier weken na oplevering, zodat iemand eigenaar blijft van het systeem terwijl het inslijt. Daarna een retainer, als je die wilt.",
        ],
      },
    ],
    cta: "Plan 20 minuten met ons",
    ctaHref: "/#section-meeting",
  },
};

export default function OfferLadder({ locale = "en" }) {
  const t = COPY[locale];

  return (
    <section className="bg-surface-alt py-24 lg:py-32">
      <div className="container-site">
        <p className="eyebrow text-grey-600">{t.eyebrow}</p>
        <h2 id="four-steps-no-long-contract" className="h-section mt-4 max-w-2xl text-navy">
          {t.heading}
        </h2>

        <ol className="mt-12 max-w-2xl space-y-10">
          {t.steps.map((step) => (
            <li key={step.title}>
              <p className="text-lg font-medium text-navy">{step.title}</p>
              {step.paras.map((p, i) => (
                <p key={i} className={`body-base text-grey-600 ${i === 0 ? "mt-2" : "mt-3"}`}>
                  {p}
                </p>
              ))}
            </li>
          ))}
        </ol>

        <Button href={t.ctaHref} variant="brand" className="mt-12">
          {t.cta}
        </Button>
      </div>
    </section>
  );
}
