"use client";

import { useState } from "react";

/** Small expandable "read more" card used in the manifesto's system block. */
export default function InfoCard({ heading, short, full }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-surface-alt p-6 transition-shadow hover:shadow-[0_1px_2px_rgba(14,42,68,.04),0_12px_32px_-12px_rgba(14,42,68,.12)]">
      <h4 className="text-[15px] font-medium text-navy">{heading}</h4>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-grey-600">
        {open ? full : short}{" "}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="font-bold text-navy"
        >
          {open ? "Lees minder" : "Lees meer"}
        </button>
      </p>
    </div>
  );
}
