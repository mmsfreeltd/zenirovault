import { useState, useCallback } from "react";
import axios from "axios";
import { Simulation, SimulationTrade } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useSimulation(userId: string) {
  const [sims, setSims] = useState<Simulation[]>([]);
  const [trades, setTrades] = useState<SimulationTrade[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const loadSims = useCallback(async () => {
    const res = await axios.get<Simulation[]>("/api/user/simulations");
    setSims(res.data);
  }, []);

  const loadTrades = useCallback(async (simId: number) => {
    const res = await axios.get<SimulationTrade[]>(
      `/api/user/simulations/${simId}/trades`
    );
    setTrades(res.data);
  }, []);

  const recordTrade = useCallback(
    async (
      simId: number,
      params: {
        coin_id: string;
        type: "Buy" | "Sell";
        amount: number;
        entry_price: number;
        exit_price: number;
        profit_loss: number;
      }
    ) => {
      setIsRecording(true);
      const res = await axios.post<SimulationTrade>(
        `/api/user/simulations/${simId}/trades`,
        params
      );
      setTrades((t) => [res.data, ...t]);
      setIsRecording(false);
      return res.data;
    },
    []
  );

  return {
    sims,
    trades,
    loadSims,
    loadTrades,
    recordTrade,
    isRecording,
  };
}
