'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePreloader } from '@/components/providers/PreloaderProvider';

export default function Preloader() {
  const { setIsLoading } = usePreloader();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            setVisible(false);
            setIsLoading(false);
          },
        });
      }
      setProgress(p);
    }, 140);

    return () => clearInterval(interval);
  }, [setIsLoading]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-7 bg-black"
    >
      <div className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-[0.14em] text-offwhite/90">
        AMAZ<span className="text-gold">ELL</span>
      </div>
      <div className="relative h-px w-[220px] overflow-hidden bg-line-strong">
        <span
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-bronze to-gold-bright"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-[11px] tracking-[0.2em] text-muted tabular-nums">
        {Math.floor(progress)}%
      </div>
    </div>
  );
}
