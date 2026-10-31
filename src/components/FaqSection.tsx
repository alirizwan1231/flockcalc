"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/schema";

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  // Print should show every answer, not just the open accordions:
  // expand all <details> for the print render, then restore state.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = () =>
      Array.from(list.querySelectorAll<HTMLDetailsElement>("details"));
    let wasOpen: boolean[] = [];
    const before = () => {
      wasOpen = items().map((d) => d.open);
      items().forEach((d) => {
        d.open = true;
      });
    };
    const after = () => {
      items().forEach((d, i) => {
        d.open = wasOpen[i] ?? d.open;
      });
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>
      <div className="faq-list" ref={listRef}>
        {faqs.map((f, i) => (
          <details className="faq-item" key={f.q} open={i === 0}>
            <summary>
              <span className="faq-q">{f.q}</span>
              <ChevronDown
                className="faq-chevron"
                size={20}
                aria-hidden="true"
              />
            </summary>
            <div className="faq-a">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
