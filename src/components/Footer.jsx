import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub, FaLinkedin, FaEnvelope,
  FaInstagram, FaFacebook, FaWhatsapp
} from 'react-icons/fa';
import { contact } from '../assets/assets.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    Email: FaEnvelope,
    LinkedIn: FaLinkedin,
    GitHub: FaGithub,
    Instagram: FaInstagram,
    Facebook: FaFacebook,
    WhatsApp: FaWhatsapp,
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Identité de Marque */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-2xl font-black text-white">
              LOUISCAR<span className="text-red-600">.</span>
            </h3>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Expert en Relations Publiques & Maintenance Systèmes. 
              Partenaire stratégique chez MUAMOKEL Agency pour vos ambitions numériques.
            </p>
          </div>

          {/* Navigation - Correction de l'erreur <li> */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Accueil</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors">À propos</Link></li>
              <li><Link to="/skills" className="hover:text-red-500 transition-colors">Compétences</Link></li>
              <li><Link to="/projects" className="hover:text-red-500 transition-colors">Projets</Link></li>
              <li><Link to="/services" className="hover:text-red-500 transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="md:text-right">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Réseaux</h4>
            <div className="flex justify-start md:justify-end gap-5">
              {contact.map((item) => {
                const Icon = socialIcons[item.label];
                if (!Icon) return null;
                let href = item.label === 'Email' && !/^mailto:/i.test(item.link) 
                  ? `mailto:${item.link}` 
                  : item.link;
                
                return (
                  <a
                    key={item.label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-slate-400 hover:text-red-600 transition-all transform hover:-translate-y-1"
                    aria-label={item.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright & Légal */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-tighter">
          <p>© {currentYear} Louiscar Ingeba. MUAMOKEL Agency.</p>
          <div className="flex gap-6 text-slate-600">
            <span className="hover:text-white cursor-pointer">Mentions Légales</span>
            <span className="hover:text-white cursor-pointer">Confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
