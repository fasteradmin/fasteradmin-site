import { pageMetadata } from "@/lib/seo";
import PilotPage from "./PilotPage";

export const metadata = pageMetadata({
  path: "/pilot-bouw-installatie-flevoland",
  title: "Pilot voor bouw- en installatiebedrijven | FasterAdmin",
  description:
    "Halveer de tijd van offreren & calculeren of werkvoorbereiding. Of je geld terug. Pilot voor drie bouw- en installatiebedrijven in Flevoland.",
  locale: "nl_NL",
  // Alleen bereikbaar via de link in de pilot-outreach: niet in menu of sitemap, niet in zoekmachines.
  noIndex: true,
});

export default function PilotBouwInstallatiePage() {
  return <PilotPage theme="site" />;
}
