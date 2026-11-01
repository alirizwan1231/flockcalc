/**
 * Central brand configuration.
 * To rename the site, edit the values in this one file
 * (and the "name" field in package.json). Everything else —
 * metadata, canonical URLs, sitemap, robots, JSON-LD,
 * header and footer — reads from here.
 */
export const site = {
  name: "FlockCalc",
  domain: "flockcalc.site",
  url: "https://flockcalc.site",
  tagline: "Free calculators for backyard chickens, quail and ducks",
  description:
    "Free, no-signup calculators for backyard poultry keepers: coop and cage sizes for chickens, quail and ducks, how many hens you need, and your true egg costs.",
  contactEmail: "hello@flockcalc.site",
} as const;

/** Shared Open Graph / Twitter card image (public/og.png, 1200×630). */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "FlockCalc — free calculators for backyard chickens, quail and ducks",
} as const;

export type Tool = {
  slug: string;
  path: string;
  name: string;
  shortName: string;
  keyword: string;
  blurb: string;
};

/** All fourteen calculators. The first five are the header-nav tools —
 *  keep their order stable; the rest follow. */
export const tools: Tool[] = [
  {
    slug: "quail-coop-size-calculator",
    path: "/quail-coop-size-calculator",
    name: "Quail Coop Size Calculator",
    shortName: "Quail Coop Size",
    keyword: "quail coop size calculator",
    blurb:
      "How much floor space Coturnix quail need, which cage sizes fit your covey, and how many quail fit in the cage you already have.",
  },
  {
    slug: "how-many-chickens-do-i-need",
    path: "/how-many-chickens-do-i-need",
    name: "How Many Chickens Do I Need?",
    shortName: "How Many Chickens",
    keyword: "how many chickens do i need",
    blurb:
      "Tell us how many eggs your household eats and we work out how many laying hens you need — plus a buffer hen for moulting season.",
  },
  {
    slug: "cost-per-egg-calculator",
    path: "/cost-per-egg-calculator",
    name: "Cost Per Egg Calculator",
    shortName: "Cost Per Egg",
    keyword: "cost per egg calculator",
    blurb:
      "What a home-raised egg actually costs once feed is counted — per egg, per dozen, and compared with the store price.",
  },
  {
    slug: "duck-coop-size-calculator",
    path: "/duck-coop-size-calculator",
    name: "Duck Coop Size Calculator",
    shortName: "Duck Coop Size",
    keyword: "duck coop size calculator",
    blurb:
      "Coop and run space for ducks by breed size, nesting boxes, and the duck-specific details (no roosts, splash zones) chickens don't need.",
  },
  {
    slug: "chicken-coop-size-calculator",
    path: "/chicken-coop-size-calculator",
    name: "Chicken Coop Size Calculator",
    shortName: "Chicken Coop Size",
    keyword: "chicken coop size calculator",
    blurb:
      "Coop and run size for bantam, standard and large breeds, roost length, nesting boxes and ready-made coop footprints.",
  },
  {
    slug: "egg-production-calculator",
    path: "/egg-production-calculator",
    name: "Egg Production Calculator",
    shortName: "Egg Production",
    keyword: "egg production calculator",
    blurb:
      "Eggs per week, month and year from your hen count and laying rate — in eggs and dozens.",
  },
  {
    slug: "chicken-feed-calculator",
    path: "/chicken-feed-calculator",
    name: "Chicken Feed Calculator",
    shortName: "Chicken Feed",
    keyword: "chicken feed calculator",
    blurb:
      "Daily, weekly and monthly feed for chicks, growers and layers, with bags per month and cost.",
  },
  {
    slug: "how-many-quail-do-i-need",
    path: "/how-many-quail-do-i-need",
    name: "How Many Quail Do I Need?",
    shortName: "How Many Quail",
    keyword: "how many quail do i need",
    blurb:
      "Work backwards from the quail eggs you want each week to the hens — and the cage — you need.",
  },
  {
    slug: "chicken-run-size-calculator",
    path: "/chicken-run-size-calculator",
    name: "Chicken Run Size Calculator",
    shortName: "Chicken Run Size",
    keyword: "chicken run size calculator",
    blurb:
      "Total run area for your flock, plus ready-to-build dimensions and fencing length.",
  },
  {
    slug: "hatch-date-calculator",
    path: "/hatch-date-calculator",
    name: "Hatch Date Calculator",
    shortName: "Hatch Date",
    keyword: "hatch date calculator",
    blurb:
      "Set eggs today and get the hatch date, lockdown day and candling milestone for five species.",
  },
  {
    slug: "nesting-box-calculator",
    path: "/nesting-box-calculator",
    name: "Nesting Box & Roost Calculator",
    shortName: "Nesting Boxes & Roost",
    keyword: "nesting box calculator",
    blurb:
      "Nesting boxes at one per four hens and total roost length at 10 inches per bird.",
  },
  {
    slug: "how-many-ducks-do-i-need",
    path: "/how-many-ducks-do-i-need",
    name: "How Many Ducks Do I Need?",
    shortName: "How Many Ducks",
    keyword: "how many ducks do i need",
    blurb:
      "Work backwards from the duck eggs you want each week to the ducks, coop and run you need.",
  },
  {
    slug: "quail-feed-calculator",
    path: "/quail-feed-calculator",
    name: "Quail Feed Calculator",
    shortName: "Quail Feed",
    keyword: "quail feed calculator",
    blurb:
      "Daily and monthly feed for quail chicks and adults in grams and pounds, with bag counts and cost.",
  },
  {
    slug: "brooder-planner",
    path: "/brooder-planner",
    name: "Brooder Size Calculator",
    shortName: "Brooder Planner",
    keyword: "brooder size calculator",
    blurb:
      "Brooder floor space week by week for chicken and quail chicks, plus the heat-lamp schedule.",
  },
];

export function toolBySlug(slug: string): Tool {
  const t = tools.find((x) => x.slug === slug);
  if (!t) throw new Error(`Unknown tool: ${slug}`);
  return t;
}
