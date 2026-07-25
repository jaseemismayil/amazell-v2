import type {
  StatItem,
  ApplicationItem,
  WhyItem,
  TechLayer,
  ManufacturingStep,
  Product,
  Testimonial,
  DealerCity,
  FactoryImage,
} from '@/types';

export const stats: StatItem[] = [
  { value: 12, suffix: 'Yrs', label: 'Average Service Life' },
  { value: 1800, suffix: '+', label: 'Charging Cycles' },
  { value: 72, suffix: 'Mo', label: 'Warranty Coverage' },
  { value: 4500, suffix: '+', label: 'Dealer Network' },
];

export const applications: ApplicationItem[] = [
  { num: '01', title: 'Home', description: 'Silent backup that keeps daily life running through every outage.' },
  { num: '02', title: 'Inverter', description: 'Deep-cycle reserves built for fast recovery and long standby life.' },
  { num: '03', title: 'Commercial', description: 'Reliable uptime for offices, retail and hospitality environments.' },
  { num: '04', title: 'Industrial', description: 'Heavy-duty cycling for continuous, mission-critical operations.' },
  { num: '05', title: 'Solar', description: 'Engineered for deep discharge and years of off-grid dependability.' },
  { num: '06', title: 'Agriculture', description: 'Rugged cells built to withstand dust, heat and remote terrain.' },
];

export const whyItems: WhyItem[] = [
  {
    title: 'Long Service Life',
    description: 'Tubular architecture and premium alloys are built to outperform their rated life, cycle after cycle, year after year.',
    icon: 'clock',
  },
  {
    title: 'Fast, Efficient Charging',
    description: 'Optimised plate density recovers full backup capacity in a fraction of the time competing cells require.',
    icon: 'zap',
  },
  {
    title: 'Engineered Durability',
    description: 'Every cell is stress-tested against heat, vibration and voltage extremes native to Indian grid conditions.',
    icon: 'shield',
  },
  {
    title: 'Nationwide Support',
    description: 'A dealer and service network spanning thousands of towns, backed by a warranty you can actually rely on.',
    icon: 'network',
  },
];

export const techLayers: TechLayer[] = [
  { index: '01', key: 'Container', title: 'A shell built for extremes.', description: 'High-impact polypropylene resists heat, vibration and years of daily cycling without warping or cracking — even in peak Indian summers.' },
  { index: '02', key: 'Separator', title: 'Precision insulation.', description: 'A microporous separator keeps positive and negative plates perfectly isolated, cutting internal short-circuits and self-discharge to near zero.' },
  { index: '03', key: 'Tubular Sleeve', title: "The signature architecture.", description: "Woven gauntlet sleeves hold active material firmly in place cycle after cycle — the core of tubular technology's legendary durability." },
  { index: '04', key: 'Premium Lead Alloy', title: 'Density that delivers.', description: 'A refined low-antimony alloy maximises active material density for deeper backup and faster recovery on every recharge.' },
  { index: '05', key: 'Positive Core', title: 'Built to outlast.', description: 'The heart of every AMAZELL cell — engineered for high durability, fast charging and a service life that keeps outperforming the spec sheet.' },
];

export const manufacturingSteps: ManufacturingStep[] = [
  { num: '01', title: 'Alloy Refinement', description: 'Low-antimony lead alloy is smelted and purified to exact density tolerances.' },
  { num: '02', title: 'Plate Casting', description: 'High-precision casting forms consistent, defect-free grid structures.' },
  { num: '03', title: 'Tubular Assembly', description: 'Automated gauntlet insertion locks active material into every tube.' },
  { num: '04', title: 'Formation & Charging', description: 'Controlled charge cycles activate the plates to full rated capacity.' },
  { num: '05', title: 'Quality Testing', description: 'Every batch is load-tested, cycled and inspected before it ships.' },
];

export const products: Product[] = [
  {
    badge: 'Home Series',
    name: 'AMAZELL AZ-150',
    capacity: '150 Ah',
    warranty: '60 Mo',
    life: '10 Yrs',
    image: '/images/factory/factory-line-inva-red.webp',
    imageAlt: 'AMAZELL tubular battery on the production line, red terminal caps',
  },
  {
    badge: 'Inverter Series',
    name: 'AMAZELL AZ-200 TT',
    capacity: '200 Ah',
    warranty: '66 Mo',
    life: '11 Yrs',
    image: '/images/factory/factory-quality-control.webp',
    imageAlt: 'AMAZELL battery passing final quality control checks',
  },
  {
    badge: 'Solar Series',
    name: 'AMAZELL SOLARIS 165',
    capacity: '165 Ah',
    warranty: '60 Mo',
    life: '12 Yrs',
    image: '/images/factory/factory-line-solar-green.webp',
    imageAlt: 'AMAZELL Solar series battery with green terminal caps',
  },
  {
    badge: 'Industrial Series',
    name: 'AMAZELL FORTIS 300',
    capacity: '300 Ah',
    warranty: '72 Mo',
    life: '14 Yrs',
    image: '/images/factory/factory-line-industrial-yellow.webp',
    imageAlt: 'AMAZELL heavy-duty industrial battery with yellow terminal caps',
  },
  {
    badge: 'Agri Series',
    name: 'AMAZELL TERRA 180',
    capacity: '180 Ah',
    warranty: '60 Mo',
    life: '11 Yrs',
    image: '/images/factory/factory-formation-testing.webp',
    imageAlt: 'AMAZELL battery on the formation and testing line',
  },
];

export const factoryGallery: FactoryImage[] = [
  {
    src: '/images/factory/factory-quality-control.webp',
    alt: 'Quality control station on the AMAZELL production floor',
    caption: 'Every unit — voltage, capacity, load and terminal checked.',
  },
  {
    src: '/images/factory/factory-formation-testing.webp',
    alt: 'Battery formation and testing line at the AMAZELL factory',
    caption: 'Formation & testing, batch by batch.',
  },
  {
    src: '/images/factory/factory-floor-solar.webp',
    alt: 'Wide view of the AMAZELL manufacturing floor',
    caption: 'A production line built for consistency at scale.',
  },
];

export const testimonials: Testimonial[] = [
  { quote: 'We switched our entire inverter range to AMAZELL two years ago — return complaints dropped almost to zero.', name: 'Rajesh Kumar', role: 'Authorised Dealer, Lucknow' },
  { quote: 'Backup that genuinely lasts through the outage. Charging is noticeably faster than our previous battery.', name: 'Anita Desai', role: 'Homeowner, Pune' },
  { quote: 'Running AMAZELL cells across three solar sites now. Deep-discharge performance has been outstanding.', name: 'Suresh Patil', role: 'Solar Integrator, Nashik' },
];

export const dealerCities: DealerCity[] = [
  { name: 'Delhi NCR', active: true, top: '16%', left: '44%', marker: true },
  { name: 'Mumbai', active: true, top: '46%', left: '29%', marker: true },
  { name: 'Bengaluru', active: true, top: '70%', left: '47%', marker: true },
  { name: 'Chennai', active: true, top: '78%', left: '53%', marker: true },
  { name: 'Kolkata', active: false, top: '0', left: '0' },
  { name: 'Hyderabad', active: false, top: '0', left: '0' },
  { name: 'Pune', active: false, top: '0', left: '0' },
  { name: 'Ahmedabad', active: false, top: '0', left: '0' },
];

export const navLinks = [
  { label: 'Technology', href: '#tech' },
  { label: 'Products', href: '#products' },
  { label: 'Applications', href: '#applications' },
  { label: 'Dealers', href: '#dealers' },
  { label: 'About', href: '#why' },
];
