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
import { InputsHead } from "./CalcChrome";
import SegmentedControl from "./SegmentedControl";
import { GreenBlock, PropBar } from "./Viz";

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

/** Example coop footprints whose area covers the requirement (concept chips). */
function fittingFootprints(neededSqft: number, limit = 3) {
  const sorted = [...COOP_FOOTPRINTS].sort(
    (a, b) => a.l * a.w - b.l * b.w
  );
  const fitting = sorted.filter((f) => f.l * f.w >= neededSqft);
  if (fitting.length > 0) return fitting.slice(0, limit);
  return sorted.slice(-limit).reverse();
}

const DEFAULTS = { birds: "6", size: "standard" as ChickenSize };

export default function CoopCalc() {
  const [birdsIn, setBirdsIn] = useState(DEFAULTS.birds);
  const [size, setSize] = useState<ChickenSize>(DEFAULTS.size);

  const birds = num(birdsIn);
  const rate = CHICKEN_RATES[size];
  const s = chickenSpace(birds, size);
  const chips = fittingFootprints(s.coopSqft);

  function reset() {
    setBirdsIn(DEFAULTS.birds);
    setSize(DEFAULTS.size);
  }

  const summary = [
    "Chicken Coop Size Calculator — FlockCalc",
    `Number of chickens: ${birds} (${rate.label})`,
    `Coop (indoor floor): ${fmt(r1(s.coopSqft))} sq ft (${fmt(r1(sqm(s.coopSqft)))} m²)`,
    `Run (outdoor): ${fmt(r1(s.runSqft))} sq ft (${fmt(r1(sqm(s.runSqft)))} m²)`,
    `Roost length (10 in per bird): ${fmt(r1(s.roostInches))} in (${fmt(r1(s.roostFeet))} ft)`,
    `Nesting boxes: ${s.nestingBoxes} ${s.nestingBoxes === 1 ? "box" : "boxes"} (1 per 4 hens)`,
    "Coop footprints that fit: " +
      chips.map((f) => `${f.l} × ${f.w} ft`).join("; "),
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
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
            Breed size
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
            {rate.label}: {rate.coop} sq ft coop and {rate.run} sq ft run per
            bird. These are comfortable, commonly recommended figures — not
            the tight legal minimums factory farms use. More space always
            means a calmer, healthier flock.
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
        <p className="kicker">Your flock needs</p>
        <div className="result-hero-grid">
          <div className="result-hero">
            <div className="rh-label">Coop floor</div>
            <div className="result-num">
              {fmt(r1(s.coopSqft))}
              <span className="unit"> sq ft</span>
            </div>
            <div className="result-metric">{fmt(r1(sqm(s.coopSqft)))} m²</div>
          </div>
          <div className="result-hero">
            <div className="rh-label">Run space</div>
            <div className="result-num">
              {fmt(r1(s.runSqft))}
              <span className="unit"> sq ft</span>
            </div>
            <div className="result-metric">{fmt(r1(sqm(s.runSqft)))} m²</div>
          </div>
        </div>
        <div className="result-stats">
          <div>
            <div className="rs-label">Roost length</div>
            <div className="rs-value">
              {fmt(r1(s.roostInches))} in ({fmt(r1(s.roostFeet))} ft)
            </div>
          </div>
          <div>
            <div className="rs-label">Nesting boxes</div>
            <div className="rs-value">{s.nestingBoxes}</div>
          </div>
        </div>
        <div className="result-chips">
          <div className="rs-label">Coop footprints that fit</div>
          <div>
            {chips.map((f) => (
              <span className="chip" key={`${f.l}x${f.w}`}>
                {f.l} × {f.w} ft
              </span>
            ))}
          </div>
        </div>
        <PropBar
          segments={[
            {
              label: "Coop",
              value: s.coopSqft,
              display: `${fmt(r1(s.coopSqft))} sq ft`,
              tone: "violet",
            },
            {
              label: "Run",
              value: s.runSqft,
              display: `${fmt(r1(s.runSqft))} sq ft`,
              tone: "green",
            },
          ]}
        />
        <GreenBlock
          items={[
            {
              label: "Coop floor needed",
              value: fmt(r1(s.coopSqft)),
              unit: "sq ft",
            },
            {
              label: "Run space needed",
              value: fmt(r1(s.runSqft)),
              unit: "sq ft",
            },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
    </div>
  );
}
