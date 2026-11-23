export type CollectionSlug =
  | 'all'
  | 'everyday-abayas'
  | 'luxury-abayas'
  | 'open-abayas'
  | 'premium-stoles'
  | 'everyday-hijabs'
  | 'regular-niqabs'
  | 'saudi-niqabs'
  | 'premium-khimars'
  | 'new-arrivals'
  | 'special-offers';

export type PageView =
  | 'home'
  | 'shop'
  | 'product'
  | 'about'
  | 'contact'
  | 'faq'
  | 'shipping'
  | 'returns'
  | 'privacy'
  | 'terms';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'sale-first';

export type PaymentMethod = 'cod' | 'jazzcash' | 'bank-transfer';

export interface ProductAnglePhoto {
  id: string;
  label: string;
  src: string;
  objectPosition?: string;
  baseScale?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
  gallery: ProductAnglePhoto[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  silhouetteStyle: string;
  collection: Exclude<CollectionSlug, 'all' | 'new-arrivals' | 'special-offers'>;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  fabricDetails: string;
  deliveryInfo: string;
  originalPrice: number;
  isOnSale: boolean;
  discountPercent: number;
  isNewArrival: boolean;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  colors: ProductColor[];
  sizes: string[];
  images: string[];
}

export interface CollectionItem {
  slug: Exclude<CollectionSlug, 'all'>;
  title: string;
  subtitle: string;
  image: string;
  priceRangeHint: string;
}

export interface HeroBanner {
  id: string;
  headline: string;
  subtitle: string;
  ctaLabel: string;
  targetCollection: CollectionSlug;
  image: string;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  city: string;
  rating: number;
  comment: string;
  productPurchased: string;
  isDemoSample: boolean;
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  image: string;
  unitOriginalPrice: number;
  unitSalePrice: number;
  isOnSale: boolean;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Confirmed' | 'Preparing Shipment';
}

export interface StoreSettings {
  brandName: string;
  tagline: string;
  announcementText: string;
  whatsappNumber: string;
  whatsappWelcomeMessage: string;
  supportEmail: string;
  shippingFee: number;
  freeShippingThreshold: number;
}
