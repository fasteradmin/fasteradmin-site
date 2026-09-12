"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Turnstile, { resetTurnstile } from "@/components/Turnstile";

import { AVAILABILITY_ENDPOINT, BOOKING_ENDPOINT, FA_TOKEN } from "@/lib/config";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "x-fa-token": FA_TOKEN,
};

/**
 * UI copy per locale. This is functional/interface text (loading states,
 * form labels, error and success messages), not sales copy, so it was
 * translated in this pass under the same discretion Joey gave for the nav
 * and footer labels — flagged in the PR for a native check, not held back
 * for it.
 */
const COPY = {
  en: {
    dateLocale: "en-GB",
    loading: "Loading available times…",
    calendarError: "Couldn't load the calendar.",
    calendarErrorBody: "and we'll sort a time.",
    booked: "You're booked in.",
    bookedBody:
      "A calendar invite is on its way to your inbox. If it doesn't arrive in a few minutes, check your spam folder or email us at",
    pickATime: "Pick a time",
    durationLabel: (tz) => `30 minutes · times shown in ${tz}`,
    noSlots: "No times left on this day. Try another.",
    bookingLabel: "Booking",
    at: "at",
    nameLabel: "Your name *",
    emailLabel: "Email *",
    companyLabel: "Company",
    websiteLabel: "Website",
    descriptionLabel: "What do you want to automate?",
    sending: "Booking…",
    confirm: "Confirm booking",
    slotTaken: "That time was just booked. Please pick another slot.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Could not reach the booking service. Please try again.",
  },
  nl: {
    dateLocale: "nl-NL",
    loading: "Beschikbare tijden laden…",
    calendarError: "De agenda kon niet worden geladen.",
    calendarErrorBody: "dan plannen we samen een tijd.",
    booked: "Je bent ingepland.",
    bookedBody:
      "Er is een agenda-uitnodiging onderweg naar je inbox. Komt die niet binnen een paar minuten aan, check dan je spamfolder of mail ons op",
    pickATime: "Kies een tijd",
    durationLabel: (tz) => `30 minuten · tijden weergegeven in ${tz}`,
    noSlots: "Geen tijden meer op deze dag. Probeer een andere.",
    bookingLabel: "Afspraak",
    at: "om",
    nameLabel: "Je naam *",
    emailLabel: "E-mail *",
    companyLabel: "Bedrijf",
    websiteLabel: "Website",
    descriptionLabel: "Wat wil je automatiseren?",
    sending: "Bezig met inplannen…",
    confirm: "Bevestig afspraak",
    slotTaken: "Die tijd is net geboekt door iemand anders. Kies een andere.",
    genericError: "Er ging iets mis. Probeer het opnieuw.",
    networkError: "De boekingsservice is niet bereikbaar. Probeer het opnieuw.",
  },
};

function formatDay(iso, dateLocale) {
  const d = new Date(iso + "T12:00:00");
  return {
    weekday: d.toLocaleDateString(dateLocale, { weekday: "short" }),
    day: d.toLocaleDateString(dateLocale, { day: "numeric" }),
    month: d.toLocaleDateString(dateLocale, { month: "short" }),
  };
}

