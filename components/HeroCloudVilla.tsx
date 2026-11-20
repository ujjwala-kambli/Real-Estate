'use client';

import { useState, useRef } from 'react';
import { ArrowRight, Search, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroCloudVilla() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAngle, setCurrentAngle] = useState(0);

  const heroSectionRef = useRef<HTMLElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const stageViewportRef = useRef<HTMLDivElement>(null);
  const houseCardRef = useRef<HTMLDivElement>(null);
  const constructedImageRef = useRef<HTMLDivElement>(null);
  const wireframeImageRef = useRef<HTMLDivElement>(null);
  const laserBeamRef = useRef<HTMLDivElement>(null);
  const elevationHudRef = useRef<HTMLSpanElement>(null);
  const glassSheenRef = useRef<HTMLDivElement>(null);
  const findRevealRef = useRef<HTMLDivElement>(null);

  // 3D Both-Sides Perspective Engine Refs
  const rotator3DRef = useRef<HTMLDivElement>(null);
  const angleControlDeckRef = useRef<HTMLDivElement>(null);
  const sliderInputRef = useRef<HTMLInputElement>(null);
  const leftLightingRef = useRef<HTMLDivElement>(null);
  const rightLightingRef = useRef<HTMLDivElement>(null);

  const isUserInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Apply smooth 3D perspective rotation (100% Full-Bleed, Zero Black Gaps)
  const applyPerspectiveAngle = (deg: number) => {
    if (!rotator3DRef.current) return;
    const clamped = Math.max(-24, Math.min(24, Math.round(deg)));

    // 3D Perspective Rotation with slight camera tilt and dynamic scale
    const rad = (Math.abs(clamped) * Math.PI) / 180;
    const pitch = Math.sin(rad) * 1.5;
    // Scale kept at 1.0 to reduce height and display the full house properly
    const scale = 1.00 + Math.sin(rad) * 0.02;
    // Camera horizontal glide across the facade
    const panX = -clamped * 1.5;

    rotator3DRef.current.style.transform = `perspective(1600px) translateX(${panX}px) rotateY(${clamped}deg) rotateX(${pitch}deg) scale(${scale})`;

    // Background parallax shift vertically positioned at 24% to reveal full roof and height
    const parallaxX = 50 + clamped * 0.35;
    if (constructedImageRef.current) {
      constructedImageRef.current.style.backgroundPosition = `${parallaxX}% 24%`;
    }
    if (wireframeImageRef.current) {
      wireframeImageRef.current.style.backgroundPosition = `${parallaxX}% 24%`;
    }

    // Directional ambient lighting
    if (leftLightingRef.current && rightLightingRef.current) {
      if (clamped < -3) {
        const intensity = Math.min(0.4, Math.abs(clamped) / 25);
        leftLightingRef.current.style.opacity = intensity.toString();
        rightLightingRef.current.style.opacity = '0';
      } else if (clamped > 3) {
        const intensity = Math.min(0.4, clamped / 25);
        rightLightingRef.current.style.opacity = intensity.toString();
        leftLightingRef.current.style.opacity = '0';
      } else {
        leftLightingRef.current.style.opacity = '0';
        rightLightingRef.current.style.opacity = '0';
      }
    }

    if (sliderInputRef.current) {
      sliderInputRef.current.value = clamped.toString();
    }
  };

  // User manually drags the scrollbar
  const handleSliderDrag = (val: number) => {
    isUserInteractingRef.current = true;
    setCurrentAngle(val);
    applyPerspectiveAngle(val);

    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 2000);
  };

  useGSAP(
    () => {
      if (
        !heroSectionRef.current ||
        !introTextRef.current ||
        !stageViewportRef.current ||
        !houseCardRef.current ||
        !constructedImageRef.current ||
        !laserBeamRef.current ||
        !findRevealRef.current
      )
        return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const isMobile = window.innerWidth < 768;

      // 1. Initial States (Scroll = 0):
      gsap.set(introTextRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        pointerEvents: 'auto'
      });

      // House card starts waiting full-screen
      gsap.set(houseCardRef.current, {
        opacity: 0,
        scale: 0.94,
        y: 30
      });

      // Constructed image starts clipped at the bottom (0% built)
      gsap.set(constructedImageRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        scale: 1.03
      });

      if (wireframeImageRef.current) {
        gsap.set(wireframeImageRef.current, {
          scale: 1.03
        });
      }

      // Laser beam starts at bottom
      gsap.set(laserBeamRef.current, {
        top: '100%',
        opacity: 0
      });

      // Glass sheen starts transparent
      if (glassSheenRef.current) {
        gsap.set(glassSheenRef.current, {
          opacity: 0,
          x: '-100%'
        });
      }

      // Minimal Scrollbar Deck starts hidden
      if (angleControlDeckRef.current) {
        gsap.set(angleControlDeckRef.current, {
          opacity: 0,
          y: 30,
          pointerEvents: 'none'
        });
      }

      // "FIND REAL ESTATE" starts hidden
      gsap.set(findRevealRef.current, {
        opacity: 0,
        scale: 1.35,
        y: 0
      });

      // TIMELINE: ULTRA-SLOW, LUXURIOUS, CINEMATIC BOTH-SIDES PERSPECTIVE (EXTENDED RUNWAY)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: isMobile ? '+=5000' : '+=7500',
          pin: true,
          scrub: 1.4,
          anticipatePin: 1
        }
      });

      // Track 1 (0 -> 0.08): Headline lifts away smoothly
      tl.to(
        introTextRef.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.94,
          ease: 'power2.inOut',
          duration: 0.08,
          pointerEvents: 'none'
        },
        0
      );

      // Track 2 (0.04 -> 0.10): Full-screen architectural house card expands to 100%
      tl.to(
        houseCardRef.current,
        {
          opacity: 1,
          scale: 1.0,
          y: 0,
          ease: 'power2.out',
          duration: 0.06
        },
        0.04
      );

      // Track 3 (0.08 -> 0.35): REAL-TIME UPWARD CONSTRUCTION (0% -> 100%)
      const buildProgressObj = { percent: 0 };
      tl.to(
        buildProgressObj,
        {
          percent: 100,
          ease: 'none',
          duration: 0.27,
          onUpdate: () => {
            const val = buildProgressObj.percent;

            if (constructedImageRef.current) {
              constructedImageRef.current.style.clipPath = `inset(${100 - val}% 0% 0% 0%)`;
              const currentScale = 1.03 - (val / 100) * 0.03;
              constructedImageRef.current.style.transform = `scale(${currentScale})`;
            }

            if (wireframeImageRef.current) {
              const currentScale = 1.03 - (val / 100) * 0.03;
              wireframeImageRef.current.style.transform = `scale(${currentScale})`;
            }

            if (laserBeamRef.current) {
              laserBeamRef.current.style.top = `${100 - val}%`;
              laserBeamRef.current.style.opacity = val > 1 && val < 99.2 ? '1' : '0';
            }

            if (elevationHudRef.current) {
              if (val < 20) {
                elevationHudRef.current.innerText = `LEVEL 01 · FOUNDATION · ${Math.round(val)}%`;
              } else if (val < 45) {
                elevationHudRef.current.innerText = `LEVEL 04 · BRONZE CORE · ${Math.round(val)}%`;
              } else if (val < 75) {
                elevationHudRef.current.innerText = `LEVEL 08 · CURTAIN WALL · ${Math.round(val)}%`;
              } else if (val < 98) {
                elevationHudRef.current.innerText = `LEVEL 10 · SKY PENTHOUSE · ${Math.round(val)}%`;
              } else {
                elevationHudRef.current.innerText = `STRUCTURE COMPLETED · 100%`;
              }
            }
          }
        },
        0.08
      );

      // Track 4 (0.34 -> 0.38): Glass sheen sweep reflection across completed facade
      if (glassSheenRef.current) {
        tl.fromTo(
          glassSheenRef.current,
          { x: '-100%', opacity: 0 },
          { x: '100%', opacity: 0.85, ease: 'power2.out', duration: 0.04 },
          0.34
        );
      }

      // Track 5 (0.36 -> 0.40): Minimal Scrollbar Pill fades in smoothly
      if (angleControlDeckRef.current) {
        tl.fromTo(
          angleControlDeckRef.current,
          { opacity: 0, y: 25, pointerEvents: 'none' },
          { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'power2.out', duration: 0.04 },
          0.36
        );
      }

      // Track 6 (0.40 -> 0.90): EXTREMELY SLOW, CALM, UNHURRIED BOTH-SIDES VIEWING
      const scrollAngleObj = { angle: 0 };

      // Phase 6A (0.40 -> 0.65): VERY SLOWLY ROTATE TO VIEW LEFT SIDE (-24°)
      tl.to(
        scrollAngleObj,
        {
          angle: -24,
          ease: 'power1.inOut',
          duration: 0.25,
          onUpdate: () => {
            if (!isUserInteractingRef.current) {
              setCurrentAngle(-24);
              applyPerspectiveAngle(scrollAngleObj.angle);
            }
          }
        },
        0.40
      );

      // Phase 6B (0.65 -> 0.90): VERY SLOWLY GLIDE ACROSS TO VIEW RIGHT SIDE (+24°)
      tl.to(
        scrollAngleObj,
        {
          angle: 24,
          ease: 'power1.inOut',
          duration: 0.25,
          onUpdate: () => {
            if (!isUserInteractingRef.current) {
              setCurrentAngle(24);
              applyPerspectiveAngle(scrollAngleObj.angle);
            }
          }
        },
        0.65
      );

      // Phase 6C (0.90 -> 0.94): GENTLY RETURN TO FRONT (0°)
      tl.to(
        scrollAngleObj,
        {
          angle: 0,
          ease: 'power1.inOut',
          duration: 0.04,
          onUpdate: () => {
            if (!isUserInteractingRef.current) {
              setCurrentAngle(0);
              applyPerspectiveAngle(scrollAngleObj.angle);
            }
          }
        },
        0.90
      );

      // Track 7 (0.93 -> 0.95): Minimal Scrollbar Pill fades out
      if (angleControlDeckRef.current) {
        tl.to(
          angleControlDeckRef.current,
          { opacity: 0, y: 20, pointerEvents: 'none', ease: 'power2.in', duration: 0.02 },
          0.93
        );
      }

      // Track 8 (0.94 -> 0.98): Completed villa contracts & morphs into FIND
      tl.to(
        houseCardRef.current,
        {
          scale: 0.35,
          borderRadius: '54px',
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.04
        },
        0.94
      );

      // Letters "FIND" zoom into place
      tl.fromTo(
        findRevealRef.current,
        {
          opacity: 0,
          scale: 1.35,
          letterSpacing: '0.14em'
        },
        {
          opacity: 1,
          scale: 1.0,
          letterSpacing: '0.04em',
          ease: 'power2.inOut',
          duration: 0.04
        },
        0.94
      );

      // Track 9 (0.98 -> 1.0): Hold on FIND REAL ESTATE before unpin
      tl.to({}, { duration: 0.02 });

      ScrollTrigger.refresh();
    },
    { scope: heroSectionRef }
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.location.href = `/residences${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`;
    }
  };

  return (
    <section ref={heroSectionRef} className="hero-cloud-section" id="hero">
      <div className="hero-sky-backdrop" />

      {/* 1. TRUE 100% EDGE-TO-EDGE FULL-SCREEN ARCHITECTURAL VIEWPORT */}
      <div ref={stageViewportRef} className="hero-stage-viewport full-screen-viewport">
        {/* THE FULL-SCREEN VILLA CARD (100vw x 100vh) - NEVER GOES BLANK */}
        <div ref={houseCardRef} className="hero-house-card true-full-screen-card">
          {/* Architectural HUD Corner Brackets */}
          <span className="arch-corner arch-corner--tl" aria-hidden="true">┌ RESIDENCE 01</span>
          <span className="arch-corner arch-corner--tr" aria-hidden="true">36°14&apos;N · 121°54&apos;W ┐</span>
          <span className="arch-corner arch-corner--bl" aria-hidden="true">└ PACIFIC BASALT BLUFF</span>
          <span className="arch-corner arch-corner--br" aria-hidden="true">AUREVIA ARCHITECTURE ┘</span>

          {/* 3D PERSPECTIVE WRAPPER (Overscaled canvas so it is 100% edge-to-edge with ZERO black gaps) */}
          <div ref={rotator3DRef} className="arch-3d-rotator">
            {/* Base Blueprint Wireframe Layer */}
            <div
              ref={wireframeImageRef}
              className="arch-blueprint-wireframe"
              style={{ backgroundImage: `url("/images/villa-modern.jpg")` }}
            />
            <div className="arch-blueprint-grid" />
            <div className="arch-crosshair arch-crosshair-1">+</div>
            <div className="arch-crosshair arch-crosshair-2">+</div>
            <div className="arch-crosshair arch-crosshair-3">+</div>

            {/* The Living Full-Screen Villa Image (ALWAYS 100% VISIBLE) */}
            <div
              ref={constructedImageRef}
              className="hero-constructed-image"
              style={{ backgroundImage: `url("/images/villa-modern.jpg")` }}
            />

            {/* Directional Sunlight Beams for Left / Right Sides */}
            <div ref={leftLightingRef} className="side-sunlight side-sunlight--left" />
            <div ref={rightLightingRef} className="side-sunlight side-sunlight--right" />

            {/* Dynamic Glass Sheen Reflection Sweep */}
            <div ref={glassSheenRef} className="completed-glass-sheen" />

            {/* Glowing Construction Laser Beam */}
            <div ref={laserBeamRef} className="construction-laser-beam">
              <div className="laser-spark-core" />
              <div className="construction-beam-hud">
                <span className="laser-pulse-dot" />
                <span ref={elevationHudRef}>LEVEL 01 · FOUNDATION · 0%</span>
              </div>
            </div>
          </div>

          {/* Architectural Elevation Ruler Marks along left edge */}
          <div className="arch-elevation-ruler" aria-hidden="true">
            <span>+38.5M SKY HORIZON</span>
            <span>+24.0M BRONZE FINS</span>
            <span>+12.5M STRUCTURAL DECK</span>
            <span>+0.0M BASALT BEDROCK</span>
          </div>
        </div>

        {/* ULTRA-MINIMAL HORIZONTAL SCROLLBAR (ZERO TEXT, ZERO CLUTTER) */}
        <div ref={angleControlDeckRef} className="minimal-angle-scrollbar-pill">
          <input
            ref={sliderInputRef}
            type="range"
            min="-24"
            max="24"
            step="1"
            value={currentAngle}
            onChange={(e) => handleSliderDrag(Number(e.target.value))}
            className="minimal-gold-slider"
            aria-label="3D Perspective Scrollbar"
          />
        </div>

        {/* "FIND REAL ESTATE" Reveal */}
        <div ref={findRevealRef} className="find-realestate-reveal">
          <span className="find-giant-text">FIND</span>
          <span className="realestate-sub-text">REAL ESTATE</span>
        </div>
      </div>

      {/* 2. INITIAL LANDING STAGE: Clean Home Headline + Search */}
      <div className="hero-cloud-inner">
        <div ref={introTextRef} className="hero-intro-text-stage">
          <div className="hero-eyebrow-badge">
            <span className="starburst-glyph">✶</span>
            <span>PACIFIC COASTAL BLUFF ESTATE</span>
          </div>

          <h1 className="hero-main-heading">
            Find What Moves You.
          </h1>
          <p className="hero-main-subtext">
            Expert architectural vision. Real guidance. A clear path from virgin Pacific coastal bluff to generational living.
          </p>

          <form onSubmit={handleSearchSubmit} className="hero-search-pill-bar">
            <div className="search-input-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search Pacific Bluff Residences, Penthouses, Estates..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="hero-search-input"
              />
            </div>
            <button type="submit" className="pill-btn pill-btn--primary hero-search-btn">
              <span>Start Your Search</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="hero-scroll-cue">
            <div className="scroll-cue-link">
              <span>SCROLL TO BUILD ARCHITECTURE</span>
              <ArrowDown size={13} className="bob-anim" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
