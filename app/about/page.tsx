import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  DraftingCompass,
  Layers,
  ShieldCheck,
  Building2,
  Sparkles,
  CheckCircle2,
  HardHat,
  MapPin,
  Trees
} from 'lucide-react';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About the Vision & Consortium | Aurevia Estates',
  description:
    'The architectural consortium, geological philosophy, and master craftsmen behind Aurevia Estates — California’s most ambitious coastal residential development.'
};

export default function AboutPage() {
  return (
    <div className="about-page-wrapper">
      {/* 1. GRAND CINEMATIC EDITORIAL HERO */}
      <section className="about-hero-section">
        <div
          className="about-hero-bg"
          style={{ backgroundImage: `url("/images/villa-modern.jpg")` }}
        />
        <div className="about-hero-overlay" />

        <div className="container-wide about-hero-content">
          <Reveal className="about-hero-badge-row">
            <span className="starburst-glyph">✶</span>
            <span className="about-hero-badge-text">
              ARCHITECTURAL MONOGRAPH · AUREVIA CONSORTIUM
            </span>
          </Reveal>

          <Reveal>
            <h1 className="about-hero-title">
              Built with Geological Precision.{' '}
              <span className="text-gold-gradient">Shaped by the Pacific.</span>
            </h1>
          </Reveal>

          <Reveal>
            <p className="about-hero-subtext">
              An elite consortium of master architects, geotechnical structural engineers, and visionary developers dedicated to commissioning California&apos;s most ambitious oceanfront residential sanctuaries.
            </p>
          </Reveal>

          {/* Quick Telemetry Metric Strip */}
          <Reveal className="about-telemetry-strip">
            <div className="about-stat-item">
              <span className="stat-num">4.8</span>
              <span className="stat-unit">ACRES</span>
              <span className="stat-desc">Virgin Pacific Coastal Bluff</span>
            </div>
            <div className="stat-sep" />

            <div className="about-stat-item">
              <span className="stat-num">272m</span>
              <span className="stat-unit">PINNACLE</span>
              <span className="stat-desc">Elevation Above Sea Horizon</span>
            </div>
            <div className="stat-sep" />

            <div className="about-stat-item">
              <span className="stat-num">09</span>
              <span className="stat-unit">PHASES</span>
              <span className="stat-desc">Chronological Milestones</span>
            </div>
            <div className="stat-sep" />

            <div className="about-stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-unit">CERTIFIED</span>
              <span className="stat-desc">Seismic Isolation Engineering</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. THE GENESIS & ARCHITECTURAL DISCIPLINE (CURVED LUXURY CARD) */}
      <section className="about-story-section section-pad">
        <div className="container-wide">
          <div className="about-luxury-card">
            <div className="about-story-grid">
              {/* Left Column: Narrative & Philosophy */}
              <Reveal className="about-story-left">
                <div className="rewired-badge">
                  <span className="starburst-glyph">✶</span>
                  <span>01 — THE GENESIS & ARCHITECTURAL DISCIPLINE</span>
                </div>

                <h2 className="about-section-heading">
                  Where Basalt Bedrock Meets Modern Mastercraft.
                </h2>

                <p className="about-body-lead">
                  Aurevia Estates was founded on one uncompromising principle: to eliminate the friction between monumental architectural concept and geotechnical reality.
                </p>

                <p className="about-body-text">
                  Every column clearance, cantilevered pool terrace, and floor-to-ceiling glass panel is engineered directly into untouched Pacific basalt. Rather than imposing prefabricated templates onto the cliffside, our spatial geometry is guided by soil bore analytics, maritime prevailing winds, and passive solar-thermal orientation.
                </p>

                <p className="about-body-text">
                  From deep subterranean seismic isolation raft foundations to hand-honed Navona travertine pillars and custom marine-grade champagne bronze louvers, every square meter reflects generations of structural discipline.
                </p>

                {/* Director Quote Box */}
                <div className="about-quote-box">
                  <p className="quote-text">
                    &ldquo;We do not build houses on bluffs. We commission generational sanctuaries that emerge organically from Pacific stone.&rdquo;
                  </p>
                  <div className="quote-author">
                    <strong>Julian Vance</strong> · Master Architect & Directorate Principal
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Visual Showcase & Site Telemetry HUD */}
              <Reveal className="about-story-right">
                <div className="about-image-showcase">
                  <div
                    className="about-showcase-img main-img"
                    style={{ backgroundImage: `url("/images/facade-detail.jpg")` }}
                  />
                  <div
                    className="about-showcase-img secondary-img"
                    style={{ backgroundImage: `url("/images/penthouse-interior.jpg")` }}
                  />
                </div>

                {/* Site Telemetry HUD Box */}
                <div className="about-hud-card">
                  <div className="hud-card-header">
                    <span className="hud-live-tag">
                      <span className="live-rec-dot" /> LIVE SITE SPECIFICATION
                    </span>
                    <span className="hud-datum">DATUM: PACIFIC-01</span>
                  </div>

                  <div className="hud-grid-specs">
                    <div className="hud-spec-cell">
                      <span className="k">GEOGRAPHIC COORDINATES</span>
                      <span className="v">36.2719° N, 121.8081° W</span>
                    </div>
                    <div className="hud-spec-cell">
                      <span className="k">GEOTECHNICAL BEDROCK</span>
                      <span className="v">Basaltic Metamorphic Rock</span>
                    </div>
                    <div className="hud-spec-cell">
                      <span className="k">FACADE METALLURGY</span>
                      <span className="v">Marine Champagne Bronze (35μ)</span>
                    </div>
                    <div className="hud-spec-cell">
                      <span className="k">OCCUPANCY STATUS</span>
                      <span className="v">Private Syndicate Allocation</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE ARCHITECTURAL PILLARS (3 LUXURY CARDS) */}
      <section className="about-pillars-section section-pad">
        <div className="container-wide">
          <Reveal className="about-center-header">
            <div className="rewired-badge">
              <span className="starburst-glyph">✶</span>
              <span>02 — CORE ARCHITECTURAL COMMITMENTS</span>
            </div>
            <h2 className="about-section-heading">
              The Three Tenets of Generational Living.
            </h2>
            <p className="about-section-sub">
              These fundamental disciplines dictate every contour, material tolerance, and living environment across Aurevia Estates.
            </p>
          </Reveal>

          <div className="about-pillars-grid">
            <Reveal className="pillar-luxury-card">
              <div className="pillar-card-icon">
                <Compass size={24} />
              </div>
              <span className="pillar-num">01 / GEOLOGICAL ANCHOR</span>
              <h3 className="pillar-title">Geological Context</h3>
              <p className="pillar-desc">
                Comprehensive subterranean bore analysis and monolithic 2.4m reinforced raft foundations isolated against seismic shear, anchored into Pacific bedrock.
              </p>
              <ul className="pillar-points">
                <li><CheckCircle2 size={13} /> Seismic isolation dampening bearings</li>
                <li><CheckCircle2 size={13} /> Zero-deviation geological survey</li>
                <li><CheckCircle2 size={13} /> Hydrostatic subterranean water management</li>
              </ul>
            </Reveal>

            <Reveal className="pillar-luxury-card">
              <div className="pillar-card-icon">
                <DraftingCompass size={24} />
              </div>
              <span className="pillar-num">02 / MATERIAL MASTERY</span>
              <h3 className="pillar-title">Enduring Metallurgy & Stone</h3>
              <p className="pillar-desc">
                Anodized marine-grade champagne bronze vertical acoustic louvers, honed Navona limestone, and Low-E thermal curtain walls that mature with coastal sea mist.
              </p>
              <ul className="pillar-points">
                <li><CheckCircle2 size={13} /> Marine-grade salt spray resistance</li>
                <li><CheckCircle2 size={13} /> Double-glazed acoustic thermal envelope</li>
                <li><CheckCircle2 size={13} /> Hand-selected Navona travertine pillars</li>
              </ul>
            </Reveal>

            <Reveal className="pillar-luxury-card">
              <div className="pillar-card-icon">
                <Layers size={24} />
              </div>
              <span className="pillar-num">03 / CONTINUOUS TRANSPARENCY</span>
              <h3 className="pillar-title">Total Keyframe Clarity</h3>
              <p className="pillar-desc">
                From initial site mobilization to final twilight topping-out, every milestone is telemetrically documented for future generational proprietors.
              </p>
              <ul className="pillar-points">
                <li><CheckCircle2 size={13} /> High-resolution keyframe chronicle</li>
                <li><CheckCircle2 size={13} /> Structural engineering verification dossier</li>
                <li><CheckCircle2 size={13} /> Confidential acquisition directorate</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. MASTER ARCHITECTURAL CONSORTIUM DIRECTORATE */}
      <section className="about-directorate-section section-pad">
        <div className="container-wide">
          <Reveal className="about-center-header">
            <div className="rewired-badge">
              <span className="starburst-glyph">✶</span>
              <span>03 — THE CONSORTIUM DIRECTORATE</span>
            </div>
            <h2 className="about-section-heading">
              Master Architects & Structural Engineers.
            </h2>
            <p className="about-section-sub">
              Direct access to the licensed architectural fellows and structural dynamos shaping your legacy estate.
            </p>
          </Reveal>

          <div className="about-directorate-grid">
            <Reveal className="directorate-card">
              <div
                className="directorate-avatar"
                style={{ backgroundImage: `url("/images/directorate-1.jpg")` }}
              />
              <span className="director-role">CHIEF ARCHITECTURAL PRINCIPAL</span>
              <h3 className="director-name">Julian Vance</h3>
              <p className="director-creds">
                Fellow of the Royal Architectural Consortium · 24 Years Coastal Mastery
              </p>
              <p className="director-bio">
                Pioneered cantilevered oceanfront residences across Big Sur and the Amalfi Coast, specializing in monolithic travertine and frameless glass facades.
              </p>
            </Reveal>

            <Reveal className="directorate-card">
              <div
                className="directorate-avatar"
                style={{ backgroundImage: `url("/images/directorate-2.jpg")` }}
              />
              <span className="director-role">LEAD GEOTECHNICAL & SEISMIC ENGINEER</span>
              <h3 className="director-name">Dr. Elena Rostova</h3>
              <p className="director-creds">
                Ph.D. Structural Dynamics, ETH Zürich · Lead Seismic Specialist
              </p>
              <p className="director-bio">
                Designed subterranean foundation isolators for iconic waterfront developments, ensuring lifetime structural integrity against Pacific tectonic activity.
              </p>
            </Reveal>

            <Reveal className="directorate-card">
              <div
                className="directorate-avatar"
                style={{ backgroundImage: `url("/images/directorate-3.jpg")` }}
              />
              <span className="director-role">DIRECTOR OF CRAFTSMANSHIP & METALLURGY</span>
              <h3 className="director-name">Marcus Sterling</h3>
              <p className="director-creds">
                Master Artisan · Marine Metallurgy Specialist
              </p>
              <p className="director-bio">
                Directs the fabrication of bespoke marine bronze acoustic louvers, custom walnut millwork, and Italian architectural hardware throughout every residence.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. CLOSING CONSULTATION CARD */}
      <section className="about-cta-section">
        <div className="container-wide">
          <div className="about-cta-card">
            <span className="starburst-glyph">✶</span>
            <span className="about-cta-eyebrow">CONFIDENTIAL CONSULTATION</span>
            <h2 className="about-cta-title">
              Commission Your Architectural Monograph.
            </h2>
            <p className="about-cta-text">
              Engage directly with our master architectural directorate to review confidential site survey blueprints, structural calculations, and bespoke spatial possibilities.
            </p>

            <div className="about-cta-buttons">
              <Link href="/contact" className="pill-btn pill-btn--primary">
                Schedule a Private Consultation <ArrowUpRight size={15} />
              </Link>
              <Link href="/#construction-showcase" className="pill-btn pill-btn--ghost">
                Explore Construction Film <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
