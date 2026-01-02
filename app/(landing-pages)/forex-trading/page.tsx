import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forex Trading',
};

export default function ForexTrading() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Forex Trading
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Intro */}
            <p>
              Forex is short for foreign exchange. The forex market is where
              currencies are traded, making it the largest and most liquid
              financial market in the world. As of 2019, it recorded an average
              daily turnover of approximately $6.6 trillion.
            </p>

            <p>
              Forex trading is based on fluctuations in exchange rates. Traders
              speculate on currency pair price movements and earn profits from
              the difference between buying and selling prices.
            </p>

            {/* Margin */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What Is Margin?
              </h2>

              <p>
                Margin is the amount of funds required to open a new trading
                position. It is calculated based on trade size, which is
                measured in lots.
              </p>

              <p className="mt-3">
                A standard lot equals 100,000 units. We also support:
              </p>

              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Mini lots – 10,000 units</li>
                <li>Micro lots – 1,000 units</li>
                <li>Nano lots – 100 units</li>
              </ul>

              <p className="mt-3">
                Larger lots require higher margin. Margin allows traders to use
                leverage, enabling positions larger than their actual capital.
              </p>
            </div>

            {/* Leverage */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What Is Leverage?
              </h2>

              <p>
                Leverage allows traders to open positions larger than the
                capital they possess by borrowing funds from a broker.
              </p>

              <p className="mt-3">
                For example, a leverage ratio of 1:100 means that a trader with
                $1,000 can control a position worth $100,000.
              </p>

              <p className="mt-3">
                While leverage can amplify potential gains, it also increases
                potential losses, making risk management essential.
              </p>
            </div>

            {/* Market Hours */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                When Is the Forex Market Open?
              </h2>

              <p>
                The forex market operates 24 hours a day due to overlapping
                global time zones. Trading begins at 5:00 p.m. EST on Sunday and
                closes at 4:00 p.m. EST on Friday, excluding holidays.
              </p>

              <p className="mt-3">
                Markets open sequentially across regions—starting in
                Australasia, followed by Europe, and then North America—ensuring
                continuous trading opportunities.
              </p>

              <p className="mt-3">
                This round-the-clock accessibility is one of the key reasons
                forex trading attracts millions of traders worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
