'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { usePreloader } from '@/components/providers/PreloaderProvider';

// Canvas drawing must never run during SSR (no window/canvas on the server).
const HeroFrameSequence = dynamic(() => import('@/components/hero/HeroFrameSequence'), {
  ssr: false,
});

// How much of the pinned scroll distance the text/scroll-cue take to fade
// out completely (as a fraction of total scroll progress through the pin).
// Text is gone well before the frame sequence itself finishes, so the last
// stretch of scroll is pure product reveal.
const TEXT_FADE_END = 0.32;
const CUE_FADE_END = 0.06;

export default function Hero() {
  const { isLoading } = usePreloader();
  const played = useRef(false);
  const pinRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const textFade = Math.min(1, self.progress / TEXT_FADE_END);
          gsap.set(textGroupRef.current, {
            opacity: 1 - textFade,
            y: -textFade * 36,
          });

          const cueFade = Math.min(1, self.progress / CUE_FADE_END);
          gsap.set(scrollCueRef.current, { opacity: 1 - cueFade });
        },
      });

      return () => trigger.kill();
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative w-full bg-black">
      <div ref={pinRef} className="relative h-[300vh]">
        <div
          className="sticky top-0 flex h-[100svh] min-h-[640px] w-full flex-col justify-end overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(120% 90% at 50% 15%, #121110 0%, #050505 55%)',
          }}
        >
          <HeroFrameSequence sectionId="hero" />

          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              backgroundImage: `radial-gradient(120% 70% at 50% 100%, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 45%),
                linear-gradient(180deg, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0) 22%, rgba(5,5,5,0) 65%, rgba(5,5,5,0.95) 100%)`,
            }}
          />

          <div
            ref={textGroupRef}
            className="relative z-[3] mx-auto w-full max-w-wrap px-[6vw] pb-[7vh]"
          >
            <div className="hero-eyebrow eyebrow mb-6">Tubular Battery Technology</div>

            <h1 className="max-w-[440px] font-display text-[clamp(32px,4.6vw,58px)] font-bold uppercase leading-[1.1] text-offwhite">
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

            <div className="mt-8 flex max-w-[440px] flex-col items-start gap-6">
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

          <div
            ref={scrollCueRef}
            className="scroll-cue absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2.5 text-[10px] uppercase tracking-[0.24em] text-muted-2"
          >
            <span>Scroll</span>
            <div className="scroll-cue-stick">
              <i />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
