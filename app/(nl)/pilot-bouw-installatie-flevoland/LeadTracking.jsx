"use client";

import { useEffect } from "react";

/**
 * Stuurt welke lead-variant (A of B) deze bezoeker kreeg naar GA4 en
 * PostHog, zodra beide scripts geladen zijn. De keuze zelf gebeurt
 * synchroon en flikkervrij in het <script> vlak boven sectie 1 in
 * page.jsx — dit component meet alleen, het beslist niet.
 */
export default function LeadTracking() {
  useEffect(() => {
    const variant = currentVariant();

    window.gtag?.("event", "lead_variant_gezien", { variant });
    window.dataLayer?.push({ event: "lead_variant_gezien", variant });

    const sendToPostHog = () => window.posthog?.capture("lead_variant_gezien", { variant });
    if (window.posthog) sendToPostHog();
    else {
      // posthog.init laadt async; probeer het nog een keer na de eerste tick.
      const t = setTimeout(sendToPostHog, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  return null;
}

function currentVariant() {
  if (window.__faLead) return window.__faLead;
  const m = document.cookie.match(/(?:^|; )fa_pilot_lead=([ab])/);
  return m ? m[1] : "a";
}

/** Helper voor de boekingsconversie, met dezelfde variant-property erbij. */
export function trackPilotBooking() {
  const variant = currentVariant();
  window.gtag?.("event", "pilot_belafspraak_geboekt", { variant });
  window.dataLayer?.push({ event: "pilot_belafspraak_geboekt", variant });
  window.posthog?.capture("pilot_belafspraak_geboekt", { variant });
}
