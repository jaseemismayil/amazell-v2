export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ApplicationItem {
  num: string;
  title: string;
  description: string;
}

export interface WhyItem {
  title: string;
  description: string;
  icon: 'clock' | 'zap' | 'shield' | 'network';
}

export interface TechLayer {
  index: string;
  key: string;
  title: string;
  description: string;
}

export interface ManufacturingStep {
  num: string;
  title: string;
  description: string;
}

export interface Product {
  badge: string;
  name: string;
  capacity: string;
  warranty: string;
  life: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface DealerCity {
  name: string;
  active: boolean;
  top: string;
  left: string;
  marker?: boolean;
}
