'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { navItems } from '@/lib/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 15);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner container-wide">
        {/* Left Column: Brand Logo */}
        <div className="nav-col nav-col-left">
          <Logo />
        </div>

        {/* Center Column: Navigation Links (Exact Middle) */}
        <nav
          className={`desktop-nav ${open ? 'mobile-open' : ''}`}
          aria-label="Main navigation"
        >
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          <Link className="nav-enquire nav-enquire--mobile" href="/contact#enquire">
            <span>Enquire Now</span>
            <ArrowUpRight size={14} />
          </Link>
        </nav>

        {/* Right Column: Circular Enquire Button & Mobile Hamburger */}
        <div className="nav-col nav-col-right">
          <Link className="nav-enquire nav-enquire--desktop" href="/contact#enquire">
            <span>Enquire Now</span>
            <ArrowUpRight size={14} />
          </Link>

          <button
            className="menu-toggle"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
