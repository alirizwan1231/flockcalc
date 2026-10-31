import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import EggCostCalc from "@/components/EggCostCalc";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { eggCost, fmt, money, r2 } from "@/lib/math";

const tool = toolBySlug("cost-per-egg-calculator");
const TITLE = `Cost Per Egg Calculator — What Do Backyard Eggs Really Cost? | ${site.name}`;
const DESC =
  "Free cost per egg calculator: enter hens, laying rate and your feed bag price to see your true cost per egg and per dozen, and whether you beat the store price.";

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
    q: "How much feed does a laying hen eat?",
    a: "About 0.25 lb (roughly 110 g) of layer feed per day — around 1.75 lb a week and 7.5 lb a month. That is the standard planning figure used by feed companies and extension guides, and it is what this calculator uses.",
  },
  {
    q: "What does one backyard egg cost?",
    a: "With 6 hens laying 5 eggs a week and a $25 bag of feed, the worked example on this page gives about $0.22 per egg, or $2.60 per dozen, feed only. Your number moves with your feed price, laying rate and how many extra costs you include.",
  },
  {
    q: "Why are my home eggs sometimes more expensive than store eggs?",
    a: "Scale. Commercial farms buy feed by the tonne and house thousands of hens per worker, so their cost per egg is very low. A backyard flock wins on freshness, taste, food miles and enjoyment — and often beats free-range or organic store prices, even when it cannot beat the cheapest battery eggs.",
  },
  {
    q: "Which costs should I include besides feed?",
    a: "Feed is usually 70–80% of the running cost. Bedding, grit, oyster shell, treats and the occasional replacement hen make up most of the rest. Add them in the optional monthly costs field for a fuller picture. One-off setup costs (coop, fencing) are not included — spread over years of eggs, they add a few cents per egg.",
  },
  {
    q: "Does cost per egg change through the year?",
    a: "Yes. Hens eat roughly the same amount all year but lay fewer eggs in winter and during moulting, so your cost per egg rises in those months and falls in spring. The calculator uses your average laying rate, so use a realistic yearly average (4–5 eggs a week for most breeds) rather than a spring peak.",
  },
  {
    q: "How can I lower my cost per egg?",
    a: "Buy feed in larger bags or on offer, store it dry so none is wasted, choose productive breeds, and keep hens through their best laying years. Reducing feed waste — raised feeders, rodent-proof storage — is usually the single biggest saving.",
  },
];

const TABLE_HENS = [2, 4, 6, 8, 10, 12, 20];

export default function EggCostPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Cost Per Egg Calculator"
        title="Cost Per Egg Calculator"
        lede={
          <>
            &ldquo;Free eggs&rdquo; are not quite free — the feed bag sees to
            that. Enter your flock size, laying rate and feed price to find your
            honest cost per egg and per dozen, and how it compares with the
            store.
          </>
        }
      />

      <EggCostCalc />

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
              A laying hen eats about <strong>0.25 lb of feed a day</strong>, which
              is <strong>7.5 lb a month</strong> — the standard planning figure in
              extension poultry guides. The calculator multiplies that by your
              hens, prices it from your feed bag, adds any extra monthly costs you
              enter, and divides by the eggs you collect (
              <strong>hens × eggs per week × 52 ÷ 12</strong> for a monthly total).
            </p>
            <p>
              Worked example with the default values: 6 hens eat 45 lb of feed a
              month, costing $28.13 from a $25 / 40 lb bag. They lay about 130 eggs
              a month, so each egg costs about $0.22 — <strong>$2.60 per dozen</strong>,
              against a $4 store dozen. Change any input above and your own numbers
              update instantly.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/quail-coop-size-calculator">
                Quail coop
              </Link>
              <Link className="btn" href="/chicken-coop-size-calculator">
                Chicken coop
              </Link>
              <Link className="btn" href="/duck-coop-size-calculator">
                Duck coop
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
        <h2 id="table-heading">Cost per egg by flock size</h2>
        <p>
          Using the default feed price ($25 per 40 lb bag) and 5 eggs per hen
          per week, feed only:
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Hens</th>
                <th>Feed per month</th>
                <th>Feed cost per month</th>
                <th>Eggs per month</th>
                <th>Cost per dozen</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_HENS.map((h) => {
                const r = eggCost({
                  hens: h,
                  eggsPerHenWeek: 5,
                  bagPrice: 25,
                  bagWeightLb: 40,
                  extraMonthly: 0,
                });
                return (
                  <tr key={h}>
                    <td>{h} hens</td>
                    <td>{fmt(r.monthlyFeedLb)} lb</td>
                    <td>{money(r2(r.feedCost))}</td>
                    <td>about {fmt(Math.round(r.monthlyEggs))}</td>
                    <td>{money(r2(r.costPerDozen))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="table-note">
          Notice the cost per dozen stays flat — feed and eggs both scale with
          flock size. What actually moves your cost per egg is the feed price
          and the laying rate, not the number of hens. Not sure how many hens
          you need? Start with the{" "}
          <Link href="/how-many-chickens-do-i-need">
            how many chickens calculator
          </Link>
          .
        </p>
      </section>

      <FaqSection faqs={faqs} index="03" />
      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
