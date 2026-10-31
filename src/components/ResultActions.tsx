"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Printer, RotateCcw } from "lucide-react";

type Props = {
  /** Plain-text summary of the current results, written to the clipboard. */
  summary: string;
  /** Restores the calculator's default input values. */
  onReset: () => void;
};

/**
 * Action row for a calculator's result panel: Copy results (real clipboard
 * write with a transient "Copied" confirmation), Reset (real state reset)
 * and Print (the original print action, now with an icon instead of emoji).
 */
export default function ResultActions({ summary, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  async function copyResults() {
    try {
      await navigator.clipboard.writeText(summary);
    } catch {
      // Clipboard API can be unavailable (permissions / insecure context):
      // fall back to a temporary textarea + execCommand.
      const ta = document.createElement("textarea");
      ta.value = summary;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing more we can do — the button simply won't confirm */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="btn-row result-actions no-print">
      <button
        type="button"
        className="btn btn-light"
        onClick={copyResults}
        aria-live="polite"
      >
        {copied ? (
          <Check size={18} aria-hidden="true" />
        ) : (
          <Copy size={18} aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy results"}
      </button>
      <button type="button" className="btn btn-ghost-light" onClick={onReset}>
        <RotateCcw size={18} aria-hidden="true" />
        Reset
      </button>
      <button
        type="button"
        className="btn btn-ghost-light"
        onClick={() => window.print()}
      >
        <Printer size={18} aria-hidden="true" />
        Print this result
      </button>
    </div>
  );
}
