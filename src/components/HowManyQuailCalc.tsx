"use client";

import { useState } from "react";
import {
  QUAIL_EGGS_PER_WEEK,
  fmt,
  num,
  quailForEggs,
  r1,
  sqm,
} from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import { GreenBlock, PropBar } from "./Viz";

const DEFAULTS = { target: "30" };

export default function HowManyQuailCalc() {
  const [targetIn, setTargetIn] = useState(DEFAULTS.target);

  const target = num(targetIn);
  const { hens, cageSqft } = quailForEggs(target);
  const produced = hens * QUAIL_EGGS_PER_WEEK;
  const extra = Math.max(0, produced - target);

  function reset() {
    setTargetIn(DEFAULTS.target);
  }

  const summary = [
    "How Many Quail Do I Need? — FlockCalc",
    `Target: ${target} quail eggs per week`,
    `Quail hens needed: ${hens} (at ${QUAIL_EGGS_PER_WEEK} eggs per hen per week)`,
    `Expected production: ${produced} eggs per week`,
    `Cage floor space: ${fmt(r1(cageSqft))} sq ft (${fmt(r1(sqm(cageSqft)))} m²) at 1 sq ft per bird`,
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="hq-target"
          label="Quail eggs you want per week"
          sliderLabel="Quail eggs you want per week"
          value={targetIn}
          onChange={setTargetIn}
          min={1}
          max={200}
        />
        <div className="form-note">
          <p>
            A laying Coturnix hen averages about{" "}
            <strong>{QUAIL_EGGS_PER_WEEK} eggs a week</strong> in lay — near an
            egg a day at peak, with pauses for moulting and short days. We
            round the hen count up, so your flock covers the target with a
            little to spare.
          </p>
        </div>
        <div className="form-note">
          <p>
            <strong>Only hens lay.</strong> This count is hens only — males
            (roosters) add no eggs. For eating eggs you need no male at all;
            keep one only if you plan to hatch fertile eggs.
          </p>
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your covey size</p>
        <div className="result-hero">
          <div className="rh-label">Quail hens needed</div>
          <div className="result-num">
            {hens}
            <span className="unit"> hens</span>
          </div>
          <div className="result-metric">
            laying about {produced} eggs a week
          </div>
        </div>
        <PropBar
          segments={[
            {
              label: "Your target",
              value: target,
              display: `${fmt(target)} eggs`,
              tone: "violet",
            },
            {
              label: "Spare eggs",
              value: extra,
              display: `${fmt(extra)} eggs`,
              tone: "green",
            },
          ]}
        />
        <div className="result-stats">
          <div>
            <div className="rs-label">Cage floor space</div>
            <div className="rs-value">
              {fmt(r1(cageSqft))} sq ft ({fmt(r1(sqm(cageSqft)))} m²)
            </div>
          </div>
          <div>
            <div className="rs-label">Eggs per day</div>
            <div className="rs-value">about {fmt(r1(produced / 7))}</div>
          </div>
        </div>
        <div className="result-note">
          <p>
            Cage space uses the standard <strong>1 sq ft per bird</strong>.
            Quail eggs are small — roughly five quail eggs equal one chicken
            egg in a recipe — so most households find a target of 20–40 a week
            covers eating and baking.
          </p>
        </div>
        <GreenBlock
          items={[
            { label: "Quail hens needed", value: `${hens}`, unit: "hens" },
            {
              label: "Cage floor space",
              value: fmt(r1(cageSqft)),
              unit: "sq ft",
            },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          { label: "Quail hens", value: `${hens}`, headline: true },
          { label: "Cage", value: `${fmt(r1(cageSqft))} sq ft` },
          { label: "Eggs / week", value: `${produced}` },
        ]}
      />
    </div>
  );
}
