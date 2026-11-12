import { Link } from 'react-router-dom';
import { classNames } from '../../utils/helpers';

export default function Logo({ light = true, className = '' }) {
  return (
    <Link to="/" className={classNames('group inline-flex items-center gap-3', className)} aria-label="PrimeNest Properties home">
      <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden="true">
        <rect width="48" height="48" rx="12" className={light ? 'fill-white/10' : 'fill-navy-900'} />
        <path d="M10 25 24 13l14 12" fill="none" stroke="#c69a42" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:-translate-y-0.5" />
        <path d="M15.5 23v12h17V23" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 35v-6h6v6" fill="none" stroke="#c69a42" strokeWidth="2.6" strokeLinejoin="round" />
      </svg>
      <span className="leading-none">
        <span className={classNames('block font-serif text-xl font-semibold tracking-wide', light ? 'text-white' : 'text-navy-900')}>
          PrimeNest
        </span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-500">Properties</span>
      </span>
    </Link>
  );
}
