import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Terminal, Star, StarHalf, FileCode, Server, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
// Import des icônes pour les compétences
import { 
  SiJavascript, SiTypescript, SiPython, SiPhp, 
  SiSymfony, SiNodedotjs, SiSpring, SiReact,
  SiPostgresql, SiMysql, SiMongodb, SiMariadb,
  SiGit, SiLinux, SiDocker
} from 'react-icons/si';
import { DiCssdeck, DiMsqlServer } from 'react-icons/di';
import { FaCode } from 'react-icons/fa';

/**
 * Composant pour afficher une notation par étoiles
 * @param level - Niveau de compétence de 1 à 5
 * @param darkMode - Mode sombre activé ou non
 */
const SkillLevel = ({ level, darkMode, skillName }: { level: number; darkMode: boolean; skillName: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Fonction pour obtenir le texte du niveau de compétence
  const getLevelText = (level: number): string => {
    if (level < 1.5) return "Débutant - Connaissances de base";
    if (level < 2.5) return "Intermédiaire - Pratique régulière";
    if (level < 3.5) return "Avancé - Bonne maîtrise";
    if (level < 4.5) return "Expert - Maîtrise approfondie";
    return "Maître - Expertise complète";
  };
  
  // Créer un tableau de 5 étoiles
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(level)) {
      // Étoile pleine
      return (
        <Star 
          key={i} 
          className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'} fill-current`} 
        />
      );
    } else if (i === Math.floor(level) && level % 1 !== 0) {
      // Demi-étoile
      return (
        <StarHalf 
          key={i} 
          className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'} fill-current`} 
        />
      );
    } else {
      // Étoile vide
      return (
        <Star 
          key={i} 
          className={`w-4 h-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} 
        />
      );
    }
  });

  return (
    <div 
      className="flex space-x-1 mt-1 relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {stars}
      {showTooltip && (
        <div 
          className={`absolute z-10 right-0 bottom-full mb-2 p-2 rounded-lg shadow-lg text-sm ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } transform transition-opacity duration-200 ease-in-out w-48`}
        >
          <p className="font-semibold mb-1">{skillName}</p>
          <p>{getLevelText(level)}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(level / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Composant Skills - Affiche les compétences techniques regroupées par catégories
 * Utilise des icônes de react-icons pour une meilleure compatibilité et performance
 * Inclut un système de notation par étoiles pour indiquer le niveau de maîtrise
 */
const Skills = () => {
  // Hook pour détecter quand le composant est visible dans le viewport
  const [ref, inView] = useInView({
    triggerOnce: true, // Déclenche l'animation une seule fois
    threshold: 0.1,    // Déclenche quand 10% du composant est visible
  });
  
  // Récupération du mode sombre depuis le contexte
  const { darkMode } = useTheme();

  // Définition des catégories de compétences avec leurs icônes et niveaux
  const skillCategories = [
    {
      title: 'Langages de Programmation',
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: 'JavaScript', icon: <SiJavascript className="w-8 h-8 text-yellow-400" />, level: 2.5 },
        { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8 text-blue-500" />, level: 1.2 },
        { name: 'Python', icon: <SiPython className="w-8 h-8 text-blue-600" />, level: 3 },
        { name: 'PHP', icon: <SiPhp className="w-8 h-8 text-purple-600" />, level: 2.5 },
        { name: 'C#', icon: <DiCssdeck className="w-8 h-8 text-green-600" />, level: 2 },
        { name: 'VBA', icon: <FaCode className="w-8 h-8 text-blue-800" />, level: 3 }
      ]
    },
    {
      title: 'Frameworks & Librairies',
      icon: <Globe className="w-6 h-6" />,
      skills: [
        { name: 'Symfony', icon: <SiSymfony className="w-8 h-8 text-black dark:text-white" />, level: 3 },
        { name: 'Node.js', icon: <SiNodedotjs className="w-8 h-8 text-green-600" />, level: 1 },
        { name: 'Spring Boot', icon: <SiSpring className="w-8 h-8 text-green-500" />, level: 1.5 },
        { name: 'React', icon: <SiReact className="w-8 h-8 text-blue-400" />, level: 1 }
      ]
    },
    {
      title: 'Base de données',
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql className="w-8 h-8 text-blue-700" />, level: 3.5 },
        { name: 'MySQL', icon: <SiMysql className="w-8 h-8 text-blue-800" />, level: 3.5 },
        { name: 'MariaDB', icon: <SiMariadb className="w-8 h-8 text-amber-600" />, level: 3.5 },
        { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8 text-green-700" />, level: 1 }
      ]
    },
    {
      title: 'Outils & DevOps',
      icon: <Terminal className="w-6 h-6" />,
      skills: [
        { name: 'Git', icon: <SiGit className="w-8 h-8 text-orange-600" />, level: 4 },
        { name: 'Linux', icon: <SiLinux className="w-8 h-8 text-yellow-600" />, level: 3.5 },
        { name: 'Docker', icon: <SiDocker className="w-8 h-8 text-blue-500" />, level: 1 }
      ]
    },
    {
      title: 'Compétences BTS SIO',
      icon: <FileCode className="w-6 h-6" />,
      skills: [
        { name: 'Développement Web', icon: <Globe className="w-8 h-8 text-blue-500" />, level: 4 },
        { name: 'Bases de données', icon: <Database className="w-8 h-8 text-green-500" />, level: 3.5 },
        { name: 'Systèmes & Réseaux', icon: <Server className="w-8 h-8 text-purple-500" />, level: 1 },
        { name: 'Cybersécurité', icon: <Shield className="w-8 h-8 text-red-500" />, level: 2 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Compétences Techniques
          </h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Mes compétences techniques acquises au cours de ma formation et de mes expériences professionnelles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className={`rounded-xl p-6 shadow-lg ${
                darkMode ? 'bg-gray-800 shadow-gray-900/30' : 'bg-white shadow-gray-200/70'
              }`}
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  className={`p-3 rounded-lg mr-4 ${
                    darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-50 text-blue-500'
                  }`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
              </div>
              
              <ul className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="mr-3">{skill.icon}</div>
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {skill.name}
                      </span>
                    </div>
                    <SkillLevel level={skill.level} darkMode={darkMode} skillName={skill.name} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;