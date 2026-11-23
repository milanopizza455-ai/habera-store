import React, { useState } from 'react';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CollectionSlug, PageView, StoreSettings } from '../types';
import { buildWhatsAppUrl } from '../utils/formatters';
import { BrandMark } from './BrandMark';

interface FooterProps {
  settings: StoreSettings;
  onNavigatePage: (page: PageView) => void;
  onSelectCollection: (slug: CollectionSlug) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigatePage,
  onSelectCollection,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#101010] text-[#FAF7F1] border-t border-[#C6A15B]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <BrandMark variant="light" />
            <p className="text-sm text-[#E8DDCC]/80 leading-relaxed max-w-sm">
              {settings.tagline}. Crafted for modern Pakistani women seeking timeless abayas,
              breathable hijabs, modal stoles, and authentic Saudi &amp; regular niqabs at fair PKR prices.
            </p>
            <div className="space-y-2 text-xs text-[#E8DDCC]/80 pt-1">
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span>{settings.whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span>{settings.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span>Gulberg III, Lahore · Nationwide Delivery Across Pakistan</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappWelcomeMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HABERA WhatsApp"
                className="w-9 h-9 border border-[#FAF7F1]/20 flex items-center justify-center hover:border-[#C6A15B] hover:text-[#C6A15B] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage('contact');
                }}
                aria-label="HABERA Instagram"
                className="w-9 h-9 border border-[#FAF7F1]/20 flex items-center justify-center hover:border-[#C6A15B] hover:text-[#C6A15B] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage('contact');
                }}
                aria-label="HABERA Facebook"
                className="w-9 h-9 border border-[#FAF7F1]/20 text-xs font-semibold flex items-center justify-center hover:border-[#C6A15B] hover:text-[#C6A15B] transition-colors"
              >
                f
              </a>
              <a
                href="#tiktok"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage('contact');
                }}
                aria-label="HABERA TikTok"
                className="w-9 h-9 border border-[#FAF7F1]/20 text-xs font-semibold flex items-center justify-center hover:border-[#C6A15B] hover:text-[#C6A15B] transition-colors"
              >
                TT
              </a>
            </div>
          </div>

          {/* Shop Collections */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#C6A15B]">Collections</h3>
            <ul className="space-y-2 text-xs text-[#E8DDCC]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCollection('everyday-abayas')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Everyday Abayas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCollection('luxury-abayas')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Luxury Abayas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCollection('open-abayas')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Open Abayas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCollection('premium-stoles')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Stoles &amp; Hijabs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCollection('saudi-niqabs')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Saudi &amp; Regular Niqabs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCollection('special-offers')}
                  className="text-[#C6A15B] hover:text-[#E8DDCC] font-semibold transition-colors cursor-pointer"
                >
                  30% OFF Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* House & Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#C6A15B]">Information &amp; Care</h3>
            <ul className="space-y-2 text-xs text-[#E8DDCC]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('about')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  About HABERA
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('faq')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('shipping')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('returns')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Return &amp; Exchange Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('privacy')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('terms')}
                  className="hover:text-[#FAF7F1] transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#C6A15B]">Private Dispatch</h3>
            <p className="text-xs text-[#E8DDCC]/75 leading-relaxed">
              Receive early access to Eid edits, new abaya arrivals, and seasonal HABERA offers.
            </p>
            {subscribed ? (
              <p className="text-xs text-[#C6A15B] border border-[#C6A15B]/40 p-3">
                Thank you for joining HABERA. Expect refined updates soon.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter"
                  className="px-3 py-2.5 bg-[#1B1A18] border border-[#FAF7F1]/20 text-xs text-[#FAF7F1] placeholder:text-[#E8DDCC]/50 focus:outline-none focus:border-[#C6A15B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#C6A15B] text-[#101010] hover:bg-[#D5B26E] text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#FAF7F1]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DDCC]/60">
          <p>© {new Date().getFullYear()} HABERA Modest Fashion Pakistan. All rights reserved.</p>
          <p>Cash on Delivery · JazzCash / Easypaisa · Bank Transfer (PKR)</p>
        </div>
      </div>
    </footer>
  );
};
