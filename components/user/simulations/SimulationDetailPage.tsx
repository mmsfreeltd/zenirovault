"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSimulation } from "@/hooks/useSimulation";
import {
  randomOutcome,
  monteCarlo,
  randomWalk,
  userScenario,
  stairStepMomentum,
  thresholdBounce,
} from "@/lib/simulations";
import { Simulation } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { SimulationTradeRow } from "@/components/user/simulations/SimulationTradeRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SimulationDetailPage() {
  const { id } = useParams();
  const simId = Number(id);
  const { sims, loadSims, trades, loadTrades, recordTrade, isRecording } =
    useSimulation("");

  const [sim, setSim] = useState<Simulation>();
  const [amount, setAmount] = useState(0);
  const [strategy, setStrategy] = useState<
    "rand" | "walk" | "mc" | "scenario" | "stairMoment" | "threshold"
  >("rand");
  const [userPct, setUserPct] = useState(0);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const paginatedTrades = trades.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(trades.length / pageSize);

  useEffect(() => {
    loadSims();
    loadTrades(simId);
  }, [loadSims, loadTrades, simId, isRecording]);

  useEffect(() => {
    setSim(sims.find((x) => x.id === simId));
  }, [sims, simId]);

  const run = async () => {
    if (!sim) return;
    let exit = 0;
    let pnl = 0;

    switch (strategy) {
      case "rand":
        ({ exit, pnl } = randomOutcome(sim.current_balance));
        break;
      case "walk":
        ({ exit, pnl } = randomWalk(amount));
        break;
      case "mc":
        ({ exit, pnl } = monteCarlo(amount));
        break;
      case "scenario":
        ({ exit, pnl } = userScenario(amount, userPct / 100));
        break;
      case "threshold":
        ({ exit, pnl } = thresholdBounce(amount));
        break;
      case "stairMoment":
        ({ exit, pnl } = stairStepMomentum(amount));
        break;
      default:
        throw new Error(`Unknown strategy: ${strategy}`);
    }

    await recordTrade(simId, {
      coin_id: "btc-bitcoin",
      type: "Buy",
      amount,
      entry_price: sim.current_balance,
      exit_price: exit,
      profit_loss: pnl,
    });

    await loadSims();
  };

  return (
    <Card className="p-6 space-y-6">
      <CardHeader>
        <CardTitle>{sim?.name}</CardTitle>
        <div className="text-muted-foreground">
          Balance: {sim?.current_balance.toFixed(2)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Stake Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Stake amount"
          />
        </div>

        <div className="space-y-2">
          <Label>Strategy</Label>
          <Select
            value={strategy}
            onValueChange={(value) => setStrategy(value as typeof strategy)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rand">Random</SelectItem>
              <SelectItem value="walk">Random Walk</SelectItem>
              <SelectItem value="mc">Monte Carlo</SelectItem>
              <SelectItem value="stairMoment">Stair Momentum</SelectItem>
              <SelectItem value="threshold">Threshold Bounce</SelectItem>
              <SelectItem value="scenario">User Scenario</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {strategy === "scenario" && (
          <div className="space-y-2">
            <Label>Percent Change</Label>
            <Input
              type="number"
              value={userPct}
              onChange={(e) => setUserPct(Number(e.target.value))}
              placeholder="% change"
            />
          </div>
        )}

        <Button onClick={run} disabled={isRecording}>
          {isRecording ? (
            <Loader className="animate-spin w-4 h-4" />
          ) : (
            "Run Trade"
          )}
        </Button>

        <div className="pt-6 space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Entry</TableHead>
                <TableHead>Exit</TableHead>
                <TableHead>P/L</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isRecording ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Loader className="animate-spin" />
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTrades.map((t) => (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <SimulationTradeRow key={Number(t.id)} trade={t as any} />
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex justify-end items-center gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </Button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
