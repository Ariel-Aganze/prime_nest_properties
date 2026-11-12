import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heart, LayoutGrid, List, RotateCcw, Search, SearchX, SlidersHorizontal, X } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyModal from '../components/properties/PropertyModal';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import { cities, properties, propertyTypes } from '../data/properties';
import { useFavorites } from '../context/FavoritesContext';
import { classNames, unsplash } from '../utils/helpers';

const PAGE_SIZE = 6;

const DEFAULTS = {
  q: '',
  category: '',
  status: '',
  type: '',
  location: '',
  beds: '',
  minPrice: '',
  maxPrice: '',
  sort: 'featured',
  saved: '',
};

const sorters = {
  featured: (a, b) => Number(b.featured) - Number(a.featured),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'area-desc': (a, b) => b.area - a.area,
  newest: (a, b) => b.yearBuilt - a.yearBuilt,
};

function FilterGroup({ label, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label-luxe">
        {label}
      </label>
      {children}
    </div>
  );
}

function ChipGroup({ options, value, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.label}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={classNames(
            'rounded-full border px-4 py-2 text-xs font-semibold transition',
            value === opt.value
              ? 'border-navy-900 bg-navy-900 text-white'
              : 'border-charcoal-200 text-charcoal-600 hover:border-gold-500 hover:text-navy-900',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Filters({ filters, update, reset, activeCount }) {
  return (
    <div className="space-y-6">
      <FilterGroup label="Category">
        <ChipGroup
          label="Category"
          value={filters.category}
          onChange={(v) => update({ category: v })}
          options={[
            { label: 'All', value: '' },
            { label: 'Residential', value: 'Residential' },
            { label: 'Commercial', value: 'Commercial' },
          ]}
        />
      </FilterGroup>

      <FilterGroup label="Listing Status">
        <ChipGroup
          label="Listing status"
          value={filters.status}
          onChange={(v) => update({ status: v })}
          options={[
            { label: 'All', value: '' },
            { label: 'For Sale', value: 'For Sale' },
            { label: 'For Rent', value: 'For Rent' },
          ]}
        />
      </FilterGroup>

      <FilterGroup label="Location" htmlFor="filter-location">
        <select id="filter-location" value={filters.location} onChange={(e) => update({ location: e.target.value })} className="input-luxe cursor-pointer">
          <option value="">All locations</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Property Type" htmlFor="filter-type">
        <select id="filter-type" value={filters.type} onChange={(e) => update({ type: e.target.value })} className="input-luxe cursor-pointer">
          <option value="">All types</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Bedrooms">
        <ChipGroup
          label="Minimum bedrooms"
          value={filters.beds}
          onChange={(v) => update({ beds: v })}
          options={[{ label: 'Any', value: '' }, ...[1, 2, 3, 4, 5].map((n) => ({ label: `${n}+`, value: String(n) }))]}
        />
      </FilterGroup>

      <FilterGroup label="Price Range (USD)">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            aria-label="Minimum price"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: e.target.value })}
            className="input-luxe"
          />
          <input
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            aria-label="Maximum price"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: e.target.value })}
            className="input-luxe"
          />
        </div>
        <p className="mt-2 text-xs text-charcoal-400">Rentals are priced per month.</p>
      </FilterGroup>

      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-charcoal-200 px-4 py-3 text-sm font-medium text-charcoal-700 transition hover:border-gold-500">
        <input
          type="checkbox"
          checked={filters.saved === '1'}
          onChange={(e) => update({ saved: e.target.checked ? '1' : '' })}
          className="h-4 w-4 rounded border-charcoal-300 accent-gold-500"
        />
        <Heart className="h-4 w-4 text-gold-600" /> Show saved properties only
      </label>

      <button
        type="button"
        onClick={reset}
        disabled={activeCount === 0}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-charcoal-200 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal-600 transition hover:border-navy-900 hover:text-navy-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RotateCcw className="h-4 w-4" /> Reset Filters {activeCount > 0 && `(${activeCount})`}
      </button>
    </div>
  );
}

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState('grid');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeModal = useCallback(() => setSelected(null), []);

  // Filters live in the URL so searches are shareable and the Home search can deep-link here.
  const filters = useMemo(() => {
    const f = { ...DEFAULTS };
    Object.keys(DEFAULTS).forEach((key) => {
      const v = searchParams.get(key);
      if (v !== null) f[key] = v;
    });
    return f;
  }, [searchParams]);

  const update = useCallback(
    (patch) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(patch).forEach(([k, v]) => {
            if (v === '' || v === DEFAULTS[k]) next.delete(k);
            else next.set(k, v);
          });
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const reset = () => setSearchParams({}, { replace: true });

  const activeCount = Object.keys(DEFAULTS).filter((k) => k !== 'sort' && k !== 'q' && filters[k] !== DEFAULTS[k]).length;

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const min = filters.minPrice ? Number(filters.minPrice) : null;
    const max = filters.maxPrice ? Number(filters.maxPrice) : null;
    const beds = filters.beds ? Number(filters.beds) : null;

    return properties
      .filter((p) => {
        if (q && !`${p.title} ${p.city} ${p.state} ${p.address} ${p.type}`.toLowerCase().includes(q)) return false;
        if (filters.category && p.category !== filters.category) return false;
        if (filters.status && p.status !== filters.status) return false;
        if (filters.type && p.type !== filters.type) return false;
        if (filters.location && p.city !== filters.location) return false;
        if (beds !== null && p.beds < beds) return false;
        if (min !== null && p.price < min) return false;
        if (max !== null && p.price > max) return false;
        if (filters.saved === '1' && !favorites.includes(p.id)) return false;
        return true;
      })
      .sort(sorters[filters.sort] ?? sorters.featured);
  }, [filters, favorites]);

  // Show the first page again whenever the result set changes.
  useEffect(() => setVisible(PAGE_SIZE), [filters]);

  // Close the mobile drawer with Escape and lock scroll while open.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  const shown = results.slice(0, visible);

  return (
    <>
      <PageHero
        crumb="Properties"
        eyebrow="Our Portfolio"
        title="Exceptional properties for sale & lease"
        subtitle="Browse our curated collection of luxury residences and premier commercial spaces across America’s most desirable markets."
        image={unsplash('1600585154340-be6161a56a0c', 2400)}
      />

      <section className="bg-charcoal-50 py-12 sm:py-16">
        <div className="container-luxe">
          {/* Toolbar */}
          <div className="card-luxe flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
              <input
                type="search"
                value={filters.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search by name, city, address or type…"
                aria-label="Search properties"
                className="input-luxe pl-11"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-charcoal-200 px-4 py-3 text-sm font-semibold text-navy-900 transition hover:border-gold-500 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
                {activeCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[11px] text-navy-950">{activeCount}</span>
                )}
              </button>
              <label htmlFor="sort" className="sr-only">
                Sort properties
              </label>
              <select id="sort" value={filters.sort} onChange={(e) => update({ sort: e.target.value })} className="input-luxe w-auto flex-1 cursor-pointer sm:flex-none">
                <option value="featured">Sort: Featured</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="area-desc">Size: Largest First</option>
                <option value="newest">Newest Construction</option>
              </select>
              <div className="hidden rounded-lg border border-charcoal-200 p-1 sm:flex" role="group" aria-label="Layout">
                {[
                  { id: 'grid', icon: LayoutGrid, label: 'Grid view' },
                  { id: 'list', icon: List, label: 'List view' },
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setView(id)}
                    aria-label={label}
                    aria-pressed={view === id}
                    className={classNames('rounded-md p-2 transition', view === id ? 'bg-navy-900 text-white' : 'text-charcoal-500 hover:text-navy-900')}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
              <div className="card-luxe sticky top-28 p-6">
                <h2 className="mb-6 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-navy-900">
                  <SlidersHorizontal className="h-4 w-4 text-gold-600" /> Refine Search
                </h2>
                <Filters filters={filters} update={update} reset={reset} activeCount={activeCount} />
              </div>
            </aside>

            {/* Results */}
            <div>
              <p className="mb-6 text-sm text-charcoal-500" aria-live="polite">
                Showing <span className="font-semibold text-navy-900">{shown.length}</span> of{' '}
                <span className="font-semibold text-navy-900">{results.length}</span> {results.length === 1 ? 'property' : 'properties'}
                {filters.location && (
                  <>
                    {' '}
                    in <span className="font-semibold text-navy-900">{filters.location}</span>
                  </>
                )}
              </p>

              {results.length === 0 ? (
                <div className="card-luxe flex flex-col items-center px-6 py-20 text-center">
                  <SearchX className="h-12 w-12 text-gold-500" />
                  <h3 className="mt-5 text-2xl font-semibold">No properties match your criteria</h3>
                  <p className="mt-3 max-w-md text-sm text-charcoal-500">
                    Try widening your filters — or let our advisors search our off-market network on your behalf.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button onClick={reset} variant="navy">
                      <RotateCcw className="h-4 w-4" /> Reset Filters
                    </Button>
                    <Button to="/contact?inquiry=sales" variant="outline">
                      Request Off-Market Search
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={classNames('grid gap-8', view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
                    {shown.map((p, i) => (
                      <Reveal key={p.id} delay={(i % 3) * 80}>
                        <PropertyCard property={p} onView={setSelected} layout={view} />
                      </Reveal>
                    ))}
                  </div>
                  {visible < results.length && (
                    <div className="mt-12 text-center">
                      <Button onClick={() => setVisible((v) => v + PAGE_SIZE)} variant="navy" size="lg">
                        Load More Properties ({results.length - visible} remaining)
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <div className={classNames('fixed inset-0 z-[60] lg:hidden', drawerOpen ? 'visible' : 'invisible')} aria-hidden={!drawerOpen}>
        <button
          type="button"
          tabIndex={drawerOpen ? 0 : -1}
          aria-label="Close filters"
          onClick={() => setDrawerOpen(false)}
          className={classNames('absolute inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity duration-300', drawerOpen ? 'opacity-100' : 'opacity-0')}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter properties"
          className={classNames(
            'absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-luxe-lg transition-transform duration-500',
            drawerOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-charcoal-100 px-6 py-5">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-navy-900">Refine Search</h2>
            <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close filters" className="rounded-full p-2 text-charcoal-500 hover:bg-charcoal-100" tabIndex={drawerOpen ? 0 : -1}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {drawerOpen && <Filters filters={filters} update={update} reset={reset} activeCount={activeCount} />}
          </div>
          <div className="border-t border-charcoal-100 p-6">
            <Button onClick={() => setDrawerOpen(false)} className="w-full">
              Show {results.length} {results.length === 1 ? 'Result' : 'Results'}
            </Button>
          </div>
        </div>
      </div>

      <CTASection
        eyebrow="Off-Market Access"
        title="Can’t find what you’re looking for?"
        text="Over 40% of our transactions never reach the open market. Tell us what you need and our advisors will search our private network for you."
        primary={{ label: 'Request a Private Search', to: '/contact?inquiry=sales' }}
        secondary={{ label: 'Explore Our Services', to: '/services' }}
      />

      <PropertyModal property={selected} onClose={closeModal} />
    </>
  );
}
