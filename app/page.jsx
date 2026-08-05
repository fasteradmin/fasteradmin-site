import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Faq from "@/components/Faq";
import MeetingSection from "@/components/MeetingSection";
import ContactSection from "@/components/ContactSection";
import SolutionSystem from "@/components/home/SolutionSystem";

const painPoints = [
  "You calculate in Excel, because you have unique calculations",
  "You use separate tools that don't communicate back and forth",
  "You copy/paste customers and product items to create invoices",
  "You do your planning in Excel and it's only visible to you",
  "...A thousand other manual checks and moving data from one tool to another",
];

const principles = [
  {
    n: "01",
    title: "Your tools aren’t the problem, the disconnect between them is",
    body: "Every handoff forces you to copy-paste, double-check, and chase missing info, that’s where hours disappear and mistakes get billed.",
  },
  {
    n: "02",
    title: "We connect what you already use",
    body: "One central automation layer (n8n) pulls data from Tool A, verifies it, transforms it when needed, then pushes it into Tool B automatically.",
  },
  {
    n: "03",
    title: "So work moves forward without you pushing it",
    body: "Requests become jobs, jobs become quotes, quotes get followed up, hours turn into invoices, invoices get paid, and customers get the right updates.",
  },
];

const beforeSteps = [
  "Logged hours are manually exported into a .csv. The downloaded file imported into your data sheet like Excel or Google Sheets.",
  "You spend many hours checking the data, going from sheet to sheet, manually copy/paste, add new rows, calculate, make mistakes without even knowing, so you need to check it a hundred times.",
  "Once you're sure the Data Sheet is correct, you go back and forth manually copy/pasting the data to your Invoicing Tool and finally send the invoice. Laying in bed worrying if you did everything correct.",
];

const afterSteps = [
  "Logged hours are automatically transfered from the Hours Tracking Tool to the Data Sheet on a set schedule.",
  "Data is checked and transformed by set rules, invoice items are calculated.",
  "Invoice items are automatically sent to the Invoicing Tool and send to the client. Reminder emails are pending. Invoice status waits signal of payment.",
];

