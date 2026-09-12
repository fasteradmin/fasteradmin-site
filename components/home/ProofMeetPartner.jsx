const COPY = {
  en: {
    eyebrow: "Not just faster",
    heading: "An invoice can be internally perfect and still be wrong",
    paras: [
      "Freelancers on MeetPartner's survey teams submit their own weekly invoice. One of them was flawless on its own terms: the math was right, the line items added up, and the declared total matched his own numbers exactly. Every check that looks at the paperwork alone would pass it.",
      "Only one thing disagreed with it: MeetPartner's own independent time-tracking record, which the invoice itself never touches. Catching that means checking against a third source, not against itself.",
    ],
    closing: "This runs as a paid, ongoing engagement, not a one-off build.",
  },
  nl: {
    eyebrow: "Niet alleen sneller",
    heading: "Een factuur kan intern perfect kloppen en toch verkeerd zijn",
    paras: [
      "Freelancers in de meetteams van MeetPartner sturen hun eigen weekfactuur in. Eén daarvan klopte op zichzelf perfect: de rekensom klopte, de regels telden op, en het opgegeven totaal kwam exact overeen met zijn eigen cijfers. Elke controle die alleen naar de papieren kijkt, zou hem goedkeuren.",
      "Eén ding was het er niet mee eens: de onafhankelijke urenregistratie van MeetPartner zelf, die de factuur nergens raakt. Dat vang je alleen door te toetsen aan een derde bron, niet aan zichzelf.",
    ],
    closing: "Dit loopt als een doorlopende, betaalde opdracht, niet als een eenmalige bouw.",
  },
};

export default function ProofMeetPartner({ locale = "en" }) {
  const t = COPY[locale];

  return (
    <section id="section-proof" className="bg-white py-24 lg:py-32">
      <div className="container-site">
        <p className="eyebrow text-ink-muted">{t.eyebrow}</p>

        <h2 id="an-invoice-can-be-perfect-and-still-be-wrong" className="h-section mt-4 max-w-2xl text-navy">
          {t.heading}
        </h2>

        <div className="body-base mt-8 max-w-2xl space-y-5 text-ink-muted">
          {t.paras.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-navy">{t.closing}</p>
        </div>
      </div>
    </section>
  );
}
