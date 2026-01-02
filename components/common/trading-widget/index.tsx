"use client";
import dynamic from "next/dynamic";
export const Ticker = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.Ticker),
  { ssr: false }
);

export const AdvancedRealTimeChart = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
  { ssr: false }
);

export const MiniChart = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.MiniChart),
  { ssr: false }
);

export const SymbolInfo = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.SymbolInfo),
  { ssr: false }
);
