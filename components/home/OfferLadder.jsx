import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

const COPY = {
  en: {
    eyebrow: "How we start working together",
    heading: "Four steps, no long contract up front",
    steps: [
      {
        title: "The Ops Call",
        body: "20 to 30 minutes. No pitch. You walk us through how work moves today and where it gets stuck.",
      },
      {
        title: "The paid scope",
        body: "One working session, 60 to 90 minutes. You leave owning a document: where work actually flows now, what those hours cost, a ranked list of what to fix first, what not to automate, and a fixed price and go-live date. Delivered within 5 working days.",
      },
      {
        title: "The build",
        body: "Quoted at the scope and held at that price through delivery, go-live date in writing. If it doesn't do what was agreed by that date, we keep working until it does. No extra charge.",
      },
      {
        title: "Hypercare",
        body: "Two to four weeks after go-live, so someone still owns the system while it beds in. A retainer after that, if you want one.",
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
        title: "Het startgesprek",
        body: "20 tot 30 minuten. Jij vertelt ons hoe het werk nu loopt en waar het vastloopt. Past het niet, dan weet je dat aan het eind van het gesprek.",
      },
      {
        title: "Knelpuntanalyse",
        body: "Eén werksessie van 60 tot 90 minuten. Je loopt weg met een document dat van jou is: waar het werk nu echt langsgaat, wat die uren kosten, een rangschikking van wat je als eerste moet aanpakken, wat je níet moet automatiseren, en een vaste prijs en opleverdatum. Binnen 5 werkdagen na de sessie.",
      },
      {
        title: "De bouw",
        body: "Geoffreerd bij de knelpuntanalyse en vastgehouden op die prijs tot oplevering, met de opleverdatum zwart-op-wit. Doet het op die datum niet wat is afgesproken, dan werken we door tot het dat wel doet. Zonder meerkosten.\n\nNog niet klaar voor het hele systeem? Begin met één workflow live voor €1.500 tot €2.500. Ga je verder, dan rolt dat bedrag volledig door.",
      },
      {
        title: "Aftercare",
        body: "Twee tot vier weken na oplevering, zodat iemand eigenaar blijft van het systeem terwijl het inslijt. Daarna een retainer, als je die wilt.",
      },
    ],
    cta: "Plan 20 minuten met ons",
    ctaHref: "/#section-meeting",
  },
};

export default function OfferLadder({ locale = "en" }) {
  const t = COPY[locale];

  return (
    <section id="section-steps" className="bg-white py-20 lg:py-28">
      <div className="container-site max-w-[700px]">
        <Reveal as="p" className="eyebrow text-grey-600">
          {t.eyebrow}
        </Reveal>
        <Reveal>
          <h2 className="h-section mt-4">{t.heading}</h2>
        </Reveal>

        <ol className="mt-11">
          {t.steps.map((step, i) => (
            <Reveal key={step.title} as="li" style={{ transitionDelay: `${i * 60}ms` }}>
              <div
                className={`group flex gap-7 border-t border-line py-7 ${
                  i === t.steps.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-surface-alt text-base font-extrabold text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-[16.5px] font-medium text-navy">{step.title}</h4>
                  {step.body.split("\n\n").map((p, j) => (
                    <p key={j} className={`text-[14.5px] leading-relaxed text-grey-600 ${j > 0 ? "mt-3" : "mt-2"}`}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-9">
          <Button href={t.ctaHref}>{t.cta}</Button>
        </Reveal>
      </div>
    </section>
  );
}
