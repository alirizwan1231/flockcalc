"use client";

import { useEffect, useState } from "react";
import {
  INCUBATION_DAYS,
  fmtDateLong,
  fmtDateShort,
  hatchPlan,
  todayISO,
  type IncubationSpecies,
} from "@/lib/math";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import SegmentedControl from "./SegmentedControl";
import { GreenBlock } from "./Viz";

const SPECIES_SEGMENTS = (
  Object.keys(INCUBATION_DAYS) as IncubationSpecies[]
).map((id) => {
  const s = INCUBATION_DAYS[id];
  return {
    value: id,
    title: s.label,
    detail: `${s.days} days`,
  };
});

const DEFAULTS = { species: "chicken" as IncubationSpecies };

export default function HatchCalc() {
  const [species, setSpecies] = useState<IncubationSpecies>(DEFAULTS.species);
  const [setDate, setSetDate] = useState("");

  // Default to today, set after mount so the prerendered page and the
  // hydrated page agree (the server's "today" may differ from yours).
  useEffect(() => {
    setSetDate((d) => d || todayISO());
  }, []);

  const days = INCUBATION_DAYS[species].days;
  const plan = setDate ? hatchPlan(setDate, days) : null;

  function reset() {
    setSpecies(DEFAULTS.species);
    setSetDate(todayISO());
  }

  const summary = plan
    ? [
        `Hatch Date Calculator — FlockCalc (${INCUBATION_DAYS[species].label})`,
        `Eggs set: ${fmtDateLong(plan.set)}`,
        `Candle around day ${plan.candleDay}: ${fmtDateLong(plan.candle)}`,
        `Lockdown (stop turning): ${fmtDateLong(plan.lockdown)}`,
        `Hatch day: ${fmtDateLong(plan.hatch)}`,
      ].join("\n")
    : "Hatch Date Calculator — FlockCalc";

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <div className="field">
          <span className="field-label" id="hd-species-label">
            Species
          </span>
          <SegmentedControl
            id="hd-species"
            labelledBy="hd-species-label"
            options={SPECIES_SEGMENTS}
            value={species}
            onChange={(v) => setSpecies(v as IncubationSpecies)}
          />
        </div>
        <div className="field">
          <label htmlFor="hd-date">
            Date the eggs are set
            <span className="hint">
              Day 0 — the day eggs go into the incubator (or under the hen).
              Incubation counts full days from here.
            </span>
          </label>
          <input
            id="hd-date"
            type="date"
            value={setDate}
            onChange={(e) => setSetDate(e.target.value)}
          />
        </div>
        <div className="form-note">
          <p>
            {INCUBATION_DAYS[species].label} eggs take about{" "}
            <strong>{days} days</strong> at the correct temperature. Muscovy
            ducks are the famous exception at around 35 days, and bantam
            chicken eggs sometimes arrive a day early.
          </p>
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your hatch day</p>
        {plan ? (
          <>
            <div className="result-hero">
              <div className="rh-label">
                {INCUBATION_DAYS[species].label} hatch date
              </div>
              <p className="result-big-text">{fmtDateLong(plan.hatch)}</p>
              <div className="result-metric">
                {days} days after setting
              </div>
            </div>
            <div className="result-rows">
              <div className="rs-label">The milestones</div>
              <div className="result-row">
                <span className="k">Eggs set (day 0)</span>
                <span className="v">{fmtDateLong(plan.set)}</span>
              </div>
              <div className="result-row">
                <span className="k">Candle (day {plan.candleDay})</span>
                <span className="v">{fmtDateLong(plan.candle)}</span>
              </div>
              <div className="result-row">
                <span className="k">Lockdown (day {days - 3})</span>
                <span className="v">{fmtDateLong(plan.lockdown)}</span>
              </div>
              <div className="result-row">
                <span className="k">Hatch (day {days})</span>
                <span className="v">{fmtDateLong(plan.hatch)}</span>
              </div>
            </div>
            <div className="result-note">
              <p>
                <strong>Lockdown</strong> is the last three days: stop turning,
                raise humidity, and leave the incubator closed. Have the
                brooder warm and ready the day before hatch day — early birds
                are common.
              </p>
            </div>
            <GreenBlock
              items={[
                {
                  label: "Hatch date",
                  value: fmtDateShort(plan.hatch),
                },
                {
                  label: "Lockdown starts",
                  value: fmtDateShort(plan.lockdown),
                },
              ]}
            />
          </>
        ) : (
          <div className="result-note">
            <p>Pick the day your eggs are set to see the hatch date.</p>
          </div>
        )}
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={
          plan
            ? [
                {
                  label: "Hatch date",
                  value: fmtDateShort(plan.hatch),
                  headline: true,
                },
                { label: "Lockdown", value: fmtDateShort(plan.lockdown) },
                { label: "Candle", value: fmtDateShort(plan.candle) },
              ]
            : [
                { label: "Hatch date", value: "—", headline: true },
                { label: "Lockdown", value: "—" },
                { label: "Candle", value: "—" },
              ]
        }
      />
    </div>
  );
}
