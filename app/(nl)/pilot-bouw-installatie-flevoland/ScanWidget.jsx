"use client";

import { useMemo, useState } from "react";
import s from "./pilot.module.css";
import { PROCESSES, VALUE_SHARE, normalPrice } from "./prices";

/**
 * De Onnodige-Kosten Scan van tool.fasteradmin.com, nagebouwd voor deze
 * pagina. Zelfde opties en exact dezelfde formule als de live tool, zodat
 * de uitkomst gelijk is:
 *   handwerk = keer per week × minuten × uurtarief / 60 × 46 werkweken
 *   fouten   = keer per maand × 12 × kosten per fout
 *   kop afgerond naar beneden op € 100 en op hele uren.
 * Wijzigt de formule in de tool, pas hem hier ook aan.
 */
const WEEKS = 46;
const TASKS = ["Offertes maken", "Calculaties maken", "Werkvoorbereiding"];
const FREQ = [1, 2, 3, 5, 8, 10, 15, 20, 30];
const MINUTES = [5, 10, 15, 20, 30, 45, 60, 90, 120];
const RATE = [40, 50, 60, 75, 90, 110];
const ERRORS = [0, 1, 2, 3, 4, 5, 8, 10];
const ERROR_COST = [50, 100, 150, 250, 500, 750, 1000, 2000];

const eur = (n) => "€ " + Math.round(n).toLocaleString("nl-NL");
const emptyTask = (i) => ({ task: TASKS[i % TASKS.length], freq: "", min: "", rate: 60, err: "", cost: "" });

function costOf(t) {
  const complete = t.freq !== "" && t.min !== "";
  if (!complete) return null;
  const hours = (Number(t.freq) * Number(t.min) * WEEKS) / 60;
  const manual = hours * Number(t.rate);
  const errors = t.err !== "" && t.cost !== "" ? Number(t.err) * 12 * Number(t.cost) : 0;
  return { hours, manual, errors, total: manual + errors };
}

