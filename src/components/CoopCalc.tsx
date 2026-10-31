"use client";

import { useState } from "react";
import {
  CHICKEN_RATES,
  COOP_FOOTPRINTS,
  chickenSpace,
  fmt,
  num,
  r1,
  sqm,
  type ChickenSize,
} from "@/lib/math";
import CountField from "./CountField";
import ResultActions from "./ResultActions";
import SegmentedControl from "./SegmentedControl";

const SIZE_SEGMENTS = (Object.keys(CHICKEN_RATES) as ChickenSize[]).map(
  (id) => {
    const r = CHICKEN_RATES[id];
    const title =
      id === "large"
        ? "Large / heavy"
        : id === "bantam"
          ? "Bantam"
          : "Standard";
    return {
      value: id,
      title,
      detail: `${r.coop} sq ft coop / ${r.run} sq ft run per bird`,
    };
  }
);

const DEFAULTS = { birds: "6", size: "standard" as ChickenSize };

export default function CoopCalc() {
  const [birdsIn, setBirdsIn] = useState(DEFAULTS.birds);
  const [size, setSize] = useState<ChickenSize>(DEFAULTS.size);

  const birds = num(birdsIn);
  const rate = CHICKEN_RATES[size];
  const s = chickenSpace(birds, size);

  function reset() {
    setBirdsIn(DEFAULTS.birds);
    setSize(DEFAULTS.size);
  }

  const summary = [
    "Chicken Coop Size Calculator — FlockCalc",
    `Coop (indoor floor): ${fmt(r1(s.coopSqft))} sq ft (${fmt(r1(sqm(s.coopSqft)))} m²)`,
    `Run (outdoor): ${fmt(r1(s.runSqft))} sq ft (${fmt(r1(sqm(s.runSqft)))} m²)`,
    `Roost length (10 in per bird): ${fmt(r1(s.roostFeet))} ft (${fmt(r1(s.roostFeet * 0.3048))} m)`,
    `Nesting boxes: ${s.nestingBoxes} ${s.nestingBoxes === 1 ? "box" : "boxes"} (1 per 4 hens)`,
  ].join("\n");

  return (
    <div className="workbench">
      <div>
        <CountField
          id="c-birds"
          label="Number of chickens"
          sliderLabel="Number of chickens"
          value={birdsIn}
          onChange={setBirdsIn}
          min={1}
          max={50}
        />
        <div className="field">
          <span className="field-label" id="c-size-label">
            Bird size
          </span>
          <SegmentedControl
            id="c-size"
            labelledBy="c-size-label"
            options={SIZE_SEGMENTS}
            value={size}
            onChange={(v) => setSize(v as ChickenSize)}
          />
        </div>
        <div className="form-note">
          <p>
            These are comfortable, commonly recommended figures — not the tight
            legal minimums factory farms use. More space always means a calmer,
            healthier flock.
          </p>
        </div>
        <h3 className="subhead">Ready-made coop sizes</h3>
        <div className="mini-rows">
          {COOP_FOOTPRINTS.map((f) => {
            const area = f.l * f.w;
            return (
              <div className="mini-row" key={`${f.l}x${f.w}`}>
                <span className="k">
                  {f.l} × {f.w} ft coop ({area} sq ft)
                </span>
                <span className="v">
                  fits {Math.floor(area / rate.coop)} {rate.label.toLowerCase()}{" "}
                  birds
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <h3>Your coop plan</h3>
        <p className="result-big">
          {fmt(r1(s.coopSqft))} sq ft coop · {fmt(r1(s.runSqft))} sq ft run
        </p>
        <div className="result-row">
          <span className="k">Coop (indoor floor)</span>
          <span className="v">
            {fmt(r1(s.coopSqft))} sq ft ({fmt(r1(sqm(s.coopSqft)))} m²)
          </span>
        </div>
        <div className="result-row">
          <span className="k">Run (outdoor)</span>
          <span className="v">
            {fmt(r1(s.runSqft))} sq ft ({fmt(r1(sqm(s.runSqft)))} m²)
          </span>
        </div>
        <div className="result-row">
          <span className="k">Roost length (10 in per bird)</span>
          <span className="v">
            {fmt(r1(s.roostFeet))} ft ({fmt(r1(s.roostFeet * 0.3048))} m)
          </span>
        </div>
        <div className="result-row">
          <span className="k">Nesting boxes</span>
          <span className="v">
            {s.nestingBoxes} {s.nestingBoxes === 1 ? "box" : "boxes"} (1 per 4
            hens)
          </span>
        </div>
        <div className="result-note">
          <p>
            A {birds || 0}-bird flock of {rate.label.toLowerCase()} chickens fits
            comfortably in a coop of about {fmt(r1(s.coopSqft))} sq ft — for
            example{" "}
            {COOP_FOOTPRINTS.find((f) => f.l * f.w >= s.coopSqft)
              ? `${COOP_FOOTPRINTS.find((f) => f.l * f.w >= s.coopSqft)!.l} × ${
                  COOP_FOOTPRINTS.find((f) => f.l * f.w >= s.coopSqft)!.w
                } ft`
              : "a custom walk-in build"}
            .
          </p>
        </div>
        <ResultActions summary={summary} onReset={reset} />
      </div>
    </div>
  );
}
