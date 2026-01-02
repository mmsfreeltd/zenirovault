import { SITE_NAME } from '@/global/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="
        relative min-h-screen overflow-hidden
        bg-white dark:bg-[#07061a]
      "
    >
      {/* linear glow background */}
      <div className="absolute inset-0">
        <div
          className="
            absolute -top-40 left-1/2 -translate-x-1/2
            w-225 h-225
            bg-purple-500/20 dark:bg-purple-600/20
            blur-[160px]
          "
        />
        <div
          className="
            absolute top-1/3 right-0
            w-125 h-125
            bg-orange-400/15 dark:bg-orange-500/10
            blur-[140px]
          "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 text-center">
        {/* Badge */}
        <span
          className="
            inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-gray-100 dark:bg-white/5
            text-xs tracking-widest uppercase
            text-gray-600 dark:text-gray-300
            border border-gray-200 dark:border-white/10
          "
        >
          Trading & Community
        </span>

        {/* Heading */}
        <h1
          className="
            mt-8 text-4xl md:text-6xl xl:text-7xl
            font-semibold leading-tight
            text-gray-900 dark:text-white
          "
        >
          Revolutionizing your <br />
          digital{' '}
          <span className="bg-linear-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
            trading
          </span>{' '}
          <br />
          experience
        </h1>

        {/* Description */}
        <p
          className="
            mt-6 max-w-2xl mx-auto
            text-base md:text-lg
            text-gray-600 dark:text-gray-400
          "
        >
          Seamlessly merging complexity with ease, {SITE_NAME} offers top-notch
          security, 24/7 support, and an intuitive platform for your trading
          needs.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="login"
            className="
              px-8 py-4 rounded-xl
              bg-linear-to-r from-purple-500 to-orange-500
              text-white font-medium
              shadow-lg hover:opacity-90 transition
            "
          >
            Login Account
          </Link>

          <Link
            href="register"
            className="
              px-8 py-4 rounded-xl
              border
              border-gray-300 dark:border-white/20
              text-gray-900 dark:text-white
              hover:bg-gray-100 dark:hover:bg-white/5
              transition
            "
          >
            Create Account
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            {[...Array(8)].map((_, i) => (
              <Image
                width={20}
                height={20}
                key={i}
                src={`https://i.pravatar.cc/40?img=${i + 10}`}
                alt="user"
                className="
                  w-8 h-8 rounded-full
                  border
                  border-white dark:border-[#07061a]
                "
              />
            ))}
            <span
              className="
                w-8 h-8 rounded-full
                bg-linear-to-r from-purple-500 to-orange-500
                text-white flex items-center justify-center
                text-xs font-semibold
                border border-white dark:border-[#07061a]
              "
            >
              +
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            1M+ successful participants
          </p>
        </div>

        {/* Bottom statement */}
        <div className="mt-32">
          <p className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
            The best time to invest was 2009.
          </p>
          <p className="mt-2 text-3xl md:text-4xl font-semibold bg-linear-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
            The second best time is now.
          </p>
        </div>
      </div>
    </section>
  );
}
