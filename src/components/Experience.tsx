import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Code, Github as Git, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { darkMode } = useTheme();

  const experiences = [
    {
      title: 'Développeur Informatique',
      company: 'CNMSS',
      period: '2024 - A ce jour',
      description: 'Développement et maintenance d\'applications spécifiques pour la gestion de l\'assurance maladie des militaires',
      tasks: [
        'Analyse des besoins des services métiers',
        'Conception et développement d\'applications web',
        'Intégration des solutions applicatives dans divers environnements',
        'Rédaction de la documentation technique',
        'Maintenance en condition opérationnelle des applications',
        'Veille technologique sur les langages de développement'
      ],
      icon: <Code className="w-6 h-6" />,
      tech: ['PHP', 'Symfony', 'SQL', 'Git']
    },
    {
      title: 'Stagiaire Développeur',
      company: 'CNMSS',
      period: 'Stage de 1ère année BTS SIO - Mai-Juin 2024 (2 mois)',
      description: 'Stage de première année de BTS SIO au sein de la CNMSS',
      tasks: [
        'Découverte de l\'environnement de développement',
        'Participation à des projets de développement d\'applications internes',
        'Apprentissage des méthodes de travail en équipe',
        'Initiation aux bonnes pratiques de développement'
      ],
      icon: <Code className="w-6 h-6" />,
      tech: ['PHP', 'Symfony', 'SQL', 'Git']
    },
    {
      title: 'Fayardesign',
      company: 'Agence de valorisation de marques à Hyères',
      period: 'Stage de 2 semaines en classe de 3ème',
      description: 'Spécialisée dans la création d\'identités visuelles et le design produit',
      tasks: [
        'Conception de logotypes et identités de marque',
        'Réalisation d\'applications éditoriales',
        'Conception de packagings',
        'Design de produits'
      ],
      icon: <Code className="w-6 h-6" />,
      tech: ['Design graphique', 'Design industriel', 'Gestion de projet']
    }
  ];
    

  return (
    <section id="experience" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Expériences Professionnelles</h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Mes expériences en tant que développeur 
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.period}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="mb-12 last:mb-0"
            >
              <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg mr-4 ${darkMode ? 'bg-gray-600 text-blue-300' : 'bg-blue-50 text-blue-500'}`}>
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{exp.title}</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.company}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{exp.period}</p>
                    </div>
                  </div>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp.description}</p>
                  <ul className="space-y-2 mb-4">
                    {exp.tasks.map((task, i) => (
                      <li key={i} className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {task}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;