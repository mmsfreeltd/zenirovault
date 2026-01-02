import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crypto Mining',
};
export default function CryptoMining() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Crypto Mining
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Intro */}
            <p>
              Cryptocurrency networks need computational power to run securely.
              The world’s most powerful blockchains are supported by millions of
              computers around the world. Unlike paper money, Bitcoin and other
              cryptocurrencies are produced mathematically and held digitally.
            </p>

            <p>
              Individuals and organizations that voluntarily provide computing
              power to secure these networks are known as miners. Their
              contribution ensures decentralization, transparency, and security.
            </p>

            <p>
              Cryptocurrencies have no central government or intermediary that
              controls their future. Instead, they function as borderless
              digital democracies where miners vote with computing power to
              reach consensus.
            </p>

            {/* Security */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How Is Bitcoin Kept Secure
              </h2>
              <p>
                The only way to prevent corruption or the creation of money out
                of thin air is to burn real-world energy—a concept known as
                Proof-of-Work.
              </p>
              <p className="mt-3">
                Bitcoin is currently the most secure computer network on the
                planet. Its security is derived from hash power, the collective
                computing strength miners contribute to the network.
              </p>
              <p className="mt-3">
                Due to rapid ecosystem growth, modern mining is carried out
                using specialized high-performance hardware, typically deployed
                in large-scale data centers for maximum efficiency.
              </p>
            </div>

            {/* Incentives */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What Are the Incentives for Miners
              </h2>
              <p>
                Mining is built on trust. Miners process and verify transactions
                while maintaining the public transaction history known as the
                blockchain.
              </p>
              <p className="mt-3">
                In return for securing the network, miners are rewarded with
                transaction fees and newly minted cryptocurrency coins. This
                creates a win-win ecosystem for both users and miners.
              </p>
              <p className="mt-3">
                When you start mining with us, you receive your share of these
                rewards while supporting the security and stability of the
                network.
              </p>
            </div>

            {/* Vision */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                The Big Vision of Cryptocurrency
              </h2>
              <p>
                To preserve the integrity and values of cryptocurrency
                ecosystems, miners keep networks decentralized by continuously
                validating one another’s work.
              </p>
              <p className="mt-3">
                This self-regulating system enables fair currency distribution,
                long-term growth, and a truly decentralized financial future for
                crypto participants worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
