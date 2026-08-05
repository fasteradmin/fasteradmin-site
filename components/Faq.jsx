"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const items = [
  {
    q: "How long does a project take?",
    a: "Most projects fall between 2 and 8 weeks, depending on complexity. A brand identity with a simple website might take closer to two weeks, while a larger project with UX, UI, and multiple page templates could take longer.",
  },
  {
    q: "What do I need to get started?",
    a: "Yes — that’s part of our process. We design websites that don’t require a developer for every small change. You’ll be able to update content, add projects, write blog posts, and adjust visuals without technical stress. We also provide a short training session or handoff guide, so your team feels confident managing things internally. Think of it as future-proofing your investment.",
  },
  {
    q: "Do I need to change software?",
    a: "Not at all. We work with companies at every stage. If you already have a brand system, we’ll refine and extend it. If you’re starting from scratch, we’ll guide you through strategy, naming, identity, and tone of voice before we move into design. Many of our clients came to us with just an idea — by the time we launched, they had a full brand and website they could grow with.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Design and branding don’t end at launch day. We provide post-launch support for small fixes, adjustments, or questions in the first weeks. For brands that want ongoing help — adding new pages, refreshing visuals, optimizing UX — we offer retainer options. This means you’ll always have us as a creative partner when you need to evolve or scale.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-grey-200">
      <div className="container-site py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-navy">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-white">
                ?
              </span>
              FAQ
            </p>

            <h2 className="h-section mt-6 text-navy">
              Here are some of the things{" "}
              <span className="text-grey-400">most clients want to know.</span>
            </h2>

            <p className="body-base mt-8 text-grey-600">
              Not finding what you need?
              <br />
              Reach out anytime. We&apos;re happy to answer any questions before you commit to
              working together.
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
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 text-base text-navy hover:text-brand"
            >
              Ask a question <span aria-hidden>→</span>
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