export default function BookingWidget({ locale = "en" }) {
  const t = COPY[locale];
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [days, setDays] = useState([]);
  const [timezone, setTimezone] = useState("Europe/Amsterdam");
  const [activeDate, setActiveDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [submitState, setSubmitState] = useState("idle"); // idle | sending | booked | error
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const renderedAt = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!AVAILABILITY_ENDPOINT) return setStatus("error");
      try {
        const res = await fetch(AVAILABILITY_ENDPOINT, {
          method: "POST",
          headers,
          body: JSON.stringify({}),
        });
        const data = await res.json();
        if (cancelled) return;

        // The abuse gate answers a decoy { ok: true } with no payload, so
        // treat a missing days array as a failure rather than "no slots".
        if (!res.ok || !Array.isArray(data.days)) return setStatus("error");

        setDays(data.days);
        setTimezone(data.timezone || "Europe/Amsterdam");
        setActiveDate(data.days[0]?.date ?? null);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeDay = useMemo(
    () => days.find((d) => d.date === activeDate) || null,
    [days, activeDate]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!slot) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitState("sending");
    setErrorMsg("");

    try {
      const res = await fetch(BOOKING_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({
          fullName: data.get("fullName") || "",
          email: data.get("email") || "",
          companyName: data.get("companyName") || "",
          website: data.get("website") || "",
          description: data.get("description") || "",
          start: slot.start,
          hp_field: data.get("hp_field") || "",
          t: renderedAt.current,
          turnstileToken,
        }),
      });

      const body = await res.json().catch(() => ({}));
      resetTurnstile();
      setTurnstileToken("");

      if (res.ok && body.ok) {
        setSubmitState("booked");
        window.gtag?.("event", "generate_lead", { form: "booking" });
        window.fbq?.("track", "Schedule");
        return;
      }

      // 409 means someone took the slot while this form was open. Pull fresh
      // availability so the visitor isn't staring at a stale grid.
      if (res.status === 409) {
        setErrorMsg(body.message || t.slotTaken);
        setSlot(null);
        const fresh = await fetch(AVAILABILITY_ENDPOINT, {
          method: "POST",
          headers,
          body: JSON.stringify({}),
        })
          .then((r) => r.json())
          .catch(() => null);
        if (Array.isArray(fresh?.days)) setDays(fresh.days);
      } else {
        setErrorMsg(body.message || t.genericError);
      }
      setSubmitState("error");
    } catch {
      setErrorMsg(t.networkError);
      setSubmitState("error");
    }
  }

  if (status === "loading") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10 text-center">
        <p className="body-base text-grey-600">{t.loading}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10">
        <p className="body-base text-navy">{t.calendarError}</p>
        <p className="body-base mt-2 text-grey-600">
          <a href="mailto:joey@getfasteradmin.com" className="text-brand hover:underline">
            joey@getfasteradmin.com
          </a>{" "}
          {t.calendarErrorBody}
        </p>
      </div>
    );
  }

  if (submitState === "booked") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10">
        <h3 className="h-card text-navy">{t.booked}</h3>
        <p className="body-base mt-4 text-grey-600">
          {t.bookedBody}{" "}
          <a href="mailto:joey@getfasteradmin.com" className="text-brand hover:underline">
            joey@getfasteradmin.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-white">
      <div className="border-b border-grey-200 px-8 py-6">
        <h3 className="h-card text-navy">{t.pickATime}</h3>
        <p className="mt-1 text-xs text-grey-600">
          {t.durationLabel(timezone.replace("_", " "))}
        </p>
      </div>

      {/* Day picker */}
      <div className="flex gap-2 overflow-x-auto border-b border-grey-200 px-8 py-5">
        {days.map((d) => {
          const f = formatDay(d.date, t.dateLocale);
          const active = d.date === activeDate;
          return (
            <button
              key={d.date}
              type="button"
              onClick={() => {
                setActiveDate(d.date);
                setSlot(null);
              }}
              className={`flex min-w-[72px] shrink-0 flex-col items-center rounded-[var(--radius-card)] border px-3 py-3 transition-colors ${
                active
                  ? "border-brand bg-brand text-white"
                  : "border-grey-300 bg-white text-navy hover:border-brand"
              }`}
            >
              <span className="text-[11px] uppercase opacity-70">{f.weekday}</span>
              <span className="text-lg font-semibold leading-tight">{f.day}</span>
              <span className="text-[11px] opacity-70">{f.month}</span>
            </button>
          );
        })}
      </div>

      {/* Slot picker */}
      <div className="px-8 py-6">
        {activeDay?.slots?.length ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {activeDay.slots.map((s) => (
              <button
                key={s.start}
                type="button"
                onClick={() => setSlot(s)}
                className={`rounded-[40px] border px-3 py-2.5 text-sm transition-colors ${
                  slot?.start === s.start
                    ? "border-navy bg-navy text-white"
                    : "border-grey-300 text-navy hover:border-navy"
                }`}
              >
                {s.time}
              </button>
            ))}
          </div>
        ) : (
          <p className="body-base text-grey-600">{t.noSlots}</p>
        )}
      </div>

      {/* Details */}
      {slot && (
        <form onSubmit={handleSubmit} className="relative border-t border-grey-200 px-8 py-6">
          <p className="body-base text-navy">
            <span className="text-grey-600">{t.bookingLabel}</span>{" "}
            {new Date(slot.start).toLocaleDateString(t.dateLocale, {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            {t.at} {slot.time}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Input name="fullName" label={t.nameLabel} required />
            <Input name="email" label={t.emailLabel} type="email" required />
            <Input name="companyName" label={t.companyLabel} />
            <Input name="website" label={t.websiteLabel} />
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-navy">{t.descriptionLabel}</span>
            <textarea
              name="description"
              rows={3}
              className="w-full rounded-xl border border-grey-300 px-4 py-3 text-base text-navy focus:border-brand focus:outline-none"
            />
          </label>

          {/* Honeypot: off-screen, aria-hidden, not tabbable. See ContactSection. */}
          <div
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label>
              Do not fill this in
              <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <Turnstile onToken={setTurnstileToken} className="mt-4" />

          <button
            type="submit"
            disabled={submitState === "sending"}
            className="mt-6 w-full rounded-[40px] bg-navy px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
          >
            {submitState === "sending" ? t.sending : t.confirm}
          </button>

          {errorMsg && <p className="mt-4 text-sm text-accent">{errorMsg}</p>}
        </form>
      )}
    </div>
  );
}

function Input({ name, label, type = "text", required }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-navy">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-grey-300 px-4 py-3 text-base text-navy focus:border-brand focus:outline-none"
      />
    </label>
  );
}
