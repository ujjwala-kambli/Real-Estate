'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. Eyebrow Subtle Fade & Tracking expansion
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          {
            opacity: 0,
            y: 12,
            letterSpacing: '0.08em'
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: '0.14em',
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }

      // 2. Split-Text Heading Mask Reveal: Each word emerges from the invisible mask line
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.split-word-inner');
        gsap.fromTo(
          words,
          {
            yPercent: 120,
            rotateZ: 2,
            opacity: 0
          },
          {
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.035,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 86%',
              once: true
            }
          }
        );
      }

      // 3. Subtitle / Paragraph Fade & Slide
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          {
            opacity: 0,
            y: 16
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: 0.18,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 86%',
              once: true
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [title]);

  const words = typeof title === 'string' ? title.split(' ') : [];

  return (
    <div
      ref={containerRef}
      className={`section-heading ${dark ? 'section-heading--light' : ''}`}
    >
      <span ref={eyebrowRef} className="eyebrow split-eyebrow">
        {eyebrow}
      </span>

      <h2 ref={titleRef} className="split-text-heading">
        {words.map((word, i) => (
          <span key={i} className="split-mask-wrapper">
            <span className="split-word-inner">{word}</span>
            {i < words.length - 1 && <span className="split-space">&nbsp;</span>}
          </span>
        ))}
      </h2>

      {text && (
        <p ref={textRef} className="split-text-desc">
          {text}
        </p>
      )}
    </div>
  );
}
