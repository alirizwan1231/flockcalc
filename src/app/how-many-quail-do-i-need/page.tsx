import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import HowManyQuailCalc from "@/components/HowManyQuailCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { fmt, quailForEggs, r1, sqm } from "@/lib/math";

const tool = toolBySlug("how-many-quail-do-i-need");
const TITLE = `How Many Quail Do I Need? — Quail for Your Egg Target`;
const DESC =
  "Free reverse calculator: enter the quail eggs you want per week and get the Coturnix hens you need, their laying total and the cage space for them.";

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
    q: "How many eggs does a quail lay per week?",
    a: "A Coturnix (Japanese) quail hen in lay produces about 5 eggs a week on average — close to an egg a day at peak, with breaks for moulting and short winter days. Good laying strains kept under lights can hold a higher average through winter.",
  },
  {
    q: "How many quail do I need for a dozen eggs a week?",
    a: "About 3 hens: 12 eggs ÷ 5 per hen = 2.4, rounded up to 3. In practice most people start with 6 or more — quail are social, eggs get used faster than expected, and a slightly bigger covey covers a hen's off weeks without the supply dipping.",
  },
  {
    q: "Do I need a male quail for eggs?",
    a: "No. Hens lay unfertilised eggs without any male present, and for eating eggs a hen-only covey is quieter and simpler. Keep a male (rooster) only if you want fertile eggs for hatching — usually one male per 3–5 hens in a breeding group.",
  },
  {
    q: "How many quail eggs equal one chicken egg?",
    a: "About five. A Coturnix egg weighs roughly 10–12 g against 55–60 g for a large chicken egg, so recipes swap at around 5 quail eggs per chicken egg — or about 3 quail eggs for a medium one.",
  },
  {
    q: "When do quail start laying, and for how long?",
    a: "Coturnix mature fast: hens usually start laying at 6–8 weeks old. Laying is strongest in the first year and declines after about 18 months, so many keepers refresh part of the covey each year to keep production steady.",
  },
];

const TABLE_TARGETS = [6, 12, 24, 36, 60, 120];

export default function HowManyQuailPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="How Many Quail Do I Need?"
        title="How Many Quail Do I Need?"
        lede="Start from the eggs, not the birds. Tell us how many quail eggs your household wants each week and we work backwards to the hens — and the cage — you need."
      />

      <CalcBadge />
      <HowManyQuailCalc />

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
              The maths runs in reverse:{" "}
              <strong>
                hens needed = your weekly egg target ÷ 5 eggs per hen
              </strong>
              , rounded up — you cannot keep 0.4 of a quail, and the spare
              eggs from rounding up cover a hen's off days. Cage space then
              follows the standard <strong>1 sq ft per bird</strong> used
              across this site.
            </p>
            <p>
              Worked example: for 30 eggs a week, 30 ÷ 5 ={" "}
              <strong>6 hens</strong>, needing just 6 sq ft of cage floor.
              That compactness is quail's whole appeal — a laying covey fits
              in a hutch where even two chickens would be crowded. If you plan
              to hatch your own replacements, add one male per 3–5 hens on top
              of the hen count.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/quail-coop-size-calculator">
                Quail coop size
              </Link>
              <Link className="btn" href="/quail-feed-calculator">
                Quail feed
              </Link>
              <Link className="btn" href="/egg-production-calculator">
                Egg production
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
          <CirclePlus size={16} />
          <span>02</span>&nbsp;&nbsp;Reference
        </p>
        <h2 id="table-heading">Quail for common egg targets</h2>
        <p>
          Hens needed at 5 eggs per hen per week, and the cage floor they need
          at 1 sq ft per bird.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Eggs per week</th>
                <th>Quail hens needed</th>
                <th>They will lay</th>
                <th>Cage floor</th>
                <th>Cage floor (m²)</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_TARGETS.map((t) => {
                const r = quailForEggs(t);
                return (
                  <tr key={t}>
                    <td>{t} eggs</td>
                    <td>{r.hens} hens</td>
                    <td>{r.hens * 5} eggs</td>
                    <td>{fmt(r1(r.cageSqft))} sq ft</td>
                    <td>{fmt(r1(sqm(r.cageSqft)))} m²</td>
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
