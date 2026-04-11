import { motion } from 'framer-motion';
import { 
  FaReact, FaGitAlt, FaShieldAlt, FaProjectDiagram, 
  FaBullhorn, FaServer, FaHandshake, FaMicrophoneAlt, FaAward
} from 'react-icons/fa';
import { SiJavascript, SiLinux } from 'react-icons/si';
import { MdCrisisAlert } from 'react-icons/md';

const skillCategories = [
  {
    title: "Relations Publiques & Stratégie",
    color: "from-red-600 to-red-900",
    skills: [
      { name: "Communication de Crise", icon: MdCrisisAlert, level: "Expert" },
      { name: "Négociation B2B", icon: FaHandshake, level: "Senior" },
      { name: "Stratégie de Marque", icon: FaBullhorn, level: "Expert" },
      { name: "Vulgarisation Tech", icon: FaMicrophoneAlt, level: "Avancé" },
    ]
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      {/* Effet de lumière en arrière-plan */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm mb-4"
            >
              Expertise & Hard Skills
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white"
            >
              Compétences <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 text-slate-500">Hybrides.</span>
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-400 text-lg md:text-right max-w-sm italic border-l-2 border-red-600 pl-4 md:border-l-0 md:border-r-2 md:pr-4"
          >
            "La technologie n'est rien sans une communication maîtrisée."
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skillCategories.map((category, catIdx) => (
            <motion.div 
              key={catIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className={`w-8 h-[2px] bg-gradient-to-r ${category.color}`} />
                {category.title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/40 to-slate-900/10 border border-slate-800/50 hover:border-red-600/40 transition-all relative group overflow-hidden"
                  >
                    {/* Décoration subtile en arrière-plan */}
                    <div className="absolute -right-4 -bottom-4 text-6xl text-white/[0.02] group-hover:text-red-600/[0.05] transition-colors">
                      <skill.icon />
                    </div>

                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-2xl bg-slate-800/50 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                        <skill.icon className="text-xl" />
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter text-slate-500 bg-slate-800/30 px-2 py-1 rounded-full">
                        <FaAward className="text-red-600" /> {skill.level}
                      </div>
                    </div>
                    
                    <h4 className="text-white font-bold text-lg">{skill.name}</h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Développement Rapide (Vite) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 p-8 rounded-[2rem] bg-gradient-to-r from-red-600/10 to-transparent border border-red-600/20 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h4 className="text-white font-bold text-xl mb-2">Stack de Développement Moderne</h4>
            <p className="text-slate-400 text-sm">React, Vite, Node.js, et architectures Cloud sécurisées.</p>
          </div>
          <div className="flex gap-6 text-3xl text-slate-500">
            <FaReact className="hover:text-cyan-400 transition-colors cursor-help" title="React Expertise" />
            <SiJavascript className="hover:text-yellow-400 transition-colors cursor-help" title="JS Master" />
            <FaGitAlt className="hover:text-orange-600 transition-colors cursor-help" title="Version Control" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
