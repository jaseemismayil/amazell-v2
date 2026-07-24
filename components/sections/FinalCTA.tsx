'use client';

import { useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FinalCTA() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="final-cta"
      ref={rootRef}
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-black text-center"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 blur-[30px]"
        style={{ background: 'radial-gradient(circle, rgba(201,162,75,0.16), transparent 60%)' }}
      />
      <div className="relative z-[2] mx-auto max-w-wrap px-[6vw]">
        <div data-reveal className="eyebrow mb-6 justify-center opacity-0 translate-y-9">AMAZELL</div>
        <h2 data-reveal className="font-display text-[clamp(34px,6.6vw,84px)] leading-[1.05] text-offwhite opacity-0 translate-y-9">
          Power the Future
          <br />
          with AMAZELL
        </h2>
        <a href="mailto:hello@amazell.in" data-hover className="btn btn-primary mt-11 inline-flex">
          <span>Get in Touch</span>
        </a>
      </div>
    </section>
  );
}
