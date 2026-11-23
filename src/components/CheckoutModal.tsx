import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, ShieldCheck, X } from 'lucide-react';
import { CartItem, OrderRecord, PaymentMethod, StoreSettings } from '../types';
import { buildWhatsAppUrl, formatPKR } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  settings: StoreSettings;
  onClose: () => void;
  onPlaceOrder: (order: OrderRecord) => void;
}

const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Other City in Pakistan',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  settings,
  onClose,
  onPlaceOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitSalePrice * item.quantity, 0);
  const shippingFee =
    subtotal >= settings.freeShippingThreshold || subtotal === 0 ? 0 : settings.shippingFee;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const order: OrderRecord = {
      id: `HBR-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleString('en-PK', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      city,
      postalCode: postalCode.trim() || 'N/A',
      paymentMethod,
      items: [...items],
      subtotal,
      shippingFee,
      total,
      status: 'Confirmed',
    };

    onPlaceOrder(order);
    setConfirmedOrder(order);
  };

  const handleCloseModal = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="HABERA Checkout"
    >
      <div className="fixed inset-0 bg-[#101010]/65 backdrop-blur-xs" onClick={handleCloseModal} />

      <div className="relative z-10 w-full max-w-4xl bg-[#FAF7F1] border border-[#101010]/15 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="px-6 py-5 bg-white border-b border-[#101010]/10 flex items-center justify-between sticky top-0 z-10">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#9C7631] font-semibold">
              HABERA Checkout · Pakistan
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#101010]">
              {confirmedOrder ? 'Order Confirmed' : 'Complete Your Order'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseModal}
            aria-label="Close checkout"
            className="p-2 text-[#3A352F] hover:text-[#101010] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          <div className="p-6 sm:p-10 space-y-6">
            <div className="bg-white border border-[#C6A15B]/50 p-6 sm:p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#C6A15B] mx-auto" />
              <p className="text-xs tracking-[0.18em] uppercase text-[#9C7631] font-semibold">
                Order #{confirmedOrder.id} Confirmed — Preparing Shipment
              </p>
              <h3 className="font-display text-3xl font-semibold text-[#101010]">
                Thank you, {confirmedOrder.customerName}
              </h3>
              <p className="text-sm text-[#3A352F] max-w-lg mx-auto leading-relaxed">
                Your order will be dispatched to <span className="font-semibold">{confirmedOrder.address}, {confirmedOrder.city}</span>. Estimated delivery across Pakistan is 2–4 working days.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={buildWhatsAppUrl(
                    settings.whatsappNumber,
                    `Assalam-o-Alaikum HABERA! I just placed order #${confirmedOrder.id} for ${formatPKR(confirmedOrder.total)} (${confirmedOrder.city}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#1FB857] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 bg-[#101010] text-[#FAF7F1] text-xs font-semibold tracking-wider uppercase hover:bg-[#2A2622] transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="bg-white border border-[#101010]/10 p-6 space-y-4">
              <h4 className="font-display text-xl font-semibold text-[#101010]">Order Receipt</h4>
              <div className="divide-y divide-[#101010]/8 text-xs sm:text-sm">
                {confirmedOrder.items.map((item) => (
                  <div key={item.key} className="py-2.5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-[#101010]">
                        {item.name} × {item.quantity}
                      </p>
                      <p className="text-[#3A352F]/75 text-xs">
                        {item.selectedColor} · {item.selectedSize}
                      </p>
                    </div>
                    <span className="tabular-nums font-medium">
                      {formatPKR(item.unitSalePrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-[#101010]/10 flex items-center justify-between text-base font-semibold">
                <span>Total Payable ({confirmedOrder.paymentMethod.toUpperCase()})</span>
                <span className="tabular-nums">{formatPKR(confirmedOrder.total)}</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            {/* Customer & Delivery Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-5 sm:p-6 border border-[#101010]/10 space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#101010]">
                  01. Contact Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#3A352F] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ayesha Tariq"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm focus:outline-none focus:border-[#101010]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#3A352F] mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm focus:outline-none focus:border-[#101010]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#3A352F] mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm focus:outline-none focus:border-[#101010]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 border border-[#101010]/10 space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#101010]">
                  02. Delivery Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#3A352F] mb-1">
                      Complete Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House No, Street, Sector / Block, Area"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm focus:outline-none focus:border-[#101010]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#3A352F] mb-1">
                      City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm focus:outline-none focus:border-[#101010]"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#3A352F] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 54660"
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm focus:outline-none focus:border-[#101010]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 border border-[#101010]/10 space-y-3">
                <h3 className="font-display text-xl font-semibold text-[#101010]">
                  03. Payment Method
                </h3>
                <label className="flex items-start gap-3 p-3.5 border border-[#101010]/15 cursor-pointer hover:bg-[#FAF7F1]">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-[#101010]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#101010]">
                      Cash on Delivery (COD)
                    </p>
                    <p className="text-xs text-[#3A352F]">
                      Pay in cash directly to the courier upon parcel arrival anywhere in Pakistan.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 border border-[#101010]/15 cursor-pointer hover:bg-[#FAF7F1]">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'jazzcash'}
                    onChange={() => setPaymentMethod('jazzcash')}
                    className="mt-1 accent-[#101010]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#101010]">
                      JazzCash / Easypaisa Mobile Wallet
                    </p>
                    <p className="text-xs text-[#3A352F]">
                      Wallet transfer instructions shared immediately via WhatsApp after order confirmation.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 border border-[#101010]/15 cursor-pointer hover:bg-[#FAF7F1]">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank-transfer'}
                    onChange={() => setPaymentMethod('bank-transfer')}
                    className="mt-1 accent-[#101010]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#101010]">
                      Direct Bank Transfer (IBFT)
                    </p>
                    <p className="text-xs text-[#3A352F]">
                      Pay via Meezan / HBL / SadaPay IBFT using your Order ID as reference.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 border border-[#101010]/10 space-y-5 sticky top-24">
                <h3 className="font-display text-2xl font-semibold text-[#101010]">
                  Order Summary
                </h3>

                <div className="divide-y divide-[#101010]/8 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.key} className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <div className="min-w-0">
                        <p className="font-medium text-[#101010] truncate">{item.name}</p>
                        <p className="text-xs text-[#3A352F]/75">
                          {item.selectedColor} · {item.selectedSize} · Qty {item.quantity}
                        </p>
                      </div>
                      <span className="tabular-nums font-semibold shrink-0">
                        {formatPKR(item.unitSalePrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-3 border-t border-[#101010]/10 text-sm">
                  <div className="flex items-center justify-between text-[#3A352F]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatPKR(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#3A352F]">
                    <span>Courier Delivery</span>
                    <span className="tabular-nums">
                      {shippingFee === 0 ? 'Free' : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#101010]/10 text-lg font-semibold text-[#101010]">
                    <span>Total (PKR)</span>
                    <span className="tabular-nums">{formatPKR(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C6A15B] text-[#101010] hover:bg-[#D5B26E] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer"
                >
                  Place Order ({formatPKR(total)})
                </button>

                <div className="flex items-center gap-2 text-xs text-[#3A352F]/80 justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                  <span>7-day size exchange across Pakistan</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
