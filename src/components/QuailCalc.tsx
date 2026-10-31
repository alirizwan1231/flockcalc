"use client";

import { useMemo, useState } from "react";
import { fmt, num, r1, sqm } from "@/lib/math";
import CountField from "./CountField";
import ResultActions from "./ResultActions";
import SegmentedControl from "./SegmentedControl";

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
    <div className="calc-card">
      <div className="calc-mode">
        <SegmentedControl
          id="q-mode"
          ariaLabel="Calculator mode"
          options={MODE_SEGMENTS}
          value={mode}
          onChange={setMode}
        />
      </div>

      <div className="calc-grid">
        <div>
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
              <div className="input-row">
                <div className="field">
                  <label htmlFor="q-len">Cage length (ft)</label>
                  <input
                    id="q-len"
                    type="number"
                    min="0"
                    step="0.5"
                    value={lenIn}
                    onChange={(e) => setLenIn(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="q-wid">Cage width (ft)</label>
                  <input
                    id="q-wid"
                    type="number"
                    min="0"
                    step="0.5"
                    value={widIn}
                    onChange={(e) => setWidIn(e.target.value)}
                  />
                </div>
              </div>
              <p style={{ margin: 0 }}>
                That cage is <strong>{fmt(revArea)} sq ft</strong> (
                {fmt(r1(sqm(revArea)))} m²) and fits about{" "}
                <strong>{revStandard} quail</strong> at the standard rate (
                {revMinimum} at minimum, {revRoomy} at roomy).
              </p>
            </>
          )}
        </div>

        <div className="result-panel" aria-live="polite">
          {mode === "forward" ? (
            <>
              <h3>Your quail need</h3>
              <p className="result-big">
                {fmt(r1(needed))} sq ft of floor space
              </p>
              <div className="result-row">
                <span className="k">In metric</span>
                <span className="v">{fmt(r1(sqm(needed)))} m²</span>
              </div>
              <div className="result-row">
                <span className="k">Per bird</span>
                <span className="v">{rate} sq ft</span>
              </div>
              {fitting.length > 0 ? (
                <>
                  <h3 className="result-subhead">Cage sizes that fit</h3>
                  {fitting.map((c) => (
                    <div className="result-row" key={`${c.l}x${c.w}`}>
                      <span className="k">
                        {c.l} × {c.w} ft cage ({c.area} sq ft)
                      </span>
                      <span className="v">up to {c.fits} quail</span>
                    </div>
                  ))}
                </>
              ) : (
                <p>
                  Your flock needs more room than a standard single cage — look at a
                  walk-in aviary or split the covey across two cages.
                </p>
              )}
            </>
          ) : (
            <>
              <h3>Your cage fits</h3>
              <p className="result-big">about {revStandard} quail</p>
              <div className="result-row">
                <span className="k">Cage floor area</span>
                <span className="v">
                  {fmt(revArea)} sq ft ({fmt(r1(sqm(revArea)))} m²)
                </span>
              </div>
              <div className="result-row">
                <span className="k">At the standard rate</span>
                <span className="v">{revStandard} quail</span>
              </div>
              <div className="result-row">
                <span className="k">At minimum</span>
                <span className="v">{revMinimum} quail</span>
              </div>
              <div className="result-row">
                <span className="k">At roomy</span>
                <span className="v">{revRoomy} quail</span>
              </div>
            </>
          )}
          <div className="result-note">
            <strong>Ceiling height matters with quail.</strong> Quail flush
            straight up when startled. Keep cages low (about 12 inches / 30 cm)
            so they cannot build up speed, or go tall like an aviary (6 ft /
            1.8 m or more) so they can fly up and settle. Mid-height coops
            around 2–4 ft are where head injuries happen.
          </div>
          <ResultActions summary={summary} onReset={reset} />
        </div>
      </div>
    </div>
  );
}
