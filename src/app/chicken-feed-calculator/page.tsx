import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import ChickenFeedCalc from "@/components/ChickenFeedCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { chickenFeed, fmt, kg, money, r1, r2 } from "@/lib/math";

const tool = toolBySlug("chicken-feed-calculator");
const TITLE = `Chicken Feed Calculator — Daily & Monthly Feed Amounts`;
const DESC =
  "Free chicken feed calculator: daily, weekly and monthly feed for chicks, growers and layers in lb and kg, plus bags per month and feeding cost.";

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
    q: "How much feed does a chicken eat per day?",
    a: "An adult laying hen eats about 0.25 lb (roughly 110 g) of feed a day — around 1.75 lb a week and 7.5 lb a month. Growers eat about 0.16 lb a day and young chicks about 0.08 lb a day averaged over their first six weeks. Appetite rises in cold weather and dips in heat.",
  },
  {
    q: "How long does a 50 lb bag of chicken feed last?",
    a: "For layers at 0.25 lb per bird per day, a 50 lb bag holds 200 bird-days: 10 hens finish it in about 20 days, 6 hens in about 33 days, and 20 hens in about 10 days. The calculator above gives bags per month for your exact flock.",
  },
  {
    q: "How much does it cost to feed chickens per month?",
    a: "With the defaults on this page — 10 layers and a $22, 50 lb bag — feed costs about $33 a month. Your figure moves with flock size and local feed prices; enter your own bag price for an exact number. Feed is typically the largest running cost of keeping chickens.",
  },
  {
    q: "Do free-range chickens eat less feed?",
    a: "A little, in the growing season. Hens with good forage — grass, insects, seeds — may get 10–20% of their intake from the range in spring and summer. Treat it as a bonus, not a plan: keep layer feed available free-choice year-round, because forage alone is short on the protein and calcium laying needs.",
  },
  {
    q: "Should I restrict how much feed my chickens get?",
    a: "No — layers are normally fed free-choice, with feed available all day. Hens regulate their own intake well; a healthy layer stops at roughly what she needs. Restricting feed reduces laying before it reduces weight. The exception is meat birds, which are sometimes limit-fed under a managed programme.",
  },
];

const TABLE_BIRDS = [4, 6, 10, 12, 20, 30];

export default function ChickenFeedPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Chicken Feed Calculator"
        title="Chicken Feed Calculator"
        lede="How much feed will your flock get through — and how often will you be buying bags? Enter your bird count and stage for daily, weekly and monthly amounts in pounds and kilos."
      />

      <CalcBadge />
      <ChickenFeedCalc />

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
              Each stage of life has a standard daily intake:{" "}
              <strong>chicks about 0.08 lb a day</strong> averaged over the
              first six weeks, <strong>growers about 0.16 lb</strong>, and{" "}
              <strong>layers about 0.25 lb</strong> — the planning figures used
              in extension poultry guides. The calculator multiplies by your
              birds, then by 7 for a week and 30 for a month, and divides the
              monthly total by your bag size for bags per month.
            </p>
            <p>
              Worked example: 10 laying hens eat 2.5 lb a day, which is 75 lb a
              month — <strong>1.5 fifty-pound bags</strong>, or about $33 a
              month at $22 a bag. Spillage and the local sparrow population
              are not in the maths, sadly; hanging feeders and rodent-proof
              storage close most of that gap.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/cost-per-egg-calculator">
                Cost per egg
              </Link>
              <Link className="btn" href="/quail-feed-calculator">
                Quail feed
              </Link>
              <Link className="btn" href="/egg-production-calculator">
                Egg production
              </Link>
              <Link className="btn" href="/brooder-planner">
                Brooder planner
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
        <h2 id="table-heading">Layer feed by flock size</h2>
        <p>
          Laying hens at 0.25 lb per bird per day, with 50 lb bags at $22 for
          the cost column.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Layers</th>
                <th>Per day</th>
                <th>Per month</th>
                <th>Per month (kg)</th>
                <th>50 lb bags / month</th>
                <th>Cost / month</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_BIRDS.map((b) => {
                const r = chickenFeed({
                  birds: b,
                  lbPerDay: 0.25,
                  bagPrice: 22,
                  bagWeightLb: 50,
                });
                return (
                  <tr key={b}>
                    <td>{b} layers</td>
                    <td>{fmt(r1(r.perDayLb))} lb</td>
                    <td>{fmt(r1(r.perMonthLb))} lb</td>
                    <td>{fmt(kg(r.perMonthLb))} kg</td>
                    <td>{fmt(r1(r.bagsPerMonth))}</td>
                    <td>{money(r2(r.monthlyCost))}</td>
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
