// import { randomNormal } from "some-stat-lib"; // or roll your own
import { standardDeviation, mean } from "simple-statistics";

// 1) Pure Random: win/loss 50/50 at market price move ±p%
export function randomOutcome(
  entry: number,
  takeProfitPct = 0.02,
  stopLossPct = 0.02
): { exit: number; pnl: number } {
  const up = Math.random() < 0.5;
  const move = up ? entry * (1 + takeProfitPct) : entry * (1 - stopLossPct);
  return { exit: move, pnl: move - entry };
}

// 2) Random Walk / Monte Carlo step (simplified)
export function randomWalk(
  entry: number,
  steps = 10,
  volatility = 0.01
): { exit: number; pnl: number } {
  let price = entry;
  for (let i = 0; i < steps; i++) {
    const change = (Math.random() - 0.5) * 2 * volatility;
    price *= 1 + change;
  }
  return { exit: price, pnl: price - entry };
}

// 3) Monte Carlo: average of many randomWalk
export function monteCarlo(
  entry: number,
  trials = 100,
  steps = 10,
  vol = 0.01
): { exit: number; pnl: number } {
  let sum = 0;
  for (let i = 0; i < trials; i++) {
    sum += randomWalk(entry, steps, vol).exit;
  }
  const avg = sum / trials;
  return { exit: avg, pnl: avg - entry };
}

// 4) User‐scenario: caller supplies pct move
export function userScenario(
  entry: number,
  pctMove: number
): { exit: number; pnl: number } {
  const exit = entry * (1 + pctMove);
  return { exit, pnl: exit - entry };
}

export function smartVolatilityWalk(
  entry: number,
  history: number[] = [100, 102, 101, 103, 104],
  steps = 10
): { exit: number; pnl: number } {
  const avg = mean(history);
  const vol = standardDeviation(history) / avg; // relative volatility

  let price = entry;
  for (let i = 0; i < steps; i++) {
    const change = (Math.random() - 0.5) * 2 * vol;
    price *= 1 + change;
  }

  return { exit: price, pnl: price - entry };
}

export function exponentialDrift(
  entry: number,
  baseGrowth = 0.002,
  driftSteps = 20
): { exit: number; pnl: number } {
  let price = entry;
  for (let i = 0; i < driftSteps; i++) {
    const growth = baseGrowth + (Math.random() - 0.5) * baseGrowth;
    price *= 1 + growth;
  }
  return { exit: price, pnl: price - entry };
}

export function breakoutStrategy(
  entry: number,
  resistanceMultiplier = 1.02,
  breakoutMove = 0.03
): { exit: number; pnl: number } {
  const resistance = entry * resistanceMultiplier;
  const hitResistance = Math.random() < 0.4; // 40% chance breakout

  const exit = hitResistance
    ? resistance * (1 + breakoutMove)
    : entry * (1 - 0.01);
  return { exit, pnl: exit - entry };
}

export function thresholdBounce(
  entry: number,
  mean = 1.0,
  bounceRange = 0.02,
  steps = 15
): { exit: number; pnl: number } {
  let price = entry;
  for (let i = 0; i < steps; i++) {
    const deviation = price / entry - mean;
    const force = -Math.sign(deviation) * bounceRange;
    const noise = (Math.random() - 0.5) * 0.01;
    price *= 1 + force + noise;
  }
  return { exit: price, pnl: price - entry };
}

export function stairStepMomentum(
  entry: number,
  stepSize = 0.01,
  maxSteps = 5
): { exit: number; pnl: number } {
  const direction = Math.random() < 0.5 ? -1 : 1;
  const steps = Math.floor(Math.random() * maxSteps) + 1;
  const move = direction * stepSize * steps;

  const exit = entry * (1 + move);
  return { exit, pnl: exit - entry };
}
