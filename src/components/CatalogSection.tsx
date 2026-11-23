import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CollectionItem, CollectionSlug, Product, SortOption } from '../types';
import { getEffectivePrice } from '../utils/formatters';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  collections: CollectionItem[];
  activeCollection: CollectionSlug;
  searchQuery: string;
  onSelectCollection: (slug: CollectionSlug) => void;
  onSearchChange: (q: string) => void;
  onViewProduct: (product: Product, initialColorName?: string) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onBuyNow: (product: Product, color: string, size: string) => void;
  onEditProduct: (product: Product) => void;
  hideFilters?: boolean;
  maxItems?: number;
}

const COLOR_FAMILIES = [
  { id: 'all', label: 'All Colors' },
  { id: 'black', label: 'Black' },
  { id: 'beige', label: 'Beige' },
  { id: 'coffee', label: 'Coffee Brown' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'mocha', label: 'Mocha' },
  { id: 'navy', label: 'Navy Blue' },
  { id: 'olive', label: 'Olive Green' },
  { id: 'dusty-pink', label: 'Dusty Pink' },
  { id: 'grey', label: 'Grey' },
  { id: 'maroon', label: 'Maroon' },
  { id: 'cream', label: 'Cream' },
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  title,
  subtitle,
  products,
  collections,
  activeCollection,
  searchQuery,
  onSelectCollection,
  onSearchChange,
  onViewProduct,
  onAddToCart,
  onBuyNow,
  onEditProduct,
  hideFilters = false,
  maxItems,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [colorFamily, setColorFamily] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let list = products.filter((p) => {
      if (activeCollection === 'special-offers') {
        if (!p.isOnSale) return false;
      } else if (activeCollection === 'new-arrivals') {
        if (!p.isNewArrival) return false;
      } else if (activeCollection !== 'all') {
        if (p.collection !== activeCollection) return false;
      }

      if (query) {
        const hay = `${p.name} ${p.silhouetteStyle} ${p.categoryLabel} ${p.shortDescription} ${p.fabricDetails}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }

      if (colorFamily !== 'all') {
        const colorNames = p.colors.map((c) => c.name.toLowerCase()).join(' ');
        if (colorFamily === 'black' && !/(black|noir|obsidian|onyx)/.test(colorNames)) return false;
        if (colorFamily === 'beige' && !/(beige|sand|champagne|taupe)/.test(colorNames)) return false;
        if (colorFamily === 'coffee' && !/coffee/.test(colorNames)) return false;
        if (colorFamily === 'chocolate' && !/chocolate/.test(colorNames)) return false;
        if (colorFamily === 'mocha' && !/mocha/.test(colorNames)) return false;
        if (colorFamily === 'navy' && !/navy/.test(colorNames)) return false;
        if (colorFamily === 'olive' && !/olive/.test(colorNames)) return false;
        if (colorFamily === 'dusty-pink' && !/(dusty pink|rose)/.test(colorNames)) return false;
        if (colorFamily === 'grey' && !/(grey|gray|charcoal|dove)/.test(colorNames)) return false;
        if (colorFamily === 'maroon' && !/(maroon|burgundy)/.test(colorNames)) return false;
        if (colorFamily === 'cream' && !/(cream|ivory)/.test(colorNames)) return false;
      }

      return true;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
    } else if (sortBy === 'sale-first') {
      list = [...list].sort((a, b) => Number(b.isOnSale) - Number(a.isOnSale));
    }

    if (maxItems && maxItems > 0) {
      return list.slice(0, maxItems);
    }

    return list;
  }, [products, activeCollection, searchQuery, colorFamily, sortBy, maxItems]);

  const resetAllFilters = () => {
    onSelectCollection('all');
    onSearchChange('');
    setColorFamily('all');
    setSortBy('featured');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#9C7631] font-medium">
            HABERA Signature Catalog
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#101010] mt-1">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-[#3A352F] max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="text-xs text-[#3A352F] tabular-nums whitespace-nowrap">
          Showing <span className="font-semibold text-[#101010]">{filteredProducts.length}</span>{' '}
          {filteredProducts.length === 1 ? 'piece' : 'pieces'}
        </div>
      </div>

      {!hideFilters && (
        <div className="mb-8 space-y-4 bg-white p-4 sm:p-5 border border-[#101010]/10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => onSelectCollection('all')}
              className={`px-3.5 py-2 text-xs font-medium tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeCollection === 'all'
                  ? 'bg-[#101010] text-[#FAF7F1]'
                  : 'bg-[#FAF7F1] text-[#3A352F] hover:text-[#101010] hover:bg-[#E8DDCC]/50'
              }`}
            >
              All ({products.length})
            </button>
            {collections.map((col) => {
              const active = activeCollection === col.slug;
              const isSale = col.slug === 'special-offers';
              return (
                <button
                  key={col.slug}
                  type="button"
                  onClick={() => onSelectCollection(col.slug)}
                  className={`px-3.5 py-2 text-xs font-medium tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? isSale
                        ? 'bg-[#C6A15B] text-[#101010] font-semibold'
                        : 'bg-[#101010] text-[#FAF7F1]'
                      : isSale
                        ? 'bg-[#C6A15B]/20 text-[#9C7631] hover:bg-[#C6A15B]/35 font-semibold'
                        : 'bg-[#FAF7F1] text-[#3A352F] hover:text-[#101010] hover:bg-[#E8DDCC]/50'
                  }`}
                >
                  {col.title}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-[#101010]/8">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#3A352F]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search abayas, cuts, fabrics, colors..."
                aria-label="Filter products by keyword"
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-[#FAF7F1] border border-[#101010]/15 text-[#101010] placeholder:text-[#3A352F]/55 focus:outline-none focus:border-[#101010]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#3A352F] hover:text-[#101010] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#3A352F] shrink-0" />
              <select
                value={colorFamily}
                onChange={(e) => setColorFamily(e.target.value)}
                aria-label="Filter by color"
                className="w-full py-2.5 px-3 text-xs sm:text-sm bg-[#FAF7F1] border border-[#101010]/15 text-[#101010] focus:outline-none focus:border-[#101010]"
              >
                {COLOR_FAMILIES.map((cf) => (
                  <option key={cf.id} value={cf.id}>
                    {cf.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="w-full py-2.5 px-3 text-xs sm:text-sm bg-[#FAF7F1] border border-[#101010]/15 text-[#101010] focus:outline-none focus:border-[#101010]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High (PKR)</option>
                <option value="price-desc">Price: High to Low (PKR)</option>
                <option value="sale-first">30% OFF Sale First</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#101010]/10 p-12 text-center">
          <p className="font-display text-2xl font-semibold text-[#101010]">
            No modest pieces matched your filters
          </p>
          <p className="mt-2 text-sm text-[#3A352F]">
            Try clearing your search keyword or switching to all collections.
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="mt-5 px-6 py-2.5 bg-[#101010] text-[#FAF7F1] text-xs font-semibold tracking-widest uppercase hover:bg-[#2B2723] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={onViewProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onEditProduct={onEditProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
};
