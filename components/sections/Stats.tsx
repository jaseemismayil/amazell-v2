'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '@/data/content';

export default function Stats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray<HTMLElement>('[data-count]');
      counters.forEach((el) => {
        const target = Number(el.dataset.count);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { innerText: 0 },
              {
                innerText: target,
                duration: 1.8,
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function () {
                  el.textContent = Math.floor(Number(el.innerText)).toLocaleString('en-IN');
                },
              }
            );
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" ref={rootRef} className="border-y border-line bg-panel">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-panel px-8 py-14">
              <div className="flex items-baseline gap-1 font-display text-[clamp(38px,4.4vw,58px)] font-bold text-offwhite">
                <span data-count={stat.value}>0</span>
                <span className="text-[0.42em] font-semibold text-gold">{stat.suffix}</span>
              </div>
              <div className="mt-3 text-[12.5px] uppercase tracking-[0.06em] text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
