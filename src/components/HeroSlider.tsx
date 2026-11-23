import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CollectionSlug, HeroBanner } from '../types';
import { ResilientImage } from './ResilientImage';

interface HeroSliderProps {
  banners: HeroBanner[];
  onSelectCollection: (slug: CollectionSlug) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ banners, onSelectCollection }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || banners.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, banners.length]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section
      aria-label="Featured Collections Slider"
      className="relative w-full overflow-hidden bg-[#101010]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left-to-right sliding track */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className="relative w-full shrink-0 h-[440px] sm:h-[520px] lg:h-[600px]"
          >
            <ResilientImage
              src={banner.image}
              alt={`${banner.headline} — ${banner.subtitle}`}
              className="w-full h-full object-cover object-top"
              fallbackLabel={banner.headline}
            />
            {/* Contrast scrim ensuring WCAG AA readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#101010]/80 via-[#101010]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/50 via-transparent to-transparent" />

            <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-center">
              <div className="max-w-xl">
                <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-[#E8DDCC] mb-3">
                  HABERA Pakistan · Collection 0{idx + 1}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[#FAF7F1] leading-[1.08] tracking-tight text-balance">
                  {banner.headline}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-[#E8DDCC] font-normal max-w-md leading-relaxed">
                  {banner.subtitle}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectCollection(banner.targetCollection)}
                    className={`px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap ${
                      banner.targetCollection === 'special-offers'
                        ? 'bg-[#C6A15B] text-[#101010] hover:bg-[#D5B26E]'
                        : 'bg-[#FAF7F1] text-[#101010] hover:bg-[#E8DDCC]'
                    }`}
                  >
                    {banner.ctaLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCollection('special-offers')}
                    className="px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase bg-[#C6A15B] text-[#101010] hover:bg-[#D5B26E] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Special Offers · 30% OFF
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous banner"
        className="hidden sm:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-[#101010]/55 hover:bg-[#101010]/85 text-[#FAF7F1] border border-[#FAF7F1]/25 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next banner"
        className="hidden sm:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-[#101010]/55 hover:bg-[#101010]/85 text-[#FAF7F1] border border-[#FAF7F1]/25 transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slider Indicators */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5"
        role="tablist"
        aria-label="Banner slide indicators"
      >
        {banners.map((banner, idx) => (
          <button
            key={banner.id}
            type="button"
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`Go to slide ${idx + 1}: ${banner.headline}`}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all duration-300 cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-[#C6A15B]' : 'w-3 bg-[#FAF7F1]/50 hover:bg-[#FAF7F1]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
