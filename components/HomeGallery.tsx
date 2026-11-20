'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Eye, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'construction' | 'architecture' | 'interior';
  categoryLabel: string;
  image: string;
  caption: string;
  meta: string;
}

interface HomeGalleryProps {
  limit?: number;
  showTabs?: boolean;
}

const galleryData: GalleryItem[] = [
  {
    id: 'g-09',
    title: 'The Final Reveal · Dusk Radiance',
    category: 'architecture',
    categoryLabel: 'Completed Architecture',
    image: '/images/construction/stage-09-final-reveal.jpg',
    caption: 'Aurevia Estates glowing at twilight against the Pacific ocean horizon.',
    meta: 'Architectural Hero · Dusk Blue Hour'
  },
  {
    id: 'g-07',
    title: 'Facade Enclosure & Bronze Fins',
    category: 'construction',
    categoryLabel: 'Construction Keyframe',
    image: '/images/construction/stage-07-facade-development.jpg',
    caption: 'Low-E curtain wall glazing installation alongside champagne bronze architectural louvers.',
    meta: 'Phase 07 · Building Enclosure'
  },
  {
    id: 'g-interior',
    title: 'Sky Horizon Penthouse Living',
    category: 'interior',
    categoryLabel: 'Interior Spaces',
    image: '/images/penthouse-interior.jpg',
    caption: 'Double-height observation salon with Italian furnishings and sunset horizon vistas.',
    meta: 'Level 09 · Penthouse Residence'
  },
  {
    id: 'g-detail',
    title: 'Champagne Bronze & Navona Travertine',
    category: 'architecture',
    categoryLabel: 'Material Detail',
    image: '/images/facade-detail.jpg',
    caption: 'Precision engineered vertical louvers reflecting coastal azure light.',
    meta: 'Exterior Detail · Marine Grade Bronze'
  },
  {
    id: 'g-04',
    title: 'Monolithic Raft Foundation Pour',
    category: 'construction',
    categoryLabel: 'Construction Keyframe',
    image: '/images/construction/stage-04-foundation.jpg',
    caption: 'Volumetric concrete boom pumps casting the reinforced subterranean base slab.',
    meta: 'Phase 04 · Substructure'
  },
  {
    id: 'g-08',
    title: 'Cliffside Infinity Pool & Arrival',
    category: 'interior',
    categoryLabel: 'Landscape & Amenities',
    image: '/images/construction/stage-08-landscape-amenities.jpg',
    caption: 'Rooftop cantilevered pool and manicured coastal cypress arrival motor court.',
    meta: 'Phase 08 · Civil & Greenery'
  },
  {
    id: 'g-02',
    title: 'Earthmoving & JCB Mobilization',
    category: 'construction',
    categoryLabel: 'Construction Keyframe',
    image: '/images/construction/stage-02-site-preparation.jpg',
    caption: 'Active grading, excavation pads, and perimeter fencing on the coastal bluff.',
    meta: 'Phase 02 · Earthmoving'
  },
  {
    id: 'g-01',
    title: 'The Virgin Coastal Bluff',
    category: 'construction',
    categoryLabel: 'Construction Keyframe',
    image: '/images/construction/stage-01-vision.jpg',
    caption: 'Survey boundary demarcations on untouched terrain prior to excavation.',
    meta: 'Phase 01 · Site Genesis'
  }
];

