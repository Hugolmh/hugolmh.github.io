import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Terminal, Laptop, Brain } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Langages de Programmation',
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: 'JavaScript', level: 50 },
        { name: 'TypeScript', level: 20 },
        { name: 'Python', level: 60 },
        { name: 'Java', level: 40 }
      ]
    },
    {
      title: 'Frameworks & Librairies',
      icon: <Globe className="w-6 h-6" />,
      skills: [
        { name: 'Symfony', level: 60 },
        { name: 'Node.js', level: 10 },
        { name: 'Spring Boot', level: 20 }
      ]
    },
    {
      title: 'Base de données',
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: 'PostgreSQL', level: 50 },
        { name: 'MySQL', level: 50 },
        { name: 'MongoDB', level: 50 }
      ]
    },
    {
      title: 'Outils & DevOps',
      icon: <Terminal className="w-6 h-6" />,
      skills: [
        { name: 'Git', level: 55 },
        { name: 'Linux', level: 35 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Compétences</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mes compétences techniques et outils maîtrisés
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-50 rounded-lg mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
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