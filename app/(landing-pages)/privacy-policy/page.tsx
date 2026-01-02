import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { SITE_NAME } from '@/global/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Privacy Policy
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Intro */}
            <p>
              {SITE_NAME} Limited (in incorporation) (“we”, “us”, or the
              “Company”) respects the privacy of its users (“you” or “User”) and
              is committed to protecting the personal information of users who
              access or use our mobile applications, website, and related online
              services (collectively, the “Services”).
            </p>

            <p>
              This Privacy Policy explains how we collect, use, and disclose
              your information. By using the Services, you agree to the terms of
              this Privacy Policy, which forms part of our Terms of Service.
            </p>

            {/* Scope List */}
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-3">
                This Privacy Policy explains, among other things:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With whom we share information and for what purpose</li>
                <li>How long we retain your information</li>
                <li>How we protect your information</li>
                <li>Advertisements</li>
                <li>Advertising ID and Advertising Identifiers</li>
                <li>Cookies and Google Analytics</li>
              </ul>
            </div>

            {/* Sharing Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                With Whom We Share Information and for What Purpose
              </h2>

              <p>
                We do not rent or sell your personal information. However, we
                may share information with subsidiaries, affiliates, service
                providers, auditors, advisers, or potential investors where
                necessary to operate our business.
              </p>

              <p className="mt-3">
                We may also disclose information if required by law, regulation,
                legal process, or governmental request, or to protect our
                rights, users, or the public from harm or fraud.
              </p>
            </div>

            {/* Retention */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                For How Long We Retain the Information
              </h2>

              <p>
                We retain personal information only as long as necessary to
                provide the Services, comply with legal obligations, resolve
                disputes, and enforce agreements.
              </p>

              <p className="mt-3">
                You may request access, correction, deletion, or restriction of
                your personal information at any time. Complaints may also be
                raised with applicable data protection authorities.
              </p>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How We Protect Your Information
              </h2>

              <p>
                We implement industry-standard security measures to safeguard
                your information. However, no system is completely secure, and
                we cannot guarantee absolute protection against unauthorized
                access.
              </p>

              <p className="mt-3">
                If you believe your privacy has been compromised or the Services
                have been misused, please contact us immediately.
              </p>
            </div>

            {/* Ads */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Advertisements
              </h2>

              <p>
                We may use third-party advertising technologies that utilize
                cookies and similar tools to display ads based on your use of
                the Services.
              </p>

              <p className="mt-3">
                You may opt out of many third-party ad networks via the Network
                Advertising Initiative (NAI) or the Digital Advertising Alliance
                (DAA).
              </p>

              <p className="mt-3">
                Learn more at{' '}
                <a
                  href="http://optout.networkadvertising.org/#!/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:underline"
                >
                  optout.networkadvertising.org
                </a>{' '}
                or{' '}
                <a
                  href="http://optout.aboutads.info/#!/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:underline"
                >
                  optout.aboutads.info
                </a>
                .
              </p>
            </div>

            {/* Advertising IDs */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Advertising ID and Advertising Identifier
              </h2>

              <p>
                We may use Google Advertising ID or Apple’s Advertising
                Identifier (IDFA) for analytics and advertising purposes. These
                identifiers help improve personalization and user experience.
              </p>

              <p className="mt-3">
                If your device does not support these identifiers, alternative
                identifiers may be used for non-advertising purposes.
              </p>
            </div>

            {/* Updates */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Updates or Amendments to the Privacy Policy
              </h2>

              <p>
                We may update this Privacy Policy periodically. The latest
                version will always be available through our Services.
              </p>

              <p className="mt-3">
                Continued use of the Services after changes are posted
                constitutes acceptance of the revised Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
