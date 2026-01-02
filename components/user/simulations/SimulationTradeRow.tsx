"use client";

import { SimulationTrade } from "@/types";

export function SimulationTradeRow({ trade }: { trade: SimulationTrade }) {
  const formatDate = (iso: string | null | undefined) =>
    iso ? new Date(iso).toLocaleString() : "—";

  const profit_loss = trade.profit_loss || 0;
  const trade_amount = trade.amount || 0;
  const entry_price = trade.entry_price || 0;

  return (
    <tr className="border-t">
      <td className="px-2 py-1">{trade.type}</td>
      <td className="px-2 py-1">
        {trade_amount.toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })}
      </td>
      <td className="px-2 py-1">
        {entry_price.toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
        })}
      </td>
      <td className="px-2 py-1">
        {trade.exit_price != null
          ? trade.exit_price.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })
          : "—"}
      </td>
      <td
        className={`px-2 py-1 ${
          profit_loss >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {profit_loss.toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
        })}
      </td>
      <td className="px-2 py-1 text-xs text-muted-foreground">
        {formatDate(String(trade.closed_at) || String(trade.opened_at))}
      </td>
    </tr>
  );
}
