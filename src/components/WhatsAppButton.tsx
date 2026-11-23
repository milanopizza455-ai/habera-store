import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/formatters';

interface WhatsAppButtonProps {
  phoneNumber: string;
  welcomeMessage: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  welcomeMessage,
}) => {
  const href = buildWhatsAppUrl(phoneNumber, welcomeMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HABERA on WhatsApp"
      title={`WhatsApp Support (${phoneNumber})`}
      className="fixed bottom-5 right-5 z-40 group flex items-center gap-2.5 bg-[#25D366] text-white rounded-full pl-3.5 pr-4 py-3 shadow-[0_10px_28px_rgba(16,16,16,0.22)] hover:bg-[#1FB857] hover:scale-105 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101010] focus-visible:ring-offset-2 animate-whatsapp-gentle"
    >
      <span className="relative flex items-center justify-center w-6 h-6">
        <MessageCircle className="w-6 h-6 fill-current" />
      </span>
      <span className="hidden sm:inline text-xs font-semibold tracking-wide whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  );
};
