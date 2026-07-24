'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/content';

export default function FeaturedProducts() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const getDistance = () => {
        const track = trackRef.current;
        if (!track) return 0;
        return Math.max(0, track.scrollWidth - window.innerWidth + 80);
      };

      const trigger = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(trackRef.current, { x: -self.progress * getDistance() });
        },
      });

      return () => trigger.kill();
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products" className="overflow-hidden bg-black">
      <div ref={pinRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
          <div className="mb-14 px-[6vw]">
            <div className="eyebrow">Featured Products</div>
            <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,54px)] text-offwhite">
              Built for every backup, at every scale.
            </h2>
          </div>

          <div ref={trackRef} className="flex gap-7 pl-[6vw] will-change-transform">
            {products.map((product) => (
              <div
                key={product.name}
                className="relative flex h-[480px] w-[min(78vw,380px)] flex-none flex-col justify-between overflow-hidden rounded border border-line bg-gradient-to-br from-[#0d0d0e] to-[#080808] p-8 transition-colors duration-400 hover:border-gold-dim"
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[10px]"
                  style={{ background: 'radial-gradient(circle, rgba(201,162,75,0.20), transparent 70%)' }}
                />
                <div>
                  <span className="text-[10.5px] uppercase tracking-[0.16em] text-gold">
                    {product.badge}
                  </span>
                  <div className="flex h-[190px] items-center justify-center">
                    <div className="relative h-[150px] w-[52px] rounded-[30px] border border-line-strong bg-gradient-to-b from-[#2c2211] to-[#161008] shadow-[inset_0_0_20px_rgba(0,0,0,0.6),0_0_30px_-8px_rgba(201,162,75,0.35)]">
                      <span className="absolute left-1/2 top-2 h-2 w-5 -translate-x-1/2 rounded bg-gradient-to-r from-bronze to-gold-bright" />
                    </div>
                  </div>
                  <div className="mt-4 font-display text-[21px] text-offwhite">{product.name}</div>
                </div>

                <div>
                  <div className="flex gap-6 border-t border-line pt-4.5">
                    <div>
                      <span className="mb-1 block text-[10.5px] uppercase tracking-[0.08em] text-muted-2">Capacity</span>
                      <b className="font-display text-[15px] font-medium text-offwhite">{product.capacity}</b>
                    </div>
                    <div>
                      <span className="mb-1 block text-[10.5px] uppercase tracking-[0.08em] text-muted-2">Warranty</span>
                      <b className="font-display text-[15px] font-medium text-offwhite">{product.warranty}</b>
                    </div>
                    <div>
                      <span className="mb-1 block text-[10.5px] uppercase tracking-[0.08em] text-muted-2">Life</span>
                      <b className="font-display text-[15px] font-medium text-offwhite">{product.life}</b>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-gold-bright">
                    View Specifications <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
