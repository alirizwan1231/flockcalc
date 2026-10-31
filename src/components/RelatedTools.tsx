import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { tools } from "@/lib/site";

/** Numbered index list of the other calculators — same device as the home hero. */
export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const others = tools.filter((t) => t.slug !== currentSlug);
  return (
    <section
      className="section-block no-print"
      aria-labelledby="related-heading"
    >
      <p className="kicker" aria-hidden="true">
        <span className="kicker-num">04</span> Keep planning
      </p>
      <h2 id="related-heading">Related calculators</h2>
      <div className="tool-index">
        {others.map((t) => {
          const n = tools.findIndex((x) => x.slug === t.slug) + 1;
          return (
            <Link key={t.slug} href={t.path} className="index-row">
              <span className="index-num" aria-hidden="true">
                {String(n).padStart(2, "0")}
              </span>
              <span>
                <span className="index-name">{t.name}</span>
                <span className="index-sub">{t.blurb}</span>
              </span>
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
