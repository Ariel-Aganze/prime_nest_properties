import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, X, Mail, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { company } from '../../data/company';
import { classNames } from '../../utils/helpers';

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll while the mobile menu is open; close it on Escape.
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={classNames(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid ? 'bg-navy-950/95 py-3 shadow-luxe backdrop-blur-md' : 'bg-transparent py-5',
      )}
    >
      <nav className="container-luxe flex items-center justify-between" aria-label="Main navigation">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  classNames(
                    'relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300',
                    'after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-500 after:transition-transform after:duration-300',
                    isActive
                      ? 'text-gold-400 after:scale-x-100'
                      : 'text-white/85 after:scale-x-0 hover:text-white hover:after:scale-x-100',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={company.phoneHref} className="flex items-center gap-2 text-sm font-medium text-white/85 transition hover:text-gold-400">
            <Phone className="h-4 w-4 text-gold-500" />
            {company.phone}
          </a>
          <Button to="/contact?inquiry=general" size="sm">
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold-500 hover:text-gold-400 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
    </header>

      {/* Mobile menu (sibling of header so backdrop-filter doesn't trap its fixed positioning) */}
      <div
        id="mobile-menu"
        className={classNames(
          'fixed inset-x-0 bottom-0 top-0 z-40 overflow-y-auto pt-[72px] bg-navy-950 transition-all duration-500 lg:hidden',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-4 opacity-0',
        )}
      >
        <div className="container-luxe flex min-h-full flex-col py-8">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li
                key={link.to}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
                className={classNames('transition-all duration-500', open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0')}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    classNames(
                      'flex items-center justify-between border-b border-white/10 py-4 font-serif text-2xl transition',
                      isActive ? 'text-gold-400' : 'text-white hover:text-gold-300',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-4 text-sm text-white/75">
            <a href={company.phoneHref} className="flex items-center gap-3 hover:text-gold-400">
              <Phone className="h-4 w-4 text-gold-500" /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-3 break-all hover:text-gold-400">
              <Mail className="h-4 w-4 shrink-0 text-gold-500" /> {company.email}
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-gold-500" /> {company.address}, {company.cityLine}
            </p>
          </div>
          <Button to="/contact?inquiry=general" size="lg" className="mt-10 w-full">
            Book a Consultation
          </Button>
        </div>
      </div>
    </>
  );
}
