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
