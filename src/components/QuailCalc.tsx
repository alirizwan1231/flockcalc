"use client";

import { useMemo, useState } from "react";
import { fmt, num, r1, sqm } from "@/lib/math";
import CountField from "./CountField";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import SegmentedControl from "./SegmentedControl";
import SliderField from "./SliderField";
import { GreenBlock, RateBars } from "./Viz";

const RATES = [
  { id: "minimum", label: "Minimum — 0.75 sq ft per bird", rate: 0.75 },
  { id: "standard", label: "Standard — 1 sq ft per bird (recommended)", rate: 1 },
  { id: "roomy", label: "Roomy — 1.25 sq ft per bird", rate: 1.25 },
] as const;

type ComfortId = (typeof RATES)[number]["id"];

const COMFORT_SEGMENTS = RATES.map((r) => {
  const [title, detail] = r.label.split(" — ");
  return { value: r.id, title, detail };
});

const MODE_SEGMENTS = [
  { value: "forward", title: "Plan a new cage or coop" },
  { value: "reverse", title: "Already have a cage?" },
];

const CAGES = [
  { l: 2, w: 3 },
  { l: 2, w: 4 },
  { l: 2, w: 6 },
  { l: 3, w: 4 },
  { l: 3, w: 6 },
  { l: 4, w: 4 },
  { l: 4, w: 6 },
  { l: 4, w: 8 },
];

const DEFAULTS = {
  birds: "12",
  purpose: "layers",
  comfort: "standard" as ComfortId,
  len: "4",
  wid: "2",
};

