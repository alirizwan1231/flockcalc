import type { Metadata } from "next";
import Link from "next/link";
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
    description: `What ${site.name} is and how its numbers are sourced.`,
  },
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="breadcrumb">
          <Link href="/">Home</Link> › About
        </p>
        <h1>About {site.name}</h1>
        <p className="lede">
          {site.name} is a small, free set of calculators for people who keep —
          or are about to keep — backyard chickens, quail and ducks.
        </p>
      </div>

      <section>
        <h2>What the site does</h2>
        <p>
          Most poultry questions are really arithmetic: floor space per bird,
          eggs eaten per week, pounds of feed per month. {site.name} does that
          arithmetic for you, in the open, with the working shown on every page:
        </p>
        <ul className="tight">
          {tools.map((t) => (
            <li key={t.slug}>
              <Link href={t.path}>{t.name}</Link> — {t.blurb}
            </li>
          ))}
        </ul>
        <p>
          The calculators run entirely in your browser. Nothing you type is
          sent anywhere or stored.
        </p>
      </section>

      <section>
        <h2>How the figures are sourced</h2>
        <p>
          Space and feed figures follow mainstream guidance published by
          university poultry extension services in the United States (via
          extension.org and land-grant university poultry programmes) and
          poultry welfare organisations in the UK: about 1 sq ft per Coturnix
          quail, 3.5–4 sq ft of coop space and 10 sq ft of run per standard
          chicken, 4 sq ft per duck in the coop, and roughly 0.25 lb of feed per
          laying hen per day. Where sources give a range, the calculators say
          so and let you pick the level you are comfortable with.
        </p>
        <p>
          These are planning tools, not veterinary, legal or professional
          advice. Local rules on keeping poultry differ — always check your
          council or municipality&rsquo;s requirements before building.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Spotted a number that looks wrong, or want a calculator we
          don&rsquo;t have yet? Email{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>{" "}
          (placeholder address while the site launches).
        </p>
      </section>
    </div>
  );
}
