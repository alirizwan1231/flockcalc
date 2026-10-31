"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import EggMark from "./EggMark";
import { site, tools } from "@/lib/site";

/** Concept nav: Calculators (quail) · How it works (home anchor) · About. */
const NAV = [
  { href: tools[0].path, label: "Calculators" },
  { href: "/#how-numbers-work", label: "How it works" },
  { href: "/about", label: "About" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? pathname === "/" : pathname === href;

  return (
    <header className="site-header no-print">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <EggMark />
          <span className="brand-name">{site.name}</span>
        </Link>

        <nav className="main-nav" aria-label="Site">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={isActive(item.href) ? "is-active" : undefined}
              aria-current={
                isActive(item.href) && !item.href.startsWith("/#")
                  ? "page"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
          <Link href={tools[0].path} className="btn btn-primary header-cta">
            Open a tool
          </Link>
        </nav>

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

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`}>
        <div className="wrap">
          <nav className="mobile-nav" aria-label="Site">
            {[...tools, { path: "/about", name: "About" }].map((t) => (
              <Link
                key={t.path}
                href={t.path}
                className={pathname === t.path ? "is-active" : undefined}
                aria-current={pathname === t.path ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {t.name}
              </Link>
            ))}
            <Link
              href={tools[0].path}
              className="btn btn-primary mobile-cta"
              onClick={() => setOpen(false)}
            >
              Open a tool
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
