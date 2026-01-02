import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copy Trading',
};
export default function CopyTrading() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Copy Trading
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              It’s all in the name! Copy trading allows you to directly copy the
              positions taken by another trader. You decide the amount you wish
              to invest and simply copy everything they do automatically in
              real-time. When that trader makes a trade, your account makes the
              same trade.
            </p>

            <p>
              You do not need to have any input on the trades, and you get
              identical returns on each trade as your chosen trader. By copying
              another trader, you can potentially make money based on their
              skills. No advanced financial market knowledge is required.
            </p>

            <p>
              Copy Trading is both a product and a service. We cater to traders
              and investors looking to capitalize on cryptocurrency trading by
              allowing investors to follow expert traders seamlessly.
            </p>

            <p>
              After years of trading traditional markets and cryptocurrencies,
              we realized that account segregation and investor control were
              essential. Existing solutions didn’t allow direct trade copying,
              so we decided to build our own.
            </p>

            <p>
              Despite many challenges, we continue refining and improving the
              service daily—actively connecting traders and investors for mutual
              benefit in crypto trading.
            </p>

            <p>
              Copy trading dates back to 2005, when traders copied automated
              algorithms. Over time, this evolved into platforms allowing direct
              account linking. The popularity of copy trading has since
              exploded.
            </p>

            <p className="font-medium text-gray-900 dark:text-white">
              1 in 3 investors say traditional stock trading is over-complex,
              and 1 in 4 considered copy trading last year.
            </p>

            {/* How It Works */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How the Copier Works
              </h2>

              <p>
                As an investor, you simply select one or more experts to copy.
                Once signed up, no further action is required. Our software
                automatically mirrors trades on your behalf.
              </p>

              <p>
                When an expert opens a trade, we calculate all required
                parameters and execute the same trade in your account. When the
                expert exits, you exit automatically.
              </p>

              <p>
                You only need to ensure sufficient funds are available. For
                example, if an expert allocates 10% of their portfolio, your
                account will allocate the same percentage.
              </p>

              <p>
                To avoid missed trades, you must meet exchange minimum order
                sizes (e.g., ~$10 per trade) and maintain adequate base currency
                balance.
              </p>
            </div>

            {/* Experts */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Who Are the Experts?
              </h2>

              <p>
                We carefully select expert traders by reviewing their
                performance history and market experience. Many already have
                established followings, providing additional social proof.
              </p>

              <p>
                Each expert has a dedicated performance page where you can
                review their trading history before deciding to follow them.
              </p>
            </div>

            {/* Allocation */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Trade Allocation
              </h2>

              <p>
                The copier works on a percentage basis. If your expert places a
                trade using 5% of their portfolio, your account will mirror that
                same percentage allocation.
              </p>

              <p>
                You can adjust allocations at any time, giving you full control
                while benefiting from automated execution.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
