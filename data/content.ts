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
    badge: 'Amazell Tubular',
    name: 'AMAZELL AZ6012',
    model: 'AZ6012',
    capacity: '160 Ah',
    rating: 'C10',
    warranty: '60 Mo',
    image: '/products/amazell-standard-isometric.webp',
    imageAlt: 'AMAZELL AZ6012 tubular battery, black case with yellow terminal caps',
  },
  {
    badge: 'Solar Series',
    name: 'AMAZELL SOLAR AZ6012',
    model: 'AZ6012',
    capacity: '160 Ah',
    rating: 'C10',
    warranty: '60 Mo',
    image: '/products/amazell-solar-isometric.webp',
    imageAlt: 'AMAZELL Solar AZ6012 tubular battery, white case with green terminal caps',
  },
  {
    badge: 'Inva Special',
    name: 'AMAZELL INVA SPECIAL AZ6060',
    model: 'AZ6060',
    capacity: '210 Ah',
    rating: 'C20',
    warranty: '60 Mo',
    image: '/products/amazell-inva-special-isometric.webp',
    imageAlt: 'AMAZELL Inva Special AZ6060 tubular battery, white case with red terminal caps',
  },
];

export const factoryGallery: FactoryImage[] = [
  {
    src: '/images/factory/factory-inva-line-monitoring.webp',
    alt: 'Line operators monitoring the Inva Special production run at the AMAZELL factory',
    caption: 'Inva Special line — monitored cell by cell as it runs.',
  },
  {
    src: '/images/factory/factory-inva-quality-control.webp',
    alt: 'Quality control checklist and stacked Inva Special batteries at the AMAZELL factory',
    caption: 'Voltage, capacity, load, terminal — four checks, every unit.',
  },
  {
    src: '/images/factory/factory-solar-assembly.webp',
    alt: 'Worker assembling AMAZELL Solar series batteries on the production line',
    caption: 'Solar series assembly, tube by tube.',
  },
  {
    src: '/images/factory/factory-solar-floor.webp',
    alt: 'Wide view of the AMAZELL Solar series production floor',
    caption: 'The solar line, built for scale.',
  },
  {
    src: '/images/factory/factory-formation-testing-01.webp',
    alt: 'Battery formation and testing area at the AMAZELL factory',
    caption: 'Formation & testing — where the charge gets locked in.',
  },
  {
    src: '/images/factory/factory-formation-testing-02.webp',
    alt: 'Close-up of battery formation and testing at the AMAZELL factory',
    caption: 'Every batch, checked before it ships.',
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
