import PolicyPage from "@/components/PolicyPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/privacy-policy-policy",
  title: "Privacybeleid",
  description:
    "Hoe FasterAdmin je gegevens verzamelt, gebruikt en bewaart, en hoe je je rechten onder de AVG uitoefent.",
  locale: "nl_NL",
  languages: {
    nl: "/privacy-policy-policy",
    en: "/eng/privacy-policy-policy",
    "x-default": "/privacy-policy-policy",
  },
});

const blocks = [
  {
    heading: "1. Wat we verzamelen",
    paras: [
      "We verzamelen een paar dingen — maar alleen wat nodig is om de site te laten draaien, ons werk te verbeteren of contact met je te houden.",
      "Dit kan onder meer gaan om:",
    ],
    list: [
      "Basale contactgegevens (zoals je naam, e-mail of bedrijf) wanneer je een formulier invult of een gesprek boekt",
      "Analysegegevens (zoals paginaweergaven, tijd op de site, apparaattype, enz.) verzameld via Google Analytics en Google Tag Manager",
      "Advertentiegegevens verzameld via de Meta Pixel, als je via een Meta-advertentie bent binnengekomen",
      "Projectgerelateerde details als je met ons samenwerkt — tools, workflows en feedback",
      "Alle informatie die je ervoor kiest te delen wanneer je ons e-mailt, belt of een bericht stuurt",
    ],
  },
  {
    heading: "2. Waar we het voor gebruiken",
    paras: ["We gebruiken de gegevens die we verzamelen alleen voor dingen die daadwerkelijk zinvol zijn. Zoals:"],
    list: [
      "Reageren op je berichten of vragen",
      "Relevante project-updates sturen als we samenwerken",
      "Verbeteren hoe de site presteert en hoe mensen ermee omgaan",
      "Begrijpen waar mensen om geven, zodat we betere content kunnen schrijven en betere dingen kunnen bouwen",
    ],
  },
  {
    paras: ["We gebruiken je gegevens niet om te spammen, te retargeten of door te geven aan een externe verkooplijst."],
  },
  {
    heading: "3. Hoe we het bewaren",
    paras: [
      "Alle persoonsgegevens worden veilig opgeslagen en zijn alleen toegankelijk voor mensen die ze nodig hebben om het werk te doen — meestal alleen wijzelf, gevestigd in Amsterdam. We gebruiken beveiligde systemen (Google Workspace, Airtable, n8n) en houden alles met een wachtwoord beveiligd. Heb je ooit met ons samengewerkt, dan zijn je projectbestanden veilig en uitsluitend voor back-updoeleinden gearchiveerd.",
    ],
  },
  {
    heading: "4. Tools van derden",
    paras: ["We gebruiken een paar vertrouwde tools om de site en het boekingsproces te laten werken:"],
    list: [
      "Google Analytics en Google Tag Manager – voor anonieme gebruiksstatistieken van de site",
      "Meta Pixel – voor advertenties, als je via een Meta-advertentie bent binnengekomen",
      "Google Calendar – om Het Startgesprek te boeken en te beheren",
      "n8n – om inzendingen van het contactformulier en boekingsaanvragen te verwerken",
    ],
  },
  {
    paras: [
      "Deze tools kunnen basale gebruiksgegevens verzamelen, maar we geven ze geen toegang tot je persoonlijke gegevens tenzij dat nodig is om een project af te ronden (met jouw toestemming).",
    ],
  },
  {
    heading: "5. Cookies",
    paras: [
      "We gebruiken mogelijk eenvoudige cookies om te zien hoe mensen met de site omgaan — niets opdringerigs of persoonlijks. Je kunt cookies altijd uitschakelen in je browserinstellingen als je liever helemaal niet gevolgd wordt.",
    ],
  },
  {
    heading: "6. Jouw rechten",
    paras: ["Je kunt altijd:"],
    list: [
      "Ons vragen welke gegevens we van je hebben",
      "Een kopie van die gegevens opvragen",
      "Ons op elk moment vragen ze te verwijderen",
      "Ons vragen te stoppen met contact opnemen",
    ],
  },
  { paras: ["Om dat te doen, mail je ons gewoon op joey@getfasteradmin.com"] },
  {
    heading: "7. Bewaartermijn",
    paras: [
      "Word je klant, dan bewaren we je projectbestanden, naam en contactgegevens voor referentie en verdere samenwerking. Zo niet, dan verwijderen we alle aanvraaggerelateerde gegevens na 12 maanden.",
      "We bewaren nooit iets langer dan nodig.",
    ],
  },
  {
    heading: "8. Wijzigingen in dit beleid",
    paras: [
      "We kunnen deze pagina van tijd tot tijd bijwerken. Als we dat doen, plaatsen we de wijzigingen hier en werken we de datum ‘laatst bijgewerkt’ hieronder bij.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy"
      intro="Of je nu op de site rondkijkt of contact opneemt over een project, dit beleid beschrijft hoe we met je gegevens omgaan."
      blocks={blocks}
      updated="Laatst bijgewerkt: augustus 2026"
      locale="nl"
    />
  );
}
