# PrimeNest Properties

A five-page luxury real estate website built with **React 18, React Router 6, Tailwind CSS 3 and Vite**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Pages

| Route         | Highlights |
|---------------|-----------|
| `/`           | Hero with Buy/Rent search (deep-links into Properties), featured listings, animated stats, services preview, explore-by-city, testimonial carousel, CTA |
| `/properties` | Keyword search, category/status/location/type/bedroom/price filters, saved-only toggle, sorting, grid/list view, load-more, mobile filter drawer, property detail modal with gallery. Filters are synced to the URL. |
| `/services`   | Sales, Rentals, Management, Consulting, Investment Advisory (anchor-linked), process steps, FAQ accordion |
| `/about`      | Story, mission & vision, values, stats, timeline, awards, leadership team |
| `/contact`    | Contact cards, validated contact form (pre-filled from `?inquiry=` / `?property=`), business hours, office map with location tabs |

## Structure

```
src/
  components/
    layout/      Navbar, Footer, Layout, ScrollManager, BackToTop
    ui/          Button, Reveal, SmartImage, SectionHeading, PageHero, CTASection, StatCounter, Logo
    home/        HeroSearch, Testimonials
    properties/  PropertyCard, PropertyModal
  context/       FavoritesContext (saved properties, persisted to localStorage)
  data/          properties, services, company (team, offices, testimonials, milestones)
  hooks/         useInView
  pages/         Home, Properties, Services, About, Contact
  utils/         helpers (formatting, image URLs)
```

## Notes

- The contact form and newsletter simulate submission on the client. To send real messages, replace the `setTimeout` in `src/pages/Contact.jsx` with a call to your API.
- Photography comes from Unsplash. Maps are OpenStreetMap embeds.
- When deploying, configure the host to rewrite unknown routes to `index.html` (SPA fallback).
