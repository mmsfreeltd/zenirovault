import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLiveProfitLoss } from '@/hooks/useLiveProfitLoss';
import { ClientType } from '@/types';
import { RollingText } from '@/components/ui/shadcn-io/rolling-text';

export default function AnimatedPL({
  planName,
  mainBalance,
  investmentBalance,
  client,
}: {
  mainBalance: number | null;
  investmentBalance: number | null;
  planName: string | null;
  client: ClientType | null;
}) {
  const { lossPercent, profitPercent } = useLiveProfitLoss();
  const profit = (mainBalance ?? 0) - (investmentBalance ?? 0);
  const fmt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: client!.currency!.toUpperCase() || 'USD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 2,
  });
  return (
    <div className="profit mt-4 bg-muted-foreground/10 p-2 py-4 rounded">
      <div className="flex justify-between items-center">
        <p className="font-extrabold text-2xl my-1">
          {fmt.format(Number(profit))}
        </p>
        <span className="bg-green-100 text-green-600 text-[10px] px-3 py-1 rounded font-medium">
          {planName}
        </span>
      </div>
      <div className="flex text-xs">
        <p className="font-medium">Total Earnings (Profit)</p>
        <span className="text-red-400 mx-2">
          <RollingText
            text={String(lossPercent) + '%'}
            inView={false}
            transition={{ duration: 0.3, delay: 0.08, ease: 'easeOut' }}
          />
        </span>
        <span className="text-green-600 mx-2">
          <RollingText
            text={String(profitPercent) + '%'}
            inView={false}
            transition={{ duration: 0.3, delay: 0.08, ease: 'easeOut' }}
          />
        </span>
      </div>
      <p className="text-xs my-2 text-green-500">
        Amount earned from active trade
      </p>
      <Progress value={Number(client?.tradeProgress)} />
      <p className="text-xs text-center mt-2">
        Trade Progress{' '}
        <Badge variant="outline" className="h-5 min-w-5 px-1 text-emerald-500">
          {client?.tradeProgress}%
        </Badge>
      </p>
    </div>
  );
}
