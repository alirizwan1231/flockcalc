"use client";

import { useState } from "react";
import {
  BROODER_HEAT,
  brooderSpace,
  fmt,
  num,
  r1,
  sqm,
  type BrooderSpecies,
} from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import SegmentedControl from "./SegmentedControl";
import { GreenBlock } from "./Viz";

const SPECIES_SEGMENTS = [
  {
    value: "chicken",
    title: "Chicken chicks",
    detail: "0.5 sq ft at week 1, growing to 1 sq ft",
  },
  {
    value: "quail",
    title: "Quail chicks",
    detail: "0.25 sq ft at week 1, growing to 0.5 sq ft",
  },
];

const DEFAULTS = { chicks: "6", species: "chicken" as BrooderSpecies };

export default function BrooderCalc() {
  const [chicksIn, setChicksIn] = useState(DEFAULTS.chicks);
  const [species, setSpecies] = useState<BrooderSpecies>(DEFAULTS.species);

  const chicks = num(chicksIn);
  const plan = brooderSpace(chicks, species);
  const week1 = plan.weeks[0];

  function reset() {
    setChicksIn(DEFAULTS.chicks);
    setSpecies(DEFAULTS.species);
  }

  const summary = [
    "Brooder Size Calculator — FlockCalc",
    `Chicks: ${chicks} (${species === "chicken" ? "chicken" : "quail"})`,
    `Brooder at week 1: ${fmt(r1(week1.total))} sq ft`,
    `Final brooder size (week 6): ${fmt(r1(plan.finalTotal))} sq ft (${fmt(r1(sqm(plan.finalTotal)))} m²)`,
    ...plan.weeks.map(
      (w) => `Week ${w.week}: ${fmt(r1(w.total))} sq ft (${w.perBird} sq ft per chick)`
    ),
    `Heat: ${BROODER_HEAT[0].f}°F in week 1, dropping 5°F a week to ${BROODER_HEAT[BROODER_HEAT.length - 1].f}°F`,
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="bp-chicks"
          label="Number of chicks"
          sliderLabel="Number of chicks"
          value={chicksIn}
          onChange={setChicksIn}
          min={1}
          max={200}
        />
        <div className="field">
          <span className="field-label" id="bp-species-label">
            Chick type
          </span>
          <SegmentedControl
            id="bp-species"
            labelledBy="bp-species-label"
            options={SPECIES_SEGMENTS}
            value={species}
            onChange={(v) => setSpecies(v as BrooderSpecies)}
          />
        </div>
        <div className="form-note">
          <p>
            Chicks roughly <strong>double in size every couple of weeks</strong>,
            so a brooder that fits day-olds is crowded by week four. Plan the
            final size now — or plan a move to a bigger box at week 3 — rather
            than discovering it at 2 a.m. from the cheeping.
          </p>
        </div>
        <div className="form-note">
          <p>
            Heat starts at <strong>95 °F (35 °C)</strong> under the lamp in
            week 1 and drops about 5 °F a week. Chicks spread evenly = right
            temperature; huddled under the lamp = cold; pressed to the edges
            = too hot.
          </p>
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your brooder plan</p>
        <div className="result-hero">
          <div className="rh-label">Final brooder size (week 6)</div>
          <div className="result-num">
            {fmt(r1(plan.finalTotal))}
            <span className="unit"> sq ft</span>
          </div>
          <div className="result-metric">
            {fmt(r1(sqm(plan.finalTotal)))} m² · starts at{" "}
            {fmt(r1(week1.total))} sq ft in week 1
          </div>
        </div>
        <div className="result-rows">
          <div className="rs-label">Floor space week by week</div>
          {plan.weeks.map((w) => (
            <div className="result-row" key={w.week}>
              <span className="k">
                Week {w.week} ({fmt(w.perBird)} sq ft per chick)
              </span>
              <span className="v">{fmt(r1(w.total))} sq ft</span>
            </div>
          ))}
        </div>
        <div className="result-note">
          <p>
            A square or round brooder has no corners to pile into — corner
            pile-ups are a real chick killer in week 1. Whatever shape you
            use, keep feed and water at the cool edge, away from the lamp.
          </p>
        </div>
        <GreenBlock
          items={[
            {
              label: "Final size (week 6)",
              value: fmt(r1(plan.finalTotal)),
              unit: "sq ft",
            },
            {
              label: "Week 1 size",
              value: fmt(r1(week1.total)),
              unit: "sq ft",
            },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          {
            label: "Final size",
            value: `${fmt(r1(plan.finalTotal))} sq ft`,
            headline: true,
          },
          { label: "Week 1", value: `${fmt(r1(week1.total))} sq ft` },
          { label: "Heat wk 1", value: "95 °F" },
        ]}
      />
    </div>
  );
}
