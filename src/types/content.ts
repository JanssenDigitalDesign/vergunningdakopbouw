export type ServiceItem = {
  title: string;
  description: string;
  image?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type PackageTier = {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type Testimonial = {
  name: string;
  project_type: string;
  quote: string;
  rating: number;
};

export type LandingPageContent = {
  id: string;
  domain: string;
  brand_name: string;
  h1: string;
  meta_title: string;
  meta_description: string;
  phone: string;
  service_area: string;
  delivery_time: string;
  cta_text: string;
  usps: string[];
  services: ServiceItem[];
  process_steps: ProcessStep[];
  packages: PackageTier[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  footer_legal_line: string;
};

export type ContactSubmission = {
  domain: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};
