import React, { useState } from "react";
import { motion } from "framer-motion";
import QuoteModal from "./QuoteModal";
import { FaBullhorn, FaShieldAlt, FaHandsHelping, FaEnvelope, FaChevronRight, FaStar } from "react-icons/fa";

const services = [
  {
    title: "Relations Presse & Médias",
    icon: <FaBullhorn />,
    description: "Connecter votre marque aux leaders d'opinion et journalistes stratégiques.",
    template: "Rédaction de communiqués, organisation de conférences de presse et gestion des interviews.",
    benefits: ["Visibilité média", "Crédibilité", "Pitching", "Suivi retombées"],
    price: "Pack Événementiel / Mensuel",
  },
  {
    title: "Communication de Crise",
    icon: <FaShieldAlt />,
    description: "Protéger votre réputation lors de situations critiques ou sensibles.",
    template: "Veille e-réputation, éléments de langage, cellule de crise et réhabilitation d'image.",
    benefits: ["Réactivité", "Protection DNA", "Neutralisation", "Conseil"],
    price: "Forfait d'Urgence",
  },
  {
    title: "Stratégie de Marque (Branding)",
    icon: <FaHandsHelping />,
    description: "Bâtir un ADN numérique cohérent et influent pour votre agence.",
    template: "Audit d'image, storytelling institutionnel, et positionnement sur le marché digital.",
    benefits: ["Identité forte", "Storytelling", "Différenciation", "Engagement"],
    price: "Sur Devis",
  },
  {
    title: "Relations Publiques Digitales",
    icon: <FaEnvelope />,
    description: "Gestion des réseaux sociaux et de l'influence en ligne pour décideurs.",
    template: "LinkedIn Management pour dirigeants, partenariats B2B et networking institutionnel.",
    benefits: ["Lead Gen", "Autorité", "Networking", "Influence"],
    price: "Abonnement Stratégique",
  },
];


// Helper pour la modale
function getServiceKey(title) {
  const t = title.trim();
  if (t.includes("image de marque")) return "Gestion de image de marque";
  if (t.includes("MCO")) return "Maintien en Condition Opérationnelle (MCO)";
  if (t.includes("Interface")) return "Interface Client-Technique";
  if (t.includes("Support")) return "Support & Continuité de Service";
  return "autre";
}

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleQuoteClick = (serviceKey) => {
    setSelectedService(serviceKey);
    setModalOpen(true);
  };

  return (
    <section id="services" className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête RP */}
        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 text-red-600 font-bold mb-4 uppercase tracking-[0.4em] text-xs"
          >
            <FaStar /> Expertise Relations Publiques <FaStar />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6">
            L'influence au service <br/> de la <span className="text-red-600">Performance.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Pour <span className="text-white font-semibold">MUAMOKEL AGENCY</span>, je transforme votre expertise technique en une autorité reconnue sur le marché.
          </p>
        </div>

        {/* Grille Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-slate-900/30 border border-slate-800 p-8 rounded-[3rem] hover:border-red-600/40 hover:bg-slate-900/50 transition-all duration-500"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center text-3xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-800 px-3 py-1 rounded-full">
                    {service.price}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="mt-auto">
                  <div className="mb-8 flex flex-wrap gap-2">
                    {service.benefits.map((b, i) => (
                      <span key={i} className="text-[9px] font-bold uppercase py-1.5 px-3 bg-red-600/5 text-red-500 border border-red-600/10 rounded-xl group-hover:border-red-600/30 transition-all">
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleQuoteClick(service.title)}
                      className="py-4 bg-red-600 text-white rounded-2xl font-bold text-sm hover:bg-red-700 shadow-xl shadow-red-900/10 flex items-center justify-center gap-2"
                    >
                      Demander un devis <FaChevronRight className="text-xs" />
                    </button>
                    <a
                      href={`mailto:ingebalouiscar@://gmail.com RP: ${service.title}`}
                      className="py-4 border border-slate-800 text-slate-300 rounded-2xl font-bold text-sm hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                      <FaEnvelope /> Contact Direct
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
      />
    </section>
  );

}
