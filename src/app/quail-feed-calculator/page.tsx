import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import QuailFeedCalc from "@/components/QuailFeedCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { fmt, quailFeed, r1 } from "@/lib/math";

const tool = toolBySlug("quail-feed-calculator");
const TITLE = `Quail Feed Calculator — Daily & Monthly Quail Feed`;
const DESC =
  "Free quail feed calculator: daily and monthly feed for quail chicks and adults in grams, kilos and pounds, with 50 lb bags per month and cost.";

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
    q: "How much feed does a quail eat per day?",
    a: "An adult Coturnix quail eats about 20–25 g of feed a day — this calculator uses 22 g. Chicks average around 12 g a day across their first weeks, starting on just a few grams and climbing quickly. In teaspoons that is roughly 4–5 teaspoons per adult bird per day, before spillage.",
  },
  {
    q: "How long does a 50 lb bag of quail feed last?",
    a: "A 50 lb (22.7 kg) bag holds about 1,000 adult-quail-days: a covey of 20 adults gets through it in roughly 7 weeks, and 50 adults in about 3 weeks. The calculator shows your exact bags-per-month figure.",
  },
  {
    q: "What protein level does quail feed need?",
    a: "Higher than chicken feed. Quail chicks are typically started on a game bird or turkey starter around 24–28% protein, and adult layers do best around 20–24% protein with added calcium. Standard 16% chicken layer feed is too low in protein for quail to lay and feather well.",
  },
  {
    q: "Can quail eat chicken feed?",
    a: "Adults can survive on it, but they will usually lay less and feather worse — the protein is too low and the calcium balance is aimed at hens. If game bird feed is unavailable, a 20%+ protein chick starter (unmedicated for layers) is a closer match than layer pellets. Chicks should never be raised on low-protein feed.",
  },
  {
    q: "Why is my quail feed use higher than the calculator says?",
    a: "Almost always spillage. Quail bill feed out of open dishes enthusiastically, and a tray-style feeder can lose a third of its contents to the cage floor. Feeders with narrow slots or a grill over the trough bring real-world use much closer to the calculated 22 g.",
  },
];

const TABLE_BIRDS = [6, 12, 20, 30, 50, 100];

export default function QuailFeedPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Quail Feed Calculator"
        title="Quail Feed Calculator"
        lede="Quail eat grams, not scoops. Enter your covey size and stage for daily and monthly feed in grams, kilos and pounds — and how far a feed bag actually goes."
      />

      <CalcBadge />
      <QuailFeedCalc />

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
              Two standard intakes drive everything:{" "}
              <strong>adults about 22 g of feed a day</strong> and{" "}
              <strong>chicks about 12 g a day</strong> averaged over the early
              weeks. Multiply by your birds for the daily total, by 30 for the
              month, and divide by the 22.7 kg in a standard 50 lb bag for
              bags per month.
            </p>
            <p>
              Worked example: 20 adult quail eat <strong>440 g a day</strong> —
              about a pound — which is 13.2 kg a month, or a little over half
              a 50 lb bag. That is the whole laying covey fed for roughly the
              cost of feeding two hens, which is why quail are the entry point
              so many keepers start with.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/chicken-feed-calculator">
                Chicken feed
              </Link>
              <Link className="btn" href="/quail-coop-size-calculator">
                Quail coop size
              </Link>
              <Link className="btn" href="/how-many-quail-do-i-need">
                How many quail
              </Link>
              <Link className="btn" href="/cost-per-egg-calculator">
                Cost per egg
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
        <h2 id="table-heading">Adult quail feed by covey size</h2>
        <p>
          Adult Coturnix at 22 g per bird per day, bags counted at 50 lb
          (22.7 kg).
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Adult quail</th>
                <th>Per day</th>
                <th>Per day (lb)</th>
                <th>Per month</th>
                <th>Per month (lb)</th>
                <th>Bags / month</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_BIRDS.map((b) => {
                const r = quailFeed({ birds: b, gPerDay: 22, bagPrice: 0 });
                return (
                  <tr key={b}>
                    <td>{b} quail</td>
                    <td>{fmt(r.perDayG)} g</td>
                    <td>{fmt(r1(r.perDayLb))} lb</td>
                    <td>{fmt(r1(r.perMonthKg))} kg</td>
                    <td>{fmt(r1(r.perMonthLb))} lb</td>
                    <td>{fmt(r1(r.bagsPerMonth))}</td>
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
