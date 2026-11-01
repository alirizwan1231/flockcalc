"use client";

import { useState } from "react";
import { fmt, num, r1, sqm } from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import SegmentedControl from "./SegmentedControl";
import { GreenBlock, PropBar } from "./Viz";

const SIZES = [
  { id: "light", label: "Light breeds — 3 sq ft (Runners, Campbell)", coop: 3 },
  { id: "standard", label: "Standard breeds — 4 sq ft (Pekin, Cayuga, Welsh Harlequin)", coop: 4 },
  { id: "heavy", label: "Heavy breeds — 5 sq ft (Muscovy, Aylesbury, Toulouse-sized)", coop: 5 },
] as const;

type SizeId = (typeof SIZES)[number]["id"];

const SIZE_SEGMENTS = SIZES.map((s) => {
  const [title, detail] = s.label.split(" — ");
  return { value: s.id, title, detail };
});

const RUN_SEGMENTS = [
  { value: "10", title: "Minimum", detail: "10 sq ft per duck" },
  { value: "15", title: "Recommended", detail: "15 sq ft per duck" },
];

const DEFAULTS = { ducks: "6", size: "standard" as SizeId, run: "15" };

export default function DuckCalc() {
  const [ducksIn, setDucksIn] = useState(DEFAULTS.ducks);
  const [sizeId, setSizeId] = useState<SizeId>(DEFAULTS.size);
  const [runId, setRunId] = useState(DEFAULTS.run);

  const ducks = num(ducksIn);
  const coopRate = SIZES.find((s) => s.id === sizeId)!.coop;
  const runRate = Number(runId);
  const coop = ducks * coopRate;
  const run = ducks * runRate;
  const boxes = Math.max(1, Math.ceil(ducks / 4));

  function reset() {
    setDucksIn(DEFAULTS.ducks);
    setSizeId(DEFAULTS.size);
    setRunId(DEFAULTS.run);
  }

  const summary = [
    "Duck Coop Size Calculator — FlockCalc",
    `Number of ducks: ${ducks}`,
    `Coop space: ${fmt(r1(coop))} sq ft (${fmt(r1(sqm(coop)))} m²)`,
    `Run space: ${fmt(r1(run))} sq ft (${fmt(r1(sqm(run)))} m²)`,
    `Nesting boxes (ground level): ${boxes} ${boxes === 1 ? "box" : "boxes"} (1 per 4 ducks)`,
    "Roost bars needed: None — ducks sleep on bedding",
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="d-ducks"
          label="Number of ducks"
          sliderLabel="Number of ducks"
          value={ducksIn}
          onChange={setDucksIn}
          min={1}
          max={50}
        />
        <div className="field">
          <span className="field-label" id="d-size-label">
            Duck size / breed type
          </span>
          <SegmentedControl
            id="d-size"
            labelledBy="d-size-label"
            options={SIZE_SEGMENTS}
            value={sizeId}
            onChange={(v) => setSizeId(v as SizeId)}
          />
        </div>
        <div className="field">
          <span className="field-label" id="d-run-label">
            Outdoor run space
          </span>
          <SegmentedControl
            id="d-run"
            labelledBy="d-run-label"
            options={RUN_SEGMENTS}
            value={runId}
            onChange={setRunId}
          />
        </div>
        <div className="form-note">
          <p>
            <strong>Ducks are not wet chickens.</strong> They sleep on the floor
            (no roosts), nest on the ground, and turn any water bowl into a
            splash zone — plan drainage and dry bedding space into the numbers
            on the right.
          </p>
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your duck housing</p>
        <div className="result-hero-grid">
          <div className="result-hero">
            <div className="rh-label">Coop space</div>
            <div className="result-num">
              {fmt(r1(coop))}
              <span className="unit"> sq ft</span>
            </div>
            <div className="result-metric">{fmt(r1(sqm(coop)))} m²</div>
          </div>
          <div className="result-hero">
            <div className="rh-label">Run space</div>
            <div className="result-num">
              {fmt(r1(run))}
              <span className="unit"> sq ft</span>
            </div>
            <div className="result-metric">{fmt(r1(sqm(run)))} m²</div>
          </div>
        </div>
        <div className="result-stats">
          <div>
            <div className="rs-label">Nesting boxes (ground level)</div>
            <div className="rs-value">
              {boxes} {boxes === 1 ? "box" : "boxes"}
            </div>
          </div>
          <div>
            <div className="rs-label">Roost bars needed</div>
            <div className="rs-value">None — ducks sleep on bedding</div>
          </div>
        </div>
        <PropBar
          segments={[
            {
              label: "Coop",
              value: coop,
              display: `${fmt(r1(coop))} sq ft`,
              tone: "violet",
            },
            {
              label: "Run",
              value: run,
              display: `${fmt(r1(run))} sq ft`,
              tone: "green",
            },
          ]}
        />
        <div className="result-note">
          <ul className="tight">
            <li>
              <strong>Water splash zone:</strong> keep drinkers on a wire or
              gravel patch outside the sleeping area, or bedding turns to soup.
            </li>
            <li>
              <strong>Ground nesting:</strong> a quiet corner with deep straw is
              enough; ducks rarely use raised boxes.
            </li>
            <li>
              <strong>Swimming water is optional</strong> — ducks need deep
              water to clean their bills and eyes, not a pond.
            </li>
          </ul>
        </div>
        <GreenBlock
          items={[
            { label: "Coop space needed", value: fmt(r1(coop)), unit: "sq ft" },
            { label: "Run space needed", value: fmt(r1(run)), unit: "sq ft" },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          {
            label: "Coop",
            value: `${fmt(r1(coop))} sq ft`,
            headline: true,
          },
          { label: "Run", value: `${fmt(r1(run))} sq ft` },
          {
            label: "Nesting boxes",
            value: `${boxes} ${boxes === 1 ? "box" : "boxes"}`,
          },
        ]}
      />
    </div>
  );
}
