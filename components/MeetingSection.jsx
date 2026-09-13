import BookingWidget from "@/components/BookingWidget";

/**
 * The "book a call" block.
 *
 * This replaced the Framer site's Calendly embed. Booking now runs on Joey's
 * own Google Calendar via two n8n workflows, so there is no third-party
 * branding, no per-seat cost, and the styling matches the rest of the site.
 *
 * "The Ops Call" -> "Het startgesprek" and the "No pitch" reassurance were
 * dropped on the Dutch side per Joey's copy pass (2026-09-12): dropped
 * everywhere in the Dutch copy, in line with the Ogilvy tone, not just on
 * this section.
 */
const COPY = {
  en: {
    heading: "The Ops Call",
    duration: "20 to 30 minutes. No pitch.",
    body: "You walk us through how work moves today and where it gets stuck. If it's not a fit, you'll know by the end of the call.",
  },
  nl: {
    heading: "Het startgesprek",
    duration: "20 tot 30 minuten.",
    body: "Jij vertelt ons hoe het werk nu loopt en waar het vastloopt. Past het niet, dan weet je dat aan het eind van het gesprek.",
  },
};

export default function MeetingSection({ locale = "en" }) {
  const t = COPY[locale];

  return (
    <section id="section-meeting" className="bg-white">
      <div className="container-site grid gap-12 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <h2 id="the-ops-call" className="h-section text-navy">
            {t.heading}
          </h2>
          <p className="h-section mt-2 text-brand">{t.duration}</p>

          <p className="body-base mt-8 max-w-md text-grey-600">{t.body}</p>
        </div>

        <BookingWidget locale={locale} />
      </div>
    </section>
  );
}
