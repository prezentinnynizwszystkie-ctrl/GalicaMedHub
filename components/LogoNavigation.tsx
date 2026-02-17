import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo, Variants } from 'framer-motion';
import { LOGO_URLS } from '../constants';
import { ChevronRight, ChevronLeft, Circle } from 'lucide-react';

interface LogoNavigationProps {
    onNavigate: (app: string) => void;
}

const LogoNavigation: React.FC<LogoNavigationProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper to map ID to App Name
  const handleLogoClick = (id: number) => {
      switch (id) {
          case 1:
              onNavigate('poronin');
              break;
          case 2:
              onNavigate('beauty');
              break;
          case 3:
              onNavigate('maniowy');
              break;
          case 4:
              onNavigate('beauty');
              break;
          default:
              console.warn("Unknown app ID");
      }
  };

  // --- Mobile Slider Logic ---
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % LOGO_URLS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + LOGO_URLS.length) % LOGO_URLS.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      handleNext();
    } else if (info.offset.x > threshold) {
      handlePrev();
    }
  };

  // --- Animation Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    // Changed bg-white to bg-transparent to show the mesh gradient underneath
    <div className="w-full bg-transparent py-8 px-4 md:px-8 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
            className="text-center mb-6 md:mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <span className="text-gray-400 tracking-[0.2em] text-xs uppercase font-medium">Wybierz placówkę</span>
        </motion.div>
        
        {/* --- MOBILE VIEW: SLIDER --- */}
        <div className="md:hidden relative w-full max-w-sm mx-auto">
            {/* Arrows */}
            <button 
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow-md text-gold-600 hover:text-gold-800 -ml-4"
                aria-label="Poprzednia placówka"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow-md text-gold-600 hover:text-gold-800 -mr-4"
                aria-label="Następna placówka"
            >
                <ChevronRight size={24} />
            </button>

            {/* Carousel Window */}
            <div className="overflow-hidden px-4 py-4">
                <motion.div
                    className="flex"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={onDragEnd}
                    animate={{ x: `-${currentIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {LOGO_URLS.map((logo) => (
                        <div 
                            key={logo.id} 
                            className="min-w-full flex flex-col items-center justify-center px-4"
                        >
                            <div 
                                onClick={() => handleLogoClick(logo.id)}
                                className="group relative flex flex-col items-center gap-6 w-full cursor-pointer"
                            >
                                {/* Mobile Logo Image */}
                                <div className="h-40 w-full flex items-center justify-center p-4">
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="max-h-full max-w-full w-auto object-contain drop-shadow-sm"
                                    />
                                </div>

                                {/* Mobile CTA Button */}
                                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 text-white text-sm font-bold tracking-wide uppercase shadow-md active:scale-95 transition-transform w-full justify-center">
                                    <span>Odwiedź stronę</span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-4">
                {LOGO_URLS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`transition-all duration-300 ${
                            index === currentIndex 
                            ? "text-gold-500 scale-125" 
                            : "text-gray-300 hover:text-gold-300"
                        }`}
                    >
                        <Circle size={8} fill="currentColor" />
                    </button>
                ))}
            </div>
        </div>

        {/* --- DESKTOP VIEW: GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex flex-wrap justify-center items-start gap-12 md:gap-16"
        >
          {LOGO_URLS.map((logo) => (
            <motion.div
              key={logo.id}
              onClick={() => handleLogoClick(logo.id)}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-center justify-center gap-4 cursor-pointer"
            >
              {/* Logo Image Container - Added glass effect for better contrast against mesh */}
              <div className="h-32 w-48 flex items-center justify-center p-4 transition-all duration-300 transform group-hover:scale-105 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm group-hover:shadow-md group-hover:bg-white/50">
                 <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full w-auto object-contain"
                  />
              </div>

              {/* Explicit CTA Button */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold-200 bg-white/80 text-gold-700 text-xs md:text-sm font-bold tracking-wide uppercase transition-all duration-300 group-hover:bg-gold-500 group-hover:text-white group-hover:border-gold-500 shadow-sm">
                <span>Odwiedź stronę</span>
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default LogoNavigation;