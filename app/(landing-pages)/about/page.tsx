import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};
export default function AboutUs() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">About Us</h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Welcome to a trading platform where innovation meets opportunity
              in the world of finance. Our platform is meticulously crafted to
              cater to the diverse needs and aspirations of traders, from
              seasoned professionals seeking advanced tools to novices taking
              their first steps into the world of trading.
            </p>

            {/* Copy Trading */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Copy Trading
              </h3>
              <p>
                Harness the collective wisdom of the trading community with our
                innovative copy trading feature. By following the strategies of
                successful traders, you can replicate their trades in real-time,
                allowing you to benefit from their expertise and potentially
                enhance your own investment performance. Whether {`you're`}
                looking to diversify your portfolio or gain insights from top
                performers, our copy trading feature empowers you to make
                informed decisions with ease.
              </p>
            </div>

            {/* Stock Trading */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Stock Trading
              </h3>
              <p>
                Dive into the world of stocks with confidence using our
                intuitive trading platform. Whether {`you're`} interested in
                blue-chip companies, emerging growth stocks, or niche sectors,
                our platform provides access to a wide range of equities from
                global markets. With advanced charting tools, real-time market
                data, and comprehensive analysis, you can stay ahead of market
                trends and make informed trading decisions.
              </p>
            </div>

            {/* Crypto Trading */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Crypto Trading
              </h3>
              <p>
                Experience the excitement of cryptocurrency trading on our
                platform. From Bitcoin to altcoins, we offer a diverse selection
                of digital assets, along with real-time market data and analysis
                to help you navigate this rapidly evolving market with
                confidence.
              </p>
            </div>

            {/* Forex Trading */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Forex Trading
              </h3>
              <p>
                Unlock the potential of the largest financial market in the
                world with our forex trading capabilities. Trade major pairs,
                exotics, and cross-currency options using advanced charting
                tools, technical analysis, and risk management features designed
                for all experience levels.
              </p>
            </div>

            {/* Closing */}
            <p>
              At our trading platform, we are committed to providing a seamless
              and rewarding trading experience. With a focus on innovation,
              reliability, and user-centric design, we empower traders to unlock
              their full potential in the financial markets. Whether {"you're"}
              diversifying your portfolio or refining your skills, we invite you
              to join us and explore the endless possibilities of online
              trading.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
