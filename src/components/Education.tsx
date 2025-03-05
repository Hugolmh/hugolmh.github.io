import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { darkMode } = useTheme();

  const education = [
    {
      title: 'Développeur Informatique en alternance',
      institution: 'CNMSS, Toulon',
      period: 'Septembre 2024 - A ce jour',
      description: 'Développement et maintenance d\'applications métiers pour la Caisse Nationale Militaire de Sécurité Sociale.',
      diploma: 'BTS SIO en cours d\'obtention',
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: 'BTS SIO option SLAM',
      institution: 'Lycée Bonaparte, Toulon',
      period: 'Septembre 2023 - A ce jour',
      description: 'Formation en alternance spécialisée en Solutions Logicielles et Applications Métiers.',
      diploma: 'BTS SIO en cours d\'obtention',
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: 'Terminale Générale',
      institution: 'Lycée Costebelle, Hyères',
      period: 'Septembre 2021 - Juin 2023',
      description: 'Spécialités : Numérique et Sciences Informatiques (NSI), Sciences de l\'Ingénieur (SI). Redoublement en 2022 avec changement de spécialité vers NSI et Sciences Économiques et Sociales (SES).',
      diploma: 'Baccalauréat Général',
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: 'Seconde Générale',
      institution: 'Lycée Costebelle, Hyères',
      period: 'Septembre 2019 - Juin 2020',
      description: 'Découverte des enseignements de spécialité en vue du cycle terminal.',
      diploma: null,
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: 'Collège',
      institution: 'Collège Gustave Roux, Hyères',
      period: 'Septembre 2015 - Juin 2019',
      description: 'Parcours général au sein du collège public de Hyères.',
      diploma: 'Diplôme National du Brevet (DNB)',
      icon: <GraduationCap className="w-6 h-6" />,
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
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative pl-8 pb-8 border-l-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} last:border-0`}
            >
              <div className={`absolute left-0 top-0 -translate-x-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded-full border-2 ${darkMode ? 'border-gray-700 text-blue-300' : 'border-gray-200 text-blue-500'}`}>
                {item.icon}
              </div>
              <div className={`p-6 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.institution}</p>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.period}</p>
                {item.diploma && (
                  <div className={`inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                    {item.diploma}
                  </div>
                )}
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
