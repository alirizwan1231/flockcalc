"use client";

import { useState } from "react";
import { eggCost, fmt, money, num, r2 } from "@/lib/math";
import CountField from "./CountField";
import ResultActions from "./ResultActions";

const DEFAULTS = {
  hens: "6",
  eggs: "5",
  price: "25",
  weight: "40",
  extra: "0",
  store: "4",
};

export default function EggCostCalc() {
  const [hensIn, setHensIn] = useState(DEFAULTS.hens);
  const [eggsIn, setEggsIn] = useState(DEFAULTS.eggs);
  const [priceIn, setPriceIn] = useState(DEFAULTS.price);
  const [weightIn, setWeightIn] = useState(DEFAULTS.weight);
  const [extraIn, setExtraIn] = useState(DEFAULTS.extra);
  const [storeIn, setStoreIn] = useState(DEFAULTS.store);

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

  function reset() {
    setHensIn(DEFAULTS.hens);
    setEggsIn(DEFAULTS.eggs);
    setPriceIn(DEFAULTS.price);
    setWeightIn(DEFAULTS.weight);
    setExtraIn(DEFAULTS.extra);
    setStoreIn(DEFAULTS.store);
  }

  const summary = [
    "Cost Per Egg Calculator — FlockCalc",
    `Cost per egg: ${money(r2(r.costPerEgg))}`,
    `Cost per dozen: ${money(r2(r.costPerDozen))}`,
    `Feed used per month: ${fmt(r.monthlyFeedLb)} lb`,
    `Total monthly cost: ${money(r2(r.totalMonthly))}`,
    `Eggs per month: about ${fmt(Math.round(r.monthlyEggs))}`,
  ].join("\n");

  return (
    <div className="workbench">
      <div>
        <CountField
          id="e-hens"
          label="Number of hens"
          sliderLabel="Number of hens"
          value={hensIn}
          onChange={setHensIn}
          min={1}
          max={100}
        />
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
            <div className="input-affix">
              <span className="affix affix-pre" aria-hidden="true">
                $
              </span>
              <input
                id="e-price"
                type="number"
                min="0"
                step="0.5"
                value={priceIn}
                onChange={(e) => setPriceIn(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="e-weight">Bag weight (lb)</label>
            <div className="input-affix">
              <input
                id="e-weight"
                type="number"
                min="0"
                value={weightIn}
                onChange={(e) => setWeightIn(e.target.value)}
              />
              <span className="affix affix-post" aria-hidden="true">
                lb
              </span>
            </div>
          </div>
        </div>
        <div className="field">
          <label htmlFor="e-extra">
            Other monthly costs — bedding, treats, grit ($)
            <span className="hint">Optional. Leave at 0 for feed-only cost.</span>
          </label>
          <div className="input-affix">
            <span className="affix affix-pre" aria-hidden="true">
              $
            </span>
            <input
              id="e-extra"
              type="number"
              min="0"
              step="1"
              value={extraIn}
              onChange={(e) => setExtraIn(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="e-store">Store price per dozen ($)</label>
          <div className="input-affix">
            <span className="affix affix-pre" aria-hidden="true">
              $
            </span>
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
          <p>
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
          </p>
        </div>
        <ResultActions summary={summary} onReset={reset} />
      </div>
    </div>
  );
}
