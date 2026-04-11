import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LazyImage from './LazyImage';
import { profile1Image } from '../assets/assets.js';
import notificationService from '../services/notificationService';

export default function Hero() {
  const navigate = useNavigate();

  // 1. On définit les backgrounds à l'intérieur du composant
  const backgrounds = [
    '/background7.png',
    '/background8.png',
    '/background9.jpeg',
  ];

  const [bgIndex, setBgIndex] = useState(0);

  // 2. Logique du slider (inchangée)
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  useEffect(() => {
    const timer = setTimeout(() => notificationService.welcome(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background avec transition AnimatePresence pour éviter l'erreur */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgrounds[bgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.25)',
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950 z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative inline-block mb-8"
        >
          <div className="absolute -inset-1 bg-red-600 rounded-full blur opacity-25"></div>
          <LazyImage
            src={profile1Image}
            style={{ objectPosition: 'center 10%' }}
            className="relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-2 border-white/10 shadow-2xl"
          />
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            className="text-4xl md:text-7xl font-black tracking-tight text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Louiscar <span className="text-red-600">Ingeba</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Associé chez <span className="font-semibold text-white">MUAMOKEL Agency</span>. <br/>
            Chargé de Relations Publiques & Associé.
          </motion.p>
        </div>

        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all hover:scale-105"
          >
            Me contacter
          </button>
          <button 
            onClick={() => navigate('/projects')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-bold rounded-full border border-white/20 transition-all"
          >
            Nos porfolio
          </button>
        </motion.div>
      </div>
    </section>
  );
}
