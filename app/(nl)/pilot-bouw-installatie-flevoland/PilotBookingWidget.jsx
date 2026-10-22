"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Turnstile, { resetTurnstile } from "@/components/Turnstile";
import { AVAILABILITY_ENDPOINT, BOOKING_ENDPOINT, FA_TOKEN } from "@/lib/config";

/**
 * Kopie van components/BookingWidget.jsx voor de pilotpagina. Het origineel
 * (homepage) blijft ongewijzigd. Verschillen:
 *  - vraagt beschikbaarheid op met `mode: "pilot"`: n8n toont dan 3-4 tijden
 *    per werkdag in plaats van de weeklimiet van de homepage
 *    (workflow "FasterAdmin | Booking | Get Availability", node Build Slots);
 *  - een belafspraak van ca. 15 minuten in plaats van een gesprek van 30;
 *  - eigen vragen: telefoonnummer, welk proces, het probleem ermee, volume.
 * Zelfde boekingswebhook en wire-contract: alle antwoorden gaan gelabeld in
 * `description`, het telefoonnummer ook in `website` (n8n blijft ongewijzigd).
 */
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "x-fa-token": FA_TOKEN,
};

const PROCESSES = ["Offreren & calculeren", "Werkvoorbereiding", "Weet ik nog niet"];
const VOLUMES = ["1 tot 5", "5 tot 15", "Meer dan 15"];

function meet(naam, data = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", naam, data);
  window.dataLayer?.push({ event: naam, ...data });
}

function formatDay(iso) {
  const d = new Date(iso + "T12:00:00");
  return {
    weekday: d.toLocaleDateString("nl-NL", { weekday: "short" }),
    day: d.toLocaleDateString("nl-NL", { day: "numeric" }),
    month: d.toLocaleDateString("nl-NL", { month: "short" }),
  };
}

