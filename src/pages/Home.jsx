import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Award, Gem, ShieldCheck, Users } from 'lucide-react';
import HeroSearch from '../components/home/HeroSearch';
import Testimonials from '../components/home/Testimonials';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyModal from '../components/properties/PropertyModal';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import SmartImage from '../components/ui/SmartImage';
import StatCounter from '../components/ui/StatCounter';
import { featuredCities, properties } from '../data/properties';
import { services } from '../data/services';
import { stats } from '../data/company';
import { unsplash } from '../utils/helpers';

const featured = properties.filter((p) => p.featured);

const pillars = [
  { icon: Gem, title: 'Curated Portfolio', text: 'Every listing is personally vetted by a senior advisor before it carries the PrimeNest name.' },
  { icon: ShieldCheck, title: 'Absolute Discretion', text: 'Confidential, off-market transactions for high-profile clients, family offices and corporations.' },
  { icon: Users, title: 'Dedicated Advisors', text: 'One senior point of contact supported by specialists in legal, finance and design.' },
  { icon: Award, title: 'Proven Results', text: 'Our listings sell 31% faster than the luxury market average, at 98.6% of asking price.' },
];

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-20 pt-32">
      <SmartImage
        src={unsplash('1613490493576-7fde63acd811', 2400)}
        alt="Contemporary luxury villa with infinity pool at dusk"
        eager
        className="absolute inset-0 -z-10 h-full w-full animate-slow-zoom object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950/70 to-transparent" />

      <div className="container-luxe">
        <p className="eyebrow animate-fade-up text-gold-400">Luxury Real Estate Since 2008</p>
        <h1 className="mt-6 max-w-3xl animate-fade-up text-balance text-4xl font-semibold leading-[1.1] text-white [animation-delay:120ms] sm:text-6xl lg:text-7xl">
          Find a residence worthy of your <em className="font-medium text-gold-400">ambitions</em>
        </h1>
        <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/80 [animation-delay:240ms] sm:text-lg">
          Exceptional homes, landmark commercial spaces and trusted advice across New York, Miami, Los Angeles and beyond.
        </p>
        <div className="mt-10 animate-fade-up [animation-delay:360ms]">
          <HeroSearch />
        </div>
        <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70 [animation-delay:480ms]">
          <span>
            <strong className="font-serif text-xl text-white">2,800+</strong> properties transacted
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span>
            <strong className="font-serif text-xl text-white">$4.2B</strong> in sales volume
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span>
            <strong className="font-serif text-xl text-white">3</strong> flagship offices
          </span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <>
      <Hero />

      {/* Featured properties */}
      <section className="section bg-charcoal-50">
        <div className="container-luxe">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Featured Listings"
              title="Signature properties, handpicked for you"
              subtitle="A selection of the most remarkable residences and commercial spaces currently represented by PrimeNest."
            />
            <Reveal>
              <Button to="/properties" variant="outline">
                View All Properties <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 120}>
                <PropertyCard property={p} onView={setSelected} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(198,154,66,0.15),transparent_50%)]" />
        <div className="container-luxe relative grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="text-center lg:border-r lg:border-white/10 lg:last:border-0">
              <p className="font-serif text-4xl font-semibold text-gold-400 sm:text-5xl">
                <StatCounter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why PrimeNest */}
      <section className="section overflow-hidden bg-white">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe-lg sm:w-4/5">
              <SmartImage src={unsplash('1600566753190-17f0baa2a6c3', 1000)} alt="Elegant open-plan living room with designer furniture" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 right-0 hidden aspect-square w-1/2 overflow-hidden rounded-3xl border-8 border-white shadow-luxe-lg sm:block">
              <SmartImage src={unsplash('1600047509807-ba8f99d2cdde', 700)} alt="Modern home exterior at twilight" className="h-full w-full object-cover" />
            </div>
            <div className="absolute left-4 top-8 rounded-2xl bg-navy-900 px-6 py-5 text-white shadow-luxe-lg sm:-left-6">
              <p className="font-serif text-4xl font-semibold text-gold-400">18</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">Years of trust</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Why PrimeNest"
              title="A boutique firm with a global standard of service"
              subtitle="We combine the intimacy of a private advisory practice with the market intelligence and reach of a national brokerage — so every client receives senior-level attention from first conversation to final signature."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {pillars.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 100} className="group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-600 transition group-hover:bg-gold-500 group-hover:text-navy-950">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-semibold text-navy-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10">
              <Button to="/about" variant="navy">
                Discover Our Story <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section bg-charcoal-50">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our Expertise"
            title="Comprehensive real estate services"
            subtitle="From acquisition to long-term stewardship, our integrated services cover every stage of the property journey."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {services.map(({ id, icon: Icon, title, short }, i) => (
              <Reveal key={id} delay={i * 80}>
                <Link
                  to={`/services#${id}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-luxe ring-1 ring-charcoal-100 transition-all duration-500 hover:-translate-y-1.5 hover:bg-navy-900 hover:shadow-luxe-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-950">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold transition group-hover:text-white">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-500 transition group-hover:text-white/70">{short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-600 group-hover:text-gold-400">
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by city */}
      <section className="section bg-white">
        <div className="container-luxe">
          <SectionHeading eyebrow="Explore Markets" title="Discover our most sought-after locations" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCities.map((city, i) => {
              const count = properties.filter((p) => p.city === city.name).length;
              return (
                <Reveal key={city.name} delay={i * 100}>
                  <Link
                    to={`/properties?location=${encodeURIComponent(city.name)}`}
                    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-luxe"
                  >
                    <SmartImage src={city.image} alt={`Properties in ${city.name}`} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                        {count} {count === 1 ? 'Listing' : 'Listings'}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{city.name}</h3>
                      <p className="mt-1 text-sm text-white/70">{city.tagline}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                        Explore <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTASection />

      <PropertyModal property={selected} onClose={closeModal} />
    </>
  );
}
