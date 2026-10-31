"use client";

import type { ReactNode } from "react";

type Props = {
  id: string;
  label: ReactNode;
  /** Accessible name for the slider (the same field, in words). */
  sliderLabel: string;
  value: string;
  onChange: (value: string) => void;
  /** Slider range (the number input itself stays free-form, as before). */
  min: number;
  max: number;
  step?: number;
};

/**
 * Bird-count field: the original number input paired with a synced range
 * slider writing into the same state. Typing keeps the old free-form
 * behaviour; the slider clamps to its sane range.
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
}: Props) {
  const parsed = parseFloat(value);
  const sliderValue = Number.isFinite(parsed)
    ? Math.min(max, Math.max(min, parsed))
    : min;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        min={min}
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        className="count-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        aria-label={sliderLabel}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="slider-scale" aria-hidden="true">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
