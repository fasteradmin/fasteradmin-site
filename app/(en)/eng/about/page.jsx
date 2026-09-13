import Image from "next/image";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";

/**
 * English /eng/about. Copy replaced 2026-09-13 with a shorter, single
 * essay, given verbatim. 2026-09-13: office banner image removed, team
 * grid given its own heading, and the "How we work"/"What we hold
 * ourselves to" paragraphs moved below the team photos per follow-up
 * feedback. Mirrors app/(nl)/about/page.jsx.
 */
export const metadata = pageMetadata({
  path: "/eng/about",
  title: "About FasterAdmin",
  description:
    "FasterAdmin builds the operations systems that let a company take on more work without adding the headcount to do it.",
  languages: { nl: "/about", en: "/eng/about", "x-default": "/about" },
});

const team = [
  { name: "Joey Tan", role: "Founder", img: "cikrWotQJls4kqizrkcGapqI25k.png" },
  { name: "Sarah de Bree", role: "Automations Engineer", img: "Tkeu4Z25LmXvGufjWDp2YIp6PuY.png" },
  { name: "Dennis van der Molen", role: "Automations Engineer", img: "wBiVNcycdYsmtEfv9F6zAl06eF4.png" },
];

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
              We work with owners of 10-to-40-person firms who have outgrown their back
              office: the work still runs through spreadsheets, inboxes and one or two
              people&apos;s memory, and the owner has become the bottleneck for it. We build
              the system that takes that load off the desk, into the tools the company
              already uses.
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

      <section className="bg-surface-alt py-20 lg:py-24">
        <div className="container-site">
          <Reveal as="h2" className="h-section text-navy">
            Your Team of Experts
          </Reveal>

          <Reveal className="mt-10 grid gap-8 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.name}>
                <Image
                  src={`/img/${m.img}`}
                  alt={m.name}
                  width={800}
                  height={800}
                  className="h-auto w-full rounded-[var(--radius-card)] object-cover"
                />
                <p className="mt-4 text-lg font-medium text-navy">{m.name}</p>
                <p className="text-sm text-grey-600">{m.role}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="body-base mt-12 max-w-2xl space-y-5 text-grey-600">
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
          </Reveal>
        </div>
      </section>

      <MeetingSection />
      <ContactSection minimal />
    </>
  );
}
