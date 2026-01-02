import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { SITE_NAME } from '@/global/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crypto Trading',
};

export default function CryptoTrading() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Crypto Trading
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Intro */}
            <p>
              {SITE_NAME} is excited to announce the launch of our
              cryptocurrency trading platform. You can now trade Bitcoin,
              Ethereum, and many other digital assets quickly, easily, and
              securely from anywhere in the world.
            </p>

            <p>
              Our platform offers margin trading leverage, short-selling
              options, fast deposits and withdrawals, and 24/7/365 customer
              support. Traders benefit from a CySEC-regulated environment with a
              monthly trading volume of over USD $11 billion.
            </p>

            {/* What is Cryptocurrency */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What Is a Cryptocurrency?
              </h2>

              <p>
                A cryptocurrency such as Bitcoin is a digital currency that
                operates peer-to-peer on a blockchain network, independent of
                centralized authorities like banks or governments.
              </p>

              <p className="mt-3">
                Cryptocurrencies are entirely virtual assets. They are not
                backed by physical commodities and do not possess intrinsic
                value in the traditional sense.
              </p>
            </div>

            {/* How Crypto Works */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How Do Cryptocurrencies Work?
              </h2>

              <p>
                Cryptocurrencies rely on blockchain technology to validate and
                process transactions through a decentralized peer-to-peer
                network.
              </p>

              <p className="mt-3">
                When a transaction request is submitted, it is verified by the
                network and grouped with other transactions into a block. Once
                added to the blockchain, the transaction is confirmed and
                completed.
              </p>
            </div>

            {/* Investment Opportunities */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Are There Investment Opportunities with Cryptocurrencies?
              </h2>

              <p>
                Yes. Cryptocurrencies have become recognized investment assets
                among major financial institutions and have been adopted by
                countries such as Australia and Japan.
              </p>

              <p className="mt-3">
                However, like all investments, cryptocurrency trading involves
                risks due to market volatility, price fluctuations, and economic
                factors. Proper risk management is essential.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
