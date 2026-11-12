import { Award, Compass, Eye, Gem, Handshake, Heart, Lightbulb, Lock, Mail, ShieldCheck, Target, Trophy } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';
import StatCounter from '../components/ui/StatCounter';
import Button from '../components/ui/Button';
import CTASection from '../components/ui/CTASection';
import { awards, company, milestones, stats, team } from '../data/company';
import { unsplash } from '../utils/helpers';

const values = [
  { icon: ShieldCheck, title: 'Integrity', text: 'We give candid advice, even when it is not what clients expect to hear. Our reputation is built on trust, not volume.' },
  { icon: Gem, title: 'Excellence', text: 'From photography to closing documents, every detail is held to the standard our clients expect from a luxury brand.' },
  { icon: Lock, title: 'Discretion', text: 'Many of our clients are public figures. Confidentiality is embedded in every process, system and conversation.' },
  { icon: Handshake, title: 'Partnership', text: 'We measure success in decades-long relationships, not single transactions — many clients have worked with us since 2008.' },
  { icon: Lightbulb, title: 'Insight', text: 'Proprietary research and transaction data inform every recommendation we make, from pricing to portfolio strategy.' },
  { icon: Heart, title: 'Community', text: 'We donate 1% of every commission to housing and education charities in the communities where we work.' },
];

