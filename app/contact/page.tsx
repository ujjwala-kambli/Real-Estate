import type { Metadata } from 'next';
import { ArrowUpRight, Mail, Phone, MapPin, ShieldCheck, Clock } from 'lucide-react';
import PageHero from '@/components/PageHero';
import EnquiryForm from '@/components/EnquiryForm';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact & Private Registration',
  description:
    'Schedule a confidential architectural consultation or request the masterplan monograph for Aurevia Estates.'
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="PRIVATE CLIENT DIRECTORATE"
        title="Every landmark dialogue begins here."
        text="Connect with our development consortium to discuss acquisitions, review high-resolution engineering drawings, or schedule a private site visit."
        image="/images/facade-detail.jpg"
      />

      <section className="section-pad">
        <div className="container-wide contact-layout">
          <Reveal className="contact-intro">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> PRIVATE ENQUIRIES
            </span>
            <h2>Direct dialogue with the developer.</h2>
            <p>
              Whether you are an architect, institutional investor, or prospective resident seeking a
              landmark coastal residence, our directorate is at your service.
            </p>

            <div className="contact-note bordered-panel">
              <MapPin size={22} />
              <div>
                <strong>Site Location</strong>
                <p>{brand.locationPlaceholder}</p>
              </div>
            </div>

            <div className="contact-note bordered-panel">
              <Mail size={22} />
              <div>
                <strong>Directorate Office</strong>
                <p>concierge@aurevia-estates.com · [Verified Email Placeholder]</p>
              </div>
            </div>

            <div className="contact-note bordered-panel">
              <Clock size={22} />
              <div>
                <strong>Private Consultations</strong>
                <p>Monday through Saturday by prior appointment only.</p>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <a
                className="text-link"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                Connect on LinkedIn <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>

          <Reveal>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
