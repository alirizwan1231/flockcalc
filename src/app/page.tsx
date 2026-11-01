import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CirclePlus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import QuickCoopCalc from "@/components/QuickCoopCalc";
import { TOOL_KICKERS } from "@/components/RelatedTools";
import { ogImage, site, tools } from "@/lib/site";
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
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Free Backyard Chicken, Quail & Duck Calculators`,
    description: site.description,
    images: [ogImage.url],
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

/** Kicker word + one-line blurb + wide/narrow span per bento card. */
const CARDS: Record<
  string,
  { kicker: string; blurb: string; wide?: boolean }
> = {
  "quail-coop-size-calculator": {
    kicker: "Quail",
    blurb: "Floor space for Coturnix quail — plus how many fit in your cage.",
    wide: true,
  },
  "how-many-chickens-do-i-need": {
    kicker: "Chickens",
    blurb: "Eggs your household eats → hens you actually need, buffer included.",
    wide: true,
  },
  "cost-per-egg-calculator": {
    kicker: "Egg costs",
    blurb: "Your real cost per egg and per dozen, feed counted.",
  },
  "duck-coop-size-calculator": {
    kicker: "Ducks",
    blurb: "Coop and run space for ducks — no roosts, splash zones planned.",
  },
  "chicken-coop-size-calculator": {
    kicker: "Chickens",
    blurb: "Coop, run, roost and boxes for bantam to large breeds.",
  },
};

/** Small visual element per card (bars / sparkline / stat). */
function CardVisual({ slug }: { slug: string }) {
  if (slug === "quail-coop-size-calculator") {
    return (
      <div className="mini-bars" aria-hidden="true">
        <div className="mini-bar-row">
          <span>Minimum</span>
          <span className="mini-bar-track">
            <span className="mini-bar-fill" style={{ display: "block", width: "60%" }} />
          </span>
        </div>
        <div className="mini-bar-row hl">
          <span>Standard</span>
          <span className="mini-bar-track">
            <span className="mini-bar-fill" style={{ display: "block", width: "80%" }} />
          </span>
        </div>
        <div className="mini-bar-row">
          <span>Roomy</span>
          <span className="mini-bar-track">
            <span className="mini-bar-fill" style={{ display: "block", width: "100%" }} />
          </span>
        </div>
      </div>
    );
  }
  if (slug === "cost-per-egg-calculator") {
    return (
      <svg
        viewBox="0 0 220 56"
        width="100%"
        height="56"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <polyline
          points="0,44 30,38 60,42 90,28 120,32 150,18 180,22 205,10"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="205" cy="10" r="6" fill="#4be07f" stroke="#16102e" strokeWidth="2" />
      </svg>
    );
  }
  if (slug === "chicken-coop-size-calculator") {
    return (
      <div className="mini-bars" aria-hidden="true">
        <div className="mini-bar-row">
          <span>Coop</span>
          <span className="mini-bar-track">
            <span className="mini-bar-fill" style={{ display: "block", width: "35%" }} />
          </span>
        </div>
        <div className="mini-bar-row hl">
          <span>Run</span>
          <span className="mini-bar-track">
            <span className="mini-bar-fill" style={{ display: "block", width: "100%" }} />
          </span>
        </div>
      </div>
    );
  }
  if (slug === "how-many-chickens-do-i-need") {
    return (
      <span className="bento-stat" aria-hidden="true">
        +1<small> buffer hen, always</small>
      </span>
    );
  }
  return (
    <span className="bento-stat" aria-hidden="true">
      4<small> sq ft per duck</small>
    </span>
  );
}

/** One-line description per tool for the all-calculators grid. */
const SHORT_LINES: Record<string, string> = {
  "quail-coop-size-calculator":
    "Floor space for Coturnix quail — and how many fit your cage.",
  "how-many-chickens-do-i-need":
    "Eggs you eat → hens you need, buffer included.",
  "cost-per-egg-calculator": "Your real cost per egg and per dozen, feed counted.",
  "duck-coop-size-calculator":
    "Coop and run for ducks — no roosts, splash zones planned.",
  "chicken-coop-size-calculator":
    "Coop, run, roost and boxes for bantam to large breeds.",
  "egg-production-calculator":
    "Eggs per week, month and year from your flock's laying rate.",
  "chicken-feed-calculator":
    "Daily and monthly feed amounts, bags and cost for your flock.",
  "how-many-quail-do-i-need": "Eggs you want → quail hens and cage space you need.",
  "chicken-run-size-calculator":
    "Run area, buildable dimensions and fencing length.",
  "hatch-date-calculator": "Hatch day, lockdown and candling dates for five species.",
  "nesting-box-calculator": "Boxes at 1 per 4 hens, roost at 10 inches per bird.",
  "how-many-ducks-do-i-need": "Eggs you want → duck hens, coop and run you need.",
  "quail-feed-calculator": "Quail feed per day and month, in grams and pounds.",
  "brooder-planner": "Brooder space week by week, plus the heat schedule.",
};

/** Space rates straight from lib/math.ts + the calculators (planning figures). */
const RATES = [
  { bird: "Chicken (standard)", coop: "3.5 sq ft", run: "10 sq ft", feed: "0.25 lb/day" },
  { bird: "Chicken (bantam)", coop: "2 sq ft", run: "6 sq ft", feed: "—" },
  { bird: "Duck (standard)", coop: "4 sq ft", run: "10–15 sq ft", feed: "—" },
  { bird: "Quail (Coturnix)", coop: "1 sq ft", run: "Not needed", feed: "—" },
];

const STEPS = [
  {
    n: "01",
    title: "Enter your birds",
    text: "How many birds, and what size — bantam, standard or large. Ten seconds, no account, nothing leaves your browser.",
  },
  {
    n: "02",
    title: "Get your sizes",
    text: "Coop and run area, roost length, nesting boxes — in square feet and square metres, updating as you type.",
  },
  {
    n: "03",
    title: "Build with confidence",
    text: "Copy or print the numbers for your build or shopping list, sized to the figures extension services recommend.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqSchema(faqs)} />
      <div className="wrap">
        <div className="hero">
          <div className="hero-grid">
            {/* Left: dark panel with the working quick calculator */}
            <div className="hero-dark">
              <div className="hero-tags" aria-hidden="true">
                <span className="tag-pill">Free</span>
                <span className="tag-pill">No sign-up</span>
                <span className="tag-pill">Instant</span>
              </div>
              <QuickCoopCalc />
            </div>

            {/* Right: white intro panel */}
            <div className="hero-panel">
              <p className="kicker">
                <CirclePlus size={16} aria-hidden="true" />
                Small flock calculators
              </p>
              <h1>Free calculators for backyard chickens, quail and ducks</h1>
              <p className="lede">
                How big should the coop be? How many hens do you actually need?
                What does a home-laid egg really cost? Get the answers in
                seconds — straight from extension-service numbers.
              </p>
              <div className="btn-row">
                <Link
                  className="btn btn-primary has-arrow"
                  href="/quail-coop-size-calculator"
                >
                  Start calculating
                  <span className="btn-arrow" aria-hidden="true">
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
                <Link className="btn" href="#calculators">
                  See all calculators
                </Link>
              </div>
              <div className="hero-strip">
                <div className="hero-strip-inner">
                  <span>
                    <strong>14 free calculators</strong>
                  </span>
                  <span className="dot" aria-hidden="true">·</span>
                  <span>Quail</span>
                  <span className="dot" aria-hidden="true">·</span>
                  <span>Chickens</span>
                  <span className="dot" aria-hidden="true">·</span>
                  <span>Ducks</span>
                  <span className="dot" aria-hidden="true">·</span>
                  <span>Eggs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          className="section-block"
          id="calculators"
          aria-label="All calculators"
        >
          <div className="section-head">
            <p className="kicker">
              <CirclePlus size={16} aria-hidden="true" />
              The calculators
            </p>
            <h2>Pick your calculator</h2>
            <p className="lede">
              Fourteen tools, one job — the right space for your birds, the
              true cost of your eggs, and a hatch you can plan to the day. The
              five most-used, first:
            </p>
          </div>
          <div className="bento">
            {tools.slice(0, 5).map((t) => {
              const card = CARDS[t.slug];
              return (
                <Link
                  key={t.slug}
                  href={t.path}
                  className={`bento-card${card.wide ? " wide" : ""}`}
                >
                  <span className="bento-kicker">{card.kicker}</span>
                  <span className="bento-name">{t.name}</span>
                  <p>{card.blurb}</p>
                  <span className="bento-visual">
                    <CardVisual slug={t.slug} />
                  </span>
                  <span className="bento-foot">
                    <span className="bento-pill">
                      Calculate
                      <span className="btn-arrow sm" aria-hidden="true">
                        <ArrowUpRight size={15} />
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
            <div className="bento-card">
              <span className="bento-kicker">Privacy</span>
              <span className="bento-name">No sign-up. Ever.</span>
              <p>
                Every calculator runs entirely in your browser. Nothing you
                type is sent anywhere, stored, or tracked.
              </p>
              <span className="bento-visual">
                <span className="bento-stat" aria-hidden="true">
                  0<small> data collected</small>
                </span>
              </span>
              <span className="bento-foot">
                <span className="bento-pill">
                  Try one
                  <span className="btn-arrow sm" aria-hidden="true">
                    <ArrowUpRight size={15} />
                  </span>
                </span>
              </span>
            </div>
          </div>
        </section>

        <section
          className="section-block"
          aria-labelledby="all-calcs-heading"
        >
          <div className="section-head">
            <p className="kicker">
              <CirclePlus size={16} aria-hidden="true" />
              All the calculators
            </p>
            <h2 id="all-calcs-heading">Every tool, one page</h2>
            <p className="lede">
              Housing, feed, eggs and hatching — the complete set of fourteen,
              all free and all instant.
            </p>
          </div>
          <div className="tool-grid">
            {tools.map((t) => (
              <Link key={t.slug} href={t.path} className="tool-chip-card">
                <span className="bento-kicker">{TOOL_KICKERS[t.slug]}</span>
                <span className="tool-chip-name">{t.name}</span>
                <p className="tool-chip-line">{SHORT_LINES[t.slug]}</p>
                <span className="bento-foot">
                  <span className="bento-pill">
                    Calculate
                    <span className="btn-arrow sm" aria-hidden="true">
                      <ArrowUpRight size={15} />
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="section-block"
          id="rates"
          aria-labelledby="rates-heading"
        >
          <div className="section-head">
            <p className="kicker">
              <CirclePlus size={16} aria-hidden="true" />
              Space rates
            </p>
            <h2 id="rates-heading">Rates at a glance</h2>
            <p className="lede">
              The planning figures every calculator on this site uses — per
              bird, no surprises.
            </p>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Bird</th>
                  <th>Coop per bird</th>
                  <th>Run per bird</th>
                  <th>Feed per day</th>
                </tr>
              </thead>
              <tbody>
                {RATES.map((r) => (
                  <tr key={r.bird}>
                    <td>{r.bird}</td>
                    <td>{r.coop}</td>
                    <td>{r.run}</td>
                    <td>{r.feed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-note" style={{ textAlign: "center" }}>
            Feed figure is for a laying hen — the standard planning rate of
            about 0.25 lb a day (7.5 lb a month).
          </p>
        </section>

        <section
          className="section-block"
          aria-labelledby="steps-heading"
        >
          <div className="section-head">
            <p className="kicker">
              <CirclePlus size={16} aria-hidden="true" />
              How it works
            </p>
            <h2 id="steps-heading">Three steps. Sixty seconds.</h2>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step-card" key={s.n}>
                <span className="step-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
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
                <CirclePlus size={16} />
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

        <section className="section-block" aria-labelledby="cta-heading">
          <div className="cta-band">
            <p className="kicker">
              <CirclePlus size={16} aria-hidden="true" />
              No sign-up · Free forever
            </p>
            <h2 id="cta-heading">Size it before you build it</h2>
            <p>
              A coop built to the wrong number costs lumber and unhappy birds.
              Sixty seconds with a calculator first is cheaper.
            </p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link
                className="btn btn-primary has-arrow"
                href="/chicken-coop-size-calculator"
              >
                Start calculating
                <span className="btn-arrow" aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
