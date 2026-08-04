'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { dealerCities } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const markerCities = dealerCities.filter((c) => c.marker);

export default function DealerNetwork() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);

  const [query, setQuery] = useState('');
  const activeSet = new Set(dealerCities.filter((c) => c.active).map((c) => c.name.toLowerCase()));

  const isOn = (name: string) => {
    const v = query.trim().toLowerCase();
    if (v.length === 0) return activeSet.has(name.toLowerCase());
    return name.toLowerCase().includes(v);
  };

  return (
    <section id="dealers" ref={rootRef} className="bg-panel py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div data-reveal className="mt-0 flex max-w-[420px] items-center rounded-full border border-line-strong py-1.5 pl-5.5 pr-1.5 opacity-0 translate-y-9">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your city…"
                className="flex-1 bg-transparent py-2.5 text-[13.5px] text-offwhite placeholder:text-muted-2 focus:outline-none"
              />
              <button type="button" data-hover className="rounded-full bg-offwhite px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-black">
                Search
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {dealerCities.map((city) => (
                <span
                  key={city.name}
                  className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                    isOn(city.name) ? 'border-gold-dim text-gold-bright' : 'border-line text-muted'
                  }`}
                >
                  {city.name}
                </span>
              ))}
            </div>

            <Link href="/#final-cta" data-hover className="btn btn-primary mt-9 inline-flex">
              <span>Become a Dealer</span>
            </Link>
          </div>

          <div data-reveal className="relative mx-auto aspect-[1/1.05] w-full max-w-[440px] opacity-0 translate-y-9">
            {/* faint background scatter to suggest broader coverage */}
            {[
              ['8%', '44%'], ['14%', '60%'], ['22%', '34%'], ['30%', '50%'],
              ['38%', '66%'], ['44%', '30%'], ['52%', '46%'], ['60%', '58%'],
              ['68%', '38%'], ['76%', '50%'], ['82%', '44%'],
            ].map(([top, left], i) => (
              <div key={i} className="map-dot" style={{ top, left }} />
            ))}

            {markerCities.map((city) => (
              <div key={city.name} className="map-dot city" style={{ top: city.top, left: city.left }}>
                <span className="absolute left-3.5 -top-1 whitespace-nowrap text-[10px] tracking-[0.06em] text-offwhite">
                  {city.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
