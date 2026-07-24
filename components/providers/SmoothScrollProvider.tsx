'use client';

import { ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { PreloaderProvider } from '@/components/providers/PreloaderProvider';
import Preloader from '@/components/layout/Preloader';

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useLenis();

  return (
    <PreloaderProvider>
      <Preloader />
      {children}
    </PreloaderProvider>
  );
}
