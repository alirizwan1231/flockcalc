import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { tools } from "@/lib/site";

/** Giant bottom stat per tool for the bento cards (display figures). */
const STATS: Record<string, { big: string; unit?: string }> = {
  "quail-coop-size-calculator": { big: "1", unit: " sq ft per bird" },
  "how-many-chickens-do-i-need": { big: "+1", unit: " buffer hen" },
  "cost-per-egg-calculator": { big: "$0.22", unit: " per egg" },
  "duck-coop-size-calculator": { big: "4", unit: " sq ft per duck" },
  "chicken-coop-size-calculator": { big: "3.5", unit: " sq ft per bird" },
};

/** Bento grid of the other calculators — same device as the home index. */
export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const others = tools.filter((t) => t.slug !== currentSlug);
  return (
    <section className="section-block no-print" aria-labelledby="related-heading">
      <p className="kicker" aria-hidden="true">
        <span>04</span>&nbsp;&nbsp;Keep planning
      </p>
      <h2 id="related-heading">Related calculators</h2>
      <div className="bento">
        {others.map((t) => {
          const n = tools.findIndex((x) => x.slug === t.slug) + 1;
          const stat = STATS[t.slug];
          return (
            <Link key={t.slug} href={t.path} className="bento-card">
              <span className="bento-top">
                <span className="bento-num">{String(n).padStart(2, "0")}</span>
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
      </div>
    </section>
  );
}
