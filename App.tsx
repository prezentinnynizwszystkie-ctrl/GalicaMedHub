
import React, { useState } from 'react';
import GlassCinema from './components/GlassCinema';
import WebModal from './components/WebModal';
import { motion, AnimatePresence } from 'framer-motion';

// Import Only Store App (Internal)
import StoreApp from './Store/App';

type AppView = 'gateway' | 'store';

const EXTERNAL_LINKS: Record<string, string> = {
  poronin: 'https://www.galicamed.pl',
  maniowy: 'https://www.galicamedmaniowy.pl',
  beauty: 'https://www.galicamedbeauty.pl',
  puls: 'https://www.poradniapuls.pl',
  infuzje: 'https://www.terapieinfuzyjne.pl',
  mbst: 'https://www.terapiambst.pl',
  // Fallbacks for specific treatments to Booksy or main pages
  blizny: 'https://booksy.com/pl-pl/dl/show-business/267624',
  laser: 'https://booksy.com/pl-pl/dl/show-business/267624'
};

const App: React.FC = () => {
  const [currentApp, setCurrentApp] = useState<AppView>('gateway');
  const [modalState, setModalState] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });

  const handleOpenModal = (url: string, title: string) => {
    setModalState({ isOpen: true, url, title });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleNavigate = (appId: string) => {
    // 1. Internal Store App
    if (appId === 'store') {
        setCurrentApp('store');
        window.scrollTo(0, 0);
        return;
    }

    // 2. External Redirection
    const targetUrl = EXTERNAL_LINKS[appId];
    if (targetUrl) {
        window.location.href = targetUrl;
    } else {
        console.warn(`No mapping found for app ID: ${appId}`);
    }
  };

  const handleBackToGateway = () => {
      setCurrentApp('gateway');
      window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-800 font-sans selection:bg-gold-500 selection:text-white overflow-hidden">
      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col relative"
      >
        
        <AnimatePresence mode="wait">
            {currentApp === 'gateway' && (
                <motion.div
                    key="gateway"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <GlassCinema 
                        onNavigate={handleNavigate} 
                        onOpenModal={handleOpenModal}
                    />
                    
                    {/* Footer Link (Subtle, floating) */}
                    <div className="absolute bottom-4 left-0 right-0 z-30 text-center pointer-events-none">
                        <p className="text-[9px] text-white/30 uppercase tracking-widest">&copy; {new Date().getFullYear()} GalicaMed</p>
                    </div>
                </motion.div>
            )}

            {currentApp === 'store' && (
                <motion.div 
                    key="store"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <StoreApp onBack={handleBackToGateway} />
                </motion.div>
            )}
        </AnimatePresence>

      </motion.div>

      {/* Modal for External Sites (Tile previews) */}
      <WebModal 
        isOpen={modalState.isOpen} 
        onClose={handleCloseModal} 
        url={modalState.url} 
        title={modalState.title}
      />
    </div>
  );
};

export default App;
