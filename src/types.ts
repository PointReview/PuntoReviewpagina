export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  features: string[];
  commercialText: string;
  isPopular?: boolean;
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
