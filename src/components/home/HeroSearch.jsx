import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BedDouble, Building, MapPin, Search } from 'lucide-react';
import { cities, propertyTypes } from '../../data/properties';
import { classNames } from '../../utils/helpers';

const tabs = [
  { label: 'Buy', status: 'For Sale' },
  { label: 'Rent', status: 'For Rent' },
  { label: 'All', status: '' },
];

function Field({ icon: Icon, label, id, children }) {
  return (
    <div className="flex flex-1 items-center gap-3 px-4 py-3 lg:py-2">
      <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-400">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}

const selectClass = 'w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-navy-900 focus:outline-none';

/** Home hero search; submits to the Properties page as URL filters. */
export default function HeroSearch() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('For Sale');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [beds, setBeds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (beds) params.set('beds', beds);
    navigate(`/properties${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex gap-1" role="tablist" aria-label="Listing type">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={status === tab.status}
            onClick={() => setStatus(tab.status)}
            className={classNames(
              'rounded-t-xl px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition',
              status === tab.status ? 'bg-white text-navy-900' : 'bg-navy-950/50 text-white/80 backdrop-blur-md hover:text-white',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col divide-y divide-charcoal-100 rounded-b-2xl rounded-tr-2xl bg-white p-2 shadow-luxe-lg lg:flex-row lg:items-center lg:divide-x lg:divide-y-0"
      >
        <Field icon={MapPin} label="Location" id="hero-location">
          <select id="hero-location" value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass}>
            <option value="">All locations</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field icon={Building} label="Property Type" id="hero-type">
          <select id="hero-type" value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
            <option value="">Any type</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field icon={BedDouble} label="Bedrooms" id="hero-beds">
          <select id="hero-beds" value={beds} onChange={(e) => setBeds(e.target.value)} className={selectClass}>
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+ bedrooms
              </option>
            ))}
          </select>
        </Field>
        <div className="p-2 lg:pl-3">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-navy-950 lg:w-auto"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </div>
      </form>
    </div>
  );
}
