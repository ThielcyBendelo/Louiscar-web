import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiEagleEmblem, GiLoveInjection } from 'react-icons/gi';
import { FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import analyticsService from '../services/analyticsService';
import authService from '../services/authService';
import { FaHome, FaUser, FaCode, FaBriefcase, FaTools, FaBars, FaTimes } from 'react-icons/fa';



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
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
        return 'dark';
    } catch {
      // ignore errors (e.g., SSR or private mode)
    }
    return 'light';
  });
  // Log après tous les hooks
  console.log('[NavbarSecured] Render:', { isAuthenticated, currentUser });
  useEffect(() => {
    // Initialiser la session automatiquement au chargement
    authService.initialize().then(() => {
      const loggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      setIsAuthenticated(loggedIn);
      setCurrentUser(user);
      console.log('[NavbarSecured] INIT:', { loggedIn, user });
    });

    // Écouter les changements d'authentification
    const interval = setInterval(() => {
      const loggedIn = authService.isLoggedIn();
      const user = authService.getCurrentUser();
      setIsAuthenticated(loggedIn);
      setCurrentUser(user);
      console.log('[NavbarSecured] INTERVAL:', { loggedIn, user });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch {
      // ignore write errors
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    audioService.playClick();
    analyticsService.trackEvent('theme_toggle', {
      theme: newTheme,
      category: 'user_interface',
    });
    notificationService.info(
      `Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`,
      { autoClose: 2000, icon: newTheme === 'dark' ? '🌙' : '☀️' }
    );
  };

  const toggleAudio = async () => {
    const newState = audioService.toggle();
    setAudioEnabled(newState);

    analyticsService.trackEvent('audio_toggle', {
      enabled: newState,
      category: 'user_preferences',
    });

    if (newState) {
      audioService.playSuccess();
      notificationService.success('🔊 Sons activés', { autoClose: 2000 });
    } else {
      notificationService.info('🔇 Sons désactivés', { autoClose: 2000 });
    }
  };

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    audioService.playClick();
    analyticsService.trackEvent('mobile_menu_toggle', {
      isOpen: newState,
      category: 'navigation',
    });
  };

  const handleLogin = () => {
    navigate('/login');
    setIsOpen(false);
    audioService.playNavigate();
  };

  const handleRegister = () => {
    navigate('/register');
    setIsOpen(false);
    audioService.playNavigate();
  };

  const handleDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
      setIsOpen(false);
      audioService.playNavigate();
      notificationService.info('Redirection vers votre tableau de bord...', {
        autoClose: 2000,
      });
    } else {
      notificationService.warning(
        '🔐 Veuillez vous connecter pour accéder au dashboard',
        {
          autoClose: 3000,
        }
      );
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setCurrentUser(null);
      setShowUserMenu(false);
      setIsOpen(false);
      notificationService.success('✓ Déconnexion réussie', { autoClose: 2000 });
      navigate('/');
      audioService.playSuccess();
    } catch {
      notificationService.error('Erreur lors de la déconnexion', {
        autoClose: 3000,
      });
    }
  };

  // ...existing code...
  const handleNavClick = (section, e) => {
    e.preventDefault();
    if (isOpen) setIsOpen(false);
    audioService.playNavigate();
    analyticsService.trackEvent('navigation_click', {
      section,
      category: 'navigation',
    });
    if (section.startsWith('/')) {
      navigate(section);
    }
  };

  // Navigation items
  // Structure professionnelle avec sous-menus

const navGroups = [
  {
    items: [
      { href: '/', label: 'Accueil', icon: <FaHome /> },
    ],
  },

  {
    items: [
      { href: '/about', label: 'À propos', icon: <FaUser /> },
    ],
  },

  {
    items: [
      { href: '/skills', label: 'Compétences', icon: <FaCode /> },
    ],
  },
  {
    items: [
      { href: '/experience', label: 'Expérience', icon: <FaBriefcase /> },
    ],
  },
  {
    items: [
      { href: '/services', label: 'Services', icon: <FaTools /> },
    ],
  },
];




   // Problème : Trop de couleurs rouges différentes tuent la hiérarchie visuelle.
// Solution : Utiliser une palette cohérente et un flou de verre (backdrop-blur) plus fin.

return (
  <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-slate-800 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        
        {/* Logo : On simplifie pour le rendre plus "Corporate" */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('/')}
        >
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
          
          {/* Actions d'Authentification : Séparées visuellement */}
          <div className="flex items-center gap-4 ml-4 border-l pl-6 border-gray-200 dark:border-slate-700">
            {isAuthenticated ? (
               <button onClick={handleDashboard} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-all">
                  <FaTachometerAlt className="text-slate-600 dark:text-slate-300" />
               </button>
            ) : (
              <button 
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-md shadow-red-500/20 transition-all"
              >
                Connexion
              </button>
            )}
          </div>
        </div>

               {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu} 
            className="text-slate-600 dark:text-slate-600 text-2xl p-2"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </div>

    {/* MENU MOBILE - La partie manquante */}
    <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible pointer-events-none'}`}>
      
      {/* Background Dimmer */}
      <div 
        className={`absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Content (Drawer) */}
      <div className={`absolute right-0 top-0 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6 pt-20">
          <div className="space-y-4">
            {navGroups.map((group) => (
              <a
                key={group.items[0].label}
                href={group.items[0].href}
                onClick={(e) => {
                  handleNavClick(group.items[0].href, e);
                  setIsOpen(false);
                }}
                className="flex items-center gap-4 p-4 text-lg font-semibold text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-2xl transition-all"
              >
                <span className="text-red-600">{group.items[0].icon}</span>
                {group.items[0].label}
              </a>
            ))}
          </div>

          {/* Mobile Auth Actions
          <div className="mt-auto pt-10 border-t border-gray-100 dark:border-slate-800">
            {isAuthenticated ? (
              <button 
                onClick={handleDashboard}
                className="w-full flex items-center justify-center gap-2 p-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white rounded-2xl font-bold"
              >
                <FaTachometerAlt /> Tableau de bord
              </button>
            ) : (
              <button 
                onClick={handleLogin}
                className="w-full p-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-600/20"
              >
                Se connecter
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  </nav>
);
}
