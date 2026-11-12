import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import SmartImage from '../ui/SmartImage';
import { testimonials } from '../../data/company';
import { classNames } from '../../utils/helpers';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback((dir) => setActive((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [paused, go]);

  const t = testimonials[active];

  return (
    <section className="section relative overflow-hidden bg-navy-950">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-navy-500/20 blur-3xl" />
      <div className="container-luxe relative">
        <SectionHeading eyebrow="Client Stories" title="Trusted by discerning clients nationwide" light />

        <div
          className="mx-auto mt-14 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <figure key={active} className="animate-fade-up text-center" aria-live="polite">
            <Quote className="mx-auto h-12 w-12 text-gold-500/60" aria-hidden="true" />
            <div className="mt-6 flex justify-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
              ))}
            </div>
            <blockquote className="mt-6 text-balance font-serif text-xl italic leading-relaxed text-white sm:text-2xl lg:text-[1.75rem]">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-10 flex flex-col items-center gap-3">
              <SmartImage src={t.avatar} alt={t.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-gold-500 ring-offset-4 ring-offset-navy-950" />
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-gold-400">{t.role}</p>
              </div>
            </figcaption>
          </figure>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={i === active}
                  className={classNames('h-2 rounded-full transition-all duration-500', i === active ? 'w-8 bg-gold-500' : 'w-2 bg-white/30 hover:bg-white/60')}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
