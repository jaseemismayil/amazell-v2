'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const TOTAL_FRAMES = 100;
// Decoded frames held resident at once. 1280x720 is ~3.5MB/frame decoded, so
// the full sequence would be ~350MB — fine on desktop but unnecessary risk
// on mobile. 40 frames (~140MB) keeps the section near the current scroll
// position cheap while the background warm pass (below) keeps the rest
// instantly available from the browser's HTTP cache.
const CACHE_LIMIT = 40;

function framePath(index: number) {
  return `/battery-tech-frames/frame-${String(index).padStart(3, '0')}.webp`;
}

export interface BatteryFrameSequenceHandle {
  draw: (progress: number) => void;
}

/**
 * Renders the exploded-battery frame sequence for the Battery Technology
 * section. Unlike the hero, this section already owns a single ScrollTrigger
 * that drives copy switching and progress bars (see BatteryTech.tsx) — so
 * rather than registering a second, competing scroll listener, this
 * component exposes an imperative draw(progress) handle that the parent
 * calls directly from its existing onUpdate. Keeps one source of truth for
 * scroll progress and avoids a duplicate ScrollTrigger on the same trigger.
 */
const BatteryFrameSequence = forwardRef<BatteryFrameSequenceHandle>(function BatteryFrameSequence(
  _props,
  ref
) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<(progress: number) => void>(() => {});

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    // "contain" rather than the hero's "cover" — this sits inside a bounded
    // panel, not a full-bleed background, so the whole product should stay
    // visible rather than being cropped to fill the frame.
    const drawImageContain = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!cw || !ch || !iw || !ih) return;
      const scale = Math.min(cw / iw, ch / ih);
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
        if (clamped === latestRequested) {
          currentDrawn = clamped;
          drawImageContain(img);
        }
      });
      if (ready) {
        currentDrawn = clamped;
        drawImageContain(ready);
      }
    };

    // ---------- sizing ----------
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const cached = cache.get(currentDrawn);
      if (cached) drawImageContain(cached);
    };
    resize();
    window.addEventListener('resize', resize);

    // First paint immediately.
    showFrame(1);

    // ---------- background cache warm ----------
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

    drawRef.current = (progress: number) => {
      const index = Math.round(1 + progress * (TOTAL_FRAMES - 1));
      showFrame(index);
    };

    return () => {
      warmCancelled = true;
      window.removeEventListener('resize', resize);
      cache.clear();
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      draw: (progress: number) => drawRef.current(progress),
    }),
    []
  );

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
});

export default BatteryFrameSequence;
