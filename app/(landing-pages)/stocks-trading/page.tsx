import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stocks Trading',
};

export default function StocksTrading() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Stocks Trading
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Intro */}
            <p>
              A CFD, or Contract for Difference, is a financial instrument that
              allows you to trade on the price movements of stocks, whether
              prices are rising or falling. The key advantage of CFDs is the
              ability to speculate on price movements without owning the
              underlying asset.
            </p>

            <p>
              Stock trading has existed since the 17th century, when the Dutch
              East India Company first introduced publicly traded shares. Since
              then, it has remained one of the most effective investment options
              for individuals and families.
            </p>

            {/* What Are Stocks */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What Are Stocks?
              </h2>

              <p>
                Stocks—also known as equities or shares—are issued by public
                corporations as a way to raise capital and fuel business growth.
                The first sale of shares is called an Initial Public Offering
                (IPO). After the IPO, shares are traded on the stock market.
              </p>

              <p className="mt-3">
                Owning shares does not mean owning physical assets of a company.
                Corporations are treated as separate legal entities, meaning
                they own their assets independently from shareholders. This is
                known as the separation of ownership and control.
              </p>

              <p className="mt-3">
                This separation limits liability for both parties. Shareholders
                are not personally responsible for corporate debt, and corporate
                bankruptcy does not endanger personal assets of shareholders.
              </p>

              <p className="mt-3">
                At the core of a stock’s value is the shareholder’s entitlement
                to a portion of the company’s profits.
              </p>
            </div>

            {/* How to Trade */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How Do I Trade Stocks?
              </h2>

              <p>
                Stocks are traded on stock markets, where buyers and sellers
                agree on prices. Traditionally, this occurred on physical
                trading floors such as the London Stock Exchange (LSE).
              </p>

              <p className="mt-3">
                Today, most stock trading occurs electronically through virtual
                exchanges powered by advanced computer networks.
              </p>

              <p className="mt-3">
                Shares can only be traded after a company’s IPO, making the
                stock market a secondary market. Investors buy shares from other
                shareholders—not directly from the company.
              </p>

              <p className="mt-3">
                Traders invest in stocks because company valuations fluctuate
                over time. Profits or losses depend on how accurately a trader
                anticipates market movements.
              </p>

              <p className="mt-3">
                While short-term price prediction is difficult, stocks generally
                appreciate in value over the long term. Many investors therefore
                hold diversified portfolios and benefit from dividends paid by
                larger companies.
              </p>

              <p className="mt-3">
                Stock trades occur for many reasons—profit-taking, loss
                reduction, or changes in market outlook—all driven by differing
                trader strategies and timelines.
              </p>
            </div>

            {/* Risk */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Stock Trading Risk Assessment
              </h2>

              <p>
                All financial investments carry risk, and stock trading is no
                exception. Even experienced traders cannot predict price
                movements with complete accuracy.
              </p>

              <p className="mt-3">
                While various strategies exist, no strategy is entirely risk
                free. Proper risk management—including limiting capital per
                trade—is essential for long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
