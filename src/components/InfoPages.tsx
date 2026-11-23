import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { IMG } from '../data/initialStoreData';
import { PageView, StoreSettings } from '../types';
import { buildWhatsAppUrl } from '../utils/formatters';
import { ResilientImage } from './ResilientImage';

interface InfoPagesProps {
  page: Exclude<PageView, 'home' | 'shop' | 'product'>;
  settings: StoreSettings;
  onBackHome: () => void;
}

const FAQ_ITEMS = [
  {
    q: 'How long does delivery take across Pakistan?',
    a: 'Orders placed before 2:00 PM PKT are dispatched the same working day from our Lahore fulfillment studio. Delivery takes 2–3 working days in Lahore, Islamabad, Rawalpindi, and Karachi, and 3–4 working days nationwide.',
  },
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes, Cash on Delivery is available across all cities in Pakistan. We also support JazzCash, Easypaisa, and Direct Bank Transfer (IBFT).',
  },
  {
    q: 'How do I choose the right Abaya length?',
    a: 'Our abayas follow standard modest lengths: 52 (S) fits heights around 5\'0"–5\'2", 54 (M) fits 5\'3"–5\'5", 56 (L) fits 5\'6"–5\'8", and 58 (XL) fits 5\'9" and above.',
  },
  {
    q: 'Can I exchange a size or item after delivery?',
    a: 'Yes, unworn items with original tags intact can be exchanged within 7 days of delivery. Contact our team on WhatsApp with your Order ID to arrange a quick courier exchange.',
  },
  {
    q: 'Are HABERA fabrics suitable for Pakistani summer weather?',
    a: 'Yes. We prioritize breathable Korean Nida, matte Medina crepe, Turkish crinkle cotton, and airy micro-chiffon specifically chosen for warm climates.',
  },
];

