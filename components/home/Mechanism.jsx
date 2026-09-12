import { headingSlug } from "@/lib/posts";

const COPY = {
  en: {
    eyebrow: "Five steps, in this order, every time",
    intro:
      "This isn't an AI agency pitch. AI use among Dutch small businesses roughly doubled to 70% this past year, but more than half of that is someone writing text or generating images. Here, AI goes exactly where a person would otherwise have to read something and decide. Everything else runs as ordinary, testable code.",
    steps: [
      {
        n: "01",
        title: "Map where the work actually goes",
        body: "Not where you assume it goes. We walk through requests, handoffs and approvals until we can see exactly where time and accuracy are lost.",
      },
      {
        n: "02",
        title: "Design the system before buying anything new",
        body: "Most of what's broken isn't a missing tool. It's two tools that were bought to talk to each other and never actually got connected.",
      },
      {
        n: "03",
        title: "Build and connect what you already use",
        body: "No new software to learn and no data migration, we build into the tools you already have open.",
      },
      {
        n: "04",
        title: "Test it on real cases, not a demo",
        body: "Including the edge cases that normally surface three months in, after something has already gone wrong for a real customer.",
      },
      {
        n: "05",
        title: "Go live on a date in writing, then stay",
        body: "Two to four weeks of hypercare after launch, so the system isn't the thing nobody owns six months from now.",
      },
    ],
  },
  nl: {
    eyebrow: "Vijf stappen, altijd in deze volgorde",
    // The AI-doubled-to-70% stat is deliberately not repeated here — it now
    // lives once, in the manifesto's "Waarom nu?" block, per the copy doc's
    // own dedup note ("Dedup" in OPEN PUNTEN).
    intro:
      "Dit is geen AI-bureau dat je een pitch komt geven. AI zetten we precies daar in waar een mens anders iets zou moeten lezen en beslissen. De rest draait als gewone, testbare code.",
    steps: [
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
    ],
  },
};

export default function Mechanism({ locale = "en" }) {
  const t = COPY[locale];

  return (
    <section className="bg-white py-24 lg:py-32">
      {/* Stacked on mobile, two columns from lg. minmax(0,…) on both tracks
          is what stops the intro clipping — grid children default to
          min-width:auto and refuse to shrink below their content. */}
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-grey-600">{t.eyebrow}</p>
          <p className="body-base mt-6 text-grey-600">{t.intro}</p>
        </div>

        <div className="space-y-10 lg:mt-0">
          {t.steps.map((s) => (
            <div key={s.n} className="flex gap-6 sm:gap-8">
              <span className="text-4xl font-bold tracking-[-0.05em] text-brand">{s.n}</span>
              <div className="min-w-0">
                <h3 id={headingSlug(s.title)} className="text-xl font-medium tracking-[-0.03em] text-navy">
                  {s.title}
                </h3>
                <p className="body-base mt-3 text-grey-600">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
