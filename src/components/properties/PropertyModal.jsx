import { useEffect, useRef, useState } from 'react';
import { Calendar, Check, ChevronLeft, ChevronRight, MapPin, Phone, X } from 'lucide-react';
import SmartImage from '../ui/SmartImage';
import Button from '../ui/Button';
import { FavoriteButton, PropertyMeta } from './PropertyCard';
import { company } from '../../data/company';
import { classNames, formatPrice } from '../../utils/helpers';

/** Full property details shown in an accessible dialog with an image gallery. */
export default function PropertyModal({ property, onClose }) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef(null);

  useEffect(() => {
    setIndex(0);
  }, [property?.id]);

  useEffect(() => {
    if (!property) return undefined;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const count = property.images.length;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [property, onClose]);

  if (!property) return null;

  const { images } = property;
  const go = (dir) => setIndex((i) => (i + dir + images.length) % images.length);
  const viewingLink = `/contact?inquiry=viewing&property=${encodeURIComponent(property.title)}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="property-modal-title">
      <button type="button" aria-label="Close details" onClick={onClose} className="absolute inset-0 animate-fade-in cursor-default bg-navy-950/80 backdrop-blur-sm" />

      <div className="relative max-h-[94vh] w-full max-w-5xl animate-scale-in overflow-y-auto rounded-t-3xl bg-white shadow-luxe-lg sm:rounded-3xl">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-luxe transition hover:bg-gold-500"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid lg:grid-cols-5">
          {/* Gallery */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-navy-900 lg:aspect-auto lg:h-[440px]">
              <SmartImage key={images[index]} src={images[index]} alt={`${property.title} — image ${index + 1} of ${images.length}`} eager className="h-full w-full object-cover" />
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy-900 transition hover:bg-gold-500">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy-900 transition hover:bg-gold-500">
                <ChevronRight className="h-5 w-5" />
              </button>
              <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/70 px-3 py-1 text-xs font-medium text-white">
                {index + 1} / {images.length}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={classNames('aspect-[4/3] overflow-hidden rounded-lg ring-2 transition', i === index ? 'ring-gold-500' : 'ring-transparent opacity-70 hover:opacity-100')}
                >
                  <SmartImage src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 sm:p-8 lg:col-span-2">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gold-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-800">{property.status}</span>
              <span className="rounded-full bg-navy-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-700">
                {property.category} · {property.type}
              </span>
            </div>
            <h2 id="property-modal-title" className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
              {property.title}
            </h2>
            <p className="mt-2 flex items-start gap-1.5 text-sm text-charcoal-500">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
              {property.address}, {property.city}, {property.state}
            </p>
            <p className="mt-5 font-serif text-3xl font-semibold text-gold-600">{formatPrice(property)}</p>
            <PropertyMeta property={property} className="mt-5 border-y border-charcoal-100 py-4" />
            <p className="mt-5 text-sm leading-relaxed text-charcoal-600">{property.description}</p>

            <h3 className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy-900">Highlights</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-charcoal-600">
              {property.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-gold-600" /> {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-charcoal-400">Built {property.yearBuilt}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button to={viewingLink} className="flex-1" onClick={onClose}>
                <Calendar className="h-4 w-4" /> Schedule Viewing
              </Button>
              <Button href={company.phoneHref} variant="outline" className="flex-1">
                <Phone className="h-4 w-4" /> Call Agent
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-charcoal-500">
              <FavoriteButton id={property.id} title={property.title} className="!bg-charcoal-100" />
              Save to your shortlist
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
