'use client';

import { FormEvent, useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Lock
} from 'lucide-react';

export default function HomeConsultationCredentials() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    residence: 'Sky Horizon Penthouse Collection'
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setSubmitted(true);
  };

  return (
    <div className="home-consultation-credentials-suite bordered-gold-glow">
      {/* Compact Top Header */}
      <div className="suite-header">
        <span className="eyebrow eyebrow--gold">
          <span className="eyebrow-dot" /> PRIVATE CLIENT DIRECTORATE · CONFIDENTIAL
        </span>
        <h2 className="suite-heading">
          Connect Directly with the <span className="text-gold-gradient">Master Builders.</span>
        </h2>
        <p className="suite-desc">
          Direct dialogue with our master architectural consortium and structural engineers.
          Reserve private acquisitions or review certified engineering dossiers.
        </p>
      </div>

      {/* Centered Clean Contact Suite (Left Part Only, Text Removed) */}
      <div className="suite-grid suite-grid--single-col">
        {/* Direct Contact Channels & Quick Form */}
        <div className="suite-contact-col suite-contact-col--centered">
          {/* Quick Contact Bar */}
          <div className="contact-quick-bar">
            <a href="tel:+18312980420" className="quick-channel-pill" title="Direct Telephone Line">
              <Phone size={13} className="pill-icon" />
              <span>+1 (831) 298-0420</span>
            </a>
            <a href="mailto:directorate@aureviaestates.com" className="quick-channel-pill" title="Confidential Email">
              <Mail size={13} className="pill-icon" />
              <span>directorate@aureviaestates.com</span>
            </a>
            <div className="quick-channel-pill" title="Physical Observation Gallery">
              <MapPin size={13} className="pill-icon" />
              <span>Big Sur Coastal Bluff, CA</span>
            </div>
          </div>

          {/* Compact Inquiry Form */}
          <div className="quick-inquiry-box">
            <div className="inquiry-box-header">
              <Lock size={13} className="inline-gold-icon" />
              <span>Request Private Dossier & Consultation</span>
            </div>

            {submitted ? (
              <div className="inquiry-success-compact">
                <CheckCircle2 size={24} className="success-icon" />
                <div>
                  <h6>Consultation Request Received</h6>
                  <p>Our development directorate will reach out within 2 hours with strict discretion.</p>
                  <span className="ref-tag">#AE-CONFIDENTIAL</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quick-inquiry-form">
                <div className="inquiry-input-row">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="suite-input"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Phone or Secure Email"
                    value={formData.contact}
                    onChange={e => setFormData({ ...formData, contact: e.target.value })}
                    className="suite-input"
                  />
                </div>

                <select
                  value={formData.residence}
                  onChange={e => setFormData({ ...formData, residence: e.target.value })}
                  className="suite-select"
                >
                  <option value="Sky Horizon Penthouse Collection">Sky Horizon Penthouse Collection (Level 09)</option>
                  <option value="Pacific Ocean Bluff Villa">Pacific Ocean Bluff Villa (Full Floor)</option>
                  <option value="Ground-Up Architectural Commission">Custom Architectural Commission</option>
                  <option value="Private Institutional Dossier">Institutional Acquisition Review</option>
                </select>

                <button type="submit" className="button button--gold button--full button--compact">
                  <span>Initiate Confidential Consultation</span>
                  <ArrowUpRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
