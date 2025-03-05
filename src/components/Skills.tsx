import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
// Import des icônes pour les compétences
import { 
  SiJavascript, SiTypescript, SiPython,
  SiSymfony, SiNodedotjs, SiSpring, SiReact,
  SiPostgresql, SiMysql, SiMongodb,
  SiGit, SiLinux, SiDocker 
} from 'react-icons/si';

/**
 * Composant Skills - Affiche les compétences techniques regroupées par catégories
 * Utilise des icônes de react-icons pour une meilleure compatibilité et performance
 */
const Skills = () => {
  // Hook pour détecter quand le composant est visible dans le viewport
  const [ref, inView] = useInView({
    triggerOnce: true, // Déclenche l'animation une seule fois
    threshold: 0.1,    // Déclenche quand 10% du composant est visible
  });
  
  // Récupération du mode sombre depuis le contexte
  const { darkMode } = useTheme();

  // Définition des catégories de compétences avec leurs icônes
  const skillCategories = [
    {
      title: 'Langages de Programmation',
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: 'JavaScript', icon: <SiJavascript className="w-8 h-8 text-yellow-400" /> },
        { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8 text-blue-500" /> },
        { name: 'Python', icon: <SiPython className="w-8 h-8 text-blue-600" /> }
      ]
    },
    {
      title: 'Frameworks & Librairies',
      icon: <Globe className="w-6 h-6" />,
      skills: [
        { name: 'Symfony', icon: <SiSymfony className="w-8 h-8 text-black dark:text-white" /> },
        { name: 'Node.js', icon: <SiNodedotjs className="w-8 h-8 text-green-600" /> },
        { name: 'Spring Boot', icon: <SiSpring className="w-8 h-8 text-green-500" /> },
        { name: 'React', icon: <SiReact className="w-8 h-8 text-blue-400" /> }
      ]
    },
    {
      title: 'Base de données',
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql className="w-8 h-8 text-blue-700" /> },
        { name: 'MySQL', icon: <SiMysql className="w-8 h-8 text-blue-800" /> },
        { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8 text-green-700" /> }
      ]
    },
    {
      title: 'Outils & DevOps',
      icon: <Terminal className="w-6 h-6" />,
      skills: [
        { name: 'Git', icon: <SiGit className="w-8 h-8 text-orange-600" /> },
        { name: 'Linux', icon: <SiLinux className="w-8 h-8 text-yellow-600" /> },
        { name: 'Docker', icon: <SiDocker className="w-8 h-8 text-blue-500" /> }
      ]
    }
  ];

  return (
    <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        {/* Titre de la section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Compétences</h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Mes compétences techniques et outils maîtrisés
          </p>
        </motion.div>

        {/* Grille des catégories de compétences */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
            >
              {/* En-tête de la catégorie */}
              <div className="flex items-center mb-6">
                <div className={`p-2 rounded-lg mr-4 ${darkMode ? 'bg-gray-600 text-blue-300' : 'bg-blue-50 text-blue-500'}`}>
                  {category.icon}
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
              </div>
              
              {/* Grille des compétences */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    className={`flex flex-col items-center p-3 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200`}
                  >
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                      {skill.icon}
                    </div>
                    <span className={`text-sm font-medium text-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;