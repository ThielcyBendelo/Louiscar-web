import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailService from '../services/emailService';
import { 
  FaUser, FaEnvelope, FaPhone, FaBuilding, 
  FaBullhorn, FaGlobe, FaClock, FaPaperPlane, FaTimes, FaShieldAlt
} from 'react-icons/fa';

// Mise à jour des services en fonction de votre nouvelle offre RP
const SERVICES = [
  { value: 'Relations Presse & Médias', label: 'Relations Presse & Médias' },
  { value: 'Communication de Crise', label: 'Communication de Crise' },
  { value: 'Stratégie de Marque (Branding)', label: 'Stratégie de Marque (Branding)' },
  { value: 'Relations Publiques Digitales', label: 'Relations Publiques Digitales' },
];

const TIMELINES = [
  { value: 'urgent', label: "Urgent (Gestion de crise)" },
  { value: 'immediat', label: 'Lancement immédiat (1-2 semaines)' },
  { value: 'planifie', label: 'Projet planifié (1-3 mois)' },
  { value: 'accompagnement', label: 'Accompagnement long terme' },
];

const initialState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  projectType: '',
  timeline: '',
  message: '',
};

const QuoteModal = ({ isOpen, onClose, defaultService }) => {
  const [formData, setFormData] = useState({ ...initialState, projectType: defaultService || '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...initialState, projectType: defaultService || '' });
      setResult(null);
    }
  }, [isOpen, defaultService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nom requis';
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Email valide requis';
    if (!formData.projectType) newErrors.projectType = 'Service requis';
    if (!formData.timeline) newErrors.timeline = 'Délai requis';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    
    setLoading(true);
    try {
      const res = await emailService.sendQuoteRequest(formData);
      setResult(res);
      if (res.success) {
        setTimeout(() => onClose(), 2000);
      }
    } catch {
      setResult({ success: false, message: "Erreur d'envoi. Veuillez réessayer." });
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-xl relative overflow-hidden flex flex-col max-h-[95vh]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
          >
            {/* Header */}
            <div className="p-8 pb-4 text-center">
              <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-red-600 transition-colors">
                <FaTimes size={24} />
              </button>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 italic">
                Briefing <span className="text-red-600">Stratégique</span>
              </h2>
              <p className="text-slate-500 text-sm">Décrivez vos besoins en Relations Publiques pour MUAMOKEL AGENCY.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 pt-0 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Identité</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-xs" />
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Votre nom" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Business</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-xs" />
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="email@entreprise.com" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Expertise Souhaitée</label>
                <div className="relative">
                  <FaBullhorn className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-xs" />
                  <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white appearance-none">
                    <option value="">Sélectionnez un pôle RP</option>
                    {SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Société / Institution</label>
                  <div className="relative">
                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-xs" />
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Nom de l'entité" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Urgence du projet</label>
                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-xs" />
                    <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white appearance-none">
                      <option value="">Délai d'intervention</option>
                      {TIMELINES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Détails de la mission</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Décrivez vos enjeux de réputation ou vos objectifs médias..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white resize-none"></textarea>
              </div>

              {result && (
                <div className={`p-4 rounded-2xl text-center text-sm font-bold ${result.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {result.message || (result.success ? "Demande transmise avec succès !" : "Erreur.")}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-xl shadow-red-600/20">
                {loading ? "Traitement..." : <>Envoyer le Briefing <FaPaperPlane /></>}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
