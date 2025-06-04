import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Composant Education - Affiche le parcours académique et professionnel
 * Inclut des animations et des détails sur chaque formation
 */
const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { darkMode } = useTheme();
  
  // État pour suivre les éléments développés
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  
  // Fonction pour basculer l'état développé d'un élément
  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const education = [
    {
      title: 'BTS SIO option SLAM - 2ème année en alternance',
      institution: 'Lycée Bonaparte, Toulon & CNMSS, Toulon',
      period: 'Septembre 2024 - A ce jour',
      description: 'Formation en alternance spécialisée en Solutions Logicielles et Applications Métiers, combinée avec une expérience professionnelle à la CNMSS.',
      diploma: 'BTS SIO en cours d\'obtention',
      icon: <GraduationCap className="w-6 h-6" />,
      details: [
        'Préparation aux épreuves du BTS tout en travaillant en entreprise',
        'Développement et maintenance d\'applications métiers pour la Caisse Nationale Militaire de Sécurité Sociale (CNMSS)',
        'Approfondissement des compétences en développement web avec des projets plus complexes',
        'Utilisation des technologies PHP, Symfony, JavaScript en environnement professionnel',
        'Participation au développement d\'applications web internes',
        'Collaboration avec les équipes métier pour comprendre les besoins',
        'Gestion de projet et méthodologies agiles en contexte réel',
        'Développement d\'applications en équipe avec intégration continue',
      ]
    },
    {
      title: 'BTS SIO option SLAM - 1ère année',
      institution: 'Lycée Bonaparte, Toulon',
      period: 'Septembre 2023 - Juin 2024',
      description: 'Première année de formation en BTS Services Informatiques aux Organisations, option Solutions Logicielles et Applications Métiers.',
      diploma: 'Passage en 2ème année',
      icon: <GraduationCap className="w-6 h-6" />,
      details: [
        'Acquisition des bases en programmation et algorithmique',
        'Apprentissage des langages PHP, JavaScript, HTML/CSS',
        'Introduction aux bases de données SQL',
        'Réalisation de projets de développement web',
        'Étude des systèmes d\'information et de leur sécurité'
      ]
    },
    {
      title: 'Terminale Générale',
      institution: 'Lycée Costebelle, Hyères',
      period: 'Septembre 2022 - Juin 2023',
      description: 'Spécialités : Numérique et Sciences Informatiques (NSI), Sciences Économiques et Sociales (SES).',
      diploma: 'Baccalauréat Général mention Assez Bien',
      icon: <GraduationCap className="w-6 h-6" />,
      details: [
        'Spécialité NSI : programmation Python, structures de données, bases de données',
        'Spécialité SES : économie, sociologie et sciences politiques',
        'Préparation et obtention du Baccalauréat Général'
      ]
    },
    {
      title: 'Première Générale',
      institution: 'Lycée Costebelle, Hyères',
      period: 'Septembre 2020 - Juin 2021',
      description: 'Spécialités : Numérique et Sciences Informatiques (NSI), Sciences de l\'Ingénieur (SI), Sciences Économiques et Sociales (SES).',
      diploma: 'Passage en Terminale',
      icon: <GraduationCap className="w-6 h-6" />,
      details: [
        'Découverte de la programmation et de l\'algorithmique en NSI',
        'Apprentissage des principes d\'ingénierie en SI',
        'Étude des concepts économiques et sociaux en SES'
      ]
    },
    {
      title: 'Seconde Générale',
      institution: 'Lycée Costebelle, Hyères',
      period: 'Septembre 2019 - Juin 2020',
      description: 'Découverte des enseignements de spécialité en vue du cycle terminal.',
      diploma: 'Passage en Première',
      icon: <GraduationCap className="w-6 h-6" />,
      details: [
        'Acquisition des bases en mathématiques et en sciences',
        'Introduction aux méthodes de travail et à l\'organisation',
        'Découverte des différentes filières et options disponibles'
      ]
    },
    {
      title: 'Collège',
      institution: 'Collège Gustave Roux, Hyères',
      period: 'Septembre 2015 - Juin 2019',
      description: 'Parcours général au sein du collège public de Hyères.',
      diploma: 'Diplôme National du Brevet (DNB)',
      icon: <GraduationCap className="w-6 h-6" />,
      details: [
        'Apprentissage des bases en mathématiques et en sciences',
        'Participation à des cours et des activités variées',
        'Développement de compétences sociales et de collaboration'
      ]
    },
  ];

  return (
    <section id="education" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Parcours & Formations</h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Mon parcours académique et professionnel dans le développement informatique.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {education.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative pl-8 pb-8 ${index < education.length - 1 ? `border-l-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''}`}
            >
              {/* Icône de la timeline */}
              <motion.div 
                className={`absolute left-0 top-0 -translate-x-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded-full border-2 ${darkMode ? 'border-gray-700 text-blue-300' : 'border-gray-200 text-blue-500'} z-10`}
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>
              
              {/* Carte de formation */}
              <motion.div
                className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-all duration-300`}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                    <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.institution}</p>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.period}</p>
                  </div>
                  
                  {/* Bouton pour développer/réduire les détails */}
                  {item.details && (
                    <motion.button
                      onClick={() => toggleExpand(index)}
                      className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={expandedItems[index] ? "Réduire les détails" : "Voir plus de détails"}
                    >
                      {expandedItems[index] ? (
                        <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                      ) : (
                        <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                      )}
                    </motion.button>
                  )}
                </div>
                
                {item.diploma && (
                  <motion.div 
                    className={`inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full ${darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.diploma}
                  </motion.div>
                )}
                
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</p>
                
                {/* Détails supplémentaires (développables) */}
                {item.details && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: expandedItems[index] ? 'auto' : 0,
                      opacity: expandedItems[index] ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4"
                  >
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Détails :</h4>
                    <ul className="space-y-1">
                      {item.details.map((detail, i) => (
                        <motion.li 
                          key={i}
                          className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={expandedItems[index] ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Point de connexion pour la timeline */}
              {index < education.length - 1 && (
                <motion.div 
                  className={`absolute left-0 top-full -translate-x-1/2 -translate-y-4 w-3 h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
