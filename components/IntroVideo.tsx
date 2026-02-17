import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VIDEO_URLS } from '../constants';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  // We use two video elements to ensure the correct aspect ratio loads immediately without JS flicker
  // The 'hidden' utility class controls visibility.
  
  const handleVideoEnd = () => {
    setIsVisible(false);
    // Give a small buffer for the fade out animation before triggering parent state change
    setTimeout(() => {
        onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
            {/* Desktop Video */}
            <video
              className="hidden md:block w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            >
              <source src={VIDEO_URLS.desktop} type="video/mp4" />
            </video>

            {/* Mobile Video */}
            <video
              className="block md:hidden w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            >
              <source src={VIDEO_URLS.mobile} type="video/mp4" />
            </video>

            {/* Skip button for better UX */}
            <button 
                onClick={handleVideoEnd}
                className="absolute bottom-8 right-8 text-white/50 hover:text-white text-xs uppercase tracking-widest transition-colors z-50 border border-white/30 px-4 py-2 rounded-full"
            >
                Pomiń Intro
            </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo;