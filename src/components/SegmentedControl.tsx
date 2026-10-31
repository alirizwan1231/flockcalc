"use client";

export type SegmentOption = {
  value: string;
  /** Short primary label shown on the segment. */
  title: string;
  /** Optional detail line under the title (same words as the old select). */
  detail?: string;
};

type Props = {
  /** Keeps the id the replaced <select> used to carry. */
  id: string;
  /** id of the visible field label that names this group. */
  labelledBy?: string;
  /** Accessible name used when there is no visible label element. */
  ariaLabel?: string;
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
};

/**
 * Segmented (radio-style) control used in place of <select> for small
 * option sets. Roving tabindex: only the selected segment is tabbable,
 * arrow keys move between segments — standard radiogroup behaviour.
 */
export default function SegmentedControl({
  id,
  labelledBy,
  ariaLabel,
  options,
  value,
  onChange,
}: Props) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );

  function onKeyDown(e: React.KeyboardEvent) {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = (selectedIndex + 1) % options.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (selectedIndex - 1 + options.length) % options.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = options.length - 1;
    if (next === null) return;
    e.preventDefault();
    onChange(options[next].value);
    const group = e.currentTarget as HTMLElement;
    requestAnimationFrame(() => {
      group
        .querySelectorAll<HTMLElement>('[role="radio"]')
        [next!]?.focus();
    });
  }

  return (
    <div
      id={id}
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className="segmented"
      data-count={options.length}
      onKeyDown={onKeyDown}
    >
      {options.map((o, i) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={i === selectedIndex ? 0 : -1}
            className={`segment${active ? " is-active" : ""}`}
            onClick={() => onChange(o.value)}
          >
            <span className="segment-title">{o.title}</span>
            {o.detail ? (
              <span className="segment-detail">{o.detail}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
