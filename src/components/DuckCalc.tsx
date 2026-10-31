"use client";

import { useState } from "react";
import { fmt, num, r1, sqm } from "@/lib/math";
import PrintButton from "./PrintButton";

const SIZES = [
  { id: "light", label: "Light breeds — 3 sq ft (Runners, Campbell)", coop: 3 },
  { id: "standard", label: "Standard breeds — 4 sq ft (Pekin, Cayuga, Welsh Harlequin)", coop: 4 },
  { id: "heavy", label: "Heavy breeds — 5 sq ft (Muscovy, Aylesbury, Toulouse-sized)", coop: 5 },
] as const;

export default function DuckCalc() {
  const [ducksIn, setDucksIn] = useState("6");
  const [sizeId, setSizeId] = useState<(typeof SIZES)[number]["id"]>("standard");
  const [runId, setRunId] = useState("15");

  const ducks = num(ducksIn);
  const coopRate = SIZES.find((s) => s.id === sizeId)!.coop;
  const runRate = Number(runId);
  const coop = ducks * coopRate;
  const run = ducks * runRate;
  const boxes = Math.max(1, Math.ceil(ducks / 4));

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div>
          <div className="field">
            <label htmlFor="d-ducks">Number of ducks</label>
            <input
              id="d-ducks"
              type="number"
              min="1"
              value={ducksIn}
              onChange={(e) => setDucksIn(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="d-size">Duck size / breed type</label>
            <select
              id="d-size"
              value={sizeId}
              onChange={(e) => setSizeId(e.target.value as typeof sizeId)}
            >
              {SIZES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="d-run">Outdoor run space</label>
            <select id="d-run" value={runId} onChange={(e) => setRunId(e.target.value)}>
              <option value="10">Minimum — 10 sq ft per duck</option>
              <option value="15">Recommended — 15 sq ft per duck</option>
            </select>
          </div>
          <div className="result-note" style={{ marginTop: 4 }}>
            <strong>Ducks are not wet chickens.</strong> They sleep on the floor
            (no roosts), nest on the ground, and turn any water bowl into a
            splash zone — plan drainage and dry bedding space into the numbers
            on the right.
          </div>
        </div>

        <div className="result-panel" aria-live="polite">
          <h3>Your duck housing</h3>
          <p className="result-big">
            {fmt(r1(coop))} sq ft coop · {fmt(r1(run))} sq ft run
          </p>
          <div className="result-row">
            <span className="k">Coop space</span>
            <span className="v">
              {fmt(r1(coop))} sq ft ({fmt(r1(sqm(coop)))} m²)
            </span>
          </div>
          <div className="result-row">
            <span className="k">Run space</span>
            <span className="v">
              {fmt(r1(run))} sq ft ({fmt(r1(sqm(run)))} m²)
            </span>
          </div>
          <div className="result-row">
            <span className="k">Nesting boxes (ground level)</span>
            <span className="v">
              {boxes} {boxes === 1 ? "box" : "boxes"} (1 per 4 ducks)
            </span>
          </div>
          <div className="result-row">
            <span className="k">Roost bars needed</span>
            <span className="v">None — ducks sleep on bedding</span>
          </div>
          <ul className="tight" style={{ marginTop: 14, paddingLeft: 18 }}>
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
          <div className="btn-row">
            <PrintButton />
          </div>
        </div>
      </div>
    </div>
  );
}
