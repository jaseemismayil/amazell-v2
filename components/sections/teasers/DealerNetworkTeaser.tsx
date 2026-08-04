'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { dealerCities } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function DealerNetworkTeaser() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);
  const activeCities = dealerCities.filter((c) => c.active);

  return (
    <section ref={rootRef} className="bg-panel py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div data-reveal className="eyebrow opacity-0 translate-y-9">Dealer Network</div>
        <h2 data-reveal className="mt-4 max-w-[640px] font-display text-[clamp(30px,4.2vw,54px)] text-offwhite opacity-0 translate-y-9">
          Present across every state you serve.
        </h2>
        <p data-reveal className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-muted opacity-0 translate-y-9">
          Search your city to find your nearest authorised AMAZELL dealer,
          or apply to bring the network to yours.
        </p>

        <div data-reveal className="mt-8 flex flex-wrap gap-2.5 opacity-0 translate-y-9">
          {activeCities.map((city) => (
            <span key={city.name} className="rounded-full border border-gold-dim px-4 py-2 text-xs text-gold-bright">
              {city.name}
            </span>
          ))}
        </div>

        <Link href="/dealers" data-hover className="btn btn-primary mt-9 inline-flex">
          <span>Find Or Become A Dealer</span>
          <ArrowRight size={15} className="btn-arrow" />
        </Link>
      </div>
    </section>
  );
}