export default function ScanWidget() {
  const [tasks, setTasks] = useState([emptyTask(0)]);

  const update = (i, key, value) =>
    setTasks((prev) => prev.map((t, j) => (j === i ? { ...t, [key]: value } : t)));

  const results = useMemo(() => tasks.map(costOf), [tasks]);
  const filled = results.filter(Boolean);
  const total = filled.reduce((a, r) => a + r.total, 0);
  const hours = filled.reduce((a, r) => a + r.hours, 0);
  const manual = filled.reduce((a, r) => a + r.manual, 0);

  // Persoonlijk anker per proces: normale prijs = 20% van het jaarbedrag van
  // de taken die bij dat proces horen (met bodem), naast de vaste pilotprijs.
  const anchors = PROCESSES.map((p) => {
    const yearly = tasks.reduce(
      (a, t, i) => (results[i] && p.scanTasks.includes(t.task) ? a + results[i].total : a),
      0
    );
    if (!yearly) return null;
    const normal = normalPrice(yearly);
    return {
      ...p,
      yearly,
      normal,
      qualifies: yearly >= p.minYearly,
      off: Math.round((1 - p.pilot / normal) * 100),
    };
  }).filter(Boolean);

  return (
    <div id="scan" className={s.grid2} style={{ alignItems: "start" }}>
      <div style={{ display: "grid", gap: 16 }}>
        {tasks.map((t, i) => (
          <div key={i} className={s.card}>
            <p className={s.label}>Het administratieve werk dat de meeste tijd kost</p>
            <p className={s.scanSentence}>
              <Sel value={t.task} onChange={(v) => update(i, "task", v)} options={TASKS} strong />{" "}
              doen we zo&apos;n{" "}
              <Sel value={t.freq} onChange={(v) => update(i, "freq", v)} options={FREQ} placeholder="hoe vaak" />{" "}
              keer per week. Als het goed gaat kost dat{" "}
              <Sel value={t.min} onChange={(v) => update(i, "min", v)} options={MINUTES} placeholder="minuten" />{" "}
              minuten per keer. Wie dit doet, kost ons zo&apos;n{" "}
              <Sel value={t.rate} onChange={(v) => update(i, "rate", v)} options={RATE} format={(v) => `€ ${v}`} />{" "}
              per uur. Per maand gaat het zo&apos;n{" "}
              <Sel value={t.err} onChange={(v) => update(i, "err", v)} options={ERRORS} placeholder="hoe vaak" />{" "}
              keer mis, en één fout kost ons alles bij elkaar zo&apos;n{" "}
              <Sel value={t.cost} onChange={(v) => update(i, "cost", v)} options={ERROR_COST} format={(v) => eur(v)} placeholder="bedrag" />
              .
            </p>
            {results[i] && (
              <p className={s.mono} style={{ marginTop: 16, color: "var(--muted)" }}>
                Dit werk: {eur(results[i].total)} per jaar, {Math.floor(results[i].hours)} uur
              </p>
            )}
          </div>
        ))}
        <p className={s.p} style={{ fontSize: 14, margin: 0 }}>
          Het tarief is het belaste uurtarief van wie dit werk doet. Kosten per fout is alles bij
          elkaar: hersteltijd, reis, materiaal, opnieuw doen.
        </p>
        {tasks.length < 3 && (
          <button
            type="button"
            className={`${s.btn} ${s.btnGhost}`}
            style={{ justifySelf: "start", cursor: "pointer" }}
            onClick={() => setTasks((prev) => [...prev, emptyTask(prev.length)])}
          >
            + Nog een taak
          </button>
        )}
      </div>

      <div className={`${s.card} ${s.grain} ${s.lei} ${s.onColour}`} style={{ position: "sticky", top: 100 }}>
        <p className={s.label}>Wat het je nu kost</p>
        {filled.length === 0 ? (
          <p className={s.p} style={{ fontSize: 19 }}>
            Zodra je eerste taak staat, verschijnt hier het getal. Live, narekenbaar en aan de lage
            kant.
          </p>
        ) : (
          <>
            <div className={s.stat}>{eur(Math.floor(total / 100) * 100)}</div>
            <p className={s.p} style={{ marginTop: 8 }}>
              per jaar, en {Math.floor(hours)} uur
            </p>
            <div className={s.scanSaving}>
              <p className={s.mono} style={{ margin: 0 }}>Halveren levert je ongeveer op</p>
              <div className={s.statSmall}>{eur(Math.floor(manual / 2 / 100) * 100)} per jaar</div>
            </div>
            {anchors.map((a) =>
              !a.qualifies ? (
                <div key={a.process} className={s.scanAnchor}>
                  <p className={s.mono} style={{ margin: 0 }}>{a.process}</p>
                  <p style={{ margin: "6px 0 0", fontSize: 15, lineHeight: 1.5 }}>
                    Valt buiten de pilot: daarvoor kost dit werk je nu minimaal{" "}
                    {eur(a.minYearly)} per jaar. Bij dit bedrag valt er te weinig te halveren om
                    de pilot voor jou te laten renderen.
                  </p>
                </div>
              ) : (
              <div key={a.process} className={s.scanAnchor}>
                <p className={s.mono} style={{ margin: 0 }}>{a.process}</p>
                <div className={s.scanAnchorRow}>
                  <span>Normale prijs voor jouw bedrijf</span>
                  <span className={s.strike} style={{ color: "rgba(255,255,255,.7)" }}>{eur(a.normal)}</span>
                </div>
                <div className={s.scanAnchorRow}>
                  <span>Jouw pilotprijs, eenmalig</span>
                  <span className={s.statSmall} style={{ fontSize: 28 }}>{eur(a.pilot)}</span>
                </div>
                {a.off > 0 && <span className={s.discount} style={{ background: "#fff" }}>−{a.off}%</span>}
              </div>
              )
            )}
            <p className={s.mono} style={{ fontSize: 11.5, lineHeight: 1.6 }}>
              Handwerk = keer per week × minuten × uurtarief ÷ 60 × {WEEKS} werkweken. Fouten = per
              maand × 12 × kosten per fout. Halveren rekent alleen met het handwerk. Normale prijs
              (voor klanten na de pilot) = {Math.round(VALUE_SHARE * 100)}% van het jaarbedrag van dat
              proces, minimaal € 1.500.
            </p>
            <a href="#boeken" className={`${s.btn} ${s.btnWhite}`} style={{ marginTop: 20 }}>
              Plan een belafspraak →
            </a>
          </>
        )}
      </div>
    </div>
  );
}

function Sel({ value, onChange, options, placeholder, format = (v) => v, strong }) {
  return (
    <select
      className={`${s.scanSelect} ${strong ? s.scanSelectStrong : ""} ${value === "" ? s.scanSelectEmpty : ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o} value={o}>
          {format(o)}
        </option>
      ))}
    </select>
  );
}
