import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollManager from './ScrollManager';
import BackToTop from './BackToTop';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <a
        href="#main"
        className="sr-only z-[100] rounded-md bg-gold-500 px-4 py-2 font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
