import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import Logo from '../ui/Logo';
import { navLinks } from './Navbar';
import { company } from '../../data/company';
import { services } from '../../data/services';

const socialIcons = { Instagram, LinkedIn: Linkedin, Facebook, YouTube: Youtube };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return setError('Please enter your email address.');
    if (!EMAIL_RE.test(email.trim())) return setError('Please enter a valid email address.');
    setError('');
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-gold-500/30 bg-gold-500/10 p-4 text-sm text-white/85" role="status">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
        <p>
          Thank you — <span className="font-semibold text-white">{email}</span> is now subscribed to our quarterly market report and
          private listings.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex rounded-full border border-white/15 bg-white/5 p-1 transition focus-within:border-gold-500">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder="Your email address"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-950 transition hover:bg-gold-400"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-luxe grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            A boutique luxury real estate firm representing exceptional residential and commercial properties across America’s most
            coveted markets since 2008.
          </p>
          <div className="mt-6 flex gap-3">
            {company.socials.map(({ name, href }) => {
              const Icon = socialIcons[name];
              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`PrimeNest on ${name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-gold-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="transition hover:text-gold-400">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">Get in Touch</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>
                {company.address}
                <br />
                {company.cityLine}
              </span>
            </li>
            <li>
              <a href={company.phoneHref} className="flex gap-3 transition hover:text-gold-400">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex gap-3 break-all transition hover:text-gold-400">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> {company.email}
              </a>
            </li>
          </ul>
          <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white">Private Listings Newsletter</p>
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} PrimeNest Properties. All rights reserved.</p>
          <p className="text-white/50">Licensed Real Estate Broker · Equal Housing Opportunity</p>
        </div>
      </div>
    </footer>
  );
}
