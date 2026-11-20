'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Send, Sparkles } from 'lucide-react';

export default function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSent(true);
  }

  return (
    <form className="enquiry-form bordered-panel" id="enquire" onSubmit={submit}>
      {sent ? (
        <div className="form-success">
          <CheckCircle2 size={36} />
          <h3>Thank you for your enquiry.</h3>
          <p>
            Your confidential registration has been validated locally in this demonstration. In a
            live production environment, your enquiry would be transmitted to the private client
            directorate.
          </p>
          <button
            type="button"
            className="button button--gold"
            onClick={() => setSent(false)}
            style={{ marginTop: '16px' }}
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <>
          <div className="form-heading">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> PRIVATE REGISTRATION
            </span>
            <h2>Initiate a conversation.</h2>
            <p>
              Please share your contact details and spatial interests. All communication is held in
              strict confidence.
            </p>
          </div>

          <div className="form-grid">
            <label>
              Full name
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                placeholder="e.g. Lord Julian Sterling"
              />
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="julian@residences.com"
              />
            </label>

            <label>
              Telephone <span className="optional">(With country code)</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (555) 019-2834"
              />
            </label>

            <label>
              Enquiry interest
              <select name="type" defaultValue="Penthouse Collection">
                <option>The Sky Penthouse Collection</option>
                <option>Half-Floor Horizon Residences</option>
                <option>Private Architectural Consultation</option>
                <option>Development Acquisition & Press</option>
              </select>
            </label>

            <label className="form-full">
              Specific spatial requirements or questions
              <textarea
                name="message"
                required
                minLength={10}
                rows={4}
                placeholder="Please outline your preferred tiers, timeline, or spatial specifications..."
              />
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="button button--gold" type="submit">
            Transmit Confidential Enquiry <Send size={15} />
          </button>

          <p className="form-disclaimer">
            Demonstration website · Submissions validate locally and are not transmitted to a live
            backend server without API configuration.
          </p>
        </>
      )}
    </form>
  );
}
