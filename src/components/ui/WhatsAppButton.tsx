'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 mb-2 bg-white rounded-lg shadow-lg p-4 w-72"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">¿Necesitas ayuda?</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Contáctanos por WhatsApp para resolver tus dudas sobre torneos y reservas.
                </p>
                <button
                  onClick={handleClick}
                  className="mt-3 w-full bg-green-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Iniciar chat
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-gray-600' : 'bg-green-500 hover:bg-green-600'
        } rounded-full p-4 shadow-lg text-white flex items-center justify-center relative`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <FaWhatsapp className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs animate-pulse">
              1
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}