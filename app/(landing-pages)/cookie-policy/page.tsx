import Footer from '@/components/(landing-pages)/footer';
import Header from '@/components/(landing-pages)/headerx';
import { SITE_NAME } from '@/global/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
};

export default function CookiePolicy() {
  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">
            Cookie Policy
          </h1>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Intro */}
            <div className="space-y-3">
              <p>{SITE_NAME} uses cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Optimize your trading experience, including remembering your
                  preferences, location, preferred language, browser, and other
                  details;
                </li>
                <li>Authenticate your identity for security purposes;</li>
                <li>Maintain our website and its core functionalities;</li>
                <li>Analyze and track the use of our services;</li>
                <li>
                  Adjust our platform according to your trading habits and
                  regulatory requirements.
                </li>
              </ul>
            </div>

            {/* What Are Cookies */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What Are Cookies
              </h2>
              <p>
                Cookies are small pieces of data sent to your computer by a
                website and stored on your device. They are non-executable and
                cannot be used to install malware.
              </p>
              <p className="mt-3">
                Cookies allow websites to recognize returning visitors and store
                basic information that is checked and updated each time you
                visit. For more information, visit{' '}
                <a
                  href="http://www.allaboutcookies.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:underline"
                >
                  www.allaboutcookies.org
                </a>
                .
              </p>
            </div>

            {/* Managing Cookies */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Managing Cookies
              </h2>
              <p>
                At {SITE_NAME}, we respect your right to privacy and provide
                tools to help you manage the cookies you receive from our
                services.
              </p>
              <p className="mt-3">
                Some cookies are essential for the operation of our platform and
                cannot be disabled if you wish to use our services. Other
                non-essential cookies may be opted out of where applicable.
              </p>
              <p className="mt-3">
                Your browser may also allow you to block or delete cookies.
                Please refer to your browser’s help documentation for
                instructions. By continuing to use our platform without
                disabling cookies, you are consenting to their use.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
