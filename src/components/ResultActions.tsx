"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Plain-text summary of the current results, written to the clipboard. */
  summary: string;
  /** Restores the calculator's default input values. */
  onReset: () => void;
};

/**
 * Action row for the summary panel: green Copy results pill, white
 * Reset and Print pills. Copy performs a real clipboard write with a
 * transient "Copied" confirmation.
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
    let ok = false;
    try {
      await navigator.clipboard.writeText(summary);
      ok = true;
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
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(ta);
    }
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="result-actions no-print">
      <button
        type="button"
        className="btn btn-primary"
        onClick={copyResults}
        aria-live="polite"
      >
        {copied ? "Copied" : "Copy results"}
      </button>
      <button type="button" className="btn" onClick={onReset}>
        Reset
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => window.print()}
      >
        Print
      </button>
    </div>
  );
}
