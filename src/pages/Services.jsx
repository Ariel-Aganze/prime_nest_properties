import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Phone } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import { faqs, processSteps, services } from '../data/services';
import { company } from '../data/company';
import { classNames, unsplash } from '../utils/helpers';

function ServiceSection({ service, index }) {
  const { id, icon: Icon, title, description, image, features, stat } = service;
  const reversed = index % 2 === 1;

  return (
    <section id={id} className={classNames('scroll-mt-24 py-16 sm:py-20', index % 2 === 0 ? 'bg-white' : 'bg-charcoal-50')}>
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className={classNames('relative', reversed && 'lg:order-2')}>
          <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-luxe-lg">
            <SmartImage src={image} alt={title} className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105" />
          </div>
          <div className={classNames('absolute -bottom-6 rounded-2xl bg-navy-900 px-6 py-5 shadow-luxe-lg', reversed ? 'left-6 lg:-left-6' : 'right-6 lg:-right-6')}>
            <p className="font-serif text-3xl font-semibold text-gold-400">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/70">{stat.label}</p>
          </div>
        </Reveal>

        <Reveal delay={120} className={classNames(reversed && 'lg:order-1')}>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
              <Icon className="h-7 w-7" />
            </span>
            <span className="font-serif text-5xl font-semibold text-charcoal-200">0{index + 1}</span>
          </div>
          <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">{title}</h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal-500">{description}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-charcoal-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-950">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to={`/contact?inquiry=${id}`}>
              Request a Consultation <ArrowRight className="h-4 w-4" />
            </Button>
            {(id === 'sales' || id === 'rentals') && (
              <Button to={`/properties?status=${id === 'sales' ? 'For Sale' : 'For Rent'}`} variant="outline">
                View {id === 'sales' ? 'Listings for Sale' : 'Rentals'}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-charcoal-100 rounded-2xl bg-white shadow-luxe ring-1 ring-charcoal-100">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3 className="font-sans">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-base font-semibold text-navy-900 transition hover:text-gold-700 sm:px-8"
              >
                {item.q}
                <ChevronDown className={classNames('h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300', isOpen && 'rotate-180')} />
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className={classNames('grid transition-all duration-500 ease-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-charcoal-500 sm:px-8">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What We Do"
        title="Integrated real estate services, delivered with distinction"
        subtitle="Five specialist practices working as one team — so every decision about your property is informed, strategic and seamlessly executed."
        image={unsplash('1600607687939-ce8a6c25118c', 2400)}
      />

      {/* Quick navigation */}
      <div className="sticky top-[68px] z-30 lg:top-16 border-b border-charcoal-100 bg-white/95 backdrop-blur-md">
        <nav className="container-luxe no-scrollbar flex gap-2 overflow-x-auto py-3" aria-label="Services">
          {services.map(({ id, title, icon: Icon }) => (
            <Link
              key={id}
              to={`#${id}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-charcoal-200 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal-600 transition hover:border-gold-500 hover:bg-gold-50 hover:text-navy-900"
            >
              <Icon className="h-4 w-4 text-gold-600" /> {title}
            </Link>
          ))}
        </nav>
      </div>

      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      {/* Process */}
      <section className="section relative overflow-hidden bg-navy-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(198,154,66,0.12),transparent_45%)]" />
        <div className="container-luxe relative">
          <SectionHeading light eyebrow="Our Process" title="A considered approach, from first call to final key" />
          <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 120} className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-gold-500/50 hover:bg-white/[0.06]">
                <span className="font-serif text-5xl font-semibold text-gold-500/80">{s.step}</span>
                <h3 className="mt-6 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-charcoal-50">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions our clients often ask"
              subtitle="Can’t find the answer you’re looking for? Our concierge team is available seven days a week."
            />
            <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact?inquiry=general" variant="navy">
                Ask a Question
              </Button>
              <Button href={company.phoneHref} variant="outline">
                <Phone className="h-4 w-4" /> {company.phone}
              </Button>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <FAQ />
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Complimentary Consultation"
        title="Let’s discuss your property goals"
        text="Whether you are buying, selling, leasing or investing, a senior PrimeNest advisor will prepare a tailored strategy at no cost."
        secondary={{ label: 'Meet Our Team', to: '/about#team' }}
        image={unsplash('1600880292203-757bb62b4baf', 1800)}
      />
    </>
  );
}
