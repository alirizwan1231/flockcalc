import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import HowManyDucksCalc from "@/components/HowManyDucksCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { ducksForEggs, fmt, r1, sqm } from "@/lib/math";

const tool = toolBySlug("how-many-ducks-do-i-need");
const TITLE = `How Many Ducks Do I Need? — Ducks for Your Egg Target`;
const DESC =
  "Free reverse calculator: enter the duck eggs you want per week to get the duck hens you need, plus the coop and run space that flock requires.";

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
    q: "How many eggs does a duck lay per week?",
    a: "About 4 eggs a week averaged across the laying season for a typical laying duck. Purpose-bred layers such as Khaki Campbells and Welsh Harlequins can do better in their prime years, while many breeds pause in midwinter — the average used here sits honestly between those poles.",
  },
  {
    q: "How many ducks do I need for a dozen eggs a week?",
    a: "Three duck hens: 12 ÷ 4 = 3 exactly. Most people keep at least 3–4 ducks anyway, because ducks are strongly social birds and a pair is an unhappy minimum if one is lost.",
  },
  {
    q: "Do ducks lay year-round like chickens can?",
    a: "Many duck breeds are more seasonal than production chickens, laying strongly from late winter through summer and easing off in the darkest months. Some laying strains, especially Campbells, keep going well into autumn. Plan your flock size on the 4-a-week average and treat winter eggs as a bonus.",
  },
  {
    q: "Do I need a drake for duck eggs?",
    a: "No — females lay unfertilised eggs without a drake, and a drake adds nothing but fertilisation (and appetite). Keep one only if you plan to hatch ducklings, at roughly one drake per 4–6 females.",
  },
  {
    q: "Are duck eggs very different from chicken eggs?",
    a: "They are larger, with a bigger, richer yolk and slightly more protein and fat — which is why bakers love them for cakes and sponges. One duck egg replaces one large chicken egg in most recipes. Some people with a chicken-egg allergy tolerate duck eggs, though that is a question for a doctor, not a calculator.",
  },
];

const TABLE_TARGETS = [6, 12, 20, 24, 36, 60];

export default function HowManyDucksPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="How Many Ducks Do I Need?"
        title="How Many Ducks Do I Need?"
        lede="Work backwards from breakfast. Enter the duck eggs your household wants each week and get the flock size — plus the coop and run those ducks will need."
      />

      <CalcBadge />
      <HowManyDucksCalc />

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
              The calculation reverses the laying rate:{" "}
              <strong>
                ducks needed = weekly egg target ÷ 4 eggs per duck
              </strong>
              , rounded up. Housing then follows the standard duck figures —
              <strong>4 sq ft of coop</strong> and <strong>at least 10 sq ft
              of run per duck</strong> — the same rates as the duck coop
              calculator, where you can re-plan with the kinder 15 sq ft run.
            </p>
            <p>
              Worked example: 20 eggs a week ÷ 4 = <strong>5 duck hens</strong>,
              needing 20 sq ft of coop and at least 50 sq ft of run. That is
              a modest footprint for two dozen rich eggs a week at peak — the
              real space cost with ducks is not the coop, it is the splash
              zone around their water.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/duck-coop-size-calculator">
                Duck coop size
              </Link>
              <Link className="btn" href="/egg-production-calculator">
                Egg production
              </Link>
              <Link className="btn" href="/chicken-coop-size-calculator">
                Chicken coop size
              </Link>
              <Link className="btn" href="/how-many-quail-do-i-need">
                How many quail
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
        <h2 id="table-heading">Ducks for common egg targets</h2>
        <p>
          Duck hens needed at 4 eggs per duck per week, and the housing that
          flock needs.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Eggs per week</th>
                <th>Duck hens needed</th>
                <th>They will lay</th>
                <th>Coop (4 sq ft/duck)</th>
                <th>Run, min (10 sq ft/duck)</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_TARGETS.map((t) => {
                const r = ducksForEggs(t);
                return (
                  <tr key={t}>
                    <td>{t} eggs</td>
                    <td>{r.ducks} ducks</td>
                    <td>{r.ducks * 4} eggs</td>
                    <td>
                      {fmt(r1(r.coopSqft))} sq ft ({fmt(r1(sqm(r.coopSqft)))} m²)
                    </td>
                    <td>
                      {fmt(r1(r.runSqft))} sq ft ({fmt(r1(sqm(r.runSqft)))} m²)
                    </td>
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
