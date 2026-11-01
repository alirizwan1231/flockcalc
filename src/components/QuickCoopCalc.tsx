"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CHICKEN_RATES,
  chickenSpace,
  fmt,
  num,
  r1,
  sqm,
  type ChickenSize,
} from "@/lib/math";
import CountField from "./CountField";
import SegmentedControl from "./SegmentedControl";
import { GreenBlock } from "./Viz";

const SIZE_OPTIONS = (Object.keys(CHICKEN_RATES) as ChickenSize[]).map(
  (id) => ({
    value: id,
    title: id === "large" ? "Large" : CHICKEN_RATES[id].label,
  })
);

const DEFAULTS = { birds: "8", size: "standard" as ChickenSize };

/**
 * Compact working chicken-coop calculator for the home hero's dark
 * panel — a Bloomkite-style white card: birds slider + big number,
 * breed segmented control, light-violet summary strip and a green
 * headline-result block. Uses the exact same maths as the full
 * Chicken Coop tool (chickenSpace / CHICKEN_RATES from lib/math.ts).
 */
export default function QuickCoopCalc() {
  const [birdsIn, setBirdsIn] = useState(DEFAULTS.birds);
  const [size, setSize] = useState<ChickenSize>(DEFAULTS.size);

  const s = chickenSpace(num(birdsIn), size);

  return (
    <div>
      <div className="quick-card">
        <div className="quick-head">
          <span className="quick-title">Quick coop calculator</span>
          <span className="quick-live">Live</span>
        </div>
        <CountField
          id="qq-birds"
          label="Number of chickens"
          sliderLabel="Number of chickens"
          value={birdsIn}
          onChange={setBirdsIn}
          min={1}
          max={50}
        />
        <div className="field">
          <span className="field-label" id="qq-size-label">
            Breed size
          </span>
          <SegmentedControl
            id="qq-size"
            labelledBy="qq-size-label"
            options={SIZE_OPTIONS}
            value={size}
            onChange={(v) => setSize(v as ChickenSize)}
          />
        </div>
        <div className="quick-summary" aria-live="polite">
          <div className="qs-row">
            <span className="qs-k">Coop floor</span>
            <span className="qs-v">
              {fmt(r1(s.coopSqft))} sq ft{" "}
              <small>({fmt(r1(sqm(s.coopSqft)))} m²)</small>
            </span>
          </div>
          <div className="qs-row">
            <span className="qs-k">Run space</span>
            <span className="qs-v">
              {fmt(r1(s.runSqft))} sq ft{" "}
              <small>({fmt(r1(sqm(s.runSqft)))} m²)</small>
            </span>
          </div>
          <GreenBlock
            items={[
              {
                label: "Coop floor needed",
                value: fmt(r1(s.coopSqft)),
                unit: "sq ft",
              },
            ]}
          />
        </div>
      </div>
      <Link className="quick-link" href="/chicken-coop-size-calculator">
        Open the full Chicken Coop Calculator
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}
