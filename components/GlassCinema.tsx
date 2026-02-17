
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants, PanInfo } from 'framer-motion';
import { ArrowRight, ChevronRight, ChevronLeft, Store, Activity, MapPin } from 'lucide-react';
import { CINEMA_CARDS_DATA, FEATURED_THERAPIES_DATA } from '../constants';

interface GlassCinemaProps {
  onNavigate: (app: string) => void;
  onOpenModal: (url: string, title: string) => void;
}

type DisplayMode = 'facilities' | 'therapies';

// Internal component to handle individual background loading state
const BackgroundMedia = ({ location, isExiting }: { location: any, isExiting: boolean }) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    if (!location) return null; // Safety check

    return (
        <div className="relative w-full h-full">
            {/* 1. Static Image Fallback */}
            <img 
                src={location.image} 
                alt={location.title} 
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 2. Video Layer */}
            {location.videoUrl && (
                <video
                    src={location.videoUrl}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    autoPlay
                    muted
                    loop
                    playsInline // Critical for iOS
                    onLoadedData={() => setIsVideoLoaded(true)}
                />
            )}
            
            {/* 3. Gradient Overlays */}
            <div className={`absolute inset-0 bg-gradient-to-r ${location.color.replace('from-', 'from-black/40 via-black/5 ')} to-transparent`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
    );
};

// --- MOBILE SPECIFIC COMPONENTS ---

