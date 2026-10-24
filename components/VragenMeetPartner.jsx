"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SECTIONS } from "@/content/meetpartner-vragen";
import { VRAGEN_ENDPOINT, FA_TOKEN } from "@/lib/config";

/**
 * Vragenlijst fase 2 voor MeetPartner, achter een toegangscode.
 *
 * De code wordt niet in de site gecontroleerd (die is statisch en openbaar)
 * maar in de n8n-workflow achter VRAGEN_ENDPOINT, bij elke aanvraag. De site
 * onthoudt alleen de ingetypte code in localStorage zodat Lodi niet elke keer
 * opnieuw hoeft in te loggen. Elke wijziging in een antwoordveld wordt na een
 * korte pauze opgeslagen (één record per vraag in Airtable); er is bewust geen
 * opslaan-knop.
 */

const CODE_KEY = "mp-vragen-code";
const CACHE_KEY = "mp-vragen-cache-v1";
const SAVE_DELAY_MS = 800;

const ALL = SECTIONS.flatMap((s) =>
  s.q.map((q, i) => ({ ...q, sectie: s.id, sectieTitel: s.title, nummer: i + 1 })),
);
const OPEN = ALL.filter((q) => !q.known);
const BY_ID = Object.fromEntries(ALL.map((q) => [q.id, q]));

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* privémodus of vol: de server blijft de waarheid */
  }
}

async function call(payload) {
  const res = await fetch(VRAGEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-fa-token": FA_TOKEN,
    },
    body: JSON.stringify(payload),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { status: res.status, ok: res.ok && data && data.ok === true, data };
}

