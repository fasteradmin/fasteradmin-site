import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

const COPY = {
  en: {
    eyebrow: "Pricing",
    heading: "Fixed prices, no surprises.",
    lead: {
      kicker: "Start here — the scope analysis",
      amount: "€995",
      body: "Before anything gets built, we map out exactly what needs to happen: where work flows now, what those hours cost, what to fix first and what not to automate. Within 5 working days you walk away with a document that's yours.",
      cta: "Book the scope analysis",
      features: [
        "Where work flows now and what those hours cost",
        "What to fix first",
        "What not to automate",
      ],
    },
    tiers: [
      {
        label: "One workflow",
        amount: "€1,500 to €2,500",
        body: "Not ready for the whole system yet? We put one workflow live first. Really live, within 2 to 4 weeks. If it doesn't do what was promised by the agreed date, we keep working until it does, at no extra charge. And since that workflow later becomes part of the full system, the amount rolls over fully if you continue.",
      },
      {
        label: "The full system",
        amount: "€10,000 to €20,000+",
        body: "Your right hand on WhatsApp: an agent that drives invoicing, planning and your ERP, so the work happens without you having to be there every time. Fixed at the scope stage, delivered within 4 to 8 weeks.",
      },
    ],
    note: "No hourly rate. A fixed price with a guarantee attached answers a different question than an hourly rate does: not how many hours this takes, but what it costs to solve.",
    fine: "An organisation-wide system, with links to your CRM or ERP across multiple departments, runs up to €50,000 and more. Most of what you need isn't that.",
  },
  nl: {
    eyebrow: "Prijzen",
    heading: "Vaste prijzen, geen verrassingen.",
    lead: {
      kicker: "Begin hier — knelpuntanalyse",
      amount: "€995",
      body: "Voordat er iets gebouwd wordt, brengen we precies in kaart wat er moet gebeuren: waar het werk nu langsgaat, wat die uren kosten, wat je als eerste moet aanpakken en wat je níet moet automatiseren. Binnen 5 werkdagen loop je weg met een document dat van jou is.",
      cta: "Plan de knelpuntanalyse",
      features: [
        "Waar het werk nu langsgaat en wat die uren kosten",
        "Wat je als eerste moet aanpakken",
        "Wat je níet moet automatiseren",
      ],
    },
    tiers: [
      {
        label: "Eén workflow",
        amount: "€1.500 tot €2.500",
        body: "Nog niet klaar voor het hele systeem? We zetten eerst één workflow live. Echt live, binnen 2 tot 4 weken. Werkt het op de afgesproken datum niet zoals beloofd, dan werken we door tot het dat wel doet, zonder meerkosten. En omdat die workflow later gewoon onderdeel wordt van het Rechterhand Systeem, rolt het bedrag volledig door als je verdergaat.",
      },
      {
        label: "Het Rechterhand Systeem",
        amount: "€10.000 tot €20.000+",
        body: "Je rechterhand op WhatsApp: een agent die facturatie, planning en je ERP aanstuurt, zodat het werk gebeurt zonder dat jij er telkens bij hoeft. Vast geoffreerd bij de knelpuntanalyse en vastgehouden tot oplevering, binnen 4 tot 8 weken.",
      },
    ],
    note: "Geen uurtarief. Een vaste prijs met een garantie eraan beantwoordt een andere vraag dan een uurtarief: niet hoeveel uur dit kost, maar wat het kost om het op te lossen.",
    fine: "Een organisatiebreed systeem, met koppelingen naar je CRM of ERP over meerdere afdelingen, loopt op naar €50.000 en meer. Het meeste van wat je nodig hebt is dat niet.",
  },
};

export default function Pricing({ locale = "en" }) {
  const t = COPY[locale];

  return (
    <section id="pricing" className="bg-white py-20 pb-24 lg:py-28 lg:pb-32">
      <div className="container-site">
        <Reveal as="p" className="eyebrow text-grey-600">
          {t.eyebrow}
        </Reveal>
        <Reveal>
          <h2 className="h-section mt-4">{t.heading}</h2>
        </Reveal>

        <Reveal
          className="mt-11 grid gap-10 rounded-3xl bg-navy p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center"
        >
          <div>
            <p className="eyebrow text-white/60">{t.lead.kicker}</p>
            <p className="mt-4 text-4xl font-extrabold tracking-[-0.01em]">{t.lead.amount}</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80">{t.lead.body}</p>
            <div className="mt-6">
              <Button href="/#section-meeting" variant="white">
                {t.lead.cta}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {t.lead.features.map((f) => (
              <div key={f} className="flex items-center gap-3 rounded-xl bg-white/10 px-4.5 py-3.5 text-[13.5px]">
                <CheckIcon />
                {f}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {t.tiers.map((tier, i) => (
            <Reveal
              key={tier.label}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`rounded-2xl border border-line p-8 transition-shadow hover:shadow-[0_4px_10px_rgba(14,42,68,.06),0_24px_48px_-16px_rgba(14,42,68,.2)] ${
                i === 1 ? "bg-surface-alt" : ""
              }`}
            >
              <p className="text-[12.5px] uppercase tracking-wide text-grey-500">{tier.label}</p>
              <p className="mt-3 text-[26px] font-extrabold tracking-[-0.01em] text-navy">{tier.amount}</p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-grey-600">{tier.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="body-base mt-8 max-w-2xl text-grey-600">
          {t.note}
        </Reveal>
        <Reveal as="p" className="mt-3.5 max-w-2xl text-[13px] italic leading-relaxed text-grey-500">
          {t.fine}
        </Reveal>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7.4" stroke="#fff" />
      <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
