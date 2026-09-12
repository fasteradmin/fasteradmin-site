"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * English answers are unchanged. Dutch answers come verbatim from
 * outputs/2026-09-12-fasteradmin-website-dutch-copy.md ("VEELGESTELDE
 * VRAGEN") — all five map 1:1 onto the questions already live here, so
 * nothing was translated by this pass, only reproduced.
 */
const ITEMS = {
  en: [
    {
      q: "Do we need to change the tools we already use?",
      a: "No. We connect what you have. Changing tools is a separate conversation, and usually not the first one worth having.",
    },
    {
      q: "What if this turns into a six-month project?",
      a: "The price and the go-live date get fixed at the scope stage, in writing, before the build starts. Not after.",
    },
    {
      q: "What if it just doesn't work?",
      a: "The scope document defines what \"working\" means before the build starts, so there's a fixed line for what's included. If it doesn't do that by the go-live date, we fix it at no extra charge. Work outside what the scope defined is a new scope, not unlimited rework on the old one.",
    },
    {
      q: "What happens after launch?",
      a: "Two to four weeks of hypercare while the system runs against real volume. Then a retainer if you want ongoing changes, or nothing if you don't.",
    },
    {
      q: "Does the scope fee count toward the build?",
      a: "No, it's a separate purchase. You own the document either way, and what you do with it afterward, including building with someone else, is up to you.",
    },
  ],
  nl: [
    {
      q: "Moeten we de tools veranderen die we nu gebruiken?",
      a: "Nee. We verbinden wat je hebt. Van tool wisselen is een apart gesprek, en meestal niet het eerste dat de moeite waard is.",
    },
    {
      q: "Wat als dit uitloopt op een project van zes maanden?",
      a: "De prijs en de opleverdatum staan vast bij de scope, zwart-op-wit, vóór de bouw begint. Niet erna.",
    },
    {
      q: "En als het gewoon niet werkt?",
      a: "Het scopedocument bepaalt vóór de bouw wat \"werken\" betekent, dus er ligt een vaste grens voor wat erbij hoort. Doet het dat niet op de opleverdatum, dan lossen we het op zonder meerkosten. Werk buiten wat de scope beschreef is een nieuwe scope, geen eindeloos herwerk op de oude.",
    },
    {
      q: "Wat gebeurt er na oplevering?",
      a: "Twee tot vier weken nazorg terwijl het systeem draait op echte volumes. Daarna een retainer als je doorlopend aanpassingen wilt, of niets als je dat niet wilt.",
    },
    {
      q: "Telt de scope-vergoeding mee voor de bouw?",
      a: "Nee, het is een aparte aankoop. Het document is sowieso van jou, en wat je er daarna mee doet, ook bouwen met iemand anders, is aan jou.",
    },
  ],
};

const COPY = {
  en: {
    eyebrow: "FAQ",
    heading: "Here are some of the things",
    headingMuted: "most clients want to know.",
    intro: "Not finding what you need?",
    introLine2: "Reach out anytime. We're happy to answer any questions before you commit to working together.",
    askAQuestion: "Ask a question",
    contactHref: "/contact",
  },
  nl: {
    eyebrow: "FAQ",
    heading: "Dit zijn de dingen die",
    headingMuted: "de meeste klanten willen weten.",
    intro: "Kom je er niet uit?",
    introLine2: "Stel je vraag gerust. We beantwoorden alles graag voordat je met ons in zee gaat.",
    askAQuestion: "Stel een vraag",
    contactHref: "/contact",
  },
};

export default function Faq({ locale = "en" }) {
  const [open, setOpen] = useState(0);
  const t = COPY[locale];
  const items = ITEMS[locale];

  return (
    <section className="bg-surface-alt">
      <div className="container-site py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-navy">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-white">
                ?
              </span>
              {t.eyebrow}
            </p>

            <h2 id="faq" className="h-section mt-6 text-navy">
              {t.heading} <span className="text-ink-muted">{t.headingMuted}</span>
            </h2>

            <p className="body-base mt-8 text-grey-600">
              {t.intro}
              <br />
              {t.introLine2}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Image
                src="/img/Tkeu4Z25LmXvGufjWDp2YIp6PuY.png"
                alt="Sarah de Bree"
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl object-cover"
              />
              <div>
                <p className="text-base font-semibold text-navy">Sarah de Bree</p>
                <p className="text-xs text-grey-600">Automations Engineer</p>
              </div>
            </div>

            <Link
              href={t.contactHref}
              className="mt-10 inline-flex items-center gap-3 text-base text-navy hover:text-brand"
            >
              {t.askAQuestion} <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="space-y-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="rounded-[var(--radius-card)] bg-white">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-8 py-6 text-left"
                  >
                    <span className="text-base font-medium text-navy">{item.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p className="body-base px-8 pb-7 text-grey-600">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
