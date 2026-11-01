import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import HensCalc from "@/components/HensCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";

const tool = toolBySlug("how-many-chickens-do-i-need");
const TITLE = `How Many Chickens Do I Need? — Hens Per Household Calculator`;
const DESC =
  "How many chickens do you need for your eggs? Enter weekly egg use and laying rate to get your hens, a buffer hen for moulting season, and their coop space.";

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
    q: "How many chickens do I need for a dozen eggs a week?",
    a: "For 12 eggs a week: 2 heavy layers (at 6 eggs each), 3 average layers (at 5 each), or 3 light/heritage layers (at 4 each). Add one buffer hen and most households should start with 3–4 hens for a reliable dozen a week.",
  },
  {
    q: "How many hens does a family of four need?",
    a: "If each person eats about 5 eggs a week, a family of four needs 20 eggs a week. That is 4 average-laying hens at minimum, and 5 with a buffer hen — the most common starting flock size for a family.",
  },
  {
    q: "How many eggs does one hen lay per week?",
    a: "It depends on breed and age. Heavy-laying hybrids average about 6 eggs a week in their first two years, most dual-purpose backyard breeds about 5, and heritage or ornamental breeds about 4. All hens slow down in winter and during their yearly moult.",
  },
  {
    q: "Do I need a rooster for hens to lay eggs?",
    a: "No. Hens lay eggs whether or not a rooster is present — a rooster is only needed if you want fertile eggs for hatching chicks. Many suburbs and towns allow hens but not roosters, and your egg supply is unaffected.",
  },
  {
    q: "Why does the calculator add a buffer hen?",
    a: "Because laying is not constant. Each hen stops for several weeks a year to moult, may go broody in spring, and lays less in short winter days. One extra hen smooths out those gaps so your household rarely runs out of eggs.",
  },
  {
    q: "When do young hens start laying?",
    a: "Most pullets start laying at 18–24 weeks old, depending on breed and season. If you are raising chicks rather than buying point-of-lay hens, plan for roughly five months before the first egg.",
  },
];

const TABLE: Array<{ eggs: number }> = [10, 20, 30, 40, 50, 60].map((eggs) => ({
  eggs,
}));

export default function HensPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="How Many Chickens Do I Need?"
        title="How Many Chickens Do I Need?"
        lede="Work backwards from breakfast. Tell the calculator how many eggs your household eats each week and how well your chosen breeds lay, and it gives you the flock size — plus the extra buffer hen experienced keepers swear by."
      />

      <CalcBadge />
      <HensCalc />

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
              The formula is:{" "}
              <strong>
                hens needed = your weekly eggs ÷ eggs laid per hen per week
              </strong>
              , rounded up. Laying rates come from typical breed performance used
              in extension poultry guides: hybrid layers around 6 eggs a week,
              standard dual-purpose breeds around 5, and heritage breeds around 4
              in their prime laying years.
            </p>
            <p>
              We then recommend <strong>one buffer hen</strong> on top. Hens pause
              laying while moulting, some go broody and stop for weeks, and
              everyone slows down in winter. The buffer hen is the difference
              between &ldquo;usually enough eggs&rdquo; and &ldquo;eggs every
              week&rdquo;. The coop and run figures shown use the standard
              allowance of 3.5 sq ft of coop and 10 sq ft of run per bird — see
              the{" "}
              <Link href="/chicken-coop-size-calculator">
                chicken coop size calculator
              </Link>{" "}
              to plan the build properly.
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
        <h2 id="table-heading">Hens needed by weekly egg target</h2>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Eggs wanted per week</th>
                <th>Heavy layers (6/wk)</th>
                <th>Average layers (5/wk)</th>
                <th>Light / heritage (4/wk)</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map(({ eggs }) => (
                <tr key={eggs}>
                  <td>{eggs} eggs</td>
                  <td>{Math.ceil(eggs / 6)} hens</td>
                  <td>{Math.ceil(eggs / 5)} hens</td>
                  <td>{Math.ceil(eggs / 4)} hens</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">
          Minimum hens, before the buffer hen. Add 1 to whichever column matches
          your breeds for a flock that keeps laying through moulting season.
        </p>
      </section>

      <FaqSection faqs={faqs} index="03" />
      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
