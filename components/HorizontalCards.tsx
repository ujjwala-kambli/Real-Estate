'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Layers,
  Trees,
  Sparkles,
  Building2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CardItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  icon: typeof Compass;
  href: string;
}

const cardsData: CardItem[] = [
  {
    id: 'card-1',
    number: '01',
    category: 'ARCHITECTURE',
    title: 'Modern Villa',
    description:
      'Contemporary villa planning with sculpted steel elevation, space planning, and floor-to-ceiling panoramic glass.',
    image: '/images/villa-modern.jpg',
    icon: Compass,
    href: '/residences'
  },
  {
    id: 'card-2',
    number: '02',
    category: 'INTERIOR + WOODWORK',
    title: 'Luxury Wooden Interior',
    description:
      'Warm luxury interiors with custom woodwork, layered lighting and elegant materials.',
    image: '/images/interior-woodwork.jpg',
    icon: Layers,
    href: '/residences'
  },
  {
    id: 'card-3',
    number: '03',
    category: 'LANDSCAPE DESIGN',
    title: 'Cliffside Ocean Sanctuary',
    description:
      'Functional outdoor and landscape-led spaces with infinity pool terraces, circular travertine motor courts, and native cypress.',
    image: '/images/construction/stage-08-landscape-amenities.jpg',
    icon: Trees,
    href: '/amenities'
  },
  {
    id: 'card-4',
    number: '04',
    category: 'PENTHOUSE LIVING',
    title: 'Sky Observation Salon',
    description:
      'Double-height observation salon with 3.4m ceiling clearances, Italian furnishings, and uninterrupted Pacific horizon sunsets.',
    image: '/images/penthouse-interior.jpg',
    icon: Sparkles,
    href: '/residences'
  },
  {
    id: 'card-5',
    number: '05',
    category: 'FACADE CRAFTSMANSHIP',
    title: 'Champagne Bronze & Travertine',
    description:
      'Precision-engineered vertical acoustic louvers in marine-grade champagne bronze and honed Navona limestone pillars.',
    image: '/images/facade-detail.jpg',
    icon: Building2,
    href: '/development'
  }
];

export default function HorizontalCards() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      const isMobile = window.innerWidth < 768;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => isMobile ? `+=${Math.min(1400, getScrollDistance())}` : `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const progress = self.progress;
            const index = Math.min(cardsData.length - 1, Math.floor(progress * cardsData.length));
            setActiveCardIndex(index);
          }
        }
      });

      return () => {
        tween.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollCards = (direction: 'next' | 'prev') => {
    const trigger = ScrollTrigger.getAll().find(t => t.trigger === containerRef.current);
    if (!trigger) {
      if (trackRef.current) {
        trackRef.current.scrollBy({ left: direction === 'next' ? 440 : -440, behavior: 'smooth' });
      }
      return;
    }
    const currentScroll = window.scrollY;
    const delta = direction === 'next' ? 460 : -460;
    const targetScroll = Math.max(trigger.start, Math.min(trigger.end, currentScroll + delta));
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="horizontal-cards-section" id="collections">
      <div className="horizontal-sticky-inner">
        {/* Header bar */}
        <div className="container-wide horizontal-header-row">
          <div className="header-left">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> 02 — ARCHITECTURAL REPERTOIRE
            </span>
            <h2 className="horizontal-section-title">The spaces crafted for life.</h2>
            <p className="horizontal-section-sub">
              Our curated residential designs and living environments. Keep scrolling and they slide past.
            </p>
          </div>

          <div className="header-right-arrows">
            <div className="horizontal-counter-badge">
              <span>CARD 0{activeCardIndex + 1}</span>
              <span className="counter-sep">/</span>
              <span>0{cardsData.length}</span>
            </div>

            <button
              type="button"
              className="slider-arrow-btn"
              onClick={() => scrollCards('prev')}
              aria-label="Previous card"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={() => scrollCards('next')}
              aria-label="Next card"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Pinned horizontal slider track */}
        <div className="horizontal-track-viewport">
          <div ref={trackRef} className="horizontal-track-flow">
            {cardsData.map((card, idx) => {
              const IconComp = card.icon;
              const isActive = activeCardIndex === idx;
              return (
                <div
                  key={card.id}
                  className={`premium-feature-card ${isActive ? 'is-active-card' : ''}`}
                >
                  {/* Top Image Container */}
                  <div className="feature-card-image-wrap">
                    <div
                      className="feature-card-image"
                      style={{ backgroundImage: `url("${card.image}")` }}
                    />

                    {/* Top Left Number Pill (Screenshot 2 Match) */}
                    <span className="card-number-badge">{card.number}</span>

                    {/* Top Right Circular Dark Icon Badge (Screenshot 2 Match) */}
                    <div className="card-floating-icon-badge">
                      <IconComp size={19} />
                    </div>
                  </div>

                  {/* Card Bottom Body */}
                  <div className="feature-card-body">
                    <div className="card-body-left-icon">
                      <IconComp size={18} />
                    </div>

                    <div className="card-body-text-block">
                      <span className="card-category-label">{card.category}</span>
                      <h3 className="card-item-title">{card.title}</h3>
                      <p className="card-item-desc">{card.description}</p>
                    </div>

                    <Link href={card.href} className="card-action-arrow" aria-label={`View ${card.title}`}>
                      <ArrowRight size={19} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
