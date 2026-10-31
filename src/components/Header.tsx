"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Egg, Menu, X } from "lucide-react";
import { site, tools } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header no-print">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <Egg size={23} strokeWidth={2} aria-hidden="true" />
          <span className="brand-name">{site.name}</span>
        </Link>

        <nav className="main-nav" aria-label="Calculators">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={t.path}
              className={pathname === t.path ? "is-active" : undefined}
              aria-current={pathname === t.path ? "page" : undefined}
            >
              {t.shortName}
            </Link>
          ))}
          <Link
            href="/about"
            className={pathname === "/about" ? "is-active" : undefined}
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            About
          </Link>
        </nav>

        <div className="header-actions">
          <Link href={tools[0].path} className="btn btn-primary header-cta">
            Try the calculators
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`}>
        <nav className="wrap mobile-nav" aria-label="Calculators">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={t.path}
              className={pathname === t.path ? "is-active" : undefined}
              aria-current={pathname === t.path ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t.name}
            </Link>
          ))}
          <Link
            href="/about"
            className={pathname === "/about" ? "is-active" : undefined}
            aria-current={pathname === "/about" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href={tools[0].path}
            className="btn btn-primary mobile-cta"
            onClick={() => setOpen(false)}
          >
            Try the calculators
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
