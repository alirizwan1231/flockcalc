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
 * Quiet text actions for a result block: Copy results (real clipboard
 * write with a transient "Copied" confirmation), Reset (restores the
 * tool's defaults) and Print.
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
    <div className="result-actions no-print">
      <button
        type="button"
        className="action-btn"
        onClick={copyResults}
        aria-live="polite"
      >
        {copied ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy results"}
      </button>
      <button type="button" className="action-btn" onClick={onReset}>
        <RotateCcw size={16} aria-hidden="true" />
        Reset
      </button>
      <button
        type="button"
        className="action-btn"
        onClick={() => window.print()}
      >
        <Printer size={16} aria-hidden="true" />
        Print this result
      </button>
    </div>
  );
}
