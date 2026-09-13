import Image from "next/image";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";
import { headingSlug } from "@/lib/posts";

export const metadata = pageMetadata({
  path: "/works/email-to-quote-system",
  title:
    "Cupcake STHLM - Hoe we een bakkerij 40+ uur per maand besparen met automatisering van e-mailbestellingen",
  description:
    "Van 2-3 uur handmatig e-mails beantwoorden en gegevens overtypen in hun facturatiesysteem, naar minder dan 1 uur per dag.",
  openGraph: { type: "article" },
  locale: "nl_NL",
  languages: {
    nl: "/works/email-to-quote-system",
    en: "/eng/works/email-to-quote-system",
    "x-default": "/works/email-to-quote-system",
  },
});

const relevantIf = [
  "De meeste opdrachten beginnen met een aanvraag op maat per e-mail of WhatsApp",
  "Je typt dezelfde gegevens handmatig over in: offertes, facturen/boekhouding, interne planning",
  "Je verstuurt offertes soms later dan je zou willen, gewoon omdat je de hele dag op locatie was",
  "Een groot deel van je “systeem” zit in je hoofd, en als je moe of druk bent, glipt er iets doorheen",
];

const before = [
  "Vóór automatisering... moest elke e-mail eerst zorgvuldig gelezen en “vertaald” worden",
  "Klantnaam, bedrijf, datum, tijd, adres, factuurgegevens, producten en aantallen werden met de hand overgetypt",
  "Offertes werden handmatig gemaakt in Fortnox en als pdf gedownload",
  "Elke e-mail werd handmatig terug naar de klant geschreven",
  "Als het even niet bijgehouden werd, glipten bestellingen of bevestigingen erdoorheen",
];

const after = [
  "Met automatisering... wordt elke e-mail direct geanalyseerd en worden de gegevens opgeslagen in hun eigen record en velden",
  "De klant wordt aangemaakt of gekoppeld in facturatietool Fortnox",
  "De offerte wordt direct met de juiste gegevens aangemaakt in Fortnox",
  "Er wordt een pdf-offerte gegenereerd en netjes opgeslagen in Google Drive",
  "Er wordt een conceptmail gegenereerd die alles samenvat en naar de pdf linkt",
];

const built = [
  "Binnenkomende e-mails worden omgezet in gestructureerde aanvragen",
  "Fortnox-offertes en pdf-bestanden worden met één klik aangemaakt",
  "Conceptantwoorden worden automatisch gegenereerd en hoeven alleen goedgekeurd te worden",
  "De e-mail heeft een knop waarmee de klant de bestelling kan accepteren, weigeren of wijzigen",
  "Zodra de bestelling is geaccepteerd, worden de klant en iedereen binnen het bedrijf op de hoogte gebracht.",
];

const outcomes = [
  {
    title: "Geen zorgen meer",
    body: "De grootste winst voor de klant is de opluchting van de constante zorg. 's Nachts wakker liggen met de vraag of hij fouten heeft gemaakt, iets is vergeten en of iedereen op de hoogte is.",
  },
  {
    title: "Geen fouten, niets vergeten",
    body: "Met het nieuwe systeem weet hij dat, van het binnenkomen van een bestelling tot de bevestiging en het doorgeven aan de banketbakker wat wanneer gemaakt moet worden, elke stap altijd en correct gebeurt. Zonder uitzondering.",
  },
  {
    title: "8+ uur per week bespaard",
    body: "Van 30 tot 40 minuten per e-mailaanvraag naar 5 offertes in 1 uur versturen, zonder iemand aan te nemen. Minder heen-en-weer, minder handmatige stappen, snellere doorlooptijd. Die tijd gaat terug naar verkoop, klanten en het laten groeien van het bedrijf.",
  },
];

