import { Product } from '../types';

export function formatPKR(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
}

export function getEffectivePrice(product: Pick<Product, 'originalPrice' | 'isOnSale' | 'discountPercent'>): number {
  if (!product.isOnSale || product.discountPercent <= 0) {
    return product.originalPrice;
  }
  return Math.round(product.originalPrice * (1 - product.discountPercent / 100));
}

export function buildWhatsAppUrl(rawNumber: string, message: string): string {
  const digits = rawNumber.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}
