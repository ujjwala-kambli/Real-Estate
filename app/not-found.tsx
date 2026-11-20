import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
      <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.2em', color: '#c5a880', textTransform: 'uppercase', marginBottom: '12px' }}>
        404 — PAGE NOT FOUND
      </span>
      <h1 style={{ fontSize: '48px', fontWeight: 850, color: '#0e1b24', marginBottom: '16px' }}>
        Architectural Sanctuary Not Found
      </h1>
      <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '480px', marginBottom: '28px', lineHeight: 1.6 }}>
        The residence or document you are seeking has been moved or is restricted within the private monograph archive.
      </p>
      <Link href="/" className="pill-btn pill-btn--primary">
        <ArrowLeft size={16} /> Return to Home
      </Link>
    </div>
  );
}

