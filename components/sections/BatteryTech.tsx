'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techLayers } from '@/data/content';

export default function BatteryTech() {
  const pinRef = useRef<HTMLDivElement>(null);

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

          document.querySelectorAll<HTMLElement>('.layer-label').forEach((el) => {
            const ln = Number(el.dataset.l);
            gsap.to(el, { opacity: ln <= step ? 1 : 0, duration: 0.3 });
          });

          const spread = self.progress;
          gsap.set('.l1', { x: -spread * 46 });
          gsap.set('.l2', { x: -spread * 24 });
          gsap.set('.l3', { x: 0 });
          gsap.set('.l4', { x: spread * 24 });
          gsap.set('.l5', { x: spread * 46 });
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
            {/* exploded layer visual */}
            <div className="relative flex h-[44vh] items-center justify-center md:order-1 md:h-[66vh]">
              <div className="layer-stack">
                {techLayers.map((layer, i) => (
                  <div key={layer.key} className={`layer l${i + 1}`}>
                    <span className="layer-label" data-l={i + 1}>
                      <b>{layer.index}</b>&nbsp; {layer.key}
                    </span>
                  </div>
                ))}
              </div>
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
