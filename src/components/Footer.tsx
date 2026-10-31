import Link from "next/link";
import { site, tools } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer no-print">
      <div className="wrap">
        <div className="footer-main">
          <div>
            <p className="footer-brand">{site.name}</p>
            <p className="footer-tag">
              {site.tagline}. Free forever, no sign-up.
            </p>
            <p className="footer-contact">
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </p>
          </div>
          <div className="footer-cols">
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
        </div>
        <div className="footer-base">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}
          </p>
          <p>Calculators run entirely in your browser — nothing is stored.</p>
        </div>
      </div>
    </footer>
  );
}
