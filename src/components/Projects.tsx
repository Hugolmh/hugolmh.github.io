import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code } from 'lucide-react';

// Définir le type pour un projet
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  additionalImages?: string[];
  additionalInfo?: string;
  icon: JSX.Element;
}

// Nouveau composant pour la popup
const ProjectPopup = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white rounded-lg p-6 w-full h-full overflow-auto">
        <h3 className="text-2xl font-semibold">{project.title}</h3>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-50 object-cover mb-4"
        />
        <p className="mb-4">{project.description}</p>
        
        {project.additionalInfo && (
          <div className="mb-4">
            <h4 className="text-xl font-semibold">Informations supplémentaires</h4>
            <p>{project.additionalInfo}</p>
          </div>
        )}

        {project.additionalImages && project.additionalImages.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xl font-semibold">Images supplémentaires</h4>
            <div className="grid grid-cols-2 gap-2">
              {project.additionalImages.map((img, index) => (
                <img key={index} src={img} alt={`Additional ${index}`} className="w-full h-50 object-cover" />
              ))}
            </div>
          </div>
        )}

        <ul className="space-y-2 mb-4">
          {project.features.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Fermer
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const projects: Project[] = [ 
    {
      title: 'Codah',
      description: 'Application de gestion des dossiers administratifs pour les collectivités locales, facilitant le suivi et le traitement des demandes citoyennes.',
      image: `${import.meta.env.BASE_URL}Capture.PNG`,
      tags: ['PHP', 'Symfony', 'Gestion administrative'],
      features: [
        'Gestion centralisée des dossiers',
        'Suivi en temps réel des demandes',
        'Notifications automatisées',
        'Interface utilisateur intuitive',
      ],
      additionalImages: [
        `${import.meta.env.BASE_URL}Capture2.PNG`,
        `${import.meta.env.BASE_URL}Capture5.PNG`,
      ],
      additionalInfo: 'Cette application a été développée pour améliorer l\'efficacité des services administratifs.',
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: 'FIB',
      description: 'Plateforme de gestion financière intégrée pour les entreprises, offrant des outils de comptabilité, de facturation et de reporting financier.',
      image: `${import.meta.env.BASE_URL}Capture4.PNG`,
      tags: ['PHP', 'Symfony', 'Finance', 'Comptabilité'],
      features: [
        'Suivi des transactions financières',
        'Génération de factures',
        'Rapports financiers détaillés',
        'Intégration avec des systèmes tiers',
      ],
      additionalImages: [
        `${import.meta.env.BASE_URL}Capture6.PNG`,
      ],
      additionalInfo: 'Cette plateforme permet une gestion financière simplifiée et efficace.',
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: 'SIJ',
      description: 'Système d\'information jeunesse permettant aux jeunes d\'accéder à des ressources, des événements et des opportunités locales.',
      image: `${import.meta.env.BASE_URL}Capture3.PNG`,
      tags: ['PHP', 'Symfony', 'Jeunesse', 'Information'],
      features: [
        'Annuaire des ressources locales',
        'Calendrier des événements',
        'Espace personnel pour les utilisateurs',
        'Module de recherche avancée',
      ],
      additionalImages: [],
      additionalInfo: 'Ce système vise à renforcer l\'engagement des jeunes dans leur communauté.',
      icon: <Code className="w-6 h-6" />,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Projets & Réalisations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez mes projets réalisés en formation et en entreprise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg mr-4">
                    {project.icon}
                  </div>
                  <p className="text-gray-700">{project.description}</p>
                </div>
                <ul className="space-y-2 mb-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectPopup project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;
