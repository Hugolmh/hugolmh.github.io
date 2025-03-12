import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Terminal, Star, StarHalf, FileCode, Server, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
// Import des icônes pour les compétences
import { 
  SiJavascript, SiTypescript, SiPython, SiPhp, 
  SiSymfony, SiNodedotjs, SiSpring, SiReact,
  SiPostgresql, SiMysql, SiMongodb,
  SiGit, SiLinux, SiDocker
} from 'react-icons/si';
import { DiCssdeck, DiMsqlServer } from 'react-icons/di';
import { FaCode } from 'react-icons/fa';

/**
 * Composant pour afficher une notation par étoiles
 * @param level - Niveau de compétence de 1 à 5
 * @param darkMode - Mode sombre activé ou non
 */
const SkillLevel = ({ level, darkMode }: { level: number; darkMode: boolean }) => {
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

  return <div className="flex space-x-1 mt-1">{stars}</div>;
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

  // Légende des niveaux
  const skillLevels = [
    { level: 1, label: 'Débutant' },
    { level: 2, label: 'Intermédiaire' },
    { level: 3, label: 'Avancé' },
    { level: 4, label: 'Confirmé' },
    { level: 5, label: 'Expert' }
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
          
          {/* Légende des niveaux */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {skillLevels.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <SkillLevel level={item.level} darkMode={darkMode} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Grille des catégories de compétences */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-white hover:bg-gray-50'} transition-all duration-300`}
              whileHover={{ y: -5 }}
            >
              {/* En-tête de la catégorie */}
              <div className="flex items-center mb-6">
                <motion.div 
                  className={`p-2 rounded-lg mr-4 ${darkMode ? 'bg-gray-600 text-blue-300' : 'bg-blue-50 text-blue-500'}`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
              </div>
              
              {/* Grille des compétences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    className={`flex flex-col p-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200`}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 mr-3 flex items-center justify-center">
                        {skill.icon}
                      </div>
                      <div>
                        <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {skill.name}
                        </span>
                        <SkillLevel level={skill.level} darkMode={darkMode} />
                      </div>
                    </div>
                    
                    {/* Barre de progression */}
                    <div className={`w-full h-1.5 mt-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                      <motion.div 
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(skill.level / 5) * 100}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                      />
                    </div>
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