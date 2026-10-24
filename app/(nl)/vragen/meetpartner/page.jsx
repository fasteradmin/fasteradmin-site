import VragenMeetPartner from "@/components/VragenMeetPartner";
import { pageMetadata } from "@/lib/seo";

/**
 * Tijdelijke klantpagina: de vragenlijst fase 2 voor MeetPartner (Lodi),
 * achter een toegangscode die de n8n-workflow controleert. Niet in het menu,
 * niet in de sitemap, noindex. Kan weg zodra alle vragen beantwoord zijn; de
 * antwoorden staan dan in Airtable (klantvragen_fase2).
 */
export const metadata = pageMetadata({
  path: "/vragen/meetpartner",
  title: "Vragenlijst fase 2 | MeetPartner",
  description: "Vragenlijst voor de planning van fase 2. Alleen met toegangscode.",
  locale: "nl_NL",
  noIndex: true,
});

export default function VragenMeetPartnerPage() {
  return <VragenMeetPartner />;
}
