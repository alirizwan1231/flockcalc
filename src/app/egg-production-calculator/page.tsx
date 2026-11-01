import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import EggProductionCalc from "@/components/EggProductionCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { eggProduction, fmt, r1 } from "@/lib/math";

const tool = toolBySlug("egg-production-calculator");
const TITLE = `Egg Production Calculator — Eggs Per Week, Month & Year`;
const DESC =
  "Free egg production calculator: how many eggs your hens will lay per week, month and year, by flock size and laying rate — in eggs and dozens.";

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
    q: "How many eggs does a hen lay per week?",
    a: "A good hybrid layer in her first season lays about 5–6 eggs a week. Most standard backyard breeds average around 4–5, and heritage or dual-purpose breeds around 3–4. All breeds lay less in winter and pause while moulting, so treat these as laying-season averages, not guarantees.",
  },
  {
    q: "How many eggs will 10 hens lay?",
    a: "At the standard rate of 4.5 eggs per hen per week, 10 hens lay about 45 eggs a week — roughly 3.75 dozen, about 195 eggs a month and around 2,340 a year before winter slowdowns are counted.",
  },
  {
    q: "Why is my actual egg count lower than the calculator says?",
    a: "Usually one of four things: short winter days (laying is driven by daylight), moulting, age — production peaks in the first laying year and declines each year after — or a hidden stress such as mites, bullying or a feed change. A sudden drop in a previously steady flock is worth investigating; a gradual seasonal one is normal.",
  },
  {
    q: "Do hens lay every day?",
    a: "Even the best layers do not lay daily year-round. A hen's laying cycle runs a little over 24 hours, so laying time drifts later each day until she skips a day and restarts. Five to six eggs a week from a top layer already reflects those skipped days.",
  },
  {
    q: "How can I get more eggs from the same hens?",
    a: "Light is the biggest lever — layers need about 14 hours of light, which is why production dips in winter. Beyond that: a proper layer feed with enough calcium, constant clean water, and low stress. No feed or supplement makes a heritage breed out-lay a hybrid, though; breed sets the ceiling.",
  },
];

const TABLE_HENS = [4, 6, 8, 10, 12, 20];

export default function EggProductionPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Egg Production Calculator"
        title="Egg Production Calculator"
        lede="How many eggs will your hens actually lay? Enter your flock size and how well they lay to see eggs per week, month and year — and how many dozen that really is."
      />

      <CalcBadge />
      <EggProductionCalc />

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
              The formula is simple multiplication:{" "}
              <strong>hens × eggs per hen per week = eggs per week</strong>.
              Months multiply the week by 4.33 (the average number of weeks in
              a month) and years by 52. Dozens are the weekly total divided by
              12.
            </p>
            <p>
              Worked example: 10 hens at the standard 4.5 eggs per week lay{" "}
              <strong>45 eggs a week</strong> — about 3.75 dozen, roughly 195
              eggs a month and around 2,340 a year. The honest catch is the
              rate: it assumes hens in lay. First-year hybrids really do
              average 5–5.5 eggs a week in season; a mixed backyard flock on
              short winter days may manage half that, which is why the
              heritage preset exists.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/how-many-chickens-do-i-need">
                How many chickens
              </Link>
              <Link className="btn" href="/cost-per-egg-calculator">
                Cost per egg
              </Link>
              <Link className="btn" href="/chicken-feed-calculator">
                Chicken feed
              </Link>
              <Link className="btn" href="/how-many-ducks-do-i-need">
                How many ducks
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
        <h2 id="table-heading">Eggs per week by flock size</h2>
        <p>
          Weekly eggs at the three preset laying rates. Use the column that
          matches your breed — most mixed backyard flocks sit in the middle.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Hens</th>
                <th>Heritage (3.5/wk)</th>
                <th>Standard (4.5/wk)</th>
                <th>High producer (5.5/wk)</th>
                <th>Standard, per year</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_HENS.map((h) => {
                const std = eggProduction(h, 4.5);
                return (
                  <tr key={h}>
                    <td>{h} hens</td>
                    <td>{fmt(eggProduction(h, 3.5).perWeek)} eggs</td>
                    <td>
                      {fmt(std.perWeek)} eggs ({fmt(r1(std.dozensPerWeek))} dozen)
                    </td>
                    <td>{fmt(eggProduction(h, 5.5).perWeek)} eggs</td>
                    <td>about {fmt(Math.round(std.perYear))} eggs</td>
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
