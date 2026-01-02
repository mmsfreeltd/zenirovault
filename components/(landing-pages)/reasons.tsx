export default function Reasons() {
  const reasons = [
    {
      tag: 'Reason 1',
      title: 'Secured',
      desc: `We prioritize your data’s safety with advanced encryption, regular audits, and robust firewalls. Trust us to provide a secure environment, ensuring your sensitive information stays confidential and protected.`,
      image: '/images/icons/icon1.avif',
    },
    {
      tag: 'Reason 2',
      title: 'Leverage',
      desc: `Maximize your potential by amplifying your positions. Our platform ensures seamless leverage management, empowering you to achieve greater profits responsibly.`,
      image: '/images/icons/icon2.avif',
    },
    {
      tag: 'Reason 3',
      title: 'Crypto Payments',
      desc: `Enjoy flexibility using your favorite cryptocurrencies for seamless, secure transactions with fast processing and enhanced privacy.`,
      image: '/images/icons/icon3.avif',
    },
    {
      tag: 'Reason 4',
      title: 'Mine or Stake Crypto',
      desc: `Grow your assets through mining or staking. Enjoy secure, efficient processes and earn passive income in decentralized finance.`,
      image: '/images/icons/icon4.avif',
    },
    {
      tag: 'Reason 5',
      title: 'Verified Traders',
      desc: `Connect with top-performing professionals, ensuring transparency and proven results. Mirror strategies and grow confidently.`,
      image: '/images/icons/icon5.webp',
    },
    {
      tag: 'Reason 6',
      title: 'Reliable Support',
      desc: `From your first step to your ultimate success, we provide unwavering support, expert guidance, and tailored solutions. Count on us to stand by you through every challenge and triumph, ensuring a smooth and rewarding journey all the way.`,
      image: '/images/icons/icon6.avif',
    },
    {
      tag: 'Reason 7',
      title: 'Fast Trades',
      desc: `Our platform ensures minimal delays, leveraging advanced technology to process orders in real-time. Stay ahead in the market with seamless, efficient transactions. Experience the speed you need to capitalize on opportunities without hesitation. With us, every millisecond counts toward your trading success.`,
      image: '/images/icons/icon7.webp',
    },
  ];

  return (
    <section
      className="
        relative py-24
        bg-white dark:bg-[#07061a]
      "
    >
      {/* Title */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
          <span className="bg-linear-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
            7 Reasons
          </span>{' '}
          To Choose Us
        </h2>
      </div>

      {/* Grid */}
      <div className="mt-16 max-w-7xl mx-auto px-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map((item, i) => (
          <div
            key={i}
            className="
              relative p-8 rounded-2xl
              bg-gray-50/70 dark:bg-white/5
              backdrop-blur
              border border-gray-200 dark:border-white/10
              shadow-sm hover:shadow-lg
              transition
            "
          >
            {/* Tag */}
            <span
              className="
                inline-block mb-6 px-3 py-1 rounded-full text-xs tracking-widest uppercase
                bg-gray-200 dark:bg-white/10
                text-gray-600 dark:text-gray-400
              "
            >
              {item.tag}
            </span>

            {/* Icon */}
            <div className="mb-6 flex justify-end">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