export default function CaseStudyPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <dl className="flex flex-wrap gap-x-16 gap-y-6">
            <Meta label="Klant" value="Cupcake STHLM" />
            <Meta label="Duur" value="3 weken" />
            <Meta label="Datum" value="14 nov 2025" />
            <Meta label="#" value="automatisering" icon="Fi1knLppTjSuF6gbXIU0LmembU.png" />
          </dl>

          <h1 className="h-display mt-12 max-w-4xl text-navy">
            Hoe we een bakkerij 40+ uur per maand besparen met automatisering van
            e-mailbestellingen
          </h1>

          <div className="body-base mt-10 max-w-2xl space-y-5 text-grey-600">
            <p>
              Van 2-3 uur handmatig e-mails beantwoorden en nieuwe klant- en offertegegevens
              overtypen in hun facturatiesysteem.
            </p>
            <p>
              Een werkwijze waar makkelijk fouten in slopen en de constante zorg of hij iets
              gemist had...
            </p>
            <p>
              Naar minder dan 1 uur per dag en de gemoedsrust dat alles altijd gebeurt, en
              vooral: correct gebeurt.
            </p>
            <p className="text-navy">
              Je bent misschien geen bakkerij, maar als je dit probleem herkent... dan is dit
              wellicht het beste wat je deze week leest.
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/img/E3t6xiZKtDSALPz4EIJr6AwxM8.png"
        alt="Cupcake STHLM"
        width={2000}
        height={1339}
        priority
        className="h-auto w-full"
      />

      {/* Walkthrough video */}
      <section className="bg-surface-alt py-16">
        <div className="container-site">
          <div className="overflow-hidden rounded-[var(--radius-block)] bg-black">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/O67qwb_2FF8?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1"
                title="Cupcake STHLM praktijkvoorbeeld"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <p className="body-base mt-6 text-grey-600">
            Introductie: 00:00 - 03:00
            <br />
            Praktijkvoorbeeld: 03:00 - 10:27
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-surface-alt">
        <div className="container-site py-20">
          <blockquote className="max-w-3xl text-2xl font-medium italic leading-tight tracking-[-0.03em] text-navy md:text-[32px]">
            &ldquo;Ik ging niet alleen van 2-3+ uur naar minder dan 1 uur administratie per dag
            (mails beantwoorden, offertes versturen, enzovoort). Belangrijker nog: ik heb niet
            meer de zorg van &lsquo;heb ik iets gemist of heb ik het goed gedaan?&rsquo;&rdquo;
          </blockquote>

          <div className="mt-10 flex items-center gap-4">
            <Image
              src="/img/QfOGeqDA89lvkdBlJgLaqQuQY.jpeg"
              alt="Alexander Cordova"
              width={64}
              height={64}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div>
              <p className="text-base font-medium text-navy">Alexander Cordova</p>
              <p className="text-xs font-semibold text-ink-muted">Marketing Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Relevance */}
      <section className="bg-surface-alt py-24">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Herken je deze problemen?</p>
          <h2 id="this-case-is-relevant-if" className="h-section mt-4 text-navy">
            Dit praktijkvoorbeeld is relevant als…
          </h2>

          <ul className="mt-10 max-w-3xl space-y-3">
            {relevantIf.map((r) => (
              <li key={r} className="rounded-[40px] bg-white px-6 py-4 text-sm text-navy">
                {r}
              </li>
            ))}
          </ul>

          <div className="body-base mt-10 max-w-2xl space-y-4 text-grey-600">
            <p>
              Ook al is dit een bakkerij, het patroon is hetzelfde als bij veel
              mkb-dienstverleners:
            </p>
            <p className="text-navy">
              Loodgieters, elektriciens, installatiebedrijven, taxateurs, enzovoort.
            </p>
            <p>
              In dit geval gebruikte de klant Fortnox als facturatietool. Dat is eenvoudig te
              vervangen door de meeste andere facturatietools.
            </p>
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="bg-white py-24">
        <div className="container-site">
          <h2 id="time-saved-and-invested-elsewhere" className="h-section text-navy">
            Bespaarde tijd, elders geïnvesteerd
          </h2>

          <div className="body-base mt-8 max-w-2xl space-y-4 text-grey-600">
            <p>
              Ze hoeven e-mails en offertes niet meer vanaf nul te schrijven, ze controleren en
              keuren alleen nog goed wat het systeem heeft klaargezet.
            </p>
            <p>
              Offertes gaan nu sneller en consistenter de deur uit, en de mentale belasting is
              gedaald omdat iedereen die erbij betrokken is — eigenaar, banketbakker en klant —
              altijd op de hoogte is van de bestelling en de status.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {["pBE2bCgpZLUQ3shCtPcpAcNbY.png", "YjvCUqbBc1LZcclnQ3keRNb2c.png", "ykCpgwuuW1w2QJ6QBJqSVMPpQw.png", "SujTQ9gIkBEtLtzS0omEPoW4WsE.png"].map((f) => (
              <Image
                key={f}
                src={`/img/${f}`}
                alt=""
                width={704}
                height={1000}
                className="h-auto w-full rounded-[var(--radius-card)]"
              />
            ))}
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Panel
              title="Lange, saaie uren"
              items={before}
              tone="muted"
              img="kOxX0Fj00H0IQqmXMrdMaW1Bo.png"
            />
            <Panel
              title="Voor je gedaan"
              items={after}
              tone="brand"
              img="ILYMXCofMk9NRNF0O8aD4DIVM.png"
            />
          </div>
        </div>
      </section>

      {/* What we built */}
      <section className="bg-white py-24">
        <div className="container-site">
          <h2 id="what-we-actually-built" className="h-section text-navy">
            Wat we daadwerkelijk hebben gebouwd
          </h2>
          <p className="mt-6 text-xl text-brand">Kernidee: van e-mailchaos naar een schone pipeline</p>

          <div className="body-base mt-8 max-w-2xl space-y-4 text-ink-muted">
            <p>
              We bouwden een centrale basis in een programma genaamd Airtable (denk aan Google
              Sheets of Excel 2.0) waar alle informatie wordt opgeslagen en beheerd in een op
              maat ontworpen interface.
            </p>
            <p>
              Van daaruit bestuurt de klant wat er gebeurt in Outlook en in hun
              facturatietool, Fortnox.
            </p>
          </div>

          <ul className="mt-10 max-w-3xl space-y-3">
            {built.map((b) => (
              <li
                key={b}
                className="rounded-[40px] border border-line bg-white px-6 py-4 text-sm text-navy"
              >
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-12 space-y-6">
            {["OWQd0knaPaGXr3DsQi9eNDHwss4.png", "nnhv9i3Fm3z8Xzwy3h7RxFrm68.png"].map((f) => (
              <Image
                key={f}
                src={`/img/${f}`}
                alt="De Airtable-interface gebouwd voor Cupcake STHLM"
                width={3000}
                height={1494}
                className="h-auto w-full rounded-[var(--radius-card)]"
              />
            ))}
          </div>

          <div className="body-base mt-10 max-w-2xl space-y-4 text-ink-muted">
            <p>
              Met een paar klikken genereert de klant e-mails, registreert hij nieuwe klanten
              en maakt hij offertes aan.
            </p>
            <p>
              En dat allemaal met volledige controle dankzij ingebouwde menselijke controle-
              en goedkeuringsstappen.
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-surface-alt py-24">
        <div className="container-site">
          <h2 id="key-outcomes" className="h-section text-navy">Belangrijkste resultaten</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.title} className="rounded-[var(--radius-card)] bg-white p-8">
                <h3 id={headingSlug(o.title)} className="h-card text-navy">{o.title}</h3>
                <p className="body-base mt-4 text-grey-600">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MeetingSection locale="nl" />
      <ContactSection minimal locale="nl" />
    </>
  );
}

function Meta({ label, value, icon }) {
  return (
    <div>
      <dt className="eyebrow text-grey-500">{label}</dt>
      <dd className="mt-1 flex items-center gap-2 text-base font-medium text-navy">
        {icon && <Image src={`/img/${icon}`} alt="" width={20} height={20} />}
        {value}
      </dd>
    </div>
  );
}

function Panel({ title, items, tone, img }) {
  return (
    <div className="rounded-[var(--radius-block)] bg-surface-alt p-8">
      {img && (
        <Image
          src={`/img/${img}`}
          alt=""
          width={1832}
          height={1832}
          className="mb-8 h-auto w-full rounded-[var(--radius-card)]"
        />
      )}
      <h3 id={headingSlug(title)} className={`h-card ${tone === "brand" ? "text-brand" : "text-grey-500"}`}>{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((i) => (
          <li key={i} className="body-base flex gap-3 text-navy">
            <span aria-hidden className={tone === "brand" ? "text-brand" : "text-grey-500"}>
              •
            </span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
