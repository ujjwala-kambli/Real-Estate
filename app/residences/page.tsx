import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Box, MapPinned, PanelsTopLeft, Sparkles, Shield, Maximize2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Residences',
  description:
    'Ultra-luxury coastal residences and penthouses at Aurevia Estates. 3.4m ceiling heights, floor-to-ceiling acoustic glass, and panoramic Pacific vistas.'
};

export default function ResidencesPage() {
  return (
    <>
      <PageHero
        eyebrow="THE RESIDENCES"
        title="Sanctuary above the Pacific surf."
        text="A limited collection of nine architectural tiers offering uncompromised horizontal spatial flow, private elevator arrival, and unhindered ocean horizons."
        image="/images/penthouse-interior.jpg"
      />

      <section className="section-pad">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="01 — SPATIAL PROGRAM"
              title="Architecture designed around human rituals."
              text="Generous room volumes, cantilevered deep terraces, and flush acoustic curtain walls create an effortless indoor-outdoor coastal lifestyle."
            />
          </Reveal>

          <div className="residence-feature bordered-panel">
            <div
              className="residence-feature-image"
              style={{ backgroundImage: `url("/images/penthouse-interior.jpg")` }}
            />
            <div className="residence-feature-copy">
              <span className="eyebrow">THE SKY PENTHOUSE COLLECTION</span>
              <h2>Double-height observation salons.</h2>
              <p>
                Each residence is conceived as a bespoke spatial sanctuary. With 3.4-meter ceiling
                clearances, seamless travertine flooring, and floor-to-ceiling motorized sliding glass
                partitions, the interior extends seamlessly onto private cantilevered ocean terraces.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '20px 0' }}>
                <span className="concept-chip">Level 09 · Private Penthouse</span>
                <span className="concept-chip">180° Panoramic Horizon</span>
                <span className="concept-chip">Private Saltwater Plunge</span>
              </div>
              <Link href="/contact" className="button button--dark">
                Enquire Regarding Residences <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className="residence-info-grid">
            <Reveal className="info-card bordered-panel">
              <MapPinned size={24} />
              <span className="eyebrow">COASTAL SETTING</span>
              <h3>Pacific Bluff Location</h3>
              <p>
                Situated 240 meters above the crashing surf with private winding driveway access from
                the coastal highway. [Location Placeholder].
              </p>
            </Reveal>

            <Reveal className="info-card bordered-panel">
              <PanelsTopLeft size={24} />
              <span className="eyebrow">SPATIAL TYPOLOGIES</span>
              <h3>Bespoke Floorplans</h3>
              <p>
                Three and four-bedroom coastal suites, half-floor residences, and two crown duplex sky
                penthouses with rooftop observation decks.
              </p>
            </Reveal>

            <Reveal className="info-card bordered-panel">
              <Box size={24} />
              <span className="eyebrow">MATERIAL SELECTION</span>
              <h3>Enduring Masterwork</h3>
              <p>
                Navona travertine, smoked European oak joinery, champagne bronze metal accents, and
                triple-glazed acoustic glass envelope.
              </p>
            </Reveal>
          </div>

          <div className="notice-panel bordered-panel">
            <strong>Concept Real Estate Project:</strong>
            <p>
              Aurevia Estates is a conceptual luxury demonstration website. No verified property
              address, pricing, or legal condominium offerings are represented. Replace with approved
              developer prospectus upon commercial commissioning.
            </p>
          </div>
        </div>
      </section>

      <section className="simple-cta container-wide">
        <div>
          <span className="eyebrow">CONSTRUCTION CHRONOLOGY</span>
          <h2>Explore how the residential structure was built.</h2>
        </div>
        <Link href="/#construction-film" className="button button--gold">
          Watch Construction Film <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
