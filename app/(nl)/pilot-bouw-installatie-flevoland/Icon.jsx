/** Lijniconen in de stijl van de merkhuid: 24px raster, stroke 1.6. */
const PATHS = {
  inbox: (
    <>
      <path d="M3 13h5l1.5 3h5L16 13h5" />
      <path d="M5.5 5h13L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" />
    </>
  ),
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </>
  ),
  check: <path d="M4 12.5l5 5L20 6.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3l2.7 2.7L16 9.5" />
    </>
  ),
  x: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  euro: (
    <>
      <path d="M17 6.5A7 7 0 1 0 17 17.5" />
      <path d="M4.5 10.5h9M4.5 13.5h9" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  calc: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18h2M12 18h4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M8.5 10h7M8.5 14h7M8.5 18h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14.6c2.3.1 3.9 1.5 4.5 4.4" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3 9h18v-3H3zM12 6v14M12 6c-1.5-3-5-3-5-1s3 1 5 1c2 0 5 1 5-1s-3.5-2-5 1" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5l9.5 16.5h-19z" />
      <path d="M12 10v4M12 17v.5" />
    </>
  ),
  hourglass: (
    <>
      <path d="M7 3h10M7 21h10" />
      <path d="M8 3c0 4 8 5 8 9s-8 5-8 9M16 3c0 4-8 5-8 9" />
    </>
  ),
  userLeave: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5" />
      <path d="M16 12h5M18.5 9.5L21 12l-2.5 2.5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  pen: (
    <>
      <path d="M4 20l4-1L19 8l-3-3L5 16z" />
      <path d="M14 7l3 3" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.5 6 .7-4.4 4.1 1.1 5.9L12 16.8 6.7 19.7l1.1-5.9L3.4 9.7l6-.7z" />,
};

export default function Icon({ name, size = 24, className, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {PATHS[name]}
    </svg>
  );
}
