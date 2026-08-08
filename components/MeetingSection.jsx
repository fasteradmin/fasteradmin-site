import BookingWidget from "@/components/BookingWidget";

/**
 * The "book a call" block.
 *
 * This replaced the Framer site's Calendly embed. Booking now runs on Joey's
 * own Google Calendar via two n8n workflows, so there is no third-party
 * branding, no per-seat cost, and the styling matches the rest of the site.
 */
export default function MeetingSection() {
  return (
    <section id="section-meeting" className="bg-white">
      <div className="container-site grid gap-12 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <h2 className="h-section text-navy">The Ops Call</h2>
          <p className="h-section mt-2 text-brand">20 to 30 minutes. No pitch.</p>

          <p className="body-base mt-8 max-w-md text-grey-600">
            You walk us through how work moves today and where it gets stuck. If it&apos;s not a
            fit, you&apos;ll know by the end of the call.
          </p>
        </div>

        <BookingWidget />
      </div>
    </section>
  );
}
