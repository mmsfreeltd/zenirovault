'use client';
import { useEffect, useState } from 'react';
export function useLiveProfitLoss() {
  const [lossPercent, setLossPercent] = useState(-10);
  const [profitPercent, setProfitPercent] = useState(40);
  const [progress, setProgress] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random loss between -15% and -5%
      setLossPercent(-(Math.random() * 10 + 5).toFixed(2));

      // Random profit between +20% and +70%
      setProfitPercent(Number((Math.random() * 50 + 20).toFixed(2)));

      // Random trade progress 30–90%
      setProgress(Math.floor(Math.random() * 60 + 30));
    }, 2000 + Math.random() * 1000); // 2–3 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    lossPercent: Number(lossPercent),
    profitPercent: Number(profitPercent),
    progress,
  };
}
