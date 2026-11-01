/**
 * Small data-visuals for the summary panels, Bloomkite-style:
 * a stacked proportion bar, labelled rate bars, and the green
 * headline-result block. Presentational only.
 */

export type PropSegment = {
  label: string;
  value: number;
  display: string;
  tone: "violet" | "green" | "light";
};

/** Stacked proportion bar with a legend (segments share the whole). */
export function PropBar({ segments }: { segments: PropSegment[] }) {
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0);
  return (
    <div className="prop" aria-hidden="true">
      <div className="prop-bar">
        {segments.map((s) => (
          <div
            key={s.label}
            className={`prop-seg tone-${s.tone}`}
            style={{
              width: total > 0 ? `${(Math.max(0, s.value) / total) * 100}%` : "0%",
            }}
          />
        ))}
      </div>
      <div className="prop-legend">
        {segments.map((s) => (
          <div className="prop-legend-row" key={s.label}>
            <span className={`prop-dot tone-${s.tone}`} />
            <span className="pl-k">{s.label}</span>
            <span className="pl-v">{s.display}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export type RateBarRow = {
  label: string;
  value: number;
  display: string;
  highlight?: boolean;
};

/** Independent horizontal bars, scaled to the largest row. */
export function RateBars({ rows }: { rows: RateBarRow[] }) {
  const max = Math.max(0, ...rows.map((r) => r.value));
  return (
    <div className="rate-bars" aria-hidden="true">
      {rows.map((r) => (
        <div
          className={`rate-bar-row${r.highlight ? " is-highlight" : ""}`}
          key={r.label}
        >
          <span className="rb-k">{r.label}</span>
          <span className="rate-bar-track">
            <span
              className="rate-bar-fill"
              style={{
                display: "block",
                width:
                  max > 0 && r.value > 0
                    ? `${Math.max(3, (r.value / max) * 100)}%`
                    : "0%",
              }}
            />
          </span>
          <span className="rb-v">{r.display}</span>
        </div>
      ))}
    </div>
  );
}

export type GreenItem = { label: string; value: string; unit?: string };

/** The green headline-result block at the bottom of a summary panel. */
export function GreenBlock({ items }: { items: GreenItem[] }) {
  return (
    <div className={`green-block cols-${Math.min(2, items.length)}`}>
      {items.map((it) => (
        <div key={it.label}>
          <div className="gb-label">{it.label}</div>
          <div className="gb-value">
            {it.value}
            {it.unit ? <span className="gb-unit"> {it.unit}</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
