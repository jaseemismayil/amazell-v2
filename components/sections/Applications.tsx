'use client';

import { useRef } from 'react';
import { applications } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Applications() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);

  return (
    <section id="applications" ref={rootRef} className="bg-black py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div data-reveal className="mb-16 max-w-[640px] opacity-0 translate-y-9">
          <div className="eyebrow">Where Power Matters</div>
          <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,54px)] text-offwhite">
            One core technology.
            <br />
            Six demanding worlds.
          </h2>
          <p className="mt-5 max-w-[520px] text-[15.5px] leading-relaxed text-muted">
            From a quiet home backup to round-the-clock industrial load — every
            AMAZELL cell is tuned for the conditions it&apos;s asked to survive.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 md:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app.num}
              data-reveal
              className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-black p-9 opacity-0 translate-y-9"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundImage: 'radial-gradient(120% 100% at 20% 0%, rgba(201,162,75,0.12), transparent 60%)' }}
              />
              <span className="text-[11px] tracking-[0.14em] text-muted-2">{app.num}</span>
              <h4 className="mt-auto text-[22px] text-offwhite transition-all duration-400 group-hover:translate-x-1.5 group-hover:text-gold-bright">
                {app.title}
              </h4>
              <p className="mt-2.5 max-w-[220px] text-[13.5px] leading-relaxed text-muted">
                {app.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
