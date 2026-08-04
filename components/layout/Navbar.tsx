'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navLinks } from '@/data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      start: 60,
      end: 99999,
      onUpdate: (self) => setScrolled(self.scroll() > 60),
    });
    return () => trigger.kill();
  }, []);

  // On inner pages we're never scrolled to top-of-hero, so keep the bar
  // in its "scrolled" (backdrop) state immediately rather than starting
  // transparent over unrelated page content.
  const isHome = pathname === '/';
  const showScrolledStyle = scrolled || !isHome;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[500] border-b transition-all duration-500 ${
        showScrolledStyle
          ? 'border-line bg-black/55 py-4 backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-wrap items-center justify-between gap-6 px-[6vw]">
        <Link href="/" className="relative block h-6 w-[100px] shrink-0" aria-label="AMAZELL home">
          <Image
            src="/brand/amazell-logo-horizontal-light.webp"
            alt="AMAZELL"
            fill
            sizes="100px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden gap-10 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-1 text-[12.5px] font-medium uppercase tracking-[0.06em] transition-colors hover:text-offwhite ${
                  active ? 'text-offwhite' : 'text-muted'
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-500 group-hover:scale-x-100 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#final-cta"
          data-hover
          className="rounded-full border border-line-strong px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors hover:border-gold hover:bg-gold/[0.08]"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
