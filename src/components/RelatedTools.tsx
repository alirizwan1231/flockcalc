import Link from "next/link";
import { tools } from "@/lib/site";

export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const others = tools.filter((t) => t.slug !== currentSlug);
  return (
    <section aria-labelledby="related-heading" className="no-print">
      <h2 id="related-heading">Related calculators</h2>
      <div className="tool-grid">
        {others.map((t) => (
          <Link key={t.slug} href={t.path} className="tool-card">
            <h3>{t.name}</h3>
            <p>{t.blurb}</p>
            <span className="card-cta">Open calculator →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