export default function About() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="Our Story"
        title="Eighteen years of redefining luxury real estate"
        subtitle="PrimeNest Properties was founded on a simple belief: that buying, selling or investing in exceptional property deserves exceptional advice."
        image={unsplash('1600047509807-ba8f99d2cdde', 2400)}
      />

      {/* Introduction */}
      <section className="section bg-white">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="A boutique firm with national reach"
            />
            <Reveal className="mt-6 space-y-5 text-base leading-relaxed text-charcoal-500">
              <p>
                Founded in 2008 by Alexandra Whitmore with four colleagues and a single office on Park Avenue, PrimeNest Properties set
                out to bring the rigour of private banking to the world of luxury real estate.
              </p>
              <p>
                Today our team of 85 advisors, analysts and property managers represents buyers, sellers, landlords and investors from
                offices in New York, Miami and Los Angeles — while remaining deliberately small enough that every client works directly
                with a senior partner.
              </p>
              <p>
                We have guided over 2,800 transactions worth more than $4.2 billion, yet we still measure our success the same way we did
                on day one: by the number of clients who return, and the friends they send to us.
              </p>
            </Reveal>
            <Reveal className="mt-8 flex items-center gap-5 border-l-2 border-gold-500 pl-5">
              <SmartImage src={team[0].image} alt={team[0].name} className="h-16 w-16 rounded-full object-cover" />
              <div>
                <p className="font-serif text-lg italic text-navy-900">“Our clients don’t need more listings. They need better judgment.”</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-600">
                  {team[0].name}, Founder & CEO
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={150} className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-luxe">
                <SmartImage src={unsplash('1497366216548-37526070297c', 700)} alt="PrimeNest New York office interior" className="h-full w-full object-cover" />
              </div>
              <div className="rounded-2xl bg-navy-900 p-6 text-center">
                <p className="font-serif text-4xl font-semibold text-gold-400">85</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">Professionals</p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="rounded-2xl bg-gold-500 p-6 text-center">
                <p className="font-serif text-4xl font-semibold text-navy-950">3</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-navy-900/80">Flagship Offices</p>
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-luxe">
                <SmartImage src={unsplash('1600880292203-757bb62b4baf', 700)} alt="PrimeNest advisors in a client meeting" className="h-full w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-charcoal-50">
        <div className="container-luxe grid gap-8 md:grid-cols-2">
          {[
            {
              icon: Target,
              label: 'Our Mission',
              title: 'To be the most trusted advisor in every client’s real estate life.',
              text: 'We exist to protect and grow our clients’ wealth and wellbeing through property — delivering clear, independent advice and flawless execution at every stage of ownership.',
            },
            {
              icon: Eye,
              label: 'Our Vision',
              title: 'To set the national standard for service in luxury real estate.',
              text: 'We envision a brokerage where technology, research and genuine human care combine — making every transaction feel as considered as the home or asset at its centre.',
            },
          ].map(({ icon: Icon, label, title, text }, i) => (
            <Reveal key={label} delay={i * 150} className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-luxe ring-1 ring-charcoal-100 sm:p-12">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-50 transition-transform duration-700 group-hover:scale-150" />
              <div className="relative">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="eyebrow mt-8">{label}</p>
                <h3 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">{title}</h3>
                <p className="mt-5 leading-relaxed text-charcoal-500">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-luxe">
          <SectionHeading eyebrow="Our Values" title="The principles behind every decision" />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-charcoal-100 ring-1 ring-charcoal-100 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 3) * 100} className="group bg-white p-8 transition-colors duration-500 hover:bg-navy-900 sm:p-10">
                <Icon className="h-8 w-8 text-gold-600 transition group-hover:text-gold-400" />
                <h3 className="mt-6 text-xl font-semibold transition group-hover:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-500 transition group-hover:text-white/70">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section relative overflow-hidden bg-navy-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(198,154,66,0.12),transparent_45%)]" />
        <div className="container-luxe relative">
          <SectionHeading light eyebrow="Achievements" title="Milestones that define our journey" />

          <div className="mt-14 grid grid-cols-2 gap-8 border-y border-white/10 py-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-4xl font-semibold text-gold-400">
                  <StatCounter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <ol className="relative mt-16 space-y-10 before:absolute before:bottom-0 before:left-[7px] before:top-0 before:w-px before:bg-white/15 md:before:left-1/2">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={80} className="relative grid gap-2 pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
                <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-navy-950 bg-gold-500 ring-1 ring-gold-500 md:left-1/2 md:-translate-x-1/2" />
                <div className={i % 2 === 0 ? 'md:text-right' : 'md:order-2'}>
                  <p className="font-serif text-3xl font-semibold text-gold-400">{m.year}</p>
                </div>
                <div className={i % 2 === 0 ? '' : 'md:order-1 md:text-right'}>
                  <h3 className="text-xl font-semibold text-white">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Awards */}
          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((a, i) => (
              <Reveal key={a.title} delay={i * 100} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold-500/50">
                {i % 2 === 0 ? <Trophy className="h-7 w-7 text-gold-500" /> : <Award className="h-7 w-7 text-gold-500" />}
                <p className="mt-4 font-serif text-lg font-semibold leading-snug text-white">{a.title}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-white/50">
                  {a.org} · {a.year}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section scroll-mt-20 bg-white">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Leadership Team"
            title="The people behind PrimeNest"
            subtitle="Seasoned advisors who bring decades of combined experience in luxury residential, commercial and investment real estate."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={(i % 4) * 100} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-900 shadow-luxe">
                  <SmartImage src={member.image} alt={member.name} className="h-full w-full object-cover grayscale-[30%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                    <p className="text-sm leading-relaxed text-white/85">{member.bio}</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy-950 transition hover:bg-gold-400"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-3.5 w-3.5" /> Contact
                    </a>
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm text-gold-600">{member.role}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl bg-charcoal-50 p-8 text-center ring-1 ring-charcoal-100 sm:p-10 md:flex-row md:text-left">
            <div className="flex flex-col items-center gap-5 md:flex-row">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                <Compass className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-2xl font-semibold">Join our team</h3>
                <p className="mt-1 text-sm text-charcoal-500">We’re always looking for exceptional advisors, analysts and property managers.</p>
              </div>
            </div>
            <Button href={`mailto:${company.careersEmail}?subject=Career%20Opportunities%20at%20PrimeNest`} variant="navy">
              <Mail className="h-4 w-4" /> View Careers
            </Button>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Work With Us"
        title="Experience the PrimeNest difference"
        text="Discover why thousands of discerning clients trust us with their most important property decisions."
        primary={{ label: 'Speak to an Advisor', to: '/contact' }}
        secondary={{ label: 'View Properties', to: '/properties' }}
      />
    </>
  );
}
