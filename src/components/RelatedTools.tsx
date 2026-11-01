import Link from "next/link";
import { ArrowUpRight, CirclePlus } from "lucide-react";
import { tools } from "@/lib/site";

/** Kicker word per tool for the related cards. */
const KICKERS: Record<string, string> = {
  "quail-coop-size-calculator": "Quail",
  "how-many-chickens-do-i-need": "Chickens",
  "cost-per-egg-calculator": "Egg costs",
  "duck-coop-size-calculator": "Ducks",
  "chicken-coop-size-calculator": "Chickens",
};

/** Row of pill cards linking the sibling calculators. */
export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const others = tools.filter((t) => t.slug !== currentSlug).slice(0, 3);
  return (
    <section className="section-block no-print" aria-labelledby="related-heading">
      <p className="kicker" aria-hidden="true">
        <CirclePlus size={16} />
        <span>04</span>&nbsp;&nbsp;Keep planning
      </p>
      <h2 id="related-heading">Related calculators</h2>
      <div className="related-grid">
        {others.map((t) => (
          <Link key={t.slug} href={t.path} className="related-card">
            <span className="bento-kicker">{KICKERS[t.slug]}</span>
            <span className="related-name">{t.name}</span>
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
