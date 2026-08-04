import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import DealerNetwork from '@/components/sections/DealerNetwork';

export const metadata: Metadata = {
  title: 'Dealer Network — AMAZELL',
  description: 'Find your nearest authorised AMAZELL dealer, or apply to bring the network to your city.',
};

export default function DealersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dealer Network"
        title="Present across every state you serve."
        description="Search your city to find your nearest authorised AMAZELL dealer, or apply to bring the network to yours."
      />
      <DealerNetwork />
    </>
  );
}
