import Link from "next/link";
import ToolIcon from "./ToolIcon";
import { tools } from "@/lib/site";

export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const others = tools.filter((t) => t.slug !== currentSlug);
  return (
    <section aria-labelledby="related-heading" className="no-print">
      <h2 id="related-heading">Related calculators</h2>
      <div className="tool-grid">
        {others.map((t) => (
          <Link key={t.slug} href={t.path} className="tool-card">
            <span className="tool-icon" aria-hidden="true">
              <ToolIcon slug={t.slug} />
            </span>
            <h3>{t.name}</h3>
            <p>{t.blurb}</p>
            <span className="card-cta">Open calculator →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
