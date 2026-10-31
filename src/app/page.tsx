import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import { site, tools } from "@/lib/site";
import { faqSchema, websiteSchema, type Faq } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${site.name} — Free Backyard Chicken, Quail & Duck Calculators`,
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Free Backyard Chicken, Quail & Duck Calculators`,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: `${site.name} — Free Backyard Chicken, Quail & Duck Calculators`,
    description: site.description,
  },
};

const faqs: Faq[] = [
  {
    q: "Are these calculators free?",
    a: "Yes — every calculator on FlockCalc is completely free, with no sign-up, no email wall and no limits. Your numbers never leave your browser; each tool runs entirely on the page.",
  },
  {
    q: "Where do the space numbers come from?",
    a: "From mainstream poultry guidance published by university extension services and poultry organisations in the US and UK: roughly 1 sq ft per Coturnix quail, 3.5–4 sq ft of coop space and 10 sq ft of run per standard chicken, and 4 sq ft per duck. Each calculator shows the exact figures it uses so you can check them.",
  },
  {
    q: "Should I build to the minimum or the recommended size?",
    a: "Minimums keep birds legally housed; recommended sizes keep them calm. Crowding is the top cause of feather-pecking, stress and disease in backyard flocks, so if you can afford the space, choose the recommended or roomy option every time.",
  },
  {
    q: "Do the calculators work in metric?",
    a: "Yes. Every area result is shown in both square feet and square metres, and roost lengths in feet and metres, so the tools work wherever you keep birds.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqSchema(faqs)} />
      <div className="hero">
        <div className="wrap">
          <h1>Free calculators for backyard chickens, quail and ducks</h1>
          <p className="lede">
            How big should the coop be? How many hens does your family actually
            need? What does a home-laid egg really cost? Answer all three in
            under a minute — no sign-up, no fluff, just the numbers extension
            services recommend.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/quail-coop-size-calculator">
              Start with the quail coop calculator
            </Link>
            <Link
              className="btn btn-secondary"
              href="/how-many-chickens-do-i-need"
            >
              How many chickens do I need?
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap">
        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading">All five calculators</h2>
          <div className="tool-grid">
            {tools.map((t) => (
              <Link key={t.slug} href={t.path} className="tool-card">
                <h3>{t.name}</h3>
                <p>{t.blurb}</p>
                <span className="card-cta">Open the {t.shortName.toLowerCase()} calculator →</span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="trust-heading">
          <h2 id="trust-heading">How our numbers work</h2>
          <div className="trust-box">
            <p>
              Every figure on this site comes from published poultry-keeping
              guidance — the same space allowances taught by university
              extension services (such as the poultry programmes at US
              land-grant universities and extension.org) and UK poultry welfare
              organisations. In short:
            </p>
            <ul className="tight">
              <li>
                <strong>Quail:</strong> about 1 sq ft of floor space per Coturnix
                bird (0.75 sq ft absolute minimum, 1.25 sq ft roomy).
              </li>
              <li>
                <strong>Chickens:</strong> 3.5–4 sq ft of coop and 10 sq ft of
                run per standard bird, 10 inches of roost each, one nesting box
                per four hens.
              </li>
              <li>
                <strong>Ducks:</strong> 4 sq ft of coop and 10–15 sq ft of run
                per standard duck, ground-level nesting, no roosts.
              </li>
              <li>
                <strong>Feed:</strong> a laying hen eats roughly 0.25 lb of feed
                a day — about 7.5 lb a month — the standard planning figure
                used by feed companies and extension guides.
              </li>
            </ul>
            <p style={{ marginBottom: 0 }}>
              Rules and minimums vary by country and council, and these tools
              give planning guidance, not legal advice. When a range exists, we
              show it honestly and let you choose.
            </p>
          </div>
        </section>

        <FaqSection faqs={faqs} />
      </div>
    </>
  );
}
