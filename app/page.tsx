import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import BatteryTech from '@/components/sections/BatteryTech';
import Stats from '@/components/sections/Stats';
import Applications from '@/components/sections/Applications';
import WhyAmazell from '@/components/sections/WhyAmazell';
import Manufacturing from '@/components/sections/Manufacturing';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import DealerNetwork from '@/components/sections/DealerNetwork';
import Testimonials from '@/components/sections/Testimonials';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BatteryTech />
        <Stats />
        <Applications />
        <WhyAmazell />
        <Manufacturing />
        <FeaturedProducts />
        <DealerNetwork />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
