import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import CoopCalc from "@/components/CoopCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { chickenSpace, fmt, r1, sqm } from "@/lib/math";

const tool = toolBySlug("chicken-coop-size-calculator");
const TITLE = `Chicken Coop Size Calculator — Coop & Run Space Per Chicken | ${site.name}`;
const DESC =
  "Free chicken coop size calculator, breed-aware: coop and run square footage for bantam, standard and large chickens, roost length, nesting boxes and coop footprints that fit.";

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
    q: "How many square feet per chicken in a coop?",
    a: "For standard breeds, plan on 3.5–4 sq ft of coop floor per chicken; bantams need about 2 sq ft and large, heavy breeds about 4.5 sq ft. Anything under about 2 sq ft per standard bird invites stress, feather-pecking and disease, whatever the seller of a flat-pack coop claims.",
  },
  {
    q: "How much run space do chickens need?",
    a: "10 sq ft of outdoor run per standard chicken is the widely used recommendation (6 sq ft for bantams, 12 for large breeds). Birds that free-range for much of the day can manage with less run, because the run is not their only outdoor space.",
  },
  {
    q: "How many chickens fit in a 4 × 8 ft coop?",
    a: "A 4 × 8 ft coop has 32 sq ft of floor. At 3.5 sq ft per standard bird that houses 9 chickens comfortably — not the 16–20 some sellers advertise, figures that assume factory-farm minimums. At bantam rates (2 sq ft) it fits 16; at large-breed rates, 7.",
  },
  {
    q: "How much roost space does a chicken need?",
    a: "Allow 10 inches (about 25 cm) of roost bar per bird — more in hot climates, where birds spread out to cool down. For 10 hens that is just over 8 ft of roost, which can be split across two parallel bars.",
  },
  {
    q: "How many nesting boxes do I need?",
    a: "One nesting box per 4 hens is plenty — hens happily share, and most flocks use one or two favourite boxes whatever you provide. Ten hens need 3 boxes; twenty hens need 5.",
  },
  {
    q: "Is a bigger coop always better?",
    a: "Within reason, yes. Extra space reduces bullying, keeps litter drier and means birds cope better on days they stay inside (storms, snow, flock-downs). The main cost of oversizing is money and cleaning time, not the birds' welfare — nobody's flock ever suffered from too much room.",
  },
];

const TABLE_BIRDS = [2, 4, 6, 8, 10, 12, 20, 30, 50];

export default function CoopPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Chicken Coop Size Calculator"
        title="Chicken Coop Size Calculator"
        lede={
          <>
            The honest coop maths, adjusted for your birds&rsquo; size. Enter
            your flock and get coop and run area, roost length and nesting boxes
            — and see how many birds the ready-made coop sizes really hold.
          </>
        }
      />

      <CalcBadge />
      <CoopCalc />

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
              Space per bird depends on bird size, following the allowances used
              in university extension poultry guides:{" "}
              <strong>bantams 2 sq ft coop / 6 sq ft run</strong>,{" "}
              <strong>standard breeds 3.5 sq ft / 10 sq ft</strong>, and{" "}
              <strong>large breeds 4.5 sq ft / 12 sq ft</strong>. Multiply by your
              flock size for the totals. Roost length is 10 inches per bird, and
              nesting boxes work out at one per four hens.
            </p>
            <p>
              A word of honesty about minimums: some sources quote 2–3 sq ft per
              bird indoors, and factory standards go lower still. Those figures
              assume birds spend nearly all day outdoors and are managed
              commercially. Backyard keepers who size to 3.5–4 sq ft indoors see
              calmer flocks and far less feather-pecking — which is why this
              calculator plans around the comfortable figures and labels them as
              such. Planning a flock from scratch? Work out{" "}
              <Link href="/how-many-chickens-do-i-need">
                how many chickens you actually need
              </Link>{" "}
              first, then come back and size the coop.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/quail-coop-size-calculator">
                Quail coop
              </Link>
              <Link className="btn" href="/duck-coop-size-calculator">
                Duck coop
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
        <h2 id="table-heading">Chicken coop size chart (standard breeds)</h2>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Chickens</th>
                <th>Coop (3.5 sq ft/bird)</th>
                <th>Coop in m²</th>
                <th>Run (10 sq ft/bird)</th>
                <th>Run in m²</th>
                <th>Roost length</th>
                <th>Nesting boxes</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_BIRDS.map((b) => {
                const s = chickenSpace(b, "standard");
                return (
                  <tr key={b}>
                    <td>{b} chickens</td>
                    <td>{fmt(r1(s.coopSqft))} sq ft</td>
                    <td>{fmt(r1(sqm(s.coopSqft)))} m²</td>
                    <td>{fmt(r1(s.runSqft))} sq ft</td>
                    <td>{fmt(r1(sqm(s.runSqft)))} m²</td>
                    <td>{fmt(r1(s.roostFeet))} ft</td>
                    <td>{s.nestingBoxes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <FaqSection faqs={faqs} index="03" />
      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
