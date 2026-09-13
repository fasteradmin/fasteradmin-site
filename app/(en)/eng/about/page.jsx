import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";

/**
 * English /eng/about. Copy replaced 2026-09-13 with a shorter, single
 * essay — given verbatim, no longer the team-bio + "how it starts" layout
 * from the previous pass. The team photo grid and the "How it starts"
 * section are gone with it: nothing in the new copy corresponds to them.
 * MeetingSection/ContactSection stay, matching every other page. Mirrors
 * app/(nl)/about/page.jsx structurally.
 */
export const metadata = pageMetadata({
  path: "/eng/about",
  title: "About FasterAdmin",
  description:
    "FasterAdmin builds the operations systems that let a company take on more work without adding the headcount to do it.",
  languages: { nl: "/about", en: "/eng/about", "x-default": "/about" },
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <Reveal as="h1" className="h-display max-w-3xl text-navy">
            About FasterAdmin
          </Reveal>

          <Reveal className="body-base mt-8 max-w-2xl space-y-5 text-grey-600">
            <p>
              FasterAdmin builds the operations systems that let a company take on more work
              without adding the headcount to do it.
            </p>
            <p>
              We work with owners of 20-to-50-person firms who have outgrown their back
              office: the work still runs through spreadsheets, inboxes and one or two
              people&apos;s memory, and the owner has become the bottleneck for it. We build
              the system that takes that load off the desk, into the tools the company
              already uses.
            </p>
            <p>
              <span className="font-semibold text-navy">How we work.</span> Every engagement
              is scoped, built and tested by the people you deal with directly. Nothing is
              offshored, and nothing is handed to a subcontractor. The person who
              understands your business is the person who builds it, which is also why we
              take on a limited number of engagements at a time.
            </p>
            <p>
              <span className="font-semibold text-navy">What we hold ourselves to.</span> A
              fixed price, agreed before the build begins. A go-live date in writing. And one
              standard behind both: if the system does not do what the scope said it would
              by that date, we keep working until it does, at no extra charge.
            </p>
            <p>
              <span className="font-semibold text-navy">Based in Amsterdam.</span> We take on
              work where we can be decisive about the outcome, and we are candid when a
              build is not the answer.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <Button href="/eng/#section-meeting">Book The Ops Call</Button>
          </Reveal>
        </div>
      </section>

      <MeetingSection />
      <ContactSection minimal />
    </>
  );
}
