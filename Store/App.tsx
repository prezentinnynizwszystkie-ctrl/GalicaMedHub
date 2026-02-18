
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ShoppingBag, Activity, Heart, CheckCircle, 
  FileText, ShieldPlus, Baby, Armchair, Percent
} from 'lucide-react';

interface StoreAppProps {
    onBack: () => void;
}

const StoreApp: React.FC<StoreAppProps> = ({ onBack }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryImages = [
    "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/77953.webp",
    "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/78560.webp",
    "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/78561.webp",
    "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/78562.webp",
    "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/78564.webp",
    "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/78565.webp",
    "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/IMG_5518.webp",
    "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/IMG_5520.webp",
    "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/IMG_5521.webp"
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans text-stone-800 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <button 
                onClick={onBack}
                className={`flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors ${scrolled ? 'text-stone-500 hover:text-[#5d4037]' : 'text-stone-600 hover:text-[#3e2723]'}`}
            >
                <ChevronLeft className="w-4 h-4" />
                Wróć
            </button>
            <div className="flex items-center gap-2">
                <span className={`text-xl font-serif font-bold ${scrolled ? 'text-[#5d4037]' : 'text-[#3e2723]'}`}>SKLEP</span>
                <span className="text-xs uppercase tracking-widest text-stone-400 border-l border-stone-300 pl-2">GalicaMed</span>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 md:pt-48 md:pb-32 bg-[#ebe5da] overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#8d6e63] rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#5d4037] rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="inline-block px-4 py-1.5 mb-6 border border-[#5d4037]/20 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-[#5d4037] bg-white/50 backdrop-blur-sm">
                    Sprzęt Medyczny & Rehabilitacyjny
                </span>
                <h1 className="text-4xl md:text-7xl font-serif text-[#3e2723] mb-6 leading-tight">
                    Profesjonalne wsparcie <br />
                    <span className="text-[#8d6e63] italic">dla Twojego zdrowia</span>
                </h1>

                {/* NFZ Badge Integration */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    <img 
                        src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/nfz.png" 
                        alt="NFZ" 
                        className="h-8 w-auto object-contain drop-shadow-sm" 
                    />
                    <span className="text-sm md:text-base font-bold text-[#003e7e] tracking-widest uppercase border-b-2 border-[#003e7e]/20 pb-1">
                        Refundacja NFZ
                    </span>
                </div>

                <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                    Szeroki wybór sprzętu, realizacja wniosków NFZ oraz pomoc w uzyskaniu dofinansowania PFRON. Jesteśmy tu, by pomóc.
                </p>
            </motion.div>
        </div>
      </header>

      {/* Asortyment (Grid) */}
      <section id="asortyment" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif text-[#3e2723] mb-4">Nasz Asortyment</h2>
                <p className="text-stone-500">Kompleksowe zaopatrzenie medyczne w jednym miejscu</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl hover:border-[#8d6e63]/30 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#faf9f6] flex items-center justify-center text-[#5d4037] mb-6 group-hover:bg-[#5d4037] group-hover:text-white transition-colors">
                            {cat.icon}
                        </div>
                        <h3 className="text-xl font-bold text-[#3e2723] mb-4">{cat.title}</h3>
                        <ul className="space-y-2">
                            {cat.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-stone-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8d6e63] mt-1.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* NFZ / PFRON Section */}
      <section className="py-24 bg-[#fdf9f3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-[#8d6e63] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Dofinansowania</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-[#3e2723] mb-8 leading-tight">
                        Pomagamy w formalnościach <br/>
                        <span className="italic opacity-60">NFZ & PFRON</span>
                    </h2>
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5d4037] shadow-sm shrink-0">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-[#3e2723] mb-2">Refundacja NFZ</h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    Realizujemy wnioski na wyroby medyczne. Pomagamy w doborze odpowiedniego sprzętu w ramach przysługujących limitów.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5d4037] shadow-sm shrink-0">
                                <ShieldPlus className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-[#3e2723] mb-2">Dofinansowania PFRON</h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    Oferujemy pomoc przy dokumentacji niezbędnej do uzyskania dopłat przez PEFRON, w tym przy zakupie drogiego sprzętu jak łóżka rehabilitacyjne czy wózki elektryczne.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5d4037] shadow-sm shrink-0">
                                <Armchair className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-[#3e2723] mb-2">Łóżka Rehabilitacyjne</h4>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    Specjalizujemy się w doborze i dostarczaniu łóżek rehabilitacyjnych. Zapewniamy transport i montaż.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-[#5d4037]/10 rounded-[3rem] rotate-3 transform" />
                    <img 
                        src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/sklepy_photos/78562.webp" 
                        alt="Pomoc w dokumentacji i sprzęt medyczny" 
                        className="rounded-[3rem] shadow-2xl relative z-10 w-full h-auto object-cover aspect-[4/5]"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif text-[#3e2723] mb-4">Galeria Sklepów</h2>
                <p className="text-stone-500">Odwiedź nas i zobacz produkty na żywo</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryImages.map((src, index) => (
                    <div key={index} className="rounded-3xl overflow-hidden relative group aspect-square shadow-md border border-stone-100 hover:shadow-xl transition-all">
                        <img 
                            src={src} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            alt={`Galeria sklepu ${index + 1}`} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Lokalizacje / Footer */}
      <footer id="lokalizacje" className="bg-[#1e1410] text-stone-400 py-20 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-[#8d6e63]/50 transition-colors">
                    <h3 className="text-white font-serif text-2xl mb-6">Sklep Medyczny <span className="text-[#8d6e63]">Poronin</span></h3>
                    <p className="mb-4 flex items-start gap-3">
                        <span className="text-[#8d6e63] mt-1">📍</span>
                        ul. Piłsudskiego 101<br/>34-520 Poronin
                    </p>
                    <p className="mb-8 flex items-center gap-3">
                        <span className="text-[#8d6e63]">📞</span>
                        <a href="tel:+48506153674" className="hover:text-white transition-colors">+48 506 153 674</a>
                    </p>
                </div>

                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-[#8d6e63]/50 transition-colors">
                    <h3 className="text-white font-serif text-2xl mb-6">Sklep Medyczny <span className="text-[#8d6e63]">Maniowy</span></h3>
                    <p className="mb-4 flex items-start gap-3">
                        <span className="text-[#8d6e63] mt-1">📍</span>
                        ul. Gorczańska 6<br/>34-436 Maniowy
                    </p>
                    <p className="mb-8 flex items-center gap-3">
                        <span className="text-[#8d6e63]">📞</span>
                        <a href="tel:+48506153674" className="hover:text-white transition-colors">+48 506 153 674</a>
                    </p>
                </div>
            </div>

            <div className="text-center text-[10px] uppercase tracking-widest opacity-40">
                &copy; {new Date().getFullYear()} GalicaMed. Sklepy Medyczne.
            </div>
        </div>
      </footer>

    </div>
  );
};

// Data Categories
const categories = [
    {
        title: "Diagnostyka i Terapia",
        icon: <Activity className="w-6 h-6" />,
        items: ["Ciśnieniomierze (auto/manual)", "Termometry, glukometry", "Inhalatory, nebulizatory", "Sprzęt do terapii oddechowej"]
    },
    {
        title: "Ortopedia",
        icon: <ShoppingBag className="w-6 h-6" />, // Using generic bag or better Bone icon if available
        items: ["Ortezy i stabilizatory", "Pasy ortopedyczne", "Wkładki ortopedyczne", "Poduszki ortopedyczne"]
    },
    {
        title: "Mobilność",
        icon: <Armchair className="w-6 h-6" />,
        items: ["Wózki inwalidzkie (również elektryczne)", "Kule, laski", "Balkoniki i chodziki", "Łóżka rehabilitacyjne"]
    },
    {
        title: "Rehabilitacja",
        icon: <Activity className="w-6 h-6" />,
        items: ["Piłki rehabilitacyjne", "Taśmy do ćwiczeń", "Sprzęt do ćwiczeń w domu", "Materace przeciwodleżynowe"]
    },
    {
        title: "Higiena i Ochrona",
        icon: <ShieldPlus className="w-6 h-6" />,
        items: ["Pieluchomajtki, majtki chłonne", "Wkładki anatomiczne", "Maski, rękawiczki, dezynfekcja", "Środki do pielęgnacji chorych"]
    },
    {
        title: "Profilaktyka i Suplementy",
        icon: <Heart className="w-6 h-6" />,
        items: ["Witaminy na odporność", "Preparaty na stawy", "Podkolanówki uciskowe", "Rajstopy przeciwżylakowe"]
    }
];

export default StoreApp;
