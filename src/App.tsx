import React, { useEffect, useMemo, useState } from 'react';
import { AccountAndEditorModal } from './components/AccountAndEditorModal';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { CheckoutModal } from './components/CheckoutModal';
import { CollectionsGrid } from './components/CollectionsGrid';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { InfoPages } from './components/InfoPages';
import { ProductCard } from './components/ProductCard';
import { ProductDetailView } from './components/ProductDetailView';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { WhatsAppButton } from './components/WhatsAppButton';
import {
  COLLECTIONS,
  DEFAULT_STORE_SETTINGS,
  HERO_BANNERS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
} from './data/initialStoreData';
import {
  CartItem,
  CollectionSlug,
  OrderRecord,
  PageView,
  Product,
  ReviewItem,
  StoreSettings,
} from './types';
import { getEffectivePrice } from './utils/formatters';

const STORAGE_KEYS = {
  products: 'habera_products_v3',
  settings: 'habera_settings_v2',
  cart: 'habera_cart_v2',
  orders: 'habera_orders_v2',
  reviews: 'habera_reviews_v2',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(() =>
    readStorage(STORAGE_KEYS.products, INITIAL_PRODUCTS)
  );
  const [settings, setSettings] = useState<StoreSettings>(() =>
    readStorage(STORAGE_KEYS.settings, DEFAULT_STORE_SETTINGS)
  );
  const [cart, setCart] = useState<CartItem[]>(() => readStorage(STORAGE_KEYS.cart, []));
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    readStorage(STORAGE_KEYS.orders, [])
  );
  const [reviews, setReviews] = useState<ReviewItem[]>(() =>
    readStorage(STORAGE_KEYS.reviews, INITIAL_REVIEWS)
  );

  const [activePage, setActivePage] = useState<PageView>('home');
  const [activeCollection, setActiveCollection] = useState<CollectionSlug>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedInitialColor, setSelectedInitialColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountInitialTab, setAccountInitialTab] = useState<'orders' | 'catalog' | 'settings'>('orders');
  const [focusedEditProduct, setFocusedEditProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    } catch {
      // ignore storage quota failures
    }
  }, [products]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) || null,
    [products, selectedProductId]
  );

  const saleProducts = useMemo(() => products.filter((p) => p.isOnSale), [products]);

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return products
      .filter((p) => p.id !== selectedProduct.id && p.collection === selectedProduct.collection)
      .slice(0, 4);
  }, [products, selectedProduct]);

  const activeCollectionMeta = useMemo(() => {
    if (activeCollection === 'all') {
      return {
        title: 'All Modest Collections',
        subtitle:
          'Explore unique abaya silhouettes, modal stoles, georgette hijabs, khimars, and Saudi & regular niqabs crafted for Pakistan.',
      };
    }
    const found = COLLECTIONS.find((c) => c.slug === activeCollection);
    return {
      title: found?.title || 'Collection',
      subtitle: found?.subtitle || '',
    };
  }, [activeCollection]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleNavigateHome = () => {
    setActivePage('home');
    setActiveCollection('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollection = (slug: CollectionSlug) => {
    setActiveCollection(slug);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (product: Product, initialColorName?: string) => {
    setSelectedProductId(product.id);
    setSelectedInitialColor(initialColorName || null);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePage = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addItemToCart = (product: Product, colorName: string, size: string, qty = 1) => {
    const unitSalePrice = getEffectivePrice(product);
    const matchedColor = product.colors.find((c) => c.name === colorName) || product.colors[0];
    const colorImage = matchedColor?.image || product.images[0];
    const key = `${product.id}__${colorName}__${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          image: colorImage,
          unitOriginalPrice: product.originalPrice,
          unitSalePrice,
          isOnSale: product.isOnSale,
          selectedColor: colorName,
          selectedSize: size,
          quantity: qty,
        },
      ];
    });
  };

  const handleAddToCart = (product: Product, color: string, size: string, qty = 1) => {
    addItemToCart(product, color, size, qty);
    showToast(`Added "${product.name} (${color})" to your bag.`);
  };

  const handleBuyNow = (product: Product, color: string, size: string, qty = 1) => {
    addItemToCart(product, color, size, qty);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleUpdateCartQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handlePlaceOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    const newSale = getEffectivePrice(updated);
    setCart((prev) =>
      prev.map((item) =>
        item.productId === updated.id
          ? {
              ...item,
              name: updated.name,
              unitOriginalPrice: updated.originalPrice,
              unitSalePrice: newSale,
              isOnSale: updated.isOnSale,
            }
          : item
      )
    );
  };

  const handleOpenEditProduct = (product: Product) => {
    setFocusedEditProduct(product);
    setAccountInitialTab('catalog');
    setAccountOpen(true);
  };

  const handleResetAllData = () => {
    setProducts(INITIAL_PRODUCTS);
    setSettings(DEFAULT_STORE_SETTINGS);
    setReviews(INITIAL_REVIEWS);
  };

  const handleAddReview = (newRev: Omit<ReviewItem, 'id' | 'isDemoSample'>) => {
    setReviews((prev) => [
      {
        ...newRev,
        id: `rev-${Date.now()}`,
        isDemoSample: false,
      },
      ...prev,
    ]);
    showToast('Thank you! Your review has been published.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F1] text-[#101010]">
      <Header
        announcementText={settings.announcementText}
        activePage={activePage}
        activeCollection={activeCollection}
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (activePage !== 'shop' && activePage !== 'home') {
            setActivePage('shop');
          }
        }}
        onNavigateHome={handleNavigateHome}
        onSelectCollection={handleSelectCollection}
        onOpenCart={() => setCartOpen(true)}
        onOpenAccount={() => {
          setFocusedEditProduct(null);
          setAccountInitialTab('orders');
          setAccountOpen(true);
        }}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSlider banners={HERO_BANNERS} onSelectCollection={handleSelectCollection} />

            <CollectionsGrid
              collections={COLLECTIONS}
              onSelectCollection={handleSelectCollection}
            />

            <section className="bg-[#E8DDCC]/45 border-y border-[#101010]/10 py-14 sm:py-18">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
                  <div>
                    <p className="text-xs tracking-[0.22em] uppercase text-[#9C7631] font-semibold">
                      Limited Time Offer · Flat 30% OFF
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#101010] mt-1">
                      Special HABERA Sale
                    </h2>
                    <p className="mt-1.5 text-sm text-[#3A352F] max-w-xl">
                      Signature abayas, stoles, hijabs, khimars, and Saudi niqabs at 30% off original PKR prices.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectCollection('special-offers')}
                    className="self-start sm:self-auto px-6 py-3 bg-[#C6A15B] text-[#101010] hover:bg-[#D5B26E] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View All Sale Items ({saleProducts.length})
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {saleProducts.slice(0, 4).map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onViewProduct={handleViewProduct}
                      onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
                      onBuyNow={(p, c, s) => handleBuyNow(p, c, s, 1)}
                      onEditProduct={handleOpenEditProduct}
                    />
                  ))}
                </div>
              </div>
            </section>

            <CatalogSection
              title="Complete HABERA Collection"
              subtitle="Every abaya silhouette, stole, hijab, khimar, and niqab showcases realistic Pakistani models with color-matched photography."
              products={products}
              collections={COLLECTIONS}
              activeCollection={activeCollection}
              searchQuery={searchQuery}
              onSelectCollection={setActiveCollection}
              onSearchChange={setSearchQuery}
              onViewProduct={handleViewProduct}
              onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
              onBuyNow={(p, c, s) => handleBuyNow(p, c, s, 1)}
              onEditProduct={handleOpenEditProduct}
            />

            <ReviewsCarousel reviews={reviews} onAddReview={handleAddReview} />
          </>
        )}

        {activePage === 'shop' && (
          <CatalogSection
            title={activeCollectionMeta.title}
            subtitle={activeCollectionMeta.subtitle}
            products={products}
            collections={COLLECTIONS}
            activeCollection={activeCollection}
            searchQuery={searchQuery}
            onSelectCollection={setActiveCollection}
            onSearchChange={setSearchQuery}
            onViewProduct={handleViewProduct}
            onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
            onBuyNow={(p, c, s) => handleBuyNow(p, c, s, 1)}
            onEditProduct={handleOpenEditProduct}
          />
        )}

        {activePage === 'product' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            initialColorName={selectedInitialColor}
            relatedProducts={relatedProducts}
            onBackToShop={(col) => handleSelectCollection(col || 'all')}
            onViewProduct={handleViewProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onEditProduct={handleOpenEditProduct}
          />
        )}

        {activePage !== 'home' && activePage !== 'shop' && activePage !== 'product' && (
          <InfoPages
            page={activePage}
            settings={settings}
            onBackHome={handleNavigateHome}
          />
        )}
      </main>

      <Footer
        settings={settings}
        onNavigatePage={handleNavigatePage}
        onSelectCollection={handleSelectCollection}
      />

      <WhatsAppButton
        phoneNumber={settings.whatsappNumber}
        welcomeMessage={settings.whatsappWelcomeMessage}
      />

      <CartDrawer
        isOpen={cartOpen}
        items={cart}
        settings={settings}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onBrowseShop={() => handleSelectCollection('all')}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        items={cart}
        settings={settings}
        onClose={() => setCheckoutOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />

      <AccountAndEditorModal
        isOpen={accountOpen}
        initialTab={accountInitialTab}
        focusedProduct={focusedEditProduct}
        orders={orders}
        products={products}
        settings={settings}
        onClose={() => setAccountOpen(false)}
        onUpdateProduct={handleUpdateProduct}
        onUpdateSettings={setSettings}
        onResetAllData={handleResetAllData}
      />

      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-5 left-5 z-40 bg-[#101010] text-[#FAF7F1] border border-[#C6A15B]/60 px-4 py-3 text-xs font-medium shadow-xl flex items-center gap-4"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartOpen(true);
            }}
            className="text-[#C6A15B] font-semibold uppercase tracking-wider hover:underline cursor-pointer whitespace-nowrap"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