export default function HomeGallery({ limit = 8, showTabs = false }: HomeGalleryProps) {
  const [filter, setFilter] = useState<'all' | 'construction' | 'architecture' | 'interior'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryWrapRef = useRef<HTMLDivElement>(null);
  const arcStageRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const isInteractingRef = useRef(false);

  const displayData = limit ? galleryData.slice(0, limit) : galleryData;
  const filteredItems =
    filter === 'all' ? displayData : displayData.filter(item => item.category === filter);

  // SCROLL-DRIVEN PINNED REVOLUTION: Cards advance one-by-one with user scroll!
  useEffect(() => {
    if (!arcStageRef.current || !filteredItems.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: arcStageRef.current,
        start: 'top 5%', // Placed higher up so cards, titles and meta fit comfortably on screen
        end: '+=2400',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (isInteractingRef.current) return;
          const p = self.progress;
          // Map scroll progress (0 to 1) directly to study index (0 to 7)
          const targetIdx = Math.min(
            filteredItems.length - 1,
            Math.max(0, Math.floor(p * filteredItems.length))
          );
          if (targetIdx !== activeIndexRef.current) {
            activeIndexRef.current = targetIdx;
            setActiveIndex(targetIdx);
          }
        }
      });
    }, arcStageRef);

    return () => ctx.revert();
  }, [filteredItems.length]);

  const openLightbox = (item: GalleryItem) => setActiveItem(item);
  const closeLightbox = () => setActiveItem(null);

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeItem.id);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      setActiveItem(filteredItems[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      setActiveItem(filteredItems[prevIndex]);
    }
  };

  const handlePrev = () => {
    isInteractingRef.current = true;
    const nextIdx = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
    activeIndexRef.current = nextIdx;
    setActiveIndex(nextIdx);
    setTimeout(() => { isInteractingRef.current = false; }, 400);
  };

  const handleNext = () => {
    isInteractingRef.current = true;
    const nextIdx = (activeIndex + 1) % filteredItems.length;
    activeIndexRef.current = nextIdx;
    setActiveIndex(nextIdx);
    setTimeout(() => { isInteractingRef.current = false; }, 400);
  };

  // Keyboard Left / Right arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItem) {
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
        if (e.key === 'ArrowRight') navigateLightbox('next');
        if (e.key === 'Escape') closeLightbox();
      } else {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems.length, activeIndex, activeItem]);

  const currentActiveStudy = filteredItems[activeIndex] || filteredItems[0];

  return (
    <div ref={galleryWrapRef} className="home-gallery-wrap">
      {/* Filter Tabs - shown only when showTabs is explicitly true */}
      {showTabs && (
        <div className="gallery-tabs-bar">
          <button
            type="button"
            className={`gallery-tab-btn ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            ALL ARCHIVE ({galleryData.length})
          </button>
          <button
            type="button"
            className={`gallery-tab-btn ${filter === 'construction' ? 'is-active' : ''}`}
            onClick={() => setFilter('construction')}
          >
            CONSTRUCTION TIMELINE
          </button>
          <button
            type="button"
            className={`gallery-tab-btn ${filter === 'architecture' ? 'is-active' : ''}`}
            onClick={() => setFilter('architecture')}
          >
            ARCHITECTURE & CRAFT
          </button>
          <button
            type="button"
            className={`gallery-tab-btn ${filter === 'interior' ? 'is-active' : ''}`}
            onClick={() => setFilter('interior')}
          >
            RESIDENCES & AMENITIES
          </button>
        </div>
      )}

      {/* ALL 8 ARCHITECTURAL STUDIES IN 3D CURVED ARC CAROUSEL (ELEVATED HIGHER ON SCREEN) */}
      <div className="framer-arc-gallery-wrapper" ref={arcStageRef}>
        {/* Top Navigation Bar with Big Arrows and Indicator */}
        <div className="gallery-mothe-arrow-bar">
          <button
            type="button"
            className="mothe-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous architectural study"
            title="Previous Study"
          >
            <ChevronLeft size={28} />
          </button>

          <span className="gallery-arrow-tag">
            <span className="arrow-pulse-dot" /> 8 CURATED MONUMENTAL STUDIES
          </span>

          <button
            type="button"
            className="mothe-arrow-btn"
            onClick={handleNext}
            aria-label="Next architectural study"
            title="Next Study"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* 3D Curved Arc Cards Stage */}
        <div className="framer-arc-stage">
          <div className="framer-arc-deck">
            {filteredItems.map((item, index) => {
              // Calculate circular offset relative to active card for all 8 items
              let offset = (index - activeIndex) % filteredItems.length;
              if (offset > filteredItems.length / 2) offset -= filteredItems.length;
              if (offset < -filteredItems.length / 2) offset += filteredItems.length;

              const isCenter = offset === 0;

              return (
                <div
                  key={item.id}
                  className={`framer-arc-card offset-${offset} ${isCenter ? 'is-center' : ''}`}
                  onClick={() => {
                    if (isCenter) {
                      openLightbox(item);
                    } else {
                      isInteractingRef.current = true;
                      activeIndexRef.current = index;
                      setActiveIndex(index);
                      setTimeout(() => { isInteractingRef.current = false; }, 400);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Study 0${index + 1}: ${item.title}`}
                >
                  <div
                    className="arc-card-media"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  >
                    <div className="arc-card-tag">0{index + 1}</div>

                    {isCenter && (
                      <div className="arc-card-hover-overlay">
                        <span className="arc-card-zoom-pill">
                          <Maximize2 size={13} /> VIEW STUDY
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Study Details Directly Below the Centered Card */}
        <div className="framer-arc-active-meta">
          <span className="active-meta-category">
            {currentActiveStudy.categoryLabel} · STUDY 0{activeIndex + 1} OF 08
          </span>
          <h3 className="active-meta-title">{currentActiveStudy.title}</h3>
          <p className="active-meta-subtitle">{currentActiveStudy.meta}</p>
        </div>
      </div>

      {/* MODERN BRIGHT LUXURY LIGHTBOX MODAL (ZERO BLACK BARS, CLEAN MODERN STRUCTURE) */}
      {activeItem && (
        <div className="gallery-lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            {/* Top Bar inside modern modal */}
            <div className="lightbox-header-bar">
              <div className="lightbox-header-tags">
                <span className="lightbox-category-tag">
                  <span className="pulse-tag-dot" />
                  {activeItem.categoryLabel}
                </span>
                <span className="lightbox-index-badge">
                  STUDY 0{filteredItems.findIndex(i => i.id === activeItem.id) + 1} / 0{filteredItems.length}
                </span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close modal"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Crisp High-Res Image Viewport (Cover fit, zero ugly black bars!) */}
            <div className="lightbox-image-wrap">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="lightbox-img"
              />

              {/* Floating Sleek Chevron Navigation */}
              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav--prev"
                onClick={() => navigateLightbox('prev')}
                aria-label="Previous study"
                title="Previous Study"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav--next"
                onClick={() => navigateLightbox('next')}
                aria-label="Next study"
                title="Next Study"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bright Modern Editorial Content Deck with Modern Cards */}
            <div className="lightbox-footer">
              <div className="lightbox-footer-main">
                <h3 className="lightbox-title">{activeItem.title}</h3>
                <p className="lightbox-caption">{activeItem.caption}</p>
              </div>

              {/* NEW MODERN SPEC CARDS (Bright, Modern Architecture) */}
              <div className="lightbox-cards-grid">
                <div className="lightbox-modern-card">
                  <span className="lmc-label">DISCIPLINE</span>
                  <span className="lmc-value">{activeItem.categoryLabel}</span>
                </div>
                <div className="lightbox-modern-card">
                  <span className="lmc-label">PHASE / SPEC</span>
                  <span className="lmc-value">{activeItem.meta}</span>
                </div>
                <div className="lightbox-modern-card is-highlight">
                  <span className="lmc-label">CURATION</span>
                  <span className="lmc-value">Master Monograph · 4K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
