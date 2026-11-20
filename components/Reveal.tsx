'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  startOffset = 'top 88%'
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  startOffset?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xOffset = direction === 'left' ? -40 : direction === 'right' ? 40 : 0;
    const yOffset = direction === 'up' ? 30 : direction === 'down' ? -30 : 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          x: xOffset,
          y: yOffset,
          autoAlpha: 0
        },
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          delay: delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: startOffset,
            once: true
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, direction, startOffset]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
