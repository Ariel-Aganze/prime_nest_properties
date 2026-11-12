import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Maximize2 } from 'lucide-react';
import SmartImage from '../ui/SmartImage';
import { useFavorites } from '../../context/FavoritesContext';
import { classNames, formatNumber, formatPrice } from '../../utils/helpers';

export function PropertyMeta({ property, className = '' }) {
  const isResidential = property.category === 'Residential';
  return (
    <ul className={classNames('flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-charcoal-600', className)}>
      {isResidential && (
        <li className="flex items-center gap-1.5">
          <BedDouble className="h-4 w-4 text-gold-600" />
          {property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}
        </li>
      )}
      <li className="flex items-center gap-1.5">
        <Bath className="h-4 w-4 text-gold-600" />
        {property.baths} Baths
      </li>
      <li className="flex items-center gap-1.5">
        <Maximize2 className="h-4 w-4 text-gold-600" />
        {formatNumber(property.area)} sq ft
      </li>
    </ul>
  );
}

export function FavoriteButton({ id, title, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(id);
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${title} from saved properties` : `Save ${title}`}
      className={classNames(
        'flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110',
        active ? 'bg-gold-500 text-navy-950' : 'bg-white/85 text-navy-900 hover:bg-white',
        className,
      )}
    >
      <Heart className={classNames('h-[18px] w-[18px]', active && 'fill-current')} />
    </button>
  );
}

export default function PropertyCard({ property, onView, layout = 'grid' }) {
  const isList = layout === 'list';

  return (
    <article
      className={classNames(
        'group flex h-full overflow-hidden rounded-2xl bg-white shadow-luxe ring-1 ring-charcoal-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe-lg',
        isList ? 'flex-col md:flex-row' : 'flex-col',
      )}
    >
      <div className={classNames('relative overflow-hidden', isList ? 'aspect-[4/3] md:aspect-auto md:w-2/5 md:shrink-0' : 'aspect-[4/3]')}>
        <SmartImage
          src={property.image}
          alt={`${property.title} in ${property.city}`}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span
            className={classNames(
              'rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider',
              property.status === 'For Sale' ? 'bg-gold-500 text-navy-950' : 'bg-white text-navy-900',
            )}
          >
            {property.status}
          </span>
          <span className="rounded-full bg-navy-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            {property.type}
          </span>
        </div>
        <FavoriteButton id={property.id} title={property.title} className="absolute right-4 top-4" />
        <p className="absolute bottom-4 left-4 font-serif text-2xl font-semibold text-white drop-shadow">{formatPrice(property)}</p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-charcoal-500">
          <MapPin className="h-3.5 w-3.5 text-gold-600" />
          {property.city}, {property.state}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-navy-900">{property.title}</h3>
        {isList && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-charcoal-500">{property.description}</p>}
        <PropertyMeta property={property} className="mt-4" />
        <div className="mt-auto flex items-center justify-between border-t border-charcoal-100 pt-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">{property.category}</span>
          <button
            type="button"
            onClick={() => onView(property)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition hover:text-gold-600"
          >
            View Details
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
