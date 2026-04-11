import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaCogs, 
  FaShieldAlt, 
  FaHeadset, 
  FaMapMarkerAlt, 
  FaCheckCircle 
} from 'react-icons/fa'; // Importation des icônes
import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';
import { profile1Image as profileImg } from '../assets/assets.js';

export default function About() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <motion.section
        id="about"
        className="relative pb-24 pt-10 mt-5 bg-slate-950 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Image avec branding pro */}
            <motion.div 
              className="md:w-1/3 flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <LazyImage
                  src={profileImg}
                  alt="Louiscar Ingeba - Associé"
                  className="relative w-64 h-80 object-cover rounded-2xl border border-white/10 shadow-2xl"
                  style={{ objectPosition: 'center 10%' }}
                />
              </div>
            </motion.div>

            {/* Texte stratégique */}
            <div className="md:w-2/3 space-y-6">
              <motion.div variants={textVariants}>
                <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FaShieldAlt className="text-xs" /> MUAMOKEL AGENCY
                </h2>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                  L'alliance de la stratégie <span className="text-red-600">RP</span> et de l'expertise <span className="text-slate-400">IT.</span>
                </h3>
              </motion.div>

              <motion.p className="text-lg text-slate-400 leading-relaxed" variants={textVariants}>
                En tant qu'associé chez <strong>MUAMOKEL AGENCY</strong>, je bâtis des ponts entre la technologie et l'image de marque. Mon rôle est d'assurer que votre infrastructure soit aussi solide que votre réputation.
              </motion.p>

              {/* Grille d'expertise avec Icônes */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6" variants={textVariants}>
                <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-red-600/30 transition-all group">
                  <div className="text-red-600 text-2xl mb-3 group-hover:scale-110 transition-transform">
                    <FaUsers />
                  </div>
                  <h4 className="text-white font-bold mb-2">Relations Publiques</h4>
                  <p className="text-sm text-slate-500">Gestion de l'image de marque et communication stratégique pour entreprises.</p>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-red-600/30 transition-all group">
                  <div className="text-red-600 text-2xl mb-3 group-hover:scale-110 transition-transform">
                    <FaCogs />
                  </div>
                  <h4 className="text-white font-bold mb-2">Maintenance Système</h4>
                  <p className="text-sm text-slate-500">Expertise certifiée pour une infrastructure résiliente, sécurisée et performante.</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Section Engagements avec Icônes */}
          <motion.div 
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-900 pt-12 text-center"
            variants={textVariants}
          >
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-red-600 text-xl mb-3" />
              <span className="block text-xl font-bold text-white mb-1">Qualité RP</span>
              <p className="text-slate-500 text-sm">Transparence totale et image soignée.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaHeadset className="text-red-600 text-xl mb-3" />
              <span className="block text-xl font-bold text-white mb-1">Support Proactif</span>
              <p className="text-slate-500 text-sm">Maintenance 24/7 pour zéro interruption.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-red-600 text-xl mb-3" />
              <span className="block text-xl font-bold text-white mb-1">Kinshasa</span>
              <p className="text-slate-500 text-sm">Présence locale et accompagnement direct.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <GoogleMapsSection />
    </>
  );
}
