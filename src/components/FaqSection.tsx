"use client";

import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/schema";

type Props = {
  faqs: Faq[];
  /** Section label word, e.g. "Questions" (numbered index is the .num). */
  index: string;
};

/**
 * FAQ in the concept language: white 2px-bordered blocks with a plus
 * toggle. First item is open by default so content is visible (and
 * present for no-JS readers); printing expands every item.
 */
export default function FaqSection({ faqs, index }: Props) {
  const listRef = useRef<HTMLDivElement>(null);

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
    <section className="section-block" aria-labelledby="faq-heading">
      <p className="kicker" aria-hidden="true">
        <span>{index}</span>&nbsp;&nbsp;Questions
      </p>
      <h2 id="faq-heading">Frequently asked questions</h2>
      <div className="faq-list" ref={listRef}>
        {faqs.map((f, i) => (
          <details className="faq-item" key={f.q} open={i === 0}>
            <summary>
              <span className="faq-q">{f.q}</span>
              <Plus className="faq-icon" size={22} aria-hidden="true" />
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
