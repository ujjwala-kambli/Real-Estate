import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import HomeGallery from '@/components/HomeGallery';

export const metadata: Metadata = {
  title: 'Visual Archive & Gallery',
  description:
    'Explore high-resolution architectural photography, construction milestones, and interior renderings of Aurevia Estates.'
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="VISUAL ARCHIVE"
        title="Form, atmosphere, and craft."
        text="A curated collection of high-resolution architectural studies documenting the construction chronology, materiality, and completed coastal presence of Aurevia Estates."
        image="/images/construction/stage-09-final-reveal.jpg"
      />

      <section className="section-pad">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="01 — ARCHITECTURAL MONOGRAPHS"
              title="A visual chronicle of development."
              text="Click any study to open the high-resolution lightbox view. Filter by construction stages, architectural details, or interior living spaces."
            />
          </Reveal>

          <Reveal>
            <HomeGallery />
          </Reveal>

          <p className="technical-note">
            <strong>Archival Note:</strong> All visual assets shown are coherent architectural
            visualizations rendered to demonstrate continuous construction development.
          </p>
        </div>
      </section>

      <section className="simple-cta container-wide">
        <div>
          <span className="eyebrow">CONTINUE THE JOURNEY</span>
          <h2>Watch the live scroll-synchronized film.</h2>
        </div>
        <Link href="/#construction-film" className="button button--gold">
          Launch Construction Film <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
