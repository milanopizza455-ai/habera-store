import React, { useEffect, useState } from 'react';
import { Package, RotateCcw, Save, Settings, Tag, X } from 'lucide-react';
import { OrderRecord, Product, StoreSettings } from '../types';
import { formatPKR, getEffectivePrice } from '../utils/formatters';

interface AccountAndEditorModalProps {
  isOpen: boolean;
  initialTab?: 'orders' | 'catalog' | 'settings';
  focusedProduct: Product | null;
  orders: OrderRecord[];
  products: Product[];
  settings: StoreSettings;
  onClose: () => void;
  onUpdateProduct: (updated: Product) => void;
  onUpdateSettings: (updated: StoreSettings) => void;
  onResetAllData: () => void;
}

export const AccountAndEditorModal: React.FC<AccountAndEditorModalProps> = ({
  isOpen,
  initialTab = 'orders',
  focusedProduct,
  orders,
  products,
  settings,
  onClose,
  onUpdateProduct,
  onUpdateSettings,
  onResetAllData,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'settings'>(initialTab);
  const [selectedProdId, setSelectedProdId] = useState<string>(products[0]?.id || '');
  const [draftProduct, setDraftProduct] = useState<Product | null>(null);
  const [draftSettings, setDraftSettings] = useState<StoreSettings>(settings);
  const [savedNotice, setSavedNotice] = useState('');

  useEffect(() => {
    if (isOpen) {
      setActiveTab(focusedProduct ? 'catalog' : initialTab);
      const target = focusedProduct || products.find((p) => p.id === selectedProdId) || products[0];
      if (target) {
        setSelectedProdId(target.id);
        setDraftProduct({ ...target });
      }
      setDraftSettings({ ...settings });
      setSavedNotice('');
    }
  }, [isOpen, focusedProduct, initialTab, products, settings]);

  if (!isOpen) return null;

  const handleSelectProduct = (id: string) => {
    setSelectedProdId(id);
    const found = products.find((p) => p.id === id);
    if (found) setDraftProduct({ ...found });
    setSavedNotice('');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftProduct) return;
    onUpdateProduct(draftProduct);
    setSavedNotice(`Updated "${draftProduct.name}" pricing and details.`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(draftSettings);
    setSavedNotice('Store & WhatsApp settings saved.');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Account and Store Editor"
    >
      <div className="fixed inset-0 bg-[#101010]/65 backdrop-blur-xs" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl bg-[#FAF7F1] border border-[#101010]/15 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-[#101010]/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#9C7631] font-semibold">
              HABERA Account &amp; Live Store Editor
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#101010]">
              Orders, Editable Prices &amp; Store Settings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-[#3A352F] hover:text-[#101010] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 bg-white border-b border-[#101010]/10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('orders');
              setSavedNotice('');
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#101010] text-[#FAF7F1]'
                : 'bg-[#FAF7F1] text-[#3A352F] hover:text-[#101010]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('catalog');
              setSavedNotice('');
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-[#101010] text-[#FAF7F1]'
                : 'bg-[#FAF7F1] text-[#3A352F] hover:text-[#101010]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Edit Prices &amp; Products</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('settings');
              setSavedNotice('');
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#101010] text-[#FAF7F1]'
                : 'bg-[#FAF7F1] text-[#3A352F] hover:text-[#101010]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>WhatsApp &amp; Website Settings</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {savedNotice && (
            <div className="bg-[#E8DDCC]/70 border border-[#C6A15B] px-4 py-3 text-xs font-medium text-[#101010]">
              {savedNotice}
            </div>
          )}

          {/* Tab 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white border border-[#101010]/10 p-10 text-center">
                  <Package className="w-8 h-8 text-[#C6A15B] mx-auto mb-3" />
                  <p className="font-display text-xl font-semibold text-[#101010]">
                    No orders placed yet
                  </p>
                  <p className="mt-1 text-xs text-[#3A352F]">
                    Orders placed during your session are stored locally and appear here with full receipt details.
                  </p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white border border-[#101010]/10 p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#101010]/8">
                      <div>
                        <p className="text-xs font-semibold tracking-wider uppercase text-[#9C7631]">
                          Order #{ord.id} · {ord.status}
                        </p>
                        <p className="text-xs text-[#3A352F] mt-0.5">
                          {ord.createdAt} · {ord.customerName} ({ord.city})
                        </p>
                      </div>
                      <span className="text-base font-semibold tabular-nums text-[#101010]">
                        {formatPKR(ord.total)}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-[#3A352F]">
                      {ord.items.map((item) => (
                        <div key={item.key} className="flex justify-between">
                          <span>
                            {item.name} ({item.selectedColor}, {item.selectedSize}) × {item.quantity}
                          </span>
                          <span className="tabular-nums font-medium text-[#101010]">
                            {formatPKR(item.unitSalePrice * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: Editable Product Prices & Content */}
          {activeTab === 'catalog' && draftProduct && (
            <form onSubmit={handleSaveProduct} className="bg-white border border-[#101010]/10 p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1.5">
                  Select Product to Edit
                </label>
                <select
                  value={selectedProdId}
                  onChange={(e) => handleSelectProduct(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/20 text-sm focus:outline-none focus:border-[#101010]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {formatPKR(getEffectivePrice(p))} {p.isOnSale ? `(${p.discountPercent}% OFF)` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={draftProduct.name}
                    onChange={(e) => setDraftProduct({ ...draftProduct, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Silhouette &amp; Cut Style
                  </label>
                  <input
                    type="text"
                    required
                    value={draftProduct.silhouetteStyle}
                    onChange={(e) =>
                      setDraftProduct({ ...draftProduct, silhouetteStyle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Original Price (PKR)
                  </label>
                  <input
                    type="number"
                    min={100}
                    step={50}
                    required
                    value={draftProduct.originalPrice}
                    onChange={(e) =>
                      setDraftProduct({ ...draftProduct, originalPrice: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Availability Status
                  </label>
                  <select
                    value={draftProduct.availability}
                    onChange={(e) =>
                      setDraftProduct({
                        ...draftProduct,
                        availability: e.target.value as Product['availability'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 p-4 bg-[#FAF7F1] border border-[#101010]/10">
                  <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftProduct.isOnSale}
                      onChange={(e) =>
                        setDraftProduct({
                          ...draftProduct,
                          isOnSale: e.target.checked,
                          discountPercent: e.target.checked ? (draftProduct.discountPercent || 30) : 0,
                        })
                      }
                      className="w-4 h-4 accent-[#101010]"
                    />
                    <span>Apply 30% OFF Sale Discount</span>
                  </label>

                  <div className="text-sm tabular-nums">
                    Final Store Price:{' '}
                    <span className="font-semibold text-[#9C7631]">
                      {formatPKR(getEffectivePrice(draftProduct))}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={draftProduct.shortDescription}
                    onChange={(e) =>
                      setDraftProduct({ ...draftProduct, shortDescription: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Fabric Details
                  </label>
                  <input
                    type="text"
                    value={draftProduct.fabricDetails}
                    onChange={(e) =>
                      setDraftProduct({ ...draftProduct, fabricDetails: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#101010] text-[#FAF7F1] hover:bg-[#C6A15B] hover:text-[#101010] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Product Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* Tab 3: WhatsApp & Storefront Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="bg-white border border-[#101010]/10 p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    WhatsApp Number (with Country Code)
                  </label>
                  <input
                    type="text"
                    required
                    value={draftSettings.whatsappNumber}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, whatsappNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    required
                    value={draftSettings.supportEmail}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, supportEmail: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    WhatsApp Welcome Message
                  </label>
                  <textarea
                    rows={2}
                    value={draftSettings.whatsappWelcomeMessage}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, whatsappWelcomeMessage: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Top Announcement Bar Text
                  </label>
                  <input
                    type="text"
                    value={draftSettings.announcementText}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, announcementText: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Standard Pakistan Shipping (PKR)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={draftSettings.shippingFee}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, shippingFee: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A352F] mb-1">
                    Free Shipping Threshold (PKR)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={draftSettings.freeShippingThreshold}
                    onChange={(e) =>
                      setDraftSettings({
                        ...draftSettings,
                        freeShippingThreshold: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#101010]/10">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#101010] text-[#FAF7F1] hover:bg-[#C6A15B] hover:text-[#101010] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Store Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onResetAllData();
                    setSavedNotice('All prices and store settings restored to factory defaults.');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#3A352F] border border-[#101010]/20 hover:border-[#101010] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
