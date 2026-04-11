import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaAward, FaRocket } from 'react-icons/fa';
import { projets } from '../assets/assets.js';

export default function ProjetSimple() {
  return (
    <section id="projects" className="py-24 px-6 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête Stratégique */}
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm mb-4"
          >
            Réalisations & Études de cas
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            L'Impact <span className="text-slate-500">en Action.</span>
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Découvrez comment nous transformons les enjeux de nos partenaires en succès numériques et médiatiques chez <span className="text-white font-semibold">MUAMOKEL AGENCY</span>.
          </p>
        </div>

        {/* Grille de Projets Modernisée */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projets.map((projet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-slate-900/40 rounded-[2.5rem] border border-slate-800 overflow-hidden hover:border-red-600/30 transition-all duration-500"
            >
              {/* Overlay Badge Type (ex: RP ou IT) */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-1.5 bg-slate-950/80 backdrop-blur-md text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-600/20">
                  {projet.technologies?.includes('React') ? 'Digital Solution' : 'Corporate Strategy'}
                </span>
              </div>

              {/* Image avec effet de zoom */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={projet.image}
                  alt={projet.titre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
              </div>

              {/* Contenu de l'étude de cas */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                  {projet.titre}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 italic">
                  "{projet.description}"
                </p>

                {/* Tags de compétences */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {projet.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase rounded-lg border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions avec icônes */}
                <div className="flex items-center gap-4">
                  {projet.lienDemo && (
                    <a
                      href={projet.lienDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-900/20"
                    >
                      Voir le Projet <FaRocket />
                    </a>
                  )}
                  {projet.lienGithub && (
                    <a
                      href={projet.lienGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-slate-800 text-white rounded-xl hover:bg-white hover:text-black transition-all"
                      title="Consulter les sources"
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Final */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center p-12 rounded-[3rem] bg-gradient-to-b from-slate-900/50 to-transparent border border-slate-800"
        >
          <FaAward className="text-4xl text-red-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Prêt à lancer votre prochain projet ?</h3>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">Confiez votre image et vos systèmes à des experts qui comprennent vos enjeux business.</p>
          <button className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-red-600 hover:text-white transition-all">
            Démarrer une collaboration
          </button>
        </motion.div>
      </div>
    </section>
  );
}
