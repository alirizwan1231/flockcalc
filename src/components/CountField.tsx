"use client";

import type { ReactNode } from "react";

type Props = {
  id: string;
  label: ReactNode;
  /** Accessible name for the slider (the same field, in words). */
  sliderLabel: string;
  value: string;
  onChange: (value: string) => void;
  /** Slider range (the number input itself stays free-form). */
  min: number;
  max: number;
  step?: number;
  /** Show the small min/max scale under the slider. */
  showScale?: boolean;
};

/** Inline style that paints the filled (violet) part of the slider track. */
export function sliderFill(value: number, min: number, max: number) {
  const pct =
    max > min ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)) : 0;
  return {
    background: `linear-gradient(to right, var(--violet) ${pct}%, var(--track) ${pct}%)`,
  } as const;
}

/**
 * Bloomkite count field: a BIG bold number input paired with a synced
 * range slider (violet filled track, round thumb) writing into the same
 * state, with min/max labels at both ends. Typing stays free-form; the
 * slider clamps to its range.
 */
export default function CountField({
  id,
  label,
  sliderLabel,
  value,
  onChange,
  min,
  max,
  step = 1,
  showScale = true,
}: Props) {
  const parsed = parseFloat(value);
  const sliderValue = Number.isFinite(parsed)
    ? Math.min(max, Math.max(min, parsed))
    : min;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="count-wrap">
        <input
          id={id}
          type="number"
          min={min}
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="count-slider-wrap">
          <input
            className="count-slider"
            type="range"
            min={min}
            max={max}
            step={step}
            value={sliderValue}
            aria-label={sliderLabel}
            style={sliderFill(sliderValue, min, max)}
            onChange={(e) => onChange(e.target.value)}
          />
          {showScale ? (
            <div className="slider-scale" aria-hidden="true">
              <span>{min}</span>
              <span>{max}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
