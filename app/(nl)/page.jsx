import Faq from "@/components/Faq";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Mechanism from "@/components/home/Mechanism";
import ProofCupcake from "@/components/home/ProofCupcake";
import ProofMeetPartner from "@/components/home/ProofMeetPartner";
import OfferLadder from "@/components/home/OfferLadder";
import Pricing from "@/components/home/Pricing";
import { pageMetadata } from "@/lib/seo";

/**
 * Dutch homepage. Copy is verbatim from
 * outputs/2026-09-12-fasteradmin-SITE-COPY-complete.md, the current single
 * source of truth (supersedes the earlier
 * 2026-09-12-fasteradmin-website-dutch-copy.md this page originally shipped
 * from — the manifesto section and the mechanism intro's deduped stat are
 * new in this pass, everything else is unchanged).
 *
 * Composed from components/home/* rather than written inline: each section
 * is its own file, taking a `locale` prop, shared with app/(en)/eng/page.jsx.
 * A restyle only has to touch these files, not rewrite the page — the
 * explicit point of this structure, since a visual redesign is coming
 * separately as a restyle, not a rebuild. Kept deliberately plain for the
 * same reason: no new bespoke styling here for a redesign to have to undo,
 * every section reuses the same classes already live elsewhere on the site.
 */
export const metadata = pageMetadata({
  path: "/",
  title: "FasterAdmin.com | Het werk gedaan. Zonder er iemand voor aan te nemen.",
  description:
    "We zetten AI in waar iemand iets moet lezen en beslissen, en betrouwbare code voor de rest. Zodat het blijft werken na oplevering.",
  locale: "nl_NL",
  languages: { nl: "/", en: "/eng", "x-default": "/" },
});

export default function HomePage() {
  return (
    <>
      <Hero locale="nl" />
      <Manifesto />
      <Mechanism locale="nl" />
      <ProofCupcake locale="nl" />
      <ProofMeetPartner locale="nl" />
      <OfferLadder locale="nl" />
      <Pricing locale="nl" />
      <Faq locale="nl" />
      <MeetingSection locale="nl" />
      <ContactSection minimal locale="nl" />
    </>
  );
}
