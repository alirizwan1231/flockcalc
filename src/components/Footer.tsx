import Link from "next/link";
import { ArrowUp, ArrowUpRight, CirclePlus } from "lucide-react";
import EggMark from "./EggMark";
import { site, tools } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer no-print">
      {/* Dark indigo band — three light cards, super.cx style */}
      <div className="footer-band">
        <div className="wrap">
          <div className="footer-cards">
            <div className="footer-card">
              <Link href="/" className="brand" aria-label={`${site.name} home`}>
                <EggMark size={38} />
                <span className="brand-name">
                  Flock<em>Calc</em>
                </span>
              </Link>
              <p>
                Free calculators for backyard chickens, quail and ducks. No
                sign-up, no fluff — just the numbers.
              </p>
              <p className="footer-contact">
                <a href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
              </p>
              <a href="#top" className="back-top">
                Back to top
                <span className="btn-arrow" aria-hidden="true">
                  <ArrowUp size={16} />
                </span>
              </a>
            </div>

            <div className="footer-card">
              <span className="fc-kicker">
                <CirclePlus size={15} aria-hidden="true" />
                All the calculators
              </span>
              <div className="footer-chips">
                {tools.map((t) => (
                  <Link key={t.slug} href={t.path} className="footer-chip">
                    {t.shortName}
                  </Link>
                ))}
              </div>
              <p>
                Fourteen tools, one job: size the housing before you build it,
                and know what your eggs really cost.
              </p>
            </div>

            <div className="footer-card">
              <span className="fc-kicker">
                <CirclePlus size={15} aria-hidden="true" />
                Take the next step
              </span>
              <h3>Ready to plan your flock?</h3>
              <p>
                Start with the coop — everything else follows from the space
                your birds get.
              </p>
              <Link
                href="/chicken-coop-size-calculator"
                className="btn btn-primary has-arrow"
                style={{ marginTop: "auto" }}
              >
                Start calculating
                <span className="btn-arrow" aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Light link columns */}
      <div className="wrap footer-light">
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
          <nav aria-label="Company">
            <p className="footer-head">Company</p>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <a href={`mailto:${site.contactEmail}`}>Email us</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Flock facts">
            <p className="footer-head">Flock facts</p>
            <ul>
              <li>
                <Link href="/#rates">Space rates at a glance</Link>
              </li>
              <li>
                <Link href="/#how-numbers-work">How our numbers work</Link>
              </li>
              <li>
                <Link href="/#faq-heading">Frequently asked questions</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-base">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain} — All
            figures are planning estimates based on published extension
            guidance, not legal advice. Calculators run entirely in your
            browser; nothing you type is stored or sent anywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
