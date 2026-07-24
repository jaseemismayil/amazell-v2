'use client';

import { useRef } from 'react';
import { testimonials } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Testimonials() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);

  return (
    <section id="testimonials" ref={rootRef} className="bg-black py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div data-reveal className="mb-16 max-w-[640px] opacity-0 translate-y-9">
          <div className="eyebrow">Trusted Across India</div>
          <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,54px)] text-offwhite">
            What our dealers and
            <br />
            customers are saying.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              data-reveal
              className="rounded border border-line bg-gradient-to-b from-white/[0.02] to-transparent p-9 opacity-0 translate-y-9"
            >
              <div className="mb-5.5 text-[13px] tracking-[2px] text-gold">★★★★★</div>
              <p className="font-display text-[15px] font-light leading-relaxed text-offwhite/85">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6.5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-bronze to-gold-bright" />
                <div>
                  <span className="block text-[13px] font-semibold text-offwhite">{t.name}</span>
                  <small className="text-[11.5px] text-muted">{t.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
