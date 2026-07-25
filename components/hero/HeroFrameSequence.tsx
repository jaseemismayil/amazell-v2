'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TOTAL_FRAMES = 300;
// How many decoded frames we keep resident at once. At 1280x720 each decoded
// bitmap is ~3.5MB — holding all 300 would be ~1GB and risks crashing the tab
// on mobile. 60 frames (~210MB) keeps scrubbing smooth near the current
// position while staying safe. Frames outside the cache are still served
// instantly from the browser's HTTP cache once the background warm pass
// below has fetched them.
const CACHE_LIMIT = 60;
const MOBILE_BREAKPOINT = 768;
const STATIC_FALLBACK_FRAME = 150;

function framePath(index: number) {
  return `/hero-frames/frame-${String(index).padStart(3, '0')}.webp`;
}

/**
 * Renders the hero's scroll-scrubbed product sequence. Replaces the earlier
 * three.js HeroBattery scene with a <canvas> that draws frame N of a
 * pre-rendered 300-frame sequence based on scroll progress through #hero,
 * using the same ScrollTrigger pin/scrub pattern the three.js version used.
 */
export default function HeroFrameSequence({ sectionId }: { sectionId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const skipSequence = reducedMotion || isMobile;

    // ---------- bounded LRU frame cache ----------
    const cache = new Map<number, HTMLImageElement>();
    const order: number[] = [];

    const touch = (index: number) => {
      const i = order.indexOf(index);
      if (i !== -1) order.splice(i, 1);
      order.push(index);
      while (order.length > CACHE_LIMIT) {
        const evict = order.shift();
        if (evict !== undefined) cache.delete(evict);
      }
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let latestRequested = 1;
    let currentDrawn = 1;

    const drawImageCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!cw || !ch || !iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const requestFrame = (index: number, onReady: (img: HTMLImageElement) => void) => {
      const cached = cache.get(index);
      if (cached && cached.complete) {
        touch(index);
        onReady(cached);
        return cached;
      }
      const img = new Image();
      img.decoding = 'async';
      img.src = framePath(index);
      img.onload = () => {
        cache.set(index, img);
        touch(index);
        onReady(img);
      };
      return undefined;
    };

    const showFrame = (index: number) => {
      const clamped = Math.min(TOTAL_FRAMES, Math.max(1, index));
      latestRequested = clamped;
      const ready = requestFrame(clamped, (img) => {
        // Guard against out-of-order async loads drawing a stale frame over
        // a newer one requested while this frame was still in flight.
        if (clamped === latestRequested) {
          currentDrawn = clamped;
          drawImageCover(img);
        }
      });
      if (ready) {
        currentDrawn = clamped;
        drawImageCover(ready);
      }
    };

    // ---------- sizing ----------
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const cached = cache.get(currentDrawn);
      if (cached) drawImageCover(cached);
    };
    resize();
    window.addEventListener('resize', resize);

    // First paint immediately so the hero is never blank while the rest loads.
    showFrame(1);

    if (skipSequence) {
      // Static fallback for mobile / prefers-reduced-motion: one frame, no
      // scroll listener, no background prefetch — keeps bandwidth and battery
      // use minimal on constrained devices.
      showFrame(STATIC_FALLBACK_FRAME);
      return () => {
        window.removeEventListener('resize', resize);
      };
    }

    // ---------- background cache warm ----------
    // Fetches every frame once so the browser's HTTP cache is warm and later
    // scrubbing never waits on the network — decoding on demand is cheap
    // (single-digit ms), the LRU cache above just bounds how much stays
    // decoded in memory at once.
    let warmCancelled = false;
    const warm = async () => {
      const CONCURRENCY = 4;
      let cursor = 1;
      const workers = Array.from({ length: CONCURRENCY }).map(async () => {
        while (!warmCancelled && cursor <= TOTAL_FRAMES) {
          const idx = cursor++;
          await new Promise<void>((resolve) => {
            const img = new Image();
            img.decoding = 'async';
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = framePath(idx);
          });
        }
      });
      await Promise.all(workers);
    };
    warm();

    // ---------- scroll-linked scrub ----------
    const trigger = ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const index = Math.round(1 + self.progress * (TOTAL_FRAMES - 1));
        showFrame(index);
      },
    });

    return () => {
      warmCancelled = true;
      window.removeEventListener('resize', resize);
      trigger.kill();
      cache.clear();
    };
  }, [sectionId]);

  return (
    <div ref={wrapRef} className="absolute inset-0 z-[1]">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
