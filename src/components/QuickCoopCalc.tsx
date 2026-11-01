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

const SIZE_OPTIONS = (Object.keys(CHICKEN_RATES) as ChickenSize[]).map(
  (id) => ({
    value: id,
    title: id === "large" ? "Large" : CHICKEN_RATES[id].label,
  })
);

const DEFAULTS = { birds: "8", size: "standard" as ChickenSize };

/**
 * Compact working chicken-coop calculator for the home hero.
 * Uses the exact same maths as the full Chicken Coop tool
 * (chickenSpace / CHICKEN_RATES from lib/math.ts) — nothing forked.
 */
export default function QuickCoopCalc() {
  const [birdsIn, setBirdsIn] = useState(DEFAULTS.birds);
  const [size, setSize] = useState<ChickenSize>(DEFAULTS.size);

  const s = chickenSpace(num(birdsIn), size);

  return (
    <div>
      <div className="quick-card">
        <p className="kicker">Quick coop calculator</p>
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
        <div className="quick-result" aria-live="polite">
          <div>
            <div className="qr-label">Coop floor</div>
            <div className="qr-num">
              {fmt(r1(s.coopSqft))}
              <span className="qr-unit"> sq ft</span>
            </div>
            <div className="qr-metric">{fmt(r1(sqm(s.coopSqft)))} m²</div>
          </div>
          <div>
            <div className="qr-label">Run space</div>
            <div className="qr-num">
              {fmt(r1(s.runSqft))}
              <span className="qr-unit"> sq ft</span>
            </div>
            <div className="qr-metric">{fmt(r1(sqm(s.runSqft)))} m²</div>
          </div>
        </div>
      </div>
      <Link className="quick-link" href="/chicken-coop-size-calculator">
        Open the full Chicken Coop Calculator
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}
