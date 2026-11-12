import { ArrowRight } from 'lucide-react';
import Button from './Button';
import Reveal from './Reveal';
import SmartImage from './SmartImage';
import { unsplash } from '../../utils/helpers';

export default function CTASection({
  eyebrow = 'Begin Your Journey',
  title = 'Ready to find your next exceptional address?',
  text = 'Speak with a PrimeNest advisor today for a complimentary, no-obligation consultation tailored to your goals.',
  primary = { label: 'Book a Consultation', to: '/contact' },
  secondary = { label: 'Browse Properties', to: '/properties' },
  image = unsplash('1600047509807-ba8f99d2cdde', 1800),
}) {
  return (
    <section className="section bg-white">
      <div className="container-luxe">
        <Reveal className="relative isolate overflow-hidden rounded-3xl bg-navy-950 px-6 py-16 shadow-luxe-lg sm:px-12 sm:py-20 lg:px-20">
          <SmartImage src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40" />
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-400">{eyebrow}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">{text}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button to={primary.to} size="lg">
                {primary.label} <ArrowRight className="h-4 w-4" />
              </Button>
              {secondary && (
                <Button to={secondary.to} variant="outline-light" size="lg">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
