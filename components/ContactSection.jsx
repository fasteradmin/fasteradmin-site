"use client";

import { useState } from "react";

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
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
export const CONTACT_EMAIL = "joey@getfasteradmin.com";

export default function ContactSection() {
  const [state, setState] = useState("idle");

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

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
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

  return (
    <section id="section-contact" className="bg-navy">
      <div className="container-site grid gap-16 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <h2 className="h-section text-white">
            If you&apos;re tired of repetitive manual admin work, and ready to get your time back.
          </h2>
          <p className="h-section mt-2 text-brand">Fill in the form below now.</p>
          <p className="body-base mt-8 max-w-md text-grey-400">
            Go through your current set-up with one of our experts, get honest advice, and a team
            that cares about the outcome as much as you do. Whether you prefer a quick call or a
            simple email, getting started is easy.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-block text-base text-brand hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