// Tool-logo chips, in the order Framer renders them per step.
const hoursLogos = ["FEYcj8ezZSQi8LQ1Q5BIvCRNfKc.png", "zhS9wQgXpiqpdULqnDiWOj3C1o.png", "CZwbfnOg4sMj1WEsJ9jgYnQBUvY.png", "AUYa04NCrwLENeKLXzfbUI3wI.png"];
const dbLogos = ["Wp3IZfIWBGUdjKG2OwoSGL8KgQ.png", "qHgNS6eLjWWLWNW32ZzAyz7Pobw.png", "iuQPNZEpjh8HceJYE2G3TsUM.png"];
const invoiceLogos = ["BEJslv8NLRjCIa4IW2J3jy1ik.png", "fO91l2eNgLk0L5qsxhacm1xpx4.png", "x82oPMXxzHp8UsJvTJdjzeh9Kqo.png", "KnJqTr0bC2kdsShN4VZ9hXqibU.png"];
const sendLogos = ["ycO7xGLgM5nxPpiEo8sVFAeA.png", "leHC2BAVnM06i3ki7d9KEbnKyE.png", "wCioXkSjVIXlJcHaBrT5D8DC3Js.png"];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="bg-grey-150">
        <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <h1 className="h-display text-navy">
              Stop Letting Admin Tasks Steal Your Time.
              <br />
              <span className="text-grey-400">Automate it. Get Your Time Back.</span>
            </h1>

            <p className="body-base mt-8 max-w-md text-grey-600">
              We connect your current tools into one smooth workflow that runs itself. No switching
              software needed.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/#section-meeting">Yes, I want to stop losing time</Button>
              <Button href="/#section-solutions" variant="outline">
                What can I automate?
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
              className="h-auto w-full max-w-[560px]"
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Pain points */}
      <section className="bg-grey-200 py-10">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[var(--radius-block)] bg-navy px-8 py-16 md:px-14">
            <Image
              src="/img/fMOrnUMWhn1rEixCfZ6cS3mcOU.png"
              alt=""
              fill
              className="pointer-events-none object-cover"
            />

            <div className="relative">
              <h2 className="h-section max-w-2xl text-white">
                If you recognize these time-eating tasks, we have good news for you
              </h2>

              <ul className="mt-12 max-w-2xl space-y-3">
                {painPoints.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 rounded-[40px] bg-grey-50 px-6 py-4 text-sm text-navy"
                  >
                    <span className="text-base text-red-500" aria-hidden>
                      🚫
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Principles */}
      <section className="bg-grey-200 py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Enjoy your work again</p>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="h-section text-navy">
              We relieve service business owners from the repetitive tasks they hate the most.
            </h2>

            <div className="space-y-10">
              {principles.map((p) => (
                <div key={p.n} className="flex gap-8">
                  <span className="text-4xl font-bold tracking-[-0.05em] text-brand">{p.n}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.03em] text-navy">{p.title}</h3>
                    <p className="body-base mt-3 max-w-lg text-grey-600">{p.body}</p>
                  </div>
                </div>
              ))}

              <Button href="/#section-meeting" variant="brand">
                Relieve me of time-consuming admin tasks
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Testimonial */}
      <section className="bg-brand">
        <div className="container-site py-24 lg:py-28">
          <Image
            src="/img/dNraMAmDpigdLDLaOSq7yxj1zy8.png"
            alt="Cupcake STHLM"
            width={279}
            height={208}
            className="h-14 w-auto object-contain"
          />

          <blockquote className="mt-12 max-w-3xl text-2xl font-medium italic leading-tight tracking-[-0.03em] text-white md:text-[34px]">
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
              <p className="text-base font-medium text-white">Alexander Cordova</p>
              <p className="text-xs font-semibold text-accent">Marketing Specialist</p>
            </div>
          </div>

          <Button href="/works/email-to-quote-system" className="mt-12">
            Discover how he did it
          </Button>
        </div>
      </section>

      {/* ------------------------------------------- Before / after (dark) */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="container-site">
          <h2 className="h-section text-center text-white">
            <span className="text-brand">An</span> example how...
          </h2>

          {/* Before */}
          <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-grey-500">Tiring, slow &amp; stressful</p>
              <h3 className="h-section mt-4 text-white">You might be losing valuable time</h3>

              <ol className="mt-10 space-y-6">
                {beforeSteps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand text-xs text-brand">
                      {i + 1}
                    </span>
                    <p className="body-base text-grey-400">{s}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="text-center">
              <Image
                src="/img/bbulW11EMwSjPI1vsuEIad3mPs.png"
                alt="Hours tracking tool, data sheet and invoicing tool, each edited by hand"
                width={2109}
                height={731}
                className="h-auto w-full"
              />
              <p className="mt-6 text-xl text-white">Long hours of boring manual work</p>
            </div>
          </div>

          <p className="my-16 text-center text-2xl text-grey-500">vs</p>

          {/* After */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 text-center lg:order-1">
              <Image
                src="/img/bqQoav1F23VXVUwzlnKMR9s1KXU.png"
                alt="The same three tools, now connected and running automatically"
                width={2109}
                height={731}
                className="h-auto w-full"
              />
              <p className="mt-6 text-xl text-white">Check. Approve. Done</p>
            </div>

            <div className="order-1 lg:order-2">
              <p className="eyebrow text-brand">📈 Fast, reliable &amp; worry-free</p>
              <h3 className="h-section mt-4 text-white">
                The change <span className="text-grey-500">that gets back your time</span>
              </h3>

              <ol className="mt-10 space-y-6">
                {afterSteps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand text-xs text-brand">
                      {i + 1}
                    </span>
                    <p className="body-base text-grey-400">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <Button href="/#section-meeting" variant="brand">
              Yes, help me get back my time
            </Button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- Universal plug (dark) */}
      <section className="bg-ink pb-24 lg:pb-32">
        <div className="container-site text-center">
          <h2 className="h-section text-white">We make your current software work together</h2>

          <Image
            src="/img/z4PUBjQZy0f5ftktw8SqT2x3fc.png"
            alt="A universal plug acting as an intelligent processor between Tool A and Tool B"
            width={1513}
            height={1246}
            className="mx-auto mt-12 h-auto w-full max-w-5xl"
          />

          <p className="mt-8 text-lg text-grey-400">Imagine A Universal Plug</p>

          <div className="body-base mx-auto mt-8 max-w-2xl space-y-4 text-grey-400">
            <p>
              You can plug it in practically every socket. This &quot;Intelligent Processor&quot;
              (n8n) can plug into almost any software. We configure it to:
            </p>
            <p className="text-white">
              Pull specific data from Tool A ➔ Transform it under set conditions ➔ Send it to Tool B.
            </p>
            <p>All in a few seconds… And the best thing?</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Methodology */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-600">Methodology</p>
          <h2 className="h-section mt-4 max-w-3xl text-navy">
            You don&apos;t need to change the software you use
          </h2>

          <div className="body-base mt-10 max-w-2xl space-y-5 text-grey-600">
            <p>
              On a short call, you show us your current tools, walk us through how you do it today
              and tell us what&apos;s stealing your time. After that, we design a workflow and
              discuss this with you.
            </p>
            <p>Once approved, we handle the build, testing, and setup.</p>
            <p>
              You don’t need to change software, write documents, or learn a new system. If
              something is unclear, we ask. If something breaks, we fix it.
            </p>
          </div>

          <Button href="/#section-meeting" variant="brand" className="mt-12">
            Let&apos;s hop on a call!
          </Button>
        </div>
      </section>

      {/* ------------------------------------------------------ Solutions */}
      <section id="section-solutions" className="bg-grey-150 py-24 lg:py-32">
        <div className="container-site">
          <h2 className="h-section text-center text-brand">
            The 3 most sought after <span className="text-grey-400">solutions</span>
          </h2>

          <div className="mt-16 space-y-8">
            <SolutionSystem
              eyebrow="Time Multiplying System #1"
              title="From logged hours to invoice,"
              titleMuted="with your unique calculations."
              blurb={[
                "Hours flow straight into invoice tool, get checked and calculate where needed. Then send to your invoicing tool. No more worrying about payments.",
              ]}
              video="stfHh1bxQFY"
              steps={[
                { icon: "🕐", title: "Your hours tracking tool", body: "The automation extracts the hours tracked in the tool you're already using.", logos: hoursLogos },
                { icon: "🗂️", title: "Your database", body: "Sends it to your database like Google Sheets, Excel or Airtable.", logos: dbLogos },
                { icon: "🧾", title: "Your invoicing tool", body: "Customers and invoices are automatically created.", logos: invoiceLogos },
                { icon: "✉️", title: "Send!", body: "Invoices and reminders are sent. Status automatically updated.", logos: sendLogos },
              ]}
            />

            <SolutionSystem
              eyebrow="Time Multiplying System #2"
              title="Automatic email replies, customers, offers & invoices"
              blurb={[
                "With human control steps where you want them.",
                "No more long hours checking spreadsheets, chasing timesheets, or rebuilding invoices. Approved hours flow straight into invoice tool. No more worrying about payments.",
              ]}
              steps={[
                { icon: "📧", title: "Your email provider", body: "The system detects new relevant emails and pulls in the content.", logos: sendLogos },
                { icon: "🤖", title: "Our A.I. Engine", body: "Reads the email and extracts key details into structured fields.", logos: [] },
                { icon: "🗂️", title: "Your database", body: "Everything is stored in one place. Turns the request into an offer or invoice draft.", logos: dbLogos },
                { icon: "🧾", title: "Your invoicing tool", body: "Creates the real offer/invoice in your invoicing tool and sends it to the customer.", logos: invoiceLogos },
              ]}
            />

            <SolutionSystem
              eyebrow="Time Multiplying System #3"
              title="From form order to reply & offer in seconds"
              blurb={[
                "No more manually processing orders, allocating employees, chasing payments, or remembering follow-ups.",
                "One flow from purchase, to invoicing, to sending out employees.",
              ]}
              steps={[
                { icon: "🎯", title: "Capture lead", body: "Customer places an order or submits a request on your website", logos: [] },
                { icon: "🗂️", title: "Your database", body: "Send it to your database like Google Sheets, Excel or Airtable.", logos: dbLogos },
                { icon: "🧾", title: "Your invoicing tool", body: "Customers and invoices are automatically created.", logos: invoiceLogos },
                { icon: "✉️", title: "Send!", body: "Invoices and reminders are sent. Status automatically updated.", logos: sendLogos },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ----------------------------------------- Single pain vs system */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-grey-500">Methodology</p>

          <h2 className="h-section mt-4 max-w-3xl">
            <span className="text-grey-500">Relieve 1 single pain or...</span>
            <br />
            <span className="text-brand">Total relief with a complete system</span>
          </h2>

          <p className="body-base mt-8 max-w-xl text-grey-400">
            We start with research and strategy, shape it into a strong creative direction, and
            deliver branding, design, and web development that aligns with your goals. Simple,
            effective, and always tailored to your business.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <Link href="/#section-meeting" className="flex w-64 items-center justify-between text-base text-white hover:text-brand">
              Let’s work together <span aria-hidden>→</span>
            </Link>
            <Link href="/works" className="flex w-64 items-center justify-between text-base text-white hover:text-brand">
              Check our case studies <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Faq />
      <MeetingSection />
      <ContactSection />
    </>
  );
}
