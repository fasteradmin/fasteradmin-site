import PilotBooking from "./PilotBooking";
import ScanWidget from "./ScanWidget";
import PostHogLoader from "./PostHogLoader";
import LeadTracking from "./LeadTracking";
import Icon from "./Icon";
import s from "./pilot.module.css";
import { PROCESSES, PRICE_FLOOR, EXAMPLES, eur, yearlyCost, normalPrice } from "./prices";

const PRICE_OF = Object.fromEntries(PROCESSES.map((p) => [p.process, p]));
const NORMAL_PRICE_TEXT = `20% van wat het je per jaar kost, minimaal ${eur(PRICE_FLOOR)}`;

/** Aandeel bezoekers (%) dat lead-variant B krijgt; de rest krijgt A. */
const VARIANT_B_PERCENT = 50;

/**
 * Bewust een gewone <script>, geen next/script: hij moet synchroon draaien
 * vóór de browser de lead-varianten hieronder tekent, anders flitst de
 * verkeerde variant. Werkt zonder server (de site exporteert statisch).
 * Schrijft geen attributen op door React gerenderde elementen (dat gaf een
 * hydration-fout); bij B komt er een <style> in <head>, die React 19 negeert.
 */
const ANTI_FLICKER_SCRIPT = `
(function(){try{
  var m=document.cookie.match(/(?:^|; )fa_pilot_lead=([ab])/);
  var v=m?m[1]:(Math.random()*100<${VARIANT_B_PERCENT}?"b":"a");
  if(!m)document.cookie="fa_pilot_lead="+v+"; max-age=31536000; path=/";
  window.__faLead=v;
  if(v==="b"){var st=document.createElement("style");
    st.textContent='[data-variant="a"]{display:none!important}[data-variant="b"]{display:block!important}';
    document.head.appendChild(st);}
}catch(e){}})();
`;

/**
 * De hele pilotpagina. `theme` kiest de huid: "eleven" (merkidentiteit naar
 * elevenlabs.io) of "site" (de kleuren van de live fasteradmin.com).
 */
