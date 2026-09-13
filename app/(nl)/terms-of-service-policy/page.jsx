import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/terms-of-service-policy",
  title: "Algemene voorwaarden",
  description:
    "Scope, betalingsvoorwaarden, revisies en eigendom voor opdrachten bij FasterAdmin.",
  locale: "nl_NL",
  languages: {
    nl: "/terms-of-service-policy",
    en: "/eng/terms-of-service-policy",
    "x-default": "/terms-of-service-policy",
  },
});

const blocks = [
  {
    heading: "1. Omvang van het werk",
    paras: [
      "Voordat een project begint, spreken we een schriftelijke scope af — inclusief opleverbaarheden, tijdlijnen en prijzen. Dit kan worden vastgelegd in een voorstel, e-mail of Notion-board.",
      "Worden er halverwege het project nieuwe taken of functies toegevoegd die buiten wat oorspronkelijk is afgesproken vallen, dan brengen we hiervoor een nieuwe offerte uit en stemmen we dit met je af voordat we verdergaan. We overvallen je nooit met nieuwe kosten.",
    ],
  },
  {
    heading: "2. Betalingsvoorwaarden",
    paras: [
      "Onze standaardvoorwaarden zijn 50% vooraf, 50% bij oplevering, tenzij we schriftelijk iets anders zijn overeengekomen.",
      "Definitieve bestanden en live toegang worden geleverd na ontvangst van de laatste betaling. Te late betalingen van meer dan 7 dagen kunnen de projecttijdlijn pauzeren. We accepteren betaling via bankoverschrijving, Stripe of Wise.",
    ],
  },
  {
    heading: "3. Revisies",
    paras: [
      "Elk project omvat een vastgesteld aantal revisierondes (doorgaans 2 tot 3 per fase, afhankelijk van de scope).",
      "Revisies zijn bedoeld om te verfijnen, niet om opnieuw te beginnen. Verandert je feedback na goedkeuring of afronding de richting significant, dan kunnen we extra werk offreren. We houden je altijd op de hoogte voordat er iets wordt gefactureerd.",
    ],
  },
  {
    heading: "4. Tijdlijnen en deadlines",
    paras: [
      "We werken snel, maar kwaliteit kost tijd. We stellen een duidelijk schema op en houden ons daaraan — ervan uitgaande dat feedback, materiaal en goedkeuringen tijdig worden aangeleverd.",
      "Blijft je team langer dan 14 dagen stil, dan pauzeren we het project. Er kan een omboekingsvergoeding gelden als we jouw plek in onze planning moeten verzetten.",
    ],
  },
  {
    heading: "5. Eigendom en rechten",
    paras: [
      "Zodra de laatste betaling is ontvangen, ben jij eigenaar van de definitieve opleverbaarheden.",
      "Dit omvat ontwerpen, code, merkmateriaal en documentatie die we voor je project maken. We behouden het recht om niet-vertrouwelijk werk te tonen in ons portfolio, praktijkvoorbeelden of op social media, tenzij je dit schriftelijk anders aangeeft voordat we beginnen.",
    ],
  },
  {
    heading: "6. Communicatie",
    paras: [
      "Het meeste van ons werk verloopt asynchroon. We gebruiken Slack, e-mail, Framer, Notion en Loom om op één lijn te blijven — geen eindeloze Zoom-gesprekken.",
      "We streven ernaar om op werkdagen binnen 24 tot 48 uur te reageren op projectberichten. Zijn er dringende tijdlijnen of overleggen nodig, dan plannen we die samen in.",
    ],
  },
  {
    heading: "7. Annuleringen",
    paras: [
      "Je kunt een project op elk moment annuleren. Gebeurt dat, dan factureren we het werk dat tot dan toe is uitgevoerd.",
      "Pauzeer je een project langer dan 21 dagen zonder voorafgaand bericht, dan kunnen we je werk verzetten afhankelijk van onze planning. Voor gepauzeerde projecten kan, afhankelijk van scope en beschikbaarheid, een herstartvergoeding gelden.",
    ],
  },
  {
    heading: "8. Aansprakelijkheid",
    paras: [
      "We garanderen de oplevering van werk zoals vastgelegd in de afgesproken scope. We zijn niet aansprakelijk voor indirecte schade, technische problemen door diensten van derden (zoals cms-platforms, plug-ins, hosting), of hoe het uiteindelijke werk buiten onze invloed om wordt gebruikt.",
      "We testen en leveren alles op met professionele zorgvuldigheid en te goeder trouw.",
    ],
  },
  {
    heading: "9. Vertrouwelijkheid",
    paras: [
      "Alles wat je met ons deelt — inclusief strategie, visuals, productdetails of interne documentatie — blijft vertrouwelijk. We delen, hergebruiken of onthullen het niet zonder jouw toestemming.",
      "Wil je vooraf een wederzijdse NDA ondertekenen, dan doen we dat graag.",
    ],
  },
  {
    heading: "10. Wijzigingen in de voorwaarden",
    paras: [
      "We laten graag het werk zien waar we trots op zijn. Tenzij anders afgesproken, kunnen we het eindresultaat tonen in ons portfolio, blog, praktijkvoorbeelden of op social kanalen.",
      "Betreft het werk gevoelig materiaal (bijvoorbeeld nog niet gelanceerde producten of merken in stealth-modus), laat het ons dan vooraf weten en we houden het privé.",
    ],
  },
];

export default function TermsOfService() {
  return (
    <PolicyPage
      title="Algemene voorwaarden"
      intro="Door met FasterAdmin samen te werken of onze website te gebruiken, ga je akkoord met onderstaande voorwaarden."
      blocks={blocks}
      locale="nl"
    />
  );
}
