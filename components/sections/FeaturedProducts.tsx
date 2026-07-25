'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
                className="relative flex h-[500px] w-[min(78vw,380px)] flex-none flex-col overflow-hidden rounded border border-line bg-[#0a0a0a] transition-colors duration-400 hover:border-gold-dim"
              >
                <div className="relative h-[230px] w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 768px) 78vw, 380px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
                  <span className="absolute left-5 top-5 rounded-full border border-gold-dim bg-black/60 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.16em] text-gold-bright backdrop-blur-sm">
                    {product.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-7 pt-6">
                  <div className="font-display text-[21px] text-offwhite">{product.name}</div>

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
