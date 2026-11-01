import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import ChickenRunCalc from "@/components/ChickenRunCalc";
import { CalcBadge } from "@/components/CalcChrome";
import FaqSection from "@/components/FaqSection";
import PageHead from "@/components/PageHead";
import RelatedTools from "@/components/RelatedTools";
import { ogImage, site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { fmt, r1, runShapes, sqm } from "@/lib/math";

const tool = toolBySlug("chicken-run-size-calculator");
const TITLE = `Chicken Run Size Calculator — Run Area & Fencing Needed`;
const DESC =
  "Free chicken run size calculator: total run area by flock size and breed, buildable square and rectangle dimensions, and fencing length for the pen.";

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
    q: "How big should a chicken run be per chicken?",
    a: "The standard planning figure is 10 sq ft of run per standard hen, 6 sq ft per bantam and 12 sq ft per large breed. That is a floor, not a target: runs are where chickens spend the day, and more space means the ground survives, parasites build up more slowly and the birds stay calmer.",
  },
  {
    q: "Is 8 sq ft per chicken enough for a run?",
    a: "It can work for birds that also free-range part of the day, but a permanently stocked run at 8 sq ft per standard hen usually goes bare and muddy fast. If the run is their whole outdoor world, 10 sq ft is the honest minimum and 15+ is noticeably easier to manage.",
  },
  {
    q: "How much fencing do I need for a chicken run?",
    a: "It depends on shape: for the same area, a square has the shortest perimeter and a long thin rectangle the longest. For a 2:1 rectangle — a common side-yard shape — the fencing is six times the short side. The calculator gives the exact perimeter for the 2:1 layout; add a little for gates and corner overlaps.",
  },
  {
    q: "Does the coop count toward run space?",
    a: "No. Run space is outdoor scratching and exercise area, counted separately from the coop floor. If the coop sits inside the run's footprint on legs, the shaded area underneath it is bonus space the hens will use, but don't count it toward either total when planning.",
  },
  {
    q: "What height should run fencing be?",
    a: "Most laying breeds are content behind 4–6 ft of mesh — lighter, flightier breeds may clear 6 ft unless a wing is clipped or the run is covered. Height matters less than security: a buried or skirted bottom edge keeps diggers out, and a roof or net keeps climbers and hawks out.",
  },
];

const TABLE_BIRDS = [4, 6, 8, 10, 12, 20];

export default function ChickenRunPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <PageHead
        crumb="Chicken Run Size Calculator"
        title="Chicken Run Size Calculator"
        lede="The run is your flock's living room. Enter your bird count and breed size for the total area, three buildable layouts, and the fencing length for the most popular shape."
      />

      <CalcBadge />
      <ChickenRunCalc />

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
              Area first: <strong>birds × sq ft per bird = run area</strong>,
              using the extension-guidance rates — bantam 6, standard 10,
              large 12 sq ft. Dimensions then come from the square root of
              the area: a square's side is √area, a 2:1 rectangle's short side
              is √(area ÷ 2), and a 3:1's is √(area ÷ 3). Fencing is the full
              perimeter of the 2:1 layout.
            </p>
            <p>
              Worked example: 8 standard hens need <strong>80 sq ft</strong> of
              run — a square about 8.9 × 8.9 ft, a 2:1 rectangle of about
              12.6 × 6.3 ft needing roughly 38 ft of fencing, or a long
              16.4 × 5.5 ft side-yard strip. Round every measurement up when
              you build; nobody's hens ever complained about the extra inches.
            </p>
            <div className="btn-row">
              <Link className="btn" href="/chicken-coop-size-calculator">
                Chicken coop size
              </Link>
              <Link className="btn" href="/nesting-box-calculator">
                Nesting boxes & roost
              </Link>
              <Link className="btn" href="/duck-coop-size-calculator">
                Duck coop size
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
        <h2 id="table-heading">Chicken run size chart (standard breeds)</h2>
        <p>
          Run area at 10 sq ft per standard hen, with the 2:1 rectangle —
          the most common garden layout — worked out for each flock size.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Chickens</th>
                <th>Run area</th>
                <th>Run area (m²)</th>
                <th>Square run</th>
                <th>2:1 rectangle</th>
                <th>Fencing (2:1)</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_BIRDS.map((b) => {
                const area = b * 10;
                const s = runShapes(area);
                return (
                  <tr key={b}>
                    <td>{b} chickens</td>
                    <td>{fmt(r1(area))} sq ft</td>
                    <td>{fmt(r1(sqm(area)))} m²</td>
                    <td>
                      {fmt(r1(s.square.l))} × {fmt(r1(s.square.w))} ft
                    </td>
                    <td>
                      {fmt(r1(s.rect2.l))} × {fmt(r1(s.rect2.w))} ft
                    </td>
                    <td>about {fmt(r1(s.fencingFt))} ft</td>
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
