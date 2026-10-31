import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
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

/** Giant bottom stat per tool for the bento cards (display figures). */
const STATS: Record<string, { big: string; unit?: string }> = {
  "quail-coop-size-calculator": { big: "1", unit: " sq ft per bird" },
  "how-many-chickens-do-i-need": { big: "+1", unit: " buffer hen" },
  "cost-per-egg-calculator": { big: "$0.22", unit: " per egg" },
  "duck-coop-size-calculator": { big: "4", unit: " sq ft per duck" },
  "chicken-coop-size-calculator": { big: "3.5", unit: " sq ft per bird" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqSchema(faqs)} />
      <div className="wrap">
        <div className="hero">
          <p className="kicker">Free calculators — no sign-up</p>
          <div className="hero-grid">
            <h1>Free calculators for backyard chickens, quail and ducks</h1>
            <div className="hero-side">
              <p className="lede">
                How big should the coop be? How many hens does your family actually
                need? What does a home-laid egg really cost? Answer all three in
                under a minute — no sign-up, no fluff, just the numbers extension
                services recommend.
              </p>
              <div className="btn-row">
                <Link className="btn btn-primary" href="/quail-coop-size-calculator">
                  Start with the quail coop calculator
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link className="btn" href="/how-many-chickens-do-i-need">
                  How many chickens do I need?
                </Link>
              </div>
              <ul className="hero-points">
                <li>
                  <Check size={16} strokeWidth={3} aria-hidden="true" />
                  100% free — no sign-up
                </li>
                <li>
                  <Check size={16} strokeWidth={3} aria-hidden="true" />
                  Extension-service numbers
                </li>
                <li>
                  <Check size={16} strokeWidth={3} aria-hidden="true" />
                  Metric &amp; imperial results
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="section-block" aria-label="All calculators">
          <div className="bento">
            {tools.map((t, i) => {
              const stat = STATS[t.slug];
              return (
                <Link
                  key={t.slug}
                  href={t.path}
                  className={`bento-card${i === 0 ? " big" : ""}`}
                >
                  <span className="bento-top">
                    <span className="bento-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </span>
                  <span className="bento-name">{t.name}</span>
                  <p>{t.blurb}</p>
                  <span className="bento-stat" aria-hidden="true">
                    {stat.big}
                    {stat.unit ? <small>{stat.unit}</small> : null}
                  </span>
                </Link>
              );
            })}
            <div className="bento-card">
              <span className="bento-top">
                <span className="bento-num">Note</span>
              </span>
              <span className="bento-name">No sign-up. Ever.</span>
              <p>
                Every calculator runs entirely in your browser. Nothing you
                type is sent anywhere, stored, or tracked — the numbers stay
                on your screen.
              </p>
              <span className="bento-stat" aria-hidden="true">
                0<small> data collected</small>
              </span>
            </div>
          </div>
        </section>

        <section
          className="section-block"
          id="how-numbers-work"
          aria-labelledby="trust-heading"
        >
          <div className="prose-grid">
            <div>
              <p className="kicker" aria-hidden="true">
                <span>01</span>&nbsp;&nbsp;The numbers
              </p>
              <h2 id="trust-heading">How our numbers work</h2>
            </div>
            <div className="body-col">
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
          </div>
        </section>

        <FaqSection faqs={faqs} index="02" />
      </div>
    </>
  );
}
