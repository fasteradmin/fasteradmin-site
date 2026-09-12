/**
 * Dutch gets a third rung the English side doesn't have yet: the EUR 2,500
 * single-process bridge offer, between the scope and the full build. Purely
 * a data difference — `items` is just a longer array on the "nl" side, the
 * section markup doesn't change shape for it.
 */
const COPY = {
  en: {
    eyebrow: "Pricing",
    heading: "Two numbers, no rate card",
    intro: null,
    items: [
      {
        title: "The paid scope",
        body: "EUR 1,500, fixed. One working session, a document you own outright, delivered within 5 working days.",
      },
      {
        title: "The build",
        body: "Typically EUR 10,000 to EUR 20,000, fixed at the scope stage and held through delivery. The number depends on what the scope finds, not on hours worked.",
      },
    ],
    outro: [
      "No hourly rate. A fixed price with a guarantee attached to it answers a different question than an hourly one does: not how many hours this takes, but what it costs to fix.",
    ],
  },
  nl: {
    eyebrow: "Prijzen",
    heading: "Geen tarievenlijst. Je weet vooraf waar je aan toe bent.",
    intro:
      "Een organisatiebreed systeem, met koppelingen naar je CRM of ERP, loopt op naar €50.000 en meer. Het meeste van wat je nodig hebt is dat niet.",
    items: [
      {
        title: "De scope — €1.500, vast",
        body: "Eén werksessie, een document dat volledig van jou is, binnen 5 werkdagen. Het is een aparte aankoop: wat je er daarna mee doet, ook bouwen met iemand anders, is aan jou.",
      },
      {
        title: "Nog niet klaar voor de hele bouw? Begin met één proces — €2.500",
        body: "We zetten één proces live. Echt live, in ongeveer twee weken. Geen demo. Werkt het op de afgesproken datum niet zoals beloofd, dan betaal je niet. En omdat dit al echt bouwwerk is, gaat de €2.500 er volledig vanaf als je doorgaat met de bouw.",
      },
      {
        title: "De bouw — meestal €10.000 tot €20.000, vast",
        body: "Vastgezet bij de scope en vastgehouden tot oplevering. Het bedrag hangt af van wat de scope vindt, niet van gewerkte uren.",
      },
    ],
    outro: [
      "Het denkwerk (de scope) houd je los. Het eerste stukje bouwen telt mee zodra je doorgaat.",
      "Geen uurtarief. Een vaste prijs met een garantie eraan beantwoordt een andere vraag dan een uurtarief: niet hoeveel uur dit kost, maar wat het kost om het op te lossen.",
    ],
  },
};

export default function Pricing({ locale = "en" }) {
  const t = COPY[locale];

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-site">
        <p className="eyebrow text-grey-600">{t.eyebrow}</p>
        <h2 id="two-numbers-no-rate-card" className="h-section mt-4 max-w-2xl text-navy">
          {t.heading}
        </h2>

        {t.intro && <p className="body-base mt-6 max-w-2xl text-grey-600">{t.intro}</p>}

        <div className="mt-10 max-w-2xl space-y-8">
          {t.items.map((item) => (
            <div key={item.title}>
              <p className="text-lg font-medium text-navy">{item.title}</p>
              <p className="body-base mt-2 text-grey-600">{item.body}</p>
            </div>
          ))}
        </div>

        {t.outro.map((p, i) => (
          <p key={i} className={`body-base max-w-2xl text-grey-600 ${i === 0 ? "mt-10" : "mt-4"}`}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
