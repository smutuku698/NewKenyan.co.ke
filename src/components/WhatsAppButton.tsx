'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappNumber = '+254736407642';
  const message = 'Hello! I found your listing on NewKenyan.com and I would like to inquire about...';

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={openWhatsApp}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-1 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group animate-bounce"
          aria-label="Chat on WhatsApp"
          title="Contact us on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" fill="currentColor" />
          <span className="text-xs font-semibold whitespace-nowrap">Chat with Us</span>
        </button>
      )}
    </>
  );
}