export default function QuailCalc() {
  const [mode, setMode] = useState("forward");
  const [birdsIn, setBirdsIn] = useState(DEFAULTS.birds);
  const [purpose, setPurpose] = useState(DEFAULTS.purpose);
  const [comfort, setComfort] = useState<ComfortId>(DEFAULTS.comfort);
  const [lenIn, setLenIn] = useState(DEFAULTS.len);
  const [widIn, setWidIn] = useState(DEFAULTS.wid);

  const rate = RATES.find((r) => r.id === comfort)!.rate;
  const birds = num(birdsIn);
  const needed = birds * rate;

  const fitting = useMemo(
    () =>
      CAGES.map((c) => ({ ...c, area: c.l * c.w, fits: Math.floor(c.l * c.w / rate) }))
        .filter((c) => c.area >= needed)
        .slice(0, 4),
    [needed, rate]
  );

  const revArea = num(lenIn) * num(widIn);
  const rev = RATES.map((r) => ({
    label: r.id,
    birds: Math.floor(revArea / r.rate),
  }));
  const revStandard = rev.find((x) => x.label === "standard")!.birds;
  const revMinimum = rev.find((x) => x.label === "minimum")!.birds;
  const revRoomy = rev.find((x) => x.label === "roomy")!.birds;

  function reset() {
    setBirdsIn(DEFAULTS.birds);
    setPurpose(DEFAULTS.purpose);
    setComfort(DEFAULTS.comfort);
    setLenIn(DEFAULTS.len);
    setWidIn(DEFAULTS.wid);
  }

  const summary =
    mode === "forward"
      ? [
          "Quail Coop Size Calculator — FlockCalc",
          `Number of quail: ${birds}`,
          `Space per bird: ${rate} sq ft`,
          `Floor space needed: ${fmt(r1(needed))} sq ft (${fmt(r1(sqm(needed)))} m²)`,
          ...(fitting.length > 0
            ? [
                "Cage sizes that fit: " +
                  fitting
                    .map((c) => `${c.l} × ${c.w} ft (up to ${c.fits} quail)`)
                    .join("; "),
              ]
            : []),
        ].join("\n")
      : [
          "Quail Coop Size Calculator (reverse mode) — FlockCalc",
          `Cage: ${num(lenIn)} × ${num(widIn)} ft = ${fmt(revArea)} sq ft (${fmt(r1(sqm(revArea)))} m²)`,
          `Fits about ${revStandard} quail at the standard rate (${revMinimum} at minimum, ${revRoomy} at roomy)`,
        ].join("\n");

  return (
    <div className="calc">
      <SegmentedControl
        id="q-mode"
        ariaLabel="Calculator mode"
        options={MODE_SEGMENTS}
        value={mode}
        onChange={setMode}
      />

      <div className="workbench">
        <div className="calc-inputs">
        <InputsHead />
          {mode === "forward" ? (
            <>
              <CountField
                id="q-birds"
                label="Number of quail"
                sliderLabel="Number of quail"
                value={birdsIn}
                onChange={setBirdsIn}
                min={1}
                max={100}
              />
              <div className="field">
                <label htmlFor="q-purpose">
                  Purpose
                  <span className="hint">
                    For your own planning only — floor space per bird is the same;
                    breeding groups just need extra hiding spots.
                  </span>
                </label>
                <select
                  id="q-purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                >
                  <option value="layers">Egg layers</option>
                  <option value="breeding">Breeding</option>
                  <option value="meat">Meat birds</option>
                  <option value="pets">Pets / hobby</option>
                </select>
              </div>
              <div className="field">
                <span className="field-label" id="q-comfort-label">
                  Space per bird
                </span>
                <SegmentedControl
                  id="q-comfort"
                  labelledBy="q-comfort-label"
                  options={COMFORT_SEGMENTS}
                  value={comfort}
                  onChange={(v) => setComfort(v as ComfortId)}
                />
              </div>
            </>
          ) : (
            <>
              <SliderField
                id="q-len"
                label="Cage length (ft)"
                sliderLabel="Cage length in feet"
                value={lenIn}
                onChange={setLenIn}
                min={0}
                max={12}
                step={0.5}
                suffix="ft"
              />
              <SliderField
                id="q-wid"
                label="Cage width (ft)"
                sliderLabel="Cage width in feet"
                value={widIn}
                onChange={setWidIn}
                min={0}
                max={12}
                step={0.5}
                suffix="ft"
              />
              <div className="form-note">
                <p>
                  That cage is <strong>{fmt(revArea)} sq ft</strong> (
                  {fmt(r1(sqm(revArea)))} m²) and fits about{" "}
                  <strong>{revStandard} quail</strong> at the standard rate (
                  {revMinimum} at minimum, {revRoomy} at roomy).
                </p>
              </div>
            </>
          )}
        </div>

        <div className="result-panel" aria-live="polite">
          {mode === "forward" ? (
            <>
              <p className="kicker">Your quail need</p>
              <div className="result-hero">
                <div className="rh-label">Floor space</div>
                <div className="result-num">
                  {fmt(r1(needed))}
                  <span className="unit"> sq ft</span>
                </div>
                <div className="result-metric">
                  {fmt(r1(sqm(needed)))} m² · {rate} sq ft per bird
                </div>
              </div>
              {fitting.length > 0 ? (
                <div className="result-chips">
                  <div className="rs-label">Cage sizes that fit</div>
                  <div>
                    {fitting.map((c) => (
                      <span className="chip" key={`${c.l}x${c.w}`}>
                        {c.l} × {c.w} ft — up to {c.fits} quail
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="result-note">
                  <p>
                    Your flock needs more room than a standard single cage —
                    look at a walk-in aviary or split the covey across two
                    cages.
                  </p>
                </div>
              )}
              <RateBars
                rows={RATES.map((r) => ({
                  label: r.id === "minimum" ? "Minimum" : r.id === "standard" ? "Standard" : "Roomy",
                  value: birds * r.rate,
                  display: `${fmt(r1(birds * r.rate))} sq ft`,
                  highlight: r.id === "standard",
                }))}
              />
              <GreenBlock
                items={[
                  {
                    label: "Floor space needed",
                    value: fmt(r1(needed)),
                    unit: "sq ft",
                  },
                  {
                    label: "In metric",
                    value: fmt(r1(sqm(needed))),
                    unit: "m²",
                  },
                ]}
              />
            </>
          ) : (
            <>
              <p className="kicker">Your cage fits</p>
              <div className="result-hero">
                <div className="rh-label">At the standard rate</div>
                <div className="result-num">
                  {revStandard}
                  <span className="unit"> quail</span>
                </div>
                <div className="result-metric">
                  Cage floor {fmt(revArea)} sq ft ({fmt(r1(sqm(revArea)))} m²)
                </div>
              </div>
              <div className="result-stats">
                <div>
                  <div className="rs-label">At minimum</div>
                  <div className="rs-value">{revMinimum} quail</div>
                </div>
                <div>
                  <div className="rs-label">At roomy</div>
                  <div className="rs-value">{revRoomy} quail</div>
                </div>
              </div>
              <RateBars
                rows={[
                  { label: "Minimum", value: revMinimum, display: `${revMinimum} quail` },
                  { label: "Standard", value: revStandard, display: `${revStandard} quail`, highlight: true },
                  { label: "Roomy", value: revRoomy, display: `${revRoomy} quail` },
                ]}
              />
              <GreenBlock
                items={[
                  {
                    label: "Your cage fits",
                    value: `${revStandard}`,
                    unit: "quail",
                  },
                  {
                    label: "Cage floor",
                    value: fmt(revArea),
                    unit: "sq ft",
                  },
                ]}
              />
            </>
          )}
          <div className="result-note">
            <p>
              <strong>Ceiling height matters with quail.</strong> Quail flush
              straight up when startled. Keep cages low (about 12 inches / 30 cm)
              so they cannot build up speed, or go tall like an aviary (6 ft /
              1.8 m or more) so they can fly up and settle. Mid-height coops
              around 2–4 ft are where head injuries happen.
            </p>
          </div>
          <ResultActions summary={summary} onReset={reset} />
        </div>
      </div>
    </div>
  );
}
