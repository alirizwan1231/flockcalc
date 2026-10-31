import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import QuailCalc from "@/components/QuailCalc";
import FaqSection from "@/components/FaqSection";
import RelatedTools from "@/components/RelatedTools";
import { site, toolBySlug } from "@/lib/site";
import { breadcrumbSchema, faqSchema, toolSchema, type Faq } from "@/lib/schema";
import { fmt, r1, sqm } from "@/lib/math";

const tool = toolBySlug("quail-coop-size-calculator");
const TITLE = `Quail Coop Size Calculator — How Much Space Do Quail Need? | ${site.name}`;
const DESC =
  "Free quail coop size calculator: floor space for Coturnix quail at 1 sq ft per bird, cage sizes that fit your covey, and a reverse mode — how many quail fit in your cage?";

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
    q: "How much space do quail need per bird?",
    a: "Adult Coturnix (Japanese) quail need about 1 square foot of floor space per bird in a cage or coop. 0.75 sq ft per bird is the tight commercial minimum, and 1.25 sq ft per bird is a comfortable, roomy allowance that reduces pecking and stress.",
  },
  {
    q: "How many quail can I keep in a 2 × 4 ft cage?",
    a: "A 2 × 4 ft cage has 8 sq ft of floor. At the standard 1 sq ft per bird that is 8 quail; at the minimum rate about 10, and at the roomy rate 6. Use the reverse mode in the calculator above for any other cage size.",
  },
  {
    q: "How tall should a quail cage or coop be?",
    a: "Either low or tall — avoid the middle. Quail flush straight upward when startled, so low cages around 12 inches (30 cm) stop them building up speed, while tall aviaries of 6 ft (1.8 m) or more let them fly up and land safely. Ceilings between about 2 and 4 ft are where head injuries happen.",
  },
  {
    q: "Do quail need an outdoor run?",
    a: "No — unlike chickens, quail do well in fully enclosed housing as long as the floor space is right and the cage has good ventilation and light. Many keepers use stacked cages, rabbit-hutch style coops or a floor aviary. If you do give them a run, its floor area counts toward their total space.",
  },
  {
    q: "Does this calculator work for bobwhite or other quail species?",
    a: "The figures are for Coturnix (Japanese) quail, the species most backyard keepers raise for eggs and meat. Bobwhite and other game species are flightier and need noticeably more space and height, so treat these numbers as a floor, not a target, for them.",
  },
];

const TABLE_BIRDS = [6, 12, 18, 24, 36, 48];

export default function QuailPage() {
  return (
    <div className="wrap">
      <JsonLd data={toolSchema(tool)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(tool)} />

      <div className="page-head">
        <p className="breadcrumb">
          <Link href="/">Home</Link> › Quail Coop Size Calculator
        </p>
        <h1>Quail Coop Size Calculator</h1>
        <p className="lede">
          Coturnix quail need about 1 sq ft of floor space per bird. Enter your
          covey size for the exact floor area, cage sizes that fit — or flip it
          around and check how many quail fit in the cage you already own.
        </p>
      </div>

      <QuailCalc />

      <section aria-labelledby="how-heading">
        <h2 id="how-heading">How it works</h2>
        <p>
          The maths is one multiplication:{" "}
          <strong>birds × space per bird = floor space needed</strong>. The
          standard planning figure for adult Coturnix quail is{" "}
          <strong>1 sq ft (about 0.09 m²) per bird</strong> — the allowance
          commonly cited in university extension quail guides, including the
          poultry programmes of US land-grant universities published through
          extension.org. Commercial cage systems run tighter, around 0.75 sq
          ft per bird, which we show as the minimum; 1.25 sq ft per bird is
          the roomy option most backyard keepers are happiest with.
        </p>
        <p>
          Floor space is what matters for quail — they live on the ground and
          do not roost, so perches and vertical space do not count toward the
          total. The one exception is height for safety: keep ceilings either
          low (about 12 inches) or aviary-tall (6 ft+), as explained in the
          calculator above.
        </p>
      </section>

      <section aria-labelledby="table-heading">
        <h2 id="table-heading">Quail coop size chart</h2>
        <p>
          Ready-made floor space for common covey sizes. Standard (1 sq ft per
          bird) is the column most keepers should plan around.
        </p>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th>Quail</th>
                <th>Minimum (0.75 sq ft/bird)</th>
                <th>Standard (1 sq ft/bird)</th>
                <th>Standard in m²</th>
                <th>Roomy (1.25 sq ft/bird)</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_BIRDS.map((b) => (
                <tr key={b}>
                  <td>{b} quail</td>
                  <td>{fmt(r1(b * 0.75))} sq ft</td>
                  <td>{fmt(r1(b * 1))} sq ft</td>
                  <td>{fmt(r1(sqm(b)))} m²</td>
                  <td>{fmt(r1(b * 1.25))} sq ft</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqSection faqs={faqs} />
      <RelatedTools currentSlug={tool.slug} />
    </div>
  );
}
