"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Automation Checker", href: "https://tool.fasteradmin.com" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <nav className="container-site flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Faster Admin home">
          <Image
            src="/img/pJFWiP5x9jQeaGSDwZogaYz9Ot8.png"
            alt="Faster Admin"
            width={183}
            height={37}
            priority
          />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <NavLink key={l.label} {...l} />
          ))}
          <Link
            href="/#section-meeting"
            className="rounded-[40px] bg-navy px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-navy/90"
          >
            Book a call
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
            {links.map((l) => (
              <NavLink key={l.label} {...l} onClick={() => setOpen(false)} block />
            ))}
            <Link
              href="/#section-meeting"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-[40px] bg-navy px-5 py-3 text-center text-[13px] font-medium text-white"
            >
              Book a call
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
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
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
