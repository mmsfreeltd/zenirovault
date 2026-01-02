import { Button } from '@/components/ui/button';
import { Dot, EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Stats({
  mainBalance,
  currency = '',
}: {
  mainBalance: number | null;
  currency: string | null;
}) {
  const [visible, setVisible] = useState(false);

  const fmt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency!.toUpperCase() || 'USD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 2,
  });

  function toggleVisible() {
    setVisible(!visible);
  }
  return (
    <div className="stats">
      <p className="flex items-center text-xs">
        <span>Portfolio Balance</span>
        <Button size="sm" variant="link" onClick={toggleVisible}>
          {visible ? (
            <EyeOff size={14} className="mx-2 cursor-pointer" />
          ) : (
            <EyeIcon size={14} className="mx-2 cursor-pointer" />
          )}
        </Button>
      </p>
      <p className="font-extrabold text-4xl my-1">
        {visible ? fmt.format(Number(mainBalance)) ?? 0 : '********'}
      </p>
      <p className="text-xs text-green-500 flex items-center">
        <Dot size={17} />
        <span>Total Withdrawable Balance</span>
      </p>
    </div>
  );
}
