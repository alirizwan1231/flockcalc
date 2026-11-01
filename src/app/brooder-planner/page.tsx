import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import BrooderCalc from "@/components/BrooderCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { BROODER_HEAT, brooderSpace, fmt, r1 } from "@/lib/math";

const tool = toolBySlug("brooder-planner");
const TITLE = `Brooder Size Calculator — Space & Heat Planner`;
const DESC =
  "Free brooder size calculator: floor space per week for chicken and quail chicks from hatch to week 6, plus the heat-lamp temperature schedule.";

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
    q: "How much brooder space do chicks need?",
    a: "Chicken chicks need about 0.5 sq ft each in week 1, growing to 1 sq ft each by weeks 4–6. Quail chicks need about half that: 0.25 sq ft rising to 0.5 sq ft. Too little space shows up fast as feather-pecking, uneven growth and a brooder that gets dirty faster than you can clean it.",
  },
  {
    q: "What temperature should a brooder be?",
    a: "Start at 95 °F (35 °C) measured at chick height under the lamp for week 1, then drop about 5 °F each week: 90, 85, 80, 75 and 70 °F by week 6, by which point feathered chicks handle normal room temperature. Heat only part of the brooder so chicks can move away to cool down.",
  },
  {
    q: "How do I tell if chicks are too hot or too cold?",
    a: "Watch the birds, not just the thermometer. Chicks huddled in a pile directly under the lamp are cold; chicks pressed against the far edges, panting, are too hot. Evenly spread chicks that wander, eat and sleep in loose groups are at the right temperature.",
  },
  {
    q: "When can chicks leave the brooder?",
    a: "When they are fully feathered — around 6 weeks for most chicken breeds — and night temperatures are not far below what they have been weaned to (about 70 °F). Quail chicks feather faster and are usually ready at 4–5 weeks, going straight into their adult cage setup.",
  },
  {
    q: "What makes a good brooder box?",
    a: "Draft-free walls about 18 inches high, a non-slip floor (paper towels over bedding for the first days so chicks find food, not shavings), and no square corners in small pens — corners are where chicks pile and smother. A big plastic tote, a stock tank or a cardboard appliance box all work if the size is right.",
  },
];

const CHICKEN_PLAN = brooderSpace(1, "chicken");
const QUAIL_PLAN = brooderSpace(1, "quail");

export default function BrooderPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Brooder Size Calculator"
        title="Brooder Size Calculator"
        lede="Chicks double in size while you watch. Enter your chick count for the brooder floor area week by week — plus the heat schedule that goes with it."
      />

      <CalcBadge />
      <BrooderCalc />

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
              Brooder space is a moving target, so the calculator plans it
              week by week: <strong>chicken chicks start at 0.5 sq ft
              each</strong> and grow to <strong>1 sq ft by weeks 4–6</strong>;
              quail chicks start at 0.25 sq ft and grow to 0.5. Multiply by
              your chick count for each week's total, and plan your box —
              or your upgrade path — around the final figure.
            </p>
            <p>
              Worked example: 6 chicken chicks need 3 sq ft in week 1 (a
              large tote is fine) but <strong>6 sq ft by week 6</strong> —
              a 2 × 3 ft floor. Heat drops in step beside them: 95 °F the
              first week, down 5 °F a week until the lamp is off and the
              fully-feathered youngsters are ready for the coop. Hatched your
              own? Work backwards with the hatch date calculator before the
              eggs even go in.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/hatch-date-calculator">
                Hatch date
              </Link>
              <Link className="btn" href="/chicken-feed-calculator">
                Chicken feed
              </Link>
              <Link className="btn" href="/how-many-chickens-do-i-need">
                How many chickens
              </Link>
              <Link className="btn" href="/quail-coop-size-calculator">
                Quail coop size
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
        <h2 id="table-heading">Brooder temperature schedule</h2>
        <p>
          Temperature at chick height under the heat source. Reduce by about
          5 °F (3 °C) a week — and always let the chicks' behaviour overrule
          the chart.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Week</th>
                <th>Temperature</th>
                <th>Temperature (°C)</th>
                <th>Chicken space / chick</th>
                <th>Quail space / chick</th>
              </tr>
            </thead>
            <tbody>
              {BROODER_HEAT.map((h, i) => (
                <tr key={h.week}>
                  <td>Week {h.week}</td>
                  <td>{h.f} °F</td>
                  <td>{h.c} °C</td>
                  <td>{fmt(CHICKEN_PLAN.weeks[i].perBird)} sq ft</td>
                  <td>{fmt(QUAIL_PLAN.weeks[i].perBird)} sq ft</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">
          After week 6, fully feathered chicks at 70 °F (21 °C) are ready to
          move out — see the coop calculators for the space they graduate
          into. Quail chicks typically move to adult housing a week earlier,
          at 4–5 weeks.
        </p>
      </section>

      <FaqSection faqs={faqs} index="03" />
      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
