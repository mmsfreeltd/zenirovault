import { AdvancedRealTimeChart } from '@/components/common/trading-widget';
import AssetList from '@/components/user/AssetList';
import UserTransactions from '@/components/user/common/user-transactions';
export default function TradingDashboard3() {
  return (
    <>
      <AssetList />
      <div className="h-96">
        <AdvancedRealTimeChart autosize />
      </div>
      <UserTransactions />
    </>
  );
}
