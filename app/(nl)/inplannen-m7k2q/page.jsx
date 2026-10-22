import { pageMetadata } from "@/lib/seo";
import MichelBookingWidget from "./MichelBookingWidget";

// Interne pagina voor Michel, de beller (2026-10-22). Niet in menu of sitemap,
// niet in zoekmachines; alleen bereikbaar via de link die Michel van Joey krijgt.
export const metadata = pageMetadata({
  path: "/inplannen-m7k2q",
  title: "Afspraak inplannen | FasterAdmin",
  description: "Interne pagina om een kennismaking in Joeys agenda te zetten.",
  locale: "nl_NL",
  noIndex: true,
});

export default function InplannenMichelPage() {
  return (
    <section className="bg-grey-50">
      <div className="container-site max-w-3xl py-16 lg:py-24">
        <h1 className="h-display text-navy">Afspraak inplannen</h1>
        <div className="body-base mt-6 space-y-3 text-grey-600">
          <p>
            Op deze pagina plan je een kennismaking in de agenda van Joey Tan. Kies het type
            afspraak, een datum en een tijd, en vul de gegevens van de klant in. Alleen tijden
            waarop Joey beschikbaar is worden getoond; bij een afspraak op locatie is de reistijd
            meegerekend.
          </p>
          <p>
            De klant ontvangt direct een agenda-uitnodiging met een persoonlijk bericht van Joey.
            Notities zijn alleen zichtbaar voor Joey en worden niet in de uitnodiging opgenomen.
          </p>
        </div>
        <div className="mt-10">
          <MichelBookingWidget />
        </div>
      </div>
    </section>
  );
}
