"use client";

import { useState } from "react";
import Link from "next/link";
import { chickenSpace, fmt, num, r1, sqm } from "@/lib/math";
import PrintButton from "./PrintButton";

const RATES = [
  { id: "6", label: "Heavy layer — about 6 eggs/week (e.g. ISA Brown, Leghorn)" },
  { id: "5", label: "Average layer — about 5 eggs/week (most backyard breeds)" },
  { id: "4", label: "Light / heritage — about 4 eggs/week" },
] as const;

export default function HensCalc() {
  const [peopleIn, setPeopleIn] = useState("4");
  const [eggsIn, setEggsIn] = useState("5");
  const [rateId, setRateId] = useState<(typeof RATES)[number]["id"]>("5");

  const people = num(peopleIn);
  const eggsPerPerson = num(eggsIn);
  const rate = Number(rateId);

  const weeklyNeeded = people * eggsPerPerson;
  const hensNeeded = rate > 0 ? Math.ceil(weeklyNeeded / rate) : 0;
  const recommended = hensNeeded > 0 ? hensNeeded + 1 : 0;
  const dozenPerWeek = (recommended * rate) / 12;
  const space = chickenSpace(recommended, "standard");

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div>
          <div className="field">
            <label htmlFor="h-people">People in your household</label>
            <input
              id="h-people"
              type="number"
              min="1"
              value={peopleIn}
              onChange={(e) => setPeopleIn(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="h-eggs">
              Eggs eaten per person, per week
              <span className="hint">
                Count breakfasts, baking and cooking. The average person eats
                roughly 5 eggs a week.
              </span>
            </label>
            <input
              id="h-eggs"
              type="number"
              min="0"
              value={eggsIn}
              onChange={(e) => setEggsIn(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="h-rate">How well your hens will lay</label>
            <select
              id="h-rate"
              value={rateId}
              onChange={(e) => setRateId(e.target.value as typeof rateId)}
            >
              {RATES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <p>
            Your household needs about <strong>{fmt(weeklyNeeded)} eggs a week</strong>{" "}
            ({fmt((weeklyNeeded * 52) / 12)} dozen a year).
          </p>
        </div>

        <div className="result-panel" aria-live="polite">
          <h3>Your flock size</h3>
          <p className="result-big">{hensNeeded} hens minimum</p>
          <div className="result-row">
            <span className="k">Recommended (with buffer hen)</span>
            <span className="v">{recommended} hens</span>
          </div>
          <div className="result-row">
            <span className="k">Expected eggs</span>
            <span className="v">{fmt(recommended * rate)} / week</span>
          </div>
          <div className="result-row">
            <span className="k">That is about</span>
            <span className="v">{fmt(dozenPerWeek, 2)} dozen / week</span>
          </div>
          <div className="result-row">
            <span className="k">Coop space for {recommended} hens</span>
            <span className="v">
              {fmt(r1(space.coopSqft))} sq ft ({fmt(r1(sqm(space.coopSqft)))} m²)
            </span>
          </div>
          <div className="result-row">
            <span className="k">Run space</span>
            <span className="v">
              {fmt(r1(space.runSqft))} sq ft ({fmt(r1(sqm(space.runSqft)))} m²)
            </span>
          </div>
          <div className="result-note">
            <strong>Why the extra hen?</strong> Hens stop laying while moulting,
            go broody in spring, and slow down in winter. One buffer hen keeps
            eggs coming through all of it — most keepers are glad they added her.
          </div>
          <div className="btn-row">
            <PrintButton />
            <Link className="btn btn-primary" href="/chicken-coop-size-calculator">
              Plan the coop for {recommended} hens →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
