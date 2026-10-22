"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Turnstile, { resetTurnstile } from "@/components/Turnstile";

import { AVAILABILITY_ENDPOINT, BOOKING_ENDPOINT, FA_TOKEN } from "@/lib/config";

/**
 * Inplannen voor Michel, de beller (2026-10-22). Zelfde boekingsflow als de site
 * (n8n "FasterAdmin | Booking | Get Availability" en "Create Booking"), met
 * `mode: "michel"`:
 *  - geen weeklimiet: alle vrije halve uren in Joeys agenda, 21 dagen vooruit;
 *  - Op locatie: 45 min, en het uur reistijd ervoor en erna moet ook vrij zijn;
 *    Video: 30 min met een Google Meet-link;
 *  - de klant krijgt een uitnodiging met een persoonlijk bericht; Michels
 *    notities gaan alleen naar Joey (Telegram en de privé-reistijdafspraak).
 */
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "x-fa-token": FA_TOKEN,
};

const SOORTEN = {
  onsite: { label: "Op locatie", uitleg: "Bezoek door Joey. 45 minuten, met een uur reistijd voor en na." },
  video: { label: "Videogesprek", uitleg: "Via Google Meet. 30 minuten." },
};

// Intakevragen (Joey, 2026-10-22). Interne informatie: gaat mee in `notes`.
const INTAKE = [
  {
    name: "proces",
    label: "Proces van interesse",
    placeholder: "Offreren en calculeren, factureren, werkvoorbereiding, planning, etc.",
  },
  {
    name: "problemen",
    label: "Grootste problemen",
    placeholder: "Moeten projecten afwijzen omdat ze geen tijd hebben, klantenverlies door traag offreren, etc.",
  },
  {
    name: "doel",
    label: "Doel",
    placeholder: "Tijd voor meer projecten, betere kwaliteit leveren, minder fouten, etc.",
  },
];

function formatDay(iso) {
  const d = new Date(iso + "T12:00:00");
  return {
    weekday: d.toLocaleDateString("nl-NL", { weekday: "short" }),
    day: d.toLocaleDateString("nl-NL", { day: "numeric" }),
    month: d.toLocaleDateString("nl-NL", { month: "short" }),
  };
}

