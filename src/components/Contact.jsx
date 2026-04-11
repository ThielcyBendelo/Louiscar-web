import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { init, send } from '@emailjs/browser';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp, FaPaperPlane, FaHeadset } from 'react-icons/fa';
import { contact as contactData } from '../assets/assets.js';
import notificationService from '../services/notificationService';

const contactIcons = {
  Email: FaEnvelope,
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  WhatsApp: FaWhatsapp,
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) init(EMAILJS_PUBLIC_KEY);
  }, [EMAILJS_PUBLIC_KEY]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = notificationService.loading('Transmission de votre demande...');

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) throw new Error('Config missing');

      await send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        to_reply: formData.email,
        message: formData.message,
        to_email: 'ingebalouiscar@gmail.com',
      });

      notificationService.dismiss(loadingToast);
      notificationService.success('Message reçu. Je reviens vers vous sous 24h.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      notificationService.dismiss(loadingToast);
      window.location.href = `mailto:ingebalouiscar@://gmail.com via Portfolio&body=${formData.message}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-slate-950 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Côté Gauche : Texte & Réseaux */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">Contact direct</h2>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Discutons de <br />votre <span className="text-slate-500 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900 italic">Vision.</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-md">
                Besoin d'un audit RP ou d'une intervention sur vos systèmes ? Je suis disponible pour transformer vos enjeux en succès.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 w-fit">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-600/20">
                  <FaHeadset />
                </div>
                <span className="text-white font-medium">Réponse sous 24h ouvrées</span>
              </div>
              
              <div className="flex gap-4 pt-4">
                {contactData.map((item) => {
                  const Icon = contactIcons[item.label];
                  return Icon ? (
                    <a key={item.label} href={item.link} target="_blank" rel="noreferrer"
                       className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-600 hover:border-red-600 transition-all">
                      <Icon size={20} />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </motion.div>

          {/* Côté Droit : Formulaire Premium */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/40 p-8 md:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Nom complet</label>
                <input 
                  type="text" name="name" required value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all"
                  placeholder="Ex: Louiscar Ingeba"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email Professionnel</label>
                <input 
                  type="email" name="email" required value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all"
                  placeholder="votre@entreprise.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Votre Message</label>
                <textarea 
                  name="message" rows="5" required value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all resize-none"
                  placeholder="Décrivez votre projet ou votre problématique..."
                />
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-3"
              >
                {loading ? "Transmission..." : <>Envoyer le message <FaPaperPlane /></>}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