export const InfoPages: React.FC<InfoPagesProps> = ({ page, settings, onBackHome }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSent, setContactSent] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#101010] hover:text-[#C6A15B] mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Storefront</span>
      </button>

      {page === 'about' && (
        <article className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-4">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9C7631] font-semibold">
                Our Heritage · Lahore, Pakistan
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#101010] leading-tight">
                About HABERA
              </h1>
              <p className="text-sm sm:text-base text-[#3A352F] leading-relaxed">
                Founded with a quiet conviction that modesty and luxury belong together, HABERA designs
                thoughtful abayas, breathable stoles, chiffon hijabs, khimars, and authentic niqabs tailored
                for women across Pakistan.
              </p>
              <p className="text-sm sm:text-base text-[#3A352F] leading-relaxed">
                Every stitch balances generous coverage, cool natural drape, and accessible pricing in PKR
                — crafted so you feel poised whether heading to university, the office, or Eid celebrations.
              </p>
            </div>
            <div className="md:col-span-6 aspect-[4/3] overflow-hidden border border-[#101010]/10">
              <ResilientImage
                src={IMG.bannerModesty}
                alt="HABERA luxury modest fashion studio"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#101010]/10">
            <div className="bg-white p-6 border border-[#101010]/10">
              <h2 className="font-display text-xl font-semibold text-[#101010]">Breathable Craft</h2>
              <p className="mt-2 text-xs sm:text-sm text-[#3A352F] leading-relaxed">
                Korean Nida, Medina silk, and micro-chiffon textiles tested for year-round comfort.
              </p>
            </div>
            <div className="bg-white p-6 border border-[#101010]/10">
              <h2 className="font-display text-xl font-semibold text-[#101010]">Honest Pricing</h2>
              <p className="mt-2 text-xs sm:text-sm text-[#3A352F] leading-relaxed">
                Direct-from-studio craftsmanship keeping everyday and luxury pieces fair for Pakistani families.
              </p>
            </div>
            <div className="bg-white p-6 border border-[#101010]/10">
              <h2 className="font-display text-xl font-semibold text-[#101010]">Nationwide Care</h2>
              <p className="mt-2 text-xs sm:text-sm text-[#3A352F] leading-relaxed">
                Personal sizing advice on WhatsApp and reliable Cash on Delivery across Pakistan.
              </p>
            </div>
          </div>
        </article>
      )}

      {page === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-5">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9C7631] font-semibold">
              Client Concierge
            </p>
            <h1 className="font-display text-4xl font-semibold text-[#101010]">Contact Us</h1>
            <p className="text-sm text-[#3A352F] leading-relaxed">
              Need help with sizing, bulk abaya orders, or tracking a parcel? Reach us directly on WhatsApp
              or send a message below.
            </p>

            <div className="space-y-3 pt-2 text-sm text-[#101010]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C6A15B]" />
                <span>{settings.whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C6A15B]" />
                <span>{settings.supportEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C6A15B]" />
                <span>Gulberg III, Lahore, Pakistan (Mon–Sat, 10 AM – 8 PM PKT)</span>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappWelcomeMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#1FB857] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="md:col-span-7 bg-white p-6 sm:p-8 border border-[#101010]/10">
            {contactSent ? (
              <div className="py-10 text-center space-y-3">
                <h2 className="font-display text-2xl font-semibold text-[#101010]">
                  Message Received
                </h2>
                <p className="text-sm text-[#3A352F]">
                  Thank you for contacting HABERA. Our Lahore concierge team will respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setContactSent(false)}
                  className="px-5 py-2.5 bg-[#101010] text-[#FAF7F1] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSent(true);
                }}
                className="space-y-4"
              >
                <h2 className="font-display text-2xl font-semibold text-[#101010]">
                  Send an Inquiry
                </h2>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3A352F] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3A352F] mb-1">
                    Phone or Email
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#3A352F] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F1] border border-[#101010]/15 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#101010] text-[#FAF7F1] hover:bg-[#C6A15B] hover:text-[#101010] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {page === 'faq' && (
        <div className="space-y-6">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#9C7631] font-semibold">
              Helpful Answers
            </p>
            <h1 className="font-display text-4xl font-semibold text-[#101010] mt-1">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="divide-y divide-[#101010]/10 bg-white border border-[#101010]/10">
            {FAQ_ITEMS.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <span className="font-display text-xl font-semibold text-[#101010]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open && (
                    <div className="px-6 pb-5 text-sm text-[#3A352F] leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {page === 'shipping' && (
        <article className="bg-white border border-[#101010]/10 p-6 sm:p-10 space-y-5">
          <h1 className="font-display text-4xl font-semibold text-[#101010]">Shipping Policy</h1>
          <p className="text-sm text-[#3A352F] leading-relaxed">
            HABERA dispatches orders nationwide across Pakistan through trusted courier partners (TCS,
            Leopards, and PostEx).
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#3A352F] leading-relaxed">
            <li>Standard nationwide delivery fee: Rs. {settings.shippingFee} PKR.</li>
            <li>Free nationwide delivery on all orders above Rs. {settings.freeShippingThreshold.toLocaleString('en-PK')} PKR.</li>
            <li>Major cities (Lahore, Karachi, Islamabad, Rawalpindi): 2–3 working days.</li>
            <li>Other towns and cities across Pakistan: 3–5 working days.</li>
            <li>Every parcel includes order verification via SMS or WhatsApp prior to dispatch.</li>
          </ul>
        </article>
      )}

      {page === 'returns' && (
        <article className="bg-white border border-[#101010]/10 p-6 sm:p-10 space-y-5">
          <h1 className="font-display text-4xl font-semibold text-[#101010]">
            Return &amp; Exchange Policy
          </h1>
          <p className="text-sm text-[#3A352F] leading-relaxed">
            Your satisfaction matters to us. If an abaya size does not fit or an item arrives damaged,
            HABERA offers a straightforward 7-day exchange or return window.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#3A352F] leading-relaxed">
            <li>Items must be unworn, unwashed, and returned in original HABERA packaging with tags attached.</li>
            <li>For hygiene reasons, niqabs and inner caps cannot be exchanged once opened unless defective upon arrival.</li>
            <li>To initiate an exchange, message {settings.whatsappNumber} on WhatsApp with your Order ID.</li>
          </ul>
        </article>
      )}

      {page === 'privacy' && (
        <article className="bg-white border border-[#101010]/10 p-6 sm:p-10 space-y-4">
          <h1 className="font-display text-4xl font-semibold text-[#101010]">Privacy Policy</h1>
          <p className="text-sm text-[#3A352F] leading-relaxed">
            HABERA respects your privacy. Customer contact numbers, delivery addresses, and order records
            are used solely to fulfill deliveries across Pakistan and provide customer support. We never
            sell or share personal information with third-party marketers.
          </p>
        </article>
      )}

      {page === 'terms' && (
        <article className="bg-white border border-[#101010]/10 p-6 sm:p-10 space-y-4">
          <h1 className="font-display text-4xl font-semibold text-[#101010]">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-[#3A352F] leading-relaxed">
            All prices displayed on HABERA are listed in Pakistani Rupees (PKR). Promotional 30% OFF
            discounts apply exclusively to marked sale items while stock lasts. By placing an order, you
            agree to provide accurate delivery contact information so our courier team can reach you.
          </p>
        </article>
      )}
    </div>
  );
};
