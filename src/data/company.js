import { unsplash } from '../utils/helpers';

export const company = {
  name: 'PrimeNest Properties',
  phone: '+1 (212) 555-0186',
  phoneHref: 'tel:+12125550186',
  email: 'concierge@primenestproperties.com',
  careersEmail: 'careers@primenestproperties.com',
  address: '88 Meridian Avenue, Suite 2400',
  cityLine: 'New York, NY 10017',
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 5:00 PM' },
    { day: 'Sunday', time: 'Private viewings by appointment' },
  ],
  socials: [
    { name: 'Instagram', href: 'https://www.instagram.com' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com' },
    { name: 'Facebook', href: 'https://www.facebook.com' },
    { name: 'YouTube', href: 'https://www.youtube.com' },
  ],
};

export const offices = [
  {
    id: 'new-york',
    city: 'New York',
    label: 'Headquarters',
    address: '88 Meridian Avenue, Suite 2400, New York, NY 10017',
    phone: '+1 (212) 555-0186',
    phoneHref: 'tel:+12125550186',
    lat: 40.7549,
    lon: -73.984,
  },
  {
    id: 'miami',
    city: 'Miami',
    label: 'Southeast Office',
    address: '1450 Brickell Avenue, Floor 19, Miami, FL 33131',
    phone: '+1 (305) 555-0142',
    phoneHref: 'tel:+13055550142',
    lat: 25.7597,
    lon: -80.1925,
  },
  {
    id: 'los-angeles',
    city: 'Los Angeles',
    label: 'West Coast Office',
    address: '9600 Wilshire Boulevard, Suite 800, Beverly Hills, CA 90212',
    phone: '+1 (310) 555-0193',
    phoneHref: 'tel:+13105550193',
    lat: 34.0672,
    lon: -118.4005,
  },
];

export const stats = [
  { value: 4.2, decimals: 1, prefix: '$', suffix: 'B', label: 'In Property Sales' },
  { value: 2800, suffix: '+', label: 'Properties Sold & Leased' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 18, label: 'Years of Excellence' },
];

export const testimonials = [
  {
    name: 'Jonathan & Claire Ashford',
    role: 'Purchased in Malibu',
    avatar: unsplash('1500648767791-00dcc994a43e', 200),
    rating: 5,
    quote:
      'PrimeNest found us a home that was never even listed. Sophia understood exactly what we wanted after a single conversation, and the entire purchase felt effortless from first viewing to closing.',
  },
  {
    name: 'Amara Okonkwo',
    role: 'Investor, Chicago Portfolio',
    avatar: unsplash('1534528741775-53994a69daeb', 200),
    rating: 5,
    quote:
      'James and the investment advisory team restructured my portfolio with remarkable clarity. Their underwriting is rigorous and their reporting is the most transparent I have seen in the industry.',
  },
  {
    name: 'Richard Castellano',
    role: 'CEO, Castellano Capital',
    avatar: unsplash('1506794778202-cad84cf45f1d', 200),
    rating: 5,
    quote:
      'We relocated our New York headquarters with PrimeNest. Marcus negotiated terms well beyond our expectations and his team coordinated every detail of the move-in.',
  },
  {
    name: 'Elena Varga',
    role: 'Landlord, Miami Beach',
    avatar: unsplash('1544005313-94ddf0286df2', 200),
    rating: 5,
    quote:
      'Handing my properties to PrimeNest management was the best decision I made this decade. Occupancy is up, maintenance is handled before I even hear about it, and the owner portal is superb.',
  },
  {
    name: 'David Lindqvist',
    role: 'Sold in Manhattan',
    avatar: unsplash('1527980965255-d3b416303d12', 200),
    rating: 5,
    quote:
      'Their marketing for our penthouse was extraordinary — the film alone brought in international buyers. We sold 6% above asking within five weeks.',
  },
];

export const team = [
  {
    name: 'Alexandra Whitmore',
    role: 'Founder & Chief Executive Officer',
    image: unsplash('1573496359142-b8d87734a5a2', 600),
    bio: '25 years in luxury real estate; previously led private client teams in London and New York.',
    email: 'a.whitmore@primenestproperties.com',
  },
  {
    name: 'Marcus Delacroix',
    role: 'Managing Director, Commercial',
    image: unsplash('1560250097-0b93528c311a', 600),
    bio: 'Advised on over $1.5B of office and retail transactions across Manhattan and Chicago.',
    email: 'm.delacroix@primenestproperties.com',
  },
  {
    name: 'Sophia Chen',
    role: 'Head of Luxury Residential',
    image: unsplash('1580489944761-15a19d654956', 600),
    bio: 'Ranked among the top 100 residential agents nationally for six consecutive years.',
    email: 's.chen@primenestproperties.com',
  },
  {
    name: 'James Okafor',
    role: 'Director, Investment Advisory',
    image: unsplash('1472099645785-5658abf4ff4e', 600),
    bio: 'Former private equity real estate associate and CFA charterholder specialising in income assets.',
    email: 'j.okafor@primenestproperties.com',
  },
  {
    name: 'Isabella Moreno',
    role: 'Senior Partner, Miami',
    image: unsplash('1494790108377-be9c29b29330', 600),
    bio: 'Leads our Southeast office with expertise in waterfront estates and international buyers.',
    email: 'i.moreno@primenestproperties.com',
  },
  {
    name: 'Daniel Hartley',
    role: 'Head of Property Management',
    image: unsplash('1507003211169-0a1dd7228f2d', 600),
    bio: 'Oversees a 1,200-unit portfolio with a 97% tenant retention rate.',
    email: 'd.hartley@primenestproperties.com',
  },
  {
    name: 'Priya Raman',
    role: 'Director, Rentals & Leasing',
    image: unsplash('1438761681033-6461ffad8d80', 600),
    bio: 'Specialist in corporate relocation and executive housing for Fortune 500 clients.',
    email: 'p.raman@primenestproperties.com',
  },
  {
    name: 'Ethan Brooks',
    role: 'Head of Research & Consulting',
    image: unsplash('1519085360753-af0119f7cbe7', 600),
    bio: 'Authors PrimeNest’s quarterly luxury market report, cited by leading financial media.',
    email: 'e.brooks@primenestproperties.com',
  },
];

export const milestones = [
  { year: '2008', title: 'Founded in Manhattan', text: 'Alexandra Whitmore opens a four-person boutique brokerage on Park Avenue.' },
  { year: '2012', title: 'Commercial Division', text: 'PrimeNest launches commercial leasing and closes its first $100M office transaction.' },
  { year: '2016', title: 'Miami Expansion', text: 'Our Brickell office opens, bringing waterfront expertise and international buyer services.' },
  { year: '2019', title: 'Investment Advisory', text: 'A dedicated advisory practice is formed for family offices and private investors.' },
  { year: '2022', title: 'West Coast Presence', text: 'The Beverly Hills office opens, completing our coast-to-coast footprint.' },
  { year: '2026', title: '$4.2B Milestone', text: 'Cumulative transaction volume surpasses $4.2 billion across 2,800+ properties.' },
];

export const awards = [
  { title: 'Luxury Brokerage of the Year', org: 'National Real Estate Awards', year: '2025' },
  { title: 'Top 10 Boutique Firms in America', org: 'Property Leaders Review', year: '2024' },
  { title: 'Excellence in Client Service', org: 'Luxury Living Guild', year: '2024' },
  { title: 'Best Commercial Advisory — Northeast', org: 'Commercial Property Forum', year: '2023' },
];
