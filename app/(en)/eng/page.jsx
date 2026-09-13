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
 * This used to be the site's actual homepage at "/". It moved here verbatim
 * when Dutch became the default at "/" (see app/(nl)/page.jsx).
 *
 * Got the same 2026-09 restyle as the Dutch side on this pass: the old
 * two-column receipt-image Hero and the old ProblemEn + 5-step Mechanism
 * sections are retired in favour of the full-bleed Hero and the four-part
 * Manifesto (problem grid, quote, system pitch, "not for everyone" band),
 * both shared components taking a `locale` prop like everything else here.
 * ProblemEn.jsx and Mechanism.jsx are now unused by either homepage — left
 * in place rather than deleted, in case old content needs recovering.
 *
 * Composed from the same components/home/* files as the Dutch homepage —
 * this file supplies no copy of its own, it only decides which sections
 * exist and in what order, so the two languages can never drift out of
 * structural sync by accident.
 */
export const metadata = pageMetadata({
  path: "/eng",
  title: "FasterAdmin.com | Get the work done, without the hire you can't make",
  description:
    "We put AI where someone has to read something and decide, and reliable code everywhere else, so it keeps running after go-live.",
  languages: { nl: "/", en: "/eng", "x-default": "/" },
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ProofCupcake />
      <ProofMeetPartner />
      <OfferLadder />
      <Pricing />
      <Faq />
      <MeetingSection />
      <ContactSection minimal />
    </>
  );
}
