import Image from "next/image";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title:
    "Cupcake STHLM - How We Save A Bakery 40h+ A Month With Email Order Handling Automation",
  description:
    "From 2-3 hours of manually replying to emails and copy/pasting details into their invoicing system, to less than 1 hour a day.",
};

const relevantIf = [
  "Most of your jobs start with a custom request by email or WhatsApp",
  "You manually copy the same details into: quotes, invoices / accounting, internal planning",
  "You sometimes send offers later than you’d like, simply because you were on site all day",
  "A lot of your “system” lives in your head, and if you’re tired or busy, things slip",
];

const before = [
  "Before automation... every email had to first be read carefully and “decoded”",
  "Customer name, company, date, time, address, invoice details, products and quantities were copied by hand",
  "Offers were created manually in Fortnox and downloaded as PDF",
  "Every email written back to the client manually",
  "If they didn’t stay on top of it, orders or confirmations would slip through",
];

const after = [
  "With automation... every email is instantly analysed and details are stored in their own record and designated fields",
  "Create or link the customer in his invoicing tool Fortnox",
  "Create the offer in Fortnox with correct details instantly",
  "Generate a PDF offer and store it neatly in Google Drive",
  "Generate a draft email that recaps everything and links to the PDF",
];

const built = [
  "Incoming emails are turned into structured requests",
  "Fortnox offers and PDF files are created with one click",
  "Draft reply emails are generated automatically and just need approval",
  "The email has a button so the customer can accept, decline or change their order",
  "Once accepted, the customer and everyone involved in the company is notified.",
];

const outcomes = [
  {
    title: "No more worry",
    body: "The biggest win for the client is the relief of constant worry. Laying awake at night worrying if he made mistakes, if he missed anything and if everyone is up to date.",
  },
  {
    title: "No mistakes, nothing forgotten",
    body: "With the new system they knows that in the flow of receiving an order, to confirming and letting the chef know when to make what. Every task is always done, and done correctly. No exceptions.",
  },
  {
    title: "Saved 8h+/week",
    body: "They went from 30–40 minutes per email inquiry to sending 5 offers in 1 hour, without hiring anyone. Less back-and-forth, fewer manual steps, faster turnaround. That time goes back into sales, customers, and growing the business.",
  },
];

