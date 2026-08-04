import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import FeaturedProducts from '@/components/sections/FeaturedProducts';

export const metadata: Metadata = {
  title: 'Products — AMAZELL',
  description: 'AMAZELL tubular batteries for home, solar and inverter backup, built for every scale.',
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Built for every backup, at every scale."
        description="From daily home backup to demanding solar installs, every AMAZELL model is engineered for the load it's asked to carry."
      />
      <FeaturedProducts />
    </>
  );
}
