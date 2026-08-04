'use client';

import { useRef } from 'react';
import { Clock, Zap, ShieldCheck, Network } from 'lucide-react';
import { whyItems } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { WhyItem } from '@/types';

const icons: Record<WhyItem['icon'], typeof Clock> = {
  clock: Clock,
  zap: Zap,
  shield: ShieldCheck,
  network: Network,
};

export default function WhyAmazell() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);

  return (
    <section id="why" ref={rootRef} className="bg-black py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          {whyItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.title} data-reveal className="bg-panel p-11 opacity-0 translate-y-9">
                <Icon className="mb-7 h-11 w-11 stroke-[1.2px] text-gold" />
                <h4 className="mb-3.5 text-[23px] text-offwhite">{item.title}</h4>
                <p className="max-w-[420px] text-[14.5px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
