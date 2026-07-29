'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { techLayers } from '@/data/content';
import type { BatteryFrameSequenceHandle } from '@/components/battery-tech/BatteryFrameSequence';

// Canvas drawing must never run during SSR (no window/canvas on the server).
const BatteryFrameSequence = dynamic(() => import('@/components/battery-tech/BatteryFrameSequence'), {
  ssr: false,
});

export default function BatteryTech() {
  const pinRef = useRef<HTMLDivElement>(null);
  const frameSeqRef = useRef<BatteryFrameSequenceHandle>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const step = Math.min(5, Math.max(1, Math.ceil(self.progress * 5) || 1));

          document.querySelectorAll<HTMLElement>('.tech-copy-item').forEach((el) => {
            el.classList.toggle('opacity-100', Number(el.dataset.step) === step);
            el.classList.toggle('hidden', Number(el.dataset.step) !== step);
          });

          document.querySelectorAll<HTMLElement>('.tech-progress-bar').forEach((el, i) => {
            el.style.transform = i < step ? 'scaleX(1)' : 'scaleX(0)';
          });

          frameSeqRef.current?.draw(self.progress);
        },
      });

      return () => trigger.kill();
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech" className="bg-black">
      <div ref={pinRef} className="relative h-[420vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-wrap grid-cols-1 items-center gap-10 px-[6vw] md:grid-cols-2">
            {/* exploded battery visual */}
            <div className="relative h-[44vh] overflow-hidden rounded border border-line bg-panel-2 md:order-1 md:h-[66vh]">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 42%, rgba(201,162,75,0.10), transparent 68%)',
                }}
              />
              <BatteryFrameSequence ref={frameSeqRef} />
            </div>

            {/* synced copy */}
            <div className="md:order-2 md:pl-5">
              <div className="eyebrow">Engineered Inside Out</div>

              {techLayers.map((layer, i) => (
                <div
                  key={layer.key}
                  data-step={i + 1}
                  className={`tech-copy-item ${i === 0 ? '' : 'hidden'}`}
                >
                  <div className="mb-4 mt-4 font-display text-[13px] tracking-[0.1em] text-gold">
                    {layer.index} — {layer.key}
                  </div>
                  <h3 className="mb-4 font-display text-[clamp(24px,2.6vw,36px)] text-offwhite">
                    {layer.title}
                  </h3>
                  <p className="max-w-[420px] text-[15px] leading-relaxed text-muted">
                    {layer.description}
                  </p>
                </div>
              ))}

              <div className="mt-11 flex gap-1.5">
                {techLayers.map((layer, i) => (
                  <i key={layer.key} className="relative h-0.5 flex-1 overflow-hidden bg-line-strong">
                    <span
                      className="tech-progress-bar absolute inset-0 origin-left bg-gold-bright"
                      style={{ transform: i === 0 ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </i>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
