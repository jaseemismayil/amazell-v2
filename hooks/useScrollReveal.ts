'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Fades + lifts every [data-reveal] element inside the given container ref
 * into view the first time it crosses 88% of the viewport.
 */
export function useScrollReveal(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      items.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
