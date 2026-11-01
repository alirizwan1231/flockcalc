"use client";

import { useState } from "react";
import { fmt, nestingAndRoost, num, r1 } from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import { GreenBlock, PropBar } from "./Viz";

const DEFAULTS = { hens: "12" };

export default function NestingCalc() {
  const [hensIn, setHensIn] = useState(DEFAULTS.hens);

  const hens = num(hensIn);
  const r = nestingAndRoost(hens);
  const rowWidthFt = r.boxes; // each box is ~12 in wide, side by side

  function reset() {
    setHensIn(DEFAULTS.hens);
  }

  const summary = [
    "Nesting Box & Roost Calculator — FlockCalc",
    `Hens: ${hens}`,
    `Nesting boxes needed: ${r.boxes} (1 per 4 hens)`,
    `Total roost length: ${fmt(r1(r.roostFeet))} ft (${fmt(r1(r.roostInches))} in, ${fmt(r1(r.roostMeters))} m) at 10 in per bird`,
    `Row of boxes: about ${fmt(r1(rowWidthFt))} ft of wall (12 in per box)`,
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="nb-hens"
          label="Number of hens"
          sliderLabel="Number of hens"
          value={hensIn}
          onChange={setHensIn}
          min={1}
          max={200}
        />
        <div className="form-note">
          <p>
            Hens happily share nests: <strong>one box per four hens</strong>{" "}
            is the standard allowance, and more boxes mostly means more empty
            boxes — the whole flock often queues for one favourite. Roost
            space is the opposite: every bird needs her own{" "}
            <strong>10 inches</strong> on the bar, every night.
          </p>
        </div>
        <h3 className="subhead">Quick reference</h3>
        <div className="mini-rows">
          {[4, 8, 12, 16, 24].map((h) => {
            const x = nestingAndRoost(h);
            return (
              <div className="mini-row" key={h}>
                <span className="k">{h} hens</span>
                <span className="v">
                  {x.boxes} {x.boxes === 1 ? "box" : "boxes"} ·{" "}
                  {fmt(r1(x.roostFeet))} ft of roost
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your coop fittings</p>
        <div className="result-hero">
          <div className="rh-label">Nesting boxes needed</div>
          <div className="result-num">
            {r.boxes}
            <span className="unit"> {r.boxes === 1 ? "box" : "boxes"}</span>
          </div>
          <div className="result-metric">1 box per 4 hens</div>
        </div>
        <PropBar
          segments={[
            {
              label: "Hens",
              value: hens,
              display: `${hens}`,
              tone: "violet",
            },
            {
              label: "Nesting boxes",
              value: r.boxes,
              display: `${r.boxes}`,
              tone: "green",
            },
          ]}
        />
        <div className="result-stats">
          <div>
            <div className="rs-label">Total roost length</div>
            <div className="rs-value">
              {fmt(r1(r.roostFeet))} ft ({fmt(r1(r.roostMeters))} m)
            </div>
          </div>
          <div>
            <div className="rs-label">Wall for the box row</div>
            <div className="rs-value">about {fmt(r1(rowWidthFt))} ft</div>
          </div>
        </div>
        <div className="result-note">
          <p>
            Each box is about <strong>12 × 12 inches (30 × 30 cm)</strong> —
            big enough for one hen to turn around in. Roosts should sit
            higher than the boxes, or hens will sleep (and dirty) in the
            nests instead.
          </p>
        </div>
        <GreenBlock
          items={[
            {
              label: "Nesting boxes",
              value: `${r.boxes}`,
              unit: r.boxes === 1 ? "box" : "boxes",
            },
            {
              label: "Roost length",
              value: fmt(r1(r.roostFeet)),
              unit: "ft",
            },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          {
            label: "Nesting boxes",
            value: `${r.boxes}`,
            headline: true,
          },
          { label: "Roost", value: `${fmt(r1(r.roostFeet))} ft` },
          { label: "Hens", value: `${hens}` },
        ]}
      />
    </div>
  );
}
