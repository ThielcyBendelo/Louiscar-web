import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaTachometerAlt, FaHome, FaUser, FaCode, FaBriefcase, FaTools, FaBars, FaTimes } from 'react-icons/fa';
// AJOUT DE L'IMPORT MANQUANT POUR ANIMATEPRESENCE
import { motion, AnimatePresence } from 'framer-motion';

import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import analyticsService from '../services/analyticsService';
import authService from '../services/authService';

export default function NavbarSecured() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(audioService.isEnabled());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch { }
    return 'light';
  });

  useEffect(() => {
    authService.initialize().then(() => {
      const loggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      setIsAuthenticated(loggedIn);
      setCurrentUser(user);
    });

    const interval = setInterval(() => {
      const loggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      setIsAuthenticated(loggedIn);
      setCurrentUser(user);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch { }
  }, [theme]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    audioService.playClick();
  };

  const handleLogin = () => { navigate('/login'); setIsOpen(false); audioService.playNavigate(); };
  const handleDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
      setIsOpen(false);
      audioService.playNavigate();
    } else {
      navigate('/login');
    }
  };

  const handleNavClick = (section, e) => {
    e.preventDefault();
    if (isOpen) setIsOpen(false);
    audioService.playNavigate();
    if (section.startsWith('/')) navigate(section);
  };

  const navGroups = [
    { items: [{ href: '/', label: 'Accueil', icon: <FaHome /> }] },
    { items: [{ href: '/about', label: 'À propos', icon: <FaUser /> }] },
    { items: [{ href: '/skills', label: 'Compétences', icon: <FaCode /> }] },
    { items: [{ href: '/experience', label: 'Expérience', icon: <FaBriefcase /> }] },
    { items: [{ href: '/services', label: 'Services', icon: <FaTools /> }] },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent group-hover:from-red-500 group-hover:to-red-300 transition-all duration-300">
              MON PORTFOLIO
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navGroups.map((group) => (
              <div key={group.items[0].label} className="relative group">
                <a
                  href={group.items[0].href}
                  onClick={(e) => handleNavClick(group.items[0].href, e)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  {group.items[0].icon}
                  <span>{group.items[0].label}</span>
                </a>
              </div>
            ))}
            
            <div className="flex items-center gap-4 ml-4 border-l pl-6 border-gray-200 dark:border-slate-700">
              {isAuthenticated ? (
                <button onClick={handleDashboard} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-all">
                  <FaTachometerAlt className="text-slate-600 dark:text-slate-300" />
                </button>
              ) : (
                <button onClick={handleLogin} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all">
                  Connexion
                </button>
              )}
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-slate-600 dark:text-slate-300 text-2xl p-2">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE - Architecting Digital DNA Optimized */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-red-600 cursor-pointer"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 shadow-2xl border-l border-red/10"
              style={{ background: 'radial-gradient(circle at top right, #300303, #020617)' }}
            >
              <div className="flex flex-col h-full p-8 pt-24 relative z-10">
                <div className="space-y-4">
                  {navGroups.map((group, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.3 }}
                    >
                      <a
                        href={group.items[0].href}
                        onClick={(e) => handleNavClick(group.items[0].href, e)}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                      >
                        <span className="text-xl text-blue-400">{group.items[0].icon}</span>
                        <div className="flex flex-col">
                          <span className="text-lg font-medium text-slate-200">{group.items[0].label}</span>
                          <span className="text-[9px] uppercase tracking-widest text-slate-500">Access Point 0{index + 1}</span>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-auto pt-10 border-t border-white/5 text-center">
                  <p className="text-[9px] text-slate-500 tracking-[0.3em] uppercase">
                    MUAMOKEL <span className="text-blue-400 font-bold">Agency</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
