import Link from 'next/link';
import { ArrowUpRight, Instagram, Linkedin, Film } from 'lucide-react';
import Logo from './Logo';
import { navItems, brand } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide footer-top">
        <div className="footer-brand">
          <Logo light />
          <p>{brand.description}</p>
          <span className="concept-note">
            {brand.name} · {brand.locationPlaceholder}
          </span>
        </div>

        <div className="footer-column">
          <span className="eyebrow eyebrow--light">NAVIGATION</span>
          {navItems.map(n => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <span className="eyebrow eyebrow--light">EXPERIENCE</span>
          <Link href="/#construction-film">Interactive Construction Film</Link>
          <Link href="/development">09 Stage Engineering Dossier</Link>
          <Link href="/residences">The Sky Penthouse Collection</Link>
          <Link href="/amenities">Infinity Terrace & Amenities</Link>
          <Link href="/gallery">Curated Visual Archive</Link>
        </div>

        <div className="footer-contact">
          <span className="eyebrow eyebrow--light">PRIVATE INQUIRIES</span>
          <p>
            Schedule a private architectural consultation or request the confidential masterplan
            monograph.
          </p>
          <Link className="text-link text-link--light" href="/contact#enquire">
            Initiate Consultation <ArrowUpRight size={15} />
          </Link>
          <div className="social-links">
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={17} />
            </a>
            <a
              href="https://www.linkedin.com/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={17} />
            </a>
          </div>
        </div>
      </div>

      <div className="container-wide footer-bottom">
        <span>
          © {new Date().getFullYear()} Aurevia Estates. Concept Real Estate Development Experience.
        </span>
        <span>
          Architectural film visuals are artistic simulations. All rights reserved.
        </span>
        <Link href="/contact">
          Inquiries <ArrowUpRight size={13} />
        </Link>
      </div>
    </footer>
  );
}
