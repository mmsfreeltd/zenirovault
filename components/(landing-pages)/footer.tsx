import { SITE_NAME } from "@/global/constants";

export default function Footer() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image (UNCHANGED) */}
      <img
        src="/images/footer.webp"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        {/* Brand */}
        <p className="text-sm font-medium text-white dark:text-white">
          {SITE_NAME}
        </p>

        {/* Heading */}
        <h2
          className="
            mt-6
            text-4xl md:text-6xl
            font-semibold leading-tight
            text-white dark:text-white
            max-w-3xl
          "
        >
          Build your wealth{' '}
          <span className="bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
            step by step.
          </span>
        </h2>

        {/* Footer row */}
        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-sm text-white/80 dark:text-white/80">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>

          <a
            href="#"
            className="
              text-sm
              text-white/90 dark:text-white/90
              hover:text-white
              transition
            "
          >
            Terms and Conditions
          </a>
        </div>
      </div>
    </section>
  );
}
