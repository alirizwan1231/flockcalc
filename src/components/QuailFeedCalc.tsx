"use client";

import { useState } from "react";
import {
  QUAIL_BAG_KG,
  QUAIL_FEED_RATES,
  fmt,
  money,
  num,
  quailFeed,
  r1,
  r2,
  type QuailFeedStage,
} from "@/lib/math";
import CountField from "./CountField";
import MobileResultBar from "./MobileResultBar";
import ResultActions from "./ResultActions";
import { InputsHead } from "./CalcChrome";
import SegmentedControl from "./SegmentedControl";
import SliderField from "./SliderField";
import { GreenBlock, RateBars } from "./Viz";

const STAGE_SEGMENTS = (
  Object.keys(QUAIL_FEED_RATES) as QuailFeedStage[]
).map((id) => {
  const s = QUAIL_FEED_RATES[id];
  return { value: id, title: s.label, detail: s.detail };
});

const DEFAULTS = {
  birds: "20",
  stage: "adults" as QuailFeedStage,
  price: "0",
};

export default function QuailFeedCalc() {
  const [birdsIn, setBirdsIn] = useState(DEFAULTS.birds);
  const [stage, setStage] = useState<QuailFeedStage>(DEFAULTS.stage);
  const [priceIn, setPriceIn] = useState(DEFAULTS.price);

  const birds = num(birdsIn);
  const rate = QUAIL_FEED_RATES[stage];
  const price = num(priceIn);
  const r = quailFeed({ birds, gPerDay: rate.gPerDay, bagPrice: price });
  const priced = price > 0;

  function reset() {
    setBirdsIn(DEFAULTS.birds);
    setStage(DEFAULTS.stage);
    setPriceIn(DEFAULTS.price);
  }

  const summary = [
    "Quail Feed Calculator — FlockCalc",
    `Quail: ${birds} (${rate.label.toLowerCase()}, ${rate.gPerDay} g/day each)`,
    `Feed per day: ${fmt(r.perDayG)} g (${fmt(r1(r.perDayLb))} lb)`,
    `Feed per month: ${fmt(r1(r.perMonthKg))} kg (${fmt(r1(r.perMonthLb))} lb)`,
    `Bags per month (50 lb / ${QUAIL_BAG_KG} kg): ${fmt(r1(r.bagsPerMonth))}`,
    ...(priced
      ? [`Estimated feed cost: ${money(r2(r.monthlyCost))} per month`]
      : []),
  ].join("\n");

  return (
    <div className="workbench">
      <div className="calc-inputs">
        <InputsHead />
        <CountField
          id="qf-birds"
          label="Number of quail"
          sliderLabel="Number of quail"
          value={birdsIn}
          onChange={setBirdsIn}
          min={1}
          max={1000}
        />
        <div className="field">
          <span className="field-label" id="qf-stage-label">
            Age / stage
          </span>
          <SegmentedControl
            id="qf-stage"
            labelledBy="qf-stage-label"
            options={STAGE_SEGMENTS}
            value={stage}
            onChange={(v) => setStage(v as QuailFeedStage)}
          />
        </div>
        <SliderField
          id="qf-price"
          label={
            <>
              Feed bag price ($)
              <span className="hint">
                Optional — price of a 50 lb (22.7 kg) bag. Leave at $0 for
                amounts only.
              </span>
            </>
          }
          sliderLabel="Feed bag price in dollars"
          value={priceIn}
          onChange={setPriceIn}
          min={0}
          max={60}
          step={0.5}
          prefix="$"
          minLabel="$0"
          maxLabel="$60"
        />
        <div className="form-note">
          <p>
            Quail feed is measured in grams, not handfuls: an adult Coturnix
            eats roughly <strong>20–25 g a day</strong> of a high-protein game
            bird feed. Spilled feed counts too — quail are enthusiastic
            scratchers even in cages, so feeder design changes the real
            number.
          </p>
        </div>
      </div>

      <div className="result-panel" aria-live="polite">
        <p className="kicker">Your quail feed</p>
        <div className="result-hero">
          <div className="rh-label">Feed per day</div>
          <div className="result-num">
            {fmt(r.perDayG)}
            <span className="unit"> g</span>
          </div>
          <div className="result-metric">
            {fmt(r1(r.perDayLb))} lb · {rate.gPerDay} g per bird
          </div>
        </div>
        <RateBars
          rows={[
            {
              label: "Per day",
              value: r.perDayG,
              display: `${fmt(r.perDayG)} g`,
            },
            {
              label: "Per week",
              value: r.perDayG * 7,
              display: `${fmt(r.perDayG * 7)} g`,
            },
            {
              label: "Per month",
              value: r.perDayG * 30,
              display: `${fmt(r1(r.perMonthKg))} kg`,
              highlight: true,
            },
          ]}
        />
        <div className="result-stats">
          <div>
            <div className="rs-label">Feed per month</div>
            <div className="rs-value">
              {fmt(r1(r.perMonthKg))} kg ({fmt(r1(r.perMonthLb))} lb)
            </div>
          </div>
          <div>
            <div className="rs-label">Bags per month</div>
            <div className="rs-value">{fmt(r1(r.bagsPerMonth))} bags</div>
          </div>
        </div>
        {priced ? (
          <div className="result-note">
            <p>
              At {money(price)} a bag, feed runs about{" "}
              <strong>{money(r2(r.monthlyCost))} a month</strong> for this
              covey — one reason quail are the cheapest laying birds most
              people can keep.
            </p>
          </div>
        ) : (
          <div className="result-note">
            <p>
              A 50 lb bag lasts this covey roughly{" "}
              <strong>
                {r.bagsPerMonth > 0
                  ? `${fmt(r1(1 / r.bagsPerMonth))} months`
                  : "—"}
              </strong>
              . Add a bag price on the left to see the monthly cost.
            </p>
          </div>
        )}
        <GreenBlock
          items={[
            { label: "Feed per day", value: fmt(r.perDayG), unit: "g" },
            {
              label: "Feed per month",
              value: fmt(r1(r.perMonthKg)),
              unit: "kg",
            },
          ]}
        />
        <ResultActions summary={summary} onReset={reset} />
      </div>
      <MobileResultBar
        items={[
          {
            label: "Feed / day",
            value: `${fmt(r.perDayG)} g`,
            headline: true,
          },
          { label: "Per month", value: `${fmt(r1(r.perMonthKg))} kg` },
          { label: "Bags / mo", value: fmt(r1(r.bagsPerMonth)) },
        ]}
      />
    </div>
  );
}
