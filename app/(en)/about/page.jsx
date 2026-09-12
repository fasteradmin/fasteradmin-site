import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "About | FasterAdmin.com",
  description:
    "FasterAdmin builds the operations systems that let a 20-50 person company handle more work without hiring for it.",
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
          <p className="eyebrow text-grey-600">Who builds this</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">
            FasterAdmin builds the operations systems that let a 20-50 person company handle
            more work without hiring for it.
          </h1>

          <div className="body-base mt-10 max-w-2xl space-y-5 text-grey-600">
            <p>
              We&apos;re three people, in Amsterdam. No subcontractors, no outsourced build.
              The same people who scope your work build it, test it and stay for hypercare
              after it goes live.
            </p>
          </div>

          <Button href="/eng/#section-meeting" className="mt-10">
            Book The Ops Call
          </Button>
        </div>

        <Image
          src="/img/S8xogGWl7nZ0sT4esjnF1QeUkWg.png"
          alt="The FasterAdmin team at work"
          width={1200}
          height={673}
          className="h-auto w-full"
        />
      </section>

      <section className="bg-surface-alt py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">The team</p>

          <div className="body-base mt-8 max-w-2xl space-y-5 text-grey-600">
            <p>
              Joey Tan, founder, ran Meta ads at scale for multi-million euro D2C brands, then
              worked as Marketing Director at an attribution platform, before building the
              n8n, Airtable and Supabase systems himself. Most automation shops are one half
              of that or the other: people who understand the business problem and hand off
              the build, or builders who take a spec without questioning it.
            </p>
            <p>
              Sarah de Bree and Dennis van der Molen are the Automations Engineers who build
              and test what gets scoped. The people on your call are the people writing the
              workflow.
            </p>
            <p>
              What we&apos;ve actually built for other companies is on{" "}
              <Link href="/works" className="text-brand hover:underline">
                our work page
              </Link>
              , not repeated here.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
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
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">How it starts</p>

          <div className="body-base mt-8 max-w-2xl space-y-5 text-grey-600">
            <p>
              A short call to hear how work moves today. A paid scope, one working session,
              that maps where time and money are actually going. Then a build, quoted and
              dated in writing, that we stay on through hypercare after go-live.
            </p>
          </div>

          <Button href="/eng/#section-meeting" variant="brand" className="mt-10">
            Book The Ops Call — 20 Minutes, No Pitch
          </Button>
        </div>
      </section>

      <MeetingSection />
      <ContactSection minimal />
    </>
  );
}
