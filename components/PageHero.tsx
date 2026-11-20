'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PageHero({
  eyebrow,
  title,
  text,
  image
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const words = titleRef.current.querySelectorAll('.split-word-inner');
    const ctx = gsap.context(() => {
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
          duration: 0.9,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.15
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [title]);

  const words = typeof title === 'string' ? title.split(' ') : [];

  return (
    <section
      ref={heroRef}
      className="page-hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(17,35,43,.82), rgba(17,35,43,.16)), url("${image}")`
      }}
    >
      <div className="container-wide page-hero-content">
        <span className="eyebrow eyebrow--light">{eyebrow}</span>
        <h1 ref={titleRef} className="split-text-heading">
          {words.map((word, i) => (
            <span key={i} className="split-mask-wrapper">
              <span className="split-word-inner">{word}</span>
              {i < words.length - 1 && <span className="split-space">&nbsp;</span>}
            </span>
          ))}
        </h1>
        <p>{text}</p>
        <span className="visual-label">Illustrative architectural imagery</span>
      </div>
    </section>
  );
}
