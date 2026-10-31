import Link from "next/link";
import { site, tools } from "@/lib/site";

export default function Header() {
  return (
    <header className="site-header no-print">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="30" height="30" role="img">
              <circle cx="16" cy="16" r="15" fill="#1d5c38" />
              <path
                d="M16 6c3.5 3.8 5.5 7 5.5 10.2A5.6 5.6 0 0 1 16 21.8a5.6 5.6 0 0 1-5.5-5.6C10.5 13 12.5 9.8 16 6z"
                fill="#f7ead2"
              />
              <circle cx="16" cy="15.5" r="2.1" fill="#d97706" />
            </svg>
          </span>
          <span className="brand-name">{site.name}</span>
        </Link>
        <nav className="main-nav" aria-label="Calculators">
          {tools.map((t) => (
            <Link key={t.slug} href={t.path}>
              {t.shortName}
            </Link>
          ))}
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
