import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SmartImage from './SmartImage';

/** Shared banner for interior pages: background photo, title and breadcrumb. */
export default function PageHero({ title, subtitle, image, crumb, eyebrow }) {
  return (
    <section className="relative isolate flex min-h-[460px] items-end overflow-hidden bg-navy-950 pb-16 pt-36 sm:min-h-[520px] sm:pb-20">
      <SmartImage src={image} alt="" eager className="absolute inset-0 -z-10 h-full w-full animate-slow-zoom object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
      <div className="container-luxe">
        <nav aria-label="Breadcrumb" className="animate-fade-up text-xs font-medium uppercase tracking-[0.2em] text-white/70">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="transition hover:text-gold-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="text-gold-400" aria-current="page">
              {crumb}
            </li>
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow mt-8 animate-fade-up text-gold-400 [animation-delay:100ms]">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl animate-fade-up text-balance text-4xl font-semibold leading-tight text-white [animation-delay:150ms] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-white/80 [animation-delay:250ms] sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
