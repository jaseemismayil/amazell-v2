import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import Applications from '@/components/sections/Applications';

export const metadata: Metadata = {
  title: 'Applications — AMAZELL',
  description: 'One core AMAZELL technology, tuned for six demanding worlds.',
};

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="One core technology. Six demanding worlds."
        description="From a quiet home backup to round-the-clock industrial load — every AMAZELL cell is tuned for the conditions it's asked to survive."
      />
      <Applications />
    </>
  );
}
