"use client";

import { useState } from "react";
import {
  CHICKEN_RATES,
  fmt,
  num,
  r1,
  runShapes,
  sqm,
  type ChickenSize,
} from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import SegmentedControl from "./SegmentedControl";
import { GreenBlock, PropBar } from "./Viz";

const SIZE_SEGMENTS = (Object.keys(CHICKEN_RATES) as ChickenSize[]).map(
  (id) => {
    const r = CHICKEN_RATES[id];
    const title =
      id === "large" ? "Large / heavy" : id === "bantam" ? "Bantam" : "Standard";
    return {
      value: id,
      title,
      detail: `${r.run} sq ft of run per bird`,
    };
  }
);

const DEFAULTS = { birds: "8", size: "standard" as ChickenSize };

export default function ChickenRunCalc() {
  const [birdsIn, setBirdsIn] = useState(DEFAULTS.birds);
  const [size, setSize] = useState<ChickenSize>(DEFAULTS.size);

  const birds = num(birdsIn);
  const rate = CHICKEN_RATES[size];
  const area = birds * rate.run;
  const coopArea = birds * rate.coop;
  const shapes = runShapes(area);

  function reset() {
    setBirdsIn(DEFAULTS.birds);
    setSize(DEFAULTS.size);
  }

  const summary = [
    "Chicken Run Size Calculator — FlockCalc",
    `Chickens: ${birds} (${rate.label}, ${rate.run} sq ft of run each)`,
    `Run area: ${fmt(r1(area))} sq ft (${fmt(r1(sqm(area)))} m²)`,
    `Square run: ${fmt(r1(shapes.square.l))} × ${fmt(r1(shapes.square.w))} ft`,
    `2:1 rectangle: ${fmt(r1(shapes.rect2.l))} × ${fmt(r1(shapes.rect2.w))} ft`,
    `3:1 rectangle: ${fmt(r1(shapes.rect3.l))} × ${fmt(r1(shapes.rect3.w))} ft`,
    `Fencing for the 2:1 run: about ${fmt(r1(shapes.fencingFt))} ft`,
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="cr-birds"
          label="Number of chickens"
          sliderLabel="Number of chickens"
          value={birdsIn}
          onChange={setBirdsIn}
          min={1}
          max={100}
        />
        <div className="field">
          <span className="field-label" id="cr-size-label">
            Breed size
          </span>
          <SegmentedControl
            id="cr-size"
            labelledBy="cr-size-label"
            options={SIZE_SEGMENTS}
            value={size}
            onChange={(v) => setSize(v as ChickenSize)}
          />
        </div>
        <div className="form-note">
          <p>
            The standard planning figure is{" "}
            <strong>10 sq ft of run per standard hen</strong>. Runs are where
            chickens spend their waking hours — an undersized run turns to
            bare mud and bored, feather-pecking birds within weeks, so treat
            these numbers as a floor, not a ceiling.
          </p>
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your run</p>
        <div className="result-hero">
          <div className="rh-label">Run area needed</div>
          <div className="result-num">
            {fmt(r1(area))}
            <span className="unit"> sq ft</span>
          </div>
          <div className="result-metric">
            {fmt(r1(sqm(area)))} m² · {rate.run} sq ft per bird
          </div>
        </div>
        <div className="result-rows">
          <div className="rs-label">Ways to lay it out (round up when you build)</div>
          <div className="result-row">
            <span className="k">Square</span>
            <span className="v">
              {fmt(r1(shapes.square.l))} × {fmt(r1(shapes.square.w))} ft
            </span>
          </div>
          <div className="result-row">
            <span className="k">Rectangle 2:1</span>
            <span className="v">
              {fmt(r1(shapes.rect2.l))} × {fmt(r1(shapes.rect2.w))} ft
            </span>
          </div>
          <div className="result-row">
            <span className="k">Rectangle 3:1</span>
            <span className="v">
              {fmt(r1(shapes.rect3.l))} × {fmt(r1(shapes.rect3.w))} ft
            </span>
          </div>
          <div className="result-row">
            <span className="k">Fencing for the 2:1 run</span>
            <span className="v">about {fmt(r1(shapes.fencingFt))} ft</span>
          </div>
        </div>
        <PropBar
          segments={[
            {
              label: "Coop (for scale)",
              value: coopArea,
              display: `${fmt(r1(coopArea))} sq ft`,
              tone: "violet",
            },
            {
              label: "Run",
              value: area,
              display: `${fmt(r1(area))} sq ft`,
              tone: "green",
            },
          ]}
        />
        <div className="result-note">
          <p>
            Fencing length is the full perimeter of the 2:1 rectangle — add a
            little extra for the gate overlap and corners. Long, narrow runs
            fit side yards well; squares are cheapest to fence per square foot.
          </p>
        </div>
        <GreenBlock
          items={[
            { label: "Run area needed", value: fmt(r1(area)), unit: "sq ft" },
            {
              label: "Fencing (2:1 run)",
              value: fmt(r1(shapes.fencingFt)),
              unit: "ft",
            },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          {
            label: "Run area",
            value: `${fmt(r1(area))} sq ft`,
            headline: true,
          },
          {
            label: "Square side",
            value: `${fmt(r1(shapes.square.l))} ft`,
          },
          { label: "Fencing", value: `${fmt(r1(shapes.fencingFt))} ft` },
        ]}
      />
    </div>
  );
}
