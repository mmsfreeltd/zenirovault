import Ticker from '@/components/common/trading-widget/Ticker';
import Screener from '@/components/common/trading-widget/Screener';
import AdvChart from '@/components/common/trading-widget/AdvChart';
import MobileNav from '@/components/user/dashboard-1/MobileNav';
import { SITE_NAME } from '@/global/constants';

export default function NewTradingDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Bar */}
      <div className="bg-background border-b border-border/90">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-primary">{SITE_NAME}</div>
          </div>
          <div className="items-center gap-6 text-sm hidden sm:flex">
            <span className="text-green-400">Account Status: Active</span>
            <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded text-black font-medium transition">
              Account Funding
            </button>
          </div>
          {/* Mobile Navgiation */}
          <MobileNav />
        </div>
      </div>

      {/* Navigation */}
      {/* <div className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="gap-8 text-gray-400 text-sm py-3 hidden sm:flex ">
            <a
              href="#"
              className="text-white font-medium border-b-2 border-purple-500 pb-3"
            >
              TRADING
            </a>
            <a href="#" className="hover:text-white">
              ACCOUNT
            </a>
            <a href="#" className="hover:text-white">
              STATEMENT
            </a>
            <a href="#" className="hover:text-white">
              SETTINGS
            </a>
            <a href="#" className="hover:text-white">
              DEMO TRADING
            </a>
            <a href="#" className="hover:text-white">
              CONTACT US
            </a>
          </div>
        </div>
      </div> */}

      {/* Account Summary Cards */}
      <div className="max-w-screen-2xl mx-auto px-1 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="shadow rounded-lg bg-white/80 dark:bg-white/60 p-4">
            <div className="text-foreground sm:text-xl text-md font-extrabold">
              Current Balance
            </div>
            <div className="text-2xl font-bold text-green-300">$8,928.00</div>
          </div>
          <div className="shadow rounded-lg bg-white/80 dark:bg-white/60 p-4">
            <div className="text-foreground sm:text-xl text-md font-extrabold">
              Bonus
            </div>
            <div className="text-2xl font-bold text-green-300">$0.00</div>
          </div>
          <div className="shadow rounded-lg bg-white/80 dark:bg-white/60 p-4">
            <div className="text-foreground sm:text-xl text-md font-extrabold">
              Active Deposit
            </div>
            <div className="text-2xl font-bold text-cyan-300">$10,100.00</div>
          </div>
          <div className="shadow rounded-lg bg-white/80 dark:bg-white/60 p-4">
            <div className="text-foreground sm:text-xl text-md font-extrabold">
              Profit Earned
            </div>
            <div className="text-2xl font-bold text-amber-300">$1,172.00</div>
          </div>
          <div className="shadow rounded-lg bg-white/80 dark:bg-white/60 p-4">
            <div className="text-foreground sm:text-xl text-md font-extrabold">
              Last Withdrawal
            </div>
            <div className="text-2xl font-bold text-red-300">$0.00</div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded">
            View More
          </button>
          <button className="bg-green-500 hover:bg-green-400 text-black font-medium px-6 py-3 rounded">
            Make Deposit
          </button>
        </div>
      </div>

      {/* Live Ticker */}
      <div className="bg-background border-y border-border py-3 overflow-x-auto">
        <Ticker />
      </div>

      {/* Main Trading Area */}
      <div className="max-w-screen-2xl py-5 sm:flex block">
        {/* Left Sidebar - Assets */}
        <div className="sm:w-1/4 bg-foreground border-border rounded-lg sm:block hidden">
          <Screener />
        </div>

        {/* Center - Chart */}
        <div className="sm:w-2/4 bg-background rounded-lg h-[500px] sm:h-auto">
          {/* Placeholder for actual chart */}
          <div className="bg-background rounded-lg h-full flex items-center justify-center border border-border">
            <AdvChart />
          </div>
        </div>

        {/* Right Panel - Trade Controls */}
        <div className="sm:w-1/4 sm:w-80 bg-background p-1 border border-border">
          <div>
            <div className="text-sm text-foreground mb-2">Option type</div>
            <select className="w-full bg-background text-foreground border border-border rounded px-4 py-3 ">
              <option>Turbo</option>
            </select>
          </div>

          <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-lg p-4 text-center my-2">
            <div className="text-4xl font-bold text-white">1.15470</div>
            <div className="text-sm opacity-90 text-white">
              Platform Time: 00:39:23
            </div>
          </div>

          <div className="sm:my-2 text-white">
            <div className="text-sm text-gray-400 mb-2">Expiration Time</div>
            <div className="bg-red-600 text-center py-3 rounded font-bold">
              00:38
            </div>
          </div>

          <div className="my-2 space-y-3 text-white">
            <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded font-bold text-lg">
              1 min
            </button>
            <input
              type="number"
              placeholder="Amount"
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-4 text-white text-center text-xl"
            />
          </div>

          <div className="flex gap-3 text-white">
            <button className="flex-1 bg-green-600 hover:bg-green-500 py-4 rounded font-bold text-xl">
              CALL
            </button>
            <button className="flex-1 bg-red-600 hover:bg-red-500 py-4 rounded font-bold text-xl">
              PUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
