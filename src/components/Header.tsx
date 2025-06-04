import React from 'react';
import { Menu, X, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  const menuItems = [
    { title: 'Accueil', href: '#home' },
    { title: 'Parcours', href: '#education' },
    { title: 'Expériences', href: '#experience' },
    { title: 'Projets', href: '#projects' },
    { title: 'Compétences', href: '#skills' },
    { title: 'Contact', href: '#contact' },
    { title: 'Formulaire', href: '/contact', link: true },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm z-50 border-b transition-colors duration-300`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#home"
            className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Hugo Lamarche
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              item.link ? (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.title}
                  href={item.href}
                  className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.title}
                </motion.a>
              )
            ))}
            
            {/* Bouton de mode sombre */}
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: menuItems.length * 0.1 }}
              aria-label={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Bouton de mode sombre (mobile) */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'} transition-colors`}
              aria-label={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              className={darkMode ? 'text-white' : 'text-gray-800'}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={`py-4 space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {menuItems.map((item) => (
                item.link ? (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={`block ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    key={item.title}
                    href={item.href}
                    className={`block ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
