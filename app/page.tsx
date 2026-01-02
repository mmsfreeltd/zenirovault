import Faq from '@/components/(landing-pages)/faq';
import Framework from '@/components/(landing-pages)/framework';
import Header from '@/components/(landing-pages)/headerx';
import Hero from '@/components/(landing-pages)/hero';
import Reasons from '@/components/(landing-pages)/reasons';
import Footer from '@/components/(landing-pages)/footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <div className=" bg-background my-10">
        <div className="w-2/3 mx-auto">
          <Image
            src="/images/CRYChart.png"
            alt="chart"
            width={400}
            height={400}
            className="w-full"
          />
        </div>
      </div>
      <Reasons />
      <Framework />
      <Faq />
      <Footer />
    </div>
  );
}
