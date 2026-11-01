"use client";

import { useEffect } from "react";

export type MobileBarItem = {
  label: string;
  value: string;
  /** The headline figure — rendered in green. */
  headline?: boolean;
};

/**
 * Sticky result bar for small screens. On mobile the summary panel sits
 * below a long column of sliders, so this fixed bar keeps the headline
 * results visible while the user adjusts inputs. Visible only below
 * 1024px (CSS); while mounted it flags <body> so the page gets bottom
 * padding and the bar never covers the FAQ or action buttons.
 *
 * aria-hidden: the same values live in the summary panel, which is the
 * aria-live region screen readers already announce.
 */
export default function MobileResultBar({ items }: { items: MobileBarItem[] }) {
  useEffect(() => {
    document.body.classList.add("has-result-bar");
    return () => {
      document.body.classList.remove("has-result-bar");
    };
  }, []);

  return (
    <div className="mobile-result-bar no-print" aria-hidden="true">
      {items.map((it) => (
        <div className="mrb-item" key={it.label}>
          <span className="mrb-label">{it.label}</span>
          <span className={`mrb-value${it.headline ? " is-headline" : ""}`}>
            {it.value}
          </span>
        </div>
      ))}
    </div>
  );
}
