/**
 * Shared calculator chrome: the amber badge that sits directly above
 * every calculator, and the header row inside every input card.
 * Presentational only — no state, safe inside client components.
 */

export function CalcBadge() {
  return (
    <div className="calc-badge-row">
      <span className="calc-badge">
        Free calculator — results update as you type
      </span>
    </div>
  );
}

export function InputsHead() {
  return (
    <div className="calc-inputs-head">
      <span className="kicker">Your numbers</span>
      <span className="cih-note">No button to press — it calculates live</span>
    </div>
  );
}
