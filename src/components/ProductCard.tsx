import React, { useState } from 'react';
import { Pencil, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, getEffectivePrice } from '../utils/formatters';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product, initialColorName?: string) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onBuyNow: (product: Product, color: string, size: string) => void;
  onEditProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onAddToCart,
  onBuyNow,
  onEditProduct,
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const displayImage = activeColor?.image || product.images[0];
  const selectedColorName = activeColor?.name || 'Default';
  const effectivePrice = getEffectivePrice(product);
  const defaultSize = product.sizes[0] || 'Standard';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColorName, defaultSize);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1200);
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuyNow(product, selectedColorName, defaultSize);
  };

  return (
    <article className="group flex flex-col bg-white border border-[#101010]/8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(16,16,16,0.07)]">
      {/* 3:4 Image Frame — Dynamically switches image to match selected color */}
      <div
        onClick={() => onViewProduct(product, selectedColorName)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#E8DDCC]/40 cursor-pointer"
      >
        <ResilientImage
          key={displayImage}
          src={displayImage}
          alt={`${product.name} in ${selectedColorName}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          fallbackLabel={product.name}
        />

        {product.isOnSale ? (
          <span className="absolute top-3 left-3 bg-[#101010] text-[#C6A15B] px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase">
            {product.discountPercent}% OFF
          </span>
        ) : product.isNewArrival ? (
          <span className="absolute top-3 left-3 bg-[#FAF7F1]/95 text-[#101010] px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] uppercase">
            New Arrival
          </span>
        ) : null}

        {onEditProduct && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditProduct(product);
            }}
            aria-label={`Edit ${product.name} price and details`}
            title="Edit price or details"
            className="absolute top-3 right-3 p-2 bg-[#FAF7F1]/90 text-[#101010] hover:bg-[#C6A15B] transition-colors cursor-pointer opacity-80 group-hover:opacity-100"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] tracking-[0.12em] uppercase text-[#3A352F]/75 mb-1">
            <span className="truncate">{product.silhouetteStyle}</span>
            <span className="shrink-0">{selectedColorName}</span>
          </div>

          <h3
            onClick={() => onViewProduct(product, selectedColorName)}
            className="font-display text-lg sm:text-xl font-semibold text-[#101010] leading-snug cursor-pointer hover:text-[#9C7631] transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-[#3A352F]/85 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Swatches + Pricing + Actions */}
        <div className="pt-2 border-t border-[#101010]/8 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 tabular-nums">
              <span className="text-sm sm:text-base font-semibold text-[#101010]">
                {formatPKR(effectivePrice)}
              </span>
              {product.isOnSale && (
                <span className="text-xs text-[#3A352F]/60 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color Selection Dots — Clicking switches image to actual color */}
            <div className="flex items-center gap-1.5" aria-label="Color options">
              {product.colors.map((color, idx) => {
                const isSelected = selectedColorIdx === idx;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColorIdx(idx);
                    }}
                    title={`View ${color.name}`}
                    aria-label={`Select color ${color.name}`}
                    className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                      isSelected
                        ? 'ring-1 ring-offset-2 ring-[#101010] scale-110 border-[#101010]/30'
                        : 'border-[#101010]/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={product.availability === 'Out of Stock'}
              onClick={handleQuickAdd}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium tracking-wider uppercase border border-[#101010] text-[#101010] hover:bg-[#101010] hover:text-[#FAF7F1] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>{addedFeedback ? 'Added' : 'Add to Cart'}</span>
            </button>
            <button
              type="button"
              disabled={product.availability === 'Out of Stock'}
              onClick={handleQuickBuy}
              className="px-3 py-2 text-xs font-semibold tracking-wider uppercase bg-[#C6A15B] text-[#101010] hover:bg-[#D4B36E] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
