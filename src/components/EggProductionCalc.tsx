"use client";

import { useState } from "react";
import {
  LAYING_PRESETS,
  eggProduction,
  fmt,
  num,
  r1,
  type LayingPresetId,
} from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import SegmentedControl from "./SegmentedControl";
import SliderField from "./SliderField";
import { GreenBlock, PropBar } from "./Viz";

const PRESET_SEGMENTS = [
  ...LAYING_PRESETS.map((p) => ({
    value: p.id as string,
    title: p.label,
    detail: p.detail.replace("About ", "≈ "),
  })),
  { value: "custom", title: "Custom", detail: "Set your own rate below" },
];

const DEFAULTS = {
  hens: "10",
  preset: "standard" as LayingPresetId,
  custom: "4",
};

export default function EggProductionCalc() {
  const [hensIn, setHensIn] = useState(DEFAULTS.hens);
  const [preset, setPreset] = useState<LayingPresetId>(DEFAULTS.preset);
  const [customIn, setCustomIn] = useState(DEFAULTS.custom);

  const hens = num(hensIn);
  const rate =
    preset === "custom"
      ? num(customIn)
      : (LAYING_PRESETS.find((p) => p.id === preset)?.eggsPerWeek ?? 0);
  const r = eggProduction(hens, rate);

  const fullDozens = Math.floor(r.perWeek / 12) * 12;
  const looseEggs = r.perWeek - fullDozens;

  function reset() {
    setHensIn(DEFAULTS.hens);
    setPreset(DEFAULTS.preset);
    setCustomIn(DEFAULTS.custom);
  }

  const summary = [
    "Egg Production Calculator — FlockCalc",
    `Hens: ${hens}`,
    `Laying rate: ${rate} eggs per hen per week`,
    `Eggs per week: ${fmt(r1(r.perWeek))} (about ${fmt(r1(r.dozensPerWeek))} dozen)`,
    `Eggs per month: about ${fmt(Math.round(r.perMonth))}`,
    `Eggs per year: about ${fmt(Math.round(r.perYear))}`,
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="ep-hens"
          label="Number of laying hens"
          sliderLabel="Number of laying hens"
          value={hensIn}
          onChange={setHensIn}
          min={1}
          max={100}
        />
        <div className="field">
          <span className="field-label" id="ep-rate-label">
            Laying rate
          </span>
          <SegmentedControl
            id="ep-rate"
            labelledBy="ep-rate-label"
            options={PRESET_SEGMENTS}
            value={preset}
            onChange={(v) => setPreset(v as LayingPresetId)}
          />
        </div>
        {preset === "custom" ? (
          <SliderField
            id="ep-custom"
            label="Eggs per hen, per week"
            sliderLabel="Eggs per hen, per week"
            value={customIn}
            onChange={setCustomIn}
            min={1}
            max={7}
            step={0.5}
          />
        ) : null}
        <div className="form-note">
          <p>
            Rates are <strong>laying-season averages</strong>. Even the best
            layers pause for moulting and short winter days, so a yearly
            average usually lands a little below the spring peak — pick the
            preset that matches your breed honestly.
          </p>
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your egg harvest</p>
        <div className="result-hero">
          <div className="rh-label">Eggs per week</div>
          <div className="result-num">
            {fmt(r1(r.perWeek))}
            <span className="unit"> eggs</span>
          </div>
          <div className="result-metric">
            about {fmt(r1(r.dozensPerWeek))} dozen a week
          </div>
        </div>
        <PropBar
          segments={[
            {
              label: "Full dozens",
              value: fullDozens,
              display: `${fmt(fullDozens)} eggs`,
              tone: "violet",
            },
            {
              label: "Loose eggs",
              value: looseEggs,
              display: `${fmt(r1(looseEggs))} eggs`,
              tone: "green",
            },
          ]}
        />
        <div className="result-stats">
          <div>
            <div className="rs-label">Eggs per month</div>
            <div className="rs-value">about {fmt(Math.round(r.perMonth))}</div>
          </div>
          <div>
            <div className="rs-label">Eggs per year</div>
            <div className="rs-value">about {fmt(Math.round(r.perYear))}</div>
          </div>
        </div>
        <div className="result-note">
          <p>
            That is roughly <strong>{fmt(Math.round(r.perYear / 12))} dozen a
            year</strong> from {hens} hens. Want to know what each egg costs to
            produce? Pair this with the cost per egg calculator — production
            is only half the story.
          </p>
        </div>
        <GreenBlock
          items={[
            {
              label: "Eggs per week",
              value: fmt(r1(r.perWeek)),
              unit: "eggs",
            },
            {
              label: "Dozens per week",
              value: fmt(r1(r.dozensPerWeek)),
            },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          {
            label: "Eggs / week",
            value: fmt(r1(r.perWeek)),
            headline: true,
          },
          { label: "Per month", value: `≈ ${fmt(Math.round(r.perMonth))}` },
          { label: "Per year", value: `≈ ${fmt(Math.round(r.perYear))}` },
        ]}
      />
    </div>
  );
}
