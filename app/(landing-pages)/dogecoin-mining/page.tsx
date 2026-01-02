import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { SITE_NAME } from '@/global/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DogeCoin Mining',
};

export default function DogeCoinMining() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Dogecoin Mining
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Intro */}
            <p>
              Dogecoin (DOGE) was originally created as a joke—a fun way for
              users to tip each other online. Despite its playful origins,
              Dogecoin has grown into one of the most popular cryptocurrencies
              in the world.
            </p>

            <p>
              Today, the fastest and most profitable way to mine DOGE is by
              using ASIC-based mining hardware and joining a Dogecoin mining
              pool.
            </p>

            {/* Why Mine DOGE */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Why Mine Dogecoin?
              </h2>

              <p>
                Dogecoin transactions are processed quickly, and mining pools
                typically distribute rewards every 24 hours. This results in
                consistent payouts and predictable income.
              </p>

              <p className="mt-3">
                Dogecoin is also widely traded across multiple markets, making
                it easy to convert mined DOGE into other assets or fiat
                currency.
              </p>
            </div>

            {/* How to Mine */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How to Mine Dogecoin
              </h2>

              <p>
                Dogecoin uses the Scrypt hashing algorithm. ASIC miners such as
                the Antminer L3++ are well-suited for DOGE mining.
              </p>

              <p className="mt-3">
                Joining a mining pool is highly recommended. Mining solo can
                take months or years to yield rewards, while pools allow miners
                to combine hashing power and receive steady payouts.
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What’s Required for Mining DOGE
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>ASIC mining hardware</li>
                <li>Always-on internet connection</li>
                <li>Knowledge of power consumption costs</li>
                <li>A secure Dogecoin-compatible wallet</li>
              </ul>

              <p className="mt-3">
                Proper cooling and electrical capacity are also critical, as
                ASIC rigs operate continuously and generate significant heat and
                noise.
              </p>
            </div>

            {/* Best Hardware */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Best Mining Hardware
              </h2>

              <p>
                Among Scrypt-capable ASIC miners, the Bitmain Antminer L3++
                offers one of the best balances between power consumption,
                hashing power, and price.
              </p>
            </div>

            {/* Configuration */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Configuring Your ASIC Miner
              </h2>

              <p>
                ASIC miners come with pre-installed software. Setup typically
                involves connecting power and internet, selecting a mining pool,
                accessing the miner via its IP address, and entering pool
                credentials.
              </p>

              <p className="mt-3">
                Once configured, the miner will begin hashing automatically. A
                visible hash rate confirms active mining.
              </p>
            </div>

            {/* Cloud Mining */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Dogecoin Cloud Mining
              </h2>

              <p>
                Cloud mining allows users to rent mining power instead of owning
                hardware. This eliminates concerns about electricity, heat, and
                maintenance.
              </p>

              <p className="mt-3">
                While convenient, cloud mining carries risk. Always ensure that
                contract costs are covered by expected mining returns. Reputable
                providers such as {SITE_NAME} can be considered.
              </p>
            </div>

            {/* Profitability */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Calculating Dogecoin Profits
              </h2>

              <p>
                Profitability depends on factors such as hash rate, electricity
                cost, mining pool fees, DOGE price, and network difficulty.
              </p>

              <p className="mt-3">
                Mining calculators can estimate earnings, but results will vary
                daily based on market conditions.
              </p>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Common Questions
              </h2>

              <p>
                <strong>Is DOGE supply capped?</strong> No. Unlike Bitcoin,
                Dogecoin has no fixed supply limit.
              </p>

              <p className="mt-2">
                <strong>Is DOGE mining legal?</strong> In most countries, yes,
                though regulations vary by region.
              </p>
            </div>

            {/* History */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                More About Dogecoin
              </h2>

              <p>
                Dogecoin was created in 2013 by Billy Markus and Jackson Palmer,
                inspired by Litecoin and the Scrypt algorithm. Its Shiba Inu
                mascot and strong community helped drive rapid adoption.
              </p>

              <p className="mt-3">
                DOGE mining shares similarities with Litecoin mining and can
                even be merged-mined to increase profitability.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
