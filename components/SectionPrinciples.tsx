'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SectionPrinciples() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !card1Ref.current || !card2Ref.current || !card3Ref.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Initial state: hidden off to the right with 0 opacity
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
        x: 55,
        opacity: 0,
        scale: 0.95
      });

      // Strict one-by-one sequential reveal tied to scroll!
      // If user does not scroll down, cards 2 and 3 stay hidden.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 0.5,
        }
      });

      tl.to(card1Ref.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      })
      .to(card2Ref.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      }, '+=0.35')
      .to(card3Ref.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      }, '+=0.35');
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="rewired-right-col">
      {/* 01: Reveals first as user enters */}
      <div ref={card1Ref} className="rewired-principle-card principle-scroll-card">
        <span className="principle-number">01</span>
        <div className="principle-content">
          <h3 className="principle-title">Talk to a Real Partner</h3>
          <p className="principle-desc">
            Direct dialogue with our master architectural consortium and structural engineers — professionals who listen to your generational vision before laying a single column.
          </p>
        </div>
      </div>

      {/* 02: Only reveals when user scrolls down further */}
      <div ref={card2Ref} className="rewired-principle-card principle-scroll-card">
        <span className="principle-number">02</span>
        <div className="principle-content">
          <h3 className="principle-title">Get Absolute Clarity</h3>
          <p className="principle-desc">
            We define what you truly need from geological bore data to solar-wind orientation. Zero compromises, zero hidden deviations from the masterplan.
          </p>
        </div>
      </div>

      {/* 03: Only reveals when user scrolls down further */}
      <div ref={card3Ref} className="rewired-principle-card principle-scroll-card">
        <span className="principle-number">03</span>
        <div className="principle-content">
          <h3 className="principle-title">Move Forward with Confidence</h3>
          <p className="principle-desc">
            From seismic isolation raft foundations to certified occupancy handover, we bring your coastal sanctuary to life with unmatched structural discipline.
          </p>
        </div>
      </div>
    </div>
  );
}
