'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FeaturedProductsTeaser() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef as React.RefObject<HTMLElement>);

  return (
    <section ref={rootRef} className="bg-black py-24 md:py-[150px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div data-reveal className="max-w-[560px] opacity-0 translate-y-9">
            <div className="eyebrow">Featured Products</div>
            <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,54px)] text-offwhite">
              Built for every backup, at every scale.
            </h2>
          </div>
          <Link
            href="/products"
            data-hover
            data-reveal
            className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-gold-bright opacity-0 translate-y-9"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <Link
              href="/products"
              data-hover
              key={product.name}
              data-reveal
              className="group relative flex h-[420px] flex-col overflow-hidden rounded border border-line bg-panel-2 opacity-0 translate-y-9 transition-colors duration-400 hover:border-gold-dim"
            >
              <div className="relative h-[220px] w-full overflow-hidden bg-[radial-gradient(circle_at_50%_38%,rgba(201,162,75,0.10),transparent_68%)]">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 33vw"
                  className="object-contain p-8 drop-shadow-[0_28px_36px_rgba(0,0,0,0.55)]"
                />
                <span className="absolute left-5 top-5 rounded-full border border-gold-dim bg-black/60 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.16em] text-gold-bright backdrop-blur-sm">
                  {product.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between border-t border-line p-6 pt-5">
                <div>
                  <div className="font-display text-[17px] leading-tight text-offwhite">{product.name}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.1em] text-muted-2">Model {product.model}</div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-gold-bright">
                  View Specifications <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
