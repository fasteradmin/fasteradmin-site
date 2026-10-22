"use client";

import PilotBookingWidget from "./PilotBookingWidget";
import { trackPilotBooking } from "./LeadTracking";

/** Client-wrapper zodat een geslaagde boeking als conversie per lead-variant telt. */
export default function PilotBooking() {
  return <PilotBookingWidget onBooked={trackPilotBooking} />;
}
