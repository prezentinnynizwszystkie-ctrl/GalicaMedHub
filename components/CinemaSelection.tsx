
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CINEMA_CARDS_DATA } from '../constants';
import { ArrowRight, MapPin } from 'lucide-react';

interface CinemaSelectionProps {
  onNavigate: (app: string) => void;
}

const CinemaSelection: React.FC<CinemaSelectionProps> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Default state: 'poronin' is somewhat emphasized or all equal? 
  // Let's make them equal by default on desktop, expand on hover.
  
  return (
    <section className="w-full bg-[#0a0a0a] py-4 md:py-0">
      <div className="flex flex-col md:flex-row h-auto md:h-[90vh] w-full max-w-[1920px] mx-auto overflow-hidden">
        {CINEMA_CARDS_DATA.map((card) => (
          <CinemaCard 
            key={card.id} 
            card={card} 
            isActive={activeId === card.id}
            onHover={() => setActiveId(card.id)}
            onLeave={() => setActiveId(null)}
            onClick={() => onNavigate(card.id)}
            anyActive={activeId !== null}
          />
        ))}
      </div>
    </section>
  );
};

const CinemaCard = ({ card, isActive, onHover, onLeave, onClick, anyActive }: any) => {
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`relative cursor-pointer group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 last:border-0
        ${isActive ? 'md:flex-[3]' : 'md:flex-[1]'}
        ${!isActive && anyActive ? 'md:flex-[1] opacity-60' : 'opacity-100'}
        flex-1 min-h-[400px] md:min-h-auto transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
      `}
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-t ${card.color} z-10 transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-60 group-hover:opacity-70'}`} />
        <img 
            src={card.image} 
            alt={card.title}
            className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-110' : 'scale-100'}`}
        />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
        
        {/* Title Section */}
        <div className={`transition-all duration-500 ${isActive ? 'mb-4' : 'mb-0'}`}>
            {/* Decoration Line */}
            <div className={`w-12 h-1 bg-[#D4AF37] mb-6 transition-all duration-500 ${isActive ? 'w-24' : 'w-12'}`} />
            
            <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tight mb-2">
                {card.title}
            </h2>
            <h3 className="text-sm md:text-base font-light text-white/80 uppercase tracking-[0.2em]">
                {card.subtitle}
            </h3>
        </div>

        {/* Expanded Info (Glass Panel) */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isActive ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 md:max-h-0'}`}>
            <div className="pt-6 border-t border-white/20 mt-6">
                <p className="text-white/90 font-light text-lg leading-relaxed mb-8 max-w-xl">
                    {card.description}
                </p>
                
                <button 
                    className="flex items-center gap-4 text-white uppercase tracking-widest text-xs font-bold group/btn hover:text-[#D4AF37] transition-colors"
                >
                    <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:border-white group-hover/btn:text-black transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </span>
                    Wejdź na stronę
                </button>
            </div>
        </div>

        {/* Mobile "Touch to expand" hint (only visible on mobile if not active) */}
        <div className="md:hidden mt-4 text-white/40 text-[10px] uppercase tracking-widest opacity-100 transition-opacity">
            {!isActive && "Dotknij, aby zobaczyć więcej"}
        </div>

      </div>
    </motion.div>
  );
};

export default CinemaSelection;
