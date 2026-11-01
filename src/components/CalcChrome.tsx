import { Sparkles } from "lucide-react";

/**
 * Shared calculator chrome: the pill badge that sits directly above
 * every calculator, and the header row inside every input column.
 * Presentational only — no state, safe inside client components.
 */

export function CalcBadge() {
  return (
    <div className="calc-badge-row">
      <span className="calc-badge">
        <Sparkles size={14} aria-hidden="true" />
        Free calculator — results update as you type
      </span>
    </div>
  );
}

export function InputsHead() {
  return (
    <div className="calc-inputs-head">
      <span className="cih-title">Your numbers</span>
      <span className="cih-note">Results update live as you type</span>
    </div>
  );
}
