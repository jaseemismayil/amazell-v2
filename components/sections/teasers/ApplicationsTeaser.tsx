'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { applications } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ApplicationsTeaser() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);

  return (
    <section ref={rootRef} className="bg-black py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div data-reveal className="max-w-[560px] opacity-0 translate-y-9">
            <div className="eyebrow">Where Power Matters</div>
            <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,54px)] text-offwhite">
              One core technology.
              <br />
              Six demanding worlds.
            </h2>
          </div>
          <Link
            href="/applications"
            data-hover
            data-reveal
            className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-gold-bright opacity-0 translate-y-9"
          >
            View All Applications <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {applications.slice(0, 3).map((app) => (
            <div
              key={app.num}
              data-reveal
              className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-black p-9 opacity-0 translate-y-9"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundImage: 'radial-gradient(120% 100% at 20% 0%, rgba(201,162,75,0.12), transparent 60%)' }}
              />
              <span className="text-[11px] tracking-[0.14em] text-muted-2">{app.num}</span>
              <h4 className="mt-auto text-[20px] text-offwhite transition-all duration-400 group-hover:translate-x-1.5 group-hover:text-gold-bright">
                {app.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
