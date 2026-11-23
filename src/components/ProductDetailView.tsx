import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minus,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { CollectionSlug, Product } from '../types';
import { formatPKR, getEffectivePrice } from '../utils/formatters';
import { ProductCard } from './ProductCard';
import { ResilientImage } from './ResilientImage';

interface ProductDetailViewProps {
  product: Product;
  initialColorName?: string | null;
  relatedProducts: Product[];
  onBackToShop: (collection?: CollectionSlug) => void;
  onViewProduct: (product: Product, colorName?: string) => void;
  onAddToCart: (product: Product, color: string, size: string, qty: number) => void;
  onBuyNow: (product: Product, color: string, size: string, qty: number) => void;
  onEditProduct: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  initialColorName,
  relatedProducts,
  onBackToShop,
  onViewProduct,
  onAddToCart,
  onBuyNow,
  onEditProduct,
}) => {
  const initialIdx = Math.max(
    0,
    product.colors.findIndex((c) => c.name === initialColorName)
  );

  const [selectedColorIdx, setSelectedColorIdx] = useState(initialIdx);
  const [selectedAngleIdx, setSelectedAngleIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);

  // Interactive optical zoom (works on desktop hover/click & mobile tap/pan)
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // Fullscreen Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    const idx = Math.max(
      0,
      product.colors.findIndex((c) => c.name === initialColorName)
    );
    setSelectedColorIdx(idx);
    setSelectedAngleIdx(0);
    setSelectedSize(product.sizes[0] || 'Standard');
    setQuantity(1);
    setZoomActive(false);
    setLightboxOpen(false);
    setLightboxZoom(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product, initialColorName]);

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const gallery = activeColor?.gallery || [];
  const activePhoto = gallery[selectedAngleIdx] || gallery[0] || {
    id: 'front',
    label: 'Full Front View',
    src: activeColor?.image || product.images[0],
  };

  const effectivePrice = getEffectivePrice(product);
  const savings = product.originalPrice - effectivePrice;

  const updatePanCoordinates = (clientX: number, clientY: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomActive) return;
    updatePanCoordinates(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!zoomActive || e.touches.length === 0) return;
    const touch = e.touches[0];
    updatePanCoordinates(touch.clientX, touch.clientY, e.currentTarget.getBoundingClientRect());
  };

  const handleColorSwitch = (idx: number) => {
    setSelectedColorIdx(idx);
    setSelectedAngleIdx(0);
    setZoomActive(false);
  };

  const handleAdd = () => {
    onAddToCart(product, activeColor?.name || 'Default', selectedSize, quantity);
    setAddedNotice(true);
    window.setTimeout(() => setAddedNotice(false), 1800);
  };

  const baseScale = activePhoto.baseScale || 1;
  const computedScale = zoomActive ? Math.max(2.3, baseScale * 1.6) : baseScale;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#101010]/10">
        <div className="flex items-center gap-2 text-xs text-[#3A352F]">
          <button
            type="button"
            onClick={() => onBackToShop('all')}
            className="inline-flex items-center gap-1.5 font-medium text-[#101010] hover:text-[#C6A15B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={() => onBackToShop(product.collection)}
            className="hover:text-[#101010] transition-colors cursor-pointer"
          >
            {product.categoryLabel}
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#101010] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onEditProduct(product)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#101010]/20 hover:border-[#C6A15B] hover:bg-[#E8DDCC]/40 transition-colors cursor-pointer"
        >
          <Pencil className="w-3.5 h-3.5 text-[#9C7631]" />
          <span>Edit Price &amp; Options</span>
        </button>
      </div>

      {/* Main Split PDP Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Multi-Angle Gallery + Magnifying Zoom + Lightbox */}
        <div className="lg:col-span-6 space-y-4">
          <div
            onClick={() => setZoomActive((z) => !z)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseLeave={() => setZoomActive(false)}
            className={`relative aspect-[3/4] w-full overflow-hidden bg-[#E8DDCC]/35 border border-[#101010]/10 select-none ${
              zoomActive ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
          >
            <ResilientImage
              key={`${activePhoto.src}-${activePhoto.id}`}
              src={activePhoto.src}
              alt={`${product.name} in ${activeColor?.name} — ${activePhoto.label}`}
              className="w-full h-full object-cover transition-transform duration-200 ease-out"
              style={{
                objectPosition: activePhoto.objectPosition || '50% 15%',
                transform: `scale(${computedScale})`,
                transformOrigin: zoomActive
                  ? `${zoomOrigin.x}% ${zoomOrigin.y}%`
                  : activePhoto.objectPosition || '50% 35%',
              }}
              fallbackLabel={product.name}
            />

            {product.isOnSale && (
              <span className="absolute top-4 left-4 bg-[#101010] text-[#C6A15B] px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase">
                {product.discountPercent}% OFF SALE
              </span>
            )}

            {/* Current Angle Label */}
            <span className="absolute top-4 right-4 bg-[#FAF7F1]/95 text-[#101010] px-3 py-1 text-[11px] font-medium tracking-wider uppercase border border-[#101010]/10">
              {activePhoto.label}
            </span>

            {/* Zoom & Lightbox Controls */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomActive((z) => !z);
                }}
                aria-label={zoomActive ? 'Reset magnification' : 'Magnify photo'}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF7F1]/95 text-[#101010] text-xs font-medium border border-[#101010]/15 hover:bg-[#C6A15B] transition-colors cursor-pointer"
              >
                {zoomActive ? (
                  <ZoomOut className="w-3.5 h-3.5" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                <span>{zoomActive ? 'Exit Zoom' : 'Magnify'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxZoom(1);
                  setLightboxOpen(true);
                }}
                aria-label="Open large fullscreen viewer"
                className="flex items-center gap-1.5 px-3 py-2 bg-[#101010] text-[#FAF7F1] text-xs font-medium hover:bg-[#C6A15B] hover:text-[#101010] transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Larger View</span>
              </button>
            </div>
          </div>

          {/* 6-Angle Thumbnail Strip */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {gallery.map((angle, idx) => {
              const active = idx === selectedAngleIdx;
              return (
                <button
                  key={`${angle.id}-${idx}`}
                  type="button"
                  onClick={() => {
                    setSelectedAngleIdx(idx);
                    setZoomActive(false);
                  }}
                  className={`group text-left border transition-all cursor-pointer bg-white ${
                    active
                      ? 'border-[#101010] ring-1 ring-[#C6A15B]'
                      : 'border-[#101010]/15 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-[#E8DDCC]/30">
                    <ResilientImage
                      src={angle.src}
                      alt={`${product.name} — ${angle.label}`}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: angle.objectPosition || '50% 15%',
                        transform: angle.baseScale ? `scale(${angle.baseScale})` : undefined,
                        transformOrigin: angle.objectPosition || '50% 35%',
                      }}
                    />
                  </div>
                  <p className="px-1.5 py-1 text-[10px] font-medium text-[#101010] truncate text-center">
                    {angle.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-6 bg-white p-6 sm:p-8 border border-[#101010]/10">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#3A352F]">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{product.silhouetteStyle}</span>
              <span aria-hidden="true">·</span>
              <span
                className={
                  product.availability === 'Out of Stock'
                    ? 'text-red-700 font-semibold'
                    : 'text-[#9C7631] font-semibold'
                }
              >
                {product.availability}
              </span>
            </div>

            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#101010] leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-3 tabular-nums">
              <span className="text-2xl sm:text-3xl font-semibold text-[#101010]">
                {formatPKR(effectivePrice)}
              </span>
              {product.isOnSale && (
                <>
                  <span className="text-base text-[#3A352F]/60 line-through">
                    {formatPKR(product.originalPrice)}
                  </span>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#9C7631]">
                    Save {formatPKR(savings)} ({product.discountPercent}% OFF)
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-sm text-[#3A352F] leading-relaxed border-t border-[#101010]/10 pt-5">
            {product.description}
          </p>

          {/* Color Selector — Changes photography dynamically */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em]">
              <span className="font-semibold text-[#101010]">Color</span>
              <span className="text-[#9C7631] font-semibold">{activeColor?.name}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {product.colors.map((color, idx) => {
                const active = selectedColorIdx === idx;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorSwitch(idx)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs border transition-colors cursor-pointer ${
                      active
                        ? 'border-[#101010] bg-[#FAF7F1] font-semibold text-[#101010]'
                        : 'border-[#101010]/15 text-[#3A352F] hover:border-[#101010]/40'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-[#101010]/20 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em]">
              <span className="font-semibold text-[#101010]">Size</span>
              <span className="text-[#3A352F]">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {product.sizes.map((size) => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs border transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'border-[#101010] bg-[#101010] text-[#FAF7F1] font-semibold'
                        : 'border-[#101010]/20 text-[#101010] hover:border-[#101010]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + Primary CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#101010]">
                Quantity
              </span>
              <div className="inline-flex items-center border border-[#101010]/20">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-[#101010] hover:bg-[#E8DDCC]/40 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-2.5 text-[#101010] hover:bg-[#E8DDCC]/40 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={product.availability === 'Out of Stock'}
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase border border-[#101010] text-[#101010] hover:bg-[#101010] hover:text-[#FAF7F1] disabled:opacity-40 transition-colors cursor-pointer"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-[#C6A15B]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              <button
                type="button"
                disabled={product.availability === 'Out of Stock'}
                onClick={() =>
                  onBuyNow(product, activeColor?.name || 'Default', selectedSize, quantity)
                }
                className="px-6 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase bg-[#C6A15B] text-[#101010] hover:bg-[#D5B26E] disabled:opacity-40 transition-colors cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Fabric & Delivery Details */}
          <div className="border-t border-[#101010]/10 pt-5 space-y-4 text-xs sm:text-sm text-[#3A352F]">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#C6A15B] mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#101010] uppercase text-xs tracking-wider mb-0.5">
                  Fabric &amp; Craftsmanship
                </p>
                <p className="leading-relaxed">{product.fabricDetails}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-[#C6A15B] mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#101010] uppercase text-xs tracking-wider mb-0.5">
                  Pakistan Delivery Information
                </p>
                <p className="leading-relaxed">{product.deliveryInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#101010]/10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#9C7631] font-medium">
                Complete Your Modest Look
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#101010] mt-1">
                Related Pieces
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onBackToShop(product.collection)}
              className="text-xs font-semibold tracking-[0.14em] uppercase text-[#101010] hover:text-[#C6A15B] border-b border-[#101010]/30 pb-1 cursor-pointer"
            >
              View Collection
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onViewProduct={onViewProduct}
                onAddToCart={(p, c, s) => onAddToCart(p, c, s, 1)}
                onBuyNow={(p, c, s) => onBuyNow(p, c, s, 1)}
                onEditProduct={onEditProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen Lightbox Zoom Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#101010]/95 text-[#FAF7F1] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Large Product Image Viewer"
        >
          <div className="px-4 sm:px-6 py-4 border-b border-[#FAF7F1]/15 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-widest text-[#C6A15B] truncate">
                {product.name} · {activeColor?.name}
              </p>
              <p className="text-sm font-medium text-[#FAF7F1] truncate">{activePhoto.label}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setLightboxZoom((z) => (z >= 2.5 ? 1 : Number((z + 0.75).toFixed(2))))}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#FAF7F1]/25 text-xs hover:border-[#C6A15B] cursor-pointer"
              >
                {lightboxZoom > 1 ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                <span>{Math.round(lightboxZoom * 100)}%</span>
              </button>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close large viewer"
                className="p-2 border border-[#FAF7F1]/25 hover:border-[#C6A15B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 overflow-auto flex items-center justify-center p-4">
            <div className="max-h-full max-w-2xl overflow-hidden">
              <ResilientImage
                key={`${activePhoto.src}-${activePhoto.id}-lightbox`}
                src={activePhoto.src}
                alt={`${product.name} — ${activePhoto.label}`}
                className="max-h-[75vh] w-auto object-contain mx-auto transition-transform duration-200"
                style={{
                  transform: `scale(${Number((lightboxZoom * baseScale).toFixed(2))})`,
                  transformOrigin: activePhoto.objectPosition || '50% 35%',
                  objectPosition: activePhoto.objectPosition || '50% 20%',
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedAngleIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
                setLightboxZoom(1);
              }}
              aria-label="Previous angle"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-[#101010]/70 border border-[#FAF7F1]/25 hover:border-[#C6A15B] cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedAngleIdx((prev) => (prev + 1) % gallery.length);
                setLightboxZoom(1);
              }}
              aria-label="Next angle"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-[#101010]/70 border border-[#FAF7F1]/25 hover:border-[#C6A15B] cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 py-3 border-t border-[#FAF7F1]/15 flex items-center justify-center gap-2 overflow-x-auto">
            {gallery.map((angle, idx) => (
              <button
                key={angle.id}
                type="button"
                onClick={() => {
                  setSelectedAngleIdx(idx);
                  setLightboxZoom(1);
                }}
                className={`px-3 py-1.5 text-xs whitespace-nowrap cursor-pointer border ${
                  idx === selectedAngleIdx
                    ? 'bg-[#C6A15B] text-[#101010] border-[#C6A15B] font-semibold'
                    : 'border-[#FAF7F1]/20 text-[#E8DDCC] hover:border-[#FAF7F1]/50'
                }`}
              >
                {angle.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
