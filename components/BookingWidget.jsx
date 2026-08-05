"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Turnstile, { resetTurnstile } from "@/components/Turnstile";

const AVAILABILITY_ENDPOINT = process.env.NEXT_PUBLIC_AVAILABILITY_ENDPOINT || "";
const BOOKING_ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT || "";
const FA_TOKEN = process.env.NEXT_PUBLIC_FA_TOKEN || "";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "x-fa-token": FA_TOKEN,
};

function formatDay(iso) {
  const d = new Date(iso + "T12:00:00");
  return {
    weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
    day: d.toLocaleDateString("en-GB", { day: "numeric" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
  };
}

export default function BookingWidget() {
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
        setErrorMsg(body.message || "That time was just booked. Please pick another slot.");
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
        setErrorMsg(body.message || "Something went wrong. Please try again.");
      }
      setSubmitState("error");
    } catch {
      setErrorMsg("Could not reach the booking service. Please try again.");
      setSubmitState("error");
    }
  }

  if (status === "loading") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10 text-center">
        <p className="body-base text-grey-600">Loading available times…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10">
        <p className="body-base text-navy">Couldn&apos;t load the calendar.</p>
        <p className="body-base mt-2 text-grey-600">
          Email us at{" "}
          <a href="mailto:joey@getfasteradmin.com" className="text-brand hover:underline">
            joey@getfasteradmin.com
          </a>{" "}
          and we&apos;ll sort a time.
        </p>
      </div>
    );
  }

  if (submitState === "booked") {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-10">
        <h3 className="h-card text-navy">You&apos;re booked in.</h3>
        <p className="body-base mt-4 text-grey-600">
          A calendar invite is on its way to your inbox. If it doesn&apos;t arrive in a few
          minutes, check your spam folder or email us at{" "}
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
        <h3 className="h-card text-navy">Pick a time</h3>
        <p className="mt-1 text-xs text-grey-600">
          30 minutes · times shown in {timezone.replace("_", " ")}
        </p>
      </div>

      {/* Day picker */}
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
          <p className="body-base text-grey-600">No times left on this day. Try another.</p>
        )}
      </div>

      {/* Details */}
      {slot && (
        <form onSubmit={handleSubmit} className="relative border-t border-grey-200 px-8 py-6">
          <p className="body-base text-navy">
            <span className="text-grey-600">Booking</span>{" "}
            {new Date(slot.start).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            at {slot.time}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Input name="fullName" label="Your name *" required />
            <Input name="email" label="Email *" type="email" required />
            <Input name="companyName" label="Company" />
            <Input name="website" label="Website" />
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-navy">What do you want to automate?</span>
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
            {submitState === "sending" ? "Booking…" : "Confirm booking"}
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
