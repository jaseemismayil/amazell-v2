import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import WhyAmazell from '@/components/sections/WhyAmazell';

export const metadata: Metadata = {
  title: 'About — AMAZELL',
  description: 'Precision engineering, not just manufacturing — what sets AMAZELL apart.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About AMAZELL"
        title="Precision engineering, not just manufacturing."
        description="High-performance tubular batteries, engineered for long life and built for Indian conditions."
      />
      <WhyAmazell />
    </>
  );
}
