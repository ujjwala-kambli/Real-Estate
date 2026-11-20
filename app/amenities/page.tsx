import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Waves, Trees, Sparkles, Coffee, ShieldCheck } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { amenitiesList } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Amenities & Sanctuary',
  description:
    'Resort-tier amenities at Aurevia Estates: cliffside infinity pool, arrival travertine porte-cochère, observation salon, and thermal spa suite.'
};

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="SANCTUARY & AMENITIES"
        title="Curated spaces in dialogue with nature."
        text="From the rooftop infinity pool cantilevered over the Pacific ocean to the private travertine arrival court, every amenity is orchestrated to enhance wellbeing and tranquility."
        image="/images/construction/stage-08-landscape-amenities.jpg"
      />

      <section className="section-pad">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="01 — RESIDENTIAL AMENITIES"
              title="Where architecture dissolves into coastal living."
              text="Private resident amenities curated with biophilic intention, natural material tactility, and panoramic ocean vistas."
            />
          </Reveal>

          <div className="amenity-grid">
            {amenitiesList.map((item, idx) => (
              <Reveal key={item.title} className="amenity-card bordered-panel">
                <div
                  className="amenity-image"
                  style={{ backgroundImage: `url("${item.image}")` }}
                />
                <div className="amenity-body">
                  <div className="amenity-meta">
                    <span>0{idx + 1} / {item.category}</span>
                    <Sparkles size={16} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="concept-chip">Private Resident Amenity</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="notice-panel bordered-panel" style={{ marginTop: '36px' }}>
            <strong>Amenity Specification Placeholder:</strong>
            <p>
              Aurevia Estates is a conceptual development project. All wellness facilities, pool
              dimensions, and concierge services are architectural representations subject to final
              licensing and operator agreements.
            </p>
          </div>
        </div>
      </section>

      <section className="simple-cta container-wide">
        <div>
          <span className="eyebrow">THE CONSTRUCTION TIMELINE</span>
          <h2>See how the landscape and pool were shaped.</h2>
        </div>
        <Link href="/#construction-film" className="button button--gold">
          View Construction Film <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
