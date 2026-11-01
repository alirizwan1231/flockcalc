import Link from "next/link";
import { ArrowUpRight, CirclePlus } from "lucide-react";
import { toolBySlug } from "@/lib/site";

/** Kicker word per tool for the related cards. */
export const TOOL_KICKERS: Record<string, string> = {
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

/** Curated sibling pool per tool — the three most useful next steps. */
const RELATED: Record<string, string[]> = {
  "quail-coop-size-calculator": [
    "how-many-quail-do-i-need",
    "quail-feed-calculator",
    "chicken-coop-size-calculator",
  ],
  "how-many-chickens-do-i-need": [
    "egg-production-calculator",
    "chicken-coop-size-calculator",
    "cost-per-egg-calculator",
  ],
  "cost-per-egg-calculator": [
    "egg-production-calculator",
    "chicken-feed-calculator",
    "how-many-chickens-do-i-need",
  ],
  "duck-coop-size-calculator": [
    "how-many-ducks-do-i-need",
    "chicken-coop-size-calculator",
    "quail-coop-size-calculator",
  ],
  "chicken-coop-size-calculator": [
    "chicken-run-size-calculator",
    "nesting-box-calculator",
    "how-many-chickens-do-i-need",
  ],
  "egg-production-calculator": [
    "how-many-chickens-do-i-need",
    "cost-per-egg-calculator",
    "chicken-feed-calculator",
  ],
  "chicken-feed-calculator": [
    "cost-per-egg-calculator",
    "quail-feed-calculator",
    "egg-production-calculator",
  ],
  "how-many-quail-do-i-need": [
    "quail-coop-size-calculator",
    "quail-feed-calculator",
    "egg-production-calculator",
  ],
  "chicken-run-size-calculator": [
    "chicken-coop-size-calculator",
    "nesting-box-calculator",
    "duck-coop-size-calculator",
  ],
  "hatch-date-calculator": [
    "brooder-planner",
    "how-many-chickens-do-i-need",
    "egg-production-calculator",
  ],
  "nesting-box-calculator": [
    "chicken-coop-size-calculator",
    "chicken-run-size-calculator",
    "how-many-chickens-do-i-need",
  ],
  "how-many-ducks-do-i-need": [
    "duck-coop-size-calculator",
    "egg-production-calculator",
    "chicken-coop-size-calculator",
  ],
  "quail-feed-calculator": [
    "chicken-feed-calculator",
    "quail-coop-size-calculator",
    "how-many-quail-do-i-need",
  ],
  "brooder-planner": [
    "hatch-date-calculator",
    "chicken-feed-calculator",
    "how-many-chickens-do-i-need",
  ],
};

/** Row of pill cards linking the sibling calculators. */
export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const slugs = RELATED[currentSlug] ?? [];
  const related = slugs.map((s) => toolBySlug(s));
  return (
    <section className="section-block no-print" aria-labelledby="related-heading">
      <p className="kicker" aria-hidden="true">
        <CirclePlus size={16} />
        <span>04</span>&nbsp;&nbsp;Keep planning
      </p>
      <h2 id="related-heading">Related calculators</h2>
      <div className="related-grid">
        {related.map((t) => (
          <Link key={t.slug} href={t.path} className="related-card">
            <span className="bento-kicker">{TOOL_KICKERS[t.slug]}</span>
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
  );
}
