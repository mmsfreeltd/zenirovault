'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ClientType } from '@/types';
import { useUser } from '@/context/UserContext';

export function TradeProgressAction({ client }: { client: ClientType }) {
  const [tradeProgress, setTradeProgress] = useState(
    client.tradeProgress || ''
  );
  const { updateClient } = useUser();
  const handleUpdate = () => {
    if (!tradeProgress) {
      toast.error('Please enter a valid number');
      return;
    }
    updateClient({ id: client.id, tradeProgress: tradeProgress });
    toast.success('trade progress updated successfully');
  };

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <label htmlFor="tradeProgress" className="text-sm font-medium">
        Trade Progress
      </label>
      <Input
        id="tradeProgress"
        type="number"
        placeholder="Enter new progress"
        value={tradeProgress}
        onChange={(e) => setTradeProgress(e.target.value)}
      />
      <Button
        variant="default"
        size="sm"
        className="w-full justify-start gap-2"
        onClick={handleUpdate}
      >
        <Wallet className="h-4 w-4 " />
        Update Trade Progress
      </Button>
    </div>
  );
}
