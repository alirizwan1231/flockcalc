"use client";

import { useState } from "react";
import {
  CHICKEN_FEED_RATES,
  chickenFeed,
  fmt,
  kg,
  money,
  num,
  r1,
  r2,
  type ChickenFeedStage,
} from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import SegmentedControl from "./SegmentedControl";
import SliderField from "./SliderField";
import { GreenBlock, RateBars } from "./Viz";

const STAGE_SEGMENTS = (
  Object.keys(CHICKEN_FEED_RATES) as ChickenFeedStage[]
).map((id) => {
  const s = CHICKEN_FEED_RATES[id];
  return { value: id, title: s.label, detail: s.detail };
});

const BAG_SEGMENTS = [
  { value: "40", title: "40 lb bag" },
  { value: "50", title: "50 lb bag" },
];

const DEFAULTS = {
  birds: "10",
  stage: "layers" as ChickenFeedStage,
  price: "22",
  bag: "50",
};

export default function ChickenFeedCalc() {
  const [birdsIn, setBirdsIn] = useState(DEFAULTS.birds);
  const [stage, setStage] = useState<ChickenFeedStage>(DEFAULTS.stage);
  const [priceIn, setPriceIn] = useState(DEFAULTS.price);
  const [bag, setBag] = useState(DEFAULTS.bag);

  const birds = num(birdsIn);
  const rate = CHICKEN_FEED_RATES[stage];
  const price = num(priceIn);
  const r = chickenFeed({
    birds,
    lbPerDay: rate.lbPerDay,
    bagPrice: price,
    bagWeightLb: num(bag),
  });
  const priced = price > 0;

  function reset() {
    setBirdsIn(DEFAULTS.birds);
    setStage(DEFAULTS.stage);
    setPriceIn(DEFAULTS.price);
    setBag(DEFAULTS.bag);
  }

  const summary = [
    "Chicken Feed Calculator — FlockCalc",
    `Birds: ${birds} (${rate.label.toLowerCase()}, ${rate.lbPerDay} lb/day each)`,
    `Feed per day: ${fmt(r1(r.perDayLb))} lb (${fmt(kg(r.perDayLb))} kg)`,
    `Feed per week: ${fmt(r1(r.perWeekLb))} lb`,
    `Feed per month: ${fmt(r1(r.perMonthLb))} lb (${fmt(kg(r.perMonthLb))} kg)`,
    `Bags per month (${bag} lb): ${fmt(r1(r.bagsPerMonth))}`,
    ...(priced
      ? [`Estimated feed cost: ${money(r2(r.monthlyCost))} per month`]
      : []),
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="cf-birds"
          label="Number of chickens"
          sliderLabel="Number of chickens"
          value={birdsIn}
          onChange={setBirdsIn}
          min={1}
          max={500}
        />
        <div className="field">
          <span className="field-label" id="cf-stage-label">
            Age / stage
          </span>
          <SegmentedControl
            id="cf-stage"
            labelledBy="cf-stage-label"
            options={STAGE_SEGMENTS}
            value={stage}
            onChange={(v) => setStage(v as ChickenFeedStage)}
          />
        </div>
        <SliderField
          id="cf-price"
          label={
            <>
              Feed bag price ($)
              <span className="hint">
                Optional — set to $0 if you only want amounts, not costs.
              </span>
            </>
          }
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
        <div className="field">
          <span className="field-label" id="cf-bag-label">
            Bag size
          </span>
          <SegmentedControl
            id="cf-bag"
            labelledBy="cf-bag-label"
            options={BAG_SEGMENTS}
            value={bag}
            onChange={setBag}
          />
        </div>
        <div className="form-note">
          <p>
            A laying hen eats about <strong>0.25 lb (110 g) of feed a
            day</strong> — the standard planning figure. Free-range birds with
            good forage may eat a little less bought feed in summer; cold
            weather pushes intake up.
          </p>
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your feed bill of fare</p>
        <div className="result-hero">
          <div className="rh-label">Feed per day</div>
          <div className="result-num">
            {fmt(r1(r.perDayLb))}
            <span className="unit"> lb</span>
          </div>
          <div className="result-metric">
            {fmt(kg(r.perDayLb))} kg · {rate.lbPerDay} lb per bird
          </div>
        </div>
        <RateBars
          rows={[
            {
              label: "Per day",
              value: r.perDayLb,
              display: `${fmt(r1(r.perDayLb))} lb`,
            },
            {
              label: "Per week",
              value: r.perWeekLb,
              display: `${fmt(r1(r.perWeekLb))} lb`,
            },
            {
              label: "Per month",
              value: r.perMonthLb,
              display: `${fmt(r1(r.perMonthLb))} lb`,
              highlight: true,
            },
          ]}
        />
        <div className="result-stats">
          <div>
            <div className="rs-label">Bags per month ({bag} lb)</div>
            <div className="rs-value">{fmt(r1(r.bagsPerMonth))} bags</div>
          </div>
          <div>
            <div className="rs-label">Feed per month</div>
            <div className="rs-value">
              {fmt(r1(r.perMonthLb))} lb ({fmt(kg(r.perMonthLb))} kg)
            </div>
          </div>
        </div>
        {priced ? (
          <div className="result-note">
            <p>
              At {money(price)} a bag, that is about{" "}
              <strong>{money(r2(r.monthlyCost))} a month</strong> in feed —{" "}
              {money(r2(r.monthlyCost * 12))} a year. Feed is the biggest
              running cost of a flock, so this is the number your egg costs
              hang on.
            </p>
          </div>
        ) : (
          <div className="result-note">
            <p>
              Add a bag price on the left to turn these amounts into a monthly
              feed cost.
            </p>
          </div>
        )}
        <GreenBlock
          items={[
            {
              label: "Feed per day",
              value: fmt(r1(r.perDayLb)),
              unit: "lb",
            },
            {
              label: "Feed per month",
              value: fmt(r1(r.perMonthLb)),
              unit: "lb",
            },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          {
            label: "Feed / day",
            value: `${fmt(r1(r.perDayLb))} lb`,
            headline: true,
          },
          { label: "Per month", value: `${fmt(r1(r.perMonthLb))} lb` },
          { label: "Bags / mo", value: fmt(r1(r.bagsPerMonth)) },
        ]}
      />
    </div>
  );
}
