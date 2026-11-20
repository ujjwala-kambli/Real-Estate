import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import HeroCloudVilla from '@/components/HeroCloudVilla';
import HorizontalCards from '@/components/HorizontalCards';
import DevelopmentFilmShowcase from '@/components/DevelopmentFilmShowcase';
import HomeGallery from '@/components/HomeGallery';
import SectionPrinciples from '@/components/SectionPrinciples';
import HomeConsultationCredentials from '@/components/HomeConsultationCredentials';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function HomePage() {
  return (
    <>
      {/* 1. HERO: CLOUD VILLA + "FIND" CLOUD ANIMATION + REAL ESTATE SEARCH */}
      <HeroCloudVilla />

      {/* 2. PINNED HORIZONTAL CARDS SLIDER */}
      <HorizontalCards />

      {/* 3. CINEMATIC VIDEO & DEVELOPMENT SPECIFICATIONS SHOWCASE */}
      <DevelopmentFilmShowcase />

      {/* 4. REAL ESTATE REWIRED — EDITORIAL SECTION (Curved Luxury Card Container) */}
      <section className="rewired-section" id="real-estate-rewired">
        <div className="container-wide">
          <div className="rewired-luxury-card">
            <div className="rewired-top-grid">
              {/* Left Column: Architectural Blueprint Video */}
              <Reveal className="rewired-left-col rewired-blueprint-col">
                <div className="rewired-badge">
                  <span className="starburst-glyph">✶</span>
                  <span>04 — ARCHITECTURAL BLUEPRINT</span>
                </div>
                <div className="blueprint-video-wrapper">
                  <video
                    src="/videos/Blueprint.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="blueprint-video-player"
                  />
                  <div className="blueprint-video-overlay">
                    <span className="blueprint-badge">
                      <span className="blueprint-pulse-dot" />
                      MASTER ARCHITECTURAL SCHEMATIC
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: 3 Structured Values (Reveal one-by-one as user enters) */}
              <SectionPrinciples />
            </div>

            {/* Centered Action Buttons (in the middle of the card) */}
            <Reveal className="rewired-center-actions">
              <Link href="/development" className="pill-btn pill-btn--dark">
                Explore Masterplan <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="pill-btn pill-btn--ghost">
                Talk to an Architect <ArrowUpRight size={15} />
              </Link>
            </Reveal>

            {/* Full Width Editorial Manifesto Banner */}
            <Reveal className="rewired-manifesto-banner">
              <span className="manifesto-eyebrow">AUREVIA STATEMENT OF EXCELLENCE</span>
              <h3 className="manifesto-title">
                Don&apos;t Just Acquire Real Estate. <span className="text-gold-gradient">Commission an Architectural Monument.</span>
              </h3>
              <p className="manifesto-desc">
                Nine chronological construction phases. Four-point-eight acres of pristine coastal bluff. One continuous masterpiece of modern Pacific living.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. SOPHISTICATED IMAGE GALLERY ARCHIVE (4 Premier Studies on Home, Full 8 in Navbar Gallery) */}
      <section className="gallery-section section-pad" id="gallery">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="05 — CURATED VISUAL ARCHIVE"
              title="The evolution of an architectural monument."
              text="Explore high-resolution studies spanning survey genesis, active structural engineering, material craftsmanship, and final twilight completion."
            />
          </Reveal>

          <HomeGallery limit={8} showTabs={false} />
        </div>
      </section>

      {/* 6. DIRECTORATE PRIVATE CONTACT & SOVEREIGN CREDENTIALS SUITE */}
      <section className="closing-cta-luxury" id="enquire">
        <div
          className="cta-bg-image"
          style={{ backgroundImage: `url("/images/construction/stage-09-final-reveal.jpg")` }}
        />
        <div className="cta-gradient-overlay" />

        <div className="container-wide cta-inner-wrap">
          <HomeConsultationCredentials />
        </div>
      </section>
    </>
  );
}