const MobileGrid = ({ data, title, icon: Icon, type, onNavigate }: { data: any[], title: string, icon: any, type: DisplayMode, onNavigate: (id: string) => void }) => {
    
    const handleAction = (item: any) => {
        // Direct navigation call without animation logic for mobile grid
        if (type === 'facilities') {
            onNavigate(item.id);
        } else {
             // Handle Featured Therapies navigation mapping
            if (item.id === 'mbst') onNavigate('mbst');
            else if (item.id === 'infuzje') onNavigate('infuzje');
            else if (item.id === 'blizny') onNavigate('blizny'); // Pass raw ID
            else if (item.id === 'laser') onNavigate('laser');   // Pass raw ID
            else onNavigate(item.id);
        }
    };

    return (
        <div className="mb-12 px-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gold-500 text-white shadow-lg shadow-gold-500/20">
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif text-gray-900 uppercase tracking-tight">{title}</h3>
            </div>

            {/* Grid Layout 2 columns */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-6">
                {data.map((item) => (
                    <div 
                        key={item.id}
                        onClick={() => handleAction(item)}
                        className="flex flex-col gap-2"
                    >
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-gray-100 active:scale-95 transition-transform">
                            {/* Image Layer */}
                            <img 
                                src={item.tileImage || item.image} 
                                alt={item.title} 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            
                            {/* Gradient to ensure text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {/* Glassmorphism Content Overlay (Bottom) - Compact & Transparent - UPDATED: Reduced height, no subtitle */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white/30 backdrop-blur-md border-t border-white/30 p-3 flex items-center justify-between">
                                <h4 className="text-xs font-bold text-gray-900 leading-tight line-clamp-2 w-[80%]">{item.title}</h4>
                                <div className="w-6 h-6 rounded-full bg-white/40 border border-white/30 flex items-center justify-center text-gray-900 shadow-sm backdrop-blur-sm shrink-0">
                                    <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                        
                        {/* BIG LOCATION LABEL BELOW TILE (SPLIT LINES) - UPDATED: Darker and larger */}
                        {item.locationLabel && (
                            <div className="flex flex-col items-center justify-center h-auto mt-1 leading-[1.1]">
                                <span className="font-black text-gray-600 text-sm uppercase tracking-widest">
                                    {item.locationLabel.top}
                                </span>
                                {item.locationLabel.bottom && (
                                    <span className="font-black text-gray-600 text-sm uppercase tracking-widest">
                                        {item.locationLabel.bottom}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---

const GlassCinema: React.FC<GlassCinemaProps> = ({ onNavigate }) => {
  // Desktop State
  const [activeMode, setActiveMode] = useState<DisplayMode>('facilities');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Dynamic Data based on active mode (Desktop)
  const currentData = activeMode === 'facilities' ? CINEMA_CARDS_DATA : FEATURED_THERAPIES_DATA;
  const activeLocation = currentData[activeIndex] || currentData[0];

  // Reset index when switching modes (Desktop)
  useEffect(() => {
      setActiveIndex(0);
  }, [activeMode]);

  // Auto-rotate (Desktop)
  useEffect(() => {
    if (isExiting) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % currentData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isExiting, activeMode, currentData.length]);

  const handleSelect = (index: number) => {
    if (isExiting) return;
    setActiveIndex(index);
  };

  const handleEnterClick = (id: string) => {
    // Start exit animation
    setIsExiting(true);
    
    // Wait for animation, then navigate
    setTimeout(() => {
        onNavigate(id);
    }, 1000);
  };

  // Animation variants (Desktop)
  const bgFadeVariants: Variants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.8 } }
  };

  const contentFadeVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const uiExitVariants: Variants = {
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white md:bg-black text-gray-900 md:text-white font-sans">
      
      {/* GLOBAL LOGO (Desktop Only) */}
      <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="hidden md:block absolute top-6 right-6 md:top-8 md:right-12 z-50 pointer-events-none"
      >
          <img 
              src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/5.png" 
              alt="GalicaMed" 
              className="h-6 md:h-8 w-auto object-contain brightness-0 md:invert drop-shadow-md"
          />
      </motion.div>

      {/* ================= MOBILE LAYOUT (Stacked, White Bg) ================= */}
      <div className="md:hidden w-full h-full overflow-y-auto bg-white pb-20 pt-6">
          
          <div className="flex justify-center mb-8">
             <img 
                src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/5.png"
                alt="GalicaMed Logo"
                className="w-40 h-auto object-contain drop-shadow-md"
             />
          </div>

          {/* Block 1: Nasze Placówki - Grid */}
          <MobileGrid 
            title="Nasze Placówki" 
            icon={MapPin} 
            data={CINEMA_CARDS_DATA} 
            type="facilities" 
            onNavigate={onNavigate} 
          />

          <div className="w-24 h-px bg-gray-200 mx-auto mb-12" />

          {/* Block 2: Wyróżnione Terapie - Grid */}
          <MobileGrid 
            title="Wyróżnione Terapie" 
            icon={Activity} 
            data={FEATURED_THERAPIES_DATA} 
            type="therapies" 
            onNavigate={onNavigate} 
          />

          <div className="w-24 h-px bg-gray-200 mx-auto mb-12" />

          {/* Block 3: Sklepy Medyczne */}
          <div className="px-4 mb-16">
            <div 
                onClick={() => onNavigate('store')}
                className="group relative rounded-2xl overflow-hidden shadow-xl shadow-gray-200 border border-gray-100 cursor-pointer bg-white"
            >
                <div className="relative p-8 flex flex-col items-center text-center">
                    <div className="p-4 rounded-full bg-gray-100 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors text-gray-900">
                        <Store className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900 uppercase tracking-tight mb-2">Sklepy Medyczne</h3>
                    
                    {/* NFZ INFO MOBILE */}
                    <div className="flex items-center justify-center gap-3 mb-4 mt-1">
                        <img 
                            src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/nfz.png" 
                            alt="NFZ" 
                            className="h-5 w-auto object-contain" 
                        />
                        <span className="text-xs font-bold text-[#003e7e] tracking-widest">REFUNDACJA NFZ</span>
                    </div>

                    <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
                        Szeroki asortyment rehabilitacyjny i ortopedyczny w Poroninie i Maniowych.
                    </p>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gold-500 group-hover:text-gray-900 transition-colors">
                        Przejdź do sklepu
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
          </div>

          <div className="text-center text-gray-400 text-[10px] uppercase tracking-widest pb-8">
              &copy; GalicaMed
          </div>
      </div>


      {/* ================= DESKTOP LAYOUT (Original, Black Bg) ================= */}
      <div className="hidden md:flex relative w-full h-full text-white">
          
          {/* 1. BACKGROUND LAYER */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${activeMode}-${activeLocation.id}`}
              variants={bgFadeVariants}
              initial="initial"
              animate={isExiting ? { scale: 1.5, filter: "blur(2px)" } : "animate"}
              transition={isExiting ? { duration: 1.5, ease: "easeInOut" } : {}}
              exit="exit"
              className="absolute inset-0 z-0"
            >
                <BackgroundMedia location={activeLocation} isExiting={isExiting} />
            </motion.div>
          </AnimatePresence>

          {/* 2. MAIN CONTENT LAYER */}
          <div className="relative z-20 h-full flex flex-row w-full">
            
            {/* LEFT SIDE: Sidebar */}
            <motion.div 
                variants={uiExitVariants}
                animate={isExiting ? "exit" : "animate"}
                className="w-3/12 h-full flex flex-col justify-center p-8 lg:p-10 relative backdrop-blur-2xl bg-white/5 border-r border-white/20 shadow-[10px_0_30px_rgba(0,0,0,0.2)] z-30"
            >
                {/* LOGO IN SIDEBAR */}
                <div className="mb-10 flex justify-center">
                     <img 
                        src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/5.png"
                        alt="GalicaMed Logo"
                        className="w-28 h-auto object-contain drop-shadow-md"
                     />
                </div>

                <div className="space-y-4">
                    {/* 1. Nasze Placówki */}
                    <div 
                        onClick={() => setActiveMode('facilities')}
                        className={`
                            group p-5 rounded-2xl cursor-pointer transition-all duration-300 border
                            ${activeMode === 'facilities' 
                                ? 'bg-white/30 border-white/40 shadow-lg scale-[1.02]' 
                                : 'bg-transparent border-transparent hover:bg-white/10 hover:border-white/20 opacity-80 hover:opacity-100'
                            }
                        `}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg transition-colors ${activeMode === 'facilities' ? 'bg-gold-500 text-white' : 'bg-white/10 text-white/90'}`}>
                                <MapPin className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg font-serif text-white uppercase tracking-tight">Nasze Placówki</h3>
                        </div>
                        <p className="text-[11px] text-gray-100 font-light leading-relaxed mb-3 pl-1 drop-shadow-sm">
                            Odwiedź nasze nowoczesne centra medyczne w Poroninie, Maniowych i Nowym Targu.
                        </p>
                        <div className={`flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold transition-all ${activeMode === 'facilities' ? 'text-gold-200' : 'text-white/70 group-hover:text-white'}`}>
                            {activeMode === 'facilities' && <div className="w-3 h-[1px] bg-gold-200" />}
                            Zobacz lokalizacje
                            {activeMode !== 'facilities' && <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />}
                        </div>
                    </div>

                    {/* 2. Wyróżnione Terapie */}
                    <div 
                        onClick={() => setActiveMode('therapies')}
                        className={`
                            group p-5 rounded-2xl cursor-pointer transition-all duration-300 border
                            ${activeMode === 'therapies' 
                                ? 'bg-white/30 border-white/40 shadow-lg scale-[1.02]' 
                                : 'bg-transparent border-transparent hover:bg-white/10 hover:border-white/20 opacity-80 hover:opacity-100'
                            }
                        `}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg transition-colors ${activeMode === 'therapies' ? 'bg-gold-500 text-white' : 'bg-white/10 text-white/90'}`}>
                                <Activity className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg font-serif text-white uppercase tracking-tight">Wyróżnione Terapie</h3>
                        </div>
                        <p className="text-[11px] text-gray-100 font-light leading-relaxed mb-3 pl-1 drop-shadow-sm">
                            Poznaj nowoczesne sposoby terapii prowadzone w naszych placówkach.
                        </p>
                        <div className={`flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold transition-all ${activeMode === 'therapies' ? 'text-gold-200' : 'text-white/70 group-hover:text-white'}`}>
                            {activeMode === 'therapies' && <div className="w-3 h-[1px] bg-gold-200" />}
                            Zobacz zabiegi
                            {activeMode !== 'therapies' && <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />}
                        </div>
                    </div>

                    {/* 3. Sklepy Medyczne */}
                    <div 
                        onClick={() => handleEnterClick('store')}
                        className="group p-5 rounded-2xl cursor-pointer transition-all duration-300 border bg-transparent border-transparent hover:bg-white/10 hover:border-white/20 opacity-80 hover:opacity-100"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-white/10 text-white/90">
                                <Store className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg font-serif text-white uppercase tracking-tight">Sklepy Medyczne</h3>
                        </div>

                        {/* NFZ INFO DESKTOP */}
                        <div className="flex items-center gap-3 mb-4 pl-1">
                            <div className="bg-white/90 px-1.5 py-0.5 rounded-sm">
                                <img 
                                    src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/nfz.png" 
                                    alt="NFZ" 
                                    className="h-3 w-auto object-contain" 
                                />
                            </div>
                            <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase">REFUNDACJA NFZ</span>
                        </div>

                        <p className="text-[11px] text-gray-100 font-light leading-relaxed mb-3 pl-1 drop-shadow-sm">
                            Szeroki asortyment rehabilitacyjny i ortopedyczny w Poroninie i Maniowych.
                        </p>
                        <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-white/70 group-hover:text-white transition-all">
                            Przejdź do sklepu
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT SIDE: Dynamic Slider */}
            <motion.div 
                variants={uiExitVariants}
                animate={isExiting ? "exit" : "animate"}
                className="w-9/12 h-full flex flex-col justify-end pb-16 px-12 relative overflow-hidden"
            >
                
                {/* SLIDER */}
                <div className="flex gap-6 lg:gap-8 overflow-visible items-end h-auto w-full justify-center mb-6 max-w-full">
                    {currentData.map((location: any, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div 
                                key={location.id}
                                className="flex-shrink-0 flex flex-col justify-end items-center group/label cursor-pointer"
                                onClick={() => handleSelect(index)}
                            >
                                <motion.div
                                    layoutId={`card-${location.id}`}
                                    className={`
                                        relative overflow-hidden rounded-[30px] border border-white/20 shadow-xl transition-all duration-500
                                        w-auto aspect-[3/4] mb-4
                                        ${isActive 
                                            ? 'h-[42vh] max-h-[450px] border-gold-500/50 ring-2 ring-gold-500/30 grayscale-0 z-10' 
                                            : 'h-[28vh] max-h-[300px] opacity-100 grayscale hover:grayscale-0'
                                        }
                                    `}
                                >
                                    {/* Card Image */}
                                    <img 
                                        src={location.tileImage || location.image} 
                                        alt={location.title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                    
                                    {/* Card Overlay - Logos (Conditionally rendered) */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end items-center p-6`}>
                                        {activeMode === 'facilities' && (
                                            <img 
                                                src={location.logo}
                                                alt={location.title}
                                                className={`
                                                    w-auto object-contain transition-all duration-500 drop-shadow-md
                                                    ${isActive 
                                                        ? 'h-16 lg:h-20 opacity-100 mb-2' 
                                                        : 'h-10 lg:h-12 opacity-70 mb-4'
                                                    }
                                                    ${location.id === 'beauty' ? '' : 'brightness-0 invert'}
                                                `}
                                            />
                                        )}
                                    </div>

                                    {/* Active Indicator */}
                                    {isActive && (
                                        <motion.div 
                                            layoutId="active-line"
                                            className="absolute bottom-0 left-0 right-0 h-1.5 bg-gold-500"
                                        />
                                    )}
                                </motion.div>

                                {/* BIG LOCATION LABEL BELOW TILE (Only in facilities mode) */}
                                {activeMode === 'facilities' && location.locationLabel && (
                                    <div className={`
                                        flex flex-col items-center justify-center leading-[0.85] transition-all duration-500 h-20
                                        ${isActive 
                                            ? 'scale-110' 
                                            : 'scale-100 opacity-30 group-hover/label:opacity-60'
                                        }
                                    `}>
                                        <span className={`font-black uppercase tracking-[0.2em] text-2xl lg:text-3xl ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                            {location.locationLabel.top}
                                        </span>
                                        {location.locationLabel.bottom && (
                                            <span className={`font-black uppercase tracking-[0.2em] text-2xl lg:text-3xl ${isActive ? 'text-gold-500' : 'text-gray-300'}`}>
                                                {location.locationLabel.bottom}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full max-w-5xl mx-auto px-2 mb-6 flex items-center justify-between gap-6">
                    <div className="h-[2px] bg-white/10 flex-grow relative rounded-full overflow-hidden">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-gold-500"
                            animate={{ width: `${((activeIndex + 1) / currentData.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-mono tracking-widest">
                        <span className="text-gold-400 font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                        <span className="text-white/30">/</span>
                        <span className="text-white/50">{String(currentData.length).padStart(2, '0')}</span>
                    </div>
                </div>

                {/* DESCRIPTION BOX */}
                <div className="w-full max-w-5xl mx-auto relative z-30">
                    <AnimatePresence mode="wait">
                        {activeLocation && (
                            <motion.div
                                key={`${activeMode}-${activeLocation.id}`}
                                variants={contentFadeVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="w-full rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                            >
                                <div className="p-8 flex gap-8 items-center">
                                    
                                    {/* Logo & Title Section */}
                                    <div className="w-1/3 flex flex-col items-start border-r border-white/10 pr-8">
                                        <img 
                                            src={activeMode === 'facilities' ? activeLocation.logo : "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/5.png"} 
                                            alt="Logo"
                                            className={`h-14 w-auto object-contain mb-3 drop-shadow-lg 
                                                ${activeMode === 'therapies' 
                                                    ? 'brightness-0 invert' 
                                                    : (activeLocation.id === 'beauty' ? '' : 'brightness-0 invert')
                                                }
                                            `}
                                        />
                                        <p className="text-xs text-gold-400 font-bold uppercase tracking-widest mt-1">{activeLocation.subtitle}</p>
                                    </div>

                                    {/* Description & Action Section */}
                                    <div className="w-2/3 flex flex-col gap-6">
                                        <p className="text-base text-gray-200 font-light leading-relaxed line-clamp-3">
                                            {activeLocation.description}
                                        </p>
                                        
                                        <div>
                                            <button 
                                                onClick={() => handleEnterClick(activeLocation.id)}
                                                className="group relative px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden flex items-center gap-3 transition-all hover:pr-12 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                            >
                                                <span className="relative z-10">{activeMode === 'facilities' ? 'Wejdź do placówki' : 'Więcej o zabiegu'}</span>
                                                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                                                <div className="absolute inset-0 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

          </div>
      </div>
    </div>
  );
};

export default GlassCinema;
