export interface Product {
  id: string;
  name: string;
  slug?: string;
  category?: string;
  description?: string;
  shortDescription?: string;
  image: string;
  images?: string[];
  price: number;
  features: string[];
  benefits?: string[];
  commercialText: string;
  badge?: string;
  isPopular?: boolean;
  featured?: boolean;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Client {
  name: string;
  logo?: string;
  testimonial?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
