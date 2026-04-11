import { motion } from 'framer-motion';
import {
  FaBriefcase, FaBuilding, FaCalendarAlt, FaRocket, FaShieldAlt
} from 'react-icons/fa';

const experiences = [
  {
    role: "Associé & Chargé de Relations Publiques",
    company: "MUAMOKEL AGENCY",
    year: "2025 - Présent",
    type: "associé",
    description: "Pilotage de la stratégie de communication institutionnelle et gestion des partenariats stratégiques. Supervision de l'image de marque de l'agence et coordination des relations presse.",
    highlights: ["Branding Leader", "Négociation B2B"]
  },
  {
    role: "Chargé relations publiques ",
    company: "MUAMOKEL AGENCY",
    year: "2025 - Présent",
    type: "full-time",
    description: "Conception et mise en œuvre de campagnes de communication ciblées pour promouvoir les services de l'agence auprès des entreprises du secteur IT. Organisation d'événements et rédaction de contenus pour renforcer la visibilité de l'agence.",
    highlights: ["Communication de crise", "Organisation d'événements IT"]
  }
];

const roleIcon = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'associé': return FaRocket;
    case 'full-time': return FaShieldAlt;
    default: return FaBriefcase;
  }
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        
        {/* En-tête */}
        <div className="text-center mb-20">
          <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">Parcours Décisionnel</h2>
          <h1 className="text-4xl md:text-6xl font-black text-white">Expériences <span className="text-slate-600">&</span> Missions</h1>
        </div>

        {/* Timeline Container */}
        <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
          
          {experiences.map((exp, idx) => {
            const Icon = roleIcon(exp.type);
            const isEven = idx % 2 === 0;

            return (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-16">
                
                {/* Point sur la ligne */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-950 text-red-600 absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                </div>

                {/* Carte de contenu */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-[calc(100%-4rem)] md:w-[45%] ml-auto md:ml-0 p-6 md:p-8 rounded-[2rem] bg-slate-900/20 border border-slate-900 hover:border-red-600/30 transition-all shadow-2xl"
                >
                  <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} mb-4`}>
                    <span className="text-red-600 font-mono text-xs mb-2 tracking-tighter bg-red-600/10 px-3 py-1 rounded-full">
                      {exp.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500">
                      <FaBuilding className="text-xs" />
                      <span className="text-sm font-medium">{exp.company}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 italic">
                    "{exp.description}"
                  </p>

                  <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                    {exp.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-widest border border-slate-700">
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
