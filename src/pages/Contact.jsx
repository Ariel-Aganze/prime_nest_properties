import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Navigation, Phone, Send } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { company, offices } from '../data/company';
import { classNames, unsplash } from '../utils/helpers';

export const inquiryOptions = [
  { value: 'sales', label: 'Property Sales — Buying or Selling' },
  { value: 'rentals', label: 'Rentals & Leasing' },
  { value: 'management', label: 'Property Management' },
  { value: 'consulting', label: 'Real Estate Consulting' },
  { value: 'investment', label: 'Investment Advisory' },
  { value: 'viewing', label: 'Schedule a Private Viewing' },
  { value: 'general', label: 'General Inquiry' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
const FIELD_ORDER = ['name', 'email', 'phone', 'inquiry', 'message', 'consent'];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your full name.';
  else if (v.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';

  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address (e.g. name@example.com).';

  if (v.phone.trim() && (!PHONE_RE.test(v.phone.trim()) || v.phone.replace(/\D/g, '').length < 7))
    e.phone = 'Please enter a valid phone number, or leave it blank.';

  if (!v.inquiry) e.inquiry = 'Please select the type of inquiry.';

  if (!v.message.trim()) e.message = 'Please tell us a little about how we can help.';
  else if (v.message.trim().length < 20) e.message = `Please add a little more detail (${20 - v.message.trim().length} more characters).`;

  if (!v.consent) e.consent = 'Please agree to be contacted so we can respond.';
  return e;
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="label-luxe">
        {label} {required ? <span className="text-gold-600">*</span> : <span className="font-normal normal-case tracking-normal text-charcoal-400">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-charcoal-400">{hint}</p>
      )}
    </div>
  );
}

