import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Code, Database, Server, BookOpen, Users, Globe, Monitor, Shield, Briefcase, Building, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { calculateAge } from '../utils/calculateAge';

/**
 * Composant Hero - Section d'accueil du portfolio
 * Affiche les informations personnelles et les liens de contact
 * Inclut des animations avancées et un design moderne
 */
const Hero = () => {
  // Récupération du mode sombre depuis le contexte
  const { darkMode } = useTheme();
  
  // État pour l'animation de la machine à écrire
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const fullText = "Développeur Web & Applications";
  
  // État pour le modal de compétence
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  
  // Animation de la machine à écrire
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);
  
  // Animation des particules flottantes
  const particles = Array.from({ length: 20 }, (_, i) => i);

  // Référentiel BTS SIO SLAM
  const btsSkills = [
    {
      id: 'patrimoine',
      title: 'Gestion du patrimoine informatique',
      icon: <Monitor className="w-5 h-5" />,
      color: 'blue',
      details: [
        'Recenser et identifier les ressources numériques',
        'Exploiter des référentiels, normes et standards',
        'Mettre en place et vérifier les niveaux d\'habilitation',
        'Vérifier les conditions de la continuité d\'un service',
        'Gérer des sauvegardes',
        'Vérifier le respect des règles d\'utilisation des ressources'
      ]
    },
    {
      id: 'assistance',
      title: 'Répondre aux incidents',
      icon: <Shield className="w-5 h-5" />,
      color: 'green',
      details: [
        'Collecter, suivre et orienter des demandes',
        'Traiter des demandes concernant les services réseau et système',
        'Traiter des demandes concernant les applications'
      ]
    },
    {
      id: 'presence',
      title: 'Développer la présence en ligne',
      icon: <Globe className="w-5 h-5" />,
      color: 'purple',
      details: [
        'Participer à la valorisation de l\'image de l\'organisation sur les médias numériques',
        'Référencer les services en ligne de l\'organisation',
        'Participer à l\'évolution d\'un site Web exploitant les données de l\'organisation'
      ]
    },
    {
      id: 'projet',
      title: 'Travailler en mode projet',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'orange',
      details: [
        'Analyser les objectifs et les modalités d\'organisation d\'un projet',
        'Planifier les activités',
        'Évaluer les indicateurs de suivi d\'un projet et analyser les écarts'
      ]
    },
    {
      id: 'service',
      title: 'Mettre à disposition un service',
      icon: <Server className="w-5 h-5" />,
      color: 'red',
      details: [
        'Réaliser les tests d\'intégration et d\'acceptation d\'un service',
        'Déployer un service',
        'Accompagner les utilisateurs dans la mise en place d\'un service'
      ]
    },
    {
      id: 'developpement',
      title: 'Organiser son développement',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'teal',
      details: [
        'Mettre en place son environnement d\'apprentissage personnel',
        'Mettre en œuvre des outils et stratégies de veille informationnelle',
        'Gérer son identité professionnelle',
        'Développer son projet professionnel'
      ]
    }
  ];

  // Fonction pour fermer le modal
  const closeModal = () => setActiveSkill(null);

  // Définir les transitions pour les compétences
  const skillHoverTransition = { type: "spring", stiffness: 400, damping: 10 };


  return (
    <section id="home" className={`min-h-screen pt-20 flex items-center relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Particules flottantes en arrière-plan */}
      {particles.map((i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${darkMode ? 'bg-blue-500/10' : 'bg-blue-500/10'}`}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            x: [
              Math.random() * window.innerWidth, 
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ]
          }}
          transition={{ 
            duration: 20 + Math.random() * 30, 
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            width: `${Math.random() * 50 + 10}px`, 
            height: `${Math.random() * 50 + 10}px`,
            opacity: Math.random() * 0.5 + 0.2
          }}
        />
      ))}
      
      {/* Éléments décoratifs supplémentaires pour le mode clair */}
      {!darkMode && (
        <>
          <motion.div 
            className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-green-200 to-blue-200 rounded-full blur-3xl opacity-30"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, -180, -270, -360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Informations personnelles et liens de contact */}
          <motion.div
            className="md:w-3/5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-6 ${darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-800' : 'bg-blue-100 text-blue-800 border border-blue-200'}`}
            >
              Bienvenue sur mon portfolio
            </motion.div>
            
            <h1 className={`text-4xl md:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Hugo Lamarche
            </h1>
            
            <div className="h-8 mb-6">
              <h2 className={`text-xl md:text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                {text}<span className="animate-pulse">|</span>
              </h2>
            </div>
            
            <motion.p 
              className={`text-base mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-lg`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {calculateAge()} ans
                </span>
                <span className={`mx-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                <Link
                  to="/cnmss"
                  className={`inline-flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  <Building className="w-5 h-5 mr-2" />
                  En alternance chez CNMSS
                </Link>
                <span className={`mx-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Étudiant en BTS SIO SLAM
                </span>
              </div>
            </motion.p>
            
            {/* Bouton CNMSS avec animation */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/cnmss">
                <motion.button
                  className={`px-6 py-3 rounded-lg flex items-center ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  } font-medium shadow-lg`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Building className="w-5 h-5 mr-2" />
                  Découvrir la CNMSS
                  <motion.span 
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>
            
            {/* Compétences BTS SIO avec icônes animées */}
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {btsSkills.map((skill, index) => (
                <motion.div 
                  key={skill.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm cursor-pointer`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={skillHoverTransition}
                  onClick={() => setActiveSkill(skill.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.7 + index * 0.1, duration: 0.5 }
                  }}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? `bg-${skill.color}-900/30 text-${skill.color}-400` : `bg-${skill.color}-100 text-${skill.color}-600`}`}>
                    {skill.icon}
                  </span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{skill.title}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Liens de contact avec icônes */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              {/* Email */}
              <motion.a
                href="mailto:lamarche.hugo@orange.fr"
                className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-md transition-colors duration-300`}
                title="Email"
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              </motion.a>
              
              {/* GitHub */}
              <motion.a
                href="https://github.com/hugolmh"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-md transition-colors duration-300`}
                title="GitHub"
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              </motion.a>
              
              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/hugo-lamarche-03a4342b7"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-md transition-colors duration-300`}
                title="LinkedIn"
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Photo de profil avec cadre décoratif */}
          <motion.div
            className="md:w-2/5 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Éléments décoratifs */}
              <motion.div 
                className={`absolute -top-4 -left-4 w-24 h-24 rounded-tl-2xl border-t-4 border-l-4 ${darkMode ? 'border-blue-500' : 'border-blue-400'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              />
              
              <motion.div 
                className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-br-2xl border-b-4 border-r-4 ${darkMode ? 'border-blue-500' : 'border-blue-400'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              />
              
              {/* Image avec masque et effet */}
              <div className="relative overflow-hidden rounded-lg shadow-xl max-w-xs mx-auto">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
                
                <motion.img
                  src={`${import.meta.env.BASE_URL}developer.jpg`}
                  alt="Développeur Hugo Lamarche"
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Indicateur de défilement */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div 
          className={`w-8 h-12 rounded-full border-2 ${darkMode ? 'border-gray-600' : 'border-gray-400'} flex justify-center p-1`}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className={`w-1 h-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      
      {/* Modal pour afficher les détails des compétences */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className={`relative max-w-md w-full p-6 rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {btsSkills.find(s => s.id === activeSkill) && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${darkMode ? `bg-${btsSkills.find(s => s.id === activeSkill)?.color}-900/30 text-${btsSkills.find(s => s.id === activeSkill)?.color}-400` : `bg-${btsSkills.find(s => s.id === activeSkill)?.color}-100 text-${btsSkills.find(s => s.id === activeSkill)?.color}-600`}`}>
                      {btsSkills.find(s => s.id === activeSkill)?.icon}
                    </div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {btsSkills.find(s => s.id === activeSkill)?.title}
                    </h3>
                  </div>
                  
                  <div className={`space-y-2 mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {btsSkills.find(s => s.id === activeSkill)?.details.map((detail, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className={`w-2 h-2 mt-1.5 rounded-full ${darkMode ? `bg-${btsSkills.find(s => s.id === activeSkill)?.color}-500` : `bg-${btsSkills.find(s => s.id === activeSkill)?.color}-500`} flex-shrink-0`}></span>
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    className={`w-full py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                    onClick={closeModal}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Fermer
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;