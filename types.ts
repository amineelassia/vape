
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  gallery?: string[]; // Array of additional image URLs
  category: 'disposable' | 'e-liquid' | 'mods' | 'pods';
  rating: number;
  puffs?: number; // Optional property for disposables
  flavor?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'HOME' | 'SHOP' | 'PRODUCT_DETAIL' | 'ABOUT' | 'AI_STUDIO';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

// Declare GSAP globals loaded via CDN
declare global {
  const gsap: any;
  const ScrollTrigger: any;
}