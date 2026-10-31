"use client";

import { useState } from "react";
import { eggCost, fmt, money, num, r2 } from "@/lib/math";
import PrintButton from "./PrintButton";

export default function EggCostCalc() {
  const [hensIn, setHensIn] = useState("6");
  const [eggsIn, setEggsIn] = useState("5");
  const [priceIn, setPriceIn] = useState("25");
  const [weightIn, setWeightIn] = useState("40");
  const [extraIn, setExtraIn] = useState("0");
  const [storeIn, setStoreIn] = useState("4");

  const r = eggCost({
    hens: num(hensIn),
    eggsPerHenWeek: num(eggsIn),
    bagPrice: num(priceIn),
    bagWeightLb: num(weightIn),
    extraMonthly: num(extraIn),
  });
  const storeDozen = num(storeIn);
  const diff = storeDozen - r.costPerDozen;
  const saving = diff >= 0;

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div>
          <div className="field">
            <label htmlFor="e-hens">Number of hens</label>
            <input
              id="e-hens"
              type="number"
              min="1"
              value={hensIn}
              onChange={(e) => setHensIn(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="e-eggs">Eggs per hen, per week</label>
            <input
              id="e-eggs"
              type="number"
              min="0"
              step="0.5"
              value={eggsIn}
              onChange={(e) => setEggsIn(e.target.value)}
            />
          </div>
          <div className="input-row">
            <div className="field">
              <label htmlFor="e-price">Feed bag price ($)</label>
              <input
                id="e-price"
                type="number"
                min="0"
                step="0.5"
                value={priceIn}
                onChange={(e) => setPriceIn(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="e-weight">Bag weight (lb)</label>
              <input
                id="e-weight"
                type="number"
                min="0"
                value={weightIn}
                onChange={(e) => setWeightIn(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="e-extra">
              Other monthly costs — bedding, treats, grit ($)
              <span className="hint">Optional. Leave at 0 for feed-only cost.</span>
            </label>
            <input
              id="e-extra"
              type="number"
              min="0"
              step="1"
              value={extraIn}
              onChange={(e) => setExtraIn(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="e-store">Store price per dozen ($)</label>
            <input
              id="e-store"
              type="number"
              min="0"
              step="0.25"
              value={storeIn}
              onChange={(e) => setStoreIn(e.target.value)}
            />
          </div>
        </div>

        <div className="result-panel" aria-live="polite">
          <h3>Your true cost per egg</h3>
          <p className="result-big">{money(r2(r.costPerEgg))} per egg</p>
          <div className="result-row">
            <span className="k">Cost per dozen</span>
            <span className="v">{money(r2(r.costPerDozen))}</span>
          </div>
          <div className="result-row">
            <span className="k">Feed used per month</span>
            <span className="v">{fmt(r.monthlyFeedLb)} lb</span>
          </div>
          <div className="result-row">
            <span className="k">Total monthly cost</span>
            <span className="v">{money(r2(r.totalMonthly))}</span>
          </div>
          <div className="result-row">
            <span className="k">Eggs per month</span>
            <span className="v">about {fmt(Math.round(r.monthlyEggs))}</span>
          </div>
          <div className="result-note">
            {r.monthlyEggs > 0 ? (
              <>
                Against a store price of {money(storeDozen)} a dozen, you{" "}
                <strong>
                  {saving ? "save" : "pay"} {money(Math.abs(r2(diff)))} more per
                  dozen
                </strong>{" "}
                {saving
                  ? "by keeping your own hens — before counting better taste."
                  : "for home eggs — most keepers say the taste, freshness and the hens themselves are worth it."}
              </>
            ) : (
              "Add at least one hen and one egg per week to see your cost."
            )}
          </div>
          <div className="btn-row">
            <PrintButton />
          </div>
        </div>
      </div>
    </div>
  );
}
