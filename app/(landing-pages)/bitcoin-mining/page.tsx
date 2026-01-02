import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { Metadata } from 'next';
import { SITE_NAME } from '@/global/constants';
export const metadata: Metadata = {
  title: 'Bitcoin Mining',
};

export default function BitcoinMining() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Bitcoin Mining
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Intro */}
            <p>
              Bitcoin uses a public ledger known as the blockchain. Mining is
              the process that adds new transactions to this ledger while
              ensuring every transaction is verified, secure, and legitimate.
              This prevents issues such as double spending.
            </p>

            <p>
              When someone mines Bitcoin, they perform a service to the network
              by validating transactions. In return, miners are rewarded for
              completing blocks. In 2018, the reward for mining a block was 12.5
              BTC, and this reward decreases over time.
            </p>

            <p>
              Mining requires patience and significant effort, similar to
              traditional mining of precious metals—hence the term “mining” for
              computational work.
            </p>

            {/* Equipment */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Choosing Your Mining Equipment
              </h2>

              <p>
                Bitcoin mining involves extremely complex calculations, making
                the choice of hardware critical. Several factors must be
                considered when selecting mining equipment.
              </p>
            </div>

            {/* Hash Rate */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Hash Rates
              </h3>

              <p>
                Hash rate measures how many cryptographic calculations your
                mining hardware can perform per second. A higher hash rate
                increases the likelihood of solving blocks faster and earning
                rewards.
              </p>

              <p className="mt-3">
                Hash rates are measured in MH/s, GH/s, or TH/s. Modern Bitcoin
                miners can achieve hash rates ranging from hundreds of MH/s to
                over 10 TH/s.
              </p>
            </div>

            {/* Energy */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cost of Energy
              </h3>

              <p>
                Electricity is one of the most significant costs in Bitcoin
                mining. High-performance hardware consumes substantial power, so
                it’s essential to calculate energy costs before investing.
              </p>

              <p className="mt-3">
                Evaluating hash rate relative to power consumption (MH/s per
                watt) helps determine whether mining will be profitable.
              </p>
            </div>

            {/* Hardware Evolution */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Bitcoin Mining Hardware Evolution
              </h2>

              <p>
                Early Bitcoin mining was possible using CPUs and later GPUs.
                Over time, dedicated mining hardware emerged, leading to mining
                farms and industrial-scale operations.
              </p>

              <p className="mt-3">
                GPUs offered significant improvements over CPUs, but were
                eventually replaced by more efficient solutions such as FPGAs
                and ASICs.
              </p>
            </div>

            {/* GPUs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                GPUs for Mining
              </h3>

              <p>
                GPUs were once widely used due to their superior hashing
                capabilities compared to CPUs. However, they are no longer
                profitable for Bitcoin mining due to increased competition and
                difficulty.
              </p>
            </div>

            {/* FPGAs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                FPGAs in Bitcoin Mining
              </h3>

              <p>
                FPGAs marked the transition toward purpose-built mining
                hardware. They consumed significantly less power than GPUs while
                delivering similar hash rates.
              </p>
            </div>

            {/* ASICs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ASICs (Application-Specific Integrated Circuits)
              </h3>

              <p>
                ASICs are custom-designed chips built solely for mining Bitcoin.
                They offer unmatched performance and energy efficiency, making
                them the dominant technology in modern Bitcoin mining.
              </p>

              <p className="mt-3">
                Top-tier ASIC miners can exceed 10 TH/s but often cost thousands
                of dollars.
              </p>
            </div>

            {/* Software */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Choosing Mining Software
              </h2>

              <p>
                Mining software connects your hardware to the Bitcoin network
                and handles cryptographic calculations. Popular options include
                Bitcoin Miner, CGMiner, BFGMiner, RPC Miner, and EasyMiner.
              </p>
            </div>

            {/* Pools */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Understanding Mining Pools
              </h2>

              <p>
                Mining pools allow individuals to combine computing power,
                increasing the chances of earning rewards. Rewards are
                distributed proportionally based on contribution.
              </p>

              <p className="mt-3">
                Pools often charge fees ranging from 1% to 10%, though some
                pools are free.
              </p>
            </div>

            {/* Profitability */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Can You Profitably Mine Bitcoin?
              </h2>

              <p>
                Bitcoin mining has become increasingly competitive. Today,
                profitability generally requires specialized hardware, access to
                cheap electricity, and large-scale operations.
              </p>

              <p className="mt-3">
                While home mining is difficult, future improvements in hardware
                and software may enable individuals to mine profitably again.
              </p>
            </div>

            {/* Cloud Mining */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Bitcoin Cloud Mining
              </h2>

              <p>
                Cloud mining allows users to rent mining power instead of owning
                hardware. This removes concerns about electricity, hardware, and
                maintenance.
              </p>

              <p className="mt-3">
                However, cloud mining involves risk, as control is delegated to
                third-party providers. It’s important to choose reputable
                providers such as {SITE_NAME}.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
