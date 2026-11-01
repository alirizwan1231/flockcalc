import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import NestingCalc from "@/components/NestingCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { fmt, nestingAndRoost, r1 } from "@/lib/math";

const tool = toolBySlug("nesting-box-calculator");
const TITLE = `Nesting Box Calculator — Boxes & Roost Space Per Hen`;
const DESC =
  "Free nesting box and roost calculator: nesting boxes at 1 per 4 hens and total roost length at 10 inches per bird, sized for your flock in feet and metres.";

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
    q: "How many nesting boxes do I need per chicken?",
    a: "One box per four hens is the standard allowance, with a minimum of one box even for a tiny flock. Hens share happily and lay mostly in the morning, so 12 hens genuinely need only 3 boxes — adding more mostly gives you more empty boxes while the flock queues for a favourite.",
  },
  {
    q: "How big should a nesting box be?",
    a: "About 12 × 12 × 12 inches (30 cm cube) suits most standard breeds; go a couple of inches larger for heavy breeds like Orpingtons. Bigger is not better — an oversized box invites two hens to squeeze in together, which is how eggs get broken.",
  },
  {
    q: "How much roost space does a chicken need?",
    a: "Plan 10 inches (25 cm) of roost bar per standard bird — 8 inches is the tight minimum and bantams need a little less. In summer hens spread out and use every inch; in winter they huddle and use half of it, but size for summer so nobody gets pushed off the end.",
  },
  {
    q: "Should roosts be higher than the nesting boxes?",
    a: "Yes. Chickens instinctively sleep at the highest comfortable point, so if the boxes are higher than the roosts, hens will sleep in the boxes — and dirty them overnight. Put roosts above box height and both problems disappear.",
  },
  {
    q: "What is the best shape for a roost bar?",
    a: "A wide, flat-ish perch suits chicken feet best — a 2×4 laid flat (wide side up) or a rounded-corner plank about 2–4 inches wide lets them sit with toes flat and covered by feathers in winter, which prevents frostbitten toes. Thin round poles are the least comfortable option.",
  },
];

const TABLE_HENS = [4, 6, 8, 10, 12, 16, 20, 24, 30];

export default function NestingBoxPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Nesting Box & Roost Calculator"
        title="Nesting Box & Roost Calculator"
        lede="The two fittings every coop needs, sized in seconds: nesting boxes at one per four hens, and the full roost length your flock will claim every night."
      />

      <CalcBadge />
      <NestingCalc />

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
              Two standard allowances do all the work:{" "}
              <strong>nesting boxes = hens ÷ 4</strong> (rounded up, minimum
              one), and <strong>roost length = hens × 10 inches</strong>. A
              row of boxes takes about a foot of wall per box, since each box
              is roughly 12 inches wide.
            </p>
            <p>
              Worked example: 12 hens need <strong>3 nesting boxes</strong>{" "}
              and <strong>10 ft of roost</strong> (120 inches, about 3.05 m) —
              usually built as two 5 ft bars or one long bar with a mid
              support. If your coop plan gives you only 8 ft of roost wall,
              the maths is telling you the coop honestly fits about 9–10 hens
              at roosting time, whatever the floor area says.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/chicken-coop-size-calculator">
                Chicken coop size
              </Link>
              <Link className="btn" href="/chicken-run-size-calculator">
                Chicken run size
              </Link>
              <Link className="btn" href="/how-many-chickens-do-i-need">
                How many chickens
              </Link>
              <Link className="btn" href="/duck-coop-size-calculator">
                Duck coop size
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
        <h2 id="table-heading">Nesting boxes & roost by flock size</h2>
        <p>
          For common flock sizes — boxes at 1 per 4 hens, roost at 10 inches
          per bird.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Hens</th>
                <th>Nesting boxes</th>
                <th>Roost length</th>
                <th>Roost (m)</th>
                <th>Box row width</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_HENS.map((h) => {
                const r = nestingAndRoost(h);
                return (
                  <tr key={h}>
                    <td>{h} hens</td>
                    <td>
                      {r.boxes} {r.boxes === 1 ? "box" : "boxes"}
                    </td>
                    <td>{fmt(r1(r.roostFeet))} ft</td>
                    <td>{fmt(r1(r.roostMeters))} m</td>
                    <td>about {fmt(r1(r.boxes))} ft</td>
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
