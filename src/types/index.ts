export interface CollaborationCard {
  id: string;
  title: string;
  subtitle: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  highlight: boolean;
  features: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
}
