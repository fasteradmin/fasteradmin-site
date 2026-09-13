import Reveal from "@/components/Reveal";

const COPY = {
  en: {
    eyebrow: "Not just faster",
    heading: "An invoice can be internally perfect and still be wrong",
    paras: [
      "Freelancers on MeetPartner's survey teams submit their own weekly invoice. One of them was flawless on its own terms: the math was right, the line items added up, and the declared total matched his own numbers exactly. Every check that looks at the paperwork alone would pass it.",
      "Only one thing disagreed with it: MeetPartner's own independent time-tracking record, which the invoice itself never touches. Catching that means checking against a third source, not against itself.",
    ],
    diagram: {
      left: "Factuur",
      leftItems: ["Rekensom klopt", "Regels tellen op", "Totaal komt overeen"],
      mid: "toetst niet aan",
      right: "Onafhankelijke urenregistratie",
      rightItem: "Komt niet overeen",
    },
  },
  nl: {
    eyebrow: "Niet alleen sneller",
    heading: "Een factuur kan intern perfect kloppen en toch verkeerd zijn",
    paras: [
      "Freelancers in de meetteams van MeetPartner sturen hun eigen weekfactuur in. Eén daarvan klopte op zichzelf perfect: de rekensom klopte, de regels telden op, en het opgegeven totaal kwam exact overeen met zijn eigen cijfers. Elke controle die alleen naar de papieren kijkt, zou hem goedkeuren.",
      "Eén ding was het er niet mee eens: de onafhankelijke urenregistratie van MeetPartner zelf, die de factuur nergens raakt. Dat vang je alleen door te toetsen aan een derde bron, niet aan zichzelf.",
    ],
    diagram: {
      left: "Factuur",
      leftItems: ["Rekensom klopt", "Regels tellen op", "Totaal komt overeen"],
      mid: "toetst niet aan",
      right: "Onafhankelijke urenregistratie",
      rightItem: "Komt niet overeen",
    },
  },
};

export default function ProofMeetPartner({ locale = "en" }) {
  const t = COPY[locale];

  return (
    <section id="section-proof" className="bg-white py-24 lg:py-32">
      <div className="container-site">
        <Reveal as="p" className="eyebrow text-ink-muted">
          {t.eyebrow}
        </Reveal>

        <Reveal>
          <h2 id="an-invoice-can-be-perfect-and-still-be-wrong" className="h-section mt-4 max-w-2xl text-navy">
            {t.heading}
          </h2>
        </Reveal>

        <Reveal className="body-base mt-8 max-w-2xl space-y-5 text-ink-muted">
          {t.paras.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="mt-11 grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl border border-line p-7">
            <p className="text-[11.5px] font-bold uppercase tracking-wide text-grey-500">
              {t.diagram.left}
            </p>
            <div className="mt-4 space-y-2.5">
              {t.diagram.leftItems.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[13.5px] text-navy">
                  <CheckIcon />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 py-2 md:rotate-0">
            <PlusIcon />
            <span className="text-[10.5px] text-grey-500">{t.diagram.mid}</span>
          </div>

          <div className="rounded-2xl border border-line bg-surface-alt p-7">
            <p className="text-[11.5px] font-bold uppercase tracking-wide text-grey-500">
              {t.diagram.right}
            </p>
            <div className="mt-4 flex items-center gap-2.5 text-[13.5px] text-navy">
              <CrossIcon />
              {t.diagram.rightItem}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7.4" stroke="var(--color-navy)" />
      <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="var(--color-navy)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7.4" stroke="#b23b2e" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#b23b2e" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4v16M4 12h16"
        stroke="var(--color-grey-500)"
        strokeWidth="1.4"
        strokeLinecap="round"
        transform="rotate(45 12 12)"
      />
    </svg>
  );
}
