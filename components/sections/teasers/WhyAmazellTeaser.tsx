'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Clock, Zap, ShieldCheck, Network, ArrowRight } from 'lucide-react';
import { whyItems } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { WhyItem } from '@/types';

const icons: Record<WhyItem['icon'], typeof Clock> = {
  clock: Clock,
  zap: Zap,
  shield: ShieldCheck,
  network: Network,
};

export default function WhyAmazellTeaser() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);

  return (
    <section ref={rootRef} className="bg-black py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal className="opacity-0 translate-y-9">
            <div className="eyebrow">Why AMAZELL</div>
            <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,54px)] text-offwhite">
              Precision engineering,
              <br />
              not just manufacturing.
            </h2>
            <Link href="/about" data-hover className="btn btn-primary mt-9 inline-flex">
              <span>More About AMAZELL</span>
              <ArrowRight size={15} className="btn-arrow" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {whyItems.slice(0, 2).map((item) => {
              const Icon = icons[item.icon];
              return (
                <div key={item.title} data-reveal className="bg-panel p-9 opacity-0 translate-y-9">
                  <Icon className="mb-6 h-9 w-9 stroke-[1.2px] text-gold" />
                  <h4 className="mb-3 text-[20px] text-offwhite">{item.title}</h4>
                  <p className="max-w-[380px] text-[14px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
