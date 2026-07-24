'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navLinks } from '@/data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      start: 60,
      end: 99999,
      onUpdate: (self) => setScrolled(self.scroll() > 60),
    });
    return () => trigger.kill();
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[500] border-b transition-all duration-500 ${
        scrolled
          ? 'border-line bg-black/55 py-4 backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-wrap items-center justify-between gap-6 px-[6vw]">
        <a href="#hero" className="flex items-center gap-2 font-display text-lg font-bold tracking-[0.12em]">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_12px_2px_rgba(201,162,75,0.35)]" />
          AMAZELL
        </a>

        <nav className="hidden gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-[12.5px] font-medium uppercase tracking-[0.06em] text-muted transition-colors hover:text-offwhite"
            >
              {link.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href="#final-cta"
          data-hover
          className="rounded-full border border-line-strong px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors hover:border-gold hover:bg-gold/[0.08]"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
