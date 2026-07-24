# AMAZELL — Homepage

Ultra-premium, cinematic scroll-driven homepage for AMAZELL tubular batteries.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis (smooth scroll)
- three.js (hero battery — no React Three Fiber, plain three.js in a client component for a lighter footprint)
- Lucide React (icons)
- next/image ready (swap in real product/logo imagery — see `public/`)

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Project structure
```
app/                  App Router entry: layout, page, global styles
components/
  layout/             Navbar, Footer, Cursor, Preloader
  providers/           SmoothScrollProvider (Lenis + GSAP), PreloaderProvider (loading state context)
  sections/            One component per homepage section
  three/               HeroBattery — the 3D rotating battery centerpiece
hooks/
  useLenis.ts          Wires Lenis to GSAP ScrollTrigger
  useScrollReveal.ts    Generic fade/lift-in-view for [data-reveal] elements
data/content.ts        All homepage copy & structured content — edit here first
types/index.ts         Shared content types
```

## Notes / next steps
- **Logo**: no brand logo file was supplied, so the nav/footer/preloader currently render a styled "AMAZELL" wordmark. Drop your logo into `public/` and swap it into `Navbar.tsx`, `Footer.tsx`, and `Preloader.tsx` using `next/image`.
- **Product imagery**: `FeaturedProducts.tsx` renders a stylised CSS battery silhouette per card as a placeholder. Replace with real product photography via `next/image` (each card is already sized for a fixed-aspect hero image).
- **Dealer map**: `DealerNetwork.tsx` uses a stylised dot-scatter, not a geographically accurate India map. If you want a real map, swap in an SVG India outline (e.g. topojson → path) and keep the same pulsing-marker pattern.
- All copy lives in `data/content.ts` — update stats, products, testimonials, timeline steps, etc. there without touching component code.
