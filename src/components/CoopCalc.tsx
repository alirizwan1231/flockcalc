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
import PrintButton from "./PrintButton";

export default function CoopCalc() {
  const [birdsIn, setBirdsIn] = useState("6");
  const [size, setSize] = useState<ChickenSize>("standard");

  const birds = num(birdsIn);
  const rate = CHICKEN_RATES[size];
  const s = chickenSpace(birds, size);

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div>
          <div className="field">
            <label htmlFor="c-birds">Number of chickens</label>
            <input
              id="c-birds"
              type="number"
              min="1"
              value={birdsIn}
              onChange={(e) => setBirdsIn(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="c-size">Bird size</label>
            <select
              id="c-size"
              value={size}
              onChange={(e) => setSize(e.target.value as ChickenSize)}
            >
              <option value="bantam">
                Bantam — {CHICKEN_RATES.bantam.coop} sq ft coop /{" "}
                {CHICKEN_RATES.bantam.run} sq ft run per bird
              </option>
              <option value="standard">
                Standard — {CHICKEN_RATES.standard.coop} sq ft coop /{" "}
                {CHICKEN_RATES.standard.run} sq ft run per bird
              </option>
              <option value="large">
                Large / heavy — {CHICKEN_RATES.large.coop} sq ft coop /{" "}
                {CHICKEN_RATES.large.run} sq ft run per bird
              </option>
            </select>
          </div>
          <p>
            These are comfortable, commonly recommended figures — not the tight
            legal minimums factory farms use. More space always means a calmer,
            healthier flock.
          </p>
          <h3 style={{ marginTop: 22 }}>Ready-made coop sizes</h3>
          {COOP_FOOTPRINTS.map((f) => {
            const area = f.l * f.w;
            return (
              <div className="result-row" key={`${f.l}x${f.w}`}>
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
            A {birds || 0}-bird flock of {rate.label.toLowerCase()} chickens fits
            comfortably in a coop of about {fmt(r1(s.coopSqft))} sq ft — for
            example{" "}
            {COOP_FOOTPRINTS.find((f) => f.l * f.w >= s.coopSqft)
              ? `${COOP_FOOTPRINTS.find((f) => f.l * f.w >= s.coopSqft)!.l} × ${
                  COOP_FOOTPRINTS.find((f) => f.l * f.w >= s.coopSqft)!.w
                } ft`
              : "a custom walk-in build"}
            .
          </div>
          <div className="btn-row">
            <PrintButton />
          </div>
        </div>
      </div>
    </div>
  );
}
