
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hammer, HardHat, Lock, Key } from 'lucide-react';

interface UnderConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock?: () => void;
}

const UnderConstructionModal: React.FC<UnderConstructionModalProps> = ({ isOpen, onClose, onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState(false);

  const handlePasswordCheck = () => {
    if (password === 'dupa11') {
      if (onUnlock) onUnlock();
      setPassword('');
      setShowInput(false);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  const handleClose = () => {
      setShowInput(false);
      setPassword('');
      setError(false);
      onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-center p-8 border border-white/20"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5C4033]/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 rounded-full"
            >
              <X size={20} />
            </button>

            <div className="mb-6 flex justify-center">
              <div 
                className="w-16 h-16 bg-[#faf9f6] rounded-2xl flex items-center justify-center shadow-inner border border-gray-100 cursor-pointer"
                onDoubleClick={() => setShowInput(!showInput)} // Secret trigger or just visible button below
                onClick={() => setShowInput(true)}
              >
                 <Hammer className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </div>

            <h3 className="text-2xl font-serif text-gray-900 mb-3 tracking-tight">
              Strona w przygotowaniu
            </h3>
            
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mb-4 opacity-50"></div>

            <p className="text-gray-500 leading-relaxed mb-8 text-sm">
              Pracujemy nad nową jakością i funkcjonalnością tej sekcji. <br/>
              Zapraszamy do odwiedzenia nas już wkrótce.
            </p>

            <div className="flex flex-col gap-3 justify-center items-center">
                
                {/* Secret Input Area */}
                {showInput && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="w-full max-w-xs mb-2"
                    >
                        <div className="flex gap-2">
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handlePasswordCheck()}
                                placeholder="Hasło dostępu"
                                className={`w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:border-[#D4AF37] transition-all ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                autoFocus
                            />
                            <button 
                                onClick={handlePasswordCheck}
                                className="bg-[#D4AF37] text-white p-2 rounded-full hover:bg-[#b5952f] transition-colors"
                            >
                                <Key size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}

                <button
                onClick={handleClose}
                className="px-8 py-3 bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#D4AF37] transition-all shadow-lg active:scale-95"
                >
                Wróć do strony głównej
                </button>
            
                {/* Subtle trigger if user doesn't know to click icon */}
                {!showInput && (
                    <button onClick={() => setShowInput(true)} className="text-[9px] text-gray-300 uppercase tracking-widest hover:text-[#D4AF37] transition-colors mt-2">
                        Logowanie
                    </button>
                )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UnderConstructionModal;
