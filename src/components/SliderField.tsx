"use client";

import type { ReactNode } from "react";
import { sliderFill } from "./CountField";

type Props = {
  id: string;
  label: ReactNode;
  /** Accessible name for the slider (the same field, in words). */
  sliderLabel: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step?: number;
  /** Unit affix shown inside the number box, e.g. "$" (prefix) or "lb". */
  prefix?: string;
  suffix?: string;
  /** Scale labels under the slider ends (defaults to the raw min/max). */
  minLabel?: string;
  maxLabel?: string;
  inputStep?: number;
};

/**
 * Bloomkite numeric field for money / weights / dimensions: BIG bold
 * number box (with optional $ / lb affix) + slider beneath it with
 * min/max labels at both ends. Same state drives both controls.
 */
export default function SliderField({
  id,
  label,
  sliderLabel,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  minLabel,
  maxLabel,
  inputStep,
}: Props) {
  const parsed = parseFloat(value);
  const sliderValue = Number.isFinite(parsed)
    ? Math.min(max, Math.max(min, parsed))
    : min;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="sf-row">
        <div className="input-affix sf-input">
          {prefix ? (
            <span className="affix affix-pre" aria-hidden="true">
              {prefix}
            </span>
          ) : null}
          <input
            id={id}
            type="number"
            min={min}
            step={inputStep ?? step}
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {suffix ? (
            <span className="affix affix-post" aria-hidden="true">
              {suffix}
            </span>
          ) : null}
        </div>
        <div className="sf-slider">
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
          <div className="slider-scale" aria-hidden="true">
            <span>{minLabel ?? min}</span>
            <span>{maxLabel ?? max}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
