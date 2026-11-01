"use client";

import { useState } from "react";
import { eggCost, fmt, money, num, r2 } from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import SliderField from "./SliderField";
import { GreenBlock } from "./Viz";

/** Donut of the monthly cost split: feed (violet) vs other costs (green). */
function CostDonut({ feed, extra }: { feed: number; extra: number }) {
  const total = feed + extra;
  const R = 52;
  const C = 2 * Math.PI * R;
  const feedShare = total > 0 ? feed / total : 0;
  const extraShare = total > 0 ? extra / total : 0;
  return (
    <div className="donut-wrap">
      <svg width="128" height="128" viewBox="0 0 128 128" role="img"
        aria-label={`Feed is ${Math.round(feedShare * 100)} percent of monthly cost`}>
        <circle cx="64" cy="64" r={R} fill="none" stroke="#e4def7" strokeWidth="15" />
        <circle
          cx="64" cy="64" r={R} fill="none" stroke="#7c3aed" strokeWidth="15"
          strokeDasharray={`${feedShare * C} ${C}`}
          transform="rotate(-90 64 64)" strokeLinecap="butt"
        />
        {extraShare > 0 ? (
          <circle
            cx="64" cy="64" r={R} fill="none" stroke="#4be07f" strokeWidth="15"
            strokeDasharray={`${extraShare * C} ${C}`}
            strokeDashoffset={-feedShare * C}
            transform="rotate(-90 64 64)" strokeLinecap="butt"
          />
        ) : null}
        <text x="64" y="62" textAnchor="middle" fontSize="23" fontWeight="800" fill="#16102e">
          {Math.round(feedShare * 100)}%
        </text>
        <text x="64" y="82" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#6b6785">
          feed
        </text>
      </svg>
      <div className="donut-legend">
        <div className="dl-row">
          <span className="prop-dot tone-violet" aria-hidden="true" />
          <span className="dl-k">Feed</span>
          <span className="dl-v">{money(r2(feed))} / month</span>
        </div>
        <div className="dl-row">
          <span className="prop-dot tone-green" aria-hidden="true" />
          <span className="dl-k">Other costs</span>
          <span className="dl-v">{money(r2(extra))} / month</span>
        </div>
        <div className="dl-row">
          <span className="dl-k" style={{ marginLeft: 19 }}>Total</span>
          <span className="dl-v">{money(r2(total))} / month</span>
        </div>
      </div>
    </div>
  );
}

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
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="e-hens"
          label="Number of hens"
          sliderLabel="Number of hens"
          value={hensIn}
          onChange={setHensIn}
          min={1}
          max={100}
        />
        <SliderField
          id="e-eggs"
          label="Eggs per hen, per week"
          sliderLabel="Eggs per hen, per week"
          value={eggsIn}
          onChange={setEggsIn}
          min={0}
          max={7}
          step={0.5}
        />
        <SliderField
          id="e-price"
          label="Feed bag price ($)"
          sliderLabel="Feed bag price in dollars"
          value={priceIn}
          onChange={setPriceIn}
          min={0}
          max={80}
          step={0.5}
          prefix="$"
          minLabel="$0"
          maxLabel="$80"
        />
        <SliderField
          id="e-weight"
          label="Bag weight (lb)"
          sliderLabel="Bag weight in pounds"
          value={weightIn}
          onChange={setWeightIn}
          min={0}
          max={100}
          step={1}
          suffix="lb"
        />
        <SliderField
          id="e-extra"
          label={
            <>
              Other monthly costs — bedding, treats, grit ($)
              <span className="hint">Optional. Leave at 0 for feed-only cost.</span>
            </>
          }
          sliderLabel="Other monthly costs in dollars"
          value={extraIn}
          onChange={setExtraIn}
          min={0}
          max={60}
          step={1}
          prefix="$"
          minLabel="$0"
          maxLabel="$60"
        />
        <SliderField
          id="e-store"
          label="Store price per dozen ($)"
          sliderLabel="Store price per dozen in dollars"
          value={storeIn}
          onChange={setStoreIn}
          min={0}
          max={15}
          step={0.25}
          prefix="$"
          minLabel="$0"
          maxLabel="$15"
        />
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your true cost per egg</p>
        <div className="result-hero">
          <div className="rh-label">Cost per egg</div>
          <div className="result-num">{money(r2(r.costPerEgg))}</div>
          <div className="result-metric">
            {money(r2(r.costPerDozen))} per dozen
          </div>
        </div>
        <CostDonut feed={r.feedCost} extra={num(extraIn)} />
        <div className="result-stats three">
          <div>
            <div className="rs-label">Feed used per month</div>
            <div className="rs-value">{fmt(r.monthlyFeedLb)} lb</div>
          </div>
          <div>
            <div className="rs-label">Total monthly cost</div>
            <div className="rs-value">{money(r2(r.totalMonthly))}</div>
          </div>
          <div>
            <div className="rs-label">Eggs per month</div>
            <div className="rs-value">about {fmt(Math.round(r.monthlyEggs))}</div>
          </div>
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
        <GreenBlock
          items={[
            { label: "Cost per dozen", value: money(r2(r.costPerDozen)) },
            { label: "Cost per egg", value: money(r2(r.costPerEgg)) },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          {
            label: "Per egg",
            value: money(r2(r.costPerEgg)),
            headline: true,
          },
          { label: "Per dozen", value: money(r2(r.costPerDozen)) },
          { label: "Per month", value: money(r2(r.totalMonthly)) },
        ]}
      />
    </div>
  );
}
