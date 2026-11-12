import { Building2, KeyRound, ClipboardCheck, Briefcase, TrendingUp } from 'lucide-react';
import { unsplash } from '../utils/helpers';

export const services = [
  {
    id: 'sales',
    icon: Building2,
    title: 'Property Sales',
    short: 'Discreet representation for buyers and sellers of exceptional homes and commercial assets.',
    description:
      'Whether you are acquiring a primary residence, a pied-à-terre or a trophy commercial asset, our sales advisors combine deep neighbourhood knowledge with an extensive private network — including off-market listings that never reach public portals.',
    image: unsplash('1560518883-ce09059eeffa', 1200),
    features: [
      'Access to off-market and pre-market listings',
      'Professional valuation and pricing strategy',
      'Editorial photography, film and global marketing',
      'Expert negotiation and closing coordination',
    ],
    stat: { value: '$4.2B', label: 'in closed transactions' },
  },
  {
    id: 'rentals',
    icon: KeyRound,
    title: 'Rentals & Leasing',
    short: 'Curated luxury rentals and corporate leasing with white-glove tenant placement.',
    description:
      'From furnished executive apartments to seasonal villas and flagship office floors, we match discerning tenants with exceptional spaces — and protect landlords with rigorous screening and airtight lease structures.',
    image: unsplash('1522708323590-d24dbb6b0267', 1200),
    features: [
      'Short and long-term luxury residential leasing',
      'Corporate relocation and executive housing',
      'Comprehensive tenant screening and verification',
      'Commercial lease negotiation and renewals',
    ],
    stat: { value: '21 days', label: 'average time to lease' },
  },
  {
    id: 'management',
    icon: ClipboardCheck,
    title: 'Property Management',
    short: 'Full-service management that protects your asset and maximises net operating income.',
    description:
      'Our management division looks after more than 1,200 residential and commercial units. We handle everything from tenant relations and maintenance to financial reporting, so ownership feels effortless.',
    image: unsplash('1600880292203-757bb62b4baf', 1200),
    features: [
      'Rent collection and transparent monthly reporting',
      '24/7 maintenance and vetted contractor network',
      'Lease administration and compliance management',
      'Owner portal with real-time performance data',
    ],
    stat: { value: '1,200+', label: 'units under management' },
  },
  {
    id: 'consulting',
    icon: Briefcase,
    title: 'Real Estate Consulting',
    short: 'Strategic guidance on development, repositioning and portfolio decisions.',
    description:
      'Developers, family offices and corporations rely on our consulting team for market feasibility studies, highest-and-best-use analyses and repositioning strategies grounded in proprietary transaction data.',
    image: unsplash('1551836022-d5d88e9218df', 1200),
    features: [
      'Market and feasibility studies',
      'Development and repositioning strategy',
      'Pricing and absorption analysis for new projects',
      'Corporate occupancy and site selection',
    ],
    stat: { value: '140+', label: 'advisory mandates completed' },
  },
  {
    id: 'investment',
    icon: TrendingUp,
    title: 'Investment Advisory',
    short: 'Data-driven acquisition and disposition strategies for private and institutional investors.',
    description:
      'Our investment advisors build resilient real estate portfolios — sourcing income-producing assets, underwriting returns and timing exits to market cycles, with full transparency at every step.',
    image: unsplash('1554224155-6726b3ff858f', 1200),
    features: [
      'Acquisition sourcing and underwriting',
      'Portfolio diversification and risk analysis',
      '1031 exchange and tax-efficient structuring',
      'Exit strategy and disposition planning',
    ],
    stat: { value: '11.8%', label: 'avg. annual client portfolio return' },
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Private Consultation',
    text: 'We begin with an in-depth conversation to understand your goals, timeline, lifestyle and investment criteria.',
  },
  {
    step: '02',
    title: 'Tailored Strategy',
    text: 'Your advisor prepares a bespoke plan backed by market data, comparable sales and our off-market network.',
  },
  {
    step: '03',
    title: 'Curated Execution',
    text: 'We manage viewings, due diligence, negotiation and every detail of the transaction on your behalf.',
  },
  {
    step: '04',
    title: 'Lasting Partnership',
    text: 'After closing we remain your trusted advisor — from management and leasing to future portfolio moves.',
  },
];

export const faqs = [
  {
    q: 'Do you charge a fee for an initial consultation?',
    a: 'No. Your first consultation with a PrimeNest advisor is complimentary and carries no obligation. We use it to understand your goals and outline how we can help.',
  },
  {
    q: 'Can you help me access properties that are not publicly listed?',
    a: 'Yes. A significant share of our transactions are completed off-market. Once we understand your criteria, we introduce qualified clients to private opportunities within our network.',
  },
  {
    q: 'What are your property management fees?',
    a: 'Management fees typically range from 4% to 8% of collected rent depending on portfolio size, property type and scope of service. We provide a transparent proposal after a property assessment.',
  },
  {
    q: 'Do you work with international buyers and investors?',
    a: 'Absolutely. Around a third of our clients are based overseas. We coordinate remote viewings, legal and tax specialists, financing and currency considerations from start to finish.',
  },
  {
    q: 'Which markets does PrimeNest cover?',
    a: 'We have offices in New York, Miami and Los Angeles, with active advisory coverage in Chicago, Washington DC, Austin and the Aspen and Hamptons resort markets.',
  },
];
