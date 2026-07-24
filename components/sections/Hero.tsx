'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { usePreloader } from '@/components/providers/PreloaderProvider';

// Three.js touches the DOM directly and must never run during SSR.
const HeroBattery = dynamic(() => import('@/components/three/HeroBattery'), {
  ssr: false,
});

export default function Hero() {
  const { isLoading } = usePreloader();
  const played = useRef(false);

  useEffect(() => {
    if (isLoading || played.current) return;
    played.current = true;

    gsap.set('.hero-title-line span', { yPercent: 120 });
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.hero-title-line span', { yPercent: 0, duration: 1.2, stagger: 0.12 })
      .from('.hero-sub', { opacity: 0, y: 16, duration: 0.8 }, '-=0.6')
      .from('.hero-actions .btn', { opacity: 0, y: 16, duration: 0.7, stagger: 0.1 }, '-=0.6')
      .from('.hero-eyebrow', { opacity: 0, x: -14, duration: 0.6 }, '-=1.3')
      .from('.scroll-cue', { opacity: 0, duration: 0.8 }, '-=0.4');
  }, [isLoading]);

  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col justify-end overflow-hidden bg-black"
      style={{
        backgroundImage:
          'radial-gradient(120% 90% at 50% 15%, #121110 0%, #050505 55%)',
      }}
    >
      <HeroBattery sectionId="hero" />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          backgroundImage: `radial-gradient(120% 70% at 50% 100%, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 45%),
            linear-gradient(180deg, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0) 22%, rgba(5,5,5,0) 65%, rgba(5,5,5,0.95) 100%)`,
        }}
      />

      <div className="relative z-[3] mx-auto w-full max-w-wrap px-[6vw] pb-[7vh]">
        <div className="hero-eyebrow eyebrow mb-6">Tubular Battery Technology</div>

        <h1 className="font-display text-[clamp(46px,9.4vw,128px)] font-bold uppercase leading-[1.05] text-offwhite">
          <div className="hero-title-line overflow-hidden">
            <span className="inline-block will-change-transform">POWER</span>
          </div>
          <div className="hero-title-line overflow-hidden">
            <span
              className="inline-block bg-gradient-to-r from-bronze via-gold-bright to-gold bg-clip-text text-transparent will-change-transform"
              style={{ backgroundImage: 'linear-gradient(100deg, #8a6a3d 10%, #f2d38a 45%, #c9a24b 80%)' }}
            >
              THAT NEVER STOPS.
            </span>
          </div>
        </h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <p className="hero-sub max-w-[360px] text-[15px] leading-relaxed text-muted">
            Engineered for long life. Built for Indian conditions.
          </p>
          <div className="hero-actions flex flex-wrap gap-4">
            <a href="#products" className="btn btn-primary" data-hover>
              <span>Explore Products</span>
            </a>
            <a href="#dealers" className="btn btn-ghost" data-hover>
              <span>Become a Dealer</span>
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-cue absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2.5 text-[10px] uppercase tracking-[0.24em] text-muted-2">
        <span>Scroll</span>
        <div className="scroll-cue-stick">
          <i />
        </div>
      </div>
    </section>
  );
}
