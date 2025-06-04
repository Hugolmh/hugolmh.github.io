import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';
// Import des icônes pour les contacts
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';

/**
 * Composant Contact - Affiche les informations de contact et les réseaux sociaux
 * Utilise des icônes de react-icons pour une meilleure compatibilité et performance
 */
const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { darkMode } = useTheme();

  // Liste des contacts avec leurs informations et icônes
  const contacts = [
    {
      name: 'Email',
      value: 'lamarche.hugo@orange.fr',
      href: 'mailto:lamarche.hugo@orange.fr',
      icon: <MdEmail className="w-6 h-6 text-red-500" />
    },
    {
      name: 'GitHub',
      value: 'github.com/hugolamarche',
      href: 'https://github.com/hugolmh',
      icon: <FaGithub className="w-6 h-6 text-gray-800 dark:text-white" />
    },
    {
      name: 'LinkedIn',
      value: 'https://linkedin.com/in/hugo-lamarche-03a4342b7',
      href: 'https://linkedin.com/in/hugo-lamarche-03a4342b7',
      icon: <FaLinkedin className="w-6 h-6 text-blue-600" />
    },
    {
      name: 'Instagram',
      value: 'https://instagram.com/hugo.lmh',
      href: 'https://instagram.com/hugo.lmh',
      icon: <FaInstagram className="w-6 h-6 text-pink-600" />
    },
    {
      name: 'Discord',
      value: 'https://discord.com/users/nehaa',
      href: 'https://discord.com/users/nehaa',
      icon: <FaDiscord className="w-6 h-6 text-indigo-500" />
    }
  ];

  return (
    <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact</h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            N'hésitez pas à me contacter sur mes réseaux sociaux
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.name}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center p-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-md transition-colors duration-200`}
              >
                <div className="w-10 h-10 mr-4 flex items-center justify-center">
                  {contact.icon}
                </div>
                <div>
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{contact.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
