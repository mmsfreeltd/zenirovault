import ErrorBoundary from '@/components/user/ErrorBoundary';
import TradingDashboard2 from '@/components/user/dashboard-2/TradingDashboard2';
// import TradingDashboard3 from '@/components/user/dashboard-3/TradingDashboard3';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Dashboard',
};
export default async function UserHome() {
  return (
    <>
      <ErrorBoundary>
        {/* <NewTradingDashboard /> */}
        {/* <TradingDashboard3 /> */}
        <TradingDashboard2 />
      </ErrorBoundary>
    </>
  );
}