function fmtTime(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("nl-NL", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function hasText(a) {
  return !!(a && a.antwoord && a.antwoord.trim());
}

export default function VragenMeetPartner() {
  const [code, setCode] = useState("");
  const [phase, setPhase] = useState("boot"); // boot | login | checking | ready
  const [loginError, setLoginError] = useState("");
  const [answers, setAnswers] = useState({});
  const [net, setNet] = useState("ok"); // ok | saving | error
  const [pending, setPending] = useState({}); // id -> "typing" | "saving"
  const [done, setDone] = useState("idle"); // idle | sending | sent | error
  const timers = useRef({});
  const codeRef = useRef("");

  const load = useCallback(async (c) => {
    const r = await call({ action: "list", code: c });
    if (!r.ok) return r;
    const server = r.data.antwoorden || {};
    const cache = readStorage(CACHE_KEY, {});
    // Nieuwste wint: een antwoord dat lokaal nieuwer is (bijvoorbeeld getypt
    // terwijl de verbinding wegviel) gaat alsnog naar de server.
    const merged = { ...server };
    const resend = [];
    for (const [id, loc] of Object.entries(cache)) {
      const srv = server[id];
      if (hasText(loc) && (!srv || (loc.bijgewerkt || "") > (srv.bijgewerkt || ""))) {
        merged[id] = loc;
        resend.push(id);
      }
    }
    setAnswers(merged);
    writeStorage(CACHE_KEY, merged);
    for (const id of resend) {
      // eslint-disable-next-line no-use-before-define
      saveNow(c, id, merged[id].antwoord);
    }
    return r;
  }, []);

  // Opstart: bekende code proberen, anders inloggen.
  useEffect(() => {
    const saved = readStorage(CODE_KEY, "");
    if (!saved) {
      setPhase("login");
      return;
    }
    codeRef.current = saved;
    setCode(saved);
    setPhase("checking");
    load(saved).then((r) => {
      if (r.ok) setPhase("ready");
      else {
        setPhase("login");
        if (r.status === 403) writeStorage(CODE_KEY, "");
        else setLoginError("Geen verbinding met de opslag. Probeer het zo nog eens.");
      }
    });
  }, [load]);

  async function handleLogin(e) {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!c) return;
    setLoginError("");
    setPhase("checking");
    const r = await load(c);
    if (r.ok) {
      codeRef.current = c;
      writeStorage(CODE_KEY, c);
      setPhase("ready");
    } else {
      setPhase("login");
      setLoginError(
        r.status === 403
          ? "Deze code klopt niet. Kijk het bericht van Joey nog eens na."
          : "Geen verbinding met de opslag. Probeer het zo nog eens.",
      );
    }
  }

  function logout() {
    writeStorage(CODE_KEY, "");
    codeRef.current = "";
    setCode("");
    setPhase("login");
  }

  async function saveNow(c, id, text) {
    const q = BY_ID[id];
    setPending((p) => ({ ...p, [id]: "saving" }));
    setNet("saving");
    const r = await call({
      action: "save",
      code: c,
      vraag_id: id,
      onderdeel: q.sectieTitel,
      nummer: q.nummer,
      vraag: q.vraag,
      antwoord: text,
    });
    if (r.ok) {
      const bijgewerkt = r.data.bijgewerkt || new Date().toISOString();
      setAnswers((a) => {
        const next = { ...a, [id]: { ...(a[id] || {}), antwoord: text, bijgewerkt } };
        writeStorage(CACHE_KEY, next);
        return next;
      });
      setPending((p) => {
        const n = { ...p };
        delete n[id];
        return n;
      });
      setNet((s) => (s === "saving" ? "ok" : s));
    } else {
      setPending((p) => ({ ...p, [id]: "error" }));
      setNet("error");
      if (r.status === 403) logout();
    }
  }

  function onChange(id, text) {
    const now = new Date().toISOString();
    setAnswers((a) => {
      const next = { ...a, [id]: { ...(a[id] || {}), antwoord: text, bijgewerkt: now } };
      writeStorage(CACHE_KEY, next);
      return next;
    });
    setPending((p) => ({ ...p, [id]: "typing" }));
    clearTimeout(timers.current[id]);
    timers.current[id] = setTimeout(() => saveNow(codeRef.current, id, text), SAVE_DELAY_MS);
  }

  async function handleDone() {
    setDone("sending");
    const r = await call({ action: "klaar", code: codeRef.current });
    setDone(r.ok ? "sent" : "error");
  }

  const counts = useMemo(() => {
    const per = {};
    let total = 0;
    for (const s of SECTIONS) {
      const open = s.q.filter((q) => !q.known);
      const d = open.filter((q) => hasText(answers[q.id])).length;
      per[s.id] = { done: d, total: open.length };
      total += d;
    }
    return { per, total, all: OPEN.length };
  }, [answers]);

  if (phase === "boot" || phase === "checking") {
    return (
      <section className="bg-white">
        <div className="container-site py-24 text-grey-600">Even geduld…</div>
      </section>
    );
  }

  if (phase === "login") {
    return (
      <section className="bg-white">
        <div className="container-site py-20 lg:py-28">
          <div className="max-w-md">
            <p className="eyebrow text-grey-600">MeetPartner · fase 2</p>
            <h1 className="h-section mt-4 text-navy">Vragenlijst voor Lodi</h1>
            <p className="body-base mt-4 text-grey-600">
              Vul de toegangscode in die je van Joey hebt gekregen. Je antwoorden worden
              daarna vanzelf bewaard.
            </p>
            <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="mp-code">
                Toegangscode
              </label>
              <input
                id="mp-code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="MP-XXXX-XXXX"
                className="h-12 flex-1 rounded-[10px] border border-grey-300 px-4 font-mono text-base tracking-wider text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-[40px] bg-navy px-6 text-sm font-medium tracking-[-0.02em] text-white hover:bg-navy/90"
              >
                Verder
              </button>
            </form>
            {loginError && (
              <p className="mt-3 text-sm text-[#b42318]" role="alert">
                {loginError}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  const statusLabel =
    net === "error"
      ? "Opslaan lukt niet, probeer het zo nog eens"
      : net === "saving" || Object.keys(pending).length
        ? "Opslaan…"
        : "Alles opgeslagen";
  const statusDot = net === "error" ? "bg-[#b42318]" : net === "saving" ? "bg-brand" : "bg-[#1f8a4c]";

  return (
    <>
      {/* Status, blijft bovenin zichtbaar */}
      <div className="sticky top-[72px] z-40 border-b border-line bg-white/85 backdrop-blur-md">
        <div className="container-site flex h-11 items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-2 text-ink-muted" role="status" aria-live="polite">
            <span className={`h-2 w-2 shrink-0 rounded-full ${statusDot}`} aria-hidden />
            {statusLabel}
          </span>
          <span className="tabular-nums text-ink-muted">
            {counts.total} van {counts.all} beantwoord
          </span>
        </div>
      </div>

      <section className="bg-white">
        <div className="container-site pt-16 pb-10 lg:pt-20">
          <p className="eyebrow flex items-center gap-2 text-navy">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-white">
              ?
            </span>
            MeetPartner · fase 2
          </p>
          <h1 className="h-display mt-6 max-w-3xl text-navy">
            Jouw antwoorden bepalen <span className="text-ink-muted">hoe de planning gebouwd wordt.</span>
          </h1>
          <p className="body-lg mt-6 max-w-2xl text-grey-600">
            Lodi, hieronder staan alle open vragen voor fase 2, in zes onderdelen. Bij elke
            vraag kun je uitklappen <strong className="font-semibold text-navy">waarom we het vragen</strong> en{" "}
            <strong className="font-semibold text-navy">hoe een antwoord eruit kan zien</strong>. Typ je
            antwoord in het veld eronder, in je eigen woorden. Kort mag; &ldquo;weet ik niet&rdquo; of
            &ldquo;later&rdquo; mag ook.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Niets opslaan", "Alles wat je typt wordt direct bewaard. Je kunt dit tabblad gewoon sluiten."],
              ["In delen", "Je hoeft niet alles in één keer te doen. Kom later terug, ook op een ander apparaat."],
              ["Aanpassen mag", "Een antwoord veranderen? Typ gewoon over het oude heen."],
            ].map(([h, t]) => (
              <div key={h} className="rounded-[var(--radius-card)] border border-line p-4 text-[15px] leading-relaxed text-ink-muted">
                <b className="mb-0.5 block font-semibold text-navy">{h}</b>
                {t}
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm tabular-nums text-ink-muted">
            <span>
              {counts.total} van {counts.all} beantwoord
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full border border-line bg-surface-alt">
              <div
                className="h-full bg-brand transition-[width]"
                style={{ width: `${counts.all ? Math.round((counts.total / counts.all) * 100) : 0}%` }}
              />
            </div>
          </div>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Onderdelen">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-[40px] border border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-navy hover:bg-surface-alt"
              >
                {s.title.split(":")[0]}
                <span className="font-normal tabular-nums text-ink-muted">
                  {counts.per[s.id].done}/{counts.per[s.id].total}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {SECTIONS.map((s, si) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-32 ${si % 2 === 0 ? "bg-surface-alt" : "bg-white"}`}
        >
          <div className="container-site py-12 lg:py-16">
            <p className="eyebrow text-grey-600">
              Onderdeel {si + 1} van {SECTIONS.length}
            </p>
            <h2 className="h-section mt-3 text-navy">{s.title}</h2>
            <p className="body-base mt-3 max-w-2xl text-grey-600">{s.sub}</p>
            <p className="mt-1 text-[13px] tabular-nums text-ink-muted">
              {counts.per[s.id].done} van {counts.per[s.id].total} beantwoord
            </p>
            <div className="mt-6 grid gap-3.5">
              {s.q.map((q, qi) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  nummer={qi + 1}
                  sectieTitel={s.title}
                  value={(answers[q.id] && answers[q.id].antwoord) || ""}
                  bijgewerkt={answers[q.id] && answers[q.id].bijgewerkt}
                  state={pending[q.id]}
                  onChange={(t) => onChange(q.id, t)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-white">
        <div className="container-site py-16 lg:py-20">
          <div className="grid gap-4 rounded-[var(--radius-block)] border border-line p-6 lg:p-8">
            <h3 className="h-card text-navy">Klaar, of klaar voor nu?</h3>
            <p className="body-base max-w-2xl text-grey-600">
              Je hoeft niets te versturen: je antwoorden zijn al bewaard en Joey kan ze zien.
              Ben je helemaal klaar, of wil je dat Joey alvast naar je antwoorden kijkt? Druk
              dan op de knop; hij krijgt dan een mail met alles wat je tot nu toe hebt
              ingevuld.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDone}
                disabled={done === "sending"}
                className="inline-flex items-center justify-center rounded-[40px] bg-navy px-6 py-3 text-sm font-medium tracking-[-0.02em] text-white hover:bg-navy/90 disabled:opacity-60"
              >
                {done === "sending" ? "Bezig…" : "Ik ben klaar, laat het Joey weten"}
              </button>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center justify-center rounded-[40px] border border-grey-300 bg-white px-6 py-3 text-sm font-medium tracking-[-0.02em] text-navy hover:bg-grey-150"
              >
                Uitloggen
              </button>
            </div>
            {done === "sent" && (
              <p className="text-sm text-[#1f8a4c]" role="status">
                Joey heeft een mail gekregen met je antwoorden. Je kunt later altijd nog iets aanpassen.
              </p>
            )}
            {done === "error" && (
              <p className="text-sm text-[#b42318]" role="alert">
                Dat lukte niet. Je antwoorden zijn wel bewaard; stuur Joey even een berichtje.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function QuestionCard({ q, nummer, sectieTitel, value, bijgewerkt, state, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const answered = !!value.trim();

  // Het veld groeit mee met de tekst.
  useEffect(() => {
    const t = ref.current;
    if (!t) return;
    t.style.height = "auto";
    t.style.height = `${Math.max(56, t.scrollHeight + 2)}px`;
  }, [value]);

  const meta =
    state === "typing" || state === "saving"
      ? "Wordt opgeslagen…"
      : state === "error"
        ? "Niet opgeslagen, probeer het zo nog eens"
        : answered
          ? `Opgeslagen ${fmtTime(bijgewerkt)}`
          : "";

  return (
    <article
      id={`q-${q.id}`}
      className={`overflow-hidden rounded-[var(--radius-card)] border bg-white ${answered ? "border-[#1f8a4c]/50" : "border-line"}`}
    >
      <div className="flex items-start gap-3.5 px-4 pt-4 sm:px-6 sm:pt-5">
        <span
          aria-hidden
          className={`mt-0.5 inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border text-[12.5px] font-semibold tabular-nums ${
            answered ? "border-[#1f8a4c] bg-[#1f8a4c] text-white" : "border-line bg-surface-alt text-ink-muted"
          }`}
        >
          {nummer}
        </span>
        <div className="min-w-0 text-[16.5px] font-medium leading-relaxed text-navy">
          {q.vraag}
          {(q.need || q.known) && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {q.need && (
                <span className="rounded-[40px] border border-accent/45 px-2.5 py-0.5 text-[11.5px] font-semibold text-accent">
                  Nodig vóór de bouw
                </span>
              )}
              {q.known && (
                <span className="rounded-[40px] border border-[#1f8a4c]/45 px-2.5 py-0.5 text-[11.5px] font-semibold text-[#1f8a4c]">
                  Al beantwoord
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {q.known && (
        <p className="mx-4 mt-3.5 border-t border-line pt-3 text-[15px] leading-relaxed text-grey-600 sm:mx-6 sm:ml-[66px]">
          <b className="font-semibold text-navy">Antwoord 22-10.</b> {q.known.replace(/^Beantwoord op 22-10: /, "")}
        </p>
      )}

      <div className="mx-4 mt-3.5 sm:mx-6 sm:ml-[66px]">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`panel-${q.id}`}
          className="flex w-full items-center justify-between gap-3 border-t border-line py-2.5 text-left text-sm font-medium text-navy"
        >
          <span>{q.known ? "Wat er op 22-10 is afgesproken" : "Waarom deze vraag, en een voorbeeld"}</span>
          <span
            aria-hidden
            className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-base leading-none text-white transition-transform ${open ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
        {open && (
          <div id={`panel-${q.id}`} className="grid gap-3.5 pb-3.5 pt-1 text-[15px] leading-relaxed text-grey-600">
            <div>
              <h4 className="eyebrow mb-1 text-ink-muted">Waarom we dit vragen</h4>
              <p>{q.waarom}</p>
            </div>
            {q.vb.length > 0 && (
              <div>
                <h4 className="eyebrow mb-1 text-ink-muted">Zo kan een antwoord eruitzien</h4>
                <div className="border-l-[3px] border-line pl-3.5 italic text-navy">
                  {q.vb.map((v) => (
                    <p key={v} className="[&+p]:mt-1.5">
                      {v}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-2 px-4 pb-4 pt-3.5 sm:px-6 sm:pl-[66px] sm:pb-5">
        <textarea
          ref={ref}
          id={`ta-${q.id}`}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={q.known ? "Alleen invullen als dit niet meer klopt" : "Typ je antwoord…"}
          aria-label={`Antwoord op vraag ${nummer} van ${sectieTitel}`}
          className="min-h-[56px] w-full resize-none overflow-hidden rounded-[10px] border border-grey-300 px-3.5 py-3 text-base leading-relaxed text-ink outline-none placeholder:text-grey-500 focus:border-brand focus:ring-[3px] focus:ring-brand/20"
        />
        <p className={`min-h-[1.2em] text-[12.5px] tabular-nums ${state === "error" ? "text-[#b42318]" : answered && !state ? "text-[#1f8a4c]" : "text-ink-muted"}`}>
          {meta}
        </p>
      </div>
    </article>
  );
}