export default function CaseStudyPage() {
  return (
    <>
      <section className="bg-grey-150">
        <div className="container-site py-20 lg:py-28">
          <dl className="flex flex-wrap gap-x-16 gap-y-6">
            <Meta label="Client" value="Cupcake STHLM" />
            <Meta label="Duration" value="3 Weeks" />
            <Meta label="Date" value="Nov 14, 2025" />
            <Meta label="#" value="automation" icon="Fi1knLppTjSuF6gbXIU0LmembU.png" />
          </dl>

          <h1 className="h-display mt-12 max-w-4xl text-navy">
            How We Save A Bakery 40h+ A Month With Email Order Handling Automation
          </h1>

          <div className="body-base mt-10 max-w-2xl space-y-5 text-grey-600">
            <p>
              From 2-3 hours of manually replying to emails, copy/pasting new customer details and
              offer details into their invoicing system.
            </p>
            <p>
              A workflow where mistakes easily sneaked in and constant worry on his mind if he
              missed anything…
            </p>
            <p>
              To less than 1 hour a day and the peace of mind that everything is always done, and
              more importantly, done correctly.
            </p>
            <p className="text-navy">
              You might not be a bakery, but if you recognize this problem... This could be the best
              thing you read this week.
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/img/E3t6xiZKtDSALPz4EIJr6AwxM8.png"
        alt="Cupcake STHLM"
        width={2000}
        height={1339}
        priority
        className="h-auto w-full"
      />

      {/* Walkthrough video */}
      <section className="bg-grey-200 py-16">
        <div className="container-site">
          <div className="overflow-hidden rounded-[var(--radius-block)] bg-black">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/O67qwb_2FF8?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1"
                title="Cupcake STHLM case study walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <p className="body-base mt-6 text-grey-600">
            Introduction: 00:00 - 03:00
            <br />
            Case study: 03:00 - 10:27
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-brand">
        <div className="container-site py-20">
          <blockquote className="max-w-3xl text-2xl font-medium italic leading-tight tracking-[-0.03em] text-white md:text-[32px]">
            “Not only did I go from 2-3+ hours to less than 1 hour of admin a day (answering emails,
            sending offers, etc.). More importantly, I don&apos;t have the worry of &quot;Did I miss
            something or did I do it correct?&quot;
          </blockquote>

          <div className="mt-10 flex items-center gap-4">
            <Image
              src="/img/QfOGeqDA89lvkdBlJgLaqQuQY.jpeg"
              alt="Alexander Cordova"
              width={64}
              height={64}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div>
              <p className="text-base font-medium text-white">Alexander Cordova</p>
              <p className="text-xs font-semibold text-accent">Marketing Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* Relevance */}
      <section className="bg-grey-200 py-24">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Recognise these problems?</p>
          <h2 className="h-section mt-4 text-navy">This case is relevant if…</h2>

          <ul className="mt-10 max-w-3xl space-y-3">
            {relevantIf.map((r) => (
              <li key={r} className="rounded-[40px] bg-white px-6 py-4 text-sm text-navy">
                {r}
              </li>
            ))}
          </ul>

          <div className="body-base mt-10 max-w-2xl space-y-4 text-grey-600">
            <p>
              Even though this is a bakery, the pattern is the same as in many MKB service
              businesses:
            </p>
            <p className="text-navy">
              Plumbers, electricians, installation services, surveying, etc.
            </p>
            <p>
              Note that, in this case, the client used Fortnox as their invoicing tool. This can
              easily be replaced by most other invoicing tools.
            </p>
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="bg-white py-24">
        <div className="container-site">
          <h2 className="h-section text-navy">Time saved and invested elsewhere</h2>

          <div className="body-base mt-8 max-w-2xl space-y-4 text-grey-600">
            <p>
              They don’t need to write emails and offers from scratch anymore, they just review and
              approve what the system prepared.
            </p>
            <p>
              Offers now go out faster and more consistently, and the overall mental load has
              dropped because everyone involved — owner, baker, and client — are always up to date
              of the order and the status.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {["pBE2bCgpZLUQ3shCtPcpAcNbY.png", "YjvCUqbBc1LZcclnQ3keRNb2c.png", "ykCpgwuuW1w2QJ6QBJqSVMPpQw.png", "SujTQ9gIkBEtLtzS0omEPoW4WsE.png"].map((f) => (
              <Image
                key={f}
                src={`/img/${f}`}
                alt=""
                width={704}
                height={1000}
                className="h-auto w-full rounded-[var(--radius-card)]"
              />
            ))}
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Panel
              title="Long boring hours"
              items={before}
              tone="muted"
              img="kOxX0Fj00H0IQqmXMrdMaW1Bo.png"
            />
            <Panel
              title="Done for you"
              items={after}
              tone="brand"
              img="ILYMXCofMk9NRNF0O8aD4DIVM.png"
            />
          </div>
        </div>
      </section>

      {/* What we built */}
      <section className="bg-ink py-24">
        <div className="container-site">
          <h2 className="h-section text-white">What we actually built</h2>
          <p className="mt-6 text-xl text-brand">Core idea: Turn email chaos into a clean pipeline</p>

          <div className="body-base mt-8 max-w-2xl space-y-4 text-grey-400">
            <p>
              We created a central base in a program called Airtable (think Google Sheets or Excel
              2.0) where all information is stored and controlled in a custom designed interface.
            </p>
            <p>
              From here the client controls what happens in Outlook and in their invoicing tool,
              Fortnox.
            </p>
          </div>

          <ul className="mt-10 max-w-3xl space-y-3">
            {built.map((b) => (
              <li
                key={b}
                className="rounded-[40px] border border-white/10 bg-white/5 px-6 py-4 text-sm text-white"
              >
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-12 space-y-6">
            {["OWQd0knaPaGXr3DsQi9eNDHwss4.png", "nnhv9i3Fm3z8Xzwy3h7RxFrm68.png"].map((f) => (
              <Image
                key={f}
                src={`/img/${f}`}
                alt="The Airtable interface built for Cupcake STHLM"
                width={3000}
                height={1494}
                className="h-auto w-full rounded-[var(--radius-card)]"
              />
            ))}
          </div>

          <div className="body-base mt-10 max-w-2xl space-y-4 text-grey-400">
            <p>
              By just clicking a few buttons the client generates emails, registers new clients and
              creates offers.
            </p>
            <p>
              All while keeping full control thanks to built-in human control &amp; approval steps.
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-grey-200 py-24">
        <div className="container-site">
          <h2 className="h-section text-navy">Key Outcomes</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.title} className="rounded-[var(--radius-card)] bg-white p-8">
                <h3 className="h-card text-navy">{o.title}</h3>
                <p className="body-base mt-4 text-grey-600">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}

function Meta({ label, value, icon }) {
  return (
    <div>
      <dt className="eyebrow text-grey-500">{label}</dt>
      <dd className="mt-1 flex items-center gap-2 text-base font-medium text-navy">
        {icon && <Image src={`/img/${icon}`} alt="" width={20} height={20} />}
        {value}
      </dd>
    </div>
  );
}

function Panel({ title, items, tone, img }) {
  return (
    <div className="rounded-[var(--radius-block)] bg-grey-150 p-8">
      {img && (
        <Image
          src={`/img/${img}`}
          alt=""
          width={1832}
          height={1832}
          className="mb-8 h-auto w-full rounded-[var(--radius-card)]"
        />
      )}
      <h3 className={`h-card ${tone === "brand" ? "text-brand" : "text-grey-500"}`}>{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((i) => (
          <li key={i} className="body-base flex gap-3 text-navy">
            <span aria-hidden className={tone === "brand" ? "text-brand" : "text-grey-500"}>
              •
            </span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
