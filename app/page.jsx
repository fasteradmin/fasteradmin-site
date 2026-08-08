import Image from "next/image";
import Button from "@/components/Button";
import Faq from "@/components/Faq";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";

const mechanismSteps = [
  {
    n: "01",
    title: "Map where the work actually goes",
    body: "Not where you assume it goes. We walk through requests, handoffs and approvals until we can see exactly where time and accuracy are lost.",
  },
  {
    n: "02",
    title: "Design the system before buying anything new",
    body: "Most of what's broken isn't a missing tool. It's two tools that were bought to talk to each other and never actually got connected.",
  },
  {
    n: "03",
    title: "Build and connect what you already use",
    body: "No new software to learn and no data migration, we build into the tools you already have open.",
  },
  {
    n: "04",
    title: "Test it on real cases, not a demo",
    body: "Including the edge cases that normally surface three months in, after something has already gone wrong for a real customer.",
  },
  {
    n: "05",
    title: "Go live on a date in writing, then stay",
    body: "Two to four weeks of hypercare after launch, so the system isn't the thing nobody owns six months from now.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="bg-white">
        <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="eyebrow text-grey-600">Reliable AI for your operations mess</p>
            <h1 className="h-display mt-4 text-navy">
              Get the work done, without the hire you can&apos;t make.
            </h1>

            <p className="body-base mt-8 max-w-md text-grey-600">
              We put AI where someone has to read something and decide, and reliable code
              everywhere else, so it keeps running after go-live.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/#section-meeting">Book The Ops Call — 20 Minutes, No Pitch</Button>
              <Button href="/#section-proof" variant="outline">
                See a system that caught what a human missed
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/img/faNLtVTXBShF52wn70kNNP3y0k.png"
              alt="A receipt itemising the hours lost to manual admin tasks"
              width={871}
              height={1084}
              priority
              className="h-auto w-full max-w-[360px] lg:max-h-[460px] lg:w-auto lg:max-w-none"
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Problem */}
      <section className="bg-surface-alt py-24 lg:py-32">
        <div className="container-site">
          <h2 className="h-section max-w-3xl text-navy">
            You&apos;re not short on tools. You&apos;re short on people.
          </h2>

          <div className="body-base mt-8 max-w-2xl space-y-5 text-grey-600">
            <p>
              Ask most owners at this size how the back office is running and the answer is
              some version of &quot;it&apos;s a mess.&quot; Four out of five companies
              we&apos;ve talked to opened with exactly that word.
            </p>
            <p>
              A request comes in by email or WhatsApp. Someone reads it, then retypes the
              same details into three different tools by hand. Somewhere in that stack is
              probably a tool you already paid for to fix exactly this, sitting there
              unconnected to everything else. The week&apos;s plan lives in a spreadsheet, or
              in one person&apos;s head, and it only updates when that person remembers to.
            </p>
            <p className="text-navy">
              You can&apos;t fix this by hiring. Most Dutch companies at this size can&apos;t
              fill the role that would fix it, which is why automation ends up first on the
              list, not somewhere down it.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Mechanism */}
      <section className="bg-white py-24 lg:py-32">
        {/* Stacked on mobile, two columns from lg. minmax(0,…) on both tracks
            is what stops the intro clipping — grid children default to
            min-width:auto and refuse to shrink below their content. */}
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-grey-600">Five steps, in this order, every time</p>

            <p className="body-base mt-6 text-grey-600">
              This isn&apos;t an AI agency pitch. AI use among Dutch small businesses roughly
              doubled to 70% this past year, but more than half of that is someone writing text
              or generating images. Here, AI goes exactly where a person would otherwise have to
              read something and decide. Everything else runs as ordinary, testable code.
            </p>
          </div>

          <div className="space-y-10 lg:mt-0">
            {mechanismSteps.map((s) => (
              <div key={s.n} className="flex gap-6 sm:gap-8">
                <span className="text-4xl font-bold tracking-[-0.05em] text-brand">{s.n}</span>
                <div className="min-w-0">
                  <h3 className="text-xl font-medium tracking-[-0.03em] text-navy">{s.title}</h3>
                  <p className="body-base mt-3 text-grey-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Proof (Cupcake leads) */}
      <section className="bg-surface-alt">
        <div className="container-site py-24 lg:py-28">
          <p className="eyebrow text-ink-muted">Proof, not promises</p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-navy">
            8+ hours saved a week. 3 weeks to build.
          </p>

          <blockquote className="mt-4 max-w-3xl text-2xl font-medium italic leading-tight tracking-[-0.03em] text-navy md:text-[34px]">
            “Not only did I go from 2-3+ hours to less than 1 hour of admin a day (answering emails,
            sending offers, etc.). More importantly, I don&apos;t have the worry of &quot;Did I miss
            something or did I do it correct?&quot;
          </blockquote>

          <div className="mt-12 flex items-center gap-4">
            <Image
              src="/img/QfOGeqDA89lvkdBlJgLaqQuQY.jpeg"
              alt="Alexander Cordova"
              width={64}
              height={64}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div>
              <p className="text-base font-medium text-navy">Alexander Cordova</p>
              <p className="text-xs font-semibold text-ink-muted">Marketing Specialist, Cupcake STHLM</p>
            </div>
          </div>

          <Button href="/works/email-to-quote-system" className="mt-12">
            Discover how he did it
          </Button>
        </div>
      </section>

      {/* ------------------------------------------- Proof (MeetPartner, second) */}
      <section id="section-proof" className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-ink-muted">Not just faster</p>

          <h2 className="h-section mt-4 max-w-2xl text-navy">
            An invoice can be internally perfect and still be wrong
          </h2>

          <div className="body-base mt-8 max-w-2xl space-y-5 text-ink-muted">
            <p>
              Freelancers on MeetPartner&apos;s survey teams submit their own weekly invoice.
              One of them was flawless on its own terms: the math was right, the line items
              added up, and the declared total matched his own numbers exactly. Every check
              that looks at the paperwork alone would pass it.
            </p>
            <p>
              Only one thing disagreed with it: MeetPartner&apos;s own independent
              time-tracking record, which the invoice itself never touches. Catching that
              means checking against a third source, not against itself.
            </p>
            <p className="text-navy">
              This runs as a paid, ongoing engagement, not a one-off build.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Offer ladder */}
      <section className="bg-surface-alt py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">How we start working together</p>
          <h2 className="h-section mt-4 max-w-2xl text-navy">
            Four steps, no long contract up front
          </h2>

          <ol className="mt-12 max-w-2xl space-y-10">
            <li>
              <p className="text-lg font-medium text-navy">1. The Ops Call</p>
              <p className="body-base mt-2 text-grey-600">
                20 to 30 minutes. No pitch. You walk us through how work moves today and
                where it gets stuck.
              </p>
            </li>
            <li>
              <p className="text-lg font-medium text-navy">2. The paid scope</p>
              <p className="body-base mt-2 text-grey-600">
                One working session, 60 to 90 minutes. You leave owning a document: where work
                actually flows now, what those hours cost, a ranked list of what to fix first,
                what not to automate, and a fixed price and go-live date for the first build.
                Delivered within <strong>5 working days</strong> of the session.
              </p>
            </li>
            <li>
              <p className="text-lg font-medium text-navy">3. The build</p>
              <p className="body-base mt-2 text-grey-600">
                Quoted at the scope and held at that price through delivery, go-live date in
                writing.
              </p>
              <p className="body-base mt-3 text-grey-600">
                If it doesn&apos;t do what the scope said it would by that date, we keep
                working until it does. No extra charge, no new scope. The scope document is
                the definition of done: that&apos;s what bounds the promise and keeps it from
                becoming unlimited rework.
              </p>
            </li>
            <li>
              <p className="text-lg font-medium text-navy">4. Hypercare</p>
              <p className="body-base mt-2 text-grey-600">
                Two to four weeks after go-live, so someone still owns the system while it
                beds in. A retainer after that, if you want one.
              </p>
            </li>
          </ol>

          <Button href="/#section-meeting" variant="brand" className="mt-12">
            Book The Ops Call — 20 Minutes, No Pitch
          </Button>
        </div>
      </section>

      {/* --------------------------------------------------------- Pricing */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Pricing</p>
          <h2 className="h-section mt-4 max-w-2xl text-navy">Two numbers, no rate card</h2>

          <div className="mt-10 max-w-2xl space-y-8">
            <div>
              <p className="text-lg font-medium text-navy">The paid scope</p>
              <p className="body-base mt-2 text-grey-600">
                EUR 1,500, fixed. One working session, a document you own outright, delivered
                within 5 working days.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-navy">The build</p>
              <p className="body-base mt-2 text-grey-600">
                Typically EUR 10,000 to EUR 20,000, fixed at the scope stage and held through
                delivery. The number depends on what the scope finds, not on hours worked.
              </p>
            </div>
          </div>

          <p className="body-base mt-10 max-w-2xl text-grey-600">
            No hourly rate. A fixed price with a guarantee attached to it answers a different
            question than an hourly one does: not how many hours this takes, but what it costs
            to fix.
          </p>
        </div>
      </section>

      <Faq />
      <MeetingSection />
      <ContactSection minimal />
    </>
  );
}
