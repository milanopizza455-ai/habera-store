import React from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem, StoreSettings } from '../types';
import { formatPKR } from '../utils/formatters';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  settings: StoreSettings;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onCheckout: () => void;
  onBrowseShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  settings,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  onBrowseShop,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitSalePrice * item.quantity, 0);
  const freeShippingRemaining = Math.max(0, settings.freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= settings.freeShippingThreshold || subtotal === 0 ? 0 : settings.shippingFee;
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      <div
        className="fixed inset-0 bg-[#101010]/55 backdrop-blur-xs"
        onClick={onClose}
      />

      <aside className="relative z-10 w-full max-w-md bg-[#FAF7F1] text-[#101010] h-full flex flex-col shadow-2xl border-l border-[#101010]/15">
        {/* Top Bar */}
        <div className="px-6 py-5 border-b border-[#101010]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C6A15B]" />
            <h2 className="font-display text-2xl font-semibold">Shopping Bag</h2>
            <span className="text-xs text-[#3A352F] tabular-nums">
              ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="p-1.5 text-[#3A352F] hover:text-[#101010] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Notice */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-[#E8DDCC]/55 border-b border-[#101010]/10 text-xs text-[#101010]">
            {freeShippingRemaining === 0 ? (
              <p className="font-medium text-center">
                You have unlocked <span className="font-semibold text-[#9C7631]">Free Delivery</span> across Pakistan.
              </p>
            ) : (
              <p className="text-center tabular-nums">
                Add <span className="font-semibold">{formatPKR(freeShippingRemaining)}</span> more for free nationwide delivery.
              </p>
            )}
          </div>
        )}

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-10 h-10 text-[#C6A15B] mb-3" />
              <p className="font-display text-2xl font-semibold text-[#101010]">
                Your bag is empty
              </p>
              <p className="mt-2 text-xs text-[#3A352F] max-w-xs leading-relaxed">
                Explore HABERA&apos;s modest abayas, stoles, hijabs, and Saudi niqabs crafted for effortless elegance.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseShop();
                }}
                className="mt-6 px-6 py-3 bg-[#101010] text-[#FAF7F1] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#2A2622] transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.key}
                className="flex gap-4 bg-white p-3.5 border border-[#101010]/10"
              >
                <div className="w-20 aspect-[3/4] shrink-0 overflow-hidden bg-[#E8DDCC]/40">
                  <ResilientImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-base font-semibold text-[#101010] leading-snug line-clamp-1">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#3A352F]/60 hover:text-red-700 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#3A352F] mt-0.5">
                      {item.selectedColor} · {item.selectedSize}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-3">
                    <div className="inline-flex items-center border border-[#101010]/15">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.key, -1)}
                        aria-label="Decrease quantity"
                        className="p-1.5 hover:bg-[#E8DDCC]/40 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.key, 1)}
                        aria-label="Increase quantity"
                        className="p-1.5 hover:bg-[#E8DDCC]/40 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right tabular-nums">
                      <span className="text-sm font-semibold text-[#101010]">
                        {formatPKR(item.unitSalePrice * item.quantity)}
                      </span>
                      {item.isOnSale && (
                        <span className="block text-[11px] text-[#3A352F]/55 line-through">
                          {formatPKR(item.unitOriginalPrice * item.quantity)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#101010]/10 space-y-4">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-[#3A352F]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#101010]">
                  {formatPKR(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#3A352F]">
                <span>Pakistan Shipping</span>
                <span className="tabular-nums font-medium text-[#101010]">
                  {shippingFee === 0 ? 'Free' : formatPKR(shippingFee)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#101010]/10 text-base font-semibold text-[#101010]">
                <span>Estimated Total</span>
                <span className="tabular-nums">{formatPKR(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="w-full py-3.5 bg-[#101010] text-[#FAF7F1] hover:bg-[#C6A15B] hover:text-[#101010] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