function ContactForm() {
  const [params] = useSearchParams();
  const initial = useMemo(() => {
    const inquiry = params.get('inquiry');
    const property = params.get('property');
    return {
      name: '',
      email: '',
      phone: '',
      inquiry: inquiryOptions.some((o) => o.value === inquiry) ? inquiry : '',
      message: property ? `I would like to arrange a private viewing of “${property}”. ` : '',
      consent: false,
    };
  }, [params]);

  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [reference, setReference] = useState('');
  const formRef = useRef(null);

  const errors = validate(values);
  const showError = (field) => (touched[field] || submitted) && errors[field];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    // Simulated request — replace with a real API call (e.g. fetch('/api/contact')) when a backend is available.
    setTimeout(() => {
      setReference(`PN-${Date.now().toString().slice(-6)}`);
      setStatus('success');
    }, 1400);
  };

  const resetForm = () => {
    setValues({ ...initial, inquiry: '', message: '' });
    setTouched({});
    setSubmitted(false);
    setStatus('idle');
  };

  const inputClass = (field) =>
    classNames('input-luxe', showError(field) && 'border-red-400 focus:border-red-500 focus:ring-red-500/20');

  const aria = (field) => ({
    'aria-invalid': Boolean(showError(field)),
    'aria-describedby': showError(field) ? `${field}-error` : undefined,
  });

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" role="status">
        <span className="flex h-20 w-20 animate-scale-in items-center justify-center rounded-full bg-gold-50">
          <CheckCircle2 className="h-10 w-10 text-gold-600" />
        </span>
        <h3 className="mt-6 text-3xl font-semibold">Thank you, {values.name.trim().split(' ')[0]}.</h3>
        <p className="mt-4 max-w-md text-charcoal-500">
          Your message has been received. A PrimeNest advisor will contact you at <span className="font-semibold text-navy-900">{values.email}</span>{' '}
          within one business day.
        </p>
        <p className="mt-6 rounded-full bg-charcoal-50 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal-600">
          Reference: {reference}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={resetForm} variant="navy">
            Send Another Message
          </Button>
          <Button to="/properties" variant="outline">
            Browse Properties
          </Button>
        </div>
      </div>
    );
  }

  const messageLength = values.message.trim().length;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full Name" required error={showError('name')}>
          <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Jane Ashford" className={inputClass('name')} {...aria('name')} />
        </Field>
        <Field id="email" label="Email Address" required error={showError('email')}>
          <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="jane@example.com" className={inputClass('email')} {...aria('email')} />
        </Field>
        <Field id="phone" label="Phone Number" error={showError('phone')}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="+1 (555) 000-0000" className={inputClass('phone')} {...aria('phone')} />
        </Field>
        <Field id="inquiry" label="Inquiry Type" required error={showError('inquiry')}>
          <select id="inquiry" name="inquiry" value={values.inquiry} onChange={handleChange} onBlur={handleBlur} className={classNames(inputClass('inquiry'), 'cursor-pointer', !values.inquiry && 'text-charcoal-400')} {...aria('inquiry')}>
            <option value="" disabled>
              Select an option…
            </option>
            {inquiryOptions.map((o) => (
              <option key={o.value} value={o.value} className="text-charcoal-900">
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" required error={showError('message')} hint={`${messageLength}/20 characters minimum`}>
        <textarea id="message" name="message" rows={6} value={values.message} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us about the property you’re looking for, your timeline and budget…" className={classNames(inputClass('message'), 'resize-y')} {...aria('message')} />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal-600">
          <input type="checkbox" name="consent" checked={values.consent} onChange={handleChange} onBlur={handleBlur} className="mt-0.5 h-4 w-4 shrink-0 rounded accent-gold-500" {...aria('consent')} />
          <span>I agree to be contacted by PrimeNest Properties regarding my inquiry. Your details are kept strictly confidential.</span>
        </label>
        {showError('consent') && (
          <p id="consent-error" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}

function OfficeMap() {
  const [activeId, setActiveId] = useState(offices[0].id);
  const office = offices.find((o) => o.id === activeId);
  const d = 0.008;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${office.lon - d}%2C${office.lat - d}%2C${office.lon + d}%2C${office.lat + d}&layer=mapnik&marker=${office.lat}%2C${office.lon}`;
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;

  return (
    <section className="section scroll-mt-16 bg-charcoal-50" id="map">
      <div className="container-luxe">
        <SectionHeading eyebrow="Visit Us" title="Our offices" subtitle="Meet our advisors in person at one of our three flagship locations." />
        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Office locations">
          {offices.map((o) => (
            <button
              key={o.id}
              type="button"
              role="tab"
              aria-selected={o.id === activeId}
              onClick={() => setActiveId(o.id)}
              className={classNames(
                'rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition',
                o.id === activeId ? 'bg-navy-900 text-white shadow-luxe' : 'bg-white text-charcoal-600 ring-1 ring-charcoal-200 hover:text-navy-900 hover:ring-gold-500',
              )}
            >
              {o.city}
            </button>
          ))}
        </div>

        <Reveal className="mt-8 grid overflow-hidden rounded-3xl bg-white shadow-luxe-lg ring-1 ring-charcoal-100 lg:grid-cols-3">
          <div className="relative h-80 sm:h-96 lg:col-span-2 lg:h-[460px]">
            <iframe key={office.id} title={`Map of the PrimeNest ${office.city} office`} src={src} className="h-full w-full border-0" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p className="eyebrow">{office.label}</p>
            <h3 className="mt-4 text-3xl font-semibold">PrimeNest {office.city}</h3>
            <ul className="mt-6 space-y-4 text-sm text-charcoal-600">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" /> {office.address}
              </li>
              <li>
                <a href={office.phoneHref} className="flex gap-3 transition hover:text-gold-700">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" /> {office.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" /> Mon–Fri 9am–7pm · Sat 10am–5pm
              </li>
            </ul>
            <Button href={directions} target="_blank" rel="noopener noreferrer" variant="navy" className="mt-8 w-full">
              <Navigation className="h-4 w-4" /> Get Directions
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const infoCards = [
    { icon: Phone, title: 'Call Us', lines: [company.phone, 'Concierge line, 7 days'], href: company.phoneHref },
    { icon: Mail, title: 'Email Us', lines: [company.email, 'Reply within one business day'], href: `mailto:${company.email}` },
    { icon: MapPin, title: 'Head Office', lines: [company.address, company.cityLine], href: '#map' },
    { icon: Clock, title: 'Business Hours', lines: ['Mon–Fri: 9:00 AM – 7:00 PM', 'Sat: 10:00 AM – 5:00 PM'] },
  ];

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in Touch"
        title="Let’s start a conversation"
        subtitle="Whether you’re buying, selling, leasing or investing, our advisors are ready to help. Expect a personal response within one business day."
        image={unsplash('1600566753190-17f0baa2a6c3', 2400)}
      />

      {/* Info cards */}
      <section className="relative z-10 -mt-12">
        <div className="container-luxe grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map(({ icon: Icon, title, lines, href }, i) => {
            const content = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-950">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-400">{title}</h2>
                <p className={classNames('mt-2 break-words font-semibold text-navy-900', lines[0].includes('@') && 'text-sm')}>{lines[0]}</p>
                <p className="mt-1 text-sm text-charcoal-500">{lines[1]}</p>
              </>
            );
            return (
              <Reveal key={title} delay={i * 100}>
                {href ? (
                  <a href={href} className="card-luxe group block h-full p-6 transition hover:-translate-y-1 hover:shadow-luxe-lg">
                    {content}
                  </a>
                ) : (
                  <div className="card-luxe group h-full p-6">{content}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="section bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Reveal className="card-luxe p-6 sm:p-10">
            <p className="eyebrow">Send a Message</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">How can we help you?</h2>
            <p className="mt-3 text-charcoal-500">Complete the form below and the right specialist will be in touch.</p>
            <div className="mt-8">
              <ContactForm key={searchParams.toString()} />
            </div>
          </Reveal>

          <Reveal delay={150} className="space-y-6">
            <div className="rounded-3xl bg-navy-900 p-8 text-white">
              <h3 className="text-2xl font-semibold text-white">Business Hours</h3>
              <ul className="mt-6 divide-y divide-white/10">
                {company.hours.map((h) => (
                  <li key={h.day} className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:justify-between">
                    <span className="text-white/70">{h.day}</span>
                    <span className="font-semibold text-gold-400">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-charcoal-50 p-8 ring-1 ring-charcoal-100">
              <h3 className="text-2xl font-semibold">Prefer to talk now?</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
                Our concierge team can connect you directly with an advisor in your market, or arrange a private viewing at short notice.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={company.phoneHref} variant="navy">
                  <Phone className="h-4 w-4" /> Call {company.phone}
                </Button>
                <Button href={`mailto:${company.email}`} variant="outline">
                  <Mail className="h-4 w-4" /> Email Concierge
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <OfficeMap />
    </>
  );
}
