'use client';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AssetBox from './ui/asset-box';
import { Particles } from '@/components/ui/shadcn-io/particles';
import Stats from './ui/stats';
import { useAccountSummary } from '@/hooks/useAccountSummary';
import AnimatedPL from './ui/AnimatedPL';

export default function TradingDashboard2() {
  const { assets, client, mainBalance, accountType, investmentBalance } =
    useAccountSummary();

  if (!client) {
    return;
  }
  return (
    <div className="sm:w-2/3 border border-border rounded sm:mx-auto p-4">
      <header className="flex justify-center py-4 border-b mb-4">
        <div>
          <p className="flex items-center">
            <span className="text-2xl font-bold capitalize mx-1">
              {client.username}
            </span>
            <CheckCircle2 size={20} className="text-primary" />
          </p>
        </div>
      </header>
      <Stats mainBalance={mainBalance} currency={client.currency} />
      <div className="nav grid grid-cols-3 gap-3 py-4 border-b">
        <Link
          href="/user/deposit"
          className="bg-muted-foreground/20 text-center p-2"
        >
          Deposit
        </Link>
        <Link
          href="/user/withdraw"
          className="bg-muted-foreground/20 text-center p-2"
        >
          Withdrawal
        </Link>
        <Link
          href="/user/account"
          className="bg-muted-foreground/20 text-center p-2"
        >
          Profile
        </Link>
      </div>

      <AnimatedPL
        planName={accountType}
        mainBalance={mainBalance}
        investmentBalance={investmentBalance}
        client={client}
      />

      <div className="assets my-4 grid grid-cols-2 gap-4">
        {/* <AssetBox
          Icon={Wallet}
          amount={`${client.currency} ${mainBalance ?? '-'}`}
          title="Active Deposit"
          subTitle="Total Deposit made"
          colorClass="text-blue-500"
        /> */}
        {assets &&
          assets.map((asset) => (
            <AssetBox
              key={asset.id}
              icon={asset.coin_logo}
              amount={`${asset.amount}`}
              title={asset.coin_name}
              subTitle={`Total ${asset.coin_name} balance`}
              colorClass="text-blue-500"
              coinId={asset.coin_api_id}
              currency={client.currency ?? ''}
            />
          ))}
      </div>

      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        staticity={50}
        color="#ccc"
        size={0.8}
      />
    </div>
  );
}
