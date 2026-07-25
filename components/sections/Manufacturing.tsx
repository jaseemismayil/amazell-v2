'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { manufacturingSteps, factoryGallery } from '@/data/content';

export default function Manufacturing() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 0.5,
        onUpdate: (self) => {
          if (barRef.current) {
            barRef.current.style.width = `${self.progress * 100}%`;
          }
          const active = Math.min(5, Math.ceil(self.progress * 5));
          document.querySelectorAll<HTMLElement>('.t-step').forEach((el) => {
            el.classList.toggle('opacity-100', Number(el.dataset.t) <= active);
            el.classList.toggle('opacity-30', Number(el.dataset.t) > active);
          });
        },
      });
      return () => trigger.kill();
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="manufacturing" className="bg-panel py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div className="mb-16 max-w-[640px]">
          <div className="eyebrow">Manufacturing Excellence</div>
          <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,54px)] text-offwhite">
            From raw alloy to
            <br />a cell that outlasts its promise.
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="grid grid-cols-2 gap-6 gap-y-11 md:grid-cols-5">
            {manufacturingSteps.map((step) => (
              <div
                key={step.num}
                data-t={step.num.replace(/^0/, '')}
                className="t-step relative pt-9 opacity-30 transition-opacity duration-500"
              >
                <span className="absolute left-0 top-[-5px] h-2.5 w-2.5 rounded-full border border-gold-dim bg-black" />
                <div className="mb-2.5 font-display text-[11px] tracking-[0.1em] text-gold">
                  {step.num}
                </div>
                <h5 className="mb-2.5 font-display text-[15.5px] font-medium text-offwhite">
                  {step.title}
                </h5>
                <p className="text-[12.8px] leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-[-1px] h-0.5 bg-line-strong">
            <div ref={barRef} className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-bronze to-gold-bright" />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {factoryGallery.map((photo) => (
            <div
              key={photo.src}
              className="group relative aspect-[4/3] overflow-hidden rounded border border-line"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <p className="absolute inset-x-5 bottom-4 text-[12.5px] leading-snug text-offwhite/90">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
