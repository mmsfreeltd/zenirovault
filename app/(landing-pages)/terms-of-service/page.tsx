import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { SITE_NAME } from '@/global/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsOfService() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Terms of Service
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Intro */}
            <p>
              These Terms & Conditions (“Agreement”) govern the relationship
              between <strong>{SITE_NAME} LTD</strong> (“Company”) and the user
              (“Client”) of the {SITE_NAME} platform.
            </p>

            <p>
              By registering an account, depositing funds, or using the Website,
              the Client confirms they have read, understood, and accepted all
              applicable policies including Privacy Policy, Payment Policy,
              Withdrawal Policy, AML Policy, and other related documentation.
            </p>

            {/* Definitions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Definitions
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account:</strong> The Client’s unique trading account
                </li>
                <li>
                  <strong>Ask / Bid:</strong> Buy and sell prices respectively
                </li>
                <li>
                  <strong>CFD:</strong> Contract for Difference
                </li>
                <li>
                  <strong>Trading Platform:</strong> Electronic trading system
                </li>
                <li>
                  <strong>Spread:</strong> Difference between Bid and Ask
                </li>
                <li>
                  <strong>KYC Documents:</strong> Identity verification
                  documents
                </li>
              </ul>
            </div>

            {/* Subject */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Subject of the Agreement
              </h2>

              <p>
                The Company provides execution-only trading services via its
                Trading Platform. The Company does not provide investment advice
                or account management unless explicitly agreed in writing.
              </p>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Services of the Company
              </h2>

              <p>
                The Company facilitates trade execution, analytics, news, and
                marketing services. All trades are executed at the Client’s sole
                discretion and risk.
              </p>

              <p className="mt-3">
                The Client is solely responsible for all actions performed
                through their Account. Unauthorized access due to negligence
                remains the Client’s responsibility.
              </p>
            </div>

            {/* Orders */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Execution of Orders
              </h2>

              <p>
                Orders are executed electronically with the Company acting as
                Market Maker. The Company acts as principal, not agent.
              </p>

              <p className="mt-3">
                Technical failures, delays, unauthorized access, or misexecution
                risks are acknowledged and accepted by the Client.
              </p>
            </div>

            {/* Liability */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Limitation of Liability
              </h2>

              <p>
                The Company does not guarantee uninterrupted or error-free
                service and shall not be liable for indirect or consequential
                damages.
              </p>

              <p className="mt-3">
                Liability is limited to cases of gross negligence, fraud, or
                willful misconduct.
              </p>
            </div>

            {/* Personal Data */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Personal Data
              </h2>

              <p>
                The Client consents to the collection, storage, and processing
                of personal data in compliance with applicable regulations.
              </p>

              <p className="mt-3">
                Data may be shared with third parties strictly for operational,
                legal, and regulatory purposes.
              </p>
            </div>

            {/* Risk */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Risk Disclosure
              </h2>

              <p>
                Trading CFDs, cryptocurrencies, and OTC assets involves high
                risk and may result in total loss of invested capital.
              </p>

              <p className="mt-3">
                Clients should only trade if they fully understand the risks and
                have sufficient financial capacity.
              </p>
            </div>

            {/* Fees */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Fees & Charges
              </h2>

              <p>
                Fees, spreads, swaps, and commissions may apply and are
                disclosed on the Website. The Company may revise fees at any
                time.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Duration & Termination
              </h2>

              <p>
                This Agreement is effective indefinitely and may be terminated
                by the Company in cases of policy violations, unverified
                accounts, or legal requirements.
              </p>
            </div>

            {/* OTC */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                OTC Assets
              </h2>

              <p>
                OTC assets are priced internally and may differ from open-market
                prices. Clients acknowledge and accept associated risks.
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Benefits & Promotions
              </h2>

              <p>
                The Company may offer benefits such as VIP programs or
                promotions at its discretion. Abuse of benefits may result in
                revocation.
              </p>
            </div>

            {/* Closing */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By using the {SITE_NAME} platform, you confirm acceptance of these
              Terms of Service in full.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
