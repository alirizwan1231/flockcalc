import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import { site, tools } from "@/lib/site";

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: `What ${site.name} is, where its poultry space and feed figures come from, and how to get in touch.`,
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    siteName: site.name,
    title: `About | ${site.name}`,
    description: `What ${site.name} is, where its poultry space and feed figures come from, and how to get in touch.`,
  },
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <PageHead
        crumb="About"
        title={`About ${site.name}`}
        lede="FlockCalc is a small, free collection of calculators for backyard poultry keepers — the quick flock maths you would otherwise do on the back of a feed bag."
      />

      <section className="info-card" aria-labelledby="about-tools-heading">
        <div className="prose-grid">
          <div>
            <p className="kicker" aria-hidden="true">
              <span>01</span>&nbsp;&nbsp;The tools
            </p>
            <h2 id="about-tools-heading">What the site does</h2>
          </div>
          <div className="body-col">
            <p>
              Planning a flock means answering the same handful of questions over
              and over: how much space, how many birds, what will the eggs cost.
              Each calculator here answers one of those questions in seconds:
            </p>
            <ul className="tight">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link href={t.path}>{t.name}</Link> — {t.blurb}
                </li>
              ))}
            </ul>
            <p>
              There are no accounts, no ads walls and no tracking forms. Every
              calculator runs entirely in your browser — the numbers you type
              never leave your device.
            </p>
          </div>
        </div>
      </section>

      <section className="info-card" aria-labelledby="about-sources-heading">
        <div className="prose-grid">
          <div>
            <p className="kicker" aria-hidden="true">
              <span>02</span>&nbsp;&nbsp;Sources
            </p>
            <h2 id="about-sources-heading">How the figures are sourced</h2>
          </div>
          <div className="body-col">
            <p>
              We use the space allowances and feed figures published by
              university extension services and poultry organisations — the
              guidance written for backyard keepers, not factory minimums. Where
              sources give a range (and they often do), the calculators show the
              range and label the comfortable option honestly rather than
              quietly using the smallest number. Each tool page explains the
              exact figures it uses, in its &ldquo;How it works&rdquo; section.
            </p>
            <p>
              These calculators are planning tools. Local rules on keeping
              poultry vary, and animal needs vary too — use the numbers as a
              well-sourced starting point, and give your birds more space
              whenever you can.
            </p>
          </div>
        </div>
      </section>

      <section className="info-card dark" aria-labelledby="about-contact-heading">
        <div className="prose-grid">
          <div>
            <p className="kicker" aria-hidden="true">
              <span>03</span>&nbsp;&nbsp;Contact
            </p>
            <h2 id="about-contact-heading">Contact</h2>
          </div>
          <div className="body-col">
            <p>
              Spotted a figure you think is wrong, or a calculator you wish
              existed? Email{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> — corrections
              with a source are especially welcome, and we update the tools
              when better guidance wins the argument.
            </p>
            <p style={{ marginBottom: 0 }}>
              <Link className="btn btn-primary has-arrow" href="/">
                Browse the calculators
                <span className="btn-arrow" aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
