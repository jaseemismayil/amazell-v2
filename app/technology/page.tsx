import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import BatteryTech from '@/components/sections/BatteryTech';

export const metadata: Metadata = {
  title: 'Technology — AMAZELL',
  description: 'Inside the tubular battery architecture that powers every AMAZELL cell.',
};

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="Five layers. One relentless cell."
        description="From the container to the core, every layer of an AMAZELL cell is engineered on purpose — not assembled by accident."
      />
      <BatteryTech />
    </>
  );
}
