import Faq from "@/components/Faq";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import ProofCupcake from "@/components/home/ProofCupcake";
import ProofMeetPartner from "@/components/home/ProofMeetPartner";
import OfferLadder from "@/components/home/OfferLadder";
import Pricing from "@/components/home/Pricing";
import { pageMetadata } from "@/lib/seo";

/**
 * Dutch homepage.
 *
 * Restyled 2026-09 from the original long-form plain-prose layout (5-step
 * Mechanism section, single-column Manifesto essay) to the art-directed
 * version built and iterated as a Claude Design artifact: a 3-card problem
 * grid, a pull-quote band, a two-column system pitch, a dark "not for
 * everyone" band (all now inside Manifesto.jsx), a mechanism diagram inside
 * ProofMeetPartner, and the four-step offer ladder with new pricing figures.
 * Mechanism.jsx (the old 5-step method) is no longer used on this page —
 * its content has no equivalent in the new structure — but the file is left
 * in place since app/(en) doesn't reference it either way.
 *
 * Composed from components/home/* rather than written inline: each section
 * is its own file, taking a `locale` prop, shared with app/(en)/eng/page.jsx.
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
