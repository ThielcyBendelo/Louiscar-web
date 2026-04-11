import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logoImages } from '../assets/assets.js';

export default function ProfessionalSplashScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadingSteps = useMemo(() => [
    { label: 'Initialisation de l’ADN numérique...', duration: 800 },
    { label: 'Chargement des composants...', duration: 1000 },
    { label: "Optimisation de l'interface...", duration: 600 },
    { label: 'Sécurisation des accès...', duration: 700 },
    { label: 'Prêt pour le déploiement.', duration: 500 },
  ], []);

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const target = (currentStep + 1) * (100 / loadingSteps.length);
          if (prev >= target) {
            clearInterval(progressInterval);
            return target;
          }
          return prev + 1;
        });
      }, step.duration / 20);

      stepTimeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, step.duration);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => onComplete?.(), 800);
      }, 500);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, loadingSteps, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden"
        >
          {/* Background Image Subtile */}
          <div 
            className="absolute inset-0 opacity-20 grayscale pointer-events-none"
            style={{
              backgroundImage: `url(${logoImages})`,
              backgroundPosition: 'center',
              backgroundSize: '40%',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(2px)'
            }}
          />

          {/* Grille Technologique en arrière-plan */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          </div>

          {/* Conteneur Central */}
          <div className="relative z-10 w-full max-w-md px-8 text-center">
            
            {/* Logo ou Titre Animé */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-blue-400">
                MUAMOKEL <span className="font-bold text-white">Agency</span>
              </h2>
            </motion.div>

            {/* Label de l'étape actuelle */}
            <div className="h-6 mb-2 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStep}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="text-sm font-mono text-slate-400"
                >
                  {loadingSteps[currentStep]?.label || "Finalisation..."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Barre de Progression Style Premium */}
            <div className="relative w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"
                style={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
              />
              {/* Effet de brillance (shimmer) */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </div>

            {/* Compteur de progression */}
            <motion.div className="mt-4 flex justify-between items-center font-mono text-[10px] tracking-widest text-slate-500 uppercase">
              <span>System Status: Loading</span>
              <span className="text-blue-400">{Math.round(progress)}%</span>
            </motion.div>
          </div>

          {/* Particules flottantes (vos points bleus) */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-500 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.1, 0.4, 0.1],
                  y: [0, -100],
                  x: Math.random() * 20 - 10
                }}
                transition={{ 
                  duration: 4 + Math.random() * 2, 
                  repeat: Infinity,
                  delay: Math.random() * 5 
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-5%'
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
