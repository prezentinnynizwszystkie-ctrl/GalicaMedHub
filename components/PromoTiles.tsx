import React from 'react';
import { motion } from 'framer-motion';
import { TILES_DATA } from '../constants';
import { ArrowRight } from 'lucide-react';
import { TileItem } from '../types';

interface PromoTilesProps {
  onOpenModal: (url: string, title: string) => void;
}

const PromoTiles: React.FC<PromoTilesProps> = ({ onOpenModal }) => {
  return (
    <div className="w-full py-16 px-4 md:px-8 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {TILES_DATA.map((tile: TileItem, index: number) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + (index * 0.2), duration: 0.8 }}
              className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <span className="bg-gold-500 text-white text-xs px-3 py-1 uppercase tracking-widest rounded-sm">
                    Polecane
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
                  {tile.title}
                </h3>
                <h4 className="text-gold-600 font-medium text-sm tracking-wide uppercase mb-4">
                  {tile.subtitle}
                </h4>
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                  {tile.description}
                </p>
                
                <button
                  onClick={() => onOpenModal(tile.targetUrl, tile.title)}
                  className="inline-flex items-center gap-2 text-primary font-bold tracking-wide group/btn hover:text-gold-600 transition-colors self-start"
                >
                  {tile.actionText}
                  <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoTiles;