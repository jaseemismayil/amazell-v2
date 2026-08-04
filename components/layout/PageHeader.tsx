import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="border-b border-line bg-black pb-16 pt-[168px] md:pb-20 md:pt-[200px]">
      <div className="mx-auto max-w-wrap px-[6vw]">
        <div className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-muted-2">
          <Link href="/" className="transition-colors hover:text-gold-bright" data-hover>
            Home
          </Link>
          <ChevronRight size={12} className="text-muted-2" />
          <span className="text-muted">{eyebrow}</span>
        </div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-4 max-w-[760px] font-display text-[clamp(32px,5vw,58px)] text-offwhite">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
