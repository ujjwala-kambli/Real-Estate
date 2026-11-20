import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand-mark ${light ? 'brand-mark--light' : ''}`}
      aria-label="Aurevia Estates home"
    >
      <div className="brand-logo-img-wrapper">
        <Image
          src="/images/logo.png"
          alt="Aurevia Estates"
          width={52}
          height={36}
          priority
          className="brand-logo-img"
        />
      </div>
      <span className="brand-wording">
        <strong>AUREVIA</strong>
        <small>ESTATES</small>
      </span>
    </Link>
  );
}
