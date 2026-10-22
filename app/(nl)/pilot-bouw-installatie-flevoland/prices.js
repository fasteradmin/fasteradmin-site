/**
 * Eén bron voor de prijzen op de pilotpagina (tabel, proceskaarten, scan).
 *
 * Normale prijs = 20% van wat het werk per jaar kost volgens de
 * Onnodige-Kosten Scan, met een bodem (Joey, 2026-10-19). De pilotprijs is
 * een vast bedrag per proces. Offreren en calculeren zijn één proces.
 */
export const VALUE_SHARE = 0.2;
export const PRICE_FLOOR = 1500;

/**
 * `minYearly`: vanaf dit jaarbedrag doet een bedrijf mee aan de pilot. Zo
 * is de pilotprijs altijd minder dan de helft van de normale prijs en klopt
 * de kop "Minder Dan De Helft Van De Normale Prijs" (Joey, 2026-10-19:
 * "we werken alleen met bedrijven die hiervoor kwalificeren").
 * Controle: normalPrice(minYearly) > 2 × pilot.
 */
export const PROCESSES = [
  { process: "Offreren & calculeren", pilot: 1000, minYearly: 11000, scanTasks: ["Offertes maken", "Calculaties maken"] },
  { process: "Werkvoorbereiding", pilot: 750, minYearly: 8000, scanTasks: ["Werkvoorbereiding"] },
];

export const eur = (n) => "€" + Math.round(n).toLocaleString("nl-NL");

/** Zelfde formule als de Onnodige-Kosten Scan (46 werkweken). */
export const WEEKS = 46;
export function yearlyCost({ perWeek, minutes, rate, errorsPerMonth = 0, errorCost = 0 }) {
  const manual = (perWeek * minutes * rate * WEEKS) / 60;
  const errors = errorsPerMonth * 12 * errorCost;
  return { manual, errors, total: manual + errors };
}

/**
 * Rekenvoorbeelden onder de proceskaarten. Aannames, geen metingen: ze staan
 * als "Rekenvoorbeeld" met alle invoer zichtbaar op de pagina.
 */
export const EXAMPLES = {
  "Offreren & calculeren": { unit: "offertes met calculatie", perWeek: 5, minutes: 90, rate: 60, errorsPerMonth: 1, errorCost: 250 },
  Werkvoorbereiding: { unit: "projecten", perWeek: 3, minutes: 60, rate: 60, errorsPerMonth: 2, errorCost: 250 },
};

/** Normale prijs voor een jaarbedrag: 20%, naar beneden op €100, minimaal de bodem. */
export function normalPrice(yearlyCost) {
  return Math.max(PRICE_FLOOR, Math.floor((yearlyCost * VALUE_SHARE) / 100) * 100);
}