export default function PilotPage({ theme = "eleven" }) {
  return (
    <div className={`${s.page} ${theme === "site" ? s.themeSite : ""}`}>
      <PostHogLoader />
      <LeadTracking />
      <script dangerouslySetInnerHTML={{ __html: ANTI_FLICKER_SCRIPT }} />

      <div className={s.statusbar}>
        Pilot voor bouw- en installatiebedrijven in Flevoland<span>·</span>1 gratis plek + 2
        pilotplekken<span>·</span>Aanmelden tot en met 1 november
      </div>

      {/* ---------------- Hero ---------------- */}
      <div className={s.wrap}>
        <section className={s.hero}>
          <div>
            <p className={s.label}>Pilot · 1 gratis + 2 pilotplekken · Flevoland</p>
            <h1 className={`${s.h1} ${s.heroH1}`}>
              Halveer De Tijd Van Offreren &amp; Calculeren Of Werkvoorbereiding. Of Je Geld Terug.
            </h1>
            <p className={s.heroHook}>
              <mark className={s.highlight}>Eén bedrijf krijgt het gratis.</mark> Twee voor de
              pilotprijs.
            </p>
            <p className={`${s.p} ${s.pInk}`} style={{ marginTop: 28, maxWidth: "38rem", fontSize: 19 }}>
              Heb je een bouw- of installatiebedrijf in Flevoland met 5-25 man en kost het
              bureauwerk je veel tijd? Dan heb je de juiste pagina gevonden.
            </p>
            <p className={s.p} style={{ maxWidth: "38rem", fontSize: 19 }}>
              Voor drie geselecteerde bedrijven bouwen we een automatiseringssysteem voor het
              offreren, calculeren of de werkvoorbereiding. Lees verder om te zien hoe het werkt.
            </p>
            <div className={s.actions}>
              <a href="#boeken" className={s.btn}>
                Plan een belafspraak van 15 minuten →
              </a>
              <a href="#hoe-het-werkt" className={`${s.btn} ${s.btnGhost}`}>
                Eerst zien hoe het werkt ↓
              </a>
            </div>
            <p className={s.mono} style={{ marginTop: 18, color: "var(--muted)" }}>
              Eerst 15 minuten aan de telefoon. Past het, dan plannen we de procesanalyse bij je op
              kantoor.
            </p>
          </div>

        </section>
      </div>

      {/* ---------------- Sectie 1: de lead (A/B) ---------------- */}
      <section className={s.section} style={{ paddingTop: 24 }}>
        <div className={s.wrap}>
          {/* Variant A */}
          <div data-variant="a">
            <p className={s.label}>Herkenbaar?</p>
            <h2 className={s.h2} style={{ maxWidth: "46rem", marginBottom: 48 }}>
              Software heb je al. Het probleem is urenlang data met de hand invoeren.
            </h2>
            <div className={s.grid2} style={{ gap: "32px 64px", alignItems: "start" }}>
              <div className={s.leadText}>
                <p>
                  Veel ondernemers hebben nog niet door dat dit een verouderde en riskante gedachte
                  is:
                </p>
                <p>
                  <mark className={s.highlight}>
                    &ldquo;Wij hebben er software voor, dus we hebben het al geregeld.&rdquo;
                  </mark>
                </p>
                <p>
                  Het is verouderd omdat het ophalen en invoeren van data tegenwoordig betrouwbaar
                  automatisch kan en menselijke foutjes voorkomt. De reden dat het een riskante
                  gedachte is, is omdat degenen die het blijven geloven binnen de kortste keren
                  achter zullen lopen op de concurrentie die gelooft in &ldquo;laat computers
                  computerdingen doen en laat mensen mensendingen doen.&rdquo;
                </p>
                <p>
                  Pas je je nu aan, dan ben je nog veel partijen voor en kan je daar nog extra
                  profijt aan winnen.
                </p>
              </div>
              <div className={s.stack}>
                <Why icon="doc" title="Offreren">Wie sneller offreert, wint meer klanten.</Why>
                <Why icon="calc" title="Calculeren">
                  Meer tijd voor projecten, en minder rekenfouten die je later op het project
                  terugziet in marge of materiaal.
                </Why>
                <Why icon="clipboard" title="Werkvoorbereiding">
                  Meer tijd voor projecten, en minder fouten in bestellingen, planning en werkbonnen
                  die je later op het project terugziet als wachttijd of een extra rit.
                </Why>
              </div>
            </div>
            <div className={`${s.card} ${s.grain} ${s.lei} ${s.onColour}`} style={{ marginTop: 48 }}>
              <div className={s.grid2} style={{ alignItems: "center", gap: 32 }}>
                <p className={s.h3} style={{ margin: 0, fontWeight: 400, fontSize: "clamp(22px,2.4vw,28px)", letterSpacing: "-0.025em" }}>
                  Kijk eens naar je laatste tien calculaties, offertes of werkbonnen. Het meeste is
                  elke keer hetzelfde, van de artikelen tot de rekenregels.
                </p>
                <p className={`${s.p} ${s.pInk}`}>
                  Deze komen tot stand door middel van &ldquo;Als A, dan B&rdquo;-systemen. Dat kan
                  vrijwel altijd door een computer overgenomen worden.
                </p>
              </div>
            </div>
          </div>

          {/* Variant B */}
          <div className={s.leadB} data-variant="b">
            <div className={s.split}>
              <div>
                <p className={s.label}>Drie kosten van traag bureauwerk</p>
                <h2 className={s.h2}>Traag Bureauwerk Kost Je Klanten, Tijd En Kwaliteit.</h2>
              </div>
            </div>
            <div className={s.grid3}>
              <div className={s.card}>
                <div className={s.cardTop}>
                  <span className={s.iconTile}><Icon name="userLeave" /></span>
                  <span className={s.mono} style={{ color: "var(--muted)" }}>01 · Klanten</span>
                </div>
                <p className={s.p} style={{ marginTop: 24 }}>
                  Je team werkt hard, maar het bureauwerk blijft achter de klus aanlopen. Een
                  offerte die drie dagen later de deur uitgaat dan bij de concurrent, is een offerte
                  die je vaker kwijtraakt. De klant kiest wie het eerst reageert, niet wie het beste
                  werk levert.
                </p>
              </div>
              <div className={s.card}>
                <div className={s.cardTop}>
                  <span className={s.iconTile}><Icon name="hourglass" /></span>
                  <span className={s.mono} style={{ color: "var(--muted)" }}>02 · Tijd</span>
                </div>
                <p className={s.p} style={{ marginTop: 24 }}>
                  Calculeren en werkvoorbereiding die te lang duren, pakken tijd af van waar het om
                  gaat: de klus zelf. Hoe meer uren er opgaan aan overtypen en uitrekenen, hoe minder
                  tijd er overblijft voor de kwaliteit die je klanten van je gewend zijn.
                </p>
              </div>
              <div className={s.card}>
                <div className={s.cardTop}>
                  <span className={s.iconTile}><Icon name="alert" /></span>
                  <span className={s.mono} style={{ color: "var(--muted)" }}>03 · Kwaliteit</span>
                </div>
                <p className={s.p} style={{ marginTop: 24 }}>
                  En handmatig typwerk is foutgevoelig. Een verkeerd overgenomen maat, een vergeten
                  post in de calculatie, een artikelnummer dat niet klopt: het lijkt een kleinigheid,
                  tot het een verkeerd bestelde lading, een nacalculatie of een boze klant wordt.
                </p>
              </div>
            </div>
            <div className={`${s.card} ${s.grain} ${s.lei} ${s.onColour}`} style={{ marginTop: 20 }}>
              <div className={s.grid2} style={{ alignItems: "center", gap: 32 }}>
                <p className={s.h3} style={{ margin: 0, fontWeight: 400, fontSize: "clamp(22px,2.4vw,28px)", letterSpacing: "-0.025em" }}>
                  Kijk eens naar je laatste tien offertes, calculaties of werkbonnen. Het meeste is
                  elke keer hetzelfde, van de artikelen tot de rekenregels.
                </p>
                <p className={`${s.p} ${s.pInk}`}>
                  Het deel waar vakkennis voor nodig is, is klein. De rest is overtypen en opzoeken,
                  en dat kan een systeem voor je doen, zonder dat het moe wordt of een foutje maakt.
                </p>
              </div>
            </div>
          </div>
          <Cta />
        </div>
      </section>

      {/* ---------------- Sectie 2: bewijs ---------------- */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.split}>
            <div>
              <p className={s.label}>Bewijs, geen beloftes</p>
              <h2 className={s.h2}>Hoe 30 Tot 40 Minuten Per Offerte, Vijf Offertes Per Uur Werd.</h2>
            </div>
            <p className={s.p}>
              Cupcake STHLM kreeg elke dag aanvragen per mail. Elke aanvraag lezen, gegevens
              overtypen in het facturatiepakket, een offerte maken, een mail terugschrijven: 30 tot
              40 minuten per stuk.
            </p>
          </div>

          <div className={s.grid3}>
            <div className={`${s.card} ${s.grain} ${s.neutraal} ${s.span2}`}>
              <p className={s.label}>Per offerte</p>
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px,3vw,40px)", flexWrap: "wrap" }}>
                <div>
                  <div className={s.stat}>30–40</div>
                  <div className={s.mono} style={{ marginTop: 8 }}>minuten per offerte</div>
                </div>
                <Icon name="arrow" size={40} />
                <div>
                  <div className={s.stat}>12</div>
                  <div className={s.mono} style={{ marginTop: 8 }}>minuten per offerte</div>
                </div>
              </div>
              <p className={`${s.p} ${s.pInk}`} style={{ marginTop: 32 }}>
                We bouwden een systeem dat elke aanvraag leest, de offerte klaarzet in hun eigen
                pakket en er een conceptmail bij schrijft. Zij controleren en versturen.
              </p>
            </div>
            <div className={s.grid2} style={{ gridTemplateColumns: "1fr", gap: 20 }}>
              <div className={`${s.card} ${s.grain} ${s.oranje} ${s.onColour}`}>
                <p className={s.label}>Resultaat</p>
                <div className={s.statSmall}>8+ uur</div>
                <p className={s.p} style={{ marginTop: 8 }}>per week terug</p>
              </div>
              <div className={`${s.card} ${s.grain} ${s.lei} ${s.onColour}`}>
                <p className={s.label}>Bouwtijd</p>
                <div className={s.statSmall}>3 weken</div>
              </div>
            </div>
            <figure className={`${s.card} ${s.span2}`} style={{ margin: 0 }}>
              <blockquote className={s.quote}>
                &ldquo;Ik ging niet alleen van 2-3+ uur naar minder dan 1 uur administratie per dag
                (mails beantwoorden, offertes versturen, enzovoort). Belangrijker nog: ik heb niet
                meer de zorg van &lsquo;heb ik iets gemist of heb ik het goed gedaan?&rsquo;&rdquo;
              </blockquote>
              <figcaption className={s.quoteWho}>Alexander Cordova, Cupcake STHLM</figcaption>
            </figure>
            <div className={`${s.card} ${s.panel}`} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p className={s.p} style={{ color: "rgba(255,255,255,.82)" }}>
                Calculeren en werkvoorbereiding werken op dezelfde manier. Er komt informatie binnen,
                die wordt volgens vaste regels uitgewerkt, en iemand kijkt het resultaat na. Maar
                Cupcake STHLM is een bakkerij, geen bouw- of installatiebedrijf. Daarom deze pilot.
              </p>
              <a href="/works/email-to-quote-system/" className={`${s.btn} ${s.btnWhite}`} style={{ alignSelf: "flex-start", marginTop: 24 }}>
                Bekijk de hele case →
              </a>
            </div>
          </div>
          <Cta />
        </div>
      </section>

      {/* ---------------- Onnodige-Kosten Scan ---------------- */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.split}>
            <div>
              <p className={s.label}>Onnodige-Kosten Scan</p>
              <h2 className={s.h2}>Wat kost het jou nu?</h2>
            </div>
            <p className={s.p}>
              Vul in hoe vaak je het doet, hoe lang het duurt en wat een uur kost. Binnen 30
              seconden zie je wat dat werk je per jaar kost, in euro&apos;s en in uren.
            </p>
          </div>
          <ScanWidget />
        </div>
      </section>

      {/* ---------------- Sectie 3: waarom dit tijdelijke aanbod ---------------- */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.split}>
            <h2 className={s.h2}>Waarom Dit Tijdelijke Aanbod?</h2>
            <p className={s.p}>
              We weten dat we de automatiseringen kunnen maken. We missen alleen de case studies uit
              de praktijk als bewijs. Daarom zoeken wij drie geschikte bouw- en installatiebedrijven
              in Flevoland.
            </p>
          </div>
          <div className={s.grid3}>
            <div className={s.card}>
              <span className={s.iconTile}><Icon name="euro" /></span>
              <div className={s.statSmall} style={{ marginTop: 28 }}>Vanaf €750</div>
              <p className={s.p} style={{ marginTop: 8 }}>
                Een vaste pilotprijs per proces, minder dan de helft van wat het na de pilot kost.
              </p>
            </div>
            <div className={s.card}>
              <span className={s.iconTile}><Icon name="clock" /></span>
              <h3 className={s.h3}>Gemeten en gegarandeerd</h3>
              <p className={s.p}>We meten hoe lang het nu duurt, en we garanderen dat het halveert.</p>
            </div>
            <div className={s.card}>
              <span className={s.iconTile}><Icon name="pin" /></span>
              <h3 className={s.h3}>Bij je op kantoor</h3>
              <p className={s.p}>We komen bij je op kantoor, want Flevoland is voor ons dichtbij.</p>
            </div>
          </div>
          <p className={s.p} style={{ marginTop: 28 }}>
            In ruil vragen we om een review en een case study. Daarover verderop meer.
          </p>
          <Cta />
        </div>
      </section>

      {/* ---------------- Sectie 4: hoe het werkt ---------------- */}
      <section id="hoe-het-werkt" className={s.section}>
        <div className={s.wrap}>
          <div className={s.split}>
            <div>
              <p className={s.label}>Hoe het werkt</p>
              <h2 className={s.h2}>Het Systeem Zet Klaar. Jij Keurt Goed.</h2>
            </div>
            <p className={s.p}>
              Je hoeft geen nieuw pakket te leren. Je werkt zoals je gewend bent, alleen het
              overtypen en opzoeken is weg.
            </p>
          </div>

          <div className={s.steps}>
            <Step n="1" icon="inbox" colour="lei" title="Wat binnenkomt, komt binnen zoals altijd.">
              Een aanvraag per mail of WhatsApp, de maten en foto&apos;s van een opname, een
              getekende offerte.
            </Step>
            <Step n="2" icon="cog" colour="violet" title="Het systeem werkt het uit.">
              In wat je al gebruikt, met je eigen artikelen, prijzen en rekenregels.
            </Step>
            <Step n="3" icon="checkCircle" colour="groen" title="Jij kijkt het na en keurt goed.">
              Pas aan wat anders moet. Er gaat niets naar een klant of leverancier zonder dat jij
              het gezien hebt.
            </Step>
          </div>

          <div className={s.split} style={{ marginTop: 96 }}>
            <h3 className={s.h2} style={{ fontSize: "clamp(26px,3.2vw,38px)" }}>
              Kies het proces dat jou de meeste (tijd) kost
            </h3>
            <p className={s.p}>
              In de pilot automatiseren we één proces per bedrijf. Welk proces, bepalen we samen in
              de procesanalyse.
            </p>
          </div>
          <div className={s.grid2}>
            <Process icon="doc" title="Offreren & calculeren" from="Aanvraag, opname, maten, foto's" to="Calculatie en offerte klaar">
              Van aanvraag en opname naar een calculatie met materiaal en uren volgens jouw eigen
              rekenregels, en een offerte die klaarstaat om na te kijken en te versturen.
            </Process>
            <Process icon="clipboard" title="Werkvoorbereiding" from="Getekende offerte" to="Bestelling, planning, werkbon">
              Van getekende offerte naar materiaalbestelling, planning en werkbon voor de monteur.
            </Process>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
            <a href="#scan" className={`${s.btn} ${s.btnGhost} ${s.btnLarge}`}>
              Reken uit wat het jou kost ↑
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Sectie 5: wat je krijgt ---------------- */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.split}>
            <div>
              <p className={s.label}>Het aanbod</p>
              <h2 className={s.h2}>Dit Krijg Je Als Een Van De Drie Pilotbedrijven.</h2>
            </div>
          </div>
          <div className={s.stack}>
            <Offer n="1" icon="clock" title="De procesanalyse op locatie (30 minuten, gratis)" grainy>
              We komen langs en kijken mee terwijl er een offerte, calculatie of werkvoorbereiding
              gemaakt wordt. We klokken hoe lang dat duurt: dat is je nulmeting. Na 30 minuten hoor
              je of halveren bij jou haalbaar is. Is het dat niet, dan zeggen we dat en beginnen we
              er niet aan. Je hebt dan in elk geval je eigen cijfers.
            </Offer>
            <Offer n="2" icon="cog" title="Jouw systeem voor één proces, gebouwd in wat je al gebruikt" note="Normaal vanaf €1.500">
              Vaste prijs, live binnen 2 tot 4 weken na de analyse. We bouwen het rond jouw
              artikelen, prijzen, rekenregels en werkwijze. Jij hoeft niets om te gooien.
            </Offer>
            <Offer n="3" icon="truck" title="Oplevering bij je op kantoor">
              We zetten het samen met jou aan, met iedereen die ermee gaat werken erbij. Daarna
              kijken we 30 dagen mee. Loopt er iets niet lekker, dan passen we het aan.
            </Offer>
            <Offer n="4" icon="shield" title="De Halveringsgarantie" colour="oranje">
              Is de tijd per offerte, per calculatie of per project na 30 dagen gebruik niet
              minstens gehalveerd, dan werken we gratis door tot het wel zo is. Lukt dat binnen nog
              eens 30 dagen niet, dan krijg je het volledige bedrag terug.
            </Offer>
            <Offer n="5" icon="chart" title="Je eigen cijfers, zwart op wit">
              Je krijgt de nulmeting en de nameting op papier: hoe lang het eerst kostte, hoe lang
              nu, en wat dat je per jaar scheelt. Handig voor jezelf, ook als je later meer wilt
              automatiseren.
            </Offer>
            <Offer n="6" icon="euro" title="€49 per maand, pas als het werkt">
              Normaal [€95] per maand voor hosting, onderhoud en kleine aanpassingen. In de pilot
              €49, en dat gaat pas in als de halvering gemeten is.
            </Offer>
            <Offer n="7" icon="gift" title="Verdien aan elke doorverwijzing">
              Ken je een ander bedrijf dat hier iets aan heeft? Wordt het klant, dan krijg jij 10%
              van hun projectprijs (excl. btw). Verwijst dat bedrijf zelf weer iemand door die klant
              wordt, dan krijg jij daarvan nog eens 5%.
            </Offer>
          </div>
          <Cta />
        </div>
      </section>

      {/* ---------------- Sectie 6: dit alles voor ---------------- */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.split}>
            <h2 className={s.h2}>Minder Dan De Helft Van De Normale Prijs — Voor Drie Bedrijven.</h2>
            <p className={s.p}>
              Eén vast bedrag per proces. Daarna €49 per maand, pas als de halvering bewezen is.
              Geen uurtarief, en geen meerkosten als het langer duurt.
            </p>
          </div>
          <div className={s.grid2}>
            <div style={{ display: "grid", gap: 20 }}>
              <div className={`${s.card} ${s.grain} ${s.neutraal}`}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0 20px", alignItems: "baseline" }}>
                  <span className={s.label} style={{ marginBottom: 8 }}>Proces</span>
                  <span className={s.label} style={{ marginBottom: 8 }}>Pilotprijs</span>
                  {PROCESSES.map(({ process, pilot }) => (
                    <div key={process} style={{ display: "contents" }}>
                      <span style={{ fontSize: 18, padding: "14px 0", borderTop: "1px solid var(--line)" }}>{process}</span>
                      <span className={s.statSmall} style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>{eur(pilot)}</span>
                    </div>
                  ))}
                </div>
                <p className={s.mono} style={{ marginTop: 12 }}>
                  Eenmalig, vast per proces. Vervolgens €49 per maand, pas na bewezen halvering.
                </p>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                  <p className={s.label} style={{ marginBottom: 6 }}>Ter vergelijking: de normale prijs</p>
                  <p className={s.p} style={{ margin: 0, color: "var(--ink)" }}>
                    Klanten na de pilot betalen {NORMAL_PRICE_TEXT}. Wat dat voor jouw bedrijf zou
                    zijn, en dus je korting, zie je in de scan.
                  </p>
                  <a href="#scan" className={`${s.btn} ${s.btnGhost}`} style={{ marginTop: 14 }}>
                    Reken je korting uit ↑
                  </a>
                </div>
              </div>
              <div className={s.card}>
                <span className={s.iconTile}><Icon name="calc" /></span>
                <h3 className={s.h3}>Wat kost het jou nu?</h3>
                <p className={s.p}>
                  Vul in hoe vaak je het doet, hoe lang het duurt en wat een uur kost. Binnen 30
                  seconden zie je wat dat werk je per jaar kost, in euro&apos;s en in uren.
                </p>
                <a href="#scan" className={s.btn} style={{ marginTop: 20 }}>
                  Reken het uit in 30 seconden ↑
                </a>
              </div>
            </div>
            <div className={s.panel}>
              <div className={s.panelHead}>Wat we van jou terugvragen</div>
              <p className={s.p} style={{ color: "rgba(255,255,255,.7)", padding: "18px 28px 4px", margin: 0 }}>
                Het bedrag is zo laag omdat je ook op een andere manier betaalt:
              </p>
              <Row icon="chart">
                Je gebruikt het systeem 30 dagen voor alles binnen het gekozen proces. Anders kunnen
                we niets meten.
              </Row>
              <Row icon="doc">
                We mogen je resultaten publiceren, met je bedrijfsnaam erbij: hoeveel uur en geld je
                bespaart, en wat je met die tijd en dat geld doet. Klantgegevens, prijzen, marges en
                omzet publiceren we nooit.
              </Row>
              <Row icon="pen">Je schrijft een korte review over hoe het bevalt.</Row>
              <Row icon="star">Je logo komt op onze site.</Row>
              <Row icon="camera">
                <span style={{ opacity: 0.75 }}>
                  Wil je ook een korte video opnemen? Dan krijg je [extra voordeel, nog te bepalen].
                </span>
              </Row>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Sectie 7: waarom maar drie ---------------- */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.grid2} style={{ alignItems: "center", gap: 48 }}>
            <div>
              <p className={s.label}>Waarom maar drie</p>
              <h2 className={s.h2} style={{ marginBottom: 28 }}>Drie plekken. Daarna stopt dit aanbod.</h2>
              <p className={s.p}>
                We komen bij elk bedrijf zelf langs, bouwen het systeem zelf en kijken 30 dagen mee.
                Meer dan drie tegelijk kunnen we niet goed doen.
              </p>
              <p className={s.p}>
                Aanmelden kan tot en met 1 november. Daarna kiezen we en bouwen we dit tegen ons
                normale tarief, vanaf €1.500.
              </p>
              <h3 className={s.h3} style={{ margin: "32px 0 10px" }}>Eén plek is gratis</h3>
              <p className={s.p}>
                Eén bedrijf krijgt het systeem helemaal gratis. We kiezen het bedrijf waar de
                besparing het grootst is, op basis van de procesanalyse. Twee bedrijven krijgen het
                voor de pilotprijs.
              </p>
              <p className={s.p}>
                In de belafspraak vragen we waarom jouw bedrijf de gratis plek verdient. Het gratis
                systeem draait de eerste 60 dagen kosteloos, daarna €49 per maand voor hosting en
                onderhoud.
              </p>
              <p className={s.p}>
                Niet gekozen? Dan krijg je bij de normale prijs de knelpuntanalyse gratis (normaal
                €995) en de Halveringsgarantie.
              </p>
            </div>
            <div className={`${s.card} ${s.grain} ${s.groen} ${s.onColour}`} style={{ padding: 44 }}>
              <div className={s.seats}>
                <div className={`${s.seat} ${s.seatTaken}`}>gratis</div>
                <div className={s.seat}>pilot</div>
                <div className={s.seat}>pilot</div>
              </div>
              <p className={s.mono} style={{ marginTop: 28 }}>
                1 gratis plek + 2 pilotplekken. Aanmelden tot en met 1 november.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Sectie 8: voor wie ---------------- */}
      <section className={s.section}>
        <div className={s.wrap}>
          <p className={s.label}>Is dit voor jou?</p>
          <div className={s.grid2}>
            <div className={`${s.panel} ${s.panelLight}`}>
              <div className={s.panelHead}>Dit is voor je als:</div>
              <Row icon="checkCircle">
                <div>
                  je een bouw- of installatiebedrijf hebt in Flevoland:
                  <div className={s.chips} style={{ marginTop: 12 }}>
                    {["Almere", "Lelystad", "Dronten", "Zeewolde", "de Noordoostpolder", "Urk"].map((p) => (
                      <span key={p} className={s.chip}>{p}</span>
                    ))}
                  </div>
                </div>
              </Row>
              <Row icon="checkCircle">je 5 tot 25 mensen in dienst hebt;</Row>
              <Row icon="checkCircle">je minstens [5] offertes, calculaties of projecten per week hebt;</Row>
              <Row icon="checkCircle">
                dat werk je nu meer kost dan {eur(PRICE_OF["Offreren & calculeren"].minYearly)} per jaar
                (offreren &amp; calculeren) of {eur(PRICE_OF["Werkvoorbereiding"].minYearly)} per jaar
                (werkvoorbereiding).{" "}
                <a href="#scan" style={{ textDecoration: "underline" }}>Reken het uit in de scan.</a>
              </Row>
            </div>
            <div className={`${s.panel} ${s.panelLight}`} style={{ alignSelf: "start" }}>
              <div className={s.panelHead}>Dit is niet voor je als:</div>
              <Row icon="x">
                je maar een paar offertes of projecten per maand doet. Dan valt er weinig te halveren.
              </Row>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Sectie 9: FAQ ---------------- */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.grid2} style={{ gap: 48 }}>
            <div>
              <h2 className={s.h2}>Veelgestelde vragen</h2>
            </div>
            <div className={s.faq}>
              <Faq q="Welk proces moet ik kiezen?">
                Het proces waar de meeste tijd in zit en waar halveren haalbaar is. Dat bepalen we
                samen in de procesanalyse. Wil je vooraf al een getal, vul dan de Onnodige-Kosten
                Scan in.
              </Faq>
              <Faq q="Moet ik een nieuw pakket gaan gebruiken?">
                Nee. We bouwen het in wat je al gebruikt: je offerte- of calculatiepakket, je
                boekhouding, Excel of een combinatie. Of dat bij jouw pakket kan, checken we in de
                procesanalyse. Kan het niet, dan zeggen we dat.
              </Faq>
              <Faq q="Hoeveel tijd kost het mij?">
                Eerst een belafspraak van 15 minuten, dan de procesanalyse van 30 minuten bij je op
                kantoor. Daarna vragen we hooguit [X] uur van je, vooral om
                je artikelen, prijzen, rekenregels en vaste teksten op te halen. De rest doen wij.
              </Faq>
              <Faq q="Wat als het systeem een fout maakt?">
                Er gaat niets naar een klant of leverancier zonder dat jij het gezien hebt. Het
                systeem zet klaar, jij keurt goed. Zie je een fout, dan pas je die aan, en wij zorgen
                dat hij de volgende keer niet terugkomt.
              </Faq>
              <Faq q="Hoe meten jullie of het gehalveerd is?">
                Bij de procesanalyse klokken we hoe lang een offerte, calculatie of werkvoorbereiding
                nu kost en kijken we naar een paar recente voorbeelden. Na 30 dagen gebruik meten we
                op dezelfde manier opnieuw. Beide cijfers krijg je op papier.
              </Faq>
              <Faq q="Wat als het niet halveert?">
                Dan werken we gratis door tot het wel zo is. Lukt dat binnen nog eens 30 dagen niet,
                dan krijg je het volledige bedrag terug. De €49 per maand is dan nooit ingegaan.
              </Faq>
              <Faq q="Wat publiceren jullie precies?">
                Hoeveel uur en geld je bespaart, en wat je met die tijd en dat geld doet. Met je
                bedrijfsnaam, je logo en je review. Klantgegevens, prijzen, marges en omzet
                publiceren we nooit. Je ziet alles voordat het online gaat.
              </Faq>
              <Faq q="Waar zit het addertje onder het gras?">
                Je betaalt minder in geld en meer in iets anders: je resultaten, een review en je logo
                op onze site. Wij willen bewijs in de bouw- en installatiebranche, en dat krijgen we
                alleen door het te bouwen.
              </Faq>
              <Faq q="Hoe werkt de doorverwijsbonus?">
                Stuur je een bedrijf naar ons door en wordt het klant, dan krijg je 10% van hun
                projectprijs (excl. btw). Verwijst dat bedrijf zelf iemand door die klant wordt, dan
                krijg jij daarvan 5%. [Uitbetaald zodra het project betaald is.]
              </Faq>
              <Faq q="Kunnen we later meer laten automatiseren?">Ja, tegen ons normale tarief.</Faq>
              <Faq q="Wat gebeurt er met onze gegevens en die van onze klanten?">
                De gegevens blijven waar mogelijk in jouw eigen systemen. We werken volgens de AVG en
                tekenen een verwerkersovereenkomst met je.
              </Faq>
              <Faq q="Wat gebeurt er na de pilot?">
                Het systeem is van jou en blijft draaien. Je betaalt €49 per maand voor hosting en
                onderhoud, [maandelijks opzegbaar].
              </Faq>
              <Faq q="Ik zit net buiten Flevoland. Kan ik meedoen?">
                De pilot is alleen voor Flevoland, omdat we bij iedereen zelf langskomen. Wil je het
                toch, dan kan het tegen ons normale tarief.
              </Faq>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Slotbalk + boeken ---------------- */}
      <section id="boeken" className={s.section} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={`${s.grain} ${s.lei} ${s.onColour}`} style={{ padding: "clamp(28px,5vw,64px)" }}>
            <div className={s.grid2} style={{ gap: 40, alignItems: "start" }}>
              <div>
                <p className={s.label}>Plan een belafspraak (15 min)</p>
                <h2 className={s.h2}>Word een van de drie pilotbedrijven in Flevoland.</h2>
                <p className={s.mono} style={{ marginTop: 20 }}>
                  1 gratis plek + 2 pilotplekken · Aanmelden tot en met 1 november
                </p>
                <p className={s.p} style={{ marginTop: 40, fontSize: 14 }}>
                  De Halveringsgarantie geldt voor het proces dat we samen kiezen. Voorwaarde is dat
                  je het systeem 30 dagen gebruikt voor alles binnen dat proces en meewerkt aan de
                  nul- en nameting.
                </p>
              </div>
              {/* minWidth 0: anders duwt de rij van tien dagen de kolom breder dan het blok. */}
              <div style={{ color: "var(--ink)", minWidth: 0 }}>
                <PilotBooking />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Bouwstenen ---------- */

