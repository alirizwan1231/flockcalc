"use client";

import { useState } from "react";
import { DUCK_EGGS_PER_WEEK, ducksForEggs, fmt, num, r1, sqm } from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import { GreenBlock, PropBar } from "./Viz";

const DEFAULTS = { target: "20" };

export default function HowManyDucksCalc() {
  const [targetIn, setTargetIn] = useState(DEFAULTS.target);

  const target = num(targetIn);
  const { ducks, coopSqft, runSqft } = ducksForEggs(target);
  const produced = ducks * DUCK_EGGS_PER_WEEK;
  const extra = Math.max(0, produced - target);

  function reset() {
    setTargetIn(DEFAULTS.target);
  }

  const summary = [
    "How Many Ducks Do I Need? — FlockCalc",
    `Target: ${target} duck eggs per week`,
    `Duck hens needed: ${ducks} (at ${DUCK_EGGS_PER_WEEK} eggs per duck per week)`,
    `Expected production: ${produced} eggs per week`,
    `Coop space: ${fmt(r1(coopSqft))} sq ft (${fmt(r1(sqm(coopSqft)))} m²)`,
    `Run space (minimum): ${fmt(r1(runSqft))} sq ft (${fmt(r1(sqm(runSqft)))} m²)`,
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="hdk-target"
          label="Duck eggs you want per week"
          sliderLabel="Duck eggs you want per week"
          value={targetIn}
          onChange={setTargetIn}
          min={1}
          max={200}
        />
        <div className="form-note">
          <p>
            A laying duck averages about{" "}
            <strong>{DUCK_EGGS_PER_WEEK} eggs a week</strong> across her laying
            season. Good laying breeds (Campbells, Welsh Harlequins, Indian
            Runners) can out-lay chickens in their first years, but many ducks
            take a winter break — this average allows for that.
          </p>
        </div>
        <div className="form-note">
          <p>
            <strong>Only females lay.</strong> The count is duck hens — you
            need a drake only for fertile eggs to hatch, never for eating eggs.
          </p>
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your duck flock</p>
        <div className="result-hero">
          <div className="rh-label">Duck hens needed</div>
          <div className="result-num">
            {ducks}
            <span className="unit"> ducks</span>
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
            <div className="rs-label">Coop space</div>
            <div className="rs-value">
              {fmt(r1(coopSqft))} sq ft ({fmt(r1(sqm(coopSqft)))} m²)
            </div>
          </div>
          <div>
            <div className="rs-label">Run space (minimum)</div>
            <div className="rs-value">
              {fmt(r1(runSqft))} sq ft ({fmt(r1(sqm(runSqft)))} m²)
            </div>
          </div>
        </div>
        <div className="result-note">
          <p>
            Duck eggs are bigger and richer than chicken eggs — bakers prize
            them — and one duck egg roughly replaces one large chicken egg in
            most recipes. Housing uses 4 sq ft of coop per duck; the run
            figure is the 10 sq ft minimum (15 is kinder — see the duck coop
            calculator).
          </p>
        </div>
        <GreenBlock
          items={[
            { label: "Duck hens needed", value: `${ducks}`, unit: "ducks" },
            {
              label: "Coop space",
              value: fmt(r1(coopSqft)),
              unit: "sq ft",
            },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          { label: "Ducks", value: `${ducks}`, headline: true },
          { label: "Coop", value: `${fmt(r1(coopSqft))} sq ft` },
          { label: "Run", value: `${fmt(r1(runSqft))} sq ft` },
        ]}
      />
    </div>
  );
}
