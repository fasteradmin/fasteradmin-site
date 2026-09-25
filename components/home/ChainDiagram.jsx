/**
 * The hero diagram: the chain from admin speed to time for projects to
 * quality, drawn twice (manual, automated) and animated in reading order.
 *
 * Built 2026-09-24 from outputs/homepage-hero-snelheid.html in the brain
 * repo (beeld 2, "de keten"). Timing lives in globals.css under
 * "Chain diagram": a 14 s loop, each heading gets over a second of reading
 * time before the next one appears, then the manual row bar by bar to the
 * cross, then the automated row to the tick. prefers-reduced-motion shows
 * the finished state. Bar lengths are illustrative, not measured.
 *
 * Pure SVG, no client JS: the animation is CSS keyframes keyed on class
 * names (k-h1, k-ar1, k-mb1 ...), so it also runs in the static export.
 */
const COPY = {
  en: {
    heads: [
      ["Speed of", "admin"],
      ["Time for", "projects"],
      ["Quality", ""],
    ],
    manual: "Manual",
    automated: "Automated",
    cause1: "Slow admin leaves less time for projects, and mistakes cost quality.",
    cause2: "Fast admin leaves more time for projects, with fewer mistakes.",
    alt: "Three links, speed of admin, time for projects and quality: manual short bars and a cross, automated long bars and a tick",
  },
  nl: {
    heads: [
      ["Snelheid", "bureauwerk"],
      ["Ruimte voor", "projectwerk"],
      ["Kwaliteit", ""],
    ],
    manual: "Handmatig",
    automated: "Geautomatiseerd",
    cause1: "Trager bureauwerk laat minder tijd voor projecten, en fouten kosten kwaliteit.",
    cause2: "Sneller bureauwerk geeft meer tijd voor projecten, met minder fouten.",
    alt: "Drie schakels, snelheid van bureauwerk, tijd voor projecten en kwaliteit: handmatig korte balken en een fout, geautomatiseerd lange balken en een vinkje",
  },
};

const COLS = [40, 175, 310];
const CW = 110;

function Arrow({ x, y, cls }) {
  return (
    <g className={`pop ${cls}`}>
      <path className="ar" d={`M${x - 4} ${y} h13 M${x + 5} ${y - 4} l4 4 -4 4`} />
    </g>
  );
}

function Row({ y, label, vals, pref, ok }) {
  const xq = COLS[2] + CW * vals[2];
  return (
    <>
      <g className={`pop ${pref}l`}>
        <text className="t2" x="40" y={y - 12}>
          {label}
        </text>
      </g>
      {COLS.map((x, i) => (
        <g key={i}>
          <rect className="track" x={x} y={y} width={CW} height="36" rx="8" />
          <rect
            className={`seg g ${pref}b${i + 1}`}
            x={x}
            y={y}
            width={Math.round(CW * vals[i])}
            height="36"
            rx="8"
          />
          {i < 2 && <Arrow x={x + CW + 8} y={y + 18} cls={`${pref}a${i + 1}`} />}
        </g>
      ))}
      {ok ? (
        <g className={`pop ${pref}x`}>
          <path className="ok" d={`M${xq - 20} ${y + 18}l3 3 5-6`} />
        </g>
      ) : (
        <g className={`pop ${pref}x`}>
          <circle className="xbg" cx={xq + 16} cy={y + 18} r="8" />
          <path className="x" d={`M${xq + 12.5} ${y + 14.5}l7 7M${xq + 19.5} ${y + 14.5}l-7 7`} />
        </g>
      )}
    </>
  );
}

export default function ChainDiagram({ locale = "en" }) {
  const t = COPY[locale];
  return (
    <svg className="chain" viewBox="0 0 460 400" role="img" aria-label={t.alt}>
      {t.heads.map(([a, b], i) => (
        <g key={i}>
          <g className={`pop k-h${i + 1}`}>
            <text className="num" x={COLS[i]} y="46">
              {i + 1}
            </text>
            <text className="hd" x={COLS[i]} y="70">
              {a}
            </text>
            <text className="hd" x={COLS[i]} y="90">
              {b}
            </text>
          </g>
          {i < 2 && <Arrow x={COLS[i] + CW + 8} y={66} cls={`k-ar${i + 1}`} />}
        </g>
      ))}
      <Row y={150} label={t.manual} vals={[0.3, 0.35, 0.4]} pref="k-m" ok={false} />
      <Row y={262} label={t.automated} vals={[0.9, 0.85, 0.95]} pref="k-a" ok />
      <text className="cause" x="40" y="360">
        {t.cause1}
      </text>
      <text className="cause" x="40" y="378">
        {t.cause2}
      </text>
    </svg>
  );
}
