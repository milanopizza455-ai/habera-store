import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { CollectionSlug, PageView } from '../types';
import { BrandMark } from './BrandMark';

interface HeaderProps {
  announcementText: string;
  activePage: PageView;
  activeCollection: CollectionSlug;
  cartCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateHome: () => void;
  onSelectCollection: (slug: CollectionSlug) => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
}

interface NavItem {
  label: string;
  action: () => void;
  isActive: boolean;
  isHighlight?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  announcementText,
  activePage,
  activeCollection,
  cartCount,
  searchQuery,
  onSearchChange,
  onNavigateHome,
  onSelectCollection,
  onOpenCart,
  onOpenAccount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isShopView = activePage === 'shop';

  const navItems: NavItem[] = [
    {
      label: 'Home',
      action: () => {
        onNavigateHome();
        setMobileMenuOpen(false);
      },
      isActive: activePage === 'home',
    },
    {
      label: 'Shop All',
      action: () => {
        onSelectCollection('all');
        setMobileMenuOpen(false);
      },
      isActive: isShopView && activeCollection === 'all',
    },
    {
      label: 'Abayas',
      action: () => {
        onSelectCollection('everyday-abayas');
        setMobileMenuOpen(false);
      },
      isActive:
        isShopView &&
        (activeCollection === 'everyday-abayas' ||
          activeCollection === 'luxury-abayas' ||
          activeCollection === 'open-abayas'),
    },
    {
      label: 'Stoles & Hijabs',
      action: () => {
        onSelectCollection('premium-stoles');
        setMobileMenuOpen(false);
      },
      isActive:
        isShopView &&
        (activeCollection === 'premium-stoles' || activeCollection === 'everyday-hijabs'),
    },
    {
      label: 'Saudi Niqabs',
      action: () => {
        onSelectCollection('saudi-niqabs');
        setMobileMenuOpen(false);
      },
      isActive: isShopView && activeCollection === 'saudi-niqabs',
    },
    {
      label: 'Regular Niqabs',
      action: () => {
        onSelectCollection('regular-niqabs');
        setMobileMenuOpen(false);
      },
      isActive: isShopView && activeCollection === 'regular-niqabs',
    },
    {
      label: 'New Arrivals',
      action: () => {
        onSelectCollection('new-arrivals');
        setMobileMenuOpen(false);
      },
      isActive: isShopView && activeCollection === 'new-arrivals',
    },
    {
      label: 'Sale',
      action: () => {
        onSelectCollection('special-offers');
        setMobileMenuOpen(false);
      },
      isActive: isShopView && activeCollection === 'special-offers',
      isHighlight: true,
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectCollection('all');
  };

  return (
    <>
      {/* Announcement Bar (non-sticky so mobile sticky height remains ultra-compact) */}
      <div className="bg-[#101010] text-[#FAF7F1] px-4 py-2 text-center border-b border-[#C6A15B]/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs tracking-[0.14em] font-medium">
          <span className="uppercase">{announcementText}</span>
          <button
            type="button"
            onClick={() => onSelectCollection('special-offers')}
            className="bg-[#C6A15B] text-[#101010] hover:bg-[#D4B36E] px-3 py-0.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            SALE
          </button>
        </div>
      </div>

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#FAF7F1]/95 backdrop-blur-md border-b border-[#101010]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-6">
          {/* Left: Mobile Menu + Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2 -ml-2 text-[#101010] hover:text-[#C6A15B] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              aria-label="HABERA Home"
              className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
            >
              <BrandMark variant="dark" />
            </button>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 overflow-x-auto"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className={`relative py-1 text-xs xl:text-[13px] tracking-[0.06em] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  item.isHighlight
                    ? 'font-semibold text-[#9C7631] hover:text-[#101010]'
                    : item.isActive
                      ? 'font-semibold text-[#101010]'
                      : 'font-medium text-[#3A352F] hover:text-[#101010]'
                }`}
              >
                {item.label}
                {item.isActive && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#C6A15B]" />
                )}
              </button>
            ))}
          </nav>

          {/* Right: Search, Account/Settings, Cart */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search products"
              className="p-2.5 text-[#101010] hover:text-[#C6A15B] transition-colors cursor-pointer"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <button
              type="button"
              onClick={onOpenAccount}
              aria-label="Account and Store Settings"
              title="Account, Orders & Price Editor"
              className="p-2.5 text-[#101010] hover:text-[#C6A15B] transition-colors cursor-pointer"
            >
              <User className="w-[18px] h-[18px]" />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative p-2.5 text-[#101010] hover:text-[#C6A15B] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-[#101010] text-[#FAF7F1] text-[10px] font-semibold tabular-nums flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-[#101010]/10 bg-[#FAF7F1] px-4 sm:px-6 lg:px-8 py-3">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#3A352F] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search abayas, silk stoles, Saudi niqabs, khimars..."
                autoFocus
                className="w-full bg-transparent text-sm text-[#101010] placeholder:text-[#3A352F]/60 focus:outline-none py-1"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="text-xs text-[#3A352F] hover:text-[#101010] px-2 py-1 cursor-pointer whitespace-nowrap"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#101010] text-[#FAF7F1] text-xs font-medium tracking-wider uppercase hover:bg-[#2A2622] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search bar"
                className="p-1 text-[#3A352F] hover:text-[#101010] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#101010]/10 bg-[#FAF7F1] px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className={`w-full text-left px-3 py-2.5 text-sm border-b border-[#101010]/5 flex items-center justify-between cursor-pointer ${
                  item.isHighlight
                    ? 'font-semibold text-[#9C7631]'
                    : item.isActive
                      ? 'font-semibold text-[#101010] bg-[#E8DDCC]/40'
                      : 'text-[#3A352F]'
                }`}
              >
                <span>{item.label}</span>
                {item.isHighlight && (
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9C7631]">
                    30% OFF
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
