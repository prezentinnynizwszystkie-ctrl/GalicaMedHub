import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, AlertCircle } from 'lucide-react';

interface WebModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const WebModal: React.FC<WebModalProps> = ({ isOpen, onClose, url, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
            {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full h-full md:h-[90vh] md:w-[90vw] max-w-7xl bg-white md:rounded-lg overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-serif tracking-wide">{title}</h3>
              <div className="flex items-center gap-4">
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs md:text-sm text-gray-300 hover:text-white transition-colors"
                >
                    Otwórz w nowym oknie <ExternalLink size={14} />
                </a>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="flex-grow bg-gray-50 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 z-0">
                    <p className="animate-pulse">Ładowanie strony...</p>
                </div>
              <iframe
                src={url}
                title={title}
                className="w-full h-full relative z-10"
                style={{ border: 'none' }}
                // Allows typical features but maintains security
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
              
              {/* Fallback info overlay if needed (visually subtle) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gray-100 text-gray-500 text-[10px] p-1 text-center border-t z-20">
                Jeśli strona się nie wyświetla (blokada przeglądarki), użyj przycisku "Otwórz w nowym oknie".
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WebModal;