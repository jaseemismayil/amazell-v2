'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Premium magnetic-style cursor: a small dot that tracks the mouse exactly,
 * and a trailing ring that eases behind it and expands over interactive
 * elements marked with [data-hover].
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
    };
    gsap.ticker.add(tick);

    const hoverables = () =>
      document.querySelectorAll('a, button, [data-hover]');
    const onEnter = () => document.body.classList.add('cursor-hover');
    const onLeave = () => document.body.classList.remove('cursor-hover');

    // Re-bind on a short interval-free mutation approach: use event delegation instead.
    const delegatedEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-hover]')) onEnter();
    };
    const delegatedLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-hover]')) onLeave();
    };
    document.addEventListener('mouseover', delegatedEnter);
    document.addEventListener('mouseout', delegatedLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
      document.removeEventListener('mouseover', delegatedEnter);
      document.removeEventListener('mouseout', delegatedLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="cursor" className="-translate-x-1/2 -translate-y-1/2" />
      <div ref={ringRef} id="cursor-ring" className="-translate-x-1/2 -translate-y-1/2" />
    </>
  );
}
