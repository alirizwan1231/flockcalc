import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import HatchCalc from "@/components/HatchCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { INCUBATION_DAYS, type IncubationSpecies } from "@/lib/math";

const tool = toolBySlug("hatch-date-calculator");
const TITLE = `Hatch Date Calculator — Incubation & Hatch Day Planner`;
const DESC =
  "Free hatch date calculator: pick your species and the day eggs are set to get the hatch date, lockdown day and candling milestone. Chickens, ducks, quail and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${site.url}${tool.path}` },
  openGraph: {
    type: "website",
    url: `${site.url}${tool.path}`,
    siteName: site.name,
    title: TITLE,
    description: DESC,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [ogImage.url],
  },
};

const faqs: Faq[] = [
  {
    q: "How long do chicken eggs take to hatch?",
    a: "21 days from the day they are set, at a steady 37.5 °C (99.5 °F) in a forced-air incubator. Bantam eggs sometimes pip a day early, and a slightly cool incubator can stretch the hatch to day 22–23 — which is why day 21 is a target, not a deadline.",
  },
  {
    q: "What is lockdown in incubation?",
    a: "The final three days before hatch: you stop turning the eggs, raise the humidity (typically to around 65–70%), and stop opening the incubator. The chick is positioning itself to hatch, and opening the lid dumps the humid air it needs to avoid sticking to the shell membrane.",
  },
  {
    q: "When should I candle eggs?",
    a: "Around 40% of the way through incubation — about day 7–8 for chickens, day 10–11 for ducks — is the classic first look, when veins and a dark embryo are easy to see in a dark room. Earlier candling risks chilling or dropping eggs for little information; clears (infertile eggs) can be removed at this check.",
  },
  {
    q: "Why is my hatch late (or early)?",
    a: "Temperature is almost always why. A incubator running half a degree cool delays development and pushes hatch late; running hot speeds it up and weakens chicks. Count the set day as day 0 as well — a common off-by-one is expecting hatch a day before it is due.",
  },
  {
    q: "How long do duck, quail, turkey and goose eggs take?",
    a: "Most duck breeds take 28 days (Muscovies are the exception at about 35). Coturnix quail take 17–18 days, turkeys 28 days, and geese around 29–31 days depending on breed — this calculator uses 18 for quail and 30 for geese as planning figures.",
  },
];

const SPECIES_ROWS = (
  Object.keys(INCUBATION_DAYS) as IncubationSpecies[]
).map((id) => ({ id, ...INCUBATION_DAYS[id] }));

export default function HatchDatePage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Hatch Date Calculator"
        title="Hatch Date Calculator"
        lede="Set eggs today — when do they hatch? Pick your species and setting date for the hatch day, the lockdown date, and when to candle, all counted for you."
      />

      <CalcBadge />
      <HatchCalc />

      <section className="section-block" aria-labelledby="how-heading">
        <div className="prose-grid">
          <div>
            <p className="kicker" aria-hidden="true">
              <CirclePlus size={16} />
              <span>01</span>&nbsp;&nbsp;Method
            </p>
            <h2 id="how-heading">How it works</h2>
          </div>
          <div className="body-col">
            <p>
              Incubation counts <strong>full days from the set date</strong> —
              the day eggs go in is day 0. Hatch day is simply{" "}
              <strong>set date + the species' incubation period</strong>:
              21 days for chickens, 28 for ducks and turkeys, 18 for quail,
              30 for geese. Lockdown is always three days before hatch, and
              the first candling check lands at about 40% of the way through.
            </p>
            <p>
              Worked example: chicken eggs set on{" "}
              <strong>1 March</strong> candle around 9 March, go into lockdown
              on 19 March, and hatch on <strong>22 March</strong>. All dates
              are calculated in UTC so a daylight-saving change mid-incubation
              can never shift your hatch day by an hour — or a day.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/brooder-planner">
                Brooder planner
              </Link>
              <Link className="btn" href="/how-many-chickens-do-i-need">
                How many chickens
              </Link>
              <Link className="btn" href="/egg-production-calculator">
                Egg production
              </Link>
              <Link className="btn" href="/chicken-feed-calculator">
                Chicken feed
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block" aria-labelledby="table-heading">
        <p className="kicker" aria-hidden="true">
          <CirclePlus size={16} />
          <span>02</span>&nbsp;&nbsp;Reference
        </p>
        <h2 id="table-heading">Incubation periods by species</h2>
        <p>
          The planning figures this calculator uses. Individual breeds and
          incubator temperatures can shift a hatch by a day either way.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Species</th>
                <th>Incubation</th>
                <th>Candle around</th>
                <th>Lockdown from</th>
              </tr>
            </thead>
            <tbody>
              {SPECIES_ROWS.map((s) => (
                <tr key={s.id}>
                  <td>{s.label}</td>
                  <td>{s.days} days</td>
                  <td>day {Math.round(s.days * 0.4)}</td>
                  <td>day {s.days - 3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">
          Muscovy ducks break the duck rule at about 35 days — if you are
          setting Muscovy eggs, count 35 days and lockdown from day 32.
        </p>
      </section>

      <FaqSection faqs={faqs} index="03" />
      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
