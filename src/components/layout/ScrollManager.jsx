import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'PrimeNest Properties | Luxury Real Estate',
  '/properties': 'Properties | PrimeNest Properties',
  '/services': 'Services | PrimeNest Properties',
  '/about': 'About Us | PrimeNest Properties',
  '/contact': 'Contact | PrimeNest Properties',
};

/** Scrolls to top on page change, or to an anchor when the URL has a hash; also sets the document title. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? PAGE_TITLES['/'];
  }, [pathname]);

  // New page: start at the top (unless an anchor will be scrolled to below).
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Anchor links (e.g. /services#rentals): re-run on every navigation, even to the same hash.
  useEffect(() => {
    if (!hash) return undefined;
    const timer = setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [hash, key]);

  return null;
}
