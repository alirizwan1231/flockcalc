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
    "Free, no-signup calculators for backyard poultry keepers: coop and cage sizes for chickens, quail and ducks, how many hens you need, and what your eggs really cost.",
  contactEmail: "hello@flockcalc.site",
} as const;

export type Tool = {
  slug: string;
  path: string;
  name: string;
  shortName: string;
  keyword: string;
  blurb: string;
};

/** The five calculators, in launch order. */
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
];

export function toolBySlug(slug: string): Tool {
  const t = tools.find((x) => x.slug === slug);
  if (!t) throw new Error(`Unknown tool: ${slug}`);
  return t;
}
