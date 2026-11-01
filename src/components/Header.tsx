"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import EggMark from "./EggMark";
import { site, tools } from "@/lib/site";

/** Floating pill nav links — short labels, super.cx style. */
const NAV = [
  { href: tools[0].path, label: "Quail Coop" },
  { href: tools[1].path, label: "Chickens" },
  { href: tools[2].path, label: "Cost per Egg" },
  { href: tools[3].path, label: "Ducks" },
  { href: tools[4].path, label: "Chicken Coop" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="site-header no-print" id="top">
      <div className="wrap">
        <div className="nav-pill">
          <Link href="/" className="brand" aria-label={`${site.name} home`}>
            <EggMark size={38} />
            <span className="brand-name">
              Flock<em>Calc</em>
            </span>
          </Link>

          <nav className="main-nav" aria-label="Site">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={isActive(item.href) ? "is-active" : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-right">
            <Link
              href="/about"
              className="about-link"
              aria-current={pathname === "/about" ? "page" : undefined}
            >
              About
            </Link>
            <Link
              href="/chicken-coop-size-calculator"
              className="btn btn-primary has-arrow nav-cta"
            >
              <span className="cta-label">Start calculating</span>
              <span className="btn-arrow" aria-hidden="true">
                <ArrowUpRight size={17} />
              </span>
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

        <div
          id="mobile-menu"
          className={`mobile-menu${open ? " is-open" : ""}`}
        >
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
              href="/chicken-coop-size-calculator"
              className="mobile-cta"
              onClick={() => setOpen(false)}
            >
              Start calculating
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
