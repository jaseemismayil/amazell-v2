import Image from 'next/image';
import { Linkedin, Instagram, Youtube } from 'lucide-react';

const footerCols = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#why' },
      { label: 'Manufacturing', href: '#manufacturing' },
      { label: 'Technology', href: '#tech' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Home Series', href: '#products' },
      { label: 'Inverter Series', href: '#products' },
      { label: 'Solar Series', href: '#products' },
    ],
  },
  {
    title: 'Network',
    links: [
      { label: 'Find a Dealer', href: '#dealers' },
      { label: 'Become a Dealer', href: '#dealers' },
      { label: 'Contact Us', href: '#final-cta' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black px-[6vw] pb-8 pt-20">
      <div className="mx-auto max-w-wrap">
        <div className="flex flex-wrap justify-between gap-14 border-b border-line pb-14">
          <div>
            <div className="relative h-24 w-[84px]">
              <Image
                src="/brand/amazell-logo-square-light.webp"
                alt="AMAZELL"
                fill
                sizes="84px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-4 max-w-[260px] text-[13.5px] leading-relaxed text-muted">
              High-performance tubular batteries, engineered for long life and
              built for Indian conditions.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            {footerCols.map((col) => (
              <div key={col.title}>
                <h6 className="mb-5 text-[11px] uppercase tracking-[0.14em] text-muted-2">
                  {col.title}
                </h6>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="mb-3 block text-sm text-muted transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
          <span className="text-xs text-muted-2">
            © 2026 AMAZELL. All rights reserved.
          </span>
          <div className="flex gap-4">
            {[Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                data-hover
                aria-label="Social link"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-gold hover:text-gold-bright"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
          <span className="text-xs text-muted-2">hello@amazell.in</span>
        </div>
      </div>
    </footer>
  );
}