/** Herhaalde call-to-action tussen secties; zelfde tekst en doel als de hero-knop. */
function Cta() {
  return (
    <div className={s.cta}>
      <a href="#boeken" className={`${s.btn} ${s.btnLarge}`}>
        Plan een belafspraak van 15 minuten →
      </a>
      <ol className={s.ctaSteps}>
        <li>Kort formulier met een paar vragen</li>
        <li>Belafspraak van 15 minuten</li>
        <li>Past het, dan komen we bij je op kantoor</li>
      </ol>
    </div>
  );
}

function Why({ icon, title, children }) {
  return (
    <div className={s.card} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: 28 }}>
      <span className={s.iconTile} style={{ flex: "none" }}>
        <Icon name={icon} />
      </span>
      <div>
        <h3 className={s.h3} style={{ margin: "2px 0 6px" }}>{title}</h3>
        <p className={`${s.p} ${s.pInk}`} style={{ margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}

function Step({ n, icon, colour, title, children }) {
  return (
    <div className={s.card}>
      <div className={s.cardTop}>
        <span className={s.num}>{n}</span>
        <span className={`${s.iconTile} ${s.grain} ${s[colour]}`}>
          <Icon name={icon} />
        </span>
      </div>
      <h3 className={s.h3}>{title}</h3>
      <p className={s.p}>{children}</p>
    </div>
  );
}

function Process({ icon, title, from, to, children }) {
  return (
    <div className={s.card} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span className={s.iconTile}><Icon name={icon} /></span>
        <span style={{ textAlign: "right" }}>
          <span className={s.mono} style={{ display: "block", color: "var(--muted)", fontSize: 11.5 }}>PILOTPRIJS</span>
          <span className={s.statSmall} style={{ fontSize: 28 }}>{eur(PRICE_OF[title].pilot)}</span>
          <span className={s.mono} style={{ display: "block", fontSize: 11.5, color: "var(--muted)" }}>
            normale prijs: 20% van de jaarkosten
          </span>
        </span>
      </div>
      <h3 className={s.h3}>{title}</h3>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", margin: "4px 0 18px" }}>
        <span className={s.chip}>{from}</span>
        <span className={s.mono} style={{ color: "var(--muted)" }}>›</span>
        <span className={`${s.chip} ${s.chipStrong}`}>{to}</span>
      </div>
      <p className={s.p}>{children}</p>
      <Example title={title} />
      <a href="#boeken" className={s.btn} style={{ marginTop: "auto" }}>
        Plan een belafspraak →
      </a>
    </div>
  );
}

/** Rekenvoorbeeld met de formule van de scan; alle invoer zichtbaar. */
function Example({ title }) {
  const ex = EXAMPLES[title];
  const { pilot } = PRICE_OF[title];
  const { manual, errors, total } = yearlyCost(ex);
  const normal = normalPrice(total);
  const off = Math.round((1 - pilot / normal) * 100);
  return (
    <div className={s.example}>
      <p className={s.label} style={{ marginBottom: 10 }}>Rekenvoorbeeld</p>
      <div className={s.exampleRow}>
        <span>
          {ex.perWeek} {ex.unit} per week × {ex.minutes} min × {eur(ex.rate)} per uur × 46 weken
        </span>
        <span>{eur(manual)}</span>
      </div>
      <div className={s.exampleRow}>
        <span>
          + {ex.errorsPerMonth} {ex.errorsPerMonth === 1 ? "fout" : "fouten"} per maand × {eur(ex.errorCost)} × 12
        </span>
        <span>{eur(errors)}</span>
      </div>
      <div className={`${s.exampleRow} ${s.exampleTotal}`}>
        <span>Kost per jaar</span>
        <span>{eur(total)}</span>
      </div>
      <div className={s.exampleRow}>
        <span>Normale prijs (20%)</span>
        <span className={s.strike}>{eur(normal)}</span>
      </div>
      <div className={`${s.exampleRow} ${s.exampleTotal}`}>
        <span>Pilotprijs</span>
        <span>
          {eur(pilot)} <span className={s.discount}>−{off}%</span>
        </span>
      </div>
    </div>
  );
}

function Offer({ n, icon, title, children, note, wide, colour, grainy }) {
  const cls = [
    s.card,
    wide && s.span2,
    (grainy || colour) && s.grain,
    grainy && s.neutraal,
    colour && s[colour],
    colour && s.onColour,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      <div className={s.cardTop}>
        <span className={s.num}>{n}</span>
        <span className={s.iconTile} style={grainy ? { background: "#fff" } : undefined}>
          <Icon name={icon} />
        </span>
      </div>
      <h3 className={s.h3}>{title}</h3>
      <p className={s.p} style={grainy ? { color: "var(--ink)" } : undefined}>
        {children}
      </p>
      {note && <p className={s.mono} style={{ marginTop: 16, color: "var(--muted)" }}>{note}</p>}
    </div>
  );
}

function Row({ icon, children }) {
  return (
    <div className={s.row}>
      <Icon name={icon} size={22} />
      <div>{children}</div>
    </div>
  );
}

function Faq({ q, children }) {
  return (
    <details>
      <summary>{q}</summary>
      <p className={`${s.p} ${s.answer}`}>{children}</p>
    </details>
  );
}