export default function MichelBookingWidget() {
  const [soort, setSoort] = useState("onsite");
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [days, setDays] = useState([]);
  const [activeDate, setActiveDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [submitState, setSubmitState] = useState("idle"); // idle | sending | booked | error
  const [errorMsg, setErrorMsg] = useState("");
  const [geboekt, setGeboekt] = useState(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  // De poort in n8n weigert een formulier dat ouder is dan 6 uur. Michel laat de
  // pagina vaak de hele dag open, dus de klok start pas als hij een tijd kiest.
  const formOpenedAt = useRef(Date.now());

  const load = useCallback(async (meetingType) => {
    setStatus("loading");
    try {
      const res = await fetch(AVAILABILITY_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({ mode: "michel", meetingType, t: Date.now() - 5000 }),
      });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data.days)) return setStatus("error");
      setDays(data.days);
      setActiveDate((prev) => (data.days.some((d) => d.date === prev) ? prev : data.days[0]?.date ?? null));
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    setSlot(null);
    load(soort);
  }, [soort, load]);

  const activeDay = useMemo(() => days.find((d) => d.date === activeDate) || null, [days, activeDate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!slot) return;
    const data = new FormData(e.currentTarget);
    const voornaam = (data.get("firstName") || "").trim();
    const achternaam = (data.get("lastName") || "").trim();
    setSubmitState("sending");
    setErrorMsg("");
    try {
      const res = await fetch(BOOKING_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({
          mode: "michel",
          meetingType: soort,
          firstName: voornaam,
          fullName: [voornaam, achternaam].filter(Boolean).join(" "),
          email: data.get("email") || "",
          companyName: data.get("companyName") || "",
          phone: data.get("phone") || "",
          address: soort === "onsite" ? data.get("address") || "" : "",
          // Intake en notities zijn intern: n8n zet `notes` alleen in Telegram en de
          // privé-reistijdafspraak, nooit in de uitnodiging aan de klant.
          notes: [
            ...INTAKE.map((v) => [v.label, data.get(v.name)]),
            ["Overige notities", data.get("notes")],
          ]
            .filter(([, value]) => value?.trim())
            .map(([label, value]) => `${label}: ${value.trim()}`)
            .join("\n"),
          start: slot.start,
          hp_field: data.get("hp_field") || "",
          t: formOpenedAt.current,
          turnstileToken,
        }),
      });
      const body = await res.json().catch(() => ({}));
      resetTurnstile();
      setTurnstileToken("");
      if (res.ok && body.ok) {
        setGeboekt({
          bedrijf: data.get("companyName") || voornaam,
          email: data.get("email"),
          wanneer: new Date(slot.start).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" }) + " om " + slot.time,
          soort: SOORTEN[soort].label.toLowerCase(),
        });
        setSubmitState("booked");
        return;
      }
      setErrorMsg(body.message || "Het inplannen is niet gelukt. Probeer het opnieuw.");
      setSubmitState("error");
      if (res.status === 409) {
        setSlot(null);
        load(soort);
      }
    } catch {
      setErrorMsg("Er is geen verbinding met de agenda. Probeer het opnieuw.");
      setSubmitState("error");
    }
  }

  function opnieuw() {
    setGeboekt(null);
    setSubmitState("idle");
    setSlot(null);
    load(soort);
  }

  if (submitState === "booked" && geboekt) {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10">
        <h3 className="h-card text-navy">De afspraak is ingepland.</h3>
        <p className="body-base mt-4 text-grey-600">
          {geboekt.bedrijf}, {geboekt.wanneer} ({geboekt.soort}). De uitnodiging is verstuurd naar{" "}
          {geboekt.email}. Joey ontvangt een bericht met de notities.
        </p>
        <button
          type="button"
          onClick={opnieuw}
          className="mt-6 rounded-[40px] bg-navy px-8 py-4 text-sm font-medium text-white hover:bg-navy/90"
        >
          Nieuwe afspraak inplannen
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-white">
      <div className="border-b border-grey-200 px-8 py-6">
        <h3 className="h-card text-navy">Type afspraak</h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {Object.entries(SOORTEN).map(([key, s]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSoort(key)}
              className={`rounded-[var(--radius-card)] border px-4 py-3 text-left transition-colors ${
                soort === key ? "border-navy bg-navy text-white" : "border-grey-300 text-navy hover:border-navy"
              }`}
            >
              <span className="block text-sm font-medium">{s.label}</span>
              <span className={`mt-1 block text-xs ${soort === key ? "text-white/80" : "text-grey-600"}`}>{s.uitleg}</span>
            </button>
          ))}
        </div>
      </div>

      {status === "loading" && <p className="body-base px-8 py-6 text-grey-600">De agenda wordt geladen…</p>}
      {status === "error" && (
        <p className="body-base px-8 py-6 text-navy">
          De agenda kon niet worden geladen. Vernieuw de pagina of bel Joey op 06-19399330.
        </p>
      )}

      {status === "ready" && (
        <>
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
                  }}
                  className={`flex min-w-[72px] shrink-0 flex-col items-center rounded-[var(--radius-card)] border px-3 py-3 transition-colors ${
                    active ? "border-brand bg-brand text-white" : "border-grey-300 bg-white text-navy hover:border-brand"
                  }`}
                >
                  <span className="text-[11px] uppercase opacity-70">{f.weekday}</span>
                  <span className="text-lg font-medium leading-tight">{f.day}</span>
                  <span className="text-[11px] opacity-70">{f.month}</span>
                </button>
              );
            })}
          </div>

          <div className="px-8 py-6">
            {activeDay?.slots?.length ? (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {activeDay.slots.map((s) => (
                  <button
                    key={s.start}
                    type="button"
                    onClick={() => {
                      setSlot(s);
                      formOpenedAt.current = Date.now();
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
              <p className="body-base text-grey-600">Op deze dag zijn geen tijden beschikbaar. Kies een andere dag.</p>
            )}
          </div>
        </>
      )}

      {slot && status === "ready" && (
        <form onSubmit={handleSubmit} className="relative border-t border-grey-200 px-8 py-6">
          <p className="body-base text-navy">
            <span className="text-grey-600">{SOORTEN[soort].label}:</span>{" "}
            {new Date(slot.start).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })} om{" "}
            {slot.time}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Input name="firstName" label="Voornaam *" required />
            <Input name="lastName" label="Achternaam" />
            <Input name="companyName" label="Bedrijfsnaam *" required />
            <Input name="email" label="E-mailadres (ontvangt de uitnodiging) *" type="email" required />
            <Input name="phone" label="Telefoonnummer *" type="tel" required />
            {soort === "onsite" && <Input name="address" label="Bezoekadres *" required />}
          </div>

          <div className="mt-8 border-t border-grey-200 pt-6">
            <p className="text-sm font-medium text-navy">Intake</p>
            <p className="mt-1 text-xs text-grey-600">Interne informatie voor Joey. Niet zichtbaar voor de klant.</p>
            <div className="mt-4 space-y-4">
              {INTAKE.map((v) => (
                <Textarea key={v.name} name={v.name} label={v.label} placeholder={v.placeholder} rows={2} />
              ))}
              <Textarea
                name="notes"
                label="Overige notities"
                placeholder="Bijvoorbeeld: wie de beslissing neemt, de openstaande vacature en wat is afgesproken."
                rows={3}
              />
            </div>
          </div>

          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Dit veld niet invullen
              <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <Turnstile onToken={setTurnstileToken} className="mt-4" />

          <button
            type="submit"
            disabled={submitState === "sending"}
            className="mt-6 w-full rounded-[40px] bg-navy px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
          >
            {submitState === "sending" ? "Bezig met inplannen…" : "Afspraak inplannen en uitnodiging versturen"}
          </button>

          {errorMsg && <p className="mt-4 text-sm text-accent">{errorMsg}</p>}
        </form>
      )}
    </div>
  );
}

function Textarea({ name, label, placeholder, rows = 2 }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-navy">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl border border-grey-300 px-4 py-3 text-base text-navy focus:border-brand focus:outline-none"
      />
    </label>
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
