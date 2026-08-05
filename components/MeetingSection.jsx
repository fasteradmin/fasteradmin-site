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
    <section id="section-meeting" className="bg-grey-100">
      <div className="container-site grid gap-12 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <h2 className="h-section text-navy">
            Want to find out where you too, can get more done in less time?
          </h2>
          <p className="h-section mt-2 text-brand">Book a short meeting now.</p>

          <p className="body-base mt-8 max-w-md text-grey-600">
            Go through your current set-up with one of our experts, get honest advice, and a team
            that cares about the outcome as much as you do.
          </p>
        </div>

        <BookingWidget />
      </div>
    </section>
  );
}
