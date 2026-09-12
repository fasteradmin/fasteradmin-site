"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { isOwnDomain } from "@/lib/links";

/**
 * Copy per locale. English is byte-identical to what shipped before the
 * Dutch homepage existed — `locale` defaults to "en" so nothing that already
 * rendered this component changes.
 *
 * "Automation Checker" -> "Tijdlek-scan": the tool at tool.fasteradmin.com
 * was rebranded in a separate change (see fasteradmin-tool commit
 * a92681a). This nav was never updated to match, on either locale, until
 * now — the English label below is corrected at the same time as the Dutch
 * one is added, not a new inconsistency.
 */
const COPY = {
  // About/Learn/Contact are not yet translated (see the PR description), so
  // they still live at their original root paths rather than under /eng —
  // /eng only holds the homepage so far. The English nav points at those
  // real root paths; only "home" and "book a call" point into /eng, since
  // that's where the English homepage and its meeting section now live.
  en: {
    links: [
      { label: "About", href: "/about" },
      { label: "Learn", href: "/learn" },
      { label: "Contact", href: "/contact" },
      { label: "Tijdlek-scan", href: "https://tool.fasteradmin.com" },
    ],
    bookACall: "Book a call",
    meetingHref: "/eng/#section-meeting",
    homeHref: "/eng",
  },
  // About/Learn/Contact have no Dutch copy yet (see the PR description), so
  // they still point at the real English pages at their existing root paths.
  // Labels are Dutch, destinations are English until that pass happens — the
  // PR calls this out as the one deliberately mixed-language surface.
  nl: {
    links: [
      { label: "Over ons", href: "/about" },
      { label: "Inzichten", href: "/learn" },
      { label: "Contact", href: "/contact" },
      { label: "Tijdlek-scan", href: "https://tool.fasteradmin.com" },
    ],
    bookACall: "Plan een gesprek",
    meetingHref: "/#section-meeting",
    homeHref: "/",
  },
};

export default function Nav({ locale = "en" }) {
  const [open, setOpen] = useState(false);
  const t = COPY[locale];

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <nav className="container-site flex h-[72px] items-center justify-between">
        <Link href={t.homeHref} className="flex items-center" aria-label="Faster Admin home">
          <Image
            src="/img/pJFWiP5x9jQeaGSDwZogaYz9Ot8.png"
            alt="Faster Admin"
            width={183}
            height={37}
            priority
          />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {t.links.map((l) => (
            <NavLink key={l.label} {...l} />
          ))}
          <Link
            href={t.meetingHref}
            className="rounded-[40px] bg-navy px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-navy/90"
          >
            {t.bookACall}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-navy transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-navy transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-navy transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-grey-200 bg-white px-6 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {t.links.map((l) => (
              <NavLink key={l.label} {...l} onClick={() => setOpen(false)} block />
            ))}
            <Link
              href={t.meetingHref}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-[40px] bg-navy px-5 py-3 text-center text-[13px] font-medium text-white"
            >
              {t.bookACall}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ label, href, onClick, block }) {
  const cls = `rounded-[40px] px-4 py-2 text-[13px] font-medium text-navy transition-colors hover:bg-grey-150 ${block ? "block" : ""}`;

  if (href.startsWith("http")) {
    const own = isOwnDomain(href);
    return (
      <a
        href={href}
        {...(own ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className={cls}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={onClick}>
      {label}
    </Link>
  );
}
