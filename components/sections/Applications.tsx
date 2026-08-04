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
