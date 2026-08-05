import Image from "next/image";
import Button from "@/components/Button";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "About | FasterAdmin.com",
  description:
    "Faster Admin is an automation agency in Amsterdam. We help service businesses stop running their back office by hand by connecting the tools they already use.",
};

const automations = [
  "Customer requests, forms and email intake",
  "Quotes, approvals, follow-ups",
  "Dispatch, job packs and customer updates",
  "Hours, approvals and invoicing",
  "Payment reminders, receipts and reconciliation",
];

const team = [
  { name: "Joey Tan", role: "Founder", img: "cikrWotQJls4kqizrkcGapqI25k.png" },
  { name: "Sarah de Bree", role: "Automations Engineer", img: "Tkeu4Z25LmXvGufjWDp2YIp6PuY.png" },
  { name: "Dennis van der Molen", role: "Automations Engineer", img: "wBiVNcycdYsmtEfv9F6zAl06eF4.png" },
];

const steps = [
  { n: "01", title: "Thorough analysis", body: "We look at your current tools and process and identify where time is leaking." },
  { n: "02", title: "System design", body: "We map the flow and define the rules, statuses, and approvals. This becomes your “single source of truth." },
  { n: "03", title: "Build and connect", body: "We connect your tools, transform data where needed, and install the automations." },
  { n: "04", title: "Test and launch", body: "We run real scenarios, handle edge cases, and ship a stable workflow." },
  { n: "05", title: "Improve and expand", body: "Once the core is running, we add modules based on ROI." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-grey-150">
        <div className="container-site py-20 lg:py-28">
          <p className="eyebrow text-grey-600">About us</p>
          <h1 className="h-display mt-4 max-w-3xl text-navy">
            Systems that minimize manual admin.
          </h1>

          <div className="body-base mt-10 max-w-2xl space-y-5 text-grey-600">
            <p>
              Faster Admin is an automation agency in Amsterdam. We help service businesses stop
              running their back office by hand by connecting the tools they already use, then
              turning repetitive work into automated workflows.
            </p>
            <p>
              If your week is full of copy-paste, chasing approvals, rebuilding invoices, and
              following up on quotes and payments, you don’t need more tools.
            </p>
            <p className="text-navy">You need your tools to work together.</p>
          </div>

          <Button href="/#section-meeting" className="mt-10">
            Discover more
          </Button>
        </div>

        <Image
          src="/img/S8xogGWl7nZ0sT4esjnF1QeUkWg.png"
          alt="The Faster Admin team at work"
          width={1200}
          height={673}
          className="h-auto w-full"
        />
      </section>

      <section className="bg-grey-200 py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Who we are</p>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="h-section text-navy">We build systems that multiply your time.</h2>

              <div className="body-base mt-8 max-w-xl space-y-5 text-grey-600">
                <p>
                  Most businesses already have the right software. The problem is the gaps between
                  them. That’s where time disappears, errors happen, and jobs get stuck.
                </p>
                <p>
                  We design and install automation systems that connect your stack into one flow.
                  Work moves forward automatically, while you spend your time doing the things you
                  like.
                </p>
              </div>
            </div>

            <div>
              <p className="text-base font-medium text-navy">What we typically automate:</p>
              <ul className="mt-6 space-y-3">
                {automations.map((a) => (
                  <li
                    key={a}
                    className="rounded-[40px] bg-white px-6 py-4 text-sm text-navy"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-3">
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
          <p className="eyebrow text-grey-600">Do less, get more done</p>
          <h2 className="h-section mt-4 text-navy">How we work</h2>

          <div className="mt-16 space-y-10">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-8 border-b border-grey-200 pb-10 last:border-0">
                <span className="text-3xl font-bold tracking-[-0.05em] text-brand">{s.n}</span>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.03em] text-navy">{s.title}</h3>
                  <p className="body-base mt-3 max-w-xl text-grey-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MeetingSection />
      <ContactSection />
    </>
  );
}
