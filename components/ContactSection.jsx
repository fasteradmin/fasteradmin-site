"use client";

import { useRef, useState } from "react";
import Turnstile, { resetTurnstile } from "@/components/Turnstile";

/**
 * The dark contact block that closes every page.
 *
 * The Framer original posted to Framer's own hosted form handler, which does
 * not exist off-platform. Two modes here:
 *
 *  1. If NEXT_PUBLIC_FORM_ENDPOINT is set, the form POSTs there (n8n webhook,
 *     Formspree, Web3Forms — anything that accepts multipart form data).
 *  2. If it is not set, the form falls back to opening the visitor's mail
 *     client prefilled to CONTACT_EMAIL. Not as good as a real handler, but it
 *     means the form is never a dead end and no lead is silently dropped.
 */
import { FORM_ENDPOINT, FA_TOKEN, CONTACT_EMAIL } from "@/lib/config";

export { CONTACT_EMAIL };

// Only the minimal variant needs locale support: it is the only variant used
// on the Dutch homepage. The full form (heading, field labels, button,
// status messages) only ever renders on /contact, which has no Dutch copy
// yet — see the PR description.
const MINIMAL_COPY = {
  en: "Rather send a message first than pick a time?",
  // Verbatim from the Dutch copy doc's AFSLUITING/CONTACT section.
  nl: "Liever eerst een bericht dan meteen een tijd prikken?",
};

export default function ContactSection({ minimal = false, locale = "en" }) {
  const [state, setState] = useState("idle");
  // When this form rendered. The workflow rejects submissions that arrive
  // faster than a human could plausibly type. See the Abuse Gate node.
  const renderedAt = useRef(Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No backend configured: hand off to the visitor's mail client.
    if (!FORM_ENDPOINT) {
      const subject = `Website enquiry from ${data.get("Name") || "the website"}`;
      const body = [
        `Name: ${data.get("Name") || ""}`,
        `Email: ${data.get("Email") || ""}`,
        "",
        "Project and goals:",
        data.get("Message") || "",
      ].join("\n");

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setState("mailto");
      return;
    }

    setState("sending");

    // Sent as JSON so the n8n webhook can read $json.body.Name etc.
    // predictably; multipart lands in a less stable shape.
    const payload = {
      Name: data.get("Name") || "",
      Email: data.get("Email") || "",
      Message: data.get("Message") || "",
      page: typeof window !== "undefined" ? window.location.pathname : "",
      hp_field: data.get("hp_field") || "",
      t: renderedAt.current,
      turnstileToken,
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-fa-token": FA_TOKEN,
        },
      });

      // Turnstile tokens are single-use, so a fresh one is needed either way.
      resetTurnstile();
      setTurnstileToken("");

      if (res.ok) {
        form.reset();
        renderedAt.current = Date.now();
        setState("sent");
        // Let the tracking stack see a real conversion.
        window.gtag?.("event", "generate_lead", { form: "contact" });
        window.fbq?.("track", "Lead");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  // Contact already leads with The Ops Call above this section on /contact.
  // A second full form here would be a second primary action, not a fallback,
  // so this variant drops the form entirely and leaves one plain line.
  if (minimal) {
    return (
      <section id="section-contact" className="bg-navy">
        <div className="container-site py-16 lg:py-20">
          <p className="body-base max-w-md text-grey-400">
            {MINIMAL_COPY[locale]}{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="section-contact" className="bg-navy">
      <div className="container-site grid gap-16 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <h2 id="send-a-message" className="h-section text-white">Not ready to pick a time yet?</h2>
          <p className="h-section mt-2 text-brand">Send us what&apos;s going on instead.</p>
          <p className="body-base mt-8 max-w-md text-grey-400">
            Tell us how work moves today and where it gets stuck. We&apos;ll read it and get
            back to you.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-block text-base text-brand hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="relative flex flex-col gap-8">
          <Field label="Name *" name="Name" placeholder="Jane Foster" required />
          <Field
            label="E-mail *"
            name="Email"
            type="email"
            placeholder="jerry@fasteradmin.com"
            required
          />
          <Field
            label="Project and goals *"
            name="Message"
            placeholder="Tell us more"
            required
            textarea
          />

          {/*
            Honeypot. Hidden from sighted users by position, and from screen
            readers by aria-hidden, so no real visitor can fill it in. Bots
            that populate every input trip it and get a decoy success.
            Deliberately NOT display:none — some bots skip those.
          */}
          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Do not fill this in
              <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <Turnstile onToken={setTurnstileToken} />

          <button
            type="submit"
            disabled={state === "sending"}
            className="rounded-[40px] bg-white px-8 py-4 text-sm font-medium text-navy transition-colors hover:bg-grey-150 disabled:opacity-60"
          >
            {state === "sending" ? "Sending…" : "Send message"}
          </button>

          {state === "sent" && (
            <p className="text-sm text-brand">Thanks, we&apos;ll be in touch shortly.</p>
          )}
          {state === "mailto" && (
            <p className="text-sm text-brand">
              Opening your email app. If nothing happened, mail us at {CONTACT_EMAIL}.
            </p>
          )}
          {state === "error" && (
            <p className="text-sm text-accent">
              Something went wrong. Please email us at {CONTACT_EMAIL} instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, type = "text", required, textarea }) {
  const cls =
    "w-full border-b border-white/25 bg-transparent pb-3 text-base text-white placeholder:text-white/35 focus:border-brand focus:outline-none";

  return (
    <label className="block">
      <span className="mb-3 block text-base text-white">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={`${cls} resize-y`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={cls}
        />
      )}
    </label>
  );
}
