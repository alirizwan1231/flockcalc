import Link from "next/link";
import { Egg } from "lucide-react";
import { site, tools } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer no-print">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">
            <span className="brand-mark brand-mark-sm" aria-hidden="true">
              <Egg size={17} strokeWidth={2.2} />
            </span>
            {site.name}
          </p>
          <p className="footer-tag">{site.tagline}. Free forever, no sign-up.</p>
        </div>
        <nav aria-label="All calculators">
          <p className="footer-head">Calculators</p>
          <ul>
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={t.path}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Site">
          <p className="footer-head">Site</p>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About &amp; how our numbers work</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.domain}
        </p>
      </div>
    </footer>
  );
}
