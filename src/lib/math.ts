/** Shared poultry maths + formatting helpers used by every calculator. */

export const SQFT_TO_SQM = 0.092903;

export function sqm(sqft: number): number {
  return sqft * SQFT_TO_SQM;
}

/** Round to 1 decimal place. */
export function r1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Round to 2 decimal places. */
export function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Format a number with up to 1 decimal, no trailing ".0" noise beyond need. */
export function fmt(n: number, digits = 1): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

export function money(n: number): string {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Parse a numeric input safely; empty/invalid becomes 0. */
export function num(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/* ---------------- Chicken coop maths (shared by Tool 2 and Tool 5) -------- */

export type ChickenSize = "bantam" | "standard" | "large";

export const CHICKEN_RATES: Record<
  ChickenSize,
  { label: string; coop: number; run: number }
> = {
  bantam: { label: "Bantam", coop: 2, run: 6 },
  standard: { label: "Standard", coop: 3.5, run: 10 },
  large: { label: "Large / heavy breeds", coop: 4.5, run: 12 },
};

export function chickenSpace(birds: number, size: ChickenSize) {
  const rate = CHICKEN_RATES[size];
  return {
    coopSqft: birds * rate.coop,
    runSqft: birds * rate.run,
    roostInches: birds * 10,
    roostFeet: (birds * 10) / 12,
    nestingBoxes: Math.max(1, Math.ceil(birds / 4)),
  };
}

/** Common pre-built coop footprints (length × width in feet). */
export const COOP_FOOTPRINTS: Array<{ l: number; w: number }> = [
  { l: 4, w: 4 },
  { l: 4, w: 6 },
  { l: 4, w: 8 },
  { l: 6, w: 6 },
  { l: 6, w: 8 },
  { l: 8, w: 8 },
  { l: 8, w: 10 },
  { l: 10, w: 12 },
];

/* ---------------- Shared unit helpers ------------------------------------- */

export const LB_TO_KG = 0.453592;
export const G_PER_LB = 453.592;

/** Kilograms for a weight in pounds (1 decimal). */
export function kg(lb: number): number {
  return r1(lb * LB_TO_KG);
}

/* ---------------- Egg production maths ------------------------------------ */

export type LayingPresetId = "high" | "standard" | "heritage" | "custom";

export const LAYING_PRESETS: Array<{
  id: Exclude<LayingPresetId, "custom">;
  label: string;
  detail: string;
  eggsPerWeek: number;
}> = [
  {
    id: "high",
    label: "High producer",
    detail: "About 5.5 eggs/week — hybrid layers, Leghorns",
    eggsPerWeek: 5.5,
  },
  {
    id: "standard",
    label: "Standard layer",
    detail: "About 4.5 eggs/week — most backyard breeds",
    eggsPerWeek: 4.5,
  },
  {
    id: "heritage",
    label: "Heritage",
    detail: "About 3.5 eggs/week — heritage & dual-purpose breeds",
    eggsPerWeek: 3.5,
  },
];

/** Egg totals for a flock laying at a steady weekly rate. */
export function eggProduction(hens: number, eggsPerHenWeek: number) {
  const perWeek = hens * eggsPerHenWeek;
  return {
    perWeek,
    perMonth: perWeek * 4.33,
    perYear: perWeek * 52,
    dozensPerWeek: perWeek / 12,
  };
}

/* ---------------- Chicken feed maths -------------------------------------- */

export type ChickenFeedStage = "chicks" | "growers" | "layers";

export const CHICKEN_FEED_RATES: Record<
  ChickenFeedStage,
  { label: string; detail: string; lbPerDay: number }
> = {
  chicks: {
    label: "Chicks",
    detail: "0–6 weeks · about 0.08 lb/day each",
    lbPerDay: 0.08,
  },
  growers: {
    label: "Growers",
    detail: "7–17 weeks · about 0.16 lb/day each",
    lbPerDay: 0.16,
  },
  layers: {
    label: "Layers",
    detail: "18+ weeks · about 0.25 lb/day each",
    lbPerDay: 0.25,
  },
};

export function chickenFeed(input: {
  birds: number;
  lbPerDay: number;
  bagPrice: number;
  bagWeightLb: number;
}) {
  const perDayLb = input.birds * input.lbPerDay;
  const perWeekLb = perDayLb * 7;
  const perMonthLb = perDayLb * 30;
  const bagsPerMonth =
    input.bagWeightLb > 0 ? perMonthLb / input.bagWeightLb : 0;
  return {
    perDayLb,
    perWeekLb,
    perMonthLb,
    bagsPerMonth,
    monthlyCost: bagsPerMonth * input.bagPrice,
  };
}

/* ---------------- Quail maths (reverse egg target + feed) ----------------- */

/** A laying Coturnix hen averages about 5 eggs a week in lay. */
export const QUAIL_EGGS_PER_WEEK = 5;
/** Standard floor allowance for adult Coturnix quail. */
export const QUAIL_SPACE_SQFT = 1;

export function quailForEggs(targetEggsPerWeek: number) {
  const hens = Math.ceil(targetEggsPerWeek / QUAIL_EGGS_PER_WEEK);
  return { hens, cageSqft: hens * QUAIL_SPACE_SQFT };
}

export type QuailFeedStage = "chicks" | "adults";

export const QUAIL_FEED_RATES: Record<
  QuailFeedStage,
  { label: string; detail: string; gPerDay: number }
> = {
  chicks: {
    label: "Chicks",
    detail: "About 12 g of starter a day each",
    gPerDay: 12,
  },
  adults: {
    label: "Adults / layers",
    detail: "About 22 g a day each",
    gPerDay: 22,
  },
};

/** Standard quail feed bag: 50 lb ≈ 22.7 kg. */
export const QUAIL_BAG_KG = 22.7;

export function quailFeed(input: {
  birds: number;
  gPerDay: number;
  bagPrice: number;
}) {
  const perDayG = input.birds * input.gPerDay;
  const perMonthKg = (perDayG * 30) / 1000;
  const bagsPerMonth = perMonthKg / QUAIL_BAG_KG;
  return {
    perDayG,
    perDayLb: perDayG / G_PER_LB,
    perMonthKg,
    perMonthLb: perMonthKg / LB_TO_KG,
    bagsPerMonth,
    monthlyCost: bagsPerMonth * input.bagPrice,
  };
}

/* ---------------- Duck maths (reverse egg target) -------------------------- */

/** A laying duck hen averages about 4 eggs a week across the season. */
export const DUCK_EGGS_PER_WEEK = 4;
/** Standard-breed duck coop allowance (matches the Duck Coop tool). */
export const DUCK_COOP_SQFT = 4;
/** Minimum duck run allowance (the Duck Coop tool recommends 15). */
export const DUCK_RUN_SQFT = 10;

export function ducksForEggs(targetEggsPerWeek: number) {
  const ducks = Math.ceil(targetEggsPerWeek / DUCK_EGGS_PER_WEEK);
  return {
    ducks,
    coopSqft: ducks * DUCK_COOP_SQFT,
    runSqft: ducks * DUCK_RUN_SQFT,
  };
}

/* ---------------- Run-size maths ------------------------------------------- */

/** Ready-to-build run dimensions for a target area. */
export function runShapes(areaSqft: number) {
  const squareSide = Math.sqrt(areaSqft);
  const rect2W = Math.sqrt(areaSqft / 2);
  const rect3W = Math.sqrt(areaSqft / 3);
  return {
    square: { l: squareSide, w: squareSide },
    rect2: { l: rect2W * 2, w: rect2W },
    rect3: { l: rect3W * 3, w: rect3W },
    /** Fencing length around the 2:1 option, gate included in the run. */
    fencingFt: 2 * (rect2W * 2 + rect2W),
  };
}

/* ---------------- Nesting box + roost maths -------------------------------- */

export const HENS_PER_NEST_BOX = 4;
export const ROOST_IN_PER_BIRD = 10;
export const IN_TO_M = 0.0254;

export function nestingAndRoost(hens: number) {
  const boxes = Math.max(1, Math.ceil(hens / HENS_PER_NEST_BOX));
  const roostInches = hens * ROOST_IN_PER_BIRD;
  return {
    boxes,
    roostInches,
    roostFeet: roostInches / 12,
    roostMeters: roostInches * IN_TO_M,
  };
}

/* ---------------- Incubation / hatch-date maths ---------------------------- */

export type IncubationSpecies = "chicken" | "duck" | "quail" | "turkey" | "goose";

export const INCUBATION_DAYS: Record<
  IncubationSpecies,
  { label: string; days: number }
> = {
  chicken: { label: "Chicken", days: 21 },
  duck: { label: "Duck", days: 28 },
  quail: { label: "Quail", days: 18 },
  turkey: { label: "Turkey", days: 28 },
  goose: { label: "Goose", days: 30 },
};

/** Parse an <input type="date"> value ("YYYY-MM-DD") as a UTC date. */
export function parseISODate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function addDaysUTC(d: Date, days: number): Date {
  const out = new Date(d.getTime());
  out.setUTCDate(out.getUTCDate() + days);
  return out;
}

export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Today's date as a local "YYYY-MM-DD" string for date-input defaults. */
export function todayISO(): string {
  const n = new Date();
  const pad = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`;
}

/** "Sunday, 22 March 2026" — always read in UTC so dates never drift. */
export function fmtDateLong(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Sun 22 Mar" short form for compact rows. */
export function fmtDateShort(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function hatchPlan(setISO: string, days: number) {
  const set = parseISODate(setISO);
  if (!set) return null;
  const hatch = addDaysUTC(set, days);
  return {
    set,
    candle: addDaysUTC(set, Math.round(days * 0.4)),
    candleDay: Math.round(days * 0.4),
    lockdown: addDaysUTC(hatch, -3),
    hatch,
    days,
  };
}

/* ---------------- Brooder maths -------------------------------------------- */

export type BrooderSpecies = "chicken" | "quail";

/** Floor space per chick in sq ft for weeks 1–6 (planning figures). */
export const BROODER_SPACE_PER_WEEK: Record<BrooderSpecies, number[]> = {
  chicken: [0.5, 0.75, 0.75, 1, 1, 1],
  quail: [0.25, 0.3, 0.4, 0.5, 0.5, 0.5],
};

/** Under the lamp for week 1, then −5 °F a week down to 70 °F. */
export const BROODER_HEAT: Array<{ week: number; f: number; c: number }> = [
  { week: 1, f: 95, c: 35 },
  { week: 2, f: 90, c: 32 },
  { week: 3, f: 85, c: 29 },
  { week: 4, f: 80, c: 27 },
  { week: 5, f: 75, c: 24 },
  { week: 6, f: 70, c: 21 },
];

export function brooderSpace(chicks: number, species: BrooderSpecies) {
  const perBird = BROODER_SPACE_PER_WEEK[species];
  const weeks = perBird.map((sqft, i) => ({
    week: i + 1,
    perBird: sqft,
    total: chicks * sqft,
  }));
  return { weeks, finalTotal: weeks[weeks.length - 1].total };
}

/* ---------------- Egg cost maths (Tool 3) --------------------------------- */

/** A laying hen eats about 0.25 lb of feed a day ≈ 7.5 lb a month. */
export const HEN_FEED_LB_PER_MONTH = 7.5;

export function eggCost(input: {
  hens: number;
  eggsPerHenWeek: number;
  bagPrice: number;
  bagWeightLb: number;
  extraMonthly: number;
}) {
  const monthlyFeedLb = input.hens * HEN_FEED_LB_PER_MONTH;
  const feedCost =
    input.bagWeightLb > 0
      ? (monthlyFeedLb / input.bagWeightLb) * input.bagPrice
      : 0;
  const totalMonthly = feedCost + input.extraMonthly;
  const monthlyEggs = input.hens * input.eggsPerHenWeek * (52 / 12);
  const costPerEgg = monthlyEggs > 0 ? totalMonthly / monthlyEggs : 0;
  return {
    monthlyFeedLb,
    feedCost,
    totalMonthly,
    monthlyEggs,
    costPerEgg,
    costPerDozen: costPerEgg * 12,
  };
}
