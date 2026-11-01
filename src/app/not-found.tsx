import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CirclePlus } from "lucide-react";
import PageHead from "@/components/PageHead";
import { site, tools } from "@/lib/site";

export const metadata: Metadata = {
  title: `Page Not Found | ${site.name}`,
  description:
    "That page has wandered off. Head back to the free FlockCalc calculators for chickens, quail and ducks.",
  robots: { index: false, follow: true },
};

/** Kicker word per tool for the recovery cards. */
const KICKERS: Record<string, string> = {
  "quail-coop-size-calculator": "Quail",
  "how-many-chickens-do-i-need": "Chickens",
  "cost-per-egg-calculator": "Egg costs",
  "duck-coop-size-calculator": "Ducks",
  "chicken-coop-size-calculator": "Chickens",
  "egg-production-calculator": "Egg production",
  "chicken-feed-calculator": "Feed",
  "how-many-quail-do-i-need": "Quail",
  "chicken-run-size-calculator": "Chickens",
  "hatch-date-calculator": "Hatching",
  "nesting-box-calculator": "Coop kit",
  "how-many-ducks-do-i-need": "Ducks",
  "quail-feed-calculator": "Quail feed",
  "brooder-planner": "Chicks",
};

export default function NotFound() {
  return (
    <div className="wrap">
      <PageHead
        crumb="404 — Page not found"
        title="This page wandered off"
        lede="The link may be old, or the page may have moved. Either way, the calculators are all still here — pick the one you need."
      />

      <div className="btn-row" style={{ justifyContent: "center" }}>
        <Link className="btn btn-primary has-arrow" href="/">
          Back to the calculators
          <span className="btn-arrow" aria-hidden="true">
            <ArrowUpRight size={17} />
          </span>
        </Link>
      </div>

      <section className="section-block" aria-labelledby="nf-tools-heading">
        <p className="kicker" aria-hidden="true">
          <CirclePlus size={16} />
          <span>All</span>&nbsp;&nbsp;The tools
        </p>
        <h2 id="nf-tools-heading">All 14 calculators</h2>
        <div className="related-grid">
          {tools.map((t) => (
            <Link key={t.slug} href={t.path} className="related-card">
              <span className="bento-kicker">{KICKERS[t.slug]}</span>
              <span className="related-name">{t.name}</span>
              <span className="related-blurb">{t.blurb}</span>
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
    </div>
  );
}
