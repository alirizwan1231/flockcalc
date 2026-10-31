"use client";

import { useMemo, useState } from "react";
import { fmt, num, r1, sqm } from "@/lib/math";
import PrintButton from "./PrintButton";

const RATES = [
  { id: "minimum", label: "Minimum — 0.75 sq ft per bird", rate: 0.75 },
  { id: "standard", label: "Standard — 1 sq ft per bird (recommended)", rate: 1 },
  { id: "roomy", label: "Roomy — 1.25 sq ft per bird", rate: 1.25 },
] as const;

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

export default function QuailCalc() {
  const [birdsIn, setBirdsIn] = useState("12");
  const [purpose, setPurpose] = useState("layers");
  const [comfort, setComfort] = useState<(typeof RATES)[number]["id"]>("standard");
  const [lenIn, setLenIn] = useState("4");
  const [widIn, setWidIn] = useState("2");

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

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div>
          <h3>Plan a new cage or coop</h3>
          <div className="field">
            <label htmlFor="q-birds">Number of quail</label>
            <input
              id="q-birds"
              type="number"
              min="1"
              inputMode="numeric"
              value={birdsIn}
              onChange={(e) => setBirdsIn(e.target.value)}
            />
          </div>
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
            <label htmlFor="q-comfort">Space per bird</label>
            <select
              id="q-comfort"
              value={comfort}
              onChange={(e) => setComfort(e.target.value as typeof comfort)}
            >
              {RATES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <h3 style={{ marginTop: 26 }}>Already have a cage?</h3>
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
            <strong>{rev.find((x) => x.label === "standard")!.birds} quail</strong>{" "}
            at the standard rate ({rev.find((x) => x.label === "minimum")!.birds}{" "}
            at minimum, {rev.find((x) => x.label === "roomy")!.birds} at roomy).
          </p>
        </div>

        <div className="result-panel" aria-live="polite">
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
              <h3 style={{ marginTop: 16 }}>Cage sizes that fit</h3>
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
          <div className="result-note">
            <strong>Ceiling height matters with quail.</strong> Quail flush
            straight up when startled. Keep cages low (about 12 inches / 30 cm)
            so they cannot build up speed, or go tall like an aviary (6 ft /
            1.8 m or more) so they can fly up and settle. Mid-height coops
            around 2–4 ft are where head injuries happen.
          </div>
          <div className="btn-row">
            <PrintButton />
          </div>
        </div>
      </div>
    </div>
  );
}
