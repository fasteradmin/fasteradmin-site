import Faq from "@/components/Faq";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/home/Hero";
import ProblemEn from "@/components/home/ProblemEn";
import Mechanism from "@/components/home/Mechanism";
import ProofCupcake from "@/components/home/ProofCupcake";
import ProofMeetPartner from "@/components/home/ProofMeetPartner";
import OfferLadder from "@/components/home/OfferLadder";
import Pricing from "@/components/home/Pricing";
import { pageMetadata } from "@/lib/seo";

/**
 * This used to be the site's actual homepage at "/". It moved here verbatim
 * when Dutch became the default at "/" (see app/(nl)/page.jsx) — same title,
 * same description, same content, only the path and the hreflang pair are
 * new.
 *
 * Composed from the same components/home/* files as the Dutch homepage,
 * each defaulting to `locale="en"` — this file supplies no copy of its own,
 * it only decides which sections exist and in what order, so the two
 * languages can never drift out of structural sync by accident.
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
      <ProblemEn />
      <Mechanism />
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
