"use client";

import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/joey-fasteradmin/30min";

/**
 * Calendly inline embed. The Framer original wrapped this in a sandboxed
 * iframe; here it loads directly, which is both faster and lets us fire
 * tracking events on booking.
 */
export default function MeetingSection() {
  useEffect(() => {
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) return;

    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section id="section-meeting" className="bg-grey-100">
      <div className="container-site grid gap-12 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <h2 className="h-section text-navy">
            Want to find out where you too, can get more done in less time?
          </h2>
          <p className="h-section mt-2 text-brand">Book a short meeting now.</p>
        </div>

        <div
          className="calendly-inline-widget overflow-hidden rounded-[var(--radius-card)] bg-white"
          data-url={CALENDLY_URL}
          style={{ minWidth: "320px", height: "1100px" }}
        />
      </div>
    </section>
  );
}
