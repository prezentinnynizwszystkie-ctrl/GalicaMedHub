
import React from 'react';
import { motion } from 'framer-motion';
import { VIDEO_URLS } from '../constants';

const GatewayHero: React.FC = () => {
  return (
    <section className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background - Blurred Atmospheric Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay */}
        <video
          className="w-full h-full object-cover blur-md scale-110" // Blurring the video
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={VIDEO_URLS.desktop} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        {/* Main Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
           <img 
              src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/5.png" 
              alt="GalicaMed Logo"
              className="h-32 md:h-48 w-auto object-contain mx-auto drop-shadow-2xl"
           />
        </motion.div>

        {/* Manifesto Text */}
        <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-wide leading-tight">
                <motion.span 
                    initial={{ opacity: 0, filter: "blur(10px)" }} 
                    animate={{ opacity: 1, filter: "blur(0px)" }} 
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="block md:inline mr-4"
                >
                    MEDYCYNA.
                </motion.span>
                <motion.span 
                    initial={{ opacity: 0, filter: "blur(10px)" }} 
                    animate={{ opacity: 1, filter: "blur(0px)" }} 
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="block md:inline mr-4 text-gold-300"
                >
                    PIĘKNO.
                </motion.span>
                <motion.span 
                    initial={{ opacity: 0, filter: "blur(10px)" }} 
                    animate={{ opacity: 1, filter: "blur(0px)" }} 
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="block md:inline"
                >
                    CZŁOWIEK.
                </motion.span>
            </h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
            >
                <div className="w-24 h-[1px] bg-white/30 mx-auto my-8" />
                
                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto italic font-serif">
                    "Łączymy zaawansowaną medycynę z holistycznym podejściem do piękna. <br className="hidden md:block" />
                    Trzy lokalizacje, jeden standard troski."
                </p>
            </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Wybierz placówkę</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  );
};

export default GatewayHero;
