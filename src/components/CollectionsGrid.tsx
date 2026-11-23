import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CollectionItem, CollectionSlug } from '../types';
import { ResilientImage } from './ResilientImage';

interface CollectionsGridProps {
  collections: CollectionItem[];
  onSelectCollection: (slug: CollectionSlug) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  collections,
  onSelectCollection,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs tracking-[0.22em] uppercase text-[#9C7631] font-medium">
            Curated Modest Wardrobe
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#101010] mt-1.5 text-balance">
            Shop by Collection
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onSelectCollection('special-offers')}
          className="self-start sm:self-auto px-6 py-3 bg-[#C6A15B] text-[#101010] hover:bg-[#D5B26E] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap"
        >
          Special Offers · 30% OFF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {collections.map((col) => {
          const isOffer = col.slug === 'special-offers';
          return (
            <article
              key={col.slug}
              onClick={() => onSelectCollection(col.slug)}
              className="group relative flex flex-col bg-white border border-[#101010]/10 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,16,16,0.08)]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E8DDCC]/40">
                <ResilientImage
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  fallbackLabel={col.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/85 via-[#101010]/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4 text-[#FAF7F1]">
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#E8DDCC] mb-1 tabular-nums">
                    {col.priceRangeHint}
                  </p>
                  <h3 className="font-display text-xl font-semibold leading-tight text-[#FAF7F1]">
                    {col.title}
                  </h3>
                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 transition-colors ${
                        isOffer
                          ? 'bg-[#C6A15B] text-[#101010]'
                          : 'bg-[#FAF7F1] text-[#101010] group-hover:bg-[#C6A15B]'
                      }`}
                    >
                      <span>Shop Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
