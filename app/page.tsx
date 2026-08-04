import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Manufacturing from '@/components/sections/Manufacturing';
import Testimonials from '@/components/sections/Testimonials';
import FinalCTA from '@/components/sections/FinalCTA';
import BatteryTechTeaser from '@/components/sections/teasers/BatteryTechTeaser';
import ApplicationsTeaser from '@/components/sections/teasers/ApplicationsTeaser';
import WhyAmazellTeaser from '@/components/sections/teasers/WhyAmazellTeaser';
import FeaturedProductsTeaser from '@/components/sections/teasers/FeaturedProductsTeaser';
import DealerNetworkTeaser from '@/components/sections/teasers/DealerNetworkTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <BatteryTechTeaser />
      <Stats />
      <ApplicationsTeaser />
      <WhyAmazellTeaser />
      <Manufacturing />
      <FeaturedProductsTeaser />
      <DealerNetworkTeaser />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
