import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import DuckCalc from "@/components/DuckCalc";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { fmt, r1, sqm } from "@/lib/math";

const tool = toolBySlug("duck-coop-size-calculator");
const TITLE = `Duck Coop Size Calculator — How Much Space Do Ducks Need? | ${site.name}`;
const DESC =
  "Free duck coop size calculator: coop and run space by breed size (3–5 sq ft per duck), ground nesting boxes, and the duck-only rules — no roosts, splash zones, extra ventilation.";

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
  },
  twitter: { card: "summary", title: TITLE, description: DESC },
};

const faqs: Faq[] = [
  {
    q: "How much space do ducks need in a coop and run?",
    a: "Plan on 4 sq ft of coop floor per standard duck (3 sq ft for light breeds like Runners and Campbells, 5 sq ft for heavy breeds like Muscovy), plus 10 sq ft of run per duck as a minimum and 15 sq ft if you can manage it. Ducks are ground birds, so floor area matters more than height.",
  },
  {
    q: "Do ducks need roosting bars?",
    a: "No. Unlike chickens, ducks sleep on the floor on a bed of straw or shavings. Spend the coop budget on deep, dry bedding and floor space instead of perches — a low ramp is the only 'furniture' most duck houses need.",
  },
  {
    q: "Do ducks need a pond or swimming water?",
    a: "No. Ducks must have water deep enough to dunk their whole head — it keeps their eyes, bills and nostrils clean — but swimming water is enrichment, not a requirement. A sturdy bucket or small trough they cannot tip over covers the health need.",
  },
  {
    q: "How many nesting boxes do ducks need?",
    a: "About one ground-level nesting spot per 4 ducks, though many ducks ignore boxes entirely and lay in a scooped-out corner of the bedding. A quiet, dark corner with deep straw is usually all the encouragement they need.",
  },
  {
    q: "Can ducks live in a chicken coop?",
    a: "Yes, with adjustments. Ducks need extra floor space, ground-level sleeping areas, and much better ventilation because they bring in moisture and make wet messes. Many keepers house them together using the duck space figures on this page rather than the chicken ones, and keep water stations outside the sleeping area.",
  },
  {
    q: "Why does a duck coop need more ventilation than a chicken coop?",
    a: "Ducks breathe out a lot of moisture and splash water everywhere, so a duck house gets damp fast. Damp bedding grows mould and ammonia, which damages ducks' lungs. Generous high vents that don't blow directly on the birds keep the house dry without chilling them.",
  },
];

const TABLE_DUCKS = [2, 4, 6, 8, 10, 12, 20, 30];

export default function DuckPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Duck Coop Size Calculator"
        title="Duck Coop Size Calculator"
        lede="Ducks need more floor than chickens and none of the perches. Enter your flock size and breed type for coop space, run space and nesting spots — plus the duck-specific details that chicken calculators miss."
      />

      <DuckCalc />

      <section className="section-block" aria-labelledby="how-heading">
        <div className="prose-grid">
          <div>
            <p className="kicker" aria-hidden="true">
              <span>01</span>&nbsp;&nbsp;Method
            </p>
            <h2 id="how-heading">How it works</h2>
          </div>
          <div className="body-col">
            <p>
              The calculation is <strong>ducks × space per duck</strong>, using the
              allowances commonly given in waterfowl-keeping guides and extension
              poultry publications: <strong>3 sq ft per light breed, 4 sq ft per
              standard breed and 5 sq ft per heavy breed</strong> of coop floor,
              with <strong>10 sq ft of run per duck minimum</strong> and 15 sq ft
              recommended. Nesting works out at one ground-level box or corner per
              4 ducks.
            </p>
            <p>
              Two duck facts shape these numbers. First, ducks live entirely at
              ground level — they do not roost or use raised nest boxes — so every
              square foot must be usable floor. Second, ducks are wet: they splash
              drinking water and produce wetter droppings than chickens, so the
              coop needs the space (and ventilation) to keep bedding dry. If ducks
              will share housing with chickens, use these duck figures for the
              shared floor — and compare with the{" "}
              <Link href="/chicken-coop-size-calculator">
                chicken coop size calculator
              </Link>{" "}
              for the chicken side of the flock.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/quail-coop-size-calculator">
                Quail coop
              </Link>
              <Link className="btn" href="/chicken-coop-size-calculator">
                Chicken coop
              </Link>
              <Link className="btn" href="/cost-per-egg-calculator">
                Cost per egg
              </Link>
              <Link className="btn" href="/how-many-chickens-do-i-need">
                How many chickens
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block" aria-labelledby="table-heading">
        <p className="kicker" aria-hidden="true">
          <span>02</span>&nbsp;&nbsp;Reference
        </p>
        <h2 id="table-heading">Duck coop size chart (standard breeds)</h2>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Ducks</th>
                <th>Coop (4 sq ft/duck)</th>
                <th>Coop in m²</th>
                <th>Run minimum (10 sq ft)</th>
                <th>Run recommended (15 sq ft)</th>
                <th>Nesting boxes</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DUCKS.map((d) => (
                <tr key={d}>
                  <td>{d} ducks</td>
                  <td>{fmt(d * 4)} sq ft</td>
                  <td>{fmt(r1(sqm(d * 4)))} m²</td>
                  <td>{fmt(d * 10)} sq ft</td>
                  <td>{fmt(d * 15)} sq ft</td>
                  <td>{Math.max(1, Math.ceil(d / 4))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqSection faqs={faqs} index="03" />
      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
