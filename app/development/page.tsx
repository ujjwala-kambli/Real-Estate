import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CircleCheck, HardHat, Compass, Layers } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { stages } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Development Process',
  description:
    'A comprehensive technical dossier detailing the 09 chronological stages of Aurevia Estates construction.'
};

export default function DevelopmentPage() {
  return (
    <>
      <PageHero
        eyebrow="THE DEVELOPMENT CHRONICLE"
        title="From virgin ground to coastal monument."
        text="Explore the nine technical phases of construction that transform an empty coastal cliff into an enduring residential masterpiece. Synchronized with precision engineering milestones."
        image={stages[4].image}
      />

      <section className="section-pad">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="01 — THE CHRONOLOGY"
              title="Nine carefully orchestrated stages of craft."
              text="Every milestone connects seamlessly to the next. Below is the complete engineering dossier for the Aurevia development timeline."
            />
          </Reveal>

          <div className="stage-list">
            {stages.map(s => (
              <Reveal key={s.number} className="stage-row bordered-panel">
                <div className="stage-row-number">
                  {s.number}
                  <span> / 09</span>
                </div>

                <div
                  className="stage-row-image"
                  style={{ backgroundImage: `url("${s.image}")` }}
                  aria-label={s.label}
                  role="img"
                />

                <div className="stage-row-copy">
                  <span className="eyebrow">{s.telemetry.phase}</span>
                  <h3>{s.title}</h3>
                  <p className="stage-short">{s.short}</p>
                  <p>{s.description}</p>

                  <div className="telemetry-tags" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                    <span style={{ fontSize: '11px', background: 'var(--ivory-soft)', padding: '4px 10px', border: '1px solid var(--line)', color: 'var(--navy)', fontWeight: 600 }}>
                      Elevation: {s.telemetry.elevation}
                    </span>
                    <span style={{ fontSize: '11px', background: 'var(--ivory-soft)', padding: '4px 10px', border: '1px solid var(--line)', color: 'var(--navy)', fontWeight: 600 }}>
                      Equipment: {s.telemetry.equipment}
                    </span>
                    <span style={{ fontSize: '11px', background: 'var(--ivory-soft)', padding: '4px 10px', border: '1px solid var(--line)', color: 'var(--navy)', fontWeight: 600 }}>
                      Specs: {s.telemetry.specs}
                    </span>
                  </div>
                </div>

                <CircleCheck className="stage-row-icon" size={22} />
              </Reveal>
            ))}
          </div>

          <p className="technical-note">
            <strong>Technical Note:</strong> Aurevia Estates is a conceptual luxury development experience. Actual foundation engineering, geotechnical drilling depths, materials, and safety certifications must be determined by licensed structural engineers for specific sites.
          </p>
        </div>
      </section>

      <section className="closing-cta closing-cta--short">
        <div className="closing-image" style={{ backgroundImage: `url("${stages[8].image}")` }} />
        <div className="closing-overlay" />
        <div className="container-wide closing-content">
          <span className="eyebrow eyebrow--light">EXPERIENCE THE HOMEPAGE FILM</span>
          <h2>Watch the live scroll-controlled construction film.</h2>
          <div className="hero-actions">
            <Link className="button button--light" href="/#construction-film">
              Launch Interactive Film <ArrowUpRight size={16} />
            </Link>
            <Link className="button button--ghost-light" href="/residences">
              View Residences
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
