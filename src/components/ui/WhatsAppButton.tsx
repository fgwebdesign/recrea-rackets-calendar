'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings/whatsapp`);
        const data = await response.json();
        if (data.whatsappNumber) {
          setWhatsappNumber(data.whatsappNumber);
        }
      } catch (error) {
        console.error('Error fetching WhatsApp number:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWhatsAppNumber();
  }, []);

  if (isLoading || !whatsappNumber) return null;

  const handleClick = () => {
    window.open(`https://wa.me/598${whatsappNumber}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </button>
  );
}