export default function PilotBookingWidget({ onBooked }) {
  const [status, setStatus] = useState("loading");
  const [days, setDays] = useState([]);
  const [timezone, setTimezone] = useState("Europe/Amsterdam");
  const [activeDate, setActiveDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [submitState, setSubmitState] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const renderedAt = useRef(Date.now());

  async function fetchDays() {
    const res = await fetch(AVAILABILITY_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ mode: "pilot" }),
    });
    const data = await res.json();
    return res.ok && Array.isArray(data.days) ? data : null;
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchDays();
        if (cancelled) return;
        if (!data) return setStatus("error");
        setDays(data.days);
        setTimezone(data.timezone || "Europe/Amsterdam");
        setActiveDate(data.days[0]?.date ?? null);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeDay = useMemo(() => days.find((d) => d.date === activeDate) || null, [days, activeDate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!slot) return;
    const data = new FormData(e.currentTarget);
    setSubmitState("sending");
    setErrorMsg("");

    const description = [
      ["Bron", "Pilotpagina bouw- en installatiebedrijven (belafspraak 15 min)"],
      ["Telefoon", data.get("phone")],
      ["Proces", data.get("process")],
      ["Probleem", data.get("problem")],
      ["Per week", data.get("volume")],
    ]
      .filter(([, v]) => v && String(v).trim())
      .map(([k, v]) => `${k}\n${String(v).trim()}`)
      .join("\n\n");

    try {
      const res = await fetch(BOOKING_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({
          // n8n: belafspraak van 15 min, Joey belt dit nummer (Create Booking, Validate Input).
          mode: "pilot",
          phone: data.get("phone") || "",
          fullName: data.get("fullName") || "",
          email: data.get("email") || "",
          companyName: data.get("companyName") || "",
          website: data.get("phone") || "",
          description,
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
        window.gtag?.("event", "generate_lead", { form: "pilot_belafspraak" });
        window.fbq?.("track", "Schedule");
        onBooked?.();
        return;
      }
      if (res.status === 409) {
        setErrorMsg(body.message || "Die tijd is net geboekt door iemand anders. Kies een andere.");
        setSlot(null);
        meet("boeking_mislukt", { reden: "slot_bezet", form: "pilot" });
        const fresh = await fetchDays().catch(() => null);
        if (fresh) setDays(fresh.days);
      } else {
        setErrorMsg(body.message || "Er ging iets mis. Probeer het opnieuw.");
        meet("boeking_mislukt", { reden: "server_fout", form: "pilot" });
      }
      setSubmitState("error");
    } catch {
      setErrorMsg("De boekingsservice is niet bereikbaar. Probeer het opnieuw.");
      meet("boeking_mislukt", { reden: "netwerk", form: "pilot" });
      setSubmitState("error");
    }
  }

  if (status === "loading") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10 text-center">
        <p className="body-base text-grey-600">Beschikbare tijden laden…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10">
        <p className="body-base text-navy">De agenda kon niet worden geladen.</p>
        <p className="body-base mt-2 text-grey-600">
          Bel of app{" "}
          <a href="tel:+31619399330" className="text-brand hover:underline">
            06 - 193 993 30
          </a>{" "}
          of mail{" "}
          <a href="mailto:joey@fasteradmin.com" className="text-brand hover:underline">
            joey@fasteradmin.com
          </a>
          , dan plannen we samen een tijd.
        </p>
      </div>
    );
  }

  if (submitState === "booked") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10">
        <h3 className="h-card text-navy">Je staat ingepland.</h3>
        <p className="body-base mt-4 text-grey-600">
          We bellen je op het gekozen tijdstip. Er is een agenda-uitnodiging onderweg naar je
          inbox. Vragen? Mail ons op{" "}
          <a href="mailto:joey@fasteradmin.com" className="text-brand hover:underline">
            joey@fasteradmin.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-white">
      <div className="border-b border-grey-200 px-8 py-6">
        <h3 className="h-card text-navy">Kies een tijd</h3>
        <p className="mt-1 text-xs text-grey-600">
          Telefonisch · ca. 15 minuten · tijden in {timezone.replace("_", " ")}
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-grey-200 px-8 py-5">
        {days.map((d) => {
          const f = formatDay(d.date);
          const active = d.date === activeDate;
          return (
            <button
              key={d.date}
              type="button"
              onClick={() => {
                setActiveDate(d.date);
                setSlot(null);
                meet("dag_klik", { datum: d.date, form: "pilot" });
              }}
              className={`flex min-w-[72px] shrink-0 flex-col items-center rounded-[var(--radius-card)] border px-3 py-3 transition-colors ${
                active ? "border-brand bg-brand text-white" : "border-grey-300 bg-white text-navy hover:border-brand"
              }`}
            >
              <span className="text-[11px] uppercase opacity-70">{f.weekday}</span>
              <span className="text-lg font-semibold leading-tight">{f.day}</span>
              <span className="text-[11px] opacity-70">{f.month}</span>
            </button>
          );
        })}
      </div>

      <div className="px-8 py-6">
        {activeDay?.slots?.length ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {activeDay.slots.map((s) => (
              <button
                key={s.start}
                type="button"
                onClick={() => {
                  setSlot(s);
                  meet("slot_klik", { datum: activeDate, tijd: s.time, form: "pilot" });
                }}
                className={`rounded-[40px] border px-3 py-2.5 text-sm transition-colors ${
                  slot?.start === s.start ? "border-navy bg-navy text-white" : "border-grey-300 text-navy hover:border-navy"
                }`}
              >
                {s.time}
              </button>
            ))}
          </div>
        ) : (
          <p className="body-base text-grey-600">Geen tijden meer op deze dag. Probeer een andere.</p>
        )}
      </div>

      {slot && (
        <form onSubmit={handleSubmit} className="relative border-t border-grey-200 px-8 py-6">
          <p className="body-base text-navy">
            <span className="text-grey-600">Belafspraak</span>{" "}
            {new Date(slot.start).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}{" "}
            om {slot.time}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Input name="fullName" label="Je naam *" required />
            <Input name="email" label="E-mail *" type="email" required />
            <Input name="companyName" label="Bedrijf en plaats *" required />
            <Input name="phone" label="Telefoonnummer *" type="tel" required />
          </div>

          <div className="mt-4 space-y-4">
            <Select name="process" label="Welk proces wil je aanpakken? *" options={PROCESSES} required />
            <Textarea name="problem" label="Wat is je probleem ermee? *" required />
            <Select name="volume" label="Hoeveel offertes, calculaties of projecten ongeveer per week? *" options={VOLUMES} required />
          </div>

          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Niet invullen
              <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <Turnstile onToken={setTurnstileToken} className="mt-4" />

          <button
            type="submit"
            disabled={submitState === "sending"}
            className="mt-6 w-full rounded-[40px] bg-navy px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
          >
            {submitState === "sending" ? "Bezig met inplannen…" : "Bevestig belafspraak"}
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

function Select({ name, label, options, required }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-navy">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-xl border border-grey-300 bg-white px-4 py-3 text-base text-navy focus:border-brand focus:outline-none"
      >
        <option value="" disabled>
          Kies…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ name, label, required }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-navy">{label}</span>
      <textarea
        name={name}
        rows={3}
        required={required}
        className="w-full rounded-xl border border-grey-300 px-4 py-3 text-base text-navy focus:border-brand focus:outline-none"
      />
    </label>
  );
}
