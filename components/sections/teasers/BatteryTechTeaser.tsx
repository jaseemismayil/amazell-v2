'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { techLayers } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function BatteryTechTeaser() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);

  return (
    <section ref={rootRef} className="bg-black py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal className="opacity-0 translate-y-9">
            <div className="eyebrow">Engineered Inside Out</div>
            <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,54px)] text-offwhite">
              Five layers. One relentless cell.
            </h2>
            <p className="mt-5 max-w-[440px] text-[15.5px] leading-relaxed text-muted">
              From the container to the core, every layer of an AMAZELL cell
              is engineered on purpose — not assembled by accident.
            </p>
            <Link href="/technology" data-hover className="btn btn-primary mt-9 inline-flex">
              <span>Explore The Technology</span>
              <ArrowRight size={15} className="btn-arrow" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {techLayers.slice(0, 4).map((layer) => (
              <div key={layer.key} data-reveal className="bg-panel p-7 opacity-0 translate-y-9">
                <div className="mb-3 font-display text-[12px] tracking-[0.1em] text-gold">
                  {layer.index} — {layer.key}
                </div>
                <h4 className="text-[16.5px] text-offwhite">{layer.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